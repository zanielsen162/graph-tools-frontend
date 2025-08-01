import React from 'react';
import { FaShuffle } from "react-icons/fa6";
import { IconContext } from "react-icons";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { useState } from 'react';

type Option = { value: string; label: string };

type DropdownProps = {
  options: Option[];
  label: string;
  value: string;
  onChange: (value: string) => void;
  randomFunc?: () => void;
};

const Dropdown = ({ options, label, value, onChange, randomFunc }: DropdownProps) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const selectedOption = options.find(option => option.value === value);

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-row items-center gap-2">
        <label className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
        {randomFunc && (
          <button
            type="button"
            className="text-xs text-gray-500 mb-1.5"
            onClick={randomFunc}
          >
            <IconContext.Provider value={{ size: '1em', className: 'shuffle-icon' }}>
              <FaShuffle />
            </IconContext.Provider>
          </button>
        )}
      </div>

      <div className="relative flex flex-col gap-2">
        <button
          type="button"
          className="flex items-center justify-between w-full p-2 border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200"
          onClick={() => setDropdownOpen(prev => !prev)}
        >
          <p className={`truncate ${selectedOption ? 'text-black dark:text-gray-200' : 'text-gray-400'}`}>
            {selectedOption?.label || 'Select an option...'}
          </p>
          <span className="pl-2">
            {dropdownOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
          </span>
        </button>

        {dropdownOpen && (
          <ul className="p-2 max-h-[40vh] overflow-y-auto absolute top-full z-50 mt-1 bg-white border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-600 w-full">
            {options.map((option) => (
              <li key={option.value}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(option.value);
                    setDropdownOpen(false);
                  }}
                  className="w-full text-left rounded p-1 hover:bg-gray-100 dark:hover:bg-gray-700"
                  onMouseDown={(e) => e.preventDefault()}
                >
                  {option.label}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
