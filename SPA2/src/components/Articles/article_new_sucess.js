import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';

class ArticleNewSucess extends Component {
	render() {
		return (
			<div className="row row__box">
				<div className="col col-sm-12">
					<h2>Článek úspěšně vytvořen</h2>
					<Link to="/">
						<button className="btn btn-primary">Zpět na úvodní stranu</button>
					</Link>
				</div>
			</div>
		);
	}
}

export default connect(null)(ArticleNewSucess);