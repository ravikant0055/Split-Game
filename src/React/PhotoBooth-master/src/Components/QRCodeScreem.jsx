import React, { useRef, useEffect } from 'react';
import { toCanvas } from 'html-to-image';
import qr from '../asset/qrcode.png';  // Your QR image source

const QRCodeScreen = ({ cartData, success }) => {
  const { totalPrice, renderedFrame, selectedFrameId, quantity } = cartData;
  const frameRef = useRef(null);

  // Ensure that the QR code is loaded before taking the screenshot
  useEffect(() => {
    const img = new Image();
    img.src = qr;
    img.onload = () => {
      console.log("QR Code loaded");
    };
  }, []);

  const handlePrint = async () => {
    try {
      const renderedDiv = frameRef.current;
      if (!renderedDiv) {
        console.error('Rendered frame element not found.');
        return;
      }

      // Debugging the content of renderedDiv
      console.log('Rendered Frame Content:', renderedDiv.innerHTML);

      // Ensure renderedDiv contains content
      if (!renderedDiv.innerHTML || renderedDiv.innerHTML.trim() === '') {
        console.error('Rendered frame is empty.');
        return;
      }

      // Temporarily show the element before capturing
      renderedDiv.style.visibility = 'visible';

      // Use toCanvas instead of toJpeg
      const canvas = await toCanvas(renderedDiv);

      // Debugging the canvas content
      console.log('Canvas:', canvas);

      // Convert the canvas to a Base64 JPEG image
      const imageBase64 = canvas.toDataURL('image/jpeg', 1); // 1 for full quality

      // Debugging the Base64 data
      console.log('Base64 Length:', imageBase64.length);
      console.log('Base64 Prefix:', imageBase64.slice(0, 30)); // Check the prefix
      console.log('Base64 Suffix:', imageBase64.slice(-30)); // Check the suffix

      if (!imageBase64.startsWith('data:image/jpeg;base64,')) {
        console.error('Generated Base64 does not start with the expected prefix.');
        return;
      }

      const paperSizeText = paperSize();

      const printData = {
        imageBase64,
        quantity,
        paperSize: paperSizeText,
      };

      const response = await window.electron.printPhoto(printData);

      if (response.status === 'success') {
        alert('Printing started...');
        success();
      } else {
        alert('Print failed: ' + response?.message);
      }
    } catch (error) {
      console.error('Error capturing the frame:', error);
    }
  };

  const paperSize = () => {
    switch (selectedFrameId) {
      case 1:
        return 's2x6';
      case 2:
        return 's4x6';
      case 3:
        return 's4x6';
      case 4:
        return 's4x6';
      case 5:
        return 's4x6';
      default:
        return 'Unknown Size';
    }
  };

  return (
    <div className="flex flex-col gap-10 w-full h-screen items-center justify-center bg-[#ffffff] bg-gradient-to-r from-[#b7dcff] to-[#ffc9df]">
      <h1 className="text-6xl font-bold text-slate-800">SCAN TO PAY</h1>
      <div className="flex shadow-xl p-5 shadow-slate-700 rounded-3xl bg-gradient-to-br from-[#0074da] to-[#ff00aa]">
        <div className="shadow-xl shadow-slate-700 rounded-3xl bg-white">
          <button onClick={handlePrint}>
            <img src={qr} className="w-[350px] h-[350px]" alt="QR Code" />
          </button>
        </div>
      </div>
      <h1 className="text-6xl font-bold text-slate-800">₹{totalPrice}</h1>

      {/* Frame content to print */}
      <div ref={frameRef} style={{ visibility: 'hidden' }}>
        {renderedFrame}
      </div>
    </div>
  );
};

export default QRCodeScreen;
