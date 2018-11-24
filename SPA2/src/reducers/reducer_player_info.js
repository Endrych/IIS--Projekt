import {PLAYER_FETCH_SUCESS, PLAYER_FETCH_FAILED } from "../actions";


export default function(state = {fetched: false, fetchSucess: false}, action){
	switch(action.type){
		case PLAYER_FETCH_SUCESS:
			const { data } = action.payload;
			const playerDataState = {
				nickname: data[0].Nickname,
				firstname: data[0].Firstname,
				lastname: data[0].Lastname,
				team: data[0].Team,
				fetchSucess: true,
				fetched: true
			}

			return playerDataState;
		case PLAYER_FETCH_FAILED:
			return {
				fetchSucess: false,
				fetched: true
			}
		default:
			return state;
	}
}