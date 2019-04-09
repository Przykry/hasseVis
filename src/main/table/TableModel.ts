import { CriterionEstimation } from "../models";

export interface CellType {
    weight: number;
    criterionEstimator: CriterionEstimation;
    variant: string;
    criterion: string;
    normalizedValue?: number;
    value: number;
    isNormalized: boolean;
    isMax: boolean;
    width?: number;
    i: number;
    j: number;
}