export default function saveCardDetails(card){

	return{
		type:'SAVE_CARD',
		payload:card
	}
}

export function delCardDetails(cardnum){

	return{
		type:'DEL_CARD',
		payload:cardnum
	}
}
export function upCardDetails(card){

	return{
		type:'UP_CARD',
		payload:card
	}
}