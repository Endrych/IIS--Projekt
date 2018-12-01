import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
class SearchResult extends Component {
	render() {
		let toRender;
		console.log(this.props.searchResults);
		const { searchResults } = this.props;

		if (searchResults.fetched) {
			if (!searchResults.fetchSucess) {
				toRender = <div>Vyhledavání selhalo</div>;
			}
		} else {
			toRender = <div>Probíhá vyhledávání</div>;
		}

		return (
			<div>
				<h2>Výsledky vyhledávání</h2>
				{searchResults.fetchSucess ? "" : toRender}
				{searchResults.fetchSucess ? (
					searchResults.Users.length > 0 ? (
						<div>
							<h4>Hrači:</h4>
							{searchResults.Users.map(user => (
								<div key={user.Nickname}>
									<Link to={`/players/${user.Nickname}`}>{user.Nickname}</Link>
								</div>
							))}
						</div>
					) : (
						""
					)
				) : (
					""
				)}
				{searchResults.fetchSucess ? (
					searchResults.Tournaments.length > 0 ? (
						<div>
							<h4>Turnaje:</h4>
							{searchResults.Tournaments.map(tournament => (
								<div key={tournament.Id}>
									<Link to={`/tournament/${tournament.Id}`}>{tournament.Name}</Link>
								</div>
							))}
						</div>
					) : (
						""
					)
				) : (
					""
				)}
				{searchResults.fetchSucess ? (
					searchResults.Teams.length > 0 ? (
						<div>
							<h4>Týmy:</h4>
							{searchResults.Teams.map(team => (
								<div key={team.Id}>
									<Link to={`/team/${team.Id}`}>{team.Name}</Link>
								</div>
							))}
						</div>
					) : (
						""
					)
				) : (
					""
				)}
				{searchResults.fetchSucess ? (
					searchResults.Games.length > 0 ? (
						<div>
							<h4>Hry:</h4>
							{searchResults.Games.map(game => (
								<div key={game.Keyname}>
									<Link to={`/games/${game.Keyname}`}>{game.Name}</Link>
								</div>
							))}
						</div>
					) : (
						""
					)
				) : (
					""
				)}
				{searchResults.fetchSucess ? (
					searchResults.Articles.length > 0 ? (
						<div>
							<h4>Články:</h4>
							{searchResults.Articles.map(article => (
								<div key={article.Id}>
									<Link to={`/articles/${article.Id}`}>{article.Header}</Link>
								</div>
							))}
						</div>
					) : (
						""
					)
				) : (
					""
				)}
			</div>
		);
	}
}

function mapStateToProps({ searchResults }) {
	return { searchResults };
}

export default connect(mapStateToProps)(SearchResult);
