'use client';
import React, { Fragment, useEffect, useRef } from 'react';
import cytoscape from 'cytoscape';

const defaultStyle = 
    [
        {
            selector: 'node',
            style: {
                'background-color': 'green',
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
    ]

type GraphViewProps = {
    title?: string;
    subtitle?: string;
    description?: string;
    nodeEdgeJSON: { nodes: any[], edges: any[] };
    layoutSpec?: string;
    style?: any[];
}

const GraphView = ({ title, subtitle, description, nodeEdgeJSON, layoutSpec='random', style=defaultStyle}: GraphViewProps) => {
    
    const graphRef = useRef(null)

    const drawGraph = () => {
        const cy = cytoscape({
            container: graphRef.current,
            elements: nodeEdgeJSON,
            style: style,
            layout: {
                name: layoutSpec,
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
            <Fragment>
                {title && <h1 className='text-2xl font-bold mb-2'>{title}</h1>}
                {subtitle && <h2 className='text-xl font-semibold mb-1'>{subtitle}</h2>}
                {description && <p className='text-gray-600 dark:text-gray-300 mb-4'>{description}</p>}

                <div ref={graphRef} className='outline outline-3 outline-green-600 dark:outline-green-700 w-full h-[80vh]'>
                </div>
            </Fragment>
        </div>
    )
}

export default GraphView;