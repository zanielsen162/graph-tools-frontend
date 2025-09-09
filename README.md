# graph-tools-frontend
A frontend application built with [Next.js](https://nextjs.org). This application provides an interface for retrieving and displaying user data. The goal of this project is to allow users to provide specification for desired graph features, which will be generated and displayed in an interactive viewer, as well as potential to analyze the graphs. Additionally, it makes use of Jenkins and Podman to setup the CI/CD pipeline, including deployment on a Kubernetes cluster (which has been simulated in [minikube](https://minikube.sigs.k8s.io/docs/)). For specs on Jenkins and the Kubernetes cluster, check out my [kube repo](https://github.com/zanielsen162/kube). To check out the backend (including graph generation functionality and database management), check out my [graph-tools-backend](https://github.com/zanielsen162/graph-tools-backend).

## Usage 
1. Build the container
```bash
podman build --format docker --tag graph-tools-frontend .
```
2. Run the container
```bash
podman run -p 3000:3000 graph-tools-frontend
```
3. Stop container
```bash
podman stop graph-tools-frontend
```

## Maintenance 
This project was structured based on [atomic design](https://www.dhiwise.com/post/the-ultimate-guide-to-react-atomic-design-principles) principles. Below is an explanation of the components and pages used.

<details>
    <summary>Pages</summary>
    1. `Home`: Displays basic information about the site and links to important pages.
    2. `Generate`: Main interface for generating a graph, includes an `Analyze` tab if the user is logged in.
    3. `Login`: Authentication page for existing user.
    4. `Sign Up`: Authentication page to create an user.
    5. `Saved`: Page for users to view previously generated graphs.
    6. `Shared`: Page where all viewers can look at graphs shared by existing users. Users can post to here from `Saved.`
    7. `Health`: Endpoint for testing.
</details>

<details>
    <summary>Components</summary>
    
</details>


### Usability
- Generate Random Graph
- Input a graph
- Visualize the graph, move around nodes/edges interactively
- Construct specific graph structures (C4, K4, P4, etc) with different values, set number of instances in graph or random amount or set it to be free of these structures
- save these graphs with notes and modifications
- branching visualization and automation (add kind of a programmability aspect to what it branches on)
- structures are parametrized graph families

## Graph Requirements
- Tournament
    - TRUE: directed, connected, 
    - FALSE: bipartite, complete
    - Edges: n(n-1) / 2
- Bipartite
    - TRUE:
    - FALSE: tournament, complete,
    - Edges: bounded by |A|*|B| if those are the partitions
- Complete
    - TRUE: connected
    - FALSE: acyclic, bipartite, tournament
    - Edges: n(n-1) / 2 if undirected, else n(n-1)
- Acyclic
    - TRUE:
    - FALSE: complete
    - Edges: n-1 if undirected, else n(n-1)/2
- Connected
    - TRUE: 
    - FALSE:
    - Edges minimum is n-1

## Structure Requirements
- Complete
    - n * (n-1) / 2 or n * (n-1) if directed
    - FALSE: tournament, bipartite, acyclic
- Simple Cycle
    - n - 1
    - FALSE: bipartite (if n > 2), acyclic, complete (if n > 3)
- Star
    - n
    - FALSE: complete (if n > 2), tournament
- Wheel
    - n \geq 4
    - 2(n-1)
    - FALSE: tournament (n > 4), bipartite, complete (n > 4), acyclic 
- Path
    - n-1
    - FALSE: tournament, complete (n > 2) 
