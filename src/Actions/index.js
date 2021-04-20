export const increment = () => {
    return {
        type: 'INCREMENT'
    };
}

export const decrement = () => {
    return {
        type: 'DECREMENT'
    };
}

export const incrementBy = (incBy) => {
    return {
        type: 'INCBY',
        payload: incBy
    };
}

export const changeLogged = () => {
    return {
        type: "LOGGED"
    };
}