import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import { NavLink } from "react-router-dom";
// import { Col, Container, Row, Footer } from 'mdbreact';
import "../../styles/Footer/footer.css"

const FooterComponent = () => {
	return (
		// <>
		// <Footer>
			<Row className="footer__row">
				<Col xs="12" sm="12" className="footer__col">
					<NavLink className="footer__link" to="/about">O nás</NavLink>
					<NavLink  className="footer__link" to="contacts">Kontakty</NavLink>
				</Col>
			</Row>
		//  </Footer>
	);
};

export default FooterComponent;
