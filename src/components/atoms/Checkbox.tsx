import React from 'react';
import { RiCheckboxCircleFill, RiCheckboxBlankCircleLine  } from "react-icons/ri";

type CheckboxProps = Omit<React.ComponentProps<"input">, "className" | "onChange"> & {
    label: string;
    checked: boolean;
    onChange: (value: boolean) => void;
};

const Checkbox = ({ label, checked, onChange, ...props }: CheckboxProps) => {
    const [isChecked, setIsChecked] = React.useState(checked || false);
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