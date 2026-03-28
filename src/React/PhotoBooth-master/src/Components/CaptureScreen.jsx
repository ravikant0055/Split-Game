import React, { useState, useEffect, useRef } from 'react';
import Webcam from 'react-webcam';
import { Frame1, Frame2, Frame3, Frame4, Frame5 } from './Frames'; // Import frames
import { Howl } from 'howler'; // For playing sound
import bell from '../asset/sound/bell.mp3';
import capture from '../asset/sound/capture.mp3';

const CaptureScreen = ({ framePhotos, onComplete, setStep  }) => {
  const [photos, setPhotos] = useState([]);
  const [photonumber, setPhotonumber] = useState(0);
  const [timer, setTimer] = useState(0); // Timer state
  const [isTimerRunning, setIsTimerRunning] = useState(false); // To control timer
  const webcamRef = useRef(null);
  const intervalRef = useRef(null); // To store timer interval

  // Sounds
  const bellSound = new Howl({ src: [bell] });
  const captureSound = new Howl({ src: [capture] });

  useEffect(() => {
    switch (parseInt(framePhotos)) {
      case 1:
        setPhotonumber(3); // 4 images total
        break;
      case 2:
        setPhotonumber(6); // 8 images total
        break;
      case 3:
        setPhotonumber(1); // 6 images total
        break;
      case 4:
        setPhotonumber(2); // 4 images total
        break;
      case 5:
        setPhotonumber(4); // 4 images total
        break;
      default:
        setPhotonumber(0); // Set to 0 if no valid ID
    }
  }, [framePhotos]);

  // Capture photo after timer finishes
const capturePhoto = () => {
  if (photos.length < photonumber) {
    const photo = webcamRef.current.getScreenshot();
    setPhotos([...photos, photo]);
    captureSound.play(); // Play capture sound
  } else {
    alert('Photo limit reached!');
    setIsTimerRunning(false); // Ensure timer is stopped if limit is reached
  }
};

// Start timer and play bell sound
const startTimer = () => {
  if (photos.length >= photonumber) {
    alert('You have reached the maximum number of photos.');
    return; // Prevent starting the timer if the photo limit is reached
  }

  setTimer(3); // Set timer to 3 seconds (or any value you want)
  setIsTimerRunning(true);
  bellSound.play(); // Play bell sound
  intervalRef.current = setInterval(() => {
    setTimer((prev) => {
      if (prev === 1) {
        clearInterval(intervalRef.current); // Clear interval when the timer reaches 0
        capturePhoto(); // Capture photo when timer finishes
        setIsTimerRunning(false);
        return 0;
      }
      return prev - 1;
    });
  }, 1000);
};


  // Handle retake (reset)
  const handleRetake = () => {
    setPhotos([]); // Clear the captured photos
    setIsTimerRunning(false);
    setTimer(0); // Reset timer
    clearInterval(intervalRef.current); // Clear any running timer
  };

  // Render the selected frame
  const renderFrame = () => {
    switch (framePhotos) {
      case 1:
        return <Frame1 photos={photos} bgcolor="#fffff" />;
      case 2:
        return <Frame2 photos={photos} bgcolor="#fffff" />;
      case 3:
        return <Frame3 photos={photos} bgcolor="#fffff" />;
      case 4:
        return <Frame4 photos={photos} bgcolor="#fffff" />;
      case 5:
        return <Frame5 photos={photos} bgcolor="#fffff" />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-r from-[#ee0979] to-[#ff6a00]">
      <h1 className="text-3xl font-bold text-center mt-9 text-white">Capture your moments</h1>
      <div className="flex justify-between p-[20px] h-full">
        {/* Frame Display */}
        <div className="flex flex-col items-center justify-center w-full p-[10px] gap-2">
          {renderFrame()}
        </div>

        {/* Camera Capture */}
        <div className="flex w-full gap-14 items-center justify-center">
          <div className="flex items-center flex-col gap-7">
            <h1 className="text-3xl font-bold text-white">Look Here</h1>
            <div className='relative border-2 rounded-xl border-white shadow-2xl shadow-pink-700 overflow-hidden'>
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/png"
                width={450}
                height={250}
                className="object-cover"
              />
              {/* Timer Overlay */}
              {isTimerRunning && (
                <div className="absolute object-cover top-0 left-0 right-0 bottom-0 flex items-center justify-center text-6xl font-bold text-white bg-black bg-opacity-50">
                  {timer}
                </div>
              )}
            </div>
          
            <div className="flex justify-center gap-5">
              <button
                onClick={startTimer}
                className="bg-white px-3 py-1 rounded-lg font-medium"
                disabled={isTimerRunning} // Disable button while timer is running
              >
                {isTimerRunning ? `Taking photo` : 'Take Photo'}
              </button>
              <button
                onClick={handleRetake}
                className="bg-white px-3 py-1 rounded-lg font-medium"
              >
                Retake
              </button>
              <button
                onClick={() => setStep(2)}
                className="bg-white px-3 py-1 rounded-lg font-medium"
              >
                Change Frame
              </button>
            </div>

            <div className="text-center">
              {photos.length === photonumber && (
                <button
                  onClick={() => onComplete(photos)}
                  className="text-xl bg-gradient-to-r from-[#2c2c2d] to-[#324c69] text-white px-4 py-2 rounded-xl"
                >
                  Complete Capture
                </button>
              )}
            </div>
          </div>

          <div className="mb-14">
            <h1 className="text-4xl font-medium text-white">
              ({photos.length}/{photonumber})
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaptureScreen;
