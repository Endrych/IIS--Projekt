import { GAME_ALL_FETCH_SUCESS, GAME_ALL_FETCH_FAILED } from '../actions';

export default function(state = {fetched: false, fetchSucess:false, data: []}, action){
	switch(action.type){
		case GAME_ALL_FETCH_SUCESS:
			const newState = {...action.payload, fetched:true, fetchSucess: true}
			return newState;
		case GAME_ALL_FETCH_FAILED:
			const newStateFail = {fetched:true, fetchSucess: false,data: []}

			return newStateFail;
		default:
			return state;
	}
}