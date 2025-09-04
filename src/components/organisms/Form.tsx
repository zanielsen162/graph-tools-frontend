import React from "react";

type FormProps = {
    title?: string;
    subtitle?: string;
    description?: string;
    entries: React.ReactElement[];
    final?: React.ReactElement;
};

const Form = ({ title, subtitle, description, entries, final }: FormProps) => {
  return (
    <div
      className="p-6 m-1 relative rounded outline outline-3 outline-green-600 dark:outline-green-700 flex flex-col"
      style={{ maxHeight: '90vh' }}
    >
      <div className="overflow-y-auto flex-1 min-h-0">
        {title && <h1 className="text-2xl font-bold mb-2">{title}</h1>}
        {subtitle && <h2 className="text-xl font-semibold mb-1">{subtitle}</h2>}
        {description && <p className="text-gray-600 dark:text-gray-300 mb-4">{description}</p>}

        <div className="space-y-6">
          {entries.map((EntryComponent, index) => (
            <div key={index}>{EntryComponent}</div>
          ))}
        </div>

        {final && <div className="h-20" />}
      </div>

      {final && (
        <div className="sticky bottom-0 left-0 right-0 p-2 z-10 bg-white dark:bg-black">
          <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700" />
          {final}
        </div>
      )}
    </div>
  );
};



export default Form;