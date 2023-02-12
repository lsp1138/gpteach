import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";

export default function Chat(props) {
  const [chatEntries, setChatEntries] = useState(props.chatEntries);
  const [inputValue, setInputValue] = useState("");
  // const [botResponse, setBotResponse] = useState("");

  console.log("chat entries are", props.chatEntries);

  function handleSubmit(event) {
    event.preventDefault();
    addChatEntry();
  }

  function addChatEntry() {
    setChatEntries([
      ...chatEntries,
      {
        userInput: inputValue,
        botResponse: "some bot response",
      },
    ]);
    setInputValue("");
    //setBotResponse("");
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
        {chatEntries.map((entry, index) => (
          <Col key={index} xs={12}>
            <div className="d-flex">
              <div className="p-3 mb-2 bg-light">{entry.userInput}</div>
              <div className="p-3 mb-2 bg-light">{entry.botResponse}</div>
            </div>
          </Col>
        ))}
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
