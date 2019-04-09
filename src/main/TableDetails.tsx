import * as React from "react";
import { TextField } from "office-ui-fabric-react/lib/components/TextField";
import { DefaultButton } from "office-ui-fabric-react/lib/components/Button";
import SimpleSelect from "./NormalizationTypeSelect";
import { IsCorrectNumber } from "./tools/ValidationTool";
import { CriterionEstimation } from "./models";
import { CellType } from "./table/TableModel";

export interface ITableDimension {
    criterionCount: number;
    variantCount: number;
}

export interface ITableModel {
    tableDimension?: ITableDimension;
    isNormalized?: boolean;
    criterionEstimation?: string;
    criterionType?: string;
}

interface ITableDetailsState extends ITableDimension {

}

interface ITableDetailsProps extends ITableModel {
    data: CellType[][];
    update: (data: any) => void;
    onChange: (objectValue?: ITableModel) => void;
}

const criterionTypes = [
    { key: "normal", value: "Kryteria zwykłe" },
    { key: "normalized", value: "Kryteria znormalizowane" }
]

const criterionEstimation = [
    { key: CriterionEstimation.Pareto.toString(), value: "Pareto" },
    { key: CriterionEstimation.CriterionSum.toString(), value: "Suma kryteriów" },
    { key: CriterionEstimation.CriterionWeightSum.toString(), value: "Suma ważona kryteriów" }
]

export default class TableDetails extends React.Component<ITableDetailsProps, ITableDetailsState> {

    constructor(props) {
        super(props);
        this.state = {
            criterionCount: 4,
            variantCount: 4 
        };
    }

    render() {
        let state = this.state;

        return (
            <div className="ms-Grid">
                <div className="ms-Grid-row">
                    <TextField
                        className="ms-Grid-col ms-lg2"
                        placeholder="Liczba kryteriow"
                        title="Liczba kryteriow"
                        value={state.criterionCount.toString()}
                        onChanged={x => this.setState({ ...state, criterionCount: x })}
                        onGetErrorMessage={x => IsCorrectNumber(x)}
                    />
                    <TextField
                        className="ms-Grid-col ms-lg2"
                        placeholder="Liczba wariantow"
                        title="Liczba wariantow"
                        value={state.variantCount.toString()}
                        onChanged={x => this.setState({ ...state, variantCount: x })}
                        onGetErrorMessage={x => IsCorrectNumber(x)}
                    />
                    <DefaultButton
                        className="ms-Grid-col ms-lg2"
                        text="Akceptuj"
                        onClick={() => this.props.update({ tableDimension: state})}
                    />
                </div>
                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-lg2 form-group">
                        <SimpleSelect
                            key="criterionSelect"
                            onChange={x => this.props.onChange({ criterionType: x })}
                            values={criterionTypes}
                        />
                        <SimpleSelect
                            key="estimationSelect"
                            onChange={x => this.props.onChange({ criterionEstimation: x })}
                            values={criterionEstimation}
                            disabled={!this.props.isNormalized}
                        />
                    </div>
                </div>
            </div>
        );
    }
}