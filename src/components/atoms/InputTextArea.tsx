import React from 'react';
import { FaShuffle } from "react-icons/fa6";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { IconContext } from "react-icons";

type InputTextAreaProps = Omit<React.ComponentProps<"input">, "className" | "onChange" | "value"> & {
  placeholder?: string;
  type: string;
  randomFunc?: () => void;
  label?: string;
  secondLabel?: string;
  secondLabelLink?: string;
  value: string | number;
  onChange?: (value: string) => void;
  disabled?: boolean;
};

const InputTextArea = ({
  placeholder = '',
  type,
  randomFunc,
  label,
  secondLabel,
  secondLabelLink,
  value,
  onChange=() => {},
  disabled,
}: InputTextAreaProps) => {

  function increment() {
    if (type === 'numeric') {
      const next = Number(value) + 1;
      onChange(String(next));
    }
  }

  function decrement() {
    if (type === 'numeric') {
      const next = Math.max(Number(value) - 1, 0);
      onChange(String(next));
    }
  }

  return (
    <div className={`flex flex-col w-full`}>
      <div className={ `flex flex-row items-center ${ secondLabel ? 'justify-between' : ''} gap-2`}>
        {label && <label className="mb-2 mx-1 text-sm align-baseline font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>}
        {randomFunc && !disabled && (
          <button
            type="button"
            className="align-baseline text-xs text-gray-500 mb-1.5"
            onClick={randomFunc}
          >
            <IconContext.Provider value={{ size: '1em', className: 'shuffle-icon' }}>
              <FaShuffle />
            </IconContext.Provider>
          </button>
        )}
        {secondLabel && (
          <a href={secondLabelLink || ''} className="mb-2 text-sm align-baseline font-semibold text-green-700 hover:text-green-800">
            {secondLabel}
          </a>
        )}
      </div>

      <div className='flex flex-row items-center gap-2'>
        <textarea
            id="input-textbox"
            data-testid="input-textbox"
            placeholder={placeholder}
            className="focus:outline-none mx-1 mb-1 w-full resize-none focus:ring-2 focus:ring-blue-500 border border-gray-300 rounded-lg p-2 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            disabled={disabled}
            rows={5}
        />
        {type === 'numeric' && !disabled && (
          <div className="flex flex-col">
            <button
              type="button"
              onClick={increment}
              data-testid={'up-arrow'}
              className="text-sm text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <IoIosArrowUp />
            </button>
            <button
              type="button"
              onClick={decrement}
              data-testid={'down-arrow'}
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

export default InputTextArea;