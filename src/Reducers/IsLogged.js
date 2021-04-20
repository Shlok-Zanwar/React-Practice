const loggedReducer = (state = false, action) => {
    switch (action.type) {
        case 'LOGGED':
            return !state;
        default:
            return false;
    }
}

export default loggedReducer;
// const dispatch = useDispatch(function)
// const [state, dispatch] = useReducer(reducer, initialState, init)