export interface CellType {
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