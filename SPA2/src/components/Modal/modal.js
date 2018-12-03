import React, { Component } from "react";
import { connect } from "react-redux";
import { removeModal } from './../../actions';

class Modal extends Component {

	handleConfirm = () => {
		this.props.removeModal();
		this.props.callback();
	}

	handleReject = () => {
		this.props.removeModal()
	}

	render() {
		return (
			<div className="modal__wrapper">
				<div style={{width: "450px", height:"150px", display: "flex", alignItems:"center", justifyContent: "center"}} className="modal__inner">
					<div>
						<div style={{width: "100%",  display: "flex", alignItems:"center", justifyContent: "center", marginBottom:"15px"}}><h5>{this.props.displayText}</h5></div>
						<button onClick={this.handleConfirm.bind(this)} style={{width: "150px",height: "60px", marginRight: "25px"}} className="btn btn-primary">Potvrdit</button>
						<button onClick={this.handleReject.bind(this)} style={{width: "150px",height: "60px"}} className="btn btn-danger">Zrušit</button>
					</div>
				</div>
			</div>
		);
	}
}

function mapStateToProps({modal}) {
	return {modal};
}

export default connect(
	mapStateToProps,
	{removeModal}
)(Modal);
