'use client';
import React from 'react';
import { FormRow } from '@/components/molecules/molecules';
import { MdAddCircleOutline, MdAddCircle } from "react-icons/md";
import { IoMdRemoveCircle, IoMdRemoveCircleOutline } from "react-icons/io";
import { Dropdown, InputTextbox } from '@/components/atoms/atoms';
import { FaBullseye } from 'react-icons/fa6';

function generateRandomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function selectRandomItem(items: any[]) {
    return items[generateRandomNumber(0, items.length - 1)];
}

type RepeatableFormRowProps<T extends Record<string, any>> = {
    title?: string;
    subtitle?: string;
    description?: string;
    data: T[];
    setData: (data: T[]) => void;
    createEmpty: () => T;
    fields: Array<
        (
            entry: T,
            index: number,
            updateEntry: (index: number, key: keyof T, value: any) => void
        ) => React.ReactElement
    >;
};


const RepeatableFormRow = <T extends Record<string, any>>({
    title,
    subtitle,
    description,
    data,
    setData,
    createEmpty,
    fields
}: RepeatableFormRowProps<T>) => {
    const [hoverAdd, setHoverAdd] = React.useState(false);
    const [hoverRemove, setHoverRemove] = React.useState(false);

    const addEntry = () => {
        const newData = [...data, createEmpty()];
        setData(newData);
    };

    const removeLastEntry = () => {
        const newData = data.length > 1 ? data.slice(0, -1) : [];
        setData(newData);
    };

    const updateEntry = (index: number, key: keyof typeof data[0], value: string) => {
        const newData = [...data];
        newData[index] = { ...newData[index], [key]: value };
        setData(newData);
    };


    return (
        <div className='space-y-4 flex flex-col items-center'>
        {title && <h2 className='text-lg self-start font-semibold mb-2'>{title}</h2>}
        {subtitle && <h3 className='text-md font-medium mb-1'>{subtitle}</h3>}
        {description && <p className='text-sm text-gray-600 mb-4'>{description}</p>}

        {data.map((entry, index) => (
            <FormRow
                key={index}
                entries={fields.map(fieldFn => fieldFn(entry, index, updateEntry))}
            />
        ))}

        <div className='flex flex-row items-center gap-2'>
            <button
                onClick={addEntry}
                className="text-green-600 hover:underline"
                onMouseEnter={()=> setHoverAdd(true)}
                onMouseLeave={()=> setHoverAdd(false)}
            >
                {hoverAdd ? <MdAddCircle className="inline-block text-xl" /> : <MdAddCircleOutline className="inline-block text-xl" />}
            </button>
            <button
                onClick={removeLastEntry}
                className="text-green-600 hover:underline"
                onMouseEnter={()=> setHoverRemove(true)}
                onMouseLeave={()=> setHoverRemove(false)}
            >
                {hoverRemove ? <IoMdRemoveCircle className="inline-block text-xl" /> : <IoMdRemoveCircleOutline className="inline-block text-xl" />}
            </button>
        </div>
        </div>
    );
};

export default RepeatableFormRow;