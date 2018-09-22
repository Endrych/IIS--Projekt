import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import { NavLink } from "react-router-dom";

import LoL from "../../data/favoriteGames/lol.jpg";
import Overwatch from "../../data/favoriteGames/overwatch.jpg";
import Csgo from "../../data/favoriteGames/csgo.jpg";
import Dota2 from "../../data/favoriteGames/dota2.jpg";
import Pubg from "../../data/favoriteGames/pubg.jpg";
import HearthStone from "../../data/favoriteGames/hs.jpg";
import Fortnite from "../../data/favoriteGames/fortnite.jpg";

import "../../styles/LandingPage/favoriteGames.css";

class FavoriteGames extends Component {
	render() {
		return (

			<Col xs="12" sm="12">
				<div style={{ display: "flex" }}>
					<div className="favorite__col-1 ">
						<NavLink to="/games/leagueoflegends">
							<img alt="LoL" src={LoL} className="default-user favorite__picture--type-1"  style={{backgroundColor:"red" }}/>
						</NavLink>
					</div>
					<div className="favorite__col-2">
						<div className="favorite__col--item">
							<NavLink to="/games/overwatch">
								<img alt="Overwatch" src={Overwatch} className="favorite__picture--type-2 default-user" />
							</NavLink>
						</div>
						<div className="favorite__col--item favorite__col--item-midle">
							<NavLink to="/games/csgo">
								<img
									alt="CS:GO"
									src={Csgo}
									className="favorite__picture--type-2 favorite__picture--middle default-user"
								/>
							</NavLink>
						</div>
						<div className="favorite__col--item">
							<NavLink to="/games/dota2">
								<img alt="Dota2" src={Dota2} className="favorite__picture--type-2 default-user" />
							</NavLink>
						</div>
					</div>
					<div className="favorite__col-3">
						<div className="favorite__col--item">
							<NavLink to="/games/pubg">
								<img alt="PUBG" src={Pubg} className="favorite__picture--type-2 default-user" />
							</NavLink>
						</div>
						<div className="favorite__col--item favorite__col--item-midle">
							<NavLink to="/games/hearthstone">
								<img
									alt="HearthStone"
									src={HearthStone}
									className="favorite__picture--type-2 favorite__picture--middle default-user"
								/>
							</NavLink>
						</div>
						<div className="favorite__col--item">
							<NavLink to="/games/fortnite">
								<img alt="Fortnite" src={Fortnite} className="favorite__picture--type-2 default-user" />
							</NavLink>
						</div>
					</div>
				</div>
			</Col>
		);
	}
}

export default FavoriteGames;
