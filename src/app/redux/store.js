import { createStore } from 'redux'

function counter(state = 0, action) {
  switch(action.type) {
    case 'inc':
      return state + 1;
    case 'dec':
      return state - 1;
    default:
      return state;  
  }
}

store.subscribe(() =>
  console.log(store.getState())
)

const store = createStore(counter)

store.dispatch({ type: 'INCREMENT' })
store.dispatch({ type: 'INCREMENT' })
store.dispatch({ type: 'DECREMENT' })

