
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';

import App from './App';
import './index.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
 const clintid = process.env.REACT_APP_GOOGLE_CLIENT_ID

 ReactDOM.render(
  <GoogleOAuthProvider clientId={clintid}>
  <Provider store={store}>
    <App />
  </Provider>
  </GoogleOAuthProvider>,
  document.getElementById('root')
);
