import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchArticle } from "../../actions";
import { Link } from "react-router-dom";

class ArticleShow extends Component {
	componentDidMount() {
		this.props.fetchArticle(this.props.articleid);
	}



	getCzechDate = (date) =>{
		const options = { year: "numeric", month: "long", day: "numeric" };

		return (new Date(date).toLocaleDateString("cs-CS", options))
	}

	render() {
		const { articleInfo } = this.props;
		console.log(articleInfo);
		if (articleInfo.articleFetched) {
			return (
				<div className="row row__box">
					<div className="col col-sm-12">
						<h2>{articleInfo.Header}</h2>
						<div>Autor: <Link to={`/players/${articleInfo.Author}`}>{articleInfo.Author}</Link></div>
						<div>Datum vydání: {this.getCzechDate(articleInfo.Created)}</div>
						<div>
							{articleInfo.Game ? <span>Přiřazen ke hře: </span> : ""}
							{articleInfo.Game ? (
								<Link to={`/games/${articleInfo.Game.Keyname}`}>{articleInfo.Game.Name}</Link>
							) : (
								""
							)}
						</div>
						<div>{articleInfo.Content}</div>
						<button className="btn btn-primary" onClick={() => this.props.history.push("/articles")}>
							Zpět
						</button>
					</div>
				</div>
			);
		} else {
			return <div>Fetching article please wait.</div>;
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
