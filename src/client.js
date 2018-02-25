import App from './components/App';
import BrowserRouter from 'react-router-dom/BrowserRouter';
import React from 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';

import Container from './components/Container';
import configureStore from './store/configureStore';

const store = configureStore(window.__PRELOADED_STATE__);

hydrate(
  <Provider store={store}>
    <BrowserRouter>
      <Container>
        <App />
      </Container>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);

if (module.hot) {
  module.hot.accept();
}
