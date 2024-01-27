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
        company_id = str(uuid.uuid4()) # not okay lol
        campaign_id = str(uuid.uuid4())
        cur.execute('INSERT INTO companies (campaign_id, company_id, company, product, era, avenues) VALUES (%s, %s, %s, %s, %s, %s);',
                    (campaign_id, company_id, company, product, era, avenues))
        conn.commit()
    except Exception as e:
        conn.rollback()
        raise e
    finally:
        cur.close()
        conn.close()
        return campaign_id
    
def update_post(post_id, item_name, item):
    conn = get_conn()
    cur = conn.cursor()
    try:
        cur.execute('UPDATE posts SET (%s)=(%s) WHERE post_id=(%s);', (item_name, item, post_id))
        conn.commit()
    except Exception as e:
        conn.rollback()
        raise e
    finally:
        cur.close()
        conn.close()

def update_post_date(post_id, date):
    update_post(post_id, "date", date)


def update_post_status(post_id, status):
    update_post(post_id, "status", status)


def update_post_caption(post_id, caption):
    update_post(post_id, "caption", caption)