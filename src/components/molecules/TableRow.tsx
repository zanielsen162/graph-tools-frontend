import React from 'react';
import { IoIosArrowDropdown, IoIosArrowDropup } from "react-icons/io";
import { Checkbox, Button } from '@/components/atoms/atoms'

type TableRowProps = {
    title: string;
    subtitle?: string;
    body?: React.ReactElement;
    checkbox?: { onChange: (value: boolean) => void, data: boolean };
    button: { title: string | React.ReactElement, onClick: () => void; }[]
}

const TableRow = ({ title, subtitle, body, checkbox, button }: TableRowProps) => {
    const [hidden, setHidden] = React.useState<boolean>(true);
    const toggleHidden = () => setHidden(prev => !prev);

    return (
        <div className='flex flex-col'>
            <div className='flex flex-row items-center justify-between gap-2 px-4'>
                <div className='flex flex-row gap-4'>
                    { checkbox && (
                        <Checkbox
                            onChange={checkbox.onChange}
                            checked={checkbox.data}
                        />
                    )}
                    <div className='flex flex-col'>
                        <h3 className='font-bold text-lg'>{title}</h3>
                        {subtitle && (<h4 className='italic text-sm'>{subtitle}</h4>)}
                    </div>
                </div>
                <div className='flex flex-row gap-2'>
                    {button.length > 0 && button.map((item, index) => (
                        <Button
                            key={index}
                            buttonText={item.title}
                            level='secondary'
                            onClick={item.onClick}
                        />
                    ))}
                    <button onClick={toggleHidden}>
                        { hidden ? <IoIosArrowDropdown size={20} /> : <IoIosArrowDropup size={20} /> }
                    </button>
                </div>
            </div>

            <div className='mx-12.5'>
                { !hidden && body }
            </div>
        </div>
    )
}

export default TableRow;