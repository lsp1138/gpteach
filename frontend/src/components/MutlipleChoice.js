// A flex box with multiple choice questions
// questions are rendered as groups of radio buttons with
// a built in handler that returns correct of incorrect and a
// a score when all the questions are answered
import { useState } from "react";

export function MultipleChoice(body) {
  console.log("body is", body);

  const [questionScore, setQuestionScore] = useState([]);
  const [isComplete, setIsComplete] = useState(false);

  function calculateScores(newScore) {
    console.log("calculate scores", questionScore);

    // Set the new score
    setQuestionScore([
      ...questionScore,
      {
        ...newScore,
      },
    ]);

    setIsComplete(questionScore.length === body.length);
  }

  function onSubmit() {
    console.log("on submit");
  }

  return (
    <div className="d-flex flex-column p-1">
      <div>Multiple choice question</div>
      {body.map((mcQuestion) => (
        <RadioFormInputGroup
          key={mcQuestion.id}
          {...mcQuestion}
          onUpdateScore={calculateScores}
        />
      ))}
      <div className="d-flex justify-content-start">
        <button onClick={onSubmit} disabled={!isComplete}>
          Submit
        </button>
      </div>
    </div>
  );
}

// RadioFormInputGroup

export function RadioFormInputGroup({
  question,
  options,
  isCorrect,
  onUpdateScore,
}) {
  const [score, setScore] = useState(null);

  function handleClick(e) {
    setScore(isCorrect && e.target.value);

    onUpdateScore({ id: question.id, score: score });
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
                name={option.id}
                id={option.id}
                onClick={(e) => handleClick}
              />
              <label className="form-check-label" htmlFor={option.id}>
                {option.question}
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
}
