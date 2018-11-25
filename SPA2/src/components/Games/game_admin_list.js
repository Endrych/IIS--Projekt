import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchGameList, deleteGame } from "../../actions";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import Cookies from 'universal-cookie';

class GameAdminList extends Component {
	componentDidMount() {
		this.props.fetchGameList();
	}

	generateListItem = gameInfo => {
		return (
			<div key={gameInfo.Keyname}>
				<div>
					Icon here   |
					{gameInfo.Name}   |
					<Link to={`/admin/game/edit/${gameInfo.Keyname}`}>Edit</Link>   |
					<button onClick={this.deleteOnClick.bind(this, gameInfo.Keyname)}>Smazat</button>
				</div>
			</div>
		);
	};

	deleteOnClick = (keyname) =>{
		const cookie = new Cookies;
		const token = cookie.get("user");
		this.props.deleteGame(keyname, token); //zajitit reloady, to bude v pohode az to vyvedu mimi delte bude na vlastni strance muset se potvrdit
	}

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

	render() {
		let toRender;
		if (this.props.gameList.fetched) {
			toRender = this.createList();
			console.log(toRender, "RENDER");
		} else {
			toRender = <div>Fetchind list of games</div>;
		}
	return (
		<div>
			<div>
				<Link to="/admin/game/new"><button className="btn btn-primary">Přidat hru</button></Link>
			</div>
			{toRender}
		</div>
		);
	}
}

function mapStateToProps({ gameList, loginStatus }) {
	return { gameList, loginStatus };
}

export default connect(
	mapStateToProps,
	{ fetchGameList, deleteGame }
)(GameAdminList);
