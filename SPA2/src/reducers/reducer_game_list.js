import { GAME_ALL_FETCH_SUCESS, GAME_ALL_FETCH_FAILED } from '../actions';

export default function(state = {fetched: false, fetchSucess:false}, action){
	switch(action.type){
		case GAME_ALL_FETCH_SUCESS:
			console.log(action.payload);
			const newState = {...action.payload, fetched:true, fetchSucess: true}
			return newState;
		case GAME_ALL_FETCH_FAILED:
			const newStateFail = {fetched:true, fetchSucess: false}

			console.log(action.payload);
			return newStateFail;
		default:
			return state;
	}
}