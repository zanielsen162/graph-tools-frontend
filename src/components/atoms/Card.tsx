import React from 'react';

type CardProps = {
    title?: string;
    subtitle?: string;
    body?: string;
    image?: React.ReactElement;
    button?: React.ReactElement;
}

const Card = ({ title, subtitle, body, image, button }: CardProps ) => {
    return (
        <div className='rounded flex relative flex-col h-full gap-2 bg-gray-200 dark:bg-gray-700 p-4 items-center text-center'>
            { title && ( <h1 className='font-bold text-xl'>{title}</h1> ) }
            { subtitle && ( <h2 className='font-semibold text-md text-gray-600 dark:text-gray-300 italic'>{subtitle}</h2> ) }
            { body && ( <p className='text-sm'>{body}</p> ) }
            { image && ( <div>{image}</div> ) }
            { button && ( <div className='sticky bottom-0 left-0 right-0 p-2 z-10 bg-inherit'>{button}</div> ) }
        </div>
    )
}

export default Card;