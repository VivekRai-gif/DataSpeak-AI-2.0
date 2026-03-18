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
    """Returns the schema of the 'customer_data' table for Prompt context."""
    return '''
    Table: customer_data
    Columns:
    - age (INTEGER)
    - monthly_income (INTEGER)
    - daily_internet_hours (REAL)
    - smartphone_usage_years (INTEGER)
    - social_media_hours (REAL)
    - online_payment_trust_score (INTEGER)
    - tech_savvy_score (INTEGER)
    - monthly_online_orders (INTEGER)
    - monthly_store_visits (INTEGER)
    - avg_online_spend (INTEGER)
    - avg_store_spend (INTEGER)
    - discount_sensitivity (INTEGER)
    - return_frequency (INTEGER)
    - avg_delivery_days (INTEGER)
    - delivery_fee_sensitivity (INTEGER)
    - free_return_importance (INTEGER)
    - product_availability_online (INTEGER)
    - impulse_buying_score (INTEGER)
    - need_touch_feel_score (INTEGER)
    - brand_loyalty_score (INTEGER)
    - environmental_awareness (INTEGER)
    - time_pressure_level (INTEGER)
    - gender (TEXT)
    - city_tier (TEXT)
    - shopping_preference (TEXT) e.g. Store, Online, Hybrid
    '''

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
