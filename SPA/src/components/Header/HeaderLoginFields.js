import React from "react";
import { Row, Col } from "reactstrap";
import {NavLink} from 'react-router-dom';
import "../../styles/Header/headerLoginFields.css";

const HeaderLoginFields = () => {
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
								e.preventDefault();
							}}
							value="Přihlásit"
						/>
					</div>
					<NavLink className="header__register" to="/register">Registrace</NavLink>
					<input type="text" placeholder="Hledej" />
				</div>
			</Col>
		</Row>
	);
};

export default HeaderLoginFields;
