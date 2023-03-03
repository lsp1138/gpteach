import { useState } from "react";

export default function MultipleChoice({ questions }) {
  const [scores, setScores] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  function handleAnswer(questionId, score) {
    setScores({
      ...scores,
      [questionId]: score,
    });
  }

  const allQuestionsAnswered = Object.keys(scores).length === questions.length;

  return (
    <div className="d-flex flex-column p-1">
      <div>Multiple choice question</div>
      {questions.map((mcQuestion, index) => (
        <RadioFormInputGroup
          key={index}
          onAnswer={handleAnswer}
          isAnswered={isSubmitted}
          isCorrect={scores[mcQuestion.id] ?? false}
          {...mcQuestion}
        />
      ))}
      <div className="d-flex justify-content-start">
        <button
          onClick={() => setIsSubmitted(true)}
          disabled={!allQuestionsAnswered}
        >
          Submit
        </button>
      </div>
      {isSubmitted ? <p>{JSON.stringify(scores)}</p> : ""}
    </div>
  );
}
function RadioFormInputGroup({
  id,
  question,
  options,
  onAnswer,
  isCorrect,
  isAnswered,
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
      {isAnswered ? isCorrect ? <p>correct</p> : <p>wrong</p> : ""}
    </div>
  );
}
