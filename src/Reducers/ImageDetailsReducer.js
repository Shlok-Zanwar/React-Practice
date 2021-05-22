const imageDetailsReducer = (state = {}, action) => {
    // var newState;
    switch (action.type) {
        case 'SET_IMAGE_DETAILS':
            return action.payload;

        default:
            return state;
    }
}

export default imageDetailsReducer;