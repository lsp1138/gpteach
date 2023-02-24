import React, { useState, useEffect } from "react";
import {
  Container,
  Navbar,
  Nav,
  Col,
  Row,
  Form,
  Button,
} from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import axios from "axios";

const renderComponents = {
  content: renderMarkdown,
  table: (children) => "nothing",
  multipleChoice: (children) => "nothing",
};

// Render components refactor when possible
function renderMarkdown(children) {
  return <ReactMarkdown children={children} remarkPlugins={[remarkGfm]} />;
}

function App() {
  const data = [
    {
      question: "What does cat mean in Portuguese",
      botResponse: {
        type: "content",
        body: "Cat is *gato*, and this is in portuguese would you know I am just making a long answer so I can get this tested",
      },
    },
    {
      question: "What is dog?",
      botResponse: {
        type: "content",
        body: "dog is *cao*, as much as I konw portugues this is the case and that is all that I can say",
      },
    },
    {
      question:
        "Conjugate of the verb falar in present and past tense in a table in JSON with a key 'column-heading' containing the tense as a markdown string and a scond JSON key called 'column-rows' which is an array of arrays of the pronouns and verb conjugations in the different tenses",
      botResponse: {
        type: "table",
        body: {
          columns: [
            {
              heading: "Present Tense",
              rows: [
                ["eu", "falo"],
                ["tu", "falas"],
                ["ele/ela/você", "fala"],
                ["nós", "falamos"],
                ["vós", "falais"],
                ["eles/elas/vocês", "falam"],
              ],
            },
            {
              heading: "Past Tense",
              rows: [
                ["eu", "falava"],
                ["tu", "falavas"],
                ["ele/ela/você", "falava"],
                ["nós", "falávamos"],
                ["vós", "faláveis"],
                ["eles/elas/vocês", "falavam"],
              ],
            },
          ],
        },
      },
    },
    {
      question: "Create a multiple choice question for a noun",
      botResponse: {
        type: "multipleChoice",
        body: {
          question: "What is the Portuguese word for 'cat'?",
          options: ["Gato", "Cão", "Vaca", "Casa"],
          answer: "Gato",
        },
      },
    },
  ];

  const [inputValue, setInputValue] = useState("");

  const [chatEntries, setChatEntries] = useState(data);

  const [loaded, setLoad] = useState(false);

  useEffect(() => {
    if (loaded) return;

    apiHealthcheck();
    setLoad(true);
    return;
  }, [loaded]);

  function apiHealthcheck() {
    axios
      .get("/api/healthcheck")
      .then((response) => console.log(response.data))
      .catch((error) => console.log("Failed fetch", error));
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log("in handle submit", inputValue);

    if (!inputValue) return;

    console.log("started handle submit");

    axios
      .post("/api/prompts", { question: inputValue })
      .then((response) => {
        console.log(
          "response is",
          response.data,
          "and the chatresponse is",
          chatEntries
        );

        setChatEntries([
          ...chatEntries,
          {
            question: inputValue,
            botResponse: response.data,
          },
        ]);

        console.log("chatEntries are ", chatEntries);

        setInputValue("");
      })
      .catch((error) => {
        console.log("something went wrong", error);
      });
  }

  return (
    <>
      <Navbar className="p-1" bg="dark" variant="dark">
        <Navbar.Brand href="#home">Teach GPT</Navbar.Brand>
        <Nav className="">
          <Nav.Link href="#features">Features</Nav.Link>
          <Nav.Link href="#pricing">Pricing</Nav.Link>
          <Nav.Link href="#about">About</Nav.Link>
        </Nav>
      </Navbar>
      <Container className="my-2 d-flex flex-column justify-content-end bg-light rounded">
        <Row className="overflow-auto d-flex flex-column-reverse">
          <Col>
            {chatEntries.map((entry, index) => (
              <Row key={index} className="p-2">
                <div className="markdown text-start p-2 ">
                  Q: {entry.question}
                </div>
                <div className="markdown text-start p-2 border">
                  {console.log(entry.botResponse.type)}
                  {renderComponents[entry.botResponse.type](
                    entry.botResponse.body
                  )}
                </div>
              </Row>
            ))}
          </Col>
        </Row>
        <Row className="py-3 bg-light">
          <Form>
            <Form.Group className="py-1">
              <Form.Control
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="write your question here"
              />
            </Form.Group>
            <div className="d-flex justify-content-end py-1">
              <Button
                variant="outline-dark"
                type="submit"
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </div>
          </Form>
        </Row>
      </Container>
    </>
  );
}

export default App;
