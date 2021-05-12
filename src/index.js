import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createStore } from 'redux';
import allReducer from './Reducers/Combined'
import { Provider } from 'react-redux';
import Temp from './Temp';

const store = createStore(
  allReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <App /> */}
      <Temp />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

