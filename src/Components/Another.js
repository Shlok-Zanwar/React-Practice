import React, {useReducer} from 'react'
import { useSelector } from 'react-redux';
import ReducerNew from './ReducerNew';

function Another() {
    const [state, dispatch] = useReducer(ReducerNew, 10);
    const counter = useSelector(state => state.countReducer);
    const isLogged = useSelector(state => state.loggedReducer);
    return (
        <div>
            hi {state}
            <br />
            hi {counter}
        </div>
    )
}

export default Another

