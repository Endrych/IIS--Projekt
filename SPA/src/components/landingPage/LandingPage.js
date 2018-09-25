import React, { Component } from "react";
import {Row} from 'reactstrap';

import FavoriteGames from "./FavoriteGames.js";
import NewestArticles from "./NewestArticles.js";
import ClosestTournament from "./ClosestTournaments.js";
import ClosestTournaments from "./ClosestTournaments.js";
import axios from "axios";

class LandingPage extends Component {
	constructor(){
		super();

	}

	componentDidMount(){

	}

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
