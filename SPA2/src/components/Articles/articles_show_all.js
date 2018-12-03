import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAllArticles } from "../../actions";
import { Link } from "react-router-dom";

class ArticlesShowAll extends Component{

	componentDidMount(){
		this.props.fetchAllArticles();
	}

	getCzechDate = (date) =>{
		const options = { year: "numeric", month: "long", day: "numeric" };

		return (new Date(date).toLocaleDateString("cs-CS", options))
	}

	articleItem = (img, header, content, id, created, author) => {
		return (
			<div className="row row__box" style={{marginRight: "20px", marginLeft: "20px", borderRadius: ".25rem" }} key={id} >
				<div className="col col-12">
					<div className="form-group">
						<Link to={`articles/${id}`}><h3>{header}</h3></Link>
						<div>Autor: <Link to={`/players/${author}`}>{author}</Link></div>
						<div>Datum vydání: {this.getCzechDate(created)}	</div>
					</div>
				</div>
			</div>
		)
	}


	generateArticleItems = (items) => {
		let arrayOfArticleItems = [];
		for(let i = 0; i < items.length; i++){
			arrayOfArticleItems.push(this.articleItem("", items[i].Header, items[i].Content, items[i].Id, items[i].Created, items[i].Author))
			// console.log(items[i])
		}
		return arrayOfArticleItems
	}

	render(){
		const items = this.generateArticleItems(this.props.articlesAll);
		return(
			<div className="row row__box">
				<div className="col col-12">
					{items}
				</div>
			</div>
		)
	}
}

function mapStateToProps({articlesAll}){
	return {articlesAll};
}

export default connect(mapStateToProps, {fetchAllArticles})(ArticlesShowAll)
