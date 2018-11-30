import { TEAM_GET_INFO_SUCESS, TEAM_GET_INFO_FAILED } from "../actions";

export default function(state = { fetched: false, fetchSucess: false}, action){
	switch(action.type){
		case TEAM_GET_INFO_SUCESS:
			if(action.payload.status === 200){
				const newState = {...action.payload.data, fetched:true, fetchSucess:true};

				return newState;
			}else{
				const failStateNoContent = {  fetchSucess: false, fetched: true};
				return failStateNoContent;
			}

		case TEAM_GET_INFO_FAILED:
			const failState = {  fetchSucess: false, fetched: true};
			return failState;
		default:
			return state;
	}
}