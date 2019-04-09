import { number, string } from "prop-types";

export enum CriterionEstimation {
    Pareto,
    CriterionSum,
    CriterionWeightSum
}

export interface IGraph {
    edges: IEdge[];
    nodes: INode[];
}

export interface IEdge {
    from: string;
    to: string;
}

export interface INode {
    id: string;
    label: string;
    level: number;
    criterionSum: number;
}