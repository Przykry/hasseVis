import * as React from "react";
import Row from "./Row";
import "./style.css";
import "../styles/view.less"
import { CellType } from "./TableModel";

interface ISelectMaxMin {
    criterionIndex: number;
    isMax: boolean;
}

interface ITableProps {
    data: CellType[][];
    onChange: (value: CellType) => void;
    onChangeMax: (value: ISelectMaxMin) => void;
}

export default class Table extends React.PureComponent<ITableProps, any> {

    render() {
        let { data } = this.props;
        let header = data[0].map((x, index) => {
            return (<td key={"header" + index} className="">
                <span >
                    {"K" + index}
                </span>
                {x.isNormalized &&
                    <span style={{ float: "right", textDecorationLine: "overline" }}>
                        {"K" + index}
                    </span>
                }
            </td>)
        })
        return (
            <div className="flex">
                <div className="inline-block">
                    <table className="table table-bordered">
                        <thead className="thead-dark">
                            <tr>
                                <td key="id-w" rowSpan={2} className="" style={{ display: null }}>
                                    Warinat
                                </td>
                                <td key="id-k" colSpan={data[0].length} className="">
                                    Kryterium
                                </td>
                            </tr>
                            <tr>
                                {...header}
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.map((row, index) =>
                                    <Row
                                        key={"row-" + index}
                                        i={index}
                                        row={row}
                                        onChange={x => this.props.onChange(x)}
                                    />)
                            }
                            <tr>
                                <td />
                                {
                                    data[0].map((x, index) =>
                                        (<td key={"select" + index}>
                                            <div className="form-group">
                                                <select className="form-control"
                                                    onChange={value => this.props.onChangeMax({
                                                        criterionIndex: index,
                                                        isMax: value.currentTarget.value === "1"
                                                    })}
                                                    defaultValue={"1"}
                                                >
                                                    <option value="1">Max</option>
                                                    <option value="2">Min</option>
                                                </select>
                                            </div>
                                        </td>))
                                }
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div >
        );
    }
}
