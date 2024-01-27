from models.cohere import find_theme, make_post, caption_post
from flask import Flask, jsonify, request
from flask_cors import CORS
from db.db import insert_profile, insert_posts, update_post_caption, update_post_date, update_post_status
from datetime import datetime

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
        avenues = data.get('avenues')

        campaign_id = insert_profile(company, product, era, avenues)
        theme = find_theme(company, product, era)

        # TODO: some sort of loop to generate posts, then also save to database -- move this logic to model.cohere file
        post = make_post(theme)
        caption = caption_post(post)
        # TODO: model to generate and encode image... or link? idk.
        image = "dummy"

        insert_posts(campaign_id, [{
            "date": datetime(2022, 1, 1),
            "caption": caption,
            "image": image
        }])

        return jsonify({"success": True, "message": "Profile created successfully"})
    except Exception as e:
        return bad_request(e)

@app.route('/campaign', methods=['GET'])
def campaign():
    try:
        # TODO: pull posts database and return
        post = []

        return jsonify(
            data=post
        )
    except Exception as e:
        return bad_request(e)

@app.route('/save/date', methods=['POST'])
def date():
    try:
        data = request.get_json()
        post_id = data.get('post_id')
        date = data.get('date')
        update_post_date(post_id, date)
    except Exception as e:
        return bad_request(e)

@app.route('/save/caption', methods=['POST'])
def caption():
    try:
        data = request.get_json()
        post_id = data.get('post_id')
        caption = data.get('caption')
        update_post_caption(post_id, caption)
    except Exception as e:
        return bad_request(e)
    
@app.route('/save/status', methods=['POST'])
def status():
    try:
        data = request.get_json()
        post_id = data.get('post_id')
        status = data.get('status')
        update_post_status(post_id, status)
    except Exception as e:
        return bad_request(e)

if __name__ == '__main__':
    app.run(debug=True)