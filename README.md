## Inspiration
There's something about brief glints in the past that just stop you in your tracks: you dip down, pick up an old DVD of a movie while you're packing, and you're suddenly brought back to the innocent and carefree joy of when you were a kid. It's like comfort food.

So why not leverage this to make money? The ethos of nostalgic elements from everyone's favourite childhood relics turns heads. Nostalgic feelings have been repeatedly found in studies to increase consumer willingness to spend money, boosting brand exposure, conversion, and profit.

## What it does
Large Language Marketing (LLM) is a SaaS built for businesses looking to revamp their digital presence through "throwback"-themed product advertisements. 

Tinder x Mean Girls? The Barbie Movie? Adobe x Bob Ross? Apple x Sesame Street? That could be your brand, too. Here's how:

1. You input a product description and target demographic to begin a profile
2. LLM uses the data with the Co:here API to generate a throwback theme and corresponding image descriptions of marketing posts
3. OpenAI prompt engineering generates a more detailed image generation prompt featuring motifs and composition elements
4. DALL-E 3 is fed the finalized image generation prompt and marketing campaign to generate a series of visual social media advertisements
5. The Co:here API generates captions for each advertisement
6. You're taken to a simplistic interface where you can directly view, edit, generate new components for, and publish each social media post, all in one!
8. You publish directly to your business's social media accounts to kick off a new campaign 🥳

## How we built it
* **Frontend**: React, TypeScript, Vite
* **Backend**: Python, Flask, PostgreSQL
* **APIs/services**: OpenAI, DALL-E 3, Co:here, Instagram Graph API
* **Design**: Figma

## Challenges we ran into
* **Prompt engineering**: tuning prompts to get our desired outputs was very, very difficult, where fixing one issue would open up another in a fine game of balance to maximize utility
* **CORS hell**: needing to serve externally-sourced images back and forth between frontend and backend meant fighting a battle with the browser -- we ended up writing a proxy
* **API integration**: with a lot of technologies being incorporated over our frontend, backend, database, data pipeline, and AI services, massive overhead was introduced into getting everything set up and running on everyone's devices -- npm versions, virtual environments, PostgreSQL, the Instagram Graph API (_especially_)...
* **Rate-limiting**: the number of calls we wanted to make versus the number of calls we were allowed was a small tragedy

## Accomplishments that we're proud of
We're really, really proud of integrating a lot of different technologies together in a fully functioning, cohesive manner! This project involved a genuinely technology-rich stack that allowed each one of us to pick up entirely new skills in web app development. 

## What we learned
Our team was uniquely well-balanced in that every one of us ended up being able to partake in everything, especially things we hadn't done before, including:

1. DALL-E
2. OpenAI API
3. Co:here API
4. Integrating AI data pipelines into a web app
5. Using PostgreSQL with Flask
6. For our non-frontend-enthusiasts, atomic design and state-heavy UI creation :)
7. Auth0

## What's next for Large Language Marketing
* Optimizing the runtime of image/prompt generation
* Text-to-video output 
* Abstraction allowing any user log in to make Instagram Posts
* More social media integration (YouTube, LinkedIn, Twitter, and WeChat support)
* AI-generated timelines for long-lasting campaigns
* AI-based partnership/collaboration suggestions and contact-finding
* UX revamp for collaboration
* Option to add original content alongside AI-generated content in our interface
