import axios from "axios";
import Cookies from "universal-cookie";

export const REGISTER_USER_SUCCESS = "REGISTER_USER_SUCCESS";
export const REGISTER_USER_FAILED = "REGISTER_USER_FAILED";
export const LOGIN_SUCESS = "LOGIN_SUCESS";
export const LOGIN_FAILED = "LOGIN_FAILED";
export const GET_DATA_TOKEN = "GET_DATA_TOKEN";
export const LOG_OUT = "LOG_OUT";
export const LOGGED_IN = "LOGGED_IN";

const baseUrl = `http://localhost:5050`;

export function registerUser(values, callback) {
	const axiosInstance = axios.create({ baseURL: baseUrl });
	const request = axiosInstance.post("/register", values);
	// callback();
	return dispatch => {
		request
			.then(res => {
				dispatch({ type: REGISTER_USER_SUCCESS, payload: res });
				setTimeout(() => {
					callback();
				}, 0);
			})
			.catch(err => {
				dispatch({ type: REGISTER_USER_FAILED, payload: err });
			});
	};
}

export function loginUser(values) {
	const axiosInstance = axios.create({ baseURL: baseUrl });
	const request = axiosInstance.post("/login", values);

	console.log(values);

	return dispatch => {
		request
			.then(res => {
				dispatch({ type: LOGIN_SUCESS, payload: res });
				setTimeout(() => {
					const cookies = new Cookies();

					cookies.set("user", res.data.Token, { path: "/", maxAge: 3600 });
					// console.log(, "sd45")
				}, 0);
			})
			.catch(err => {
				dispatch({ type: LOGIN_FAILED, payload: err });
			});
	};
}

export function setTokenCookies(token) {}

export function getLoggedInStatus(token){
	const axiosInstance = axios.create({ baseURL: baseUrl, headers: { "x-access-token": token } });

	const request = axiosInstance.get("/user");
	return {
		type: LOGGED_IN,
		payload: request
	};
}

export function getUserInfoFromToken(token) {
	const axiosInstance = axios.create({ baseURL: baseUrl, headers: { "x-access-token": token } });

	const request = axiosInstance.get("/user");
	console.log("user data: ", request);
	return {
		type: GET_DATA_TOKEN,
		payload: request
	};
}

export function logOut() {
	const cookies = new Cookies();
	cookies.remove("user");
	return {
		type: LOG_OUT,
		payload: {}
	};
}
