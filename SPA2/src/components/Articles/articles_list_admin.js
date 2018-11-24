import React, { Component } from 'react';
import { connect } from "react-redux";
import { fetchAllArticles } from "../../actions";
import { Link } from "react-router-dom";
import { Redirect } from 'react-router';
import { removeArticle } from "../../actions";
import Cookies from "universal-cookie";
import ReactDOM from 'react-dom';

class ArticlesListAdmin extends Component{
	componentDidMount(){
		this.props.fetchAllArticles();
	}

	articleListItem = (header, id,  author, created ) => {
		//pak se to prestyluje idealne nasekat na divy
		return(
			<div id={`article_${id}`} key={id}>
				<div>{header} | {author} | {created}   <Link to={`/admin/articles/edit/${id}`}>Edit</Link><button onClick={()=>{this.deleteArticle(id)}}>Smazat</button></div>
			</div>
		)
	}

	deleteArticle = (id) => {
		var cookies = new Cookies();

		var token = cookies.get("user");
		// console.log(ReactDOM.unmountComponentAtNode(document.getElementById(`article_${id}`)))
		this.props.removeArticle(id, token);
	}

	generateArticleList = (items) => {
		let arrayOfItems = [];
		arrayOfItems = items.map((item) => this.articleListItem(item.Header, item.Id, item.Author, item.Created));
		return arrayOfItems;
	}

	render(){
		if(this.props.loginStatus.admin > 0){
			const articleList = this.generateArticleList(this.props.articlesAll);
			return(
				<div>
					<Link to="/article/new"><button className="btn btn-primary">Přidat článek</button></Link>
					<div>
						{articleList}
					</div>
				</div>
			)
		}else{
			return <Redirect to="/"/>;
		}

	}
}

function mapStateToProps({articlesAll, loginStatus}){
	return {articlesAll, loginStatus};
}

export default connect(mapStateToProps, { fetchAllArticles, removeArticle})(ArticlesListAdmin);