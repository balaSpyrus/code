export default function productReducer(state=[],{type,payload}){

	switch (type){
		case "SET_STATE":
		return payload
		break;
		default:
		return state.concat();

	}
}

