from models.cohere import find_theme, make_post, caption_post
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

        # company = "HeartConnect is a pioneering dating app company dedicated to bringing people together through meaningful connections. Our mission is to create a space where individuals can discover genuine relationships, whether it's finding a soulmate, making new friends, or simply enjoying engaging conversations. With a commitment to user privacy and inclusivity, HeartConnect is redefining the way people meet and form connections in the digital age."
        # product = "Introducing HeartSync, our flagship dating app designed to make the journey of finding love both exciting and authentic. HeartSync goes beyond conventional swiping, incorporating intelligent matching algorithms that consider not only preferences but also shared interests, values, and communication styles. With features like icebreaker games and personalized date suggestions, HeartSync creates a fun and interactive environment for users to forge meaningful connections. Join HeartSync today and embark on a journey to discover the connection your heart truly desires."
        # era = "early 2000s"

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

        return jsonify(
            post=post,
            caption=caption
        )
    except Exception as e:
        return jsonify({'API error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)