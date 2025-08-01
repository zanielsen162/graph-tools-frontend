'use client';
import React, { Fragment, useEffect, useRef, useMemo } from 'react';
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
    nodeEdgeJSON: { nodes: { data: {id: string} }[], edges: { data: {id: string, source: string, target: string} }[] };
    layoutSpec?: string;
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    style?: any[];
}

const GraphView = ({ title, subtitle, description, nodeEdgeJSON, layoutSpec='random', style=defaultStyle}: GraphViewProps) => {
    
    const graphRef = useRef(null)
    const layoutOptions = useMemo(() => layoutSpec === 'null' ? { name: layoutSpec, padding: 30 } : {
        name: layoutSpec,
        padding: 30,
        fit: true,
    }, [layoutSpec]);

    useEffect(() => {
        cytoscape({
            container: graphRef.current,
            elements: nodeEdgeJSON,
            style: style,
            layout: layoutOptions,
        });
    }, [nodeEdgeJSON, layoutOptions, style]);


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