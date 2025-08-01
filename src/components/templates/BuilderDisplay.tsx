import React from 'react';
import Form from '@/components/organisms/Form';

type BuilderDisplayProps = {
    title: string;
    subtitle?: string;
    description?: string;
    form: React.ReactElement<typeof Form>;
    display?: React.ReactElement;
};

const BuilderDisplay = ({title, subtitle, description, form, display}: BuilderDisplayProps) => {
    return (
        <div className="p-10 w-full flex flex-col items-center">
            <main className="flex flex-col row-start-2 items-center w-full sm:items-start">
                {title && <h1 className='text-2xl font-bold mb-1'>{title}</h1>}
                {subtitle && <h2 className='text-xl text-gray-800 italic font-semibold mb-1'>{subtitle}</h2>}
                {description && <p className='text-gray-600 dark:text-gray-300 mb-4'>{description}</p>}
                
                <div className='flex md:flex-row flex-col gap-4 w-full'>
                    <div className='flex-[1] w-full flex flex-col'>
                        {form}
                    </div>
                    {display && (
                        <div className='flex-[2] w-full flex flex-col'>
                            {display}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default BuilderDisplay;