import React from 'react';
import { useState } from 'react';
import { Button } from '@/components/atoms/atoms'

type TabViewProps = {
    titles: string[];
    pages: React.ReactElement[];
};

const TabView = ({ titles, pages } : TabViewProps) => {
  const [ selected, setSelected ] = useState<number>(0);

  return (
    <div className="flex flex-col gap-4 flex-1 min-h-0">
      <div className="flex flex-row">
        {titles.map((item, index) => (
          <Button
            key={index}
            buttonText={item}
            level={selected === index ? 'primary' : 'secondary'}
            onClick={() => setSelected(index)}
            auto={true}
          />
        ))}
      </div>

      <div className="flex-1 min-h-0 overflow-auto">
        {pages[selected]}
      </div>
    </div>
  );
};


export default TabView;