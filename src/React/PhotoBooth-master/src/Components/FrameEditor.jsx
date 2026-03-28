import React, { useState } from 'react';
import { Frame1, Frame2, Frame3, Frame4, Frame5 } from './Frames';
import { IoBanSharp, IoReturnDownBack } from "react-icons/io5";
//import { SiComicfury } from 'react-icons/si';
import { GiWoodFrame } from 'react-icons/gi';
//import { RiSkipRightFill } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { addSticker } from '../store/stickersSlice';
import { MdDeleteForever } from 'react-icons/md';

// Dynamically import background images
const importAll = (r) => r.keys().map(r);
const pics = importAll(require.context('../asset/background', false, /\.(png|jpe?g|svg)$/));
const spics = importAll(require.context('../asset/stickers', false, /\.(png|jpe?g|svg)$/));

const FrameEditor = ({ capturedPhotos, selectedFrame, onSelectBorder, setStep }) => {
  const [backgroundImage, setbackgroundImage] = useState(null); // Default white
  const stickers = useSelector((state) => state.stickers.items);
  const [selectedSection, setSelectedSection] = useState('stickers'); 
 // const [fixed, setFixed] = useState(false);
  console.log("stickers",stickers);
  

  const dispatch = useDispatch();

  const handleBorderComplete = () => {
   // setFixed(true);
    onSelectBorder(backgroundImage);
  };

  const handleSticker = (sticker) => {
    console.log("sticker clicked", sticker);
    // Dispatch an action to add the sticker to the Redux store
    dispatch(addSticker({
      id: Date.now(),
      src: sticker,
      x: 0,
      y: 0,
      width: 70, // Default width
      height: 70, // Default height
    }));
  };

  const renderSelectedFrame = () => {
    const frameProps = {
      photos: capturedPhotos,
      bgimage: backgroundImage,
      stickers: stickers, // Pass stickers as props
    };

    switch (selectedFrame) {
      case 1:
        return <Frame1 {...frameProps} />;
      case 2:
        return <Frame2 {...frameProps} />;
      case 3:
        return <Frame3 {...frameProps} />;
      case 4:
        return <Frame4 {...frameProps} />;
      case 5:
        return <Frame5 {...frameProps} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-screen gap-1 items-center  bg-gradient-to-r from-[#ee0979] to-[#ff6a00]">
       
      <div className='flex justify-between py-2 px-5 items-center mt-4  w-full '>
          <button onClick={() => setStep(3)} className='bg-gradient-to-r to-[#ff6a00] transition-transform hover:scale-110 text-white px-9 ring-2 ring-white py-4 rounded-3xl'><IoReturnDownBack className='text-2xl'/></button>
           <h1 className="text-5xl font-bold text-white">Frame Editor</h1>
          <button onClick={() => setStep(5)} className='bg-gradient-to-r to-[#f0126e] transition-transform hover:scale-110 text-white flex justify-center items-center px-6 ring-2 ring-white py-4 rounded-3xl'>Skip
          {/* <RiSkipRightFill className='text-2xl '/> */}
          </button>
      </div>
      
      <div className="flex justify-center items-center w-full my-9 h-full">
        {/* Frame Editors */}
        <div className="flex flex-col w-[50%] gap-3 justify-center items-center mx-5">
          <div className='flex w-full py-3 px-4 gap-4 items-center justify-center bg-black rounded-2xl'>
              <button onClick={() => setSelectedSection('stickers')} 
                 className={`rounded-xl py-2 w-full flex items-center justify-center gap-4 ${selectedSection === 'background' ? '' : 'bg-[#393737]'}`}>

                 {/* <SiComicfury className='text-green-600 text-4xl'/> */}
                 <h1 className='text-lg font-medium text-white'>Stickers</h1>
              </button>
              <button onClick={() => setSelectedSection('background')} 
                 className={`rounded-xl py-2 w-full flex items-center justify-center gap-4 ${selectedSection === 'stickers' ? '' : 'bg-[#393737]'}`}>

                 {/* <GiWoodFrame className='text-orange-600 text-4xl'/> */}
                 <h1 className='text-lg font-medium text-white'>Background</h1>
              </button> 
          </div>

          <div className='flex w-full flex-col h-[500px] gap-8 py-9 px-6 bg-white rounded-2xl'>
            {/* Background*/}
            {selectedSection==='background' && <>
              <h1 className='font-medium'>Choose frame background</h1>
              <div className='flex justify-between gap-5 flex-wrap'>
                <button  onClick={() => setbackgroundImage(null)}
                  className='w-[70px] h-[70px] rounded-lg bg-black border-2 border-gray-600 flex items-center justify-center bg-opacity-20'>
                  <IoBanSharp className='text-3xl text-red-600'/>
                </button>
                {pics.map((pic, index) => (
                  <button key={index} onClick={() => setbackgroundImage(pic)} className='w-[70px] h-[70px] rounded-lg overflow-hidden'>
                    <img className='w-[70px] h-[70px] rounded-lg' src={pic} alt={`framebackground ${index + 1}`} loading="lazy" />
                  </button>
                ))}
              </div>
              </>
            }
            {/* Stickers */}
            {selectedSection==='stickers' && <>
              <div className='flex justify-between'>
                <h1 className='font-medium'>Choose your favorite stickers</h1>
                {stickers.length>0 && (<span className='bg-[#ea4242] rounded-lg flex items-center gap-1 px-2 font-medium text-[14px] text-white'><MdDeleteForever className=' text-lg'/>Double tap on sticker</span>)}
              </div>
              <div className='flex justify-between gap-6 flex-wrap overflow-y-auto scrollbar-hidden'>
                {spics.map((spic, index) => (
                  <button key={index} onClick={()=>handleSticker(spic)}>
                    <img className='w-[70px] h-[70px] rounded-lg' src={spic} alt={`stikers ${index + 1}`} />
                  </button>
                ))}
              </div>
              </>
            }
          </div>
        </div>
        
        <div className='w-[50%] flex justify-around'>
          {/* Frames */}
          <div className="flex items-center">
              {renderSelectedFrame()}
          </div>

          {/* Next button */}
          <div className='flex items-center'>
            <div className='bg-gradient-to-r from-[#292a5d] to-[#482436] p-2 rounded-xl h-min'>
              <button onClick={handleBorderComplete}
                  className="flex text-nowrap items-center gap-5 text-xl bg-gradient-to-r text-white  from-[#333480] to-[#ad3b52] font-medium px-4 py-3 rounded-xl">
                Next process
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default FrameEditor;
