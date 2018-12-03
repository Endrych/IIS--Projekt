import { ARTICLE_FETCH_SUCESS } from '../actions'

export default function(state = {articleFetched: false, fetchSucess: false}, action){
	switch(action.type){
		case ARTICLE_FETCH_SUCESS:
			const { data } = action.payload;
			const newState = {...data, articleFetched: true, fetchSucess: true};
			if(action.payload.status !== 200){
				return {articleFetched:true, fetchSucess: false};
			}
			return newState;
		default:
			return state;
	}
}