from app.prompt import generate_prompt


def test_generate_prompt():

    prompt = generate_prompt("question")

    print(prompt)

    assert isinstance(prompt, str)
