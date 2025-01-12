import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';

function StartTest() {
  useEffect(() => {
    // Function to enter full-screen mode
    const enterFullScreen = () => {
      const docEl = document.documentElement;
      if (docEl.requestFullscreen) {
        docEl.requestFullscreen();
      } else if (docEl.mozRequestFullScreen) { // Firefox
        docEl.mozRequestFullScreen();
      } else if (docEl.webkitRequestFullscreen) { // Chrome, Safari and Opera
        docEl.webkitRequestFullscreen();
      } else if (docEl.msRequestFullscreen) { // IE/Edge
        docEl.msRequestFullscreen();
      }
    };

    // Enter full-screen when the component is mounted
    enterFullScreen();

    // Prevent ESC key and F11 key from exiting full-screen mode
    const handleKeyDown = (e) => {
      if (e.key == 'Escape' || e.key == 'F11') {
        // Prevent default behavior (exiting full-screen mode)
        enterFullScreen();
      }
    };

    // Add event listener for keydown events
    document.addEventListener("keydown", handleKeyDown);

    // Cleanup event listener when the component is unmounted
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const [searchParams] = useSearchParams();
  const queryParamValue = searchParams.get('N');

  return (
    <div className="text-white w-full h-[100vh]">
      <div className="w-screen flex flex-col justify-center h-full items-center">
        <div className="bg-zinc-500/50 w-[65vw] pb-5 rounded-xl my-8 border-zinc-500 border-[5px] text-white pl-3 text-2xl pt-2 gap-[3.5px] flex-col flex">
          <li>The test is timed, and once started, you cannot pause or restart it.</li>
          <li>All answers must be submitted before the timer runs out.</li>
          <li>No external assistance or reference materials are allowed during the test.</li>
          <li>Participants must ensure a stable internet connection to avoid disruptions.</li>
          <li>Only one attempt is permitted per test.</li>
          <li>All results are final and cannot be disputed after submission.</li>
          <li>The test must be taken individually. Collaboration is strictly prohibited.</li>
          <li>In case of technical difficulties, reach out to support before the test ends.</li>
          <li>Cheating or unethical behavior will result in disqualification.</li>
          <li>Personal information may be collected to verify identity and ensure test integrity.</li>
          <li>The test organizers reserve the right to modify the terms and conditions at any time.</li>
          <li>By starting the test, you agree to abide by these terms and conditions.</li>
        </div>
        <div className="">
          <Link to="/Start">
            <button className="bg-red-500 px-6 py-2.5 rounded-2xl absolute right-11 text-2xl mb-2">Start Test</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default StartTest;
