// A flex box with multiple choice questions
// questions are rendered as groups of radio buttons with
// a built in handler that returns correct of incorrect and a
// a score when all the questions are answered

import { useState } from "react";

export function MultipleChoice(body) {
  const [questionScore, setQuestionScore] = useState([]);
  const [isComplete, setIsComplete] = useState(false);

  function calculateScores(newScore) {
    setQuestionScore([
      ...questionScore,
      {
        ...newScore,
      },
    ]);

    setIsComplete(questionScore.length === body.length);

    console.log("is complete", isComplete);
    console.log("question score", questionScore);
  }

  function onSubmit() {
    console.log("on submit");
  }

  return (
    <div className="d-flex flex-column p-1">
      <div>Multiple choice question</div>
      {body.map((mcQuestion, index) => (
        <RadioFormInputGroup
          key={index}
          onUpdateScore={calculateScores}
          {...mcQuestion}
        />
      ))}
      <div className="d-flex justify-content-start">
        <button onClick={onSubmit} disabled={false}>
          Submit
        </button>
      </div>
    </div>
  );
}

export function RadioFormInputGroup({ id, question, options, onUpdateScore }) {
  function handleClick(e, optionId, isCorrect) {
    onUpdateScore({
      id: id,
      option: optionId,
      score: isCorrect && e.target.checked ? 1 : 0,
    });
  }

  return (
    <div>
      <div className="fst-italic">{question}</div>
      <div className="form-check">
        {options.map((option) => {
          return (
            <div key={option.id}>
              <input
                className="form-check-input"
                type="radio"
                name={"q-" + id}
                id={"q-" + id + "-o-" + option.id}
                onClick={(e) =>
                  handleClick(e, option.id, option?.isCorrect || false)
                }
              />
              <label
                className="form-check-label"
                htmlFor={"q-" + id + "-o-" + option.id}
              >
                {option.option}
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
}
