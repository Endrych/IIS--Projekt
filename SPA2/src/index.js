import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import promise from "redux-promise";
import thunk from 'redux-thunk';
import "babel-polyfill";
import reducers from "./reducers";

import AllRoutes from "./components/all_routes.js";
import Header from "./components/Header/header.js";

const createStoreWithMiddleware = applyMiddleware(promise, thunk)(createStore);

ReactDOM.render(
	<Provider store={createStoreWithMiddleware(reducers)}>
		<div>
			<BrowserRouter>
				<div>
					<Header history={history}/>
					<AllRoutes />
				</div>
			</BrowserRouter>
		</div>
	</Provider>,
	document.querySelector(".container")
);
