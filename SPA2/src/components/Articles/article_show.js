import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchArticle  } from '../../actions';


class ArticleShow extends Component{
	componentDidMount(){
		console.log(this.props)
		this.props.fetchArticle(this.props.articleid);
	}


	render(){
		console.log("wooooosh", this.props);
		const { articleInfo } = this.props;
		if(articleInfo.articleFetched){
			return(
				<div>
					<h2>{articleInfo.Header}</h2>
					<div>{articleInfo.Author}</div>
					<div> {articleInfo.Created}</div>
					<div>Kategorie: {articleInfo.Game}</div>
					<div>Image here</div>
					<div>{articleInfo.Content}</div>
					<button className="btn btn-primary" onClick={()=>this.props.history.push("/articles")}>Zpět</button>
				</div>)
		}else{
			return(
				<div>
					Fetching article please wait.
				</div>
			)
		}
	}
}

function mapSateToProps({articleInfo}){
	return {articleInfo};
}

export default connect(mapSateToProps, {fetchArticle})(ArticleShow);