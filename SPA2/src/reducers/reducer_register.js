import {REGISTER_USER} from "../actions";

export default function(state = {}, action){
	switch(action.type){
		case REGISTER_USER:
			console.log("REDUCER HERE", action, state);
			return state;
		default:
			return state;
	}
}