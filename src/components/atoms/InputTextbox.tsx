import React from 'react';
import { FaShuffle } from "react-icons/fa6";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { IconContext } from "react-icons";
import { useState } from 'react';

type InputTextboxProps = Omit<React.ComponentProps<"input">, "className"> & {
    placeholder: string;
    type: string;
    randomFunc?: () => void;
    label: string;
};

const InputTextbox = ({ placeholder, type, randomFunc, label, ...props }: InputTextboxProps) => {
    const [inputValue, setInputValue] = useState(type === 'number' ? 0 : '');

    function increment() {
        if (type === 'number') {
            setInputValue((prev) => Number(prev) + 1);
        }
    }

    function decrement() {
        if (type === 'number' && typeof inputValue === 'number' && inputValue >= 1) {
            setInputValue((prev) => Number(prev) - 1);
        }
    }

    return (
        <div className="flex flex-col w-full">
            <div className='flex flex-row items-center gap-2'>
                <label className="mb-2 text-sm align-baseline font-medium text-gray-700 dark:text-gray-300">{label}</label>
                {randomFunc && <button className="align-baseline text-xs text-gray-500 mb-1.5" onClick={randomFunc}>
                    <IconContext.Provider value={{ size: '1em', className: 'shuffle-icon' }}>
                        <FaShuffle />
                    </IconContext.Provider>
                </button>}
            </div>
            <div className='flex flex-row items-center gap-2'>
                <input
                    id='input-textbox'
                    type={type}
                    placeholder={placeholder}
                    className="focus:outline-none flex-1 no-spinner focus:ring-2 focus:ring-blue-500 border border-gray-300 rounded-lg p-2 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200"
                    {...props}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                /> 
                {type === 'number' && (
                    <div className="flex flex-col">
                        <button
                            type="button"
                            onClick={increment}
                            className="text-sm text-gray-500 hover:text-gray-700 focus:outline-none"
                        >
                            <IoIosArrowUp />
                        </button>
                        <button
                            type="button"
                            onClick={decrement}
                            className="text-sm text-gray-500 hover:text-gray-700 focus:outline-none"
                        >
                            <IoIosArrowDown />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default InputTextbox;