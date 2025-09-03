import React from 'react';
import { Table } from '@/components/organisms/organisms'
import { SearchBar, TableRow } from '@/components/molecules/molecules'
import { Button, Checkbox } from '@/components/atoms/atoms'
import { useState } from 'react';
import { DataProps } from '../../CustomTypes'

type DataDisplayProps = {
    title: string;
    subtitle?: string;
    description?: string;
    data: DataProps[];
    checkboxes?: boolean;
    buttons?: { title: string | React.ReactElement, onClick: () => void; }[];
    tableButtons?: { title: string, displayType: string, onClick: (selectedItems: DataProps[]) => void; }[];
};

const DataDisplay = ( { title, subtitle, description, data, checkboxes, buttons, tableButtons } : DataDisplayProps) => {
    const [modData, setModData] = useState<DataProps[]>(data)
    const [selectAll, setSelectAll] = useState<boolean>(false)

    const handleCheckboxChange = (index: number) => {
        setModData((prev) =>
            prev.map((item, i) =>
                i === index ? { ...item, checked: !item.checked } : item
            )
        );
    };
    
    const handleSelectAll = () => {
        setSelectAll(!selectAll)
        setModData((prev) =>
            prev.map((item) => ({
                ...item,
                checked: !selectAll,
            }))
        );
    }

    const rows = modData.map((item, index) => (
    <TableRow
            key={index}
            title={item.title}
            subtitle={item.subtitle}
            body={item.body}
            checkbox={{ 
                data: item.checked || false,
                onChange: () => handleCheckboxChange(index)
            }}
            button={item.buttons ?? buttons ?? []}  // use row buttons first, fallback to general buttons
        />
    ));

    return (
        <div className="p-10 w-full flex flex-col">
            <main className="flex flex-col w-full px-6">
                {title && <h1 className='text-2xl text-center font-bold mb-1'>{title}</h1>}
                {subtitle && <h2 className='text-xl text-center dark:text-gray-400 text-gray-800 italic font-semibold mb-1'>{subtitle}</h2>}
                {description && <p className='text-gray-600 text-center dark:text-gray-300 mb-4'>{description}</p>}
                
                <div className='mx-20 pt-10 pb-4'>
                    <SearchBar 
                        data={data}
                        sendToParent={setModData}
                    />
                </div>
                
                
                {tableButtons && (
                    <div className='flex flex-col'>
                        <hr className="my-4 border-2"></hr>
                        <div className='flex flex-row w-full justify-between'>
                            <Button
                                buttonText={
                                    <div className='flex flex-row gap-4'>
                                    <Checkbox
                                        checked={selectAll}
                                        onChange={handleSelectAll}
                                    />
                                    <p className="align-baseline font-bold text-lg">Select All</p>
                                    </div>
                                }
                                level='secondary'
                                auto={true}
                                onClick={handleSelectAll}
                            />
                            

                            <div className='flex flex-row'>
                                {tableButtons.map((item, index) => (
                                    <Button
                                        key={index}
                                        buttonText={item.title}
                                        level={item.displayType}
                                        onClick={() => {
                                            const selectedItems = modData.filter(row => row.checked);
                                            item.onClick(selectedItems); // <-- modify tableButtons type to accept items
                                        }}
                                        auto={true}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                <Table
                    entries={rows}
                />
            </main>
        </div>
      
    );
};

export default DataDisplay;