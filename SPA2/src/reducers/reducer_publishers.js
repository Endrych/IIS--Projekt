import { GET_PUBLISHERS_SUCESS } from './../actions';

export default function(state = {publishersArray: []}, action){
	switch(action.type){
		case GET_PUBLISHERS_SUCESS:
			console.log(action.payload);
			const newState ={ publishersArray: action.payload.data || []};
			console.log(newState, ">>ASD<AS<D")
			return newState;
		default:
			return state;
	}
}