import React, { useState, useEffect } from 'react';

const useWindowWidth = () => {
  // Set a default width for static rendering.
  // If window is undefined, we will use this value as a default.
  let defaultWidth = 900;

  // Window is only defined in the browser.
  if (typeof window !== 'undefined') {
    defaultWidth = window.innerWidth;
  }

  // Create a width state property and a method to setWidth with.
  // Set width to the default value.
  const [width, setWidth] = useState(defaultWidth);

  // Add / remove an event listener for window resize.
  useEffect(() => {
    // define an event handler so it can be added and removed.
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  // Return the width state value.
  return width;
};

export default useWindowWidth;
