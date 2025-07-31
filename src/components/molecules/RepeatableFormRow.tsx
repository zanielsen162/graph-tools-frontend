'use client';
import React from 'react';
import { FormRow } from '@/components/molecules/molecules';
import { MdAddCircleOutline, MdAddCircle } from "react-icons/md";
import { IoMdRemoveCircle, IoMdRemoveCircleOutline } from "react-icons/io";


type RepeatableFormRowProps = {
    title?: string;
    subtitle?: string;
    description?: string;
    entry: React.ReactElement;
};

const RepeatableFormRow = ({ entry, title, subtitle, description }: RepeatableFormRowProps) => {
    const [entries, setEntries] = React.useState<React.ReactElement[]>([entry]);
    const [isHoveredAdd, setIsHoveredAdd] = React.useState(false);
    const [isHoveredRemove, setIsHoveredRemove] = React.useState(false);


    const addEntry = () => {
        setEntries([...entries, entry]);
    };

    const removeLastEntry = () => {
        if (entries.length > 1) {
            setEntries(entries.slice(0, -1));
        } else {
            setEntries([]);
        }
    };

    return (
        <div className='space-y-4 flex flex-col items-center'>
            {title && <h2 className='text-lg self-start font-semibold mb-2'>{title}</h2>}
            {subtitle && <h3 className='text-md font-medium mb-1'>{subtitle}</h3>}
            {description && <p className='text-sm text-gray-600 mb-4'>{description}</p>}
            {entries.map((EntryComponent, index) => (
                <FormRow key={index} entries={[EntryComponent]} />
            ))}
            <div className='flex flex-row items-center gap-2'>
                <button
                    onClick={addEntry}
                    className="text-green-600 hover:underline"
                    onMouseEnter={() => setIsHoveredAdd(true)}
                    onMouseLeave={() => setIsHoveredAdd(false)}
                    >
                    {isHoveredAdd ? (
                        <MdAddCircle className="inline-block text-xl" />
                    ) : (
                        <MdAddCircleOutline className="inline-block text-xl" />
                    )}
                </button>
                <button
                    onClick={removeLastEntry}
                    className="text-green-600 hover:underline"
                    onMouseEnter={() => setIsHoveredRemove(true)}
                    onMouseLeave={() => setIsHoveredRemove(false)}
                    >
                    {isHoveredRemove ? (
                        <IoMdRemoveCircle className="inline-block text-xl mr-1" />
                    ) : (
                        <IoMdRemoveCircleOutline className="inline-block text-xl mr-1" />
                    )}
                </button>
            </div>
        </div>
    );
}

export default RepeatableFormRow;