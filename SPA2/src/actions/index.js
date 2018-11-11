import axios from 'axios';

export const REGISTER_USER = "REGISTER_USER";

export function registerUser(values){
	console.log(values)

	return{
		type:REGISTER_USER,
		payload: null
	}
}