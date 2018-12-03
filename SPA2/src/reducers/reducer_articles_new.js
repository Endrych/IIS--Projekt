import { NEWEST_ARTICLES_FETCH_SUCESS } from "./../actions";

export default function(state={fetched: false}, action){
	switch(action.type){
		case NEWEST_ARTICLES_FETCH_SUCESS:
			const newState={fetched: true, articles: action.payload.data};

			return newState;
		default:
			return state;
	}
}