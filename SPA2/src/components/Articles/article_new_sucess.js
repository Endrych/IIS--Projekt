import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';

class ArticleNewSucess extends Component {
	render() {
		return (
			<div>
				<h2>Článek úspěšně vytvořen</h2>
				<Link to="/">
					<button className="btn btn-primary">Zpět na úvodní stranu</button>
				</Link>
			</div>
		);
	}
}

export default connect(null)(ArticleNewSucess);