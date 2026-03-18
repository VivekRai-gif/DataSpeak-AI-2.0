import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv

from database import query_db, get_schema
from ai_service import generate_sql_and_insights

# Load environment variables
load_dotenv()

app = FastAPI(title="AI BI Dashboard API")

# Setup CORS to allow React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class QueryRequest(BaseModel):
    user_query: str

@app.get("/")
def read_root():
    return {"message": "AI BI Dashboard Backend Running!"}

@app.post("/api/query")
async def process_query(request: QueryRequest):
    user_query = request.user_query
    if not user_query.strip():
        raise HTTPException(status_code=400, detail="Query cannot be empty.")
    
    schema = get_schema()
    
    try:
        # Ask Gemini
        ai_response = generate_sql_and_insights(user_query, schema)
        
        sql_query = ai_response.get("query")
        chart_type = ai_response.get("chart", "none")
        insight = ai_response.get("insight", "")
        
        if not sql_query:
            raise HTTPException(status_code=400, detail="Failed to generate SQL.")

        # Run SQL
        result_data = query_db(sql_query)
        
        return {
            "query": sql_query,
            "chart": chart_type,
            "data": result_data,
            "insight": insight
        }
    except Exception as e:
        print(f"Error processing query: {e}")
        return {
            "error": str(e),
            "data": []
        }
