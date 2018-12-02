import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchGameList, deleteGame } from "../../actions";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";

class GameAdminList extends Component {
	componentDidMount() {
		this.props.fetchGameList();
	}

	generateListItem = gameInfo => {
		return (
			<div key={gameInfo.Keyname} className="row" style={{marginBottom: "5px"}} >
				<div className="col col-sm-4">
					<Link to={`/games/${gameInfo.Keyname}`}>{gameInfo.Name}</Link>
				</div>
				<div className="col col-sm-8">
					<Link to={`/admin/game/edit/${gameInfo.Keyname}`}><button  style={{lineHeight: "1", marginRight: "5px"}} className="btn btn-info">Upravit</button></Link>
					<button style={{lineHeight: "1"}} className="btn btn-danger" onClick={this.deleteOnClick.bind(this, gameInfo.Keyname)}>Smazat</button>
				</div>
			</div>
		);
	};

	deleteOnClick = keyname => {
		const cookie = new Cookies();
		const token = cookie.get("user");
		this.props.deleteGame(keyname, token); //zajitit reloady, to bude v pohode az to vyvedu mimi delte bude na vlastni strance muset se potvrdit
	};

	createList = () => {
		const { data } = this.props.gameList;
		let arrayOfGames = [];
		for (let i = 0; i < data.length; i++) {
			arrayOfGames.push(this.generateListItem(data[i]));
		}
		return arrayOfGames;
	};

	render() {
		let toRender;
		if (this.props.gameList.fetched) {
			toRender = this.createList();
		} else {
			toRender = <div>Fetchind list of games</div>;
		}
		return (
			<div className="row row__box">
				<div className="col col-sm-12">
					<Link to="/admin/game/new">
						<button className="btn btn-info">Přidat hru</button>
					</Link>
				</div>
				<div className="col col-sm-12">
					{toRender.length > 0 ? (
						<div className="col col-sm-12">
							<h4>Hry</h4>
						</div>
					) : (
						""
					)}
					{toRender}
				</div>
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
