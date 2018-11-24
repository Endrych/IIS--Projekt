import {ALL_ARTICLES_FETCH_SUCESS} from "../actions";

export default function(state = [], action){
	switch(action.type){
		case ALL_ARTICLES_FETCH_SUCESS:
			const newState = action.payload.data;
			return newState;
		default:
			return state;
	}

}