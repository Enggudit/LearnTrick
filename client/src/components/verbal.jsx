import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Question from './Question';

// Mock function to simulate fetching questions from a database
const fetchQuestions = () => {
  const allQuestions = [...Array(50).keys()].map(i => ({
    id: i + 1,
    question: `Question ${i + 1}`,
    options: ["Option A", "Option B", "Option C", "Option D"],
    answer: "Option A"
  }));
  // Select random 10 questions from the 50
  return allQuestions.sort(() => 0.5 - Math.random()).slice(0, 10);
};

function App() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  useEffect(() => {
    const randomQuestions = fetchQuestions();
    setQuestions(randomQuestions);
  }, []);

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSelectQuestion = (index) => {
    setCurrentQuestionIndex(index);
  };

  return (
    <div className="flex min-h-screen bg-red-50 pt-16">
      <Sidebar totalQuestions={questions.length} // Pass total questions count (always 10 here)
        currentQuestionIndex={currentQuestionIndex}
        onSelectQuestion={handleSelectQuestion}
      />
      <div className="flex-grow p-4">
        {questions.length > 0 && (
          <Question
            question={questions[currentQuestionIndex]}
            currentQuestionIndex={currentQuestionIndex}
            totalQuestions={questions.length}
          />
        )}
        <div className="flex justify-between mt-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
          >
            Previous
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
            onClick={handleNext}
            disabled={currentQuestionIndex === questions.length - 1}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
