import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchGame } from '../../actions';

class GameShow extends Component{
	componentDidMount(){
		this.props.fetchGame(this.props.keyname);
	}

	getCzechDate = (date) =>{
		const options = { year: "numeric", month: "long", day: "numeric" };

		return (new Date(date).toLocaleDateString("cs-CS", options))
	}

	gameDom = (info) => {
		// const video = (`https://${info.Video}`)
		return(
			<div>
				<h2>Hra {info.Name}</h2>
				{info.ReleaseDate ? <div> Datum vydaní: {this.getCzechDate(info.ReleaseDate)}</div> : ""}
				{info.PublisherId ? <div> Vydavatel: {info.PublisherId}</div> : ""}
				{info.Genres.length >  0 ? <div> Žánr: {info.Genres[0].Name.toString()}</div> : ""}
				{info.Description ? <br/> : ""}
				{info.Description ? <div> Popis: {info.Description}</div> : ""}
				{info.Video ? <br/> : ""}
				{info.Video ? <div><div>Video:</div><div><iframe width="560" height="315" src={info.Video} frameBorder="0"  allowFullScreen></iframe></div></div> : ""}
				<Link to="/games"><button className="btn btn-primary">Zpět</button></Link>
			</div>
		)
	}
	render(){
		const { gameInfo } = this.props;
		let toRender;

		if(gameInfo.fetched){
			if(gameInfo.fetchSucess){
				toRender = this.gameDom(gameInfo);
			}else{
				toRender = <div>Hra nenalezena</div>
			}
		}else{
			toRender = <div>Fetching game</div>
		}
		return(
			<div className="row row__box">
				<div className="col col-sm-12">
				{toRender}
				</div>
			</div>
		)
	}
}

function mapStateToProps({ gameInfo }){
	return { gameInfo };
}

export default connect(mapStateToProps, { fetchGame })(GameShow)