'use client';
import { useState, useEffect } from "react";
import DataDisplay from "@/components/templates/DataDisplay";
import axios from 'axios';
import * as types from '@/CustomTypes'
import { GraphInfoDisplay } from '@/components/molecules/molecules'
import { FaRegTrashCan } from "react-icons/fa6";

type TotalGraph = types.Graph & { id: number, notes: string, username: string, nodes: any[], edges: any[] }

export default function Shared() {
    const [ data, setData ] = useState<TotalGraph[]>([]);

    const retrieveData = async () => {
        try {
            const loadResponse = await axios.get('http://localhost:5000/fetch_posts');
            console.log(loadResponse.data)
            const transformedData: TotalGraph[] = loadResponse.data.map((item: any) => ({
                ...item,
                id: item.id,
                name: item.name,
                size: {
                    vertexSetSize: item.vertex_set_size,
                    edgeSetSize: item.edge_set_size
                },
                types: {
                    directed: item.directed,
                    acyclic: item.acyclic,
                    connected: item.connected,
                    complete: item.complete,
                    bipartite: item.bipartite,
                    tournament: item.tournament
                },
                inducedStructures: item.induced_structures,
                username: item.username,
                nodes: item.nodes,
                edges: item.edges,
                notes: item.notes,
            }));
            console.log(transformedData)

            setData(transformedData);
        } catch (err) {
            alert('Shared graphs failed to load');
            console.error(err);
        }
    };

    useEffect(() => {
        retrieveData();
    }, []);

    const rows = data.map((item) => ({
        title: item.name || 'unnamed',
        body: GraphInfoDisplay(item),
        id: item.id, // add this
        buttons: []
    }));        

    return(
        <div>
            <DataDisplay
                title='Shared'
                subtitle='Check out graphs from other users!'
                data={rows}
            />
        </div>
    )
}