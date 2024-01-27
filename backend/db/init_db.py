import os
import psycopg2

def init_db():
    conn = psycopg2.connect(
            host=os.getenv('POSTGRES_HOST'),
            database=os.getenv('POSTGRES_DB'),
            user=os.getenv('POSTGRES_USERNAME'),
            password=os.getenv('POSTGRES_PASSWORD'))

    cur = conn.cursor()
    cur.execute('CREATE TABLE IF NOT EXISTS companies ('
                'campaign_id UUID PRIMARY KEY,'
                'company_id UUID,'
                'company TEXT NOT NULL,'
                'product TEXT NOT NULL,'
                'era TEXT NOT NULL,'
                'avenues VARCHAR[] NOT NULL);')

    cur.execute('CREATE TABLE IF NOT EXISTS posts ('
                'post_id UUID PRIMARY KEY,'
                'campaign_id UUID,'
                'date DATE,'
                'status TEXT,'
                'caption TEXT,'
                'image TEXT);') #tentative
    conn.commit()

    cur.close()
    conn.close()