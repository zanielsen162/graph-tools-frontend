'use client';
import ProtectedRoute from "@/context/ProtectedRoute";
import TableRow from "@/components/molecules/TableRow";
import Table from "@/components/organisms/Table"
import { useState, useEffect } from "react";
import DataDisplay from "@/components/templates/DataDisplay";
import axios from 'axios';
import { useUser } from '@/context/UserProvider'
import * as types from '@/CustomTypes'
import { GraphInfoDisplay } from '@/components/molecules/molecules'
import { FaRegTrashCan } from "react-icons/fa6";

type GraphWithID = types.Graph & { id: number, notes: string }

export default function Saved() {
  const [data, setData] = useState<GraphWithID[]>([]);
  const { user } = useUser();

  const retrieveData = async () => {
    if (user) { try {
      const loadResponse = await axios.post('http://localhost:5000/load_graphs', { user });

      const transformedData: GraphWithID[] = loadResponse.data.map((item: any) => ({
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
        inducedStructures: item.induced_structures
      }));

      setData(transformedData);
    } catch (err) {
      alert('Load failed');
      console.error(err);
    } }
  };

  const handleDelete = async (id: number) => {
    try {
      const deleteResponse = await axios.post('http://localhost:5000/remove_graph', { id: [id], user })
    } catch (err) {
      alert('Delete failed');
      console.error(err);
    }
  }

  const handleDeleteSelected = async (id: number[]) => {
    try {
      const deleteResponse = await axios.post('http://localhost:5000/remove_graph', { id: id, user })
    } catch (err) {
      alert('Delete failed');
      console.error(err);
    }
  }

  useEffect(() => {
    if (user) {
      retrieveData();
    }
  }, [user])

  const rows = data.map((item) => ({
    title: item.name || 'unnamed',
    body: GraphInfoDisplay(item),
    id: item.id, // add this
    buttons: [
      {
        title: 'Analyze',
        onClick: () => {}
      },
      {
        title: <FaRegTrashCan style={{ color: 'red' }} />,
        onClick: async () => {
          await handleDelete(item.id);
          setData((prev) => prev.filter((g) => g.id !== item.id));
        }
      }
    ]
  }));


  return (
    <ProtectedRoute allowUsers={true}>
      <DataDisplay
        title='Saved'
        subtitle='View your saved graphs.'
        data={rows}
        tableButtons={[
          {
            title: "Delete Selected",
            displayType: "secondary",
            onClick: async (selectedItems) => {
              const idsToDelete = selectedItems
                .map(item => item.id)
                .filter((id): id is number => id !== undefined); // type guard

              if (idsToDelete.length === 0) return;

              await handleDeleteSelected(idsToDelete);
              setData(prev => prev.filter(g => !idsToDelete.includes(g.id)));
            }
          }
        ]}
      />
    </ProtectedRoute>    
  );
}
