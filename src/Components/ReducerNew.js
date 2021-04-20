// const initialState = localStorage.getItem('temp');
// const initialState = {

// }

// export default (state = initialState, { type, payload }) => {
//     switch (type) {

//     case typeName:
//         return { ...state, ...payload }

//     default:
//         return state
//     }
// }

export default (state, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return state + 1;

        case 'DECREMENT':
            return state - 1;

        case 'INCBY':
            return state + action.payload;
    
        default:
            return state;
    }
}

// export default countReactReducer;