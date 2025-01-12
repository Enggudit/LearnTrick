import React, { useEffect, useState } from 'react';

function Submit() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3000/submit', {
        method: 'GET',
      });
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setData(data);
      console.log(data.questions)
    } catch (error) {
      setError(error.message);
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="relative w-full h-full top-[9vh]">
      <div className="flex justify-center items-center w-full h-[81vh]">
        <div className="relative w-[50vw] bg-green-200/50 rounded-xl border-zinc-100 border-[5px] p-4">
          <span className="material-symbols-outlined text-9xl flex justify-center text-green-900">
            verified
          </span>
          <h1 className="text-center text-2xl font-bold">
            Your Score is {data ? data.finalScore : '...loading'}
          </h1>
          <br />
          <div className="flex justify-between flex-wrap">
            <h1 className="text-left ml-5 text-xl font-semibold mb-4">
              Correct answers: {data ? data.score : '...loading'}
            </h1>
            <h1 className="text-right ml-5 mr-5 text-xl font-semibold">
              Total questions: {data ? data.questions.length : '...loading'}
            </h1>
          </div>
          <h1 className="text-left ml-5 mt-2 text-xl font-semibold mb-10">
            Tab Switched: {data ? data.tabSwitchCount : '...loading'}
          </h1>
          {error && <p className="text-red-500 text-center">{error}</p>}
        </div>
      </div>
      <div className="mx-2">
        <h3 className="text-white text-2xl">Questions with Correct Answer Highlighted:</h3>
        <div className='flex flex-wrap justify-center'>
          {data &&
            data.questions.map((question, index) => (
              <div key={index} className="my-5 p-4 bg-gray-800 rounded-lg text-white w-[70%]">
                <p className="mb-2">
                  <strong>Q{index + 1}:</strong> {question.questions}
                </p>
                {question.option.map((option, optionIndex) => {
                  let optionClass = 'bg-gray-300 text-black'; // Default style

                  if (option === question.answer)
                    {
                    optionClass = 'bg-green-500 text-white font-semibold'; // Correct answer in green
                  } else if ( data.selectedOption && data.selectedOption[index] === option && option !== question.answer)
                  {
                    optionClass = 'bg-red-500 text-white'; // Incorrectly selected answer in blue
                  }

                  return (
                    <p
                      key={optionIndex}
                      className={`p-2 rounded-md border-zinc-900 border-[2px] mb-2 ${optionClass}`}
                    >
                      {optionIndex + 1}. {option}
                    </p>
                  );
                })}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Submit;
