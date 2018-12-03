import {RESET_ACCOUNT_MANAGMENT, DEACTIVATE_ACCOUNT_FAILED, DEACTIVATE_ACCOUNT_SUCESS, GRANT_RIGHTS_SUCESS, GRANT_RIGHTS_FAILED, REMOVE_RIGHTS_SUCESS, REMOVE_RIGHTS_FAILED } from '../actions';

export default function(state = {waiting: true}, action){
	switch(action.type){
		case GRANT_RIGHTS_SUCESS:
			const newState = {waiting: false, rightsGranted: true, status: action.payload.status};

			return newState;
		case GRANT_RIGHTS_FAILED:
			const failState = {waiting: false, rightsGranted: false, status: 403};
			return failState;
		case DEACTIVATE_ACCOUNT_SUCESS:
			const newState2 = {waiting: false, rightsGranted: true, status: action.payload.status};

			return newState2;
		case DEACTIVATE_ACCOUNT_FAILED:
			const failState2 = {waiting: false, rightsGranted: false, status: 403};
			return failState2;
		case REMOVE_RIGHTS_SUCESS:
			const newState3 = {waiting: false, rightsGranted: true, status: action.payload.status};

			return newState3;
		case REMOVE_RIGHTS_FAILED:
			const failState3 = {waiting: false, rightsGranted: false, status: 403};
			return failState3;
		case RESET_ACCOUNT_MANAGMENT:
			return {waiting: true};
		default:
			return state;
	}
}