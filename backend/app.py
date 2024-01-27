from models.cohere import test_gen
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app)

@app.errorhandler(400)
def bad_request(e):
    return jsonify(e), 400

@app.route('/test')
def hello():
    test_gen()
    return 'test'

if __name__ == '__main__':
    app.run(debug=True)