import React from 'react';
import { RiCheckboxCircleFill, RiCheckboxBlankCircleLine  } from "react-icons/ri";

type CheckboxProps = {
    label: string;
    checked: boolean;
    onChange: (value: boolean) => void;
    disabled?: boolean;
};

const Checkbox = ({ label, checked, onChange, disabled }: CheckboxProps) => {
    return (
        <div className="flex items-center">
            <button
                onClick={() => onChange(!checked)}
                className="focus:outline-none"
                disabled={disabled}
            >
                {checked ? (
                    <RiCheckboxCircleFill data-testid='checked-icon' className="text-green-600 text-lg" onClick={() => (!checked)} />
                ) : (
                    <RiCheckboxBlankCircleLine data-testid='unchecked-icon' className="text-gray-400 text-lg" onClick={() => (!checked)} />
                )}
            </button>
            <p className={`ml-2 text-sm align-baseline font-medium text-gray-700 dark:text-gray-300 ${disabled ? 'line-through' : ''}`}>{label}</p>
        </div>
    );
};

export default Checkbox;