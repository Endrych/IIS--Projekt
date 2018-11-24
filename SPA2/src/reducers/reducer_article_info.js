import { ARTICLE_FETCH_SUCESS } from '../actions'

export default function(state = {articleFetched: false}, action){
	switch(action.type){
		case ARTICLE_FETCH_SUCESS:
			const { data } = action.payload;
			const newState = {...data, articleFetched: true};

			return newState;
		default:
			return state;
	}
}