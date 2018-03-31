import data from './../data/data'
const cardReducers = (state=data,{type,payload})=>{

	switch(type){
		case 'SAVE_CARD':
		state.push(payload)
		return state;
		case 'DEL_CARD':
		state = state.filter((data)=>{
			if(data.number!== payload)
				return data
		})
		return state;
		case 'UP_CARD':
		console.log(payload)
		return state;
		default:
		return state;

	}
}

export default cardReducers;