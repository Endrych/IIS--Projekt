import React, { Component } from "react";
import {Row} from 'reactstrap';

import FavoriteGames from "./FavoriteGames.js";
import NewestArticles from "./NewestArticles.js";
import ClosestTournament from "./ClosestTournaments.js";
import ClosestTournaments from "./ClosestTournaments.js";

class LandingPage extends Component {

	render() {
		return (
			<Row>
				<ClosestTournaments/>
				<NewestArticles/>
				<FavoriteGames />
			</Row>
		);
	}
}

export default LandingPage;
