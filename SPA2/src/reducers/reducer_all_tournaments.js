import { TOURNAMENTS_FETCH_ALL_SUCESS, TOURNAMENTS_FETCH_ALL_FAILED} from './../actions';

export default function(state = {fetched: false, fetchSucess: false}, action){
	switch(action.type){
		case TOURNAMENTS_FETCH_ALL_SUCESS:
			console.log(action.payload)
			const newState = {tournaments: action.payload.data, fetched: true, fetchSucess:true};
			return newState;
		case TOURNAMENTS_FETCH_ALL_FAILED:
			const failState = { fetched: true, fetchSucess:false};
			return failState;
		default:
			return state;
	}
}