import * as React from "react";
import { CellType } from "./TableModel";
import "../styles/table.less"

interface ICellProps {
    cell: CellType;
    i: number | string;
    j: number | string;
    rowSpan?: number;
    onChange: (value: CellType) => void;
}

export default class Cell extends React.PureComponent<ICellProps> {
    constructor(props: any) {
        super(props);
    }

    render() {
        let { cell, rowSpan } = this.props;
        return (
            <td rowSpan={rowSpan} key={"n" + cell.i + cell.j}>
                <div className="input-group">
                    <input type="text"
                        className="form-control number-cell"
                        defaultValue={cell.value.toString()}
                        onInput={x => this.props.onChange({ ...cell, value: Number(x.currentTarget.value) })}
                    />
                    {cell.isNormalized &&
                        <div className="input-group-append">
                            <span style={{minWidth: "10vh", maxWidth: "10vh"}} className="input-group-text" >{Number.parseFloat(cell.normalizedValue.toString()).toFixed(2)}</span>
                        </div>
                    }
                </div>
            </td>
        );
    }
}
