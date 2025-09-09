'use client';
import React from 'react';
import { useState, useEffect } from 'react';
import { DataProps } from '../../CustomTypes'
import { InputTextbox } from '@/components/atoms/atoms'
import { BiSearchAlt2 } from 'react-icons/bi';

type SearchBarProps = {
    data: DataProps[];
    sendToParent: (updated: DataProps[]) => void;
}

const SearchBar = ({ data, sendToParent} : SearchBarProps) => {
    const [ value, setValue ] = useState('');

    useEffect(() => {
        sendToParent(
            data.filter((item) =>
                item.title.toLowerCase().includes(value.toLowerCase())
            )
        );

    }, [value, data, sendToParent]);

    return (
        <div className='flex flex-row gap-2 items-center content-center'>
            <InputTextbox
                type='text'
                value={value}
                onChange={setValue}
                placeholder='Search...'
            />
            <BiSearchAlt2 size={30} />
        </div>
    )
}

export default SearchBar;