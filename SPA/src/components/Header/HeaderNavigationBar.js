import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import "../../styles/Header/headerNavigationBar.css";

class HeaderNavigationBar extends Component {
	render() {
		return (
			<Row className="header__navigation-row">
				<Col xs="12" sm="12" lg="4" className="header__navigation-col">
					<Link className="header__nav-link" to="/news">
						<div className="header__nav-link--text" >
							Novinky
						</div>
					</Link>
				</Col>
				<Col xs="12" sm="12" lg="4" className="header__navigation-col">
					<Link className="header__nav-link" to="/games">
						<div className="header__nav-link--text" >
							Hry
						</div>
					</Link>
				</Col>
				<Col xs="12" sm="12" lg="4" className="header__navigation-col">
					<Link className="header__nav-link" to="/tournaments">
						<div className="header__nav-link--text">
							Turnaje
						</div>
					</Link>
				</Col>
			</Row>
		);
	}
}

export default HeaderNavigationBar;
