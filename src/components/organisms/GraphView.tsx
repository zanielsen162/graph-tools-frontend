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
  
const defaultContainerStyle = 'outline outline-3 rounded outline-green-600 dark:outline-green-700 w-full flex-1 min-h-0'; 

type GraphViewProps = {
    title?: string;
    subtitle?: string;
    description?: string;
    nodeEdgeJSON: { nodes: { data: {id: string} }[], edges: { data: {id: string, source: string, target: string} }[] };
    layoutSpec?: string;
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    style?: any[];
    containerStyle?: string;
}

const GraphView = ({ title, subtitle, description, nodeEdgeJSON, layoutSpec='random', style=defaultStyle, containerStyle=defaultContainerStyle}: GraphViewProps) => {
  const graphRef = useRef<HTMLDivElement | null>(null);

  const layoutOptions = useMemo(() => layoutSpec === 'null' ? { name: layoutSpec, padding: 30 } : {
    name: layoutSpec,
    padding: 30,
    fit: true,
  }, [layoutSpec]);

  useEffect(() => {
    if (!graphRef.current) return;

    const cy = cytoscape({
      container: graphRef.current,
      elements: nodeEdgeJSON,
      style: style,
      layout: layoutOptions,
    });


    setTimeout(() => {
      cy.resize();
      cy.fit();
    }, 0);

    return () => cy.destroy();
  }, [nodeEdgeJSON, layoutOptions, style]);

  return (
    <div className="flex flex-col h-full min-h-0 m-1">
      {title && <h1 className="text-lg font-bold">{title}</h1>}
      {subtitle && <h2 className="text-sm">{subtitle}</h2>}
      {description && <p className="text-sm text-gray-600 mb-2">{description}</p>}

      <div ref={graphRef} className={containerStyle} />
    </div>
  );
};


export default GraphView;