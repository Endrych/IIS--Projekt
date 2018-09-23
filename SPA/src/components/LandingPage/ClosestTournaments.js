import React, { Component } from "react";
import { Row, Col } from "reactstrap";

import TournamentLine from "./TournamentLine.js";

class ClosestTournaments extends Component {
	constructor(props) {
		super(props);

		this.state = {
			data: []
		};
	}

	componentDidMount() {
		var newData = this.getData();
		console.log(this.state, newData);

		// this.setState((prevState) => {return { data: "ASDSA" }});
		this.setState({
			data: newData
		});
		//ziskat data o 10 nejblizsich turnajich
	}

	getData() {
		//gameicon bude obrazek loga hry pred jmenem turnaje
		return [
			{
				name: "ESL",
				gameIcon: "o",
				date: "11.5.2018",
				id: "1",
				maxNumberOfParticipants: 12,
				currentNumberOfParticipants: 7
			},
			{
				name: "CSPlay",
				gameIcon: "o",
				date: "21.6.2018",
				id: "2",
				maxNumberOfParticipants: 16,
				currentNumberOfParticipants: 16
			},
			{
				name: "OverLeague",
				gameIcon: "o",
				date: "31.5.2018",
				id: "3",
				maxNumberOfParticipants: 12,
				currentNumberOfParticipants: 7
			},
			{
				name: "Minc",
				gameIcon: "o",
				date: "12.5.2018",
				id: "4",
				maxNumberOfParticipants: 17,
				currentNumberOfParticipants: 10
			},
			{
				name: "Friady Fortnite",
				gameIcon: "o",
				date: "1.5.2018",
				id: "5",
				maxNumberOfParticipants: 99,
				currentNumberOfParticipants: 71
			}
		];
	}
	prepareRenderData(){
		var renderDAta = [];
		console.log(this.state.data, "ND");
		for (var i = 0; i < this.state.data.length; i++) {
			var j = i;
			renderDAta.push(<TournamentLine key={j} data={this.state.data[i]} />);
		}

		return renderDAta;
	}
	render() {
		// var newData = this.state.data;

		return (
			// <Row>
			<Col xs="12" sm="12" className="favorite__game-wrapper">
				<Row>
					<Col className="" xs="12" sm="12">
						<div className="favorite__title">Nadcházející turnaje</div>
					</Col>
				</Row>
				{this.prepareRenderData()}
			</Col>
			// </Row>
		);
	}
}

export default ClosestTournaments;
