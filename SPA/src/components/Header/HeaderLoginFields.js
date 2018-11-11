import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import "../../styles/Header/headerLoginFields.css";

import axios from "axios";

class HeaderLoginFields extends Component {



	render() {
		return (
			<Row>
				<Col xs="12" sm="12">
					<div className="header__top-part">
						<div className="header__login-wrapper">
							<div className="header__input-group">
								<div className="header__input-group--label">Jméno</div>
								<input type="text" />
							</div>
							<div className="header__input-group">
								<div className="header__input-group--label">Heslo</div>
								<input type="password" />
							</div>
							<input
								className="header__login-button"
								type="button"
								onClick={e => {
									this.sendRegister(e);
								}}
								value="Přihlásit"
							/>
						</div>
						<Link className="header__register" to="/register">
							Registrace
						</Link>
						<input type="text" placeholder="Hledej" />
					</div>
				</Col>
			</Row>
		);
	}
}

export default HeaderLoginFields;
