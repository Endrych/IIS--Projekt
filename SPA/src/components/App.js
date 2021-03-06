import React, { Component } from "react";
import "../styles/App.css";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter as Router, Link, NavLink, Redirect, Prompt, Switch } from "react-router-dom";
import { Row, Col, Container } from "reactstrap";
import Route from "react-router-dom/Route";

import AllRoutes from "./AllRoutes.js";
import Header from "./Header//Header.js";
import FooterComponent from "./Footer/FooterComponent.js";
// const App = () => {
// 	return (
// 		<Container className="bg-info clearfix">

// 		</Container>
// 	)
// }

class App extends Component {
	state = {
		loggedIn: false
	};
	loginHandle = () => {
		this.setState(prevState => ({
			loggedIn: !prevState.loggedIn
		}));
	};
	render() {
		return (
			<Router>
				<div>
					<Container className="App">
						{/* <NavLink to="/" style={{ marginRight: 10 }} activeStyle={{ color: "green" }} exact>
						Home
					</NavLink>
					<NavLink to="/about" style={{ marginRight: 10 }} activeStyle={{ color: "green" }} exact>
						about
					</NavLink>
					<NavLink to="/user/John" style={{ marginRight: 10 }} activeStyle={{ color: "green" }} exact>
						John
					</NavLink>
					<NavLink to="/user/Peter" style={{ marginRight: 10 }} activeStyle={{ color: "green" }} exact>
						Peter
					</NavLink>

					<Prompt
						when={!this.state.loggedIn}
						message={location => {
							return location.pathname.startsWith("/user") ? "Are you sure" : true;
						}}
					/>

					<input
						type="button"
						value={this.state.loggedIn ? "log out" : "log in"}
						onClick={this.loginHandle.bind(this)}
					/> */}
						<div className="main-body">
							<Header />
							<AllRoutes />
						</div>
					</Container>
					<Container fluid={true} className="container-fluid__no-padding">
						<div className="footer">
							<FooterComponent />
						</div>
					</Container >
				</div>
			</Router>
		);
	}
}

export default App;

// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <h1 className="App-title">Welcome to React</h1>
//         </header>
//         <p className="App-intro">
//           To get started, edit <code>src/asdasdasd.js</code> and save to reload.
//         </p>
//       </div>
//     );
//   }
// }

// export default App;
