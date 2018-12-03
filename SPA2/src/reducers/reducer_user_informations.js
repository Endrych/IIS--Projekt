import { GET_DATA_TOKEN} from "../actions";

export default function(state = { acquired: false }, action) {
	switch (action.type) {
		case GET_DATA_TOKEN:
			const { data } = action.payload;
			const newState = {
				admin: data.Admin,
				nickname: data.Nickname,
				firstname: data.Firstname,
				lastname: data.Lastname,
				email: data.Email,
				phone: data.Phone,
				team: data.Team,
				tournaments: data.Tournaments,
				acquired: true
			};
			return newState;
		default:
			return state;
	}
}
