import * as React from "react";
import { Button, TextField } from "office-ui-fabric-react";
import Table from "./table/Table";
import "./table/style.css";
import { getValues } from "./clientApi";
import { DataSheet, GridElement } from "../components/ReactDatasheet";
import ReactDataSheet from "../../node_modules/react-datasheet";
import Cytoscape from "react-cytoscape"
import Graph from "./Graph";
import { DataSet } from "vis";

interface IViewState {
    grid: GridElement[][];
    columns: any[];
}


let nodes = [
    { id: 1, label: "1"},
    { id: 2, label: "2"},
    { id: 3, label: "3"},
    { id: 4, label: "4"},
    { id: 5, label: "5"}
];

let edges = [{ from: 1, to: 2 }, { from: 1, to: 3 }, { from: 2, to: 4 }, { from: 2, to: 5 }];
let graph = { nodes, edges }


//You can also strongly type all the Components or SFCs that you pass into ReactDataSheet.
let cellRenderer: ReactDataSheet.CellRenderer<GridElement, number> = (props) => {
    const backgroundStyle = props.cell.value && props.cell.value < 0 ? { color: 'red' } : undefined;
    return (
        <td style={backgroundStyle} onMouseDown={props.onMouseDown} onMouseOver={props.onMouseOver} onDoubleClick={props.onDoubleClick} className="cell">
            {props.children}
        </td>
    )
}


class SheetRenderer extends React.PureComponent<any> {
    render() {
        const { className, columns, onColumnDrop } = this.props
        return (
            <table className={className}>
                <thead>
                    <tr>
                        <th className='cell read-only row-handle' key='$$actionCell' />
                        {
                            columns.map((col, index) => (
                                <th className={className} style={{ width: col.width }}>{col.label}</th>
                            ))
                        }
                    </tr>
                </thead>
                <tbody>
                    {this.props.children}
                </tbody>
            </table>
        )
    }
}

export default class View extends React.Component<any, IViewState> {
    no: number;
    cy: any;

    constructor(props: any) {
        super(props);
        this.state = {
            columns: [
                { label: 'Style', width: '40%' },
                { label: 'IBUs', width: '20%' },
                { label: 'Color (SRM)', width: '20%' },
                { label: 'Rating', width: '20%' }
            ],
            grid: function () {
                let data: GridElement[][] = [];
                for (let i = 0; i < 10; i++) {
                    data[i] = [];
                    for (let j = 0; j < 10; j++) {
                        data[i][j] = { value: j + i, width: 30 }
                    }
                }
                return data as GridElement[][];
            }()
        };

    }

    renderSheet(props) {
        return <SheetRenderer columns={this.state.columns} {...props} />
    }

    render() {
        return (
            <div id="cy" className="cy" >
                <DataSheet
                    data={this.state.grid}
                    valueRenderer={(cell) => cell.value}
                    onCellsChanged={changes => {
                        const grid = this.state.grid.map(row => [...row]);
                        changes.forEach(({ cell, row, col, value }) => {
                            grid[row][col] = { ...grid[row][col], value }
                        })
                        this.setState({ grid })
                    }}
                    cellRenderer={cellRenderer}
                />
                <div>
                    <Graph
                        graph={graph}
                        identifier={1}
                        style={{height: "1000px"}}
                        options={{
                            layout: {
                                hierarchical: true
                            },
                            edges: {
                                color: "#000000"
                            }
                        }}
                    />
                </div>
            </div>
        );
    }


}
