import * as types from '@/CustomTypes'

function generateRandomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/* eslint-disable  @typescript-eslint/no-explicit-any */
function selectRandomItem(items: any[]) {
    return items[generateRandomNumber(0, items.length - 1)];
}

function generateRandomStructures(structures: types.StructureType[], count: number, maxSize: number) {
    const amount = generateRandomNumber(1, 5);
    const size = generateRandomNumber(1, Math.floor(maxSize / amount));
    if (structures.length === 0) return [];
    return Array.from({ length: count }, () => ({
        structure: selectRandomItem(structures),
        size: size,
        amount: amount
    }));
}

function generateRandomValidCombination() {
    while (true) {
        const combo: types.GraphTypes  = {
            tournament: Math.random() < 0.5,
            bipartite: Math.random() < 0.5,
            complete: Math.random() < 0.5,
            acyclic: Math.random() < 0.5,
            connected: Math.random() < 0.5,
            directed: Math.random() < 0.5
        };

        const { tournament: t, bipartite: b, complete: c, acyclic: a, connected: conn } = combo;
        // tournament
        if (t && (!conn || b || c)) continue;
        // bipartite
        if (b && (t || c)) continue;
        // complete
        if (c && (a || b || t)) continue;
        // acyclic
        if (a && c) continue;

        combo.directed = combo.tournament ? true : combo.tournament;
        combo.connected = combo.tournament || combo.complete ? true : combo.connected;
    
        return combo;
    }
}

function validStructures(
    vertexSetSize: number,
    structure: types.StructureType,
    validCombo: types.GraphTypes
) {
    const { tournament, bipartite, complete, acyclic } = validCombo;
    if (structure.value === 'kn' && (tournament || bipartite || acyclic)) return false;
    if (structure.value === 'cn' && ((bipartite && vertexSetSize > 2) || acyclic || (complete && vertexSetSize > 3))) return false;
    if (structure.value === 'pn' && (complete && vertexSetSize > 2 || tournament)) return false;
    if (structure.value === 'sn' && (complete && vertexSetSize > 2 || tournament)) return false;
    if (structure.value === 'wn' && (vertexSetSize < 4 || (tournament && vertexSetSize > 4) || bipartite || (complete && vertexSetSize > 4) || acyclic)) return false;
    return true;
};

function generateRandomGraphData(structures: types.StructureType[], count: number) {
    const vertexSetSize = generateRandomNumber(1, 50);
    const { tournament, bipartite, complete, acyclic, connected, directed } = generateRandomValidCombination();
    const validStructuresList = structures.filter(structure => 
        validStructures(vertexSetSize, structure, { tournament, bipartite, complete, acyclic, connected, directed })
    );

    const rawStructures = generateRandomStructures(validStructuresList, count, vertexSetSize);
    const structuresData = validStructures.length === 0 ? []
        : Array.from(
            new Map(
                rawStructures.map(obj => [JSON.stringify(obj), obj])
            ).values()
        );

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

    const edgeSetSize = generateRandomNumber(min, max);

    return {
        size: {
            vertexSetSize: vertexSetSize,
            edgeSetSize: edgeSetSize
        },
        types: {
            directed: directed,
            connected: connected,
            acyclic: acyclic,
            complete: complete,
            bipartite: bipartite,
            tournament: tournament
        },
        inducedStructures: structuresData,
    };
}

export {
    generateRandomNumber,
    selectRandomItem,
    generateRandomStructures,
    generateRandomGraphData,
    validStructures
}