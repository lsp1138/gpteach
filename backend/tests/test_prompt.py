from app.prompt import generate_prompt


def test_generate_prompt():
    assert isinstance(generate_prompt("question"), str)
