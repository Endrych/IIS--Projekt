import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchGame } from '../../actions';

class GameShow extends Component{
	componentDidMount(){
		this.props.fetchGame(this.props.keyname);
	}


	gameDom = (info) => {
		// const video = (`https://${info.Video}`)
		return(
			<div>
				<h2>{info.Name}</h2>
				{info.ReleaseDate ? <div> {info.ReleaseDate}</div> : ""}
				{info.PublisherId ? <div> {info.PublisherId}</div> : ""}
				{info.Genre ? <div> {info.Genre.toString()}</div> : ""}
				<div>Image here</div>
				{info.Description ? <div> {info.Description}</div> : ""}
				{info.Video ? <div><iframe width="560" height="315" src={info.Video} frameBorder="0"  allowFullScreen></iframe></div> : ""}
				<Link to="/games"><button className="btn btn-primary">Zpět</button></Link>
			</div>
		)
	}
	render(){
		const { gameInfo } = this.props;
		console.log(this.props.gameInfo);
		let toRender;
		console.log(gameInfo)
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
			<div>
				{toRender}
			</div>
		)
	}
}

function mapStateToProps({ gameInfo }){
	return { gameInfo };
}

export default connect(mapStateToProps, { fetchGame })(GameShow)