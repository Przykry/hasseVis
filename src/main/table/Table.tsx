import * as React from "react";
import Row from "./Row";
import { Button } from "office-ui-fabric-react";
import "./style.css";

interface ITableProps {
    data: any[][];

}

export default class Table extends React.PureComponent<ITableProps, any> {

    render() {
        let { data } = this.props;
        return (
            <div className="flex">
                <div className="inline-block">
                    <table>
                        {
                            data.map(row =>
                                <Row
                                    row={row}
                                />)
                        }
                    </table>
                    <button
                        className="buttonX"
                    />
                </div>
                <button
                    className="buttonY"
                />
            </div>
        );
    }
}
