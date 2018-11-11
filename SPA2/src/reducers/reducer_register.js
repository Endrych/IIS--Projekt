import {REGISTER_USER_SUCCESS, REGISTER_USER_FAILED} from "../actions";

export default function(state = {statusCode: ""}, action){
	switch(action.type){
		case REGISTER_USER_SUCCESS:
			// action.callback();
			return {statusCode: 200};
		case REGISTER_USER_FAILED:
			// console.log("REDUCER HERE", action.payload.response.status, action, state);
			const newState = {statusCode: action.payload.response.status };
			// console.log(newState)
			return newState;
		default:
			return state;
	}
}