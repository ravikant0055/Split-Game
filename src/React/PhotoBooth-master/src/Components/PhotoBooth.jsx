import React, { useState } from 'react';
import StartScreen from './StartScreen';
import FrameSelection from './FrameSelection';
import CaptureScreen from './CaptureScreen';
import QRCodeScreem from './QRCodeScreem';
import LastScreen from './LastScreen';
import FrameEditor from './FrameEditor';
import CartScreen from './CartScreen';

const PhotoBooth = () => {
  const [step, setStep] = useState(1);
  const [selectedFrame, setSelectedFrame] = useState(null); // Update type to match the frame IDs
  const [border, setBorder] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [cartData, setCartData] = useState(null);

  const handleStart = () => setStep(2); // Move to frame selection
  const handleFrameSelect = (frameId) => {
    setSelectedFrame(frameId); // Set selected frame ID
    setStep(3); // Move to capture screen
  };

  const handleCaptureComplete = (capturedPhotos) => {
    setPhotos(capturedPhotos);
    setStep(4); // Move to Border Selection after capture
  };

  const handleBorderSelect = (selectedBorder) => {
    setBorder(selectedBorder);
    setStep(5); // Move to Final Screen after border selection
  };

  const handlePayment = (cartDetails) => {
    setCartData(cartDetails); 
    setStep(6);
  };

  const handleQr = () => {
    setStep(7);
    console.log('Success');
  };

  return (
    <div>
      {step === 1 && <StartScreen onStart={handleStart} />}
      {step === 2 && <FrameSelection onSelectFrame={handleFrameSelect} />}
      {step === 3 && <CaptureScreen framePhotos={selectedFrame} onComplete={handleCaptureComplete} setStep={setStep} />}
      {step === 4 && (
        <FrameEditor 
          capturedPhotos={photos} 
          selectedFrame={selectedFrame} // Pass the selected frame ID here
          onSelectBorder={handleBorderSelect} 
          setStep={setStep}
        />
      )}
      {step === 5 && <CartScreen photos={photos} border={border} selectedFrame={selectedFrame} cartDetails={handlePayment} setStep={setStep} />}
      {step === 6 && <QRCodeScreem cartData={cartData} success={handleQr} />}
      {step === 7 && <LastScreen/>}
    </div>
  );
};

export default PhotoBooth;
