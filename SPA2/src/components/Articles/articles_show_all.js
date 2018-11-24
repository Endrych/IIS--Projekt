import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAllArticles } from "../../actions";
import { Link } from "react-router-dom";

class ArticlesShowAll extends Component{

	componentDidMount(){
		this.props.fetchAllArticles();
	}

	articleItem = (img, header, content, id, created, author) => {
		return (
			<div className="row" key={id}>
				<div className="col col-4">
					<div>Image Here</div>
				</div>
				<div className="col col-8">
					<div className="form-group">
						<Link to={`articles/${id}`}><h3>{header}</h3></Link>
						<div>{created}	</div>
						<div>By:{author}</div>
						<div>{content}</div>
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
			<div className="row">
				<div className="col col-12">
					{items}
				</div>
				Ahojda
			</div>
		)
	}
}

function mapStateToProps({articlesAll}){
	return {articlesAll};
}

export default connect(mapStateToProps, {fetchAllArticles})(ArticlesShowAll)
