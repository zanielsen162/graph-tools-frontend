'use client';
import React, { Fragment, useEffect, useRef } from 'react';
import cytoscape from 'cytoscape';
import test_graph_1 from '@/data/test-graph-1.json';
import { BuilderDisplay } from '@/components/templates/templates';
import { Form } from '@/components/organisms/organisms';

const GeneratePage = () => {
    
    const graphRef = useRef(null)

    const drawGraph = () => {
        const cy = cytoscape({
            container: graphRef.current,
            elements: test_graph_1,
            style: [
                {
                    selector: 'node',
                    style: {
                        'background-color': 'red',
                        'label': 'data(id)'
                    }
                },
                {
                    selector: 'edge',
                    style: {
                        'width': 3,
                        'line-color': '#ccc',
                        'target-arrow-color': '#ccc',
                        'target-arrow-shape': 'triangle'
                    }
                }
            ],
            layout: {
                name: 'breadthfirst',
                fit: true,
                padding: 30,
                directed: true,
            }
        })
    }

    useEffect(() => {
        drawGraph()
    }, [])

    return (
        <div className="p-10">
            <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
                <Fragment>
                    <h2>Graph Generation</h2>
                    <div ref={graphRef} className='outline outline-1 w-full h-[80vh]'>
                    </div>
                </Fragment>
            </main>
        </div>
    )
}

export default GeneratePage;