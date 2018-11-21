import { GET_DATA_TOKEN, LOGIN_SUCESS } from "../actions";

export default function(state = { acquired: false }, action) {
	console.log(action)
	switch (action.type) {
		case GET_DATA_TOKEN:
			// action.callback();

			const { payload } = action;
			console.log(payload, "PAYLOAD")
			const newState = { admin: payload.data.Admin, nickname: payload.data.Nickname, firstname: payload.data.Firstname,
				 lastname: payload.data.Lastname, email: payload.data.Email, phone: payload.data.Phone, team: payload.data.Team ,acquired: true };
			return newState;

		default:
			return state;
	}
}
