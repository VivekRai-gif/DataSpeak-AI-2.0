import os
import json
from groq import Groq
from typing import Dict, Any

from dotenv import load_dotenv

load_dotenv()

# Configure API Key (make sure to set this in your environment or .env file)
api_key = os.getenv("GROQ_API_KEY")
client = Groq(api_key=api_key)

# The mixtral or llama model usually supported on Groq
# Wait, llama-3.1-8b-instant or llama-3.3-70b-versatile or mixtral-8x7b-32768
model_name = "llama-3.1-8b-instant"

def generate_sql_and_insights(user_query: str, schema: str) -> Dict[str, Any]:
    """
    Sends the user query and DB schema to Groq.
    Expected to return strict JSON describing: 
    - query: SQL statement
    - chart: Suggested chart format ('bar', 'pie', 'line', 'table')
    - insight: Short human-readable summary
    """
    
    system_prompt = f"""
    You are an expert Data Analyst AI and Business Strategist.
    Convert the user's natural language request into a working SQLite query.
    Return ONLY a valid JSON object. No Markdown blocks, no explanations, no backticks.
    
    Database Schema:
    {schema}
    
    Here are the Rules:
    1. Table is explicitly named 'customer_data'.
    2. Suggest the BEST chart type from this list: ["bar", "line", "pie", "table", "none"].
       - Note: Recharts line/bar generally expect an obvious grouped key. E.g. SELECT shopping_preference, COUNT(*) as count FROM customer_data GROUP BY shopping_preference.
    3. Generate a very short insight summarizing what the data *will likely show* or just describe what the query is extracting. E.g. "Showing monthly revenue trends."
    4. NEVER invent fake fields, columns, or data. Do NOT hallucinate data points.
    5. Always compute aggregates dynamically (e.g. AVG(age) as average_age).
    6. Generate 2-3 short 'business_insights' — actionable observations a manager/analyst would care about based on the query topic.
    7. Generate 2-3 short 'decision_suggestions' — strategic recommendations for decision-makers to act on the data findings.
    
    Required JSON Format:
    {{
        "query": "SELECT ...",
        "chart": "bar",
        "insight": "...",
        "business_insights": ["Insight 1", "Insight 2", "Insight 3"],
        "decision_suggestions": ["Suggestion 1", "Suggestion 2", "Suggestion 3"]
    }}
    """
    
    try:
        response = client.chat.completions.create(
            model=model_name,
            messages=[
                {
                    "role": "system",
                    "content": system_prompt
                },
                {
                    "role": "user",
                    "content": user_query
                }
            ],
            temperature=0.1,
            response_format={ "type": "json_object" }
        )
        
        # Parse text into dictionary
        result_text = response.choices[0].message.content
        result = json.loads(result_text)
        return result
    
    except Exception as e:
        print(f"Groq API Error: {e}")
        # Graceful fallback so the app does not crash completely
        return {
            "query": f"SELECT * FROM customer_data LIMIT 5",
            "chart": "table",
            "insight": "Fallback: Could not generate AI query.",
            "error": str(e)
        }
