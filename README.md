This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


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