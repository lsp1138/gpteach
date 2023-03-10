# project/app/config.py

import logging
from functools import lru_cache

from pydantic import BaseSettings

log = logging.getLogger("uvicorn")


class Settings(BaseSettings):
    environment: str = "dev"
    testing: bool = 0
    openai_api_key: str
    prompt_temperature: float = 0.0
    prompt_max_tokens: int = 1000

    class Config:
        env_file = ".env"


@lru_cache()
def get_settings() -> BaseSettings:
    log.info("Loading config settings from the environment...")
    return Settings()
