// import React, { useState, useRef, useEffect } from 'react';
// import Webcam from 'react-webcam';

// const FilterSelection = () => {
//   const [filter, setFilter] = useState('');
//   const webcamRef = useRef(null);

//   // Define all filter styles here
//   const filters = {
//     original: '',
//     'bright-soft': 'brightness(1.5) contrast(1.1) saturate(1.2)',
//     'warm-soft': 'brightness(1.2) sepia(0.5) contrast(1.1)',
//     '90s-retro': 'contrast(1.4) saturate(1.7) sepia(0.4) hue-rotate(90deg)',
//     'black-white': 'grayscale(1)', // Fixed typo here
//   };
  
//   const myfilter = [
//     { title: 'Original', filtername: 'original' },
//     { title: 'Bright Soft', filtername: 'bright-soft' },
//     { title: 'Warm Soft', filtername: 'warm-soft' },
//     { title: '90s Retro', filtername: '90s-retro' },
//     { title: 'Black & White', filtername: 'black-white' },
//   ];

//   // Apply the filter to the video element directly when filter state changes
//   useEffect(() => {
//     const videoElement = webcamRef.current?.video?.style;

//     if (videoElement) {
//       // Set the CSS filter to the video element
//       videoElement.filter = filters[filter] || '';
//     }
//   }, [filter]); // This effect runs when the 'filter' state changes

//   return (
//     <div className="flex flex-col gap-10 items-center justify-center  h-screen bg-gradient-to-r from-[#ee0979] to-[#ff6a00]">
      
//       <div className='text-white'>
//         <h1 className='text-5xl font-bold'>Select Photo Filter</h1>
//       </div>

//       <div className='flex items-center gap-24'>
//           {/* Filter Buttons */}
//           <div className="flex flex-col gap-8 mt-4">
//             {myfilter.map((item, index) => (
//               <button
//                 key={index}
//                 onClick={() => setFilter(item.filtername)}
//                 className=" py-6 bg-white rounded-lg shadow-lg text-black transition-all duration-300 ease-in-out hover:bg-gray-200"
//               >
//                 {item.title}
//               </button>
//             ))}
//           </div>
          
//           <div className="border-2 rounded-xl border-white shadow-2xl overflow-hidden">
//             <Webcam
//               audio={false}
//               ref={webcamRef}
//               screenshotFormat="image/png"
//               width={650}
//               height={550}
//             />
//           </div>

//           {/* Filter Buttons */}
//           <div className="flex flex-col gap-8 mt-4">
//             {myfilter.map((item, index) => (
//               <button
//                 key={index}
//                 onClick={() => setFilter(item.filtername)}
//                 className=" py-6 bg-white rounded-lg shadow-lg text-black transition-all duration-300 ease-in-out hover:bg-gray-200"
//               >
//                 {item.title}
//               </button>
//             ))}
//           </div>
//       </div>

//       <div className="bg-white flex justify-center items-center w-[200px] h-[80px] rounded-xl p-1">
//         <button className="w-full h-full rounded-xl text-white text-2xl font-medium bg-gradient-to-r from-[#ee0979] to-[#ff6a00]">
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default FilterSelection;
