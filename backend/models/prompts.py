FIND_THEME_PROMPT="""
    Pick one iconic show, movie, or item from the following era for a nostalgic/throwback marketing campaign for the following company that relates to the product.

    Company description: {company}
    Product description: {product}
    Throwback/nostalgia era we want: {era}
"""

MAKE_POST_PROMPT="""
    This social media post will be an image based on the following theme. Generate a description of all visual elements concerning what the image looks like and contains. Extract only the image description itself in the response. 
    Theme: {theme}
"""

CAPTION_POST_PROMPT="""
    Generate a caption for the following social media post. The caption will engage social media users who come across this post. Remove all double quotation marks. Extract only the caption itself in the response.
    Post: {post}
"""