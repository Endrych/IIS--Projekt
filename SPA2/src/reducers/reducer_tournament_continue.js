import {TOURNAMENT_CONTINUE_FAILED, TOURNAMENT_CONTINUE_SUCESS, TOURNAMENT_CONTINUE_RESET } from './../actions';

export default function(state = {try: false}, action){
	switch(action.type){
		case TOURNAMENT_CONTINUE_SUCESS:

			return {try: true, canContinue: true};
		case TOURNAMENT_CONTINUE_FAILED:

			return {try: true, canContinue: false};
		case  TOURNAMENT_CONTINUE_RESET:
			return {try: false}
	}
}