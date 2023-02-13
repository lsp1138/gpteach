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
      .post("http://localhost:3000/api/prompts/", { question: inputValue })
      .then((response) => {
        console.log("response is", response.data);

        onUserInput(inputValue, response.data.question);
        setInputValue("");
      });
  }

  return (
    <Container
      style={{
        width: "60%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "lightblue",
      }}
    >
      <Row style={{ width: "100%", backgroundColor: "lightgreen" }}>
        {chatEntries.map((entry, index) => {
          console.log("entry is", entry, "index is", index);
          return (
            <Col
              key={index}
              style={{
                backgroundColor: "lightblue",
                width: "100%",
              }}
              xs={8}
            >
              <Row className="p-3 mb-2 bg-light">{entry.question}</Row>
              <Row className="p-3 mb-2 bg-light">{entry.botResponse}</Row>
            </Col>
          );
        })}
      </Row>
      <Row style={{ width: "100%", backgroundColor: "red" }}>
        <Form onSubmit={handleSubmit} className="mt-3">
          <FormControl
            type="text"
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            placeholder="Type your question here..."
          />
          <Button type="submit" className="mt-3">
            Submit
          </Button>
        </Form>
      </Row>
    </Container>
  );
}
