import * as React from 'react'
import { Pivot, PivotItem } from 'office-ui-fabric-react/lib/Pivot';


export default class Header extends React.Component<any, any> {

    constructor(props) {
        super(props)

        this.state = {
            pivotKey: window.sessionStorage.getItem("pivotKey")
        };
    }


    render() {
        return (
            <Pivot
                aria-label="Separately Rendered Content Pivot Example"
                selectedKey={this.state.pivotKey}
                onLinkClick={({ props: { itemKey } }: PivotItem) => {
                    this.setState({ state: { pivotKey: itemKey } })
                    window.sessionStorage.setItem("pivotKey", itemKey);
                    window.location.href = itemKey;
                }}
                headersOnly={false}
            >
                <PivotItem headerText="Rectangle red" itemKey="editor" />
            </Pivot>
        );
    }
}
