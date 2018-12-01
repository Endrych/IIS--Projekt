import { INVITE_SEND_SUCESS, INVITE_SEND_FAILED, RESET_INVITE_REDUCER_VALUES} from '../actions';

export default function (state = {send:false, sendSucess: false}, action){
	switch(action.type){
		case INVITE_SEND_SUCESS:
			const newState = {send: true, sendSucess: true};
			return newState
		case INVITE_SEND_FAILED:
			const failedState = {send: true, sendSucess: false};
			return failedState;
		case RESET_INVITE_REDUCER_VALUES:
			const resetState = {send:false, sendSucess:false};
			return resetState;
		default:
			return state;
	}
}