import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { changeLogged, decrement, increment, incrementBy } from './Actions';
import ReactReducer from './Components/ReactReducer';

function App() {
  const counter = useSelector(state => state.countReducer);
  const isLogged = useSelector(state => state.loggedReducer);
  const dispatch = useDispatch();

  const [input, setInput] = useState(1);


  return (
    <>
      <button onClick={() => dispatch(decrement())}> - </button>
        <div>
          {counter}
        </div>
      <button onClick={() => dispatch(increment())}> + </button>
      <br />
        <input value={input} onChange={(e) => {setInput(e.target.value)}} type="number"/>
        <button onClick={() => {dispatch(incrementBy(parseInt(input)))}} >Jump By</button>

      <br />
      <button onClick={() => dispatch(changeLogged())}>click</button>
      {isLogged ? <div>hey</div> : ''}
      <ReactReducer />
    </>

    
  )
}

export default App
