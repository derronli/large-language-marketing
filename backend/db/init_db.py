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
                'company_id UUID PRIMARY KEY,'
                'company TEXT,'
                'product TEXT,'
                'era TEXT,'
                'avenues VARCHAR[]);')

    cur.execute('CREATE TABLE IF NOT EXISTS posts ('
                'post_id UUID PRIMARY KEY,'
                'date DATE,'
                'caption TEXT,'
                'image TEXT);') #tentative
    conn.commit()

    cur.close()
    conn.close()