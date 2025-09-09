'use client';
import React, { useEffect, useState } from 'react';
import test_graph_1 from '@/data/test-graph-1.json';
import structures_supported from '@/data/structures-supported.json';
import { BuilderDisplay } from '@/components/templates/templates';
import { FormRow, RepeatableFormRow } from '@/components/molecules/molecules';
import { InputTextbox, Dropdown, Checkbox, Button, InputTextArea } from '@/components/atoms/atoms';
import { Form, GraphView } from '@/components/organisms/organisms';
import { generateRandomNumber, selectRandomItem, generateRandomGraphData, validStructures } from '@/components/RandomFunctions';
import { useUser } from '@/context/UserProvider'
import * as types from '@/CustomTypes'
import axios from 'axios';
import { generateUsername } from 'unique-username-generator'

type analyzeData = {
    id: number;
    notes: string;
}

const GeneratePage = () => {
    const [availableStructures, setAvailableStructures] = useState(structures_supported);
    const [canCheck, setCanCheck] = useState<types.GraphTypes>(() => types.createDefaultGraphTypes(true));
    const [formData, setFormData] = useState<types.Graph>(() => types.createDefaultGraph());
    const [analyzeFormData, setAnalyzeFormData] = useState<analyzeData>({id: -1, notes: ''})

    const { user } = useUser();
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    const [graph, setGraph] = useState<{ nodes: any[], edges: any[] }>(test_graph_1)

    const { vertexSetSize } = formData.size
    const { tournament, bipartite, complete, acyclic, connected, directed } = formData.types;

    const handleSave = async () => {
        try {
            await axios.post('http://localhost:5000/save_graph', {formData, graph, user});
            retrieveGraphLabels();
        } catch {
            alert('Save failed')
        }
    }

    const handleAnalyzeSave = async () => {
        try {
            await axios.post('http://localhost:5000/update_graph', { analyzeFormData, user });
        } catch (err) {
            console.error(err);
            alert('Failed to update graph');
        }
    }

    const handleGenerate = async () => {
        try {
            const generateResponse = await axios.post('http://localhost:5000/generate_graph', {formData});
            setGraph(generateResponse.data)
        } catch {
            alert('Generate Failed')
        }
    }

    const handleLoadGraph = async (id: number) => {
        try {
            const generateResponse = await axios.post('http://localhost:5000/get_graph', { user, id });
            const newGraph = {
                nodes: generateResponse.data.nodes,
                edges: generateResponse.data.edges
            }
            setGraph(newGraph);
            setAnalyzeFormData(prev => ({
                ...prev,
                notes: generateResponse.data.notes
            }));
        } catch {
            alert('Load Failed')
        } 
    }

    useEffect(() => {
        setFormData(prev => ({ ...prev, size: { ...prev.size, edgeSetSize: graph.edges.length }}))
    }, [graph])

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
        <FormRow key='data-name'
            entries={[
                <InputTextbox key='name' type='text' label='Name' value={formData.name} 
                    onChange={(val) => setFormData((prev) => ({ ...prev, name: val }))} 
                    randomFunc={() => setFormData(prev => ({...prev, name: generateUsername()}))}
                />
            ]}
        />,
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
                    strikethrough={!canCheck.directed}
                />,
                <Checkbox
                    key='connected'
                    label="Connected"
                    checked={formData.types.connected}
                    onChange={(val) => setFormData((prev) => ({ ...prev, types: { ...prev.types, connected: val, },}))}
                    strikethrough={!canCheck.connected}
                />,
                <Checkbox
                    key='complete'
                    label="Complete"
                    checked={formData.types.complete}
                    onChange={(val) => setFormData((prev) => ({ ...prev, types: { ...prev.types, complete: val, },}))}
                    strikethrough={!canCheck.complete}
                />,
                <Checkbox
                    key='acyclic'
                    label='Acyclic'
                    checked={formData.types.acyclic}
                    onChange={(val) => setFormData((prev) => ({ ...prev, types: { ...prev.types, acyclic: val, },}))}
                    strikethrough={!canCheck.acyclic}
                />,
                <Checkbox
                    key='bipartite'
                    label="Bipartite"
                    checked={formData.types.bipartite}
                    onChange={(val) => setFormData((prev) => ({ ...prev, types: { ...prev.types, bipartite: val, },}))}
                    strikethrough={!canCheck.bipartite}
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
        <Button key='generate' buttonText='Generate' level='primary' onClick={handleGenerate} />,
        <Button key='random' buttonText='Random' level='secondary' onClick={() => setFormData(generateRandomGraphData(structures_supported, generateRandomNumber(0,5)))} />,
        <Button key='save' buttonText='Save' level='secondary' onClick={handleSave} disabled={user == null} />
    ]

    const [dropDownOptions, setDropDownOptions] = useState<{ label: string, value: number }[]>([]);

    const formBuilt = <Form entries={formRows} final={<FormRow entries={submissionComponents} />} />
    const graphBuilt =  <GraphView nodeEdgeJSON={graph} />

    const analyzeFormRows = [
        <Dropdown
            key="select-graph"
            options={dropDownOptions}
            label="Select Graph"
            value={analyzeFormData.id}
            onChange={(val: number | string) => {
                const selected = dropDownOptions.find(opt => opt.value === val) || null;
                setAnalyzeFormData((prev) => ({...prev, id: selected ? selected.value : -1}));
                handleLoadGraph(selected?.value ?? -1);
            }}
        />,
        <InputTextArea
            key="notes"
            label="Notes"
            type="textarea"
            value={analyzeFormData.notes}
            onChange={(val) => setAnalyzeFormData((prev) => ({ ...prev, notes: val }))}
        />
    ];

    const analyzeSubmission = [
        <Button key='save' buttonText='Save' level='primary' onClick={handleAnalyzeSave} disabled={user == null} />
    ]

    const analyzeForm = <Form entries={analyzeFormRows} final={<FormRow entries={analyzeSubmission} />} />;

    useEffect(() => {
        if (user) {
            retrieveGraphLabels();
        }
    }, [user]);

    const pageNames = user ? ['Generate', 'Analyze'] : ['Generate'];
    const pages = user ? [formBuilt, analyzeForm] : [formBuilt];



    const retrieveGraphLabels = async () => {
        if (user) {
            try {
                const loadResponse = await axios.post('http://localhost:5000/load_identifiers', { user })
                const transformedData: { label: string, value: number }[] = loadResponse.data.map
                /* eslint-disable  @typescript-eslint/no-explicit-any */
                ((item: any) => ({
                    label: item.name,
                    value: item.id
                }));
                setDropDownOptions(transformedData);
            } catch (err) {
                alert('Loading graphs failed');
                console.error(err);
            }
        }
    }

    return (
        <BuilderDisplay
            title="Graph Generation"
            description="Use the form below to generate a graph and visualize it. Note that if any structures are marked as free, the basic structure options will not be considered. Also, if contradictory structures are added, behavior will be somewhat random."
            pages={pages}
            pageNames={pageNames}
            display={graphBuilt}
        />
    )
}

export default GeneratePage;