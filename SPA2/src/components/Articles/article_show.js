import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchArticle } from "../../actions";
import { Link } from "react-router-dom";

class ArticleShow extends Component {
	componentDidMount() {
		this.props.fetchArticle(this.props.articleid);
	}

	getCzechDate = date => {
		const options = { year: "numeric", month: "long", day: "numeric" };

		return new Date(date).toLocaleDateString("cs-CS", options);
	};

	render() {
		const { articleInfo } = this.props;

		if (articleInfo.articleFetched) {
			if (articleInfo.fetchSucess) {
				return (
					<div className="row row__box">
						<div className="col col-sm-12">
							<h2>{articleInfo.Header}</h2>
							<div>
								Autor: <Link to={`/players/${articleInfo.Author}`}>{articleInfo.Author}</Link>
							</div>
							<div>Datum vydání: {this.getCzechDate(articleInfo.Created)}</div>
							<div>
								{articleInfo.Game ? <span>Přiřazen ke hře: </span> : ""}
								{articleInfo.Game ? (
									<Link to={`/games/${articleInfo.Game.Keyname}`}>{articleInfo.Game.Name}</Link>
								) : (
									""
								)}
							</div>
							<br />
							<div>{articleInfo.Content}</div>
							<br />

							<button className="btn btn-primary" onClick={() => this.props.history.push("/articles")}>
								Zpět
							</button>
						</div>
					</div>
				);
			} else {
				return (
					<div className="row row__box">
						<div className="col col-sm-12">Článek nenalezen</div>
					</div>
				);
			}
		} else {
			return (
				<div className="row row__box">
					<div className="col col-sm-12">Vyhledávám článek. Prosím počkejte</div>
				</div>
			);
		}
	}
}

function mapSateToProps({ articleInfo }) {
	return { articleInfo };
}

export default connect(
	mapSateToProps,
	{ fetchArticle }
)(ArticleShow);
