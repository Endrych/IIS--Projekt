import {REGISTER_USER_SUCCESS, REGISTER_USER_FAILED} from "../actions";

export default function(state = {}, action){
	switch(action.type){
		case REGISTER_USER_SUCCESS:
		console.log("HERE", action)
			return state;
		case REGISTER_USER_FAILED:
			console.log("REDUCER HERE", action, state);

			return state;
		default:
			return state;
	}
}