'use client';
import React, { Fragment, useEffect, useRef } from 'react';
import cytoscape from 'cytoscape';
import test_graph_1 from '@/data/test-graph-1.json';
import structures from '@/data/structures.json';
import { BuilderDisplay } from '@/components/templates/templates';
import { FormRow, RepeatableFormRow } from '@/components/molecules/molecules';
import { InputTextbox, Dropdown, Checkbox, Button } from '@/components/atoms/atoms';
import { Form, GraphView } from '@/components/organisms/organisms';

const formInputComponents = [
    <Dropdown options={structures} label='Structure' />,
    <InputTextbox type='number' label='Size' />,
    <InputTextbox type='number' label='Amount' />,
    <InputTextbox type='number' label='Vertex Set Size (n)' />,
    <InputTextbox type='number' label='Edge Set Size (m)' />,
    <Checkbox label='Directed' checked={false} />,
    <Checkbox label='Connected' checked={false} />,
    <Checkbox label='Complete' checked={false} />,
    <Checkbox label='Bipartite' checked={false} />,
    <Checkbox label='Tournament' checked={false} />,
    <Button buttonText='Generate Graph' level='primary' onClick={() => console.log('Graph generated')} />,
    <Button buttonText='Random' level='secondary' onClick={() => console.log('Form reset')} />
]

const formRows = [
    <FormRow entries={formInputComponents.slice(3,5)} title='Basic Structure' />,
    <FormRow entries={formInputComponents.slice(5,10)} />,
    <RepeatableFormRow entry={<FormRow entries={formInputComponents.slice(0,3)}/>} title='Add Induced Parametrized Graphs' />,
]

const formBuilt = <Form entries={formRows} final={<FormRow entries={formInputComponents.slice(10)} />} />
const graphBuilt =  <GraphView nodeEdgeJSON={test_graph_1} />

const GeneratePage = () => {
    return (
        <BuilderDisplay
            title="Graph Generation"
            description="Use the form below to generate a graph and visualize it."
            form={formBuilt}
            display={graphBuilt}
        />
    )
}

export default GeneratePage;