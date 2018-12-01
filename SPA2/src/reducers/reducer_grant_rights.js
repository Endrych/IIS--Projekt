import { GRANT_RIGHTS_SUCESS, GRANT_RIGHTS_FAILED } from '../actions';

export default function(state = {waiting: true}, action){
	switch(action.type){
		case GRANT_RIGHTS_SUCESS:
			const newState = {waiting: false, rightsGranted: true, status: action.payload.status};

			return newState;
		case GRANT_RIGHTS_FAILED:
			const failState = {waiting: false, rightsGranted: false, status: 403};
			return failState;
		default:
			return state;
	}
}