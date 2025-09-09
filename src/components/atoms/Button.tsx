import React from 'react';

type ButtonProps = Omit<React.ComponentProps<"button">, "className"> &
    Omit<React.ComponentProps<"button">, "type"> & {
        buttonText: string | React.ReactElement;
        level: string;
        auto?: boolean;
        padding?: boolean;
    };


const Button = ({ buttonText, level, auto, padding, ...props }: ButtonProps) => {
    const buttonClass = level == 'primary' ? `transition ${auto ? 'w-auto' : 'w-full'} ease-in-out focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm ${padding ? 'px-5' : 'px-2' } py-2.5 me-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800` : `transition ${auto ? 'w-auto' : 'w-full'} ease-in-out dark:text-white bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm ${padding ? 'px-5' : 'px-2' } py-2.5 me-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700`;
    return (
        <button
            type="button"
            className={buttonClass}
            {...props}
        >
            {buttonText}
        </button>
    );
};


export default Button;