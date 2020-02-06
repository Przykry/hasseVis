import * as React from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link
} from "react-router-dom";
import { Pivot, PivotItem } from 'office-ui-fabric-react/lib/Pivot';
import Header from "./Header";
import Editor from "./Editor";

export default class App extends React.Component<any, any> {


	constructor(props) {
		super(props)

		this.state = {
			selectedKey: "1"
		}
	}

	render() {

		return (
			<Router >
				<Header/>
				<div>
					{/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
					<Switch>
						<Route path="/editor" render={() => <Editor/>} />
					</Switch>
				</div>
			</Router>
		);
	}
}

