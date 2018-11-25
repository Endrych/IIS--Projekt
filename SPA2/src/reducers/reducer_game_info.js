import { GAME_FETCH_SUCESS, GAME_FETCH_FAILED} from './../actions';


export default function(state = {fetched:false, fetchSucess: false}, action){
	switch(action.type){
		case GAME_FETCH_SUCESS:
			console.log(action.payload);
			const newState = {...action.payload.data, fetched:true, fetchSucess: true}
			return newState;
		case GAME_FETCH_FAILED:
		const failedState = {fetched:true, fetchSucess: false}
			return failedState;
		default:
			return state;
	}
}