import {LOGIN_SUCESS, LOGIN_FAILED} from "../actions";

export default function(state = {statusCode: ""}, action){
	switch(action.type){
		case LOGIN_SUCESS:
			// action.callback();
			console.log(action)
			return {statusCode: 200};
		case LOGIN_FAILED:
			console.log(action)
			const newState = {statusCode: action.payload.response.status };
			return newState;
		default:
			return state;
	}
}