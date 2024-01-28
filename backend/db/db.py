import psycopg2
import uuid
import os
from dotenv import load_dotenv

load_dotenv()

def parse_text(text):
    parsed = text.replace("'", "''")
    return parsed

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
        company_id = str(uuid.uuid4()) # TODO: not okay lol
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

def insert_posts(campaign_id, posts):
    conn = get_conn()
    cur = conn.cursor()
    try:
        query = "INSERT INTO posts (post_id, campaign_id, date, status, caption, image) VALUES "
        for row in posts:
            post_id = str(uuid.uuid4())
            query += f"('{post_id}', '{campaign_id}', '{row['date']}', 'created', '{parse_text(row['caption'])}', '{row['image']}'),"
        query = query[:-1]
        cur.execute(query)
        conn.commit()
    except Exception as e:
        conn.rollback()
        raise e
    finally:
        cur.close()
        conn.close()

def select_posts(campaign_id):
    conn = get_conn()
    cur = conn.cursor()
    try:
        query = f"""
            SELECT post_id, date, status, caption, image
            FROM posts
            WHERE campaign_id='{campaign_id}'
            ORDER BY date
        """
        cur.execute(query)
        
        posts = []
        rows = cur.fetchall()
        for row in rows:
            post_id, date, status, caption, image = row
            posts.append({
                "post_id": post_id,
                "date": date,
                "status": status,
                "caption": caption,
                "image": image
            })
        return posts
    except Exception as e:
        conn.rollback()
        raise e
    finally:
        cur.close()
        conn.close()

def update_post(post_id, item_name, item):
    conn = get_conn()
    cur = conn.cursor()
    try:
        cur.execute(f"UPDATE posts SET {item_name}='{parse_text(item)}' WHERE post_id='{post_id}';")
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

def update_post_image(post_id, image):
    update_post(post_id, "image", image)