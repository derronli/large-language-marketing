from models.cohere import find_theme, make_post, caption_post
from flask import Flask, jsonify, request
from flask_cors import CORS

import uuid
import base64

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

        theme = find_theme(company, product, era)

        return jsonify(
            data=theme
        )
    except Exception as e:
        return jsonify({'API error': str(e)})
    
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
        return jsonify({'API error': str(e)})

@app.route('/image')
def image():
    try:
        data = request.get_json()
        post_id = data.get('post_id')

        # call fn to generate and encode image
        image = "dummy"

        return jsonify(
            id=post_id,
            image=image
        )

    except Exception as e:
        return jsonify({'API error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)