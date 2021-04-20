import React, { useReducer } from 'react'
import { decrement, increment } from '../Actions';
import Another from './Another';
import ReducerNew from "./ReducerNew";


function ReactReducer() {
    const [state, dispatch] = useReducer(ReducerNew, parseInt(localStorage.getItem('temp')))
    // const [state1, dispatch1] = useReducer(ReducerNew, 3)

    return (
        <>
        <br />
        <br />
        <br />
        <br />
        <br />
        <button onClick={() => dispatch(decrement())}> - </button>
        <div>
          {state}
        </div>
        <button onClick={() => dispatch(increment())}> + </button>
        <br />
        {/* <button onClick={() => dispatch1(decrement())}> - </button>
        <div>
          {state1}
        </div>
        <button onClick={() => dispatch1(increment())}> + </button> */}
        <br />

        <Another />
      </>
    )
}

export default ReactReducer
