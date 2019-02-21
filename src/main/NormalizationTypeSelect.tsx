import * as React from "react";


interface ISimpleSelectProps {
    onChange: (value: string) => void;
    values: { key: string, value: string }[];
}

export class SimpleSelect extends React.Component<ISimpleSelectProps, any> {
    render() {
        return (
            <select className="form-control"
                onChange={x => this.props.onChange(x.currentTarget.accessKey)}
                defaultValue="normal"
            >
                {this.props.values.map(x => {
                    return (
                        <option key={x.key}>{x.value}</option>
                    )
                })}
            </select>
        )
    }
}

export default SimpleSelect;

