import {PLAYER_FETCH_SUCESS, PLAYER_FETCH_FAILED } from "../actions";


export default function(state = {fetched: false, fetchSucess: false}, action){
	switch(action.type){
		case PLAYER_FETCH_SUCESS:
			const { data } = action.payload;
			console.log(data, "DATA")
			const playerDataState = {
				nickname: data.Nickname,
				firstname: data.Firstname,
				lastname: data.Lastname,
				team: data.Team,
				tournaments: data.Tournaments,
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