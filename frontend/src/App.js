import React, { Component } from "react";
import ChatApp from "./components/Chat";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answerHistory: [
        { userInput: "this is a question", botResponse: "this is an answer" },
      ],
    };
  }

  render() {
    return (
      <main className="container">
        <h1 className="text-white text-uppercase text-center my-4">
          Teach prompt app
        </h1>
        <div className="row">
          <ChatApp inputValue="" answer_history={this.state.answerHistory} />
        </div>
      </main>
    );
  }
}

export default App;
