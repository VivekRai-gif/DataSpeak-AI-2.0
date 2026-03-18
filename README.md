# DataSpeak AI

## Overview
DataSpeak AI is an AI-powered Business Intelligence dashboard that allows users to interact with data using natural language.

Instead of writing SQL queries, users can simply type questions like:
"Show total revenue by customer segment"

The system automatically converts the query into SQL, runs it on the dataset, and returns charts along with clear insights.

---

## Key Features

- Natural language to SQL conversion  
- Automatic chart generation (bar, line, pie)  
- AI-generated insights for better understanding  
- Fast response using Groq API  
- Clean and modern dashboard interface  

---

## Architecture

### Frontend
- React with Vite  
- Custom CSS for styling (dark theme)  
- Recharts for data visualization  
- Lucide icons  

Main pages:
- Landing page  
- Dashboard with chat input, charts, and tables  

---

### Backend
- FastAPI (Python)  
- Uvicorn server  
- Groq API (llama-3.3-70b-versatile)  
- Pandas for data handling  
- SQLite database  

---

## Dataset

- File: customer_behaviour.csv  
- Table: customer_data  
- Rows: around 11,789  

Includes:
- Customer demographics  
- Purchase behavior  
- Session duration  
- Online vs offline activity  

---

## How it works

1. User enters a query in plain English  
2. Backend sends it to the AI model  
3. AI returns SQL query, chart type, and insights  
4. Query runs on the database  
5. Results are shown as charts and tables  

---

## Tech Stack

Frontend: React, Vite, Recharts  
Backend: FastAPI, Python  
AI: Groq (LLaMA 3.3)  
Database: SQLite  
Data processing: Pandas  

---

## Setup Instructions

### Clone the repository
```bash
git clone https://github.com/your-username/DataSpeak-AI-2.0.git
cd DataSpeak-AI-2.0
