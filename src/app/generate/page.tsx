'use client';
import React, { useEffect, useState } from 'react';
import test_graph_1 from '@/data/test-graph-1.json';
import structures_supported from '@/data/structures-supported.json';
import { BuilderDisplay } from '@/components/templates/templates';
import { FormRow, RepeatableFormRow } from '@/components/molecules/molecules';
import { InputTextbox, Dropdown, Checkbox, Button } from '@/components/atoms/atoms';
import { Form, GraphView } from '@/components/organisms/organisms';
import { generateRandomNumber, selectRandomItem, generateRandomGraphData, validStructures } from '@/components/RandomFunctions';
import { useUser } from '@/context/UserProvider'
import * as types from '@/CustomTypes'
import axios from 'axios';

const GeneratePage = () => {
    const [availableStructures, setAvailableStructures] = useState(structures_supported);
    const [canCheck, setCanCheck] = useState<types.GraphTypes>(() => types.createDefaultGraphTypes(true));
    const [formData, setFormData] = useState<types.Graph>(() => types.createDefaultGraph());
    const { user } = useUser();
    const [graph, setGraph] = useState<any>(test_graph_1)

    const { vertexSetSize } = formData.size
    const { tournament, bipartite, complete, acyclic, connected, directed } = formData.types;

    const handleSave = async () => {
        try {
            const submitResponse = await axios.post('http://localhost:5000/save_graph', {formData, user});
        } catch {
            alert('Save failed')
        }
    }

    const handleGenerate = async () => {
        try {
            const generateResponse = await axios.post('http://localhost:5000/generate_graph', {formData});
            console.log(generateResponse.data)
            setGraph(generateResponse.data)
        } catch {
            alert('Generate Failed')
        }
    }

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
                <InputTextbox key='n' type='numeric' label='Vertex Set Size (n)' value={formData.size.vertexSetSize} randomFunc={() => setFormData(prev => ({ ...prev, size: { ...prev.size, vertexSetSize: generateRandomNumber(0, 100) }}))} onChange={(val) => setFormData((prev) => ({ ...prev, size: { ...prev.size, vertexSetSize: Number(val) }}))} />,
                <InputTextbox key='m' type='numeric' label='Edge Set Size (m)' value={formData.size.edgeSetSize} randomFunc={() => setFormData(prev => ({ ...prev, size: { ...prev.size, edgeSetSize: generateRandomNumber(min, max) }}))} onChange={(val) => setFormData((prev) => ({ ...prev, size: { ...prev.size, edgeSetSize: Number(val) }}))} />,
            ]} 
            title='Basic Structure'
        />,
        <FormRow key='graph-types'
            entries={[
                <Checkbox
                    key='directed'
                    label="Directed"
                    checked={formData.types.directed}
                    onChange={(val) => setFormData((prev) => ({ ...prev, types: { ...prev.types, directed: val, },}))}
                    disabled={!canCheck.directed}
                />,
                <Checkbox
                    key='connected'
                    label="Connected"
                    checked={formData.types.connected}
                    onChange={(val) => setFormData((prev) => ({ ...prev, types: { ...prev.types, connected: val, },}))}
                    disabled={!canCheck.connected}
                />,
                <Checkbox
                    key='complete'
                    label="Complete"
                    checked={formData.types.complete}
                    onChange={(val) => setFormData((prev) => ({ ...prev, types: { ...prev.types, complete: val, },}))}
                    disabled={!canCheck.complete}
                />,
                <Checkbox
                    key='acyclic'
                    label='Acyclic'
                    checked={formData.types.acyclic}
                    onChange={(val) => setFormData((prev) => ({ ...prev, types: { ...prev.types, acyclic: val, },}))}
                    disabled={!canCheck.acyclic}
                />,
                <Checkbox
                    key='bipartite'
                    label="Bipartite"
                    checked={formData.types.bipartite}
                    onChange={(val) => setFormData((prev) => ({ ...prev, types: { ...prev.types, bipartite: val, },}))}
                    disabled={!canCheck.bipartite}
                />,
                // <Checkbox
                //     key='tournament'
                //     label="Tournament"
                //     checked={formData.types.tournament}
                //     onChange={(val) => setFormData((prev) => ({ ...prev, types: { ...prev.types, tournament: val, },}))}
                //     disabled={!canCheck.tournament}
                // />
            ]} 
        />,
        <RepeatableFormRow<types.Structure>
            key='induced-structures'
            title="Structures"
            data={formData.inducedStructures}
            setData={(newData) =>
                setFormData((prev) => ({
                    ...prev,
                    inducedStructures: newData,
                }))
            }
            createEmpty={types.createDefaultStructure}
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
                ),
                (entry, index, update) => (
                    <Checkbox
                        key={`free-${index}`}
                        label="Free?"
                        checked={entry.free}
                        onChange={(val) => update(index, 'free', Boolean(val))}
                        stacked={true}
                        disabled={entry.amount != 0}
                    />
                )
            ]}
        />
    ]

    const submissionComponents = [
        <Button key='generate' buttonText='Generate Graph' level='primary' onClick={handleGenerate} />,
        <Button key='random' buttonText='Random' level='secondary' onClick={() => setFormData(generateRandomGraphData(structures_supported, generateRandomNumber(0,5)))} />,
        <Button key='save' buttonText='Save' level='secondary' onClick={handleSave} disabled={user == null} />
    ]

    const formBuilt = <Form entries={formRows} final={<FormRow entries={submissionComponents} />} />
    const graphBuilt =  <GraphView nodeEdgeJSON={graph} />

    return (
        <BuilderDisplay
            title="Graph Generation"
            description="Use the form below to generate a graph and visualize it. Note that if any structures are marked as free, the basic structure options will not be considered. Also, if contradictory structures are added, behavior will be somewhat random."
            form={formBuilt}
            display={graphBuilt}
        />
    )
}

export default GeneratePage;