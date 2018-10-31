import * as React from "react";
import * as ReactDOM from "react-dom";
import { createHashHistory } from "history";
import App from "./main/App";

const history = createHashHistory();
const renderApp = () => {
    let result = <App/>;
    return result;
};

ReactDOM.render(
    renderApp(),
    document.getElementById("container")
);
