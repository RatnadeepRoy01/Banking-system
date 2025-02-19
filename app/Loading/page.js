import React from 'react'
import { useEffect, useState } from 'react';

const Loading = ({ onLoaded,done }) => {

  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (!onLoaded) {
      // Trigger the fade-out animation when `onLoaded` is true
      setFadeOut(true);
      // Remove the component from the DOM after the animation
      const timer = setTimeout(() => done(), 1000); // Adjust timing to match animation duration
      return () => clearTimeout(timer);
    }
  }, [onLoaded,done]);

  return (
    <>
   
  
    <div className={`fixed inset-0 bg-gray-100 bg-opacity-50 flex justify-center items-center transition-opacity duration-1000 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
      <div className="flex flex-col items-center">
        {/* GIF for Loading Animation */}
       <div className="w-[30vw] h-[30vw]">
        <img
          src="/images/monkey.gif"
          layout="fill"
          alt="Loading"
          className="w-full h-full object-cover"
        />
        </div>
        {/* Loading Text */}
        <p className="mt-4 text-2xl font-semibold text-gray-600 animate-pulse">
          Loading...
        </p>
      </div>
    </div>
 
</>
  )
}

export default Loading
