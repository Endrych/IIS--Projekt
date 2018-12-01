import { SEARCH_RESULT_SUCESS, SEARCH_RESULT_FAILED } from './../actions';

export default function(state = {fetched: false}, action){
	switch(action.type){
		case SEARCH_RESULT_SUCESS:
			const newState = {...action.payload.data, fetched: true, fetchSucess: true};
			return newState;
		case SEARCH_RESULT_FAILED:
			const failState = {fetched: true, fetchSucess: false};

			return failState;
		default:
			return state;
	}
}