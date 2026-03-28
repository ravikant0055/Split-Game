import React from 'react'
import myanimation from '../asset/animation/ani4.json'
import myanimation2 from '../asset/animation/ani5.json'
import Lottie from 'react-lottie';

const LastScreen = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: myanimation,
    rendererSettings: {
     preserveAspectRatio: "xMidYMid slice"
    }
  };  
  const defaultOption = {
    loop: true,
    autoplay: true,
    animationData: myanimation2,
    rendererSettings: {
     preserveAspectRatio: "xMidYMid slice"
    }
  };  
  return (
    <div className='flex items-center justify-center h-screen bg-gradient-to-r from-[#a1ffce] to-[#9deaf3]'>
        <Lottie options={defaultOption} height={400} width={600}/>
        <div className='flex flex-col items-center justify-center bg-white rounded-xl p-9 shadow-lg shadow-slate-700'>
           <Lottie options={defaultOptions} height={400} width={600}/>
           <h1 className='text-2xl font-medium'>Please collect your Photographs</h1>
        </div>
        <Lottie options={defaultOption} height={400} width={600}/>
    </div>
  )
}

export default LastScreen;