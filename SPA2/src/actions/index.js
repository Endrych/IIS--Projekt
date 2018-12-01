import axios from "axios";
import Cookies from "universal-cookie/cjs";

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
export const TEAM_CREATE_SUCESS = "TEAM_CREATE_SUCESS";
export const TEAM_CREATE_FAILED = "TEAM_CREATE_FAILED";
export const TEAM_GET_INFO_SUCESS = "TEAM_GET_INFO_SUCESS";
export const TEAM_GET_INFO_FAILED = "TEAM_GET_INFO_FAILED";
export const TEAM_UPDATE_SUCESS = "TEAM_UPDATE_SUCESS";
export const TEAM_UPDATE_FAILED = "TEAM_UPDATE_FAILED";
export const TEAM_KICK_MEMBER_SUCESS = "TEAM_KICK_MEMBER_SUCESS";
export const TEAM_KICK_MEMBER_FAILED = "TEAM_KICK_MEMBER_FAILED";
export const TEAM_LEAVE_SUCESS = "TEAM_LEAVE_SUCESS";
export const TEAM_LEAVE_FAILED = "TEAM_LEAVE_FAILED";
export const TEAM_DELETE_SUCESS = "TEAM_DELETE_SUCESS";
export const TEAM_DELETE_FAILED = "TEAM_DELETE_FAILED";
export const INVITE_SEND_SUCESS ="INVITE_SEND_SUCESS";
export const INVITE_SEND_FAILED ="INVITE_SEND_FAILED";
export const INVITE_ACCEPT_SUCESS ="INVITE_ACCEPT_SUCESS";
export const INVITE_ACCEPT_FAILED ="INVITE_ACCEPT_FAILED";
export const INVITE_DECLINE_SUCESS = "INVITE_DECLINE_SUCESS";
export const INVITE_DECLINE_FAILED = "INVITE_DECLINE_FAILED";
export const INVITES_GET_ALL_SUCESS = "INVITES_GET_ALL_SUCESS";
export const INVITES_GET_ALL_FAILED = "INVITES_GET_ALL_FAILED";
export const INVITES_ALL_SHOW = "INVITES_ALL_SHOW";
export const INVITES_ALL_HIDE = "INVITES_ALL_HIDE";
export const TOURNAMENT_CREATE_SUCESS = "TOURNAMENT_CREATE_SUCESS";
export const TOURNAMENT_CREATE_FAILED = "TOURNAMENT_CREATE_FAILED";
export const TOURNAMENTS_FETCH_ALL_SUCESS ="TOURNAMENTS_FETCH_ALL_SUCESS";
export const TOURNAMENTS_FETCH_ALL_FAILED = "TOURNAMENTS_FETCH_ALL_FAILED";
export const TOURNAMENT_GET_DETAILS_SUCESS = "TOURNAMENT_GET_DETAILS_SUCESS";
export const TOURNAMENT_GET_DETAILS_FAILED = "TOURNAMENT_GET_DETAILS_FAILED";
export const  TOURNAMENT_DELETE_SUCESS = "TOURNAMENT_DELETE_SUCESS";
export const TOURNAMENT_DELETE_FAILED ="TOURNAMENT_DELETE_FAILED";
export const TOURNAMENT_REGISTER_SUCESS = "TOURNAMENT_REGISTER_SUCESS";
export const TOURNAMENT_REGISTER_FAILED = "TOURNAMENT_REGISTER_FAILED";
export const TOURNAMENT_UNREGISTER_SUCESS = "TOURNAMENT_UNREGISTER_SUCESS";
export const TOURNAMENT_UNREGISTER_FAILED = "TOURNAMENT_UNREGISTER_SUCESS";
export const TOURNAMENT_START_SUCESS = "TOURNAMENT_START_SUCESS";
export const TOURNAMENT_START_FAILED = "TOURNAMENT_START_FAILED";
export const TOURNAMENT_START_RESET = "TOURNAMENT_START_RESET";
export const TOURNAMENT_MODAL_SET_DATA = "TOURNAMENT_MODAL_SET_DATA";
export const TOURNAMENT_MODAL_UNSET_DATA = "TOURNAMENT_MODAL_UNSET_DATA";
export const MATCH_SET_RESULT_SUCESS = "MATCH_SET_RESULT_SUCESS";
export const MATCH_SET_RESULT_FAILED = "MATCH_SET_RESULT_FAILED";
export const TOURNAMENT_CONTINUE_SUCESS = "TOURNAMENT_CONTINUE_SUCESS";
export const TOURNAMENT_CONTINUE_FAILED = "TOURNAMENT_CONTINUE_FAILED";
export const TOURNAMENT_CONTINUE_RESET = "TOURNAMENT_CONTINUE_RESET";
export const SEARCH_RESULT_SUCESS = "SEARCH_RESULT_SUCESS";
export const SEARCH_RESULT_FAILED = "SEARCH_RESULT_FAILED";

export const RESET_INVITE_REDUCER_VALUES = "RESET_INVITE_REDUCER_VALUES"

const baseUrl = `https://obscure-shelf-42241.herokuapp.com`;

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

export function setTokenCookies(token) {

}

export function getLoggedInStatus(token){
	const axiosInstance = axios.create({ baseURL: baseUrl, headers: { "x-access-token": token } });

	const request = axiosInstance.get("/user");

	return {
		type: LOGGED_IN,
		payload: request
	};
}

export function getUserInfoFromToken(token, callback = () => {}) {
	const axiosInstance = axios.create({ baseURL: baseUrl, headers: { "x-access-token": token } });

	const request = axiosInstance.get("/user");
	// return {
	// 	type: GET_DATA_TOKEN,
	// 	payload: request
	// };

	return dispatch => {
		request
			.then((res,token) => {
				dispatch({ type: GET_DATA_TOKEN, payload: res });
				setTimeout(() => {
					callback(token);
				}, 0);
			})
			.catch(err => {
				dispatch({ type: "USERERROR", payload: err });
				setTimeout(() => {
					callback();
				}, 0);
			});
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


	return dispatch => {
		request
			.then(res => {
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

export function createTeam(values, token, callback = ()=>{}){
	const axiosInstance = axios.create({ baseURL: baseUrl, headers: { "x-access-token": token } });

	const request = axiosInstance.post(`/team`, values);
	return dispatch => {
		request
		.then(res => {
			dispatch({ type: TEAM_CREATE_SUCESS, payload: res });
			setTimeout(() => {
				callback();
			}, 0);
		})
		.catch(err => {
			dispatch({ type: TEAM_CREATE_FAILED, payload: err });
		});
	};

}

export function getTeamInfo(id, callback = ()=>{}){
	const axiosInstance = axios.create({ baseURL: baseUrl });

	const request = axiosInstance.get(`/team/${id}`);

	return dispatch => {
		request.then( res => {
			dispatch({ type: TEAM_GET_INFO_SUCESS, payload: res});
			setTimeout(() => {
				callback();
			}, 0);
		})
		.catch(err => {
			dispatch({ type: TEAM_GET_INFO_FAILED, payload: err});
		})
	}
}

export function updateTeamInfo(id, values, token, callback = ()=>{}){
	const axiosInstance = axios.create({ baseURL: baseUrl, headers: { "x-access-token": token } });

	const request = axiosInstance.put(`/team/${id}`, values);

	return dispatch => {
		request
		.then(res => {
			dispatch({ type: TEAM_UPDATE_SUCESS, payload: res });
			setTimeout(() => {
				callback();
			}, 0);
		})
		.catch(err => {
			dispatch({ type: TEAM_UPDATE_FAILED, payload: err });
		});
	};

}

export function kickTeamMember(player, token, callback = ()=>{}){
	const axiosInstance = axios.create({ baseURL: baseUrl, headers: { "x-access-token": token } });

	const request = axiosInstance.post(`/team/kick?user=${player}`);


	return dispatch => {
		request
		.then(res => {
			dispatch({ type: TEAM_KICK_MEMBER_SUCESS, payload: res });
			setTimeout(() => {
				callback();
			}, 0);
		})
		.catch(err => {
			dispatch({ type: TEAM_KICK_MEMBER_FAILED, payload: err });
		});
	};
}

export function leaveTeam(token, callback = ()=>{}){
	const axiosInstance = axios.create({ baseURL: baseUrl, headers: { "x-access-token": token } });

	const request = axiosInstance.post(`/team/leave`);


	return dispatch => {
		request
		.then(res => {
			dispatch({ type: TEAM_LEAVE_SUCESS, payload: res });
			setTimeout(() => {
				callback();
			}, 0);
		})
		.catch(err => {
			dispatch({ type: TEAM_LEAVE_FAILED, payload: err });
		});
	};
}

export function deleteTeam(id, token, callback = ()=>{}){
	const axiosInstance = axios.create({ baseURL: baseUrl, headers: { "x-access-token": token } });

	const request = axiosInstance.delete(`/team/${id}`);


	return dispatch => {
		request
		.then(res => {
			dispatch({ type: TEAM_DELETE_SUCESS, payload: res });
			setTimeout(() => {
				callback();
			}, 0);
		})
		.catch(err => {
			dispatch({ type: TEAM_DELETE_FAILED, payload: err });
		});
	};
}

export function sendInvite(token, user, callback=() => {}){
	const axiosInstance = axios.create({ baseURL: baseUrl, headers: { "x-access-token": token } });

	const request = axiosInstance.post(`/invite?user=${user}`);

	return dispatch => {
		request
		.then(res => {
			dispatch({ type: INVITE_SEND_SUCESS, payload: res });
			setTimeout(() => {
				callback();
			}, 2000);
		})
		.catch(err => {
			dispatch({ type: INVITE_SEND_FAILED, payload: err });
			setTimeout(() => {
				callback();
			}, 2000);
		});
	}
}

export  function resetInviteStatus(){
	return {
		type: RESET_INVITE_REDUCER_VALUES
	}
}

export function getInvites(token){
	const axiosInstance = axios.create({ baseURL: baseUrl, headers: { "x-access-token": token } });
	const request = axiosInstance.get(`/invites`);

	return dispatch => {
		request
		.then(res => {
			dispatch({ type: INVITES_GET_ALL_SUCESS, payload: res });
			// setTimeout(() => {
			// 	callback();
			// }, 0);
		})
		.catch(err => {
			dispatch({ type: INVITES_GET_ALL_FAILED, payload: err });
			// setTimeout(() => {
			// 	callback();
			// }, 0);
		});
	}
}

export  function invitesShow(){
	return {
		type: INVITES_ALL_SHOW
	}
}

export  function invitesHide(){
	return {
		type: INVITES_ALL_HIDE
	}
}

export function acceptInvite(token, id, callback = () => {}){
	const axiosInstance = axios.create({ baseURL: baseUrl, headers: { "x-access-token": token } });

	const request = axiosInstance.post(`/invite/accept?id=${id}`);
	return dispatch => {
		request
		.then(res => {
			dispatch({ type: INVITE_ACCEPT_SUCESS, payload: res });
			setTimeout(() => {
				callback();
			}, 0);
		})
		.catch(err => {
			dispatch({ type: INVITE_ACCEPT_FAILED, payload: err });
			// setTimeout(() => {
			// 	callback();
			// }, 0);
		});
	}
}

export function declineInvite(token, id, callback = () => {}){
	const axiosInstance = axios.create({ baseURL: baseUrl, headers: { "x-access-token": token } });

	const request = axiosInstance.post(`/invite/decline?id=${id}`);
	return dispatch => {
		request
		.then(res => {
			dispatch({ type: INVITE_DECLINE_SUCESS, payload: res });
			setTimeout(() => {
				callback();
			}, 0);
		})
		.catch(err => {
			dispatch({ type: INVITE_DECLINE_FAILED, payload: err });
			// setTimeout(() => {
			// 	callback();
			// }, 0);
		});
	}
}

export function createTournament(values, token, callback = ()=>{}){
	const axiosInstance = axios.create({ baseURL: baseUrl, headers: { "x-access-token": token } });
	console.log("ASDASD")
	const request = axiosInstance.post(`/tournament`, values);
	return dispatch => {
		request
		.then(res => {
			dispatch({ type: TOURNAMENT_CREATE_SUCESS, payload: res });
			setTimeout(() => {
				callback();
			}, 0);
		})
		.catch(err => {
			dispatch({ type: TOURNAMENT_CREATE_FAILED, payload: err });
			// setTimeout(() => {
			// 	callback();
			// }, 0);
		});
	}
}

export function fetchTournamentsList(){
	const axiosInstance = axios.create({ baseURL: baseUrl });

	const request = axiosInstance.get(`/tournaments`);

	return dispatch => {
		request
		.then(res => {
			dispatch({ type: TOURNAMENTS_FETCH_ALL_SUCESS, payload: res });
			setTimeout(() => {

				// callback();
			}, 0);
		})
		.catch(err => {
			dispatch({ type: TOURNAMENTS_FETCH_ALL_FAILED, payload: err });
			// setTimeout(() => {
			// 	callback();
			// }, 0);
		});
	}
}

export function getTournamentDetails(id){
	const axiosInstance = axios.create({ baseURL: baseUrl });

	const request = axiosInstance.get(`/tournament/${id}`);

	return dispatch => {
		request
		.then(res => {
			dispatch({ type: TOURNAMENT_GET_DETAILS_SUCESS, payload: res });
			setTimeout(() => {
				console.log(res)
				// callback();
			}, 0);
		})
		.catch(err => {
			dispatch({ type: TOURNAMENT_GET_DETAILS_FAILED, payload: err });
			// setTimeout(() => {
			// 	callback();
			// }, 0);
		});
	}
}

export function registerInTournament(token, tournamentId, callback = () => {}){
	const axiosInstance = axios.create({ baseURL: baseUrl, headers: { "x-access-token": token } });

	const request = axiosInstance.post(`/tournament/${tournamentId}/register`);


	return dispatch => {
		request
		.then(res => {
			dispatch({ type: TOURNAMENT_REGISTER_SUCESS, payload: res });
			setTimeout(() => {
				callback();
			}, 0);
		})
		.catch(err => {
			dispatch({ type: TOURNAMENT_REGISTER_FAILED, payload: err });
			// setTimeout(() => {
			// 	callback();
			// }, 0);
		});
	}
}

export function unregisterFromTournament(token, tournamentId, callback = () => {}){
	const axiosInstance = axios.create({ baseURL: baseUrl, headers: { "x-access-token": token } });

	const request = axiosInstance.post(`/tournament/${tournamentId}/unregister`);


	return dispatch => {
		request
		.then(res => {
			dispatch({ type: TOURNAMENT_UNREGISTER_SUCESS, payload: res });
			setTimeout(() => {
				callback();
			}, 0);
		})
		.catch(err => {
			dispatch({ type: TOURNAMENT_UNREGISTER_FAILED, payload: err });
			// setTimeout(() => {
			// 	callback();
			// }, 0);
		});
	}
}

export function startTournament(token , tournamentId, callback = () => {}, callback2 = () => {}){
	const axiosInstance = axios.create({ baseURL: baseUrl, headers: { "x-access-token": token } });

	const request = axiosInstance.post(`/tournament/${tournamentId}/start`);


	return dispatch => {
		request
		.then(res => {
			dispatch({ type: TOURNAMENT_START_SUCESS, payload: res });
			setTimeout(() => {
				callback();
			}, 0);
		})
		.catch(err => {
			dispatch({ type: TOURNAMENT_START_FAILED, payload: err });
			setTimeout(() => {
				callback();
			}, 0);
			setTimeout(()=>{
				callback2();
			}, 2000)
		});
	}
}

//nakonec jen prepina ezi true a false na viditelnost
export function setTournamentModalValues(values){
	return {
		type: TOURNAMENT_MODAL_SET_DATA,
		payload: values
	}
}

export function unsetTournamentModalValues(values){
	return {
		type: TOURNAMENT_MODAL_UNSET_DATA,
		// payload: values
	}
}

export function setMatchResult(token, values, callback = () => {}){
	const axiosInstance = axios.create({ baseURL: baseUrl, headers: { "x-access-token": token } });

	const request = axiosInstance.post(`/match/${values.Id}?score1=${values.Score1}&score2=${values.Score2}`);

	return dispatch => {
		request
		.then(res => {
			dispatch({ type: MATCH_SET_RESULT_SUCESS, payload: res });
			setTimeout(() => {
				callback(values.tournamentId);
			}, 0);
		})
		.catch(err => {
			dispatch({ type: MATCH_SET_RESULT_FAILED, payload: err });
			setTimeout(() => {
				callback(values.tournamentId);
			}, 0);
		});
	}

}

export function startNextRound(token, id, callback = () => {}){
	const axiosInstance = axios.create({ baseURL: baseUrl, headers: { "x-access-token": token } });
	console.log(id)
	const request = axiosInstance.post(`/tournament/${id}/continue`);

	return dispatch => {
		request
		.then(res => {
			dispatch({ type: TOURNAMENT_CONTINUE_SUCESS, payload: res });
			setTimeout(() => {
				console.log(res)
				callback(id);
			}, 0);
		})
		.catch(err => {
			dispatch({ type: TOURNAMENT_CONTINUE_FAILED, payload: err });
			setTimeout(() => {
				callback(id);
			}, 0);
		});
	}

}

export function resetStartState(){
	// console.log("HULALLALALALL")
	return{
		type: TOURNAMENT_START_RESET
	}
}
// export function showModal(){

// }

// export hideModal()

export function getSearchResults(expression, callback = () => {}){
	const axiosInstance = axios.create({ baseURL: baseUrl });

	const request = axiosInstance.get(`/search?expression=${expression}`);

	return dispatch => {
		request
		.then(res => {
			dispatch({ type: SEARCH_RESULT_SUCESS, payload: res });
			setTimeout(() => {
				callback();
			}, 0);
		})
		.catch(err => {
			dispatch({ type: SEARCH_RESULT_FAILED, payload: err });
			setTimeout(() => {
				callback();
			}, 0);
		});
	}
}