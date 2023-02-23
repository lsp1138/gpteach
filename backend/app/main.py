import openai
from app.config import Settings, get_settings, log
from app.prompt import generate_prompt
from fastapi import Depends, FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel


class Prompt(BaseModel):
    question: str
    botResponse: str = ""


app = FastAPI()


origins = [
    "https://gpeatch-frontend.onrender.com",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/healthcheck")
async def healthcheck(settings: Settings = Depends(get_settings)):
    log.info(f"ENV key set: {settings.openai_api_key[:4]}")
    return "hello from fast api"


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
        temperature=0.0,
        max_tokens=500,
    )

    response_text = "[" + response.choices[0].text

    log.info(f"Bot response {response_text}")

    return response_text
