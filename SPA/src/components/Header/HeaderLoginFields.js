import React from "react";
import { Row, Col, NavLink } from "reactstrap";

const HeaderLoginFields = () => {
	return (
		<Row style={{ backgroundColor: "gray" }}>
			<Col xs="12" sm="12">
				<div className="header__top-part">
					<div className="header__login-wrapper">
						<div className="input-group">
							<div className="input-group__label">Jméno</div>
							<input type="text" />
						</div>
						<div className="input-group">
							<div className="input-group__label">Heslo</div>
							<input type="password" />
						</div>
						<input
							type="button"
							onClick={e => {
								e.preventDefault();
							}}
							value="Přihlásit"
						/>
					</div>
					<div>Registrace</div>
					<input type="text" placeholder="Hledej" />
				</div>
			</Col>
		</Row>
	);
};

export default HeaderLoginFields;
