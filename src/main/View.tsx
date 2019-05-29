import { DefaultButton, TextField } from "office-ui-fabric-react";
import * as React from "react";
import { HasseDiagramApi, HasseRequest } from "./clientApi";
import Graph from "./Graph";
import { CriterionEstimation, IGraph } from "./models";
import SimpleSelect from "./SimpleSelect";
import Table from "./table/Table";
import { CellType } from "./table/TableModel";
import "./styles/view.less";
import "./table/style.css";
import TableDetails, { ITableModel, ITableDimension } from "./TableDetails";

interface IViewState {
    data: CellType[][];
    estimator: CriterionEstimation;
    graph: IGraph;
    isNormalized: boolean;
    criterionCount: number;
    variantCount: number;
}
const defaultVariantCount = 4;
const defaultCriterionCount = 4;

export default class View extends React.Component<any, IViewState> {
    _criterionCount: number;
    _variantCount: number;
    criterionInput: HTMLInputElement;

    set variantCount(variantCount: number) {
        if (variantCount > 20 || variantCount < 1) {
            variantCount = defaultVariantCount;
        }
        this._variantCount = variantCount;
    }

    set criterionCount(criterionCount: number) {
        if (criterionCount > 20 || criterionCount < 1) {
            criterionCount = defaultCriterionCount;
        }
        this._criterionCount = criterionCount;
    }


    constructor(props: any) {
        super(props);

        this.state = {
            variantCount: 4,
            criterionCount: 4,
            data: this.createTable(),
            graph: {
                nodes: [],
                edges: []
            },
            estimator: CriterionEstimation.Pareto,
            isNormalized: false,
        };

    }

    createTable(data: CellType[][] = [], tableDimension: ITableDimension = undefined) {
        let { criterionCount, variantCount } = tableDimension || { criterionCount: 0, variantCount: 0 };
        if (!this.state)
            variantCount = criterionCount = 4
        else if (!criterionCount && !variantCount) {
            criterionCount = this.state.criterionCount;
            variantCount = this.state.variantCount;
        }

        for (let i = 0; i < criterionCount; i++) {
            if (!data[i])
                data[i] = [];
            for (let j = 0; j < variantCount; j++) {
                if (!data[i][j])
                    data[i][j] = {
                        variant: String.fromCharCode(65 + (i as number)),
                        criterion: "K" + j,
                        value: (j + i) % 3 ? j : i,
                        width: 30,
                        isMax: !data[0][j] ? true : data[0][j].isMax,
                        weight: 1,
                        isNormalized:  !this.state ? false : this.state.isNormalized,
                        i: i,
                        j: j
                    } as CellType
            }
            data[i].length = variantCount;
        }
        data.length = criterionCount;

        return data;
    }

    updateGraph(data: CellType[][], isNormalized: boolean = undefined, tableDimension: ITableDimension = undefined, estimator: Number = undefined) {
        let { criterionCount, variantCount } = tableDimension
            || {
                criterionCount: this.state.criterionCount,
                variantCount: this.state.variantCount
            };
        data = this.createTable(data, tableDimension);
        isNormalized = isNormalized !== undefined ? isNormalized : this.state.isNormalized;
        estimator = estimator !== undefined ? estimator : this.state.estimator;
        HasseDiagramApi.getGraph({
            table: data,
            criterionEstimation: estimator,
            isNormalized: isNormalized
        } as HasseRequest)
            .then(x => {
                this.setState({
                    ...this.state,
                    criterionCount,
                    variantCount,
                    estimator: Number(estimator),
                    data: x.body.table,
                    graph: x.body.graph,
                    isNormalized: isNormalized
                });
            });
    }

    setNormalizedValues(selected: string) {
        let data = this.state.data;
        data.forEach(row => {
            row.forEach(cell => {
                if (selected === "normalized") {
                    cell.isNormalized = true;
                    cell.normalizedValue = undefined;
                }
                else {
                    cell.isNormalized = false;
                    cell.criterionEstimator = CriterionEstimation.Pareto;
                    cell.normalizedValue = undefined;
                }
            });
        });
        this.updateGraph(data, selected === "normalized", undefined, selected === "normalized" ? undefined : CriterionEstimation.Pareto);
    }

    setEstimatiomn(selected: string) {
        let data = this.state.data;
        data.forEach(row => {
            row.forEach(cell => {
                cell.criterionEstimator = Number(selected);
            });
        });
        this.setState({ ...this.state, estimator: Number(selected) });
        this.updateGraph(data, undefined, undefined, Number(selected));
    }

    update(value: ITableModel) {
        if (value === undefined) {
            return;
        }
        if (value.criterionEstimation) {
            this.setEstimatiomn(value.criterionEstimation);
        }
        if (value.criterionType) {
            this.setNormalizedValues(value.criterionType);
        }
        if (value.tableDimension) {
            this.updateGraph(this.state.data, this.state.isNormalized, value.tableDimension, this.state.estimator);
        }
    }

    render() {
        return (
            <div>
                <TableDetails
                    data={this.state.data}
                    update={(tableDimension) => this.update(tableDimension)}
                    onChange={(value: ITableModel) => this.update(value)}
                    isNormalized={this.state.isNormalized}
                    criterionEstimation={this.state.estimator.toString()}
                />
                <Table
                    data={this.state.data}                   
                    variants={this.state.graph.nodes}
                    onChange={x => {
                        let data = this.state.data;
                        data[x.i][x.j].value = x.value;
                        this.setState({ ...this.state, data })
                        this.updateGraph(data);
                    }}
                    onChangeMax={x => {
                        let data = this.state.data;
                        data.forEach(el => {
                            el[x.criterionIndex].isMax = x.isMax;
                        });
                        this.setState({ ...this.state, data })
                        this.updateGraph(data);
                    }}
                    onChangeCriterionValue={x => {
                        let data = this.state.data;
                        data.forEach(el => {
                            el[x.criterionIndex].weight = x.value;
                        });
                        this.setState({ ...this.state, data })
                        this.updateGraph(data);
                    }}
                    criterionEstimator={this.state.estimator}
                />
                <div className="border-view">
                    <Graph
                        graph={this.state.graph}
                        identifier={1}
                        style={{ height: "600px" }}
                        options={{
                            edges: {
                                arrowStrikethrough: true,
                                color: "#000000"
                            }
                        }}
                    />
                </div>
            </div>
        );
    }


}
