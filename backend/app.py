from models.cohere import find_theme
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app)

@app.errorhandler(400)
def bad_request(e):
    return jsonify(e), 400

@app.route('/campaign')
def campaign():
    try:
        data = request.get_json()

        company = data.get('company')
        product = data.get('product')
        era = data.get('era')
        avenues = data.get('avenues')

        theme = find_theme(company, product, era)

        return 'campaign info here'
    except Exception as e:
        return jsonify({'Backend error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)