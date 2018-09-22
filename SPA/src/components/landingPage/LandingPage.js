import React, { Component } from "react";
import {Row} from 'reactstrap';
import FavoriteGames from "./FavoriteGames.js"

class LandingPage extends Component {
	render() {
		return (
			<Row>

				<FavoriteGames />
				{/* <div>Tournaments</div>
				<div>news</div> */}
			</Row>
		);
	}
}

export default LandingPage;
