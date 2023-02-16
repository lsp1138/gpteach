import React, { useState } from "react";
import {
  Container,
  Navbar,
  Nav,
  Col,
  Row,
  Form,
  Button,
} from "react-bootstrap";
import axios from "axios";

function App() {
  const data = [
    {
      question: "cat",
      botResponse:
        "cat is gato, and this is in portuguese would you know I am just making a long answer so I can get this tested",
    },
    {
      question: "dog",
      botResponse:
        "dog is cao, as much as I konw portugues this is the case and that is all that I can say",
    },
  ];

  const [inputValue, setInputValue] = useState("");

  const [chatEntries, setChatEntries] = useState(data);

  function handleSubmit(event) {
    event.preventDefault();
    console.log("in handle submit", inputValue);

    if (!inputValue) return;

    console.log("started handle submit");

    axios
      .post("http://localhost:3000/prompts/", { question: inputValue })
      .then((response) => {
        console.log("response is", response.data);

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
        console.log("something went wrong");
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
      <Container className="my-2 d-flex flex-column justify-content-end bg-secondary rounded overflow-auto">
        <Row>
          <Col>
            {chatEntries.map((entry, index) => (
              <Row key={index} className="p-2">
                <div class="text-start p-1">
                  <b>{entry.question}</b>
                </div>
                <div class="text-start p-1 border rounded border-dark">
                  {entry.botResponse}
                </div>
              </Row>
            ))}
          </Col>
        </Row>
        <Row className="py-3">
          <Form>
            <Form.Group className="py-1">
              <Form.Control
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="write your question here"
              />
            </Form.Group>
            <div class="d-flex justify-content-end py-1">
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
