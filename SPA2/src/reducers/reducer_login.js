import { LOGIN_SUCESS, LOGIN_FAILED, GET_DATA_TOKEN, LOG_OUT, LOGGED_IN } from "../actions";

export default function(state = { nickname: "", admin: "", token: "", loggedIn: false, statusCode: "" }, action) {
	switch (action.type) {
		case LOGIN_SUCESS:
			// action.callback();
			const data = action.payload.data;
			const newState = { nickname: data.Nickname, admin: data.Admin, token: data.Token, loggedIn: true };
			// console.log(newState);

			return newState;
		case LOGIN_FAILED:
			// console.log(action)
			// console.log(action.payload.response.status)
			// const newState = {statusCode: action.payload.response.status };
			let newFailedState = { ...state };
			newFailedState.statusCode = action.payload.response.status;
			// newState.statusCode = action.payload.response.status;
			// const newState = {...state, statusCode: action.payload.response.status};
			return newFailedState;
		case LOGGED_IN:
		// 	// action.callback();

		// 	console.log(action, "MOVED 234");
			const { payload } = action;
			const newStateGet = { admin: payload.data.Admin, nickname: payload.data.Nickname, loggedIn: true };

			return newStateGet;
		case LOG_OUT:
			const newStateLogOut = { nickname: "", admin: "", token: "", loggedIn: false, statusCode: "" };
			return newStateLogOut;
		default:
			return state;
	}
}
