function generateRandomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/* eslint-disable  @typescript-eslint/no-explicit-any */
function selectRandomItem(items: any[]) {
    return items[generateRandomNumber(0, items.length - 1)];
}

function generateRandomStructures(structures: string[], count: number, maxSize: number) {
    return Array.from({ length: count }, () => ({
        structure: selectRandomItem(structures),
        size: generateRandomNumber(1, maxSize),
        amount: generateRandomNumber(1, 5)
    }));
}

function generateRandomValidCombination() {
    while (true) {
        const combo = {
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

function generateRandomGraphData(structures: string[], count: number) {
    const vertexSetSize = generateRandomNumber(1, 20);
    const { tournament, bipartite, complete, acyclic, connected, directed } = generateRandomValidCombination();
    const structuresData = generateRandomStructures(structures, count, vertexSetSize);
    
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
        structures: structuresData,
        vertexSetSize: vertexSetSize,
        edgeSetSize: edgeSetSize,
        directed: directed,
        connected: connected,
        acyclic: acyclic,
        complete: complete,
        bipartite: bipartite,
        tournament: tournament
    };
}

export {
    generateRandomNumber,
    selectRandomItem,
    generateRandomStructures,
    generateRandomGraphData
}