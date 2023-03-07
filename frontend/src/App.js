import React, { useState, useRef, useEffect } from "react";
import {
  Container,
  Navbar,
  Nav,
  Col,
  Row,
  Form,
  Button,
} from "react-bootstrap";
import FlexTable from "./components/FlexTable.js";
import MultipleChoice from "./components/MultipleChoice";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import axios from "axios";

const renderComponents = {
  content: (body) => (
    <ReactMarkdown children={body.content} plugin={remarkGfm} />
  ),
  table: FlexTable,
  multipleChoice: MultipleChoice,
};

const data = [
  {
    question: "What does cat mean in Portuguese",
    botResponse: {
      type: "content",
      body: {
        content:
          "Cat is *gato*, and this is in portuguese would you know I am just making a long answer so I can get this tested",
      },
    },
  },
  {
    question: "Conjugate the verb falar in present tense in a table",
    botResponse: {
      type: "table",
      body: {
        columns: [
          {
            heading: "Present Tense",
            rows: [
              ["eu", "falo"],
              ["tu", "falas"],
              ["ele/ela", "fala"],
              ["nós", "falamos"],
              ["vós", "falais"],
              ["eles/elas", "falam"],
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
        questions: [
          {
            id: 1,
            question: "What is the Portuguese word for 'cat'?",
            options: [
              { id: 1, option: "Gato", isCorrect: true },
              { id: 2, option: "Cão" },
              { id: 3, option: "Vaca" },
              { id: 4, option: "Casa" },
            ],
          },
        ],
      },
    },
  },
];

function App() {
  const [inputValue, setInputValue] = useState("");

  const [chatEntries, setChatEntries] = useState(data);

  const [loaded, setLoad] = useState(false);

  const bottomRef = useRef(null);

  useEffect(() => {
    if (loaded) return;

    apiHealthcheck();
    setLoad(true);
    return;
  }, [loaded]);

  function apiHealthcheck() {
    console.log("in healthcheck");
    axios
      .get(process.env.REACT_APP_BACKEND_URL + "/healthcheck")
      .then((response) => console.log(response.data))
      .catch((error) => console.log("Failed fetch", error));
  }

  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatEntries]);

  function handleSubmit(event) {
    event.preventDefault();

    if (!inputValue) return;

    axios
      .post(process.env.REACT_APP_BACKEND_URL + "/prompts", {
        question: inputValue,
      })
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

        setInputValue("");
      })
      .catch((error) => {
        setInputValue("");
        console.log("something went wrong", error);
      });
  }

  return (
    <>
      <Navbar className="p-1 fixed-top" bg="dark" variant="dark">
        <Navbar.Brand href="#home">GPteach</Navbar.Brand>
        <Nav className="">
          <Nav.Link href="#features">Features</Nav.Link>
          <Nav.Link href="#pricing">Pricing</Nav.Link>
          <Nav.Link href="#about">About</Nav.Link>
        </Nav>
      </Navbar>
      <Container className="mb-1 mt-5 d-flex flex-column justify-content-end bg-light">
        <Row className="overflow-auto d-flex flex-column-reverse">
          <Col>
            {chatEntries.map((entry, index) => (
              <Row key={index} className="p-2">
                <div className="markdown text-start p-2 ">
                  Q: {entry.question}
                </div>
                <div className="markdown text-start p-2 border">
                  {React.createElement(
                    renderComponents[entry.botResponse.type],
                    { ...entry.botResponse.body }
                  )}
                </div>
              </Row>
            ))}
          </Col>
        </Row>
        <Row ref={bottomRef}></Row>
      </Container>
      <Container style={{ height: "65px" }}>
        <Row className="py-3 bg-light">
          <Form>
            <Form.Group className="py-1">
              <Form.Control
                value={inputValue}
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
