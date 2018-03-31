const userReducer=(state={},{type,payload})=>{
	let newState ={...state}
	switch (type){
		case "SET_STATE":
		return payload
		break;
		default:
		return newState;

	}
}

export default userReducer;

