const dataReducer = (state={},{type,payload})=> {

    let newState={...state}
    switch(type){
        case 'SET_DATA':
        newState = payload
        break;
        default:
        break;

    }

    return newState;
}

export default dataReducer;

 