'use client';

import { useState } from 'react';

export default function Toggle({ labelOff, labelOn, initialState, inputName }: { labelOff: string, labelOn: string, initialState: boolean, inputName: string }) {
  const [isChecked, setIsChecked] = useState(initialState);

  const handleToggle = () => {
    setIsChecked((prevState) => !prevState);
  };

  return (
    <div className="relative flex items-center">
      <span className="text-sm font-medium text-black">{labelOff}</span>
      <label className="relative inline-flex cursor-pointer select-none items-center mx-4">
        {/* Hidden input to store the boolean value */}
        <input
          type="hidden"
          name={inputName}
          value={isChecked ? 'true' : 'false'}
        />
        <span
          className={`slider flex h-8 w-[60px] items-center rounded-full p-1 duration-200 ${isChecked ? 'bg-[#81C784]' : 'bg-[#E57373]'}`}
          onClick={handleToggle} // Use onClick for toggle behavior
        >
          <span
            className={`dot h-6 w-6 rounded-full bg-white duration-200 transform ${isChecked ? 'translate-x-[28px]' : ''}`}
          ></span>
        </span>
      </label>
      <span className="text-sm font-medium text-black">{labelOn}</span>
    </div>
  );
}
