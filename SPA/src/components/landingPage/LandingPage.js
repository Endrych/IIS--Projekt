import React, { Component } from "react";
import {Row} from 'reactstrap';
import FavoriteGames from "./FavoriteGames.js";
import NewestArticles from "./NewestArticles.js";

class LandingPage extends Component {

	render() {
		return (
			<Row>
				<FavoriteGames />
				<NewestArticles/>
			</Row>
		);
	}
}

export default LandingPage;
