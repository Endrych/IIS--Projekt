import React, { Component } from "react";
import HeaderLoginLink from "./HeaderLoginLink.js";
import HeaderLoginFields from "./HeaderLoginFields.js";
import { Row, Col, NavLink } from "reactstrap";

import MediaQuery from "react-responsive";

//TODO: Nahradit lupu

class Header extends Component {
	constructor(props) {
		super(props);
	}

	state = {};

	render() {
		return (
			<Row>
				<Col xs="12" sm="12">
					<MediaQuery minWidth={1000}>
						<HeaderLoginFields />
					</MediaQuery>
					<MediaQuery maxWidth={999}>
						<HeaderLoginLink />
					</MediaQuery>
				</Col>
			</Row>
		);
	}
}

export default Header;
