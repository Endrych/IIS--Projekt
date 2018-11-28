import {INVITES_GET_ALL_SUCESS, INVITES_GET_ALL_FAILED, INVITES_ALL_SHOW, INVITES_ALL_HIDE} from './../actions';

export default function(state = {invites: [], show: false}, action){
	switch(action.type){
		case INVITES_GET_ALL_SUCESS:
			console.log(action.payload.data, "<<<<<>>>><<<???????");
			const newState = { ...state, invites: action.payload.data };
			return newState;
		case INVITES_GET_ALL_FAILED:
			return state;
		case INVITES_ALL_SHOW:
			const showState = { ...state, show:true};
			return showState;
		case INVITES_ALL_HIDE:
			const hideState = { ...state, show:false};
			return hideState;
		default:
			return state;
	}
}