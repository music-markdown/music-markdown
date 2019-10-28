import App from "./components/App.js";
import React from "react";
import ReactDOM from "react-dom";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
