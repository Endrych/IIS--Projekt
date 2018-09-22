import React, { Component } from "react";

import HeaderLoginLink from "./HeaderLoginLink.js";
import HeaderLoginFields from "./HeaderLoginFields.js";
import HeaderNavigationBar from "./HeaderNavigationBar";

import { Row, Col, NavLink } from "reactstrap";
import MediaQuery from "react-responsive";
//TODO: Nahradit lupu

class Header extends Component {

	state = {};

	render() {
		return (
			<Row>
				<Col xs="12" sm="12">
					<Row>
						<Col xs="12" sm="12">
							<MediaQuery minWidth={992}>
								<HeaderLoginFields />
							</MediaQuery>
							<MediaQuery maxWidth={991}>
								<HeaderLoginLink />
							</MediaQuery>
						</Col>
					</Row>
					<HeaderNavigationBar />
				</Col>
			</Row>
		);
	}
}

export default Header;
