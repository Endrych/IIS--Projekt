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
			<div key={gameInfo.Keyname}>
				<div>
					Icon here   |
					<Link to={`/games/${gameInfo.Keyname}`}>{gameInfo.Name}</Link>   |
				</div>
			</div>
		);
	};

	createList = () => {
		const { data } = this.props.gameList;
		let arrayOfGames = [];
		console.log;
		for (let i = 0; i < data.length; i++) {
			console.log(data, "LIST");
			arrayOfGames.push(this.generateListItem(data[i]));
		}
		console.log(arrayOfGames, data, "<======");
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
			<div>
				{toRender}
			</div>
		)
	}
}

function mapStateToProps({gameList}){
	return {gameList}
}

export default connect(mapStateToProps, {fetchGameList})(GameList)