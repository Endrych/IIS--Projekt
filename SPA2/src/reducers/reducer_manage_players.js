import {RESET_ACCOUNT_MANAGMENT, DEACTIVATE_ACCOUNT_FAILED, DEACTIVATE_ACCOUNT_SUCESS, GRANT_RIGHTS_SUCESS, GRANT_RIGHTS_FAILED, REMOVE_RIGHTS_SUCESS, REMOVE_RIGHTS_FAILED} from './../actions';

export default function(state = {try: false}, action){
	switch(action.type){
		case GRANT_RIGHTS_SUCESS:
			return {try: true, type: "GRANT_SUCESS"};
		case  GRANT_RIGHTS_FAILED:
			return {try: true, type: "GRANT_FAILED"};
		case REMOVE_RIGHTS_SUCESS:
			return {try: true, type: "REMOVE_SUCESS"};
		case REMOVE_RIGHTS_FAILED:
			return {try: true, type: "REMOVE_FAILED"};
		case DEACTIVATE_ACCOUNT_SUCESS:
			return {try: true, type: "DEACTIVATE_SUCESS"};
		case DEACTIVATE_ACCOUNT_FAILED:
			return {try: true, type: "DEACTIVATE_FAILED"};
		case RESET_ACCOUNT_MANAGMENT:
			return {try: false};
		default:
			return state;
	}
}