import * as React from "react";

export default class But extends React.PureComponent<any> {
    render() {
        const { className, columns, onColumnDrop } = this.props
        return (
            <button
                onClick={ev => this.props.goNext(ev.clientX)}
            />
        )
    }
}