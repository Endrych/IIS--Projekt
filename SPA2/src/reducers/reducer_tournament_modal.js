import { TOURNAMENT_MODAL_SET_DATA, TOURNAMENT_MODAL_UNSET_DATA} from '../actions';

export default function(state = {valueSet: false}, action){
	switch(action.type){
		case TOURNAMENT_MODAL_SET_DATA:
			return {valueSet: true, id: action.payload};
		case TOURNAMENT_MODAL_UNSET_DATA:

			return {valueSet: false};
		default:
			return state;
	}
}