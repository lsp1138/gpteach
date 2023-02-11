import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";

export default class ChatApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: props.inputValue ? props.inputValue : "",
      answerHistory: props.answer_history ? props.answer_history : [],
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState((state) => ({
      answerHistory: [
        ...state.answerHistory,
        {
          userInput: state.inputValue,
          botResponse: "your answer will appear here",
        },
      ],
      inputValue: "",
    }));
  };

  render() {
    const { inputValue, answerHistory } = this.state;

    console.log(inputValue, answerHistory);

    return (
      <Container
        style={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Row style={{ width: "50%" }}>
          {answerHistory.map((history, index) => (
            <Col key={index} xs={6}>
              <div className="d-flex justify-content-between">
                <div className="p-3 mb-2 bg-light">{history.userInput}</div>
                <div className="p-3 mb-2 bg-light">{history.botResponse}</div>
              </div>
            </Col>
          ))}
        </Row>
        <Form onSubmit={this.handleSubmit} className="mt-3">
          <FormControl
            type="text"
            value={inputValue}
            onChange={(event) =>
              this.setState({ inputValue: event.target.value })
            }
            placeholder="Type your question here..."
          />
          <Button type="submit" className="mt-3">
            Submit
          </Button>
        </Form>
      </Container>
    );
  }
}
