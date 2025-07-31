import React from "react";

type FormProps = {
    title?: string;
    subtitle?: string;
    description?: string;
    entries: React.ReactElement[];
    final?: React.ReactElement;
};

const Form = ({ title, subtitle, description, entries, final }: FormProps) => {
    return (
        <div className='p-6 relative bg-white dark:bg-gray-800 rounded outline outline-3 outline-green-600 md:h-[70vh] dark:outline-green-700 flex flex-col'>
            {/* Scrollable content */}
            <div className="overflow-y-auto flex-1">
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
                {/* Padding to avoid overlap with sticky footer */}
                {final && <div className="h-20" />}
            </div>

            {/* Sticky footer */}
            {final && (
                <div className="sticky bottom-0 left-0 right-0 bg-white dark:bg-gray-800 p-2 z-10">
                    <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700"></hr>
                    {final}
                </div>
            )}
        </div>
    );
};

export default Form;