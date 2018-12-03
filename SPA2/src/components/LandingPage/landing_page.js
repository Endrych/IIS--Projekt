import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchNewArticles } from '../../actions';
import { Link } from 'react-router-dom';

class LandingPage extends Component{
	componentDidMount(){
		this.props.fetchNewArticles();
	}


	getCzechDate = date => {
		const options = { year: "numeric", month: "long", day: "numeric" };

		return new Date(date).toLocaleDateString("cs-CS", options);
	};

	articleItem = (img, header, content, id, created, author) => {
		return (
			<div
				className="row row__box"
				style={{ marginRight: "20px", marginLeft: "20px", borderRadius: ".25rem" }}
				key={id}
			>
				<div className="col col-12">
					<div className="form-group">
						<Link to={`articles/${id}`}>
							<h3>{header}</h3>
						</Link>
						<div>
							Autor: <Link to={`/players/${author}`}>{author}</Link>
						</div>
						<div>Datum vydání: {this.getCzechDate(created)} </div>
					</div>
				</div>
			</div>
		);
	};

	generateArticleItems = items => {
		let arrayOfArticleItems = [];
		for (let i = 0; i < items.length; i++) {
			arrayOfArticleItems.push(
				this.articleItem("", items[i].Header, items[i].Content, items[i].Id, items[i].Created, items[i].Author)
			);
			// console.log(items[i])
		}
		return arrayOfArticleItems;
	};

	render(){
		return(
			<div className="row row__box">
				<div className="col col-sm-12">
					<h3>Žhavé novinky ze světa gamingu</h3>
				</div>
				<div className="col col-sm-12">
					{this.props.articlesNew.fetched ? this.generateArticleItems(this.props.articlesNew.articles)  : "Hledám nejnovější články, prosím počkejte."}
				</div>
			</div>
		)
	}
}


function mapStateToProps({articlesNew}){
	return {articlesNew}
}

export default connect(mapStateToProps, { fetchNewArticles })(LandingPage);