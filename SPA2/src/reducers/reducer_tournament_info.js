import {TOURNAMENT_GET_DETAILS_SUCESS, TOURNAMENT_GET_DETAILS_FAILED} from '../actions';

export default function(state= {fetched: false, fetchSucess: false}, action){
	switch(action.type){
		case TOURNAMENT_GET_DETAILS_SUCESS:
			const newState = {  ...action.payload.data, fetched: true, fetchSucess: true}

			return newState;
		case TOURNAMENT_GET_DETAILS_FAILED:
			const failState = {fetched: true, fetchSucess: false}

			return failState;
		default:
			return state;
	}
}