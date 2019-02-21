import * as React from "react";
import Cell from "./Cell";
import { CellType } from "./TableModel";

interface IRowProps {
    row: CellType[];
    i: number | string;
    isHeader?: boolean;
    onChange: (value: CellType) => void;
}

export default class Row extends React.Component<IRowProps, any> {
    constructor(props: any) {
        super(props);
    }

    render() {
        let { row, i, isHeader } = this.props;
        return (
            <tr>
                {!isHeader && <td className="">{String.fromCharCode(65 + (i as number))}</td>}
                {row.map((cell, index) =>
                    <Cell
                        key={"cell-" + index}
                        cell={cell}
                        i={i}
                        j={index}
                        onChange={x => this.props.onChange(x)}
                    />
                )}
            </tr>
        );
    }
}
