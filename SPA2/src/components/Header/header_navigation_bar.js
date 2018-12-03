import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class HeaderNavigationBar extends Component {
	render() {

		const styleCol = {height: "50px", display: "flex", justifyContent: "center", alignItems: "center", color: "white", padding: "0px"}
		// const
		const borderColor = {borderLeft: "1px solid white", borderRight: "1px solid white"}
		return (
			<div className="col col-sm-12" style={{marginTop: "25px"}}>
				<div className="row">
					<div style={{padding: "0px"}} className="col col-sm-4 bg-danger">
						<Link style={{textDecoration:"none"}} to="/articles">
							<div  className="header__nav-bar--item" style={styleCol}>Články</div>
						</Link>
					</div>
					<div style={{padding: "0px"}} className="col col-sm-4 bg-danger">
						<Link style={{textDecoration:"none"}} to="/games">
							<div className="header__nav-bar--item"  style={{...styleCol, ...borderColor}}>Hry</div>
						</Link>
					</div>
					<div style={{padding: "0px"}} className="col col-sm-4 bg-danger">
						<Link style={{textDecoration:"none"}} to="/tournaments">
							<div className="header__nav-bar--item"  style={styleCol}>Turnaje</div>
						</Link>
					</div>
				</div>
			</div>
		);
	}
}

export default connect(null)(HeaderNavigationBar);
