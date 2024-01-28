import os
from dotenv import load_dotenv

import cohere
from models.prompts import FIND_THEME_PROMPT, MAKE_POST_PROMPT, CAPTION_POST_PROMPT
from models.dallE import get_img

from datetime import datetime

load_dotenv()
COHERE_API_KEY = os.getenv("COHERE_API_KEY")
co = cohere.Client(COHERE_API_KEY)

def use_prompt(template, **kwargs):
    prompt = template.format(**kwargs)
    return prompt

def find_theme(company, product, era):
    prompt=use_prompt(FIND_THEME_PROMPT, company=company, product=product, era=era)
    response = co.generate(
        prompt=prompt
    )

    return response.generations[0].text

def make_post(theme, product, era):
    prompt=use_prompt(MAKE_POST_PROMPT, theme=theme)
    response = co.generate(
        prompt=prompt,
        num_generations=2
    )

    descs = []
    for desc in response.generations:
        descs.append(desc.text)

    posts = []
    for desc in descs:
        image = get_img(desc, product, era)
        print(image)
        caption = caption_post(desc)
        date = datetime(2022, 1, 1)

        posts.append({
            "caption": caption,
            "date": date,
            "image": image
        })
    
    print(posts)
    return posts

def caption_post(post):
    prompt=use_prompt(CAPTION_POST_PROMPT, post={post})
    response = co.generate(
        prompt=prompt
    )

    return response.generations[0].text
