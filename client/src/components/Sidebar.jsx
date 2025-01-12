import React from 'react';

function Sidebar({ totalQuestions, currentQuestionIndex, onSelectQuestion }) {
  return (
    <div className="w-1/4 bg-gray-200 p-4">
      <h2 className="text-lg font-bold mb-4">Questions</h2>
      <ul>
        {[...Array(totalQuestions).keys()].map(index => (
          <li
            key={index}
            onClick={() => onSelectQuestion(index)}
            className={`cursor-pointer p-2 mb-2 rounded ${index === currentQuestionIndex ? 'bg-blue-500 text-white' : 'bg-white'} hover:bg-blue-200`}
          >
            Question {index + 1}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
