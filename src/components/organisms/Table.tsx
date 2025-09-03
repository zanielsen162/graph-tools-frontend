type TableProps = {
    title?: string;
    subtitle?: string;
    description?: string;
    entries: React.ReactElement[];
};

const Table = ({ title, subtitle, description, entries }: TableProps) => {
    return (
        <div className='flex flex-col'>
            <div className="">
                {title && <h1 className='text-2xl font-bold mb-2'>{title}</h1>}
                {subtitle && <h2 className='text-xl font-semibold mb-1'>{subtitle}</h2>}
                {description && <p className='text-gray-600 dark:text-gray-300 mb-4'>{description}</p>}
                <div className=''>
                    {entries.length === 0 && (<p className='p-4'>No entries.</p>)}
                    {entries.map((EntryComponent, index) => (
                        <div key={index} className=''>
                            <hr className="my-4 bg-gray-200 border-2 dark:bg-gray-700"></hr>
                            {EntryComponent}
                            
                        </div>
                    ))}
                    <hr className="my-4 bg-gray-200 border-2 dark:bg-gray-700"></hr>
                </div>
            </div>
        </div>
    );
};

export default Table;