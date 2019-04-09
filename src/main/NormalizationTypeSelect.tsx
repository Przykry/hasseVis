import * as React from "react";


interface ISimpleSelectProps {
    onChange: (value: string) => void;
    values: { key: string, value: string }[];
    disabled?: boolean;
}

export class SimpleSelect extends React.Component<ISimpleSelectProps, any> {
    render() {
        return (
            <select className="form-control"
                onChange={x => this.props.onChange(x.currentTarget.value)}
                defaultValue="normal"
                disabled={this.props.disabled}
            >
                {this.props.values.map(x => {
                    return (
                        <option value={x.key}>{x.value}</option>
                    )
                })}
            </select>
        )
    }
}

export default SimpleSelect;

