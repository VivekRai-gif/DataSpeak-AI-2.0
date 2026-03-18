import sqlite3
import pandas as pd
import os

DB_PATH = "ai_dashboard.db"
CSV_PATH = "customer_behaviour.csv"

def init_db():
    """Reads the CSV and creates a 'customer_data' table in SQLite."""
    # Connecting to DB
    conn = sqlite3.connect(DB_PATH)
    
    # Read CSV
    if os.path.exists(CSV_PATH):
        df = pd.read_csv(CSV_PATH)
        df.to_sql("customer_data", conn, if_exists="replace", index=False)
        print("Database initialized with customer_behaviour.csv")
    else:
        print("Warning: CSV not found for init_db")
        
    conn.close()

def get_schema() -> str:
    """Dynamically returns the schema of the 'customer_data' table for Prompt context."""
    conn = sqlite3.connect(DB_PATH)
    try:
        cursor = conn.execute("PRAGMA table_info(customer_data);")
        columns = cursor.fetchall()
        
        schema_lines = ["Table: customer_data", "Columns:"]
        for col in columns:
            col_name = col[1]
            col_type = col[2]
            schema_lines.append(f"- {col_name} ({col_type})")
            
        return "\n".join(schema_lines)
    except Exception as e:
        return f"Error reading schema: {str(e)}"
    finally:
        conn.close()

def process_csv(file_path: str) -> bool:
    """Reads a newly uploaded CSV and replaces the 'customer_data' table in SQLite."""
    conn = sqlite3.connect(DB_PATH)
    try:
        df = pd.read_csv(file_path)
        # Sanitize column names: replace spaces/symbols to make them SQL friendly
        df.columns = [str(c).strip().replace(' ', '_').replace('.', '') for c in df.columns]
        df.to_sql("customer_data", conn, if_exists="replace", index=False)
        return True
    except Exception as e:
        print(f"Error processing CSV: {e}")
        return False
    finally:
        conn.close()

def query_db(query: str):
    """Executes a SQL query securely. Prevents destructive DROP/DELETE."""
    query_upper = query.upper().strip()
    
    # Hackathon-level basic security against SQL injection / modification
    if any(keyword in query_upper for keyword in ["DROP", "DELETE", "UPDATE", "INSERT", "ALTER"]):
        raise ValueError("Only SELECT queries are allowed!")
    
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row  # To return dicts mapping column name -> value
    
    try:
        cursor = conn.execute(query)
        rows = cursor.fetchall()
        
        # Convert to list of dicts for JSON serialization
        results = [dict(row) for row in rows]
        return results
    except Exception as e:
        raise ValueError(f"Database execution error: {str(e)}")
    finally:
        conn.close()

# Initialize DB when module is imported
init_db()
