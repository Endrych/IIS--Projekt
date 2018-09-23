import React, { Component } from "react";

import { Row, Col } from "reactstrap";
import { NavLink } from "react-router-dom";

const TournamentLine = props => {
	console.log("SADASDSD");
	return (
		<Row>
			<Col sm="12" xs="12">
				<div
					className="tournament-row"
					style={{ display: "inline-flex", justifyContent: "space-between", width: "90%" }}
				>
					<div style={{ flex:"1", textAlign:"left"}}>
						{props.data.gameIcon} {props.data.name}
					</div>
					<div style={{ flex:"1"}}>{props.data.date}</div>
					<div style={{ flex:"1"}}>
						{props.data.currentNumberOfParticipants}/{props.data.maxNumberOfParticipants}
					</div>
					<NavLink style={{ flex:"1"}} to={`/tournaments/${props.data.id}`}>vic info</NavLink>
				</div>
			</Col>
		</Row>
	);
};

export default TournamentLine;
