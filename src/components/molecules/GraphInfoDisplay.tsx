import React from 'react';
import { Graph } from '@/CustomTypes';
import { InputTextbox, Checkbox, InputTextArea } from '@/components/atoms/atoms'
import { GraphView } from '@/components/organisms/organisms';

/* eslint-disable  @typescript-eslint/no-explicit-any */
const GraphInfoDisplay = ( data: Graph | Graph & { notes: string } | Graph & { nodes: any[], edges: any[], useranem: string }) => {
    return (
        <div className='flex flex-col gap-2 py-4'>
            <div className='flex flex-col gap-2'>
                <InputTextbox
                    label='Vertex Set Size'
                    type='numeric'
                    value={data.size.vertexSetSize}
                    disabled={true}
                />
                <InputTextbox
                    label='Edge Set Size'
                    type='numeric'
                    value={data.size.edgeSetSize}
                    disabled={true}
                />
                <div className='flex flex-row gap-4 w-full'>
                    {Object.entries(data.types).map(([key, value]) => (
                        <Checkbox
                            label={key}
                            key={key} 
                            checked={value}
                            disabled={true}
                        />
                    ))}
                </div>
                <div className='flex flex-col gap-2'>
                    {Object.entries(data.inducedStructures).map(([key, value]) => (
                        <div key={key} className='flex flex-row gap-2'>
                            <InputTextbox
                                label={'Structure'}
                                type='text'
                                value={value.structure.label}
                                disabled={true}
                            />
                            <InputTextbox
                                label='Size'
                                type='numeric'
                                value={value.size}
                                disabled={true}
                            />
                            <InputTextbox
                                label='Amount'
                                type='numeric'
                                value={value.amount}
                                disabled={true}
                            />
                            <div className='pt-9'>
                            <Checkbox
                                label={'Free?'}
                                key={key} 
                                checked={value.free}
                                disabled={true}
                            />
                            </div>
                        </div>
                    ))}
                </div>
                {'notes' in data && data.notes && (<InputTextArea
                    label='Notes'
                    type='numeric'
                    value={data.notes}
                    disabled={true}
                />)}

                { 'nodes' in data && 'edges' in data &&
                    data.nodes && data.edges && (
                        <div className='flex flex-col h-[50vh] gap-2'>
                        <GraphView
                            nodeEdgeJSON={{ nodes: data.nodes, edges: data.edges }}
                            containerStyle='w-full h-full focus:outline-none w-full resize-none focus:ring-2 focus:ring-blue-500 border border-gray-300 rounded-lg p-2 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200'
                        />
                        </div>
                    )
                }
            </div>
        </div>
    )
};

export default GraphInfoDisplay;