import psycopg2
import uuid
import os
from dotenv import load_dotenv

load_dotenv()

def get_conn():
    conn = psycopg2.connect(
            host=os.getenv('POSTGRES_HOST'),
            database=os.getenv('POSTGRES_DB'),
            user=os.getenv('POSTGRES_USERNAME'),
            password=os.getenv('POSTGRES_PASSWORD'))
    return conn

def insert_profile(company, product, era, avenues):
    conn = get_conn()
    cur = conn.cursor()
    try:
        company_id = str(uuid.uuid4())
        cur.execute('INSERT INTO companies (company_id, company, product, era, avenues) VALUES (%s, %s, %s, %s, %s);',
                    (company_id, company, product, era, avenues))
        conn.commit()
    except Exception as e:
        conn.rollback()
        raise e
    finally:
        cur.close()
        conn.close()