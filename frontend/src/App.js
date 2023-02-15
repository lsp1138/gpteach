import React from "react";
import { Container, Col, Row, Form, Button } from "react-bootstrap";
//import Chat from "./components/Chat";
//import axios from "axios";

function App() {
  const chatHistory = [
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

  // const [chatEntries, setChatEntries] = useState(data);

  // function onUserInput(question, botResponse) {
  //   setChatEntries([
  //     ...chatEntries,
  //     {
  //       question: question,
  //       botResponse: botResponse,
  //     },
  //   ]);
  // }

  return (
    <>
      <h1>Teach Teach Teach</h1>
      <Container className="border">
        <Row>
          <Col>
            {chatHistory.map((entry, index) => (
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
              <Form.Label>Input your questions here</Form.Label>
              <Form.Control placeholder="Prompt" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Row>
      </Container>
    </>
  );
}

export default App;
