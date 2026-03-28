import React, { useState } from 'react';

const NameScreen = () => {
  const [name, setName] = useState('');

  const handleChange = (e) => {
    const value = e.target.value.replace(/[^a-zA-Z\s]/g, ''); // allows only letters and spaces
    setName(value);
  };

  return (
    <div className="flex h-screen gap-5 items-center justify-center bg-gradient-to-r from-[#ee0979] to-[#ff6a00]">
      <div className="bg-white w-[600px] h-[80px] rounded-xl">
        <input
          className="w-full h-full rounded-xl px-5 text-2xl font-medium text-slate-800"
          type="text"
          placeholder="Enter your name..."
          value={name}
          onChange={handleChange}
          inputMode="text"
          autoFocus
        />
      </div>
      <div className="bg-white flex justify-center items-center w-[150px] h-[80px] rounded-xl p-1">
        <button className="w-full h-full rounded-xl text-white text-2xl font-medium bg-gradient-to-r from-[#ee0979] to-[#ff6a00]">
          Next
        </button>
      </div>
    </div>
  );
};

export default NameScreen;
