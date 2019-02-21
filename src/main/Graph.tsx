import * as React from 'react';
import * as Vis from 'vis';
import { defaultsDeep } from "lodash";
import uuid from "uuid";

interface IGraph {
    edges: any[];
    nodes: any[];
}

interface IGraphProps {
    graph: IGraph;
    options: Vis.Options;
    style?: React.CSSProperties;
    events?: Array<Vis.NetworkEvents>;
    identifier: number;
    getNetwork?: (network: Vis.Network) => void;
    getNodes?: (nodes: Vis.DataSet<any>) => void;
    getEdges?: (edges: Vis.DataSet<any>) => void;
}

export default class Graph extends React.Component<IGraphProps, any> {
    edges: Vis.DataSet<any>;
    nodes: Vis.DataSet<any>;
    Network: Vis.Network;

    constructor(props) {
        super(props);
        const { identifier } = props;
        this.updateGraph = this.updateGraph.bind(this);
        this.state = {
            identifier: identifier !== undefined ? identifier : uuid.v4()
        };
    }

    componentDidMount() {
        this.edges = new Vis.DataSet();
        this.edges.add(this.props.graph.edges);
        this.nodes = new Vis.DataSet();
        this.nodes.add(this.props.graph.nodes);
        this.updateGraph();
    }

    componentDidUpdate() {
        this.updateGraph();
    }

    updateGraph() {
        let container = document.getElementById(this.state.identifier);
        let defaultOptions = {
            physics: {
                stabilization: false
            },
            autoResize: false,
            edges: {
                arrows: {
                    to: {
                        enabled: true
                    }
                },
                color: "#000000",
                width: 0.5,
            },
            layout: {
                randomSeed: undefined,
                improvedLayout:true,
                hierarchical: {
                  enabled:true,
                  levelSeparation: 150,
                  nodeSpacing: 100,
                  treeSpacing: 200,
                  parentCentralization: true,
                  direction: 'DU',        // UD, DU, LR, RL
                  sortMethod: 'directed'   // hubsize, directed
                }
              }
        } as Vis.Options;

        // merge user provied options with our default ones
        let options = defaultsDeep(defaultOptions, this.props.options);
        
        this.Network = new Vis.Network(
            container,
            { 
                ...this.props.graph, 
                edges: this.props.graph.edges,
                nodes: this.props.graph.nodes
            },
            options
        );

        // Add user provied events to network
        let events = this.props.events || {};
        for (let eventName of Object.keys(events)) {
            this.Network.on(eventName as Vis.NetworkEvents, events[eventName]);
        }
    }

    render() {
        const { identifier } = this.state;
        const { style } = this.props;
        return <div id={identifier} style={style} />
    }
}
