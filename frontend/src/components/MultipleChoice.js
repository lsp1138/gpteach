// A flex box with multiple choice questions
// questions are rendered as groups of radio buttons with
// a built in handler that returns correct of incorrect and a
// a score when all the questions are answered

import { useState } from "react";

export default function MultipleChoice({ questions }) {
  const [scores, setScores] = useState({});
  const [finalScore, setFinalScore] = useState("");
  const [status, setStatus] = useState("not-answered");

  function handleAnswer(questionId, score) {
    setScores({
      ...scores,
      [questionId]: score,
    });
  }

  function handleSubmit() {
    setStatus("submitted");
    setFinalScore(
      `${Object.values(scores).reduce((a, b) => a + b, 0)}/${questions.length}`
    );
  }

  if (
    status === "not-answered" &&
    Object.keys(scores).length === questions.length
  ) {
    setStatus("answered");
  }

  return (
    <div className="d-flex flex-column p-1">
      {questions.map((mcQuestion, index) => (
        <RadioFormInputGroup
          key={index}
          onAnswer={handleAnswer}
          score={scores[mcQuestion.id] ?? 0}
          status={status}
          {...mcQuestion}
        />
      ))}
      <div className="d-flex justify-content-start">
        <button onClick={handleSubmit} disabled={status !== "answered"}>
          Submit
        </button>
      </div>
      {status === "submitted" ? (
        <p className="alert alert-light">Final score is: {finalScore}</p>
      ) : (
        ""
      )}
    </div>
  );
}

function RadioFormInputGroup({
  id,
  question,
  options,
  onAnswer,
  score,
  status,
}) {
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
                onClick={() => onAnswer(id, option?.isCorrect || false)}
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
      {status === "submitted" ? (
        <p className={"alert alert-" + (score ? "success" : "danger")}>
          {score ? "Correct" : "Incorrect"}
        </p>
      ) : (
        ""
      )}
    </div>
  );
}

// create an alert box in bootstrap which shows if a answer is right or wrong
