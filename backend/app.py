from models.cohere import find_theme, make_post, caption_post
from flask import Flask, jsonify, request
from flask_cors import CORS

import uuid
import base64

app = Flask(__name__)
cors = CORS(app)

@app.errorhandler(400)
def bad_request(e):
    return jsonify({'API error': str(e)}), 400

@app.route('/profile', methods=['POST'])
def profile():
    try:
        data = request.get_json()
        company = data.get('company')
        product = data.get('product')
        era = data.get('era')

        # TODO: save profile to database

        theme = find_theme(company, product, era)

        # TODO: some sort of multiple loop to generate posts directly here, then also save to database -- move this logic to db file
        post = make_post(theme)
        caption = caption_post(post)
        post_id = str(uuid.uuid4())

        # TODO: model to generate and encode image
        image = "dummy"

        return jsonify({"success": True, "message": "Profile created successfully"})
    except Exception as e:
        return bad_request(e)

@app.route('/campaign', methods=['GET'])
def campaign():
    try:
        # TODO: pull from database, not requests, and only return posts, not theme
        data = request.get_json()
        company = data.get('company')
        product = data.get('product')
        era = data.get('era')

        theme = find_theme(company, product, era)

        return jsonify(
            data=theme
        )
    except Exception as e:
        return bad_request(e)

@app.route('/save/date', methods=['POST'])
def date():
    try:
        data = request.get_json()
        date = data.get('date')

        # TODO: save to database

    except Exception as e:
        return bad_request(e)

@app.route('/save/caption', methods=['POST'])
def date():
    try:
        data = request.get_json()
        caption = data.get('caption')

        # TODO: save to database

    except Exception as e:
        return bad_request(e)
    
@app.route('/save/status', methods=['POST'])
def date():
    try:
        data = request.get_json()
        status = data.get('status')

        # TODO: save to database

    except Exception as e:
        return bad_request(e)

if __name__ == '__main__':
    app.run(debug=True)