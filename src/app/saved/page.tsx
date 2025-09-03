'use client';
import ProtectedRoute from "@/context/ProtectedRoute";
import TableRow from "@/components/molecules/TableRow";
import Table from "@/components/organisms/Table"
import { useState } from "react";
import DataDisplay from "@/components/templates/DataDisplay";

const testingComponent = (text: string) => {
    return (
        <p>{text}</p>
    )
}


export default function Saved() {
  const [data, setData] = useState<boolean>(false);

  return (
    <ProtectedRoute allowUsers={true}>
      {/* <div className="p-5 sans-serif">
        <h1 className='text-2xl font-bold mb-1 text-center'>Saved</h1>
        <Table
          entries={[TableRowEx, TableRowEx]}
        />
      </div> */}
      <DataDisplay
        title='Saved'
        subtitle='View your saved graphs.'
        data={[
          {
            title: 'Test Row',
            subtitle: 'this will contain data',
            body: testingComponent('this is the body text')
          },
          {
            title: 'Test Row 2',
            subtitle: 'this will contain data',
            body: testingComponent('this is the body text again')
          }
        ]}
        tableButtons={[
          {
            title: 'Click Me',
            displayType: 'primary',
            onClick: () => { alert('Clicked!') }
          },
          {
            title: 'Clicked',
            displayType: 'secondary',
            onClick: () => { alert('Clicked!') }
          }
        ]}
      />
    </ProtectedRoute>    
  );
}
