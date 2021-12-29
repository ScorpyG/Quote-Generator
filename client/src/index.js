import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AnimatedCursor from "react-animated-cursor";

import App from "./App";
import AddQuote from "./components/AddQuote";
import EditQuote from "./components/EditQuote";

ReactDOM.render(
    <>
    <AnimatedCursor
      innerSize={20}
      outerSize={40}
      color='255, 106, 101'
      outerAlpha={0.2}
      innerScale={0.7}
      outerScale={2}
      trailingSpeed={5}
    />
    
    <Router>
      <Route exact path="/" component={App}/>
      <Route path = "/create" component={AddQuote}/>
      <Route path = "/edit/:id" component={EditQuote}/>
    </Router>
    </>,
  document.getElementById("root")
);
