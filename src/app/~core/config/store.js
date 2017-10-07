import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { reducer as rootReducer } from '../reducers';
import { saga as rootSaga } from '../sagas';

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(sagaMiddleware)
  )
);

sagaMiddleware.run(rootSaga);

store.dispatch({ type: 'LOG' });

export default store;
