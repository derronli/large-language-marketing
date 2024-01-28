from openai import OpenAI
import os
from dotenv import load_dotenv

load_dotenv()
client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY")
  )

def get_img(co_desc, product, era):
  prompt = f"Using this sample prompt:\n\n'{co_desc}'\n\nBuild off of it and generate a single prompt to give DallE in order to generate a digital poster advertisement for the product. The prompt should be 550 characters maximum.\n\nThe {product} should be the central focus, and the design should evoke nostalgia and be inspired by the {era} time period. Extract the theme from the above prompt and include elements in the design to convey the theme to viewers. If applicable, include the actual characters and symbols from the theme. Include the theme as text on the image. Everything else is up to you. The prompt should follow similar format to the below example:\n\nCreate a digital illustration poster with a Nike Air Force 1 shoe as the central focus, inspired by the early 2000s with a \"Pocket Monsters\" theme. Surround the shoe with colorful and unique \"Pocket Monsters\" creatures. Use vibrant reds, blues, and yellows in the shoe design to match the playful creatures. The background should resemble a \"Pocket Monsters\" adventure scene with tall grass, trainer characters, and \"Monster Balls.\" Add pixelated effects for a nostalgic Game Boy feel. Include the Nike Air Force 1 logo in a style that integrates with the theme. Feature trainers from the \"Pocket Monsters\" world wearing Nike Air Force 1 shoes. Use a vibrant color palette combining Nike and \"Pocket Monsters\" aesthetics, and integrate \"Monster Balls\" and evolution items into the typography and text. Add a slogan about \"capturing style\" in the \"Pocket Monsters\" world."


  img_prompt = make_chat_call(prompt)

  # Split the string into paragraphs using '\n\n' as the delimiter
  paragraphs = img_prompt.split('\n\n')

  if len(paragraphs) > 1:
    # Extract the second paragraph (index 1)
    img_prompt_parsed = paragraphs[1]
  else:
    img_prompt_parsed = paragraphs[0]

  img = make_dallE_call(img_prompt_parsed)
  return img

def make_chat_call(prompt):
  response = client.completions.create(
    model="gpt-3.5-turbo-instruct",
    prompt=prompt,
    max_tokens=150
  )
  # print(response.choices[0].text)
  return response.choices[0].text

def make_dallE_call(prompt):
  # Original Image
  response = client.images.generate(
    model="dall-e-3",
    prompt=prompt,
    size="1024x1024",
    quality="standard",
    n=1,
  )
  # print(response.data[0].url)
  return response.data[0].url

'''
@param imgFileName MUST be saved in temp_img_edit + MUST have .png extension
@param prompt MUST start with: "replace with..."
'''
def edit_img(imgFileName, editPrompt):
  response = client.images.edit(
    model="dall-e-2",
    image=open(f"./temp_img_edit/{imgFileName}", "rb"),
    prompt=editPrompt,
    n=1,
    size="1024x1024"
  )
  
  image_url = response.data[0].url
  print(image_url)

  ### UPDATE DB HERE
  #
  #
  #



# get_img("A sepia-toned photograph of a young woman with short hair gazing at her new QuantumX smartphone, its sleek metallic surface reflecting a blurred image of her face, reminiscent of the iconic matrix digital code. She holds the phone with a sense of wonder and curiosity, her eyes wide as she imagines the futuristic possibilities that it offers. Behind her, a futuristic cityscape at night evokes a sense of cyberculture and the exciting world of the Matrix.", "iPhone", "2000s")