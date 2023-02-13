import os

import openai
import requests
from app.config import Settings, get_settings, log
from fastapi import Depends, FastAPI
from pydantic import BaseModel


class Prompt(BaseModel):
    question: str
    botResponse: str = ""


app = FastAPI()


@app.get("/prompts")
async def get_prompts(Settings: Settings = Depends(get_settings)):
    log.info("Getting prompts")
    return {"question": "a question", "botResponse": "a bot response"}


@app.post("/prompts")
async def create_prompt(prompt: Prompt, settings: Settings = Depends(get_settings)):

    log.info(f"Prompt question {prompt.question}")

    openai.api_key = settings.openai_api_key

    response = openai.Completion.create(
        model="text-davinci-003",
        prompt=generate_prompt(prompt.question),
        temperature=0.6,
    )

    return response.choices[0].text


def generate_prompt(animal):
    return """Suggest three names for an animal that is a superhero.

Animal: Cat
Names: Captain Sharpclaw, Agent Fluffball, The Incredible Feline
Animal: Dog
Names: Ruff the Protector, Wonder Canine, Sir Barks-a-Lot
Animal: {}
Names:""".format(
        animal.capitalize()
    )
