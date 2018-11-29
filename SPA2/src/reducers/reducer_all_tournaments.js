import { TOURNAMENTS_FETCH_ALL_SUCESS, TOURNAMENTS_FETCH_ALL_FAILED} from './../actions';

export default function(state = {fetched: false, fetchSucess: true}, action){
	switch(action.type){
		case TOURNAMENTS_FETCH_ALL_SUCESS:
			console.log(action.payload)
			return state;
		case TOURNAMENTS_FETCH_ALL_FAILED:
			return state;
		default:
			return state;
	}
}