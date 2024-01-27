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

@app.route('/save/profile', methods=['POST'])
def profile():
    try:
        data = request.get_json()
        company = data.get('company')
        product = data.get('product')
        era = data.get('era')

        # TODO: save to database
        # TODO: generate posts directly here (separate function, not route), then save to database

        return jsonify({"success": True, "message": "Profile created successfully"})
    except Exception as e:
        return bad_request(e)

@app.route('/campaign', methods=['GET'])
def campaign():
    try:
        # TODO: pull from database instead and return posts, not theme
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
    
# move to separate function, not route
@app.route('/post')
def post():
    try:
        data = request.get_json()
        theme = data.get('theme')

        post = make_post(theme)
        caption = caption_post(post)
        post_id = str(uuid.uuid4())

        return jsonify(
            id=post_id,
            post=post,
            caption=caption
        )
    except Exception as e:
        return bad_request(e)
    
# move to separate function, not route
@app.route('/image')
def image():
    try:
        data = request.get_json()
        post_id = data.get('post_id')

        # TODO: generate and encode image
        image = "dummy"

        return jsonify(
            id=post_id,
            image=image
        )

    except Exception as e:
        return bad_request(e)

if __name__ == '__main__':
    app.run(debug=True)