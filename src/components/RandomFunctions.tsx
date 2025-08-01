function generateRandomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function selectRandomItem(items: any[]) {
    return items[generateRandomNumber(0, items.length - 1)];
}

function generateRandomStructures(structures: string[], count: number) {
    return Array.from({ length: count }, () => ({
        structure: selectRandomItem(structures),
        size: String(generateRandomNumber(1, 10)),
        amount: String(generateRandomNumber(1, 5))
    }));
}

function generateRandomGraphData(structures: any[], count: number) {
    const structuresData = generateRandomStructures(structures, count);
    
    
    const tournament = Math.random() < 0.5;
    const directed = Math.random() < 0.5;
    const connected = tournament ? true : Math.random() < 0.5;
    const vertexSetSize = generateRandomNumber(1, 50);
    let min = tournament ? vertexSetSize * (vertexSetSize - 1) / 2 : connected ? vertexSetSize - 1 : 0;
    let max = tournament ? vertexSetSize * (vertexSetSize - 1) / 2 : directed ? vertexSetSize * (vertexSetSize - 1) : vertexSetSize * (vertexSetSize - 1) / 2;
    const edgeSetSize = generateRandomNumber(min, max);

    return {
        structures: structuresData,
        vertexSetSize: String(vertexSetSize),
        edgeSetSize: String(edgeSetSize),
        directed: directed,
        connected: connected,
        complete: Math.random() < 0.5,
        bipartite: Math.random() < 0.5,
        tournament: tournament
    };
}

export {
    generateRandomNumber,
    selectRandomItem,
    generateRandomStructures,
    generateRandomGraphData
}