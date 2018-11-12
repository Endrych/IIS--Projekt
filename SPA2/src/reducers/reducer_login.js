import {LOGIN_SUCESS, LOGIN_FAILED} from "../actions";

export default function(state = {nickname: "", admin: "", token: "", loggedIn: false, statusCode: ""}, action){
	switch(action.type){
		case LOGIN_SUCESS:
			// action.callback();
			const data = action.payload.data;
			const newState = {nickname: data.Nickname, admin: data.Admin, token: data.Token, loggedIn: true};
			console.log(newState)

			return newState;
		case LOGIN_FAILED:
		// console.log(action)
			// console.log(action.payload.response.status)
			// const newState = {statusCode: action.payload.response.status };
			let newFailedState = {...state};
			newFailedState.statusCode = action.payload.response.status;
			// newState.statusCode = action.payload.response.status;
			// const newState = {...state, statusCode: action.payload.response.status};
			return newFailedState;
		default:
			return state;
	}
}