import axios from "axios";
import Cookies from "universal-cookie";

export const REGISTER_USER_SUCCESS = "REGISTER_USER_SUCCESS";
export const REGISTER_USER_FAILED = "REGISTER_USER_FAILED";
export const LOGIN_SUCESS = "LOGIN_SUCESS";
export const LOGIN_FAILED = "LOGIN_FAILED";
export const GET_DATA_TOKEN = "GET_DATA_TOKEN";
export const LOG_OUT = "LOG_OUT";
export const LOGGED_IN = "LOGGED_IN";
export const ARTICLE_CREATION_SUCCESFULL = "ARTICLE_CREATION_SUCCESFULL";
export const ARTICLE_CRAETION_FAILED = "ARTICLE_CRAETION_FAILED";
export const ALL_ARTICLES_FETCH_SUCESS = "ALL_ARTICLES_FETCH_SUCESS";
export const ARTICLE_REMOV_SUCCES = "ARTICLE_REMOV_SUCCES";
export const ARTICLE_FETCH_SUCESS = "ARTICLE_FETCH_SUCESS";
export const ARTICLE_FETCH_FAILED = "ARTICLE_FETCH_FAILED";
export const ARTICLE_UDPATE_SUCESS = "ARTICLE_UDPATE_SUCESS";
export const ARTICLE_UDPATE_FAILED = "ARTICLE_UDPATE_FAILED"

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

export function updateUserInformations(values, token, callback){
	const axiosInstance = axios.create({ baseURL: baseUrl, headers: { "x-access-token": token }  });

	const request = axiosInstance.put("/user/edit", values);
	// request.then(
		return dispatch => {
			request
				.then(res => {
					dispatch({ type: "USERINGO", payload: res });
					setTimeout(() => {
						callback();
					}, 0);
				})
				.catch(err => {
					dispatch({ type: "USERERROR", payload: err });
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

export function postNewArticle(values, token, callback){
	const axiosInstance = axios.create({ baseURL: baseUrl, headers: { "x-access-token": token } });
	const request = axiosInstance.post("/article",values);

	return dispatch => {
		request
			.then(res => {
				dispatch({ type: ARTICLE_CREATION_SUCCESFULL, payload: res });
				setTimeout(() => {
					callback();
				}, 0);
			})
			.catch(err => {
				dispatch({ type: ARTICLE_CRAETION_FAILED, payload: err });
			});
	};


}

export function fetchAllArticles(){
	const axiosInstance = axios.create({baseURL: baseUrl});
	const request = axiosInstance.get("/articles")

	return dispatch => {
		request.then(res => {
			dispatch({ type: ALL_ARTICLES_FETCH_SUCESS, payload:res});
		})
	}
}


export function removeArticle(id, token){
	const axiosInstance = axios.create({baseURL: baseUrl , headers: { "x-access-token": token } });
	const request = axiosInstance.delete(`/article/${id}`)

	return dispatch => {
		request.then(res => {
			dispatch({ type: ARTICLE_REMOV_SUCCES, payload:res});
		})
	}
}

export function fetchArticle(id, callback =()=>{}){
	const axiosInstance = axios.create({baseURL: baseUrl});
	const request = axiosInstance.get(`/article/${id}`);


	// return{
	// 	type: ARTICLE_FETCH_SUCESS,
	// 	payload: request
	// }
	return dispatch => {
		request
			.then(res => {
				dispatch({ type: ARTICLE_FETCH_SUCESS, payload: res });
				setTimeout(() => {
					callback();
				}, 0);
			})
			.catch(err => {
				dispatch({ type: ARTICLE_FETCH_FAILED, payload: err });
			});
	};
}



export function updateArticle(id, data, token, callback){
	const axiosInstance = axios.create({baseURL: baseUrl, headers: { "x-access-token": token } });
	const request = axiosInstance.put(`/article/${id}`, data);

	return dispatch => {
		request.then(res => {
			dispatch({type: ARTICLE_UDPATE_SUCESS, payload: res});
			setTimeout(() => {
				// console.log()
				callback();
			}, 0);
		}).catch(err=>{

		})
	}

}
