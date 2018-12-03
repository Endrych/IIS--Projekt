import {PLAYER_FETCH_SUCESS, PLAYER_FETCH_FAILED, RESET_PLAYER_FETCH } from "../actions";


export default function(state = {fetched: false, fetchSucess: false}, action){
	switch(action.type){
		case PLAYER_FETCH_SUCESS:
			const { data } = action.payload;
			const playerDataState = {
				nickname: data.Nickname,
				firstname: data.Firstname,
				lastname: data.Lastname,
				team: data.Team,
				tournaments: data.Tournaments || [],
				fetchSucess: true,
				fetched: true,
				status:action.payload.status
			}

			return playerDataState;
		case PLAYER_FETCH_FAILED:
			return {
				fetchSucess: false,
				fetched: true
			}
		case RESET_PLAYER_FETCH:
			return {...state, fetch: false}
		default:
			return state;
	}
}