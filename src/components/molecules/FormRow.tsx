import React from "react";

type FormRowProps = {
    title?: string;
    subtitle?: string;
    description?: string;
    entries: React.ReactElement[];
    repeat?: boolean;
};

const FormRow = ({ title, subtitle, description, entries }: FormRowProps) => {
    return (
        <div className=''>
            { title && <h2 className='text-lg font-semibold mb-2'>{title}</h2> }
            { subtitle && <h3 className='text-md font-medium mb-1'>{subtitle}</h3> }
            { description && <p className='text-sm text-gray-600 mb-4'>{description}</p> }
            <div className='flex sm:flex-row flex-col gap-4'>
                {entries.map((EntryComponent, index) => (
                    <div key={index} className='flex-1'>
                        {EntryComponent}
                    </div>
                ))}
            </div>
        </div>
    )
};

export default FormRow;