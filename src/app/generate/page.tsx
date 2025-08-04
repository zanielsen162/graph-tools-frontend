'use client';
import React, { useEffect, useState } from 'react';
import test_graph_1 from '@/data/test-graph-1.json';
import structures_supported from '@/data/structures-supported.json';
import { BuilderDisplay } from '@/components/templates/templates';
import { FormRow, RepeatableFormRow } from '@/components/molecules/molecules';
import { InputTextbox, Dropdown, Checkbox, Button } from '@/components/atoms/atoms';
import { Form, GraphView } from '@/components/organisms/organisms';
import { generateRandomNumber, selectRandomItem, generateRandomGraphData, validStructures } from '@/components/RandomFunctions';


const GeneratePage = () => {
    const [availableStructures, setAvailableStructures] = useState(structures_supported);
    const [canCheck, setCanCheck] = useState<{
        directed: boolean;
        acyclic: boolean;
        connected: boolean;
        complete: boolean;
        bipartite: boolean;
        tournament: boolean;
    }>({
        directed: true,
        acyclic: true,
        connected: true,
        complete: true,
        bipartite: true,
        tournament: true
    });

    const [formData, setFormData] = useState<{
        structures: {
            structure: { value: string; label: string };
            size: number;
            amount: number;
        }[];
        vertexSetSize: number;
        edgeSetSize: number;
        directed: boolean;
        acyclic: boolean;
        connected: boolean;
        complete: boolean;
        bipartite: boolean;
        tournament: boolean;
    }>({
        structures: [
            {
                structure: { value: '', label: '' },
                size: 0,
                amount: 0
            }
        ],
        vertexSetSize: 0,
        edgeSetSize: 0,
        directed: false,
        acyclic: false,
        connected: false,
        complete: false,
        bipartite: false,
        tournament: false
    });

    const { vertexSetSize, edgeSetSize, tournament, bipartite, complete, acyclic, connected, directed } = formData;

    useEffect(() => {
        const validStructuresList = structures_supported.filter(structure => 
            validStructures(vertexSetSize, structure, { tournament, bipartite, complete, acyclic, connected, directed })
        );
        setAvailableStructures(validStructuresList);
        setCanCheck({
            directed: true,
            tournament: !bipartite && !complete,
            bipartite: !tournament && !complete,
            complete: !tournament && !bipartite && !acyclic,
            acyclic: !complete,
            connected: true
        })
    }, [directed, acyclic, connected, complete, bipartite, tournament, vertexSetSize]);

    const min = 
        tournament ? (vertexSetSize - 1) * vertexSetSize / 2 :
        complete && directed ? (vertexSetSize * (vertexSetSize - 1)) :
        complete ? (vertexSetSize * (vertexSetSize - 1)) / 2 :
        connected ? vertexSetSize - 1 :
        0;

    const max = 
        tournament ? (vertexSetSize * (vertexSetSize - 1)) / 2 :
        complete && directed ? (vertexSetSize * (vertexSetSize - 1)) :
        complete ? (vertexSetSize * (vertexSetSize - 1)) / 2 :
        acyclic && directed ? (vertexSetSize * (vertexSetSize - 1)) / 2 :
        acyclic ? (vertexSetSize - 1) :
        directed ? (vertexSetSize * (vertexSetSize - 1)) :
        (vertexSetSize * (vertexSetSize - 1)) / 2;

    const formRows = [
        <FormRow key='basic-structure'
            entries={[
                <InputTextbox key='n' type='numeric' label='Vertex Set Size (n)' value={formData.vertexSetSize} randomFunc={() => setFormData(prev => ({ ...prev, vertexSetSize: generateRandomNumber(0, 100) }))} onChange={(val) => setFormData((prev) => ({ ...prev, vertexSetSize: Number(val) }))} />,
                <InputTextbox key='m' type='numeric' label='Edge Set Size (m)' value={formData.edgeSetSize} randomFunc={() => setFormData(prev => ({ ...prev, edgeSetSize: generateRandomNumber(min, max) }))} onChange={(val) => setFormData((prev) => ({ ...prev, edgeSetSize: Number(val) }))} />,
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
                    disabled={!canCheck.directed}
                />,
                <Checkbox
                    key='connected'
                    label="Connected"
                    checked={formData.connected}
                    onChange={(val) => setFormData((prev) => ({ ...prev, connected: val }))}
                    disabled={!canCheck.connected}
                />,
                <Checkbox
                    key='complete'
                    label="Complete"
                    checked={formData.complete}
                    onChange={(val) => setFormData((prev) => ({ ...prev, complete: val }))}
                    disabled={!canCheck.complete}
                />,
                <Checkbox
                    key='acyclic'
                    label='Acyclic'
                    checked={formData.acyclic}
                    onChange={(val) => setFormData((prev) => ({ ...prev, acyclic: val }))}
                    disabled={!canCheck.acyclic}
                />,
                <Checkbox
                    key='bipartite'
                    label="Bipartite"
                    checked={formData.bipartite}
                    onChange={(val) => setFormData((prev) => ({ ...prev, bipartite: val }))}
                    disabled={!canCheck.bipartite}
                />,
                <Checkbox
                    key='tournament'
                    label="Tournament"
                    checked={formData.tournament}
                    onChange={(val) => setFormData((prev) => ({ ...prev, tournament: val }))}
                    disabled={!canCheck.tournament}
                />
            ]} 
        />,
        <RepeatableFormRow<{
                structure: { value: string; label: string };
                size: number;
                amount: number;
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
                structure: { value: '', label: '' },
                size: 0,
                amount: 0
            })}
            fields={[
                (entry, index, update) => (
                    <Dropdown
                        key={`structure-${index}`}
                        label="Structure"
                        options={availableStructures}
                        value={entry.structure.value}
                        onChange={(val) => update(index, 'structure', { value: val, label: availableStructures.find(opt => opt.value === val)?.label || '' } )}
                        randomFunc={() => { const randStruct = selectRandomItem(availableStructures); update(index, 'structure', { value: randStruct.value, label: randStruct.label })} }
                    />
                ),
                (entry, index, update) => (
                    <InputTextbox
                        key={`size-${index}`}
                        label="Size"
                        type="numeric"
                        value={entry.size}
                        onChange={(val) => update(index, 'size', Number(val))}
                        randomFunc={() => update(index, 'size', (generateRandomNumber(1, vertexSetSize)))}
                    />
                ),
                (entry, index, update) => (
                    <InputTextbox
                        key={`amount-${index}`}
                        label="Amount"
                        type="numeric"
                        value={entry.amount}
                        onChange={(val) => update(index, 'amount', Number(val))}
                        randomFunc={() => update(index, 'amount', (generateRandomNumber(1, vertexSetSize / entry.size)))}
                    />
                )
            ]}
        />
    ]

    const submissionComponents = [
        <Button key='generate' buttonText='Generate Graph' level='primary' onClick={() => console.log(JSON.stringify(formData, null, 2))} />,
        <Button key='random' buttonText='Random' level='secondary' onClick={() => setFormData(generateRandomGraphData(structures_supported, generateRandomNumber(0,5)))} />
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