// CartScreen.js
import React, { useState } from 'react';
import { IoReturnDownBack } from 'react-icons/io5';
import { Frame1, Frame2, Frame3, Frame4, Frame5 } from './Frames';
import { IoIosAdd } from 'react-icons/io';
import { HiMinusSmall } from 'react-icons/hi2';
import { useSelector } from 'react-redux'; // Import useSelector

const CartScreen = ({ photos, border, cartDetails, selectedFrame, setStep }) => {
  const [quantity, setQuantity] = useState(1);
  const stickers = useSelector((state) => state.stickers.items);
  const framesData = useSelector((state) => state.apidata.frameData?.frames);


  const selectedFramePrice = framesData?.find(frame => frame._id === selectedFrame);
  const framePrice = selectedFramePrice ? selectedFramePrice.price : 0;
  const CalculatetotalPrice = framePrice  * quantity;

  const renderSelectedFrame = () => {
    const frameProps = {
      photos,
      bgimage: border,
      stickers, // Pass stickers as props
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

  // Handle increment and decrement of quantity
  const handleIncrement = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const handleDecrement = () => {
    setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1)); // Ensure minimum quantity of 1
  };

  const handleProcess = () => {
    const data = {
      totalPrice: CalculatetotalPrice,
      renderedFrame: renderSelectedFrame(),
      selectedFrameId: selectedFrame,
      quantity,
    };
    cartDetails(data);
  };

  return (
    <div className="flex h-screen flex-col gap-1 items-center justify-center bg-gradient-to-r from-[#ee0979] to-[#ff6a00]">
      <div className='flex justify-between py-2 px-9 items-center mt-4 w-full'>
        <button onClick={() => setStep(4)} className='bg-gradient-to-r to-[#ff6a00] transition-transform hover:scale-110 text-white px-9 ring-2 ring-white py-4 rounded-3xl'>
          <IoReturnDownBack className='text-2xl'/>
        </button>
        <h1 className="text-5xl mr-12 font-bold text-white">Final View</h1>
        <h1></h1>
      </div>

      <div className='flex justify-center items-center h-full w-full p-6'>
        
        <div className='flex w-[50%] justify-around'>
          <div className='flex justify-center mx-5'>
            {renderSelectedFrame()}
          </div>
          <div className='flex gap-9 justify-between items-center'>
            <h1 className='text-9xl text-white'>X</h1>
            <h1 className='text-6xl text-white'>{quantity}</h1>
          </div>
        </div>

        <div className='flex justify-center items-center w-[50%]'>
          <div className='bg-gradient-to-r from-[#9437ff] to-[#00f5c8] rounded-3xl p-5'>
            <div className='bg-white p-8 flex gap-5 flex-col justify-evenly rounded-3xl w-[550px] h-[500px]'>
              <h1 className='font-medium text-xl'>Your Photo Details</h1>
              <div className='flex justify-between'>
                <h1>Frame size (4 X 1)</h1>
                <h1>₹{framePrice}</h1>
              </div>
              <div className='flex justify-between'>
                <h1>Quantity</h1>
                <div className='flex items-center justify-center gap-2 rounded-lg'>
                  <button 
                    className='px-2 py-1 text-2xl font-medium border rounded-md bg-[#065296] text-white hover:bg-[#1bd7d7]'
                    onClick={handleIncrement} // Increment quantity
                  >
                    <IoIosAdd />
                  </button>
                  <button 
                    className='px-2 py-1 text-2xl font-medium border rounded-md bg-[#065296] text-white hover:bg-[#1bd7d7]'
                    onClick={handleDecrement} // Decrement quantity
                  >
                    <HiMinusSmall />
                  </button>
                </div>
              </div>
              <hr />
              <div className='flex justify-between font-medium'>
                <h1>Total</h1>
                <h1>₹{CalculatetotalPrice}</h1>
              </div>
              <button className='bg-gradient-to-r from-[#c993fc] to-[#4cfcf9] px-[200px] py-5 rounded-xl text-2xl font-medium' onClick={handleProcess}>
                Process
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartScreen;
