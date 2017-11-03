import './index.scss'
import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'react-redux'
import store from './store'
import Routes from './routes'

// establishes socket connection
import './socket'

function render(Routes) {
  console.log('are we rendering?');
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Routes />
      </Provider>
    </AppContainer>,
    document.getElementById('app')
  );
}

if (module.hot) {
  module.hot.accept('./routes', () => { render(Routes) })
}

console.log('in client/index.js')

render(Routes);
