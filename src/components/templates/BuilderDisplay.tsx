import React from 'react';
import { TabView } from '@/components/organisms/organisms';
import  {Hero } from '@/components/molecules/molecules';

type BuilderDisplayProps = {
    title: string;
    subtitle?: string;
    description?: string;
    pages: React.ReactElement[];
    pageNames: string[];
    display?: React.ReactElement;
};

const BuilderDisplay = ({title, subtitle, description, pages, pageNames, display}: BuilderDisplayProps) => {
    return (
        <div className="p-10 w-full flex flex-col items-center">
            <main className="flex flex-col row-start-2 gap-10 items-center w-full sm:items-start">
                <Hero
                    title='Generate Graph'
                    subtitle='Basic tools for custom graph generation.'
                    description='Note the following current limitations. If any free structures are inputted, all other custom variables beyond vertex set size will be ignored.'
                    center={false}
                />
                
                <div className='flex md:flex-row flex-col gap-4 w-full items-stretch'>
                    <div className='flex-[1] w-full flex flex-col min-h-0'>
                        <TabView
                            pages={pages}
                            titles={pageNames}
                        />
                    </div>
                    {display && (
                        <div className='flex-[2] w-full flex flex-col min-h-0'>
                            {display}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default BuilderDisplay;