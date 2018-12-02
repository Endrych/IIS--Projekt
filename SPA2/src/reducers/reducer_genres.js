import { GET_GENRES_SUCESS, GET_GENRES_FAILED} from './../actions';

export default function(state = {genresArray: []}, action){
	switch(action.type){
		case GET_GENRES_SUCESS:
			console.log(action.payload);
			const newState ={ genresArray: action.payload.data || []};
			return newState;
		default:
			return state;
	}
}