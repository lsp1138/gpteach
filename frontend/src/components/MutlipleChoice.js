// A flex box with multiple choice questions
// questions are rendered as groups of radio buttons with
// a built in handler that returns correct of incorrect and a
// a score when all the questions are answered
import { useState } from "react";

function MultipleChoice(body, calcScore) {
  console.log("body is", body);

  const [questionScore, setQuestionScore] = useState("");

  function calculateScores() {
    console.log("calculate scores", questionScore);
  }

  function onClickHandler(question, input, isCorrect = false) {
    // receive the click from a question and update the score
    console.log("updated the score ", question, input, isCorrect);

    setQuestionScore("score is set");

    return "";
  }

  return (
    <div className="d-flex flex-column p-1">
      <div>Multiple choice question</div>
      {body.map((mcQuestion, indexQuestion) => (
        <div className="py-2" key={"question-" + indexQuestion}>
          <div className="fst-italic">{mcQuestion.question}</div>
          <div className="form-check">
            {mcQuestion.options.map((option, indexOption) => {
              // id of input
              let inputId = "input-q-" + mcQuestion.id + "-o-" + option.id;

              return (
                <div key={"option-" + indexOption}>
                  <input
                    className="form-check-input"
                    type="radio"
                    name={inputId}
                    id={inputId}
                    onClick={() =>
                      onClickHandler(mcQuestion.id, option.id, option.isCorrect)
                    }
                  />
                  <label className="form-check-label" htmlFor={inputId}>
                    {option.option}
                  </label>
                </div>
              );
            })}
          </div>
        </div>
      ))}
      <div className="d-flex justify-content-start">
        <button onClick={calculateScores}>Submit</button>
      </div>
    </div>
  );
}

export default MultipleChoice;
