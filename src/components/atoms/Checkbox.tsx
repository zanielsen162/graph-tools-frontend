import React from 'react';
import { RiCheckboxCircleFill, RiCheckboxBlankCircleLine  } from "react-icons/ri";

type CheckboxProps = {
    label: string;
    checked: boolean;
    onChange: (value: boolean) => void;
};

const Checkbox = ({ label, checked, onChange }: CheckboxProps) => {
    return (
        <div className="flex items-center">
            <button
                onClick={() => onChange(!checked)}
                className="focus:outline-none"
            >
                {checked ? (
                    <RiCheckboxCircleFill className="text-green-600 text-lg" onClick={() => (!checked)} />
                ) : (
                    <RiCheckboxBlankCircleLine className="text-gray-400 text-lg" onClick={() => (!checked)} />
                )}
            </button>
            <label className="ml-2 text-sm align-baseline font-medium text-gray-700 dark:text-gray-300">{label}</label>
        </div>
    );
};

export default Checkbox;