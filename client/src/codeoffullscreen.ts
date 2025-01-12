import React, { useState, useEffect } from 'react';

const FullScreenButton = () => {
  const [tabSwitchCount, setTabSwitchCount] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false); // Track full-screen mode state

  // Function to enter full-screen mode
  const handleFullScreen = () => {
    const elem = document.documentElement; // Get the document's root element

    if (!document.fullscreenElement) {
      if (elem.requestFullscreen) {
        elem.requestFullscreen().then(() => setIsFullScreen(true)); // Set full-screen state to true on success
      } else if (elem.mozRequestFullScreen) { // For Firefox
        elem.mozRequestFullScreen().then(() => setIsFullScreen(true));
      } else if (elem.webkitRequestFullscreen) { // For Chrome, Safari, and Opera
        elem.webkitRequestFullscreen().then(() => setIsFullScreen(true));
      } else if (elem.msRequestFullscreen) { // For IE/Edge
        elem.msRequestFullscreen().then(() => setIsFullScreen(true));
      }
    }
  };

  // Function to exit full-screen mode (optional)
  const handleExitFullScreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
      setIsFullScreen(false); // Set full-screen state to false
    }
  };

  // Detect tab visibility change to handle full-screen re-entry when returning to the tab
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        setTabSwitchCount((prevCount) => prevCount + 1);
      }

      // If returning to the tab and full-screen mode was active, re-enter full-screen
      if (document.visibilityState === 'visible' && isFullScreen && !document.fullscreenElement) {
        handleFullScreen(); // Re-enter full-screen mode when the user returns to the tab
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isFullScreen]);

  return (
    <div className='mt-[52vh]'>
      <button onClick={handleFullScreen} className="bg-blue-500 text-white p-2 rounded">
        Enter Fullscreen
      </button>
      <button onClick={handleExitFullScreen} className="bg-red-500 text-white p-2 rounded ml-2">
        Exit Fullscreen
      </button>
      <p className="mt-4">
        Tab switch count: <strong>{tabSwitchCount}</strong>
      </p>
    </div>
  );
};

export default FullScreenButton;
