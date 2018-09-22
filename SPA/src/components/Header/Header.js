import React, { Component } from "react";

import HeaderLoginLink from "./HeaderLoginLink.js";
import HeaderLoginFields from "./HeaderLoginFields.js";
import HeaderNavigationBar from "./HeaderNavigationBar";

import { Row, Col, NavLink } from "reactstrap";
import MediaQuery from "react-responsive";
//TODO: Nahradit lupu
import "../../styles/Header/header.css";

class Header extends Component {
	state = {};

	render() {
		return (
			<Row className="header__row-color">
				<Col xs="12" sm="12">
					<MediaQuery minWidth={992}>
						<HeaderLoginFields />
					</MediaQuery>
					<MediaQuery maxWidth={991}>
						<HeaderLoginLink />
					</MediaQuery>

					<HeaderNavigationBar />
				</Col>
			</Row>
		);
	}
}

export default Header;
