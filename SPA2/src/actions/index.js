import axios from "axios";

export const REGISTER_USER_SUCCESS = "REGISTER_USER_SUCCESS";
export const REGISTER_USER_FAILED = "REGISTER_USER_FAILED";

const baseUrl = `http://localhost:5050`;

export function registerUser(values, callback) {
	console.log(values);
	const axiosInstance = axios.create({ baseURL: baseUrl });
	console.log(baseUrl);
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
