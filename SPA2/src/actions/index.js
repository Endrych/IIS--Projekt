import axios from "axios";
import Cookies from 'universal-cookie';

export const REGISTER_USER_SUCCESS = "REGISTER_USER_SUCCESS";
export const REGISTER_USER_FAILED = "REGISTER_USER_FAILED";
export const LOGIN_SUCESS = "LOGIN_SUCESS";
export const LOGIN_FAILED = "LOGIN_FAILED";

const baseUrl = `http://localhost:5050`;

export function registerUser(values, callback) {

	const axiosInstance = axios.create({ baseURL: baseUrl });
	const request = axiosInstance.post("/register", values);
	// callback();
	return(dispatch) => {
		request.then((res) => {
			dispatch({type: REGISTER_USER_SUCCESS, payload: res});
			setTimeout(() => {
				callback();
			}, 0);
		}).catch((err) => {
			dispatch({type: REGISTER_USER_FAILED, payload:err});
		})
	}
}

export function loginUser(values){

	const axiosInstance = axios.create({ baseURL: baseUrl });
	const request = axiosInstance.post("/login", values);

	console.log(values);

	return(dispatch) => {
		request.then((res) => {
			dispatch({type: LOGIN_SUCESS, payload: res});
			setTimeout(() => {
					const cookies = new Cookies();
					console.log(res.data)
				cookies.set("user", res.data.Token, {path: '/'});
				// console.log(, "sd45")
			}, 0);
		}).catch((err) => {
			dispatch({type: LOGIN_FAILED, payload:err});
		})
	}
}

export function setTokenCookies(token){

}

export function getUserInfoFromToken(token){
	const axiosInstance = axios.create({ baseURL: baseUrl,  headers: {'x-access-token': token} });

	const request = axiosInstance.get("/user");

	return(dispatch) => {
		request.then((res) => {
			dispatch({type: GET_DATA_TOKEN, payload: res});
			setTimeout(() => {
				console.log(res.data)
			// console.log(, "sd45")
		}, 0);
		})
	}

}