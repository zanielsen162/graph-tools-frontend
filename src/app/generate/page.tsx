'use client';
import React, { useState } from 'react';
import test_graph_1 from '@/data/test-graph-1.json';
import structures from '@/data/structures.json';
import { BuilderDisplay } from '@/components/templates/templates';
import { FormRow, RepeatableFormRow } from '@/components/molecules/molecules';
import { InputTextbox, Dropdown, Checkbox, Button } from '@/components/atoms/atoms';
import { Form, GraphView } from '@/components/organisms/organisms';
import { generateRandomNumber, selectRandomItem, generateRandomGraphData } from '@/components/RandomFunctions';


const GeneratePage = () => {
    const [formData, setFormData] = useState<{
        structures: {
            structure: string;
            size: string;
            amount: string;
        }[];
        vertexSetSize: string;
        edgeSetSize: string;
        directed: boolean;
        connected: boolean;
        complete: boolean;
        bipartite: boolean;
        tournament: boolean;
    }>({
        structures: [
            {
                structure: '',
                size: '',
                amount: ''
            }
        ],
        vertexSetSize: '',
        edgeSetSize: '',
        directed: false,
        connected: false,
        complete: false,
        bipartite: false,
        tournament: false
    });

    const formRows = [
        <FormRow key='basic-structure'
            entries={[
                <InputTextbox key='n' type='numeric' label='Vertex Set Size (n)' value={formData.vertexSetSize} randomFunc={() => setFormData(prev => ({ ...prev, vertexSetSize: String(generateRandomNumber(0, 100)) }))} onChange={(val) => setFormData((prev) => ({ ...prev, vertexSetSize: val }))} />,
                <InputTextbox key='m' type='numeric' label='Edge Set Size (m)' value={formData.edgeSetSize} randomFunc={() => setFormData(prev => ({ ...prev, edgeSetSize: String(generateRandomNumber(0, 100)) }))} onChange={(val) => setFormData((prev) => ({ ...prev, edgeSetSize: val }))} />,
            ]} 
            title='Basic Structure'
        />,
        <FormRow key='graph-types'
            entries={[
                <Checkbox
                    key='directed'
                    label="Directed"
                    checked={formData.directed}
                    onChange={(val) => setFormData((prev) => ({ ...prev, directed: val }))}
                />,
                <Checkbox
                    key='connected'
                    label="Connected"
                    checked={formData.connected}
                    onChange={(val) => setFormData((prev) => ({ ...prev, connected: val }))}
                />,
                <Checkbox
                    key='complete'
                    label="Complete"
                    checked={formData.complete}
                    onChange={(val) => setFormData((prev) => ({ ...prev, complete: val }))}
                />,
                <Checkbox
                    key='bipartite'
                    label="Bipartite"
                    checked={formData.bipartite}
                    onChange={(val) => setFormData((prev) => ({ ...prev, bipartite: val }))}
                />,
                <Checkbox
                    key='tournament'
                    label="Tournament"
                    checked={formData.tournament}
                    onChange={(val) => setFormData((prev) => ({ ...prev, tournament: val }))}
                />
            ]} 
        />,
        <RepeatableFormRow<{
                structure: string;
                size: string;
                amount: string;
            }>
            key='induced-structures'
            title="Structures"
            data={formData.structures}
            setData={(newData) =>
                setFormData((prev) => ({
                    ...prev,
                    structures: newData,
                }))
            }
            createEmpty={() => ({
                structure: '',
                size: '',
                amount: ''
            })}
            fields={[
                (entry, index, update) => (
                    <Dropdown
                        key={`structure-${index}`}
                        label="Structure"
                        options={structures}
                        value={entry.structure}
                        onChange={(val) => update(index, 'structure', val)}
                        randomFunc={() => update(index, 'structure', selectRandomItem(structures).value)}
                    />
                ),
                (entry, index, update) => (
                    <InputTextbox
                        key={`size-${index}`}
                        label="Size"
                        type="numeric"
                        value={entry.size}
                        onChange={(val) => update(index, 'size', val)}
                        randomFunc={() => update(index, 'size', String(generateRandomNumber(1, 100)))}
                    />
                ),
                (entry, index, update) => (
                    <InputTextbox
                        key={`amount-${index}`}
                        label="Amount"
                        type="numeric"
                        value={entry.amount}
                        onChange={(val) => update(index, 'amount', val)}
                        randomFunc={() => update(index, 'amount', String(generateRandomNumber(1, 10)))}
                    />
                )
            ]}
        />
    ]

    const submissionComponents = [
        <Button key='generate' buttonText='Generate Graph' level='primary' onClick={() => console.log(JSON.stringify(formData, null, 2))} />,
        <Button key='random' buttonText='Random' level='secondary' onClick={() => setFormData(generateRandomGraphData(structures.map(item => item.value), generateRandomNumber(0,10)))} />
    ]

    const formBuilt = <Form entries={formRows} final={<FormRow entries={submissionComponents} />} />
    const graphBuilt =  <GraphView nodeEdgeJSON={test_graph_1} />

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