import * as React from "react";

interface ICellProps {
    cell: any;
}

export default class Cell extends React.PureComponent<ICellProps> {
    constructor(props: any) {
        super(props);
    }

    render() {
        let { cell } = this.props;
        return (
            <td>
                <input type="text"
                    defaultValue={cell}
                />
            </td>
        );
    }
}
