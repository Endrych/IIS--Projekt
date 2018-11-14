import { GET_DATA_TOKEN, LOGIN_SUCESS } from "../actions";

export default function(state = { loggedIn: false }, action) {
	switch (action.type) {
		case GET_DATA_TOKEN:
			// action.callback();

			const { payload } = action;
			const newState = { admin: payload.data.Admin, nickname: payload.data.Nickname, loggedIn: true };

			return newState;

		default:
			return state;
	}
}
