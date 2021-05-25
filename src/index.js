import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createStore } from 'redux';
import allReducer from './Reducers/Combined'
import { Provider } from 'react-redux';
import axios from 'axios';
import { SnackbarProvider } from 'notistack';

// Shoukd end without '/'
axios.defaults.baseURL = 'http://api.smart-iam.com/api/image-store';

const store = createStore(
  allReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <SnackbarProvider
        maxSnack={2}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        autoHideDuration={5000}
      >
        <App />
      </SnackbarProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

