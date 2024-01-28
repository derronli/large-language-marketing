import requests
from models.cohere import find_theme, make_post
from models.dallE import edit_img
from flask import Flask, jsonify, request, send_file
from flask_cors import CORS
from db.db import insert_profile, insert_posts, update_post_caption, update_post_date, update_post_status, select_posts, update_post_image
from models.instagram import createMediaObject, publishMedia, init_creds
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
        avenues = data.get('avenues')

        # save profile for campaign
        campaign_id = insert_profile(company, product, era, avenues)

        # generate theme
        theme = find_theme(company, product, era)

        # generate posts
        posts = make_post(theme, product, era)

        # save posts for campaign
        insert_posts(campaign_id, posts)

        return jsonify(
            id=campaign_id
        )
    except Exception as e:
        return bad_request(e)

@app.route('/campaign', methods=['GET'])
def campaign():
    try:
        campaign_id = request.args.get('campaign_id')
        posts = select_posts(campaign_id)
       
        return jsonify(
            data=posts
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
        return jsonify({"success": True})
    except Exception as e:
        return bad_request(e)

@app.route('/save/caption', methods=['POST'])
def caption():
    try:
        data = request.get_json()
        post_id = data.get('post_id')
        caption = data.get('caption')
        update_post_caption(post_id, caption)
        return jsonify({"success": True})
    except Exception as e:
        return bad_request(e)
    
@app.route('/save/status', methods=['POST'])
def status():
    try:
        data = request.get_json()
        post_id = data.get('post_id')
        status = data.get('status')
        update_post_status(post_id, status)
        return jsonify({"success": True})
    except Exception as e:
        return bad_request(e)
    
@app.route('/instagram', methods=['POST'])
def instagram_post():
    try:
        params = init_creds()
        data = request.get_json()

        params['media_type'] = data.get('media_type')
        params['media_url'] = data.get('media_url')
        params['caption'] = data.get('caption')

        imageMediaObjectResponse = createMediaObject( params ) # create a media object through the api
        publishImageResponse = publishMedia( imageMediaObjectResponse['id'], params ) # publish the media object you just create
        return publishImageResponse, 200
    except Exception as e:
        return bad_request(e)

if __name__ == '__main__':
    app.run(debug=True)

@app.route('/erase', methods=['POST'])
def erase_post():
    try:
        data = request.get_json()
        post_id = data.get('post_id')
        image_url = data.get('image_url')
        prompt = data.get('prompt')

        _, encoded = image_url.split(',', 1)
        image_binary = base64.b64decode(encoded)

        image = edit_img(image_binary, prompt)
        update_post_image(post_id, image)

        return jsonify({ 'success': True})

    except Exception as e:
        return bad_request(e)
    
@app.route('/proxy')
def proxy_img():
    try:
        url = request.args.get('url')
        response = requests.get(url)

        base64_image = base64.b64encode(response.content).decode('utf-8')
        return jsonify({'image': base64_image})

        # headers = {key: value for key, value in response.headers.items()}
        # return send_file(response.content, mimetype=response.headers['Content-Type'])
    except Exception as e:
        return bad_request(e)