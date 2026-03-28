// src/StartScreen.js
import React, { useEffect } from 'react';
import myanimation from '../asset/animation/ani3.json'
import Lottie from 'react-lottie';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFrameData, loginAPI } from '../store/apiSlice';

const StartScreen = ({ onStart }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.apidata.loginData?.token);  // Get the token from the Redux state
 // const loginStatus = useSelector((state) => state.apidata.loginStatus);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: myanimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };
  
  useEffect(() => {
    if (!token) {
      dispatch(loginAPI())
        .then(() => {
          dispatch(fetchFrameData());
        })
        .catch((err) => {
          console.log('Login error:', err);
        });
    }
  }, [dispatch, token]);

  return (
    <div className='bg-gradient-to-r from-[#a1ffce] to-[#9deaf3] flex justify-center items-center h-[100vh]'>
    {/* <div className='bg-[#9afcfd] flex justify-center items-center h-[100vh]'> */}
      <div className='flex items-center justify-center w-[50%]'>
        <Lottie options={defaultOptions} height={400} width={700}/>
      </div>
      {/* <button onClick={onStart} className='bg-gradient-to-r from-[#d40b73] to-[#e90a3a] transition-transform hover:scale-110 text-white text-4xl px-12 py-4 border-2 rounded-2xl font-medium'>Start</button> */}
      <div className='flex flex-col items-center justify-center  w-[50%]'>
        <button onClick={onStart} className='bg-gradient-to-b from-[#14e3e7] to-[#30716f] transition-transform hover:scale-110 text-slate-700 text-7xl px-1 py-1  rounded-2xl font-medium'><h1 className='bg-[#d7fffe] rounded-xl px-14 py-5'>Start</h1></button>
      </div>
    </div>
  );
}

export default StartScreen;
