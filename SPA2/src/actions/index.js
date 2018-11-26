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
export const PLAYER_FETCH_SUCESS = "PLAYER_FETCH_SUCESS";
export const PLAYER_FETCH_FAILED = "PLAYER_FETCH_FAILED";
export const GAME_CREAT_SUCESS = "GAME_CREAT_SUCESS";
export const GAME_CREAT_FAILED = "GAME_CREAT_FAILED";
export const GAME_FETCH_SUCESS = "GAME_FETCH_SUCESS";
export const GAME_FETCH_FAILED = "GAME_FETCH_FAILED";
export const GAME_ALL_FETCH_SUCESS = "GAME_ALL_FETCH_SUCESS";
export const GAME_ALL_FETCH_FAILED = "GAME_ALL_FETCH_FAILED";
export const GAME_UPDATE_SUCESS = "GAME_UPDATE_SUCESS";
export const GAME_UPDATE_FAILED = "GAME_UPDATE_FAILED";
export const GAME_REMOVE_SUCESS = "GAME_REMOVE_SUCESS";
export const GAME_REMOVE_FAILED = "GAME_REMOVE_SUCESS";
export const GRANT_RIGHTS_SUCESS = "GRANT_RIGHTS_SUCESS";
export const GRANT_RIGHTS_FAILED = "GRANT_RIGHTS_FAILED";

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

export function fetchPlayer(nickname){
	const axiosInstance = axios.create({baseURL: baseUrl});
	const request = axiosInstance.get(`/user/${nickname}`);

	return dispatch => {
		request.then(res => {
			dispatch({type: PLAYER_FETCH_SUCESS, payload:res});
		}).catch(err=>{
			dispatch({type: PLAYER_FETCH_FAILED, payload:err});
		})
	}
}

export function createNewGame(values, token, callback){
	const axiosInstance = axios.create({ baseURL: baseUrl, headers: { "x-access-token": token } });
	const request = axiosInstance.post("/game",values);

	return dispatch => {
		request
			.then(res => {
				dispatch({ type: GAME_CREAT_SUCESS, payload: res });
				setTimeout(() => {
					callback();
				}, 0);
			})
			.catch(err => {
				dispatch({ type: GAME_CREAT_FAILED, payload: err });
			});
	};
}

export function fetchGame(keyname, callback = () => {}){
	const axiosInstance = axios.create({ baseURL: baseUrl });
	const request = axiosInstance.get(`/game/${keyname}`);

	return dispatch => {
		request
			.then(res => {
				dispatch({ type: GAME_FETCH_SUCESS, payload: res });
				setTimeout(() => {
					callback();
				}, 0);
			})
			.catch(err => {
				dispatch({ type: GAME_FETCH_FAILED, payload: err });
			});
	};
}

export function fetchGameList(){
	const axiosInstance = axios.create({ baseURL: baseUrl });
	const request = axiosInstance.get(`/games`);

	console.log(request)

	return dispatch => {
		request
			.then(res => {
				console.log(res)
				dispatch({ type: GAME_ALL_FETCH_SUCESS, payload: res });
			})
			.catch(err => {
				dispatch({ type: GAME_ALL_FETCH_FAILED, payload: err });
			});
	};
}

export function updateGame(keyname, values, token, callback = ()=>{}){
	const axiosInstance = axios.create({ baseURL: baseUrl, headers: { "x-access-token": token } });
	const request = axiosInstance.put(`/game/${keyname}`,values);

	return dispatch => {
		request
			.then(res => {
				dispatch({ type: GAME_UPDATE_SUCESS, payload: res });
				setTimeout(() => {
					callback();
				}, 0);
			})
			.catch(err => {
				dispatch({ type: GAME_UPDATE_FAILED, payload: err });
			});
	};
}

export function deleteGame(keyname, token, callback = ()=>{}){
	const axiosInstance = axios.create({ baseURL: baseUrl, headers: { "x-access-token": token } });
	const request = axiosInstance.delete(`/game/${keyname}`);

	return dispatch => {
		request
			.then(res => {
				dispatch({ type: GAME_REMOVE_SUCESS, payload: res });
				setTimeout(() => {
					callback();
				}, 0);
			})
			.catch(err => {
				dispatch({ type: GAME_REMOVE_FAILED, payload: err });
			});
	};
}

export function grantAdminRights(nickname, token, callback = ()=>{}){
	const axiosInstance = axios.create({ baseURL: baseUrl, headers: { "x-access-token": token } });
	console.log(nickname, token)
	const request = axiosInstance.post(`/admin/${nickname}?level=1`)

	return dispatch => {
		request
			.then(res => {
				dispatch({ type: GRANT_RIGHTS_SUCESS, payload: res });
				setTimeout(() => {
					callback();
				}, 0);
			})
			.catch(err => {
				dispatch({ type: GRANT_RIGHTS_FAILED, payload: err });
			});
	};

}

export function removeAdminRights(nickname, token, callback = ()=>{}){
	const axiosInstance = axios.create({ baseURL: baseUrl, headers: { "x-access-token": token } });
	console.log(nickname, token)
	const request = axiosInstance.post(`/admin/${nickname}?level=0`)

	return dispatch => {
		request
			.then(res => {
				dispatch({ type: GRANT_RIGHTS_SUCESS, payload: res });
				setTimeout(() => {
					callback();
				}, 0);
			})
			.catch(err => {
				dispatch({ type: GRANT_RIGHTS_FAILED, payload: err });
			});
	};

}