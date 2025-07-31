import React from "react";

type FormProps = {
    title?: string;
    subtitle?: string;
    description?: string;
    entries: React.ReactElement[];
};

const Form = ({ title, subtitle, description, entries }: FormProps) => {
    return (
        <div className='p-6 bg-white dark:bg-gray-800 rounded outline outline-3 outline-green-600 dark:outline-green-700'>
            {title && <h1 className='text-2xl font-bold mb-2'>{title}</h1>}
            {subtitle && <h2 className='text-xl font-semibold mb-1'>{subtitle}</h2>}
            {description && <p className='text-gray-600 dark:text-gray-300 mb-4'>{description}</p>}
            <div className='space-y-6'>
                {entries.map((EntryComponent, index) => (
                    <div key={index} className='flex-1'>
                        {EntryComponent}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Form;