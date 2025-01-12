import React, { useState, useEffect } from "react";
import LocomotiveScroll from "locomotive-scroll";
import "remixicon/fonts/remixicon.css";
import "locomotive-scroll/dist/locomotive-scroll.css";
import { Link } from "react-router-dom";

function AboutSec() {
  const [questionCount, setQuestionCount] = useState(10);
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const topics = [
    "Ratio & Proportion",
    "Partnership Mixture",
    "Percentage",
    "Profit, Loss & Discount",
    "Speed, Time & Distance",
    "Trains",
    "Boat Times",
    "Simple & Compound Interest",
    "Work Pipes",
    "Average",
    "Mixtures and Allegations",
    "Number System",
    "HCF & LCM",
    "Distance Progressions",
    "Calendar",
    "Clock",
    "Permutation & Combination",
    "Probability",
    "Time & Work",
    "Problem on Ages",
  ];

  useEffect(() => {
    const scroll = new LocomotiveScroll({
      el: document.querySelector(".navbar"),
      smooth: true,
    });

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      scroll.destroy();
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleIncrease = () => setQuestionCount((prevCount) => prevCount + 5);
  const handleDecrease = () => {
    if (questionCount > 10) setQuestionCount((prevCount) => prevCount - 5);
  };

  const handleTopicSelection = (topic) => {
    if (selectedTopics.includes(topic)) {
      setSelectedTopics(selectedTopics.filter((t) => t !== topic));
    } else {
      setSelectedTopics([...selectedTopics, topic]);
    }
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedTopics([]); // Deselect all
    } else {
      setSelectedTopics(topics); // Select all topics
    }
    setSelectAll(!selectAll); // Toggle select all state
  };


  const handleFullScreen = () => {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    }
  };

  return (
    <div className="relative navbar w-screen" data-scroll data-scroll-speed="0">
      <div className="main-pic w-screen top-[9vh] relative text-white h-full mx-4">
        <h1 className="text-4xl flex justify-end font-[agbalumo] mr-[32px]">
          Aptitude
        </h1>
        <h1 className="font-[agbalumo] text-3xl border-zinc-500 border-b-">
          Choose A Topic
        </h1>
        <div className="aboutsec flex gap-5 justify-evenly">
          <div className="gap-5 flex flex-col">
            <h1 className="text-3xl flex justify-between w-[458px]">
              <i className="ri-corner-down-right-line">Select All</i>
              <input
                className="w-4"
                type="checkbox"
                checked={selectAll}
                onChange={handleSelectAll}
              />
            </h1>
            {topics.slice(0, 10).map((topic) => (
              <h1 key={topic} className="text-3xl flex justify-between w-[458px]">
                <i className="ri-corner-down-right-line">{topic}</i>
                <input
                  className="w-4"
                  type="checkbox"
                  checked={selectedTopics.includes(topic)}
                  onChange={() => handleTopicSelection(topic)}
                />
              </h1>
            ))}
          </div>
          
          <div className="gap-5 flex flex-col">
            {topics.slice(10).map((topic) => (
              <h1 key={topic} className="text-3xl flex justify-between w-[458px]">
                <i className="ri-corner-down-right-line">{topic}</i>
                <input
                  className="w-4"
                  type="checkbox"
                  checked={selectedTopics.includes(topic)}
                  onChange={() => handleTopicSelection(topic)}
                />
              </h1>
            ))}
          </div>
        </div>
        <h1 className="how text-3xl flex justify-center items-center gap-4 mt-8 mr-2">
          How Many Questions:-
          <input
            name="Howmanyquesitons"
            className="w-16 text-black text-center"
            type="number"
            value={questionCount}
            onChange={(e) => setQuestionCount(Number(e.target.value))}
            step="5"
            readOnly
          />
          <button
            onClick={handleIncrease}
            className="bg-green-500 hover:bg-green-700 text-white font-bold px-4 rounded"
          >
            +
          </button>
          <button
            onClick={handleDecrease}
            className="bg-red-500 hover:bg-red-700 text-white font-bold px-4 rounded"
          >
            -
          </button>
        </h1>
        <br />
        <div className="flex justify-end pr-16">
          <Link
            to={{
              pathname: "/Aptitude/topic/question/teststart",
              search: `?N=${questionCount}`
            }}
          >
            <button
              onClick={handleFullScreen}
              className="bg-red-500 px-6 py-2.5 rounded-2xl text-2xl mb-8"
              disabled={selectedTopics.length === 0} // Disable if no topics are selected
              style={{
                backgroundColor: selectedTopics.length === 0 ? "#a9a9a9" : "#ff0000",
                cursor: selectedTopics.length === 0 ? "not-allowed" : "pointer",
              }}
            >
              Start Test
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AboutSec;
