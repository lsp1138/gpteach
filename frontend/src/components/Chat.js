import React, { useState } from "react";
import axios from "axios";

import {
  Container,
  Row,
  Col,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";

export default function Chat({ chatEntries, onUserInput }) {
  console.log("chat entries are", chatEntries);

  const [inputValue, setInputValue] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    if (!inputValue) return;

    // simulate call to back end
    axios
      .post("http://localhost:3000/prompts/", { question: inputValue })
      .then((response) => {
        console.log("response is", response.data);
        onUserInput(inputValue, response.data);
        setInputValue("");
      });
  }

  return (
    <Container className="output-container">
      <Row className="output-container-row-pair col-12">
        {chatEntries.map((entry, index) => {
          console.log("entry is", entry, "index is", index);
          return (
            <Col key={index} className="col-12">
              <Row className="output-container-question">
                Answer: {entry.botResponse}
              </Row>
              <Row className="output-container-response">
                Question: {entry.question}
              </Row>
            </Col>
          );
        })}
      </Row>
      <Row className="prompt-container">
        <Form onSubmit={handleSubmit}>
          <FormControl
            type="text"
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            placeholder="Type your question here..."
          />
          <Button type="submit" className="m-1">
            Submit
          </Button>
        </Form>
      </Row>
    </Container>
  );
}
