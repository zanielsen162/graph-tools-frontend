interface UserLogin  {
    username: string,
    password: string
}

interface UserRegister {
    username: string,
    email: string,
    password: string
}

interface User  {
    id: string,
    username?: string,
    email?: string
    auth_source: string
}

interface Graph  {
    size: GraphSize,
    types: GraphTypes,
    inducedStructures: Structure[]
}

interface Structure  {
    structure: StructureType,
    size: number,
    amount: number
    free: boolean
}

interface StructureType  {
    value: string,
    label: string,
}

interface GraphTypes  {
    directed: boolean,
    acyclic: boolean,
    connected: boolean,
    complete: boolean,
    bipartite: boolean,
    tournament: boolean
}

interface GraphSize  {
    vertexSetSize: number,
    edgeSetSize: number
}

function createDefaultGraphSize(): GraphSize {
    return {
        vertexSetSize: 0,
        edgeSetSize: 0
    }
}

export function createDefaultGraphTypes(val: boolean): GraphTypes {
    return {
        directed: val,
        acyclic: val,
        connected: val,
        complete: val,
        bipartite: val,
        tournament: val
    }
}

export function createDefaultStructureType(): StructureType {
    return {
        value: '',
        label: '',
    }
}

export function createDefaultStructure(): Structure {
    return {
        structure: createDefaultStructureType(),
        size: 0,
        amount: 0,
        free: false
    }
}

export function createDefaultGraph(): Graph {
    return {
        size: createDefaultGraphSize(),
        types: createDefaultGraphTypes(false),
        inducedStructures: [createDefaultStructure()]
    }
}

export function createDefaultUserLogin(): UserLogin {
    return {
        username: '',
        password: ''
    }
}

export function createDefaultUserRegister(): UserRegister {
    return {
        username: '',
        email: '',
        password: ''
    }
}

export type {
    UserLogin,
    User,
    Graph,
    StructureType,
    Structure,
    GraphTypes,
    GraphSize,
    UserRegister
}