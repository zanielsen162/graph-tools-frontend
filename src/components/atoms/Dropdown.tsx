import React from 'react';
import { FaShuffle } from "react-icons/fa6";
import { IconContext } from "react-icons";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { useState } from 'react';


type DropdownProps = Omit<React.ComponentProps<"select">, "className"> & {
    options: { value: string; label: string }[];
    label: string;
    randomFunc?: () => void;
};

const Dropdown = ({ options, label, randomFunc, ...props }: DropdownProps) => {
    const [selectedValue, setSelectedValue] = useState('');
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedValue(e.target.value);
        if (props.onChange) {
            props.onChange(e);
        }
    };
    const selectedOption = options.find(option => option.value === selectedValue);


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
            <div className='flex flex-col w-full relative gap-2'>
                <button className='flex items-center justify-between w-full p-2 border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200'>
                    <p className={selectedOption ? 'text-black' : 'text-gray-400'}>{selectedOption?.label || 'Select an option here...'}</p>
                    <button className='arrow-icon' onClick={setDropdownOpen.bind(null, !dropdownOpen)}>
                        { dropdownOpen ? <IoIosArrowUp className="text-sm text-gray-500 hover:text-gray-700 focus:outline-none"/> : <IoIosArrowDown className="text-sm text-gray-500 hover:text-gray-700 focus:outline-none"/> }
                    </button>
                </button>
                {dropdownOpen && (
                    <ul className='p-2 bg-white border border-gray-300 rounded-lg mt-0.5 w-full dark:bg-gray-800 dark:border-gray-600'>
                        {options.map((option) => (
                            <li key={option.value} value={option.value}>
                                <button onClick={() => {setSelectedValue(option.value); setDropdownOpen(false);}} className='w-full text-left rounded p-1 hover:bg-gray-100 dark:hover:bg-gray-700' onMouseDown={(e) => e.preventDefault()}>
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