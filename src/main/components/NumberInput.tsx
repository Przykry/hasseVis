import * as React from "react";
import "../styles/styles.less";

interface INumberInput {
    updateValue: (value: number) => void;
    errorMessage: string;
    title: string;
}

export class NumberInput extends React.Component<INumberInput & any, any> {
    constructor(props) {
        super(props);

        this.state = { isError: false };
    }

    render() {
        return (
            <div className="form-group has-success">
                <label className="control-label">{this.props.title}</label>
                <input
                    {...this.props}
                    className={"form-control number-cell " + this.props.className}
                    type="number"
                    onInput={x => {
                        if (this.state.isError) this.setState({ ...this.state, isError: false })
                        if (isNaN(x.currentTarget.valueAsNumber)
                            || x.currentTarget.valueAsNumber < 1
                            || x.currentTarget.valueAsNumber > 20) {
                            x.currentTarget.value = ""
                            this.setState({ ...this.state, isError: true })
                        }
                        this.props.updateValue(Number(x.currentTarget.value))
                    }} />
                {this.state.isError && <span className="help-block number-label">{this.props.errorMessage}</span>}
            </div>
        )
    }
}