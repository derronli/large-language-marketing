from openai import OpenAI
import os
from dotenv import load_dotenv

load_dotenv()

client = OpenAI(
  api_key=os.environ.get("OPENAI_API_KEY")
)

def get_img(co_desc, product, era, theme):
    prompt = f"Using this sample prompt:\n\n'{co_desc}'\n\nThe {product} should be the central focus, and the design should evoke nostalgia and be inspired by the {era} time period with a {theme} theme. Everything else is up to you.\n\nBuild off of it and generate a series of prompts to give DallE in order to generate a product advertisement."

    make_dallE_call(prompt)

def make_dallE_call(prompt):
  # Original Image
  response = client.images.generate(
    model="dall-e-3",
    prompt=prompt,
    size="1024x1024",
    quality="standard",
    n=1,
  )
  image_url = response.data[0].url
