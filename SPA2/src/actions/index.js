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
				console.log(cookies.get("user"), "sd45")
			}, 0);
		}).catch((err) => {
			dispatch({type: LOGIN_FAILED, payload:err});
		})
	}

}