import * as React from "react";
import Row from "./Row";
import "./style.css";
import "../styles/view.less"
import { CellType } from "./TableModel";
import { NumberInput } from "../components/NumberInput";
import { CriterionEstimation, INode } from "../models";
import { TextField } from "office-ui-fabric-react";

interface ISelectMaxMin {
    criterionIndex: number;
    isMax: boolean;
}

interface ICriterionEstimatorSelect {
    criterionIndex: number;
    value: number;
}

interface ITableProps {
    data: CellType[][];
    variants: INode[];
    onChange: (value: CellType) => void;
    onChangeMax: (value: ISelectMaxMin) => void;
    onChangeCriterionValue: (value: ICriterionEstimatorSelect) => void;
    criterionEstimator: CriterionEstimation;
}

export default class Table extends React.PureComponent<ITableProps, any> {

    render() {
        debugger;
        let { data, variants } = this.props;
        return (    
            <div className="flex">
                <div className="inline-block">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <td key="id-w" rowSpan={2} className="" style={{ display: null }}>
                                    Warinat
                                </td>
                                <td key="id-k" colSpan={data[0].length} className="">
                                    Kryterium
                                </td>
                                {this.props.criterionEstimator !== CriterionEstimation.Pareto &&
                                    <td/>
                                }
                            </tr>
                            <tr>
                                {data[0].map((x, index) => {
                                    return (<td key={"header" + index} className="">
                                        <span >
                                            {"K" + index}
                                        </span>
                                        {x.isNormalized &&
                                            <span style={{ float: "right", textDecorationLine: "overline" }}>
                                                {"K" + index}
                                            </span>
                                        }
                                        {this.props.criterionEstimator === CriterionEstimation.CriterionWeightSum &&
                                            <TextField
                                                placeholder="Waga"
                                                title="Waga"
                                                value={Number(x.weight).toString()}
                                                onChanged={x => this.props.onChangeCriterionValue({ value: Number(x), criterionIndex: index })}
                                            />
                                        }
                                    </td>)
                                })}
                                {this.props.criterionEstimator !== CriterionEstimation.Pareto &&
                                    <td>
                                        Suma
                                    </td>
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.map((row, index) =>
                                    <Row
                                        key={"row-" + index}
                                        i={index}
                                        row={row}
                                        variant={variants.find(x => x.id == String.fromCharCode(65 + (index as number)))}
                                        criterionEstimator={this.props.criterionEstimator}
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
