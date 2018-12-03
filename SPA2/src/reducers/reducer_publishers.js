import { GET_PUBLISHERS_SUCESS } from './../actions';

export default function(state = {publishersArray: []}, action){
	switch(action.type){
		case GET_PUBLISHERS_SUCESS:
			const newState ={ publishersArray: action.payload.data || []};
			return newState;
		default:
			return state;
	}
}