import React from "react";
import Chat from "./components/Chat";
//import axios from "axios";

const data = [{ inputValue: "input", botResponse: "some bot response" }];

function App(props) {
  return (
    <main className="container">
      <h1 className="text-black text-uppercase text-center my-4">
        Teach prompt app
      </h1>
      <Chat chatEntries={data} />
    </main>
  );
}

export default App;
