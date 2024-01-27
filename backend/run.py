from app import app
from db.init_db import init_db

if __name__ == '__main__':
    init_db()
    app.run(debug=True)
