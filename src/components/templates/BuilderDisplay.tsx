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
        <div className="p-10">
            <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
                <h1>{title}</h1>
                {subtitle && <h2>{subtitle}</h2>}
                {description && <p>{description}</p>}
                <div className='flex flex-rows gap-4 w-full'>
                    <div className='flex-1 w-full'>
                        {form}
                    </div>
                    {display && (
                        <div className='flex-1 w-full'>
                            {display}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default BuilderDisplay;