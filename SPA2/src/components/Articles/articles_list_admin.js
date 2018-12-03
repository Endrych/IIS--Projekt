import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchAllArticles } from "../../actions";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import { removeArticle } from "../../actions";
import Cookies from "universal-cookie";
import ReactDOM from "react-dom";

class ArticlesListAdmin extends Component {
	componentDidMount() {
		this.props.fetchAllArticles();
	}

	getCzechDate = (date) =>{
		const options = { year: "numeric", month: "long", day: "numeric" };

		return (new Date(date).toLocaleDateString("cs-CS", options))
	}


	articleListItem = (header, id, author, created) => {
		//pak se to prestyluje idealne nasekat na divy
		return (
			<div className="row" id={`article_${id}`} key={id} style={{marginBottom: "5px", display: "flex", alignItems:"center"}}>
				<div className="col col-sm-3">
					<b><Link to={`/articles/${id}`}>{header}</Link></b>
				</div>
				<div className="col col-sm-3">
					<b>{author}</b>
				</div>
				<div className="col col-sm-3">
					<b> {this.getCzechDate(created)}</b>
				</div>

				<div className="col col-sm-3">
					<Link to={`/admin/articles/edit/${id}`}><button style={{lineHeight: "1", marginRight: "5px"}} className="btn btn-info">Edit</button></Link>
					<button className="btn btn-danger" style={{lineHeight: "1"}}
						onClick={() => {
							this.deleteArticle(id);
						}}
					>
						Smazat
					</button>
				</div>
			</div>
		);
	};

	deleteArticle = id => {
		var cookies = new Cookies();

		var token = cookies.get("user");
		// console.log(ReactDOM.unmountComponentAtNode(document.getElementById(`article_${id}`)))
		this.props.removeArticle(id, token);
	};

	generateArticleList = items => {
		let arrayOfItems = [];
		arrayOfItems = items.map(item => this.articleListItem(item.Header, item.Id, item.Author, item.Created));
		return arrayOfItems;
	};

	render() {
		if (this.props.loginStatus.admin > 0) {
			const articleList = this.generateArticleList(this.props.articlesAll);
			return (
				<div className="row row__box">
					<div className="col col-sm-12">
						<Link to="/article/new">
							<button className="btn btn-info">Přidat článek</button>
						</Link>
					</div>
					<div className="col col-sm-12">
						{articleList.length > 0 ? (
							<div className="row" style={{ marginTop: "10px" }}>
								<div className="col col-sm-12">
									<h3>Články</h3>
								</div>
							</div>
						) : (
							""
						)}
						{articleList.length > 0 ? (
							<div className="row">
								<div className="col col-sm-3">
									<h5>Název</h5>
								</div>
								<div className="col col-sm-3">
									<h5>Autor</h5>
								</div>
								<div className="col col-sm-3">
									<h5>Datum vydání</h5>
								</div>
								<div className="col col-sm-3" />
							</div>
						) : (
							""
						)}
						{articleList}
					</div>
				</div>
			);
		} else {
			return <Redirect to="/" />;
		}
	}
}

function mapStateToProps({ articlesAll, loginStatus }) {
	return { articlesAll, loginStatus };
}

export default connect(
	mapStateToProps,
	{ fetchAllArticles, removeArticle }
)(ArticlesListAdmin);
