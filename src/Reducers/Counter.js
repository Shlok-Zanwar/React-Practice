const countReducer = (state = 0, action) => {
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

export default countReducer;