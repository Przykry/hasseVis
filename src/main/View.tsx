import * as React from "react";
import { Button, TextField, DefaultButton } from "office-ui-fabric-react";
import Table from "./table/Table";
import "./table/style.css";
import { HasseDiagramApi } from "./clientApi";
import Graph from "./Graph";
import { DataSet } from "vis";
import "./styles/view.less"
import { NumberInput } from "./components/NumberInput";
import { defaultsDeep } from "lodash";
import { CellType } from "./table/TableModel";
import Cell from "./table/Cell";
import { IsCorrectNumber } from "./tools/ValidationTool";
import SimpleSelect from "./NormalizationTypeSelect";

interface IViewState {
    data: CellType[][];
    graph: any;
}

let nodes = [
    { id: "A", label: "A", cid: 1 },
    { id: "B", label: "B", cid: 1 },
    { id: 3, label: "3" },
    { id: 4, label: "4" },
    { id: 5, label: "5" }
];

const criterionTypes = [
    { key: "normal", value: "Kryteria zwykłe" },
    { key: "normalized", value: "Kryteria znormalizowane" }
]

let edges = [{ from: "B", to: 4 }, { from: "A", to: "B" }, { from: "A", to: 3 }];
let graph = { nodes, edges }

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
        let startCount = 3
        this._criterionCount = startCount;
        this.variantCount = startCount;
        this.state = {
            data: function () {
                let data: CellType[][] = [];
                for (let i = 0; i < 6; i++) {
                    data[i] = [];
                    for (let j = 0; j < startCount; j++) {
                        data[i][j] = {
                            variant: String.fromCharCode(65 + (i as number)),
                            criterion: "K" + j,
                            value: (j + i) % 3 ? j : i,
                            width: 30,
                            isMax: true,
                            isNormalized: false,
                            i: i,
                            j: j
                        } as CellType
                    }
                }
                return data as CellType[][];
            }(),
            graph: {
                nodes: [
                    { id: "D", label: "D" },
                    { id: "A", label: "A" },
                    { id: "B", label: "B" },
                    { id: "C", label: "C" },
                    { id: "E", label: "E" },
                    { id: "F", label: "F" },
                ],
                edges: []
            }
        };

    }

    updateGraph(data: CellType[][]) {
        if (data === [])
            data = this.state.data;
        HasseDiagramApi.normalizeValues(data)
            .then(normalizedTable => {
                HasseDiagramApi.getGraph(normalizedTable)
                    .then(x => {
                        this.setState({ ...this.state, data: normalizedTable, graph: x.body });
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
                    cell.normalizedValue = undefined;
                }
            });
        });
        this.updateGraph(data);
    }

render() {
    return (
        <div>
            <div className="ms-Grid">
                <div className="ms-Grid-row">
                    <TextField
                        className="ms-Grid-col ms-lg2"
                        placeholder="Liczba kryteriow"
                        title="Liczba kryteriow"
                        onChanged={x => this.criterionCount = +x}
                        onGetErrorMessage={x => IsCorrectNumber(x)}
                    />
                    <TextField
                        className="ms-Grid-col ms-lg2"
                        placeholder="Liczba wariantow"
                        title="Liczba wariantow"
                        onChanged={x => this.variantCount = +x}
                        onGetErrorMessage={x => IsCorrectNumber(x)}
                    />
                    <DefaultButton
                        title="Kryteria znormalizowane"
                        className="ms-Grid-col ms-lg2"
                        text="Akceptuj"
                        onClick={() => this.updateGraph(this.state.data)}
                    />
                </div>
                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-lg2 form-group">
                        <SimpleSelect
                            onChange={x => this.setNormalizedValues(x)}
                            values={criterionTypes}
                        />
                    </div>
                </div>
            </div>
            <Table
                data={this.state.data}
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
