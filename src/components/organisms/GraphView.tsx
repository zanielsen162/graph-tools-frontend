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
        <div className="">
            <Fragment>
                {title && (<h1>{title}</h1>)}
                {subtitle && (<h2>{subtitle}</h2>)}
                {description && (<p>{description}</p>)}

                <div ref={graphRef} className='outline outline-3 rounded outline-green-600 dark:outline-green-700 w-full h-[70vh]'>
                </div>
            </Fragment>
        </div>
    )
}

export default GraphView;