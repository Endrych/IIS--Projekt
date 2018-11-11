import {REGISTER_USER_SUCCESS, REGISTER_USER_FAILED} from "../actions";

export default function(state = {statusCode: ""}, action){
	switch(action.type){
		case REGISTER_USER_SUCCESS:
			// action.callback();
			return {statusCode: 200};
		case REGISTER_USER_FAILED:
			const newState = {statusCode: action.payload.response.status };
			return newState;
		default:
			return state;
	}
}