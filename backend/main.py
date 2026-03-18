import os
import shutil
from fastapi import FastAPI, HTTPException, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv

from database import query_db, get_schema, process_csv
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

@app.get("/api/schema")
def get_schema_endpoint():
    import sqlite3
    from database import DB_PATH
    try:
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.execute("PRAGMA table_info(customer_data);")
        columns = [{"name": row[1], "type": row[2]} for row in cursor.fetchall()]
        conn.close()
        return {"table": "customer_data", "columns": columns}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/upload-csv")
async def upload_csv(file: UploadFile = File(...)):
    if not file.filename.endswith('.csv'):
        raise HTTPException(status_code=400, detail="Only CSV files are allowed.")
    
    upload_path = f"uploaded_{file.filename}"
    try:
        with open(upload_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
            
        success = process_csv(upload_path)
        if not success:
            raise HTTPException(status_code=500, detail="Failed to process CSV via pandas.")
            
        return {"message": "CSV successfully uploaded and schema dynamically generated."}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"File transfer error: {str(e)}")

@app.post("/api/query")
async def process_query(request: QueryRequest):
    user_query = request.user_query
    if not user_query.strip():
        raise HTTPException(status_code=400, detail="Query cannot be empty.")
    
    schema = get_schema()
    
    try:
        # Ask Gemini
        ai_response = generate_sql_and_insights(user_query, schema)
        
        if ai_response.get("error"):
            return {
                "error": f"AI Engine Error: {ai_response.get('error')}",
                "data": []
            }
        
        sql_query = ai_response.get("query")
        chart_type = ai_response.get("chart", "none")
        insight = ai_response.get("insight", "")
        business_insights = ai_response.get("business_insights", [])
        decision_suggestions = ai_response.get("decision_suggestions", [])
        
        if not sql_query:
            raise HTTPException(status_code=400, detail="Failed to generate SQL.")

        # Run SQL
        result_data = query_db(sql_query)
        
        return {
            "query": sql_query,
            "chart": chart_type,
            "data": result_data,
            "insight": insight,
            "business_insights": business_insights,
            "decision_suggestions": decision_suggestions
        }
    except Exception as e:
        print(f"Error processing query: {e}")
        return {
            "error": str(e),
            "data": []
        }
