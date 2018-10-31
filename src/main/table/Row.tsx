import * as React from "react";
import Cell from "./Cell";

interface IRowProps {
    row: any[];
}

export default class Row extends React.PureComponent<IRowProps> {
    constructor(props: any) {
        super(props);
    }

    render() {
        let { row } = this.props;
        return (
            <tr>
                {row.map(cell => <Cell cell={cell}/>)}
            </tr>
        );
    }
}
