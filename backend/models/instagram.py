import os
import requests

from dotenv import load_dotenv

load_dotenv()
INSTAGRAM_ACCESS_TOKEN = os.getenv("INSTAGRAM_ACCESS_TOKEN")
INSTAGRAM_BUSINESS_ACCOUNT_ID = os.getenv("INSTAGRAM_BUSINESS_ACCOUNT_ID")

# def main():
# 	params = init_creds()
# 	params['media_type'] = 'IMAGE'
# 	params['media_url'] = 'https://justinstolpe.com/sandbox/ig_publish_content_img.png'
# 	params['caption'] = 'This is a test caption'
# 	imageMediaObjectResponse = createMediaObject( params ) # create a media object through the api    

# 	print( "\n---- IMAGE MEDIA OBJECT -----\n" ) # title
# 	print( "\tID:" ) # label
# 	print(params['access_token'])
# 	print(imageMediaObjectResponse) # id of the object
    
# 	publishImageResponse = publishMedia( imageMediaObjectResponse['id'], params ) # publish the media object you just create
# 	print( "\n---- PUBLISHED IMAGE RESPONSE -----\n" ) # title
# 	print( "\tResponse:" ) # label
# 	print( publishImageResponse ) # json response from ig api


def init_creds():
    creds = {
        'access_token': INSTAGRAM_ACCESS_TOKEN,
        'endpoint_base': 'https://graph.facebook.com/v19.0/',
        'instagram_account_id': INSTAGRAM_BUSINESS_ACCOUNT_ID
    }
    return creds

def make_api_call(url, endpoint_params, type):
    print(endpoint_params)

    if type == "POST":
        response = requests.post(url, endpoint_params)
    else:
        response = requests.get(url, endpoint_params)

    return response.json()

def createMediaObject( params ) :
	endpointParams = dict()
	url = params['endpoint_base'] + params['instagram_account_id'] + '/media'
	endpointParams['access_token'] = params['access_token'] # access token
	endpointParams['image_url'] = params['media_url']   
	endpointParams['caption'] = params['caption']
	if params['media_type'] == 'STORIES':
		endpointParams['media_type'] = params['media_type']
    

	return make_api_call( url, endpointParams, 'POST' ) # make the api call

def publishMedia( mediaObjectId, params ) :
	url = params['endpoint_base'] + params['instagram_account_id'] + '/media_publish' # endpoint url

	endpointParams = dict() # parameter to send to the endpoint
	endpointParams['creation_id'] = mediaObjectId # fields to get back
	endpointParams['access_token'] = params['access_token'] # access token

	return make_api_call( url, endpointParams, 'POST' ) # make the api call
