import React, {Component} from 'react';
import { connect } from 'react-redux';
import { fetchGameList } from '../../actions';
import { Link } from 'react-router-dom';

class GameList extends Component{
	componentDidMount(){
		this.props.fetchGameList();
	}


	generateListItem = gameInfo => {
		return (
			<div className="row" key={gameInfo.Keyname}>
				<div className="col col-sm-12">
					<h5><Link to={`/games/${gameInfo.Keyname}`}>{gameInfo.Name}</Link></h5>
				</div>
			</div>
		);
	};

	createList = () => {
		const { data } = this.props.gameList;
		let arrayOfGames = [];
		for (let i = 0; i < data.length; i++) {
			arrayOfGames.push(this.generateListItem(data[i]));
		}
		return arrayOfGames;
	};

	render(){
		let toRender;

		if(this.props.gameList.fetched){
			if(this.props.gameList.fetchSucess){
				toRender = this.createList();
			}else{
				toRender = <div>Načtení her selhalo. Prosím opakujte akci. </div>
			}
		}else{
			toRender= <div>Načítám seznam her</div>
		}

		return(
			<div className="row row__box">
				<div className="col col-sm-12">
					<h3> Seznam her </h3>
				</div>
				<div className="col col-sm-12">

					{toRender}
				</div>
			</div>
		)
	}
}

function mapStateToProps({gameList}){
	return {gameList}
}

export default connect(mapStateToProps, {fetchGameList})(GameList)