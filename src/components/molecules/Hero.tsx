type HeroProps = {
    title?: string;
    subtitle?: string;
    description?: string;
    interactive?: React.ReactElement;
    display?: React.ReactElement;
    center?: boolean;
}

const Hero = ({ title, subtitle, interactive, description, display, center=false }: HeroProps) => {
    const bodyStyle = display || !center ? "flex sm:flex-row flex-col gap-2 min-h-0 mt-5" : "flex text-center";
    return (
        <div className={bodyStyle}>
            <div className='flex-[2] w-full flex flex-col min-h-0'>
                { title && (<h1 className='font-bold text-5xl mt-5'>{title}</h1>)}
                { subtitle && (<h2 className='font-semibold text-gray-600 dark:text-gray-300 mt-2 mb-4 italic'>{subtitle}</h2>)}
                {description && (<p className='text-gray-600 dark:text-gray-300 mb-4 sm:w-3/4'>{description}</p>)}
                { interactive && ( <div>{interactive}</div> ) }
            
            </div>

            {display && (
                <div className='flex-[1] w-full flex flex-col min-h-0'>
                {display}
                </div>
            )}
            
        </div>
    )
};

export default Hero;