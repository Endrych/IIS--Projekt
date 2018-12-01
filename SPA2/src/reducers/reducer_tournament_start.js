import { TOURNAMENT_START_RESET, TOURNAMENT_START_FAILED, TOURNAMENT_START_SUCESS } from './../actions';

export default function(state = {try:false, failed: false}, action){
	switch(action.type){
		case TOURNAMENT_START_SUCESS:
			const newState= {try:true, failed: true};
			return newState;
		case TOURNAMENT_START_FAILED:
			const failState= {try:true, failed: false};
			return failState;
		case TOURNAMENT_START_RESET:
			const resetState= {try:false, failed: false};
			return resetState;
		default:
			return state;
	}
}