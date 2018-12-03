import { MODAL_INSERT,MODAL_REMOVE} from './../actions';

export default function(state = {show: false}, action){
	switch(action.type){
		case MODAL_INSERT:
			return {show: true, value: action.payload};
		case MODAL_REMOVE:
			return {show: false};
		default:
			return state;
	}
}