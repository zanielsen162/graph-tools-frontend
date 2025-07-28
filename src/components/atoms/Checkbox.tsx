import React from 'react';
import { useState } from 'react';
import { RiCheckboxCircleFill, RiCheckboxBlankCircleLine  } from "react-icons/ri";

type CheckboxProps = Omit<React.ComponentProps<"input">, "className"> & {
    label: string;
    checked?: boolean;
};

const Checkbox = ({ label, checked, ...props }: CheckboxProps) => {
    const [isChecked, setIsChecked] = React.useState(checked || false);
    return (
        <div className="flex items-center">
            <button>
                {isChecked ? (
                    <RiCheckboxCircleFill className="text-green-600 text-lg" onClick={() => setIsChecked(!isChecked)} />
                ) : (
                    <RiCheckboxBlankCircleLine className="text-gray-400 text-lg" onClick={() => setIsChecked(!isChecked)} />
                )}
            </button>
            <label className="ml-2 text-sm align-baseline font-medium text-gray-700 dark:text-gray-300">{label}</label>
        </div>
    );
};

export default Checkbox;