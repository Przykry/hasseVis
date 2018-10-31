import * as React from "react";
import {
    Link
} from "react-router-dom";
import { Router, Switch, Route } from "react-router";
import { createHashHistory } from "history";
import View from "./View";

const history = createHashHistory();

export default class App extends React.Component<any, any> {
    render() {
        return (
                <Router history={history}>
                    <Switch>
                        <Route exact path="/" component={View} />
                    </Switch>
                </Router>
        );
    }
}
