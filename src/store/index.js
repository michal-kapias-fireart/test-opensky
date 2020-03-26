import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './modules';
import sagas from './sagas';

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middlewares = [sagaMiddleware];

const store = createStore(rootReducer, /* preloadedState, */ composeEnhancers(applyMiddleware(...middlewares)));

sagas.forEach(saga => {
  sagaMiddleware.run(saga);
});

export default store;
