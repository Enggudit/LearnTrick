import React from 'react';

function Question({ question, currentQuestionIndex, totalQuestions }) {
  return (
    <div className=' '>
      <h2 className="text-xl font-bold mb-4">
        {`Question ${currentQuestionIndex + 1}/${totalQuestions}`}
      </h2>
      <p className="mb-4">{question.question}</p>
      <div>
        <h1>Udit </h1>
        {question.options.map((option, index) => (
          <div key={index} className="mb-2">
            <label className="flex items-center space-x-2">
              <input type="radio" name={`question_${question.id}`} />
              <span>{option}</span>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Question;
