import * as React from "react";


interface ISimpleSelectProps {
    onChange: (value: string) => void;
    values: { key: string, value: string }[];
    disabled?: boolean;
    value: string;
}

export class SimpleSelect extends React.Component<ISimpleSelectProps, any> {
    render() {
        return (
            <select className="form-control"
                onChange={x => this.props.onChange(x.currentTarget.value)}
                value={this.props.value}
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

