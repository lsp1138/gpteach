import React, { useState } from "react";
import { Container, Col, Row, Form, Button } from "react-bootstrap";
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
      <h1>Teach Teach Teach</h1>
      <Container className="border">
        <Row>
          <Col>
            {chatEntries.map((entry, index) => (
              <Row key={index} className="border">
                <div>
                  <b>{entry.question}</b>
                </div>
                <div>{entry.botResponse}</div>
              </Row>
            ))}
          </Col>
        </Row>
        <Row>
          <Form>
            <Form.Group>
              <Form.Control
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="write your question here"
              />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={handleSubmit}>
              Submit
            </Button>
          </Form>
        </Row>
      </Container>
    </>
  );
}

export default App;
