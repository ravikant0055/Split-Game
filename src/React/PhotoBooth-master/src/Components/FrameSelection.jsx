import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFrameData } from '../store/apiSlice';

const FrameSelection = ({ onSelectFrame }) => {
  const [selectedFrame, setSelectedFrame] = useState(null);

  const dispatch = useDispatch();
  
  // Get frame data from Redux store
  const framesData = useSelector((state) => state.apidata.frameData?.frames);

  // You can add a loading state here if needed (for API call progress)
  const isLoading = useSelector((state) => state.apidata.frameDataStatus);

  useEffect(() => {
    // Dispatch fetchFrameData action if framesData is not available yet
    if (!framesData) {
      dispatch(fetchFrameData());
    }
  }, [dispatch, framesData]);

  //If framesData is null or undefined, show a loading state or error message
  if (isLoading) {
    return <div>Loading frames...</div>;
  }

  if (!framesData || framesData.length === 0) {
    return <div>No frames available</div>;
  }

  return (
    <div className="flex flex-col w-full h-screen text-slate-700 items-center bg-gradient-to-r from-[#a1ffce] to-[#9deaf3]">
      <div className='mt-10'>
        <h1 className="text-5xl font-bold text-slate-700">Select Frames</h1>
      </div>
      <div className="w-full h-full">
        <div className="flex items-center justify-center gap-5 w-full h-full">
          {framesData.map((frame) => (
            <button
              onClick={() => {
                setSelectedFrame(frame._id);
                onSelectFrame(frame._id); // Pass the entire frame object
              }}
              key={frame._id}
              className={`text-nowrap font-medium p-4 ${selectedFrame === frame._id ? 'border-2 border-yellow-500' : ''}`}
            >
              <img src={frame.frameImage} alt="frame" className="w-full h-auto" />
              <h1 className="mt-7 text-lg">{frame.price}</h1>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FrameSelection;
