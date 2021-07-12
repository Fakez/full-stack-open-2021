import React from 'react';
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import reducer from './reducer'

const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD':
      return {...state, good: state.good += 1}
    case 'OK':
      return {...state, ok: state.ok += 1}
    case 'BAD':
      return {...state, bad: state.bad += 1}
    case 'ZERO':
      return {good: 0, ok: 0, bad: 0}
    default:
      return state;
  }
}

const store = createStore(counterReducer)

const App = () => {

  const dispatchToCounter = (actionType) => {
    store.dispatch({
      type: actionType
    })
  
  }

  return (
    <div>
      <button onClick={() => dispatchToCounter('GOOD')}>good</button> 
      <button onClick={() => dispatchToCounter('OK')}>neutral</button> 
      <button onClick={() => dispatchToCounter('BAD')}>bad</button>
      <button onClick={() => dispatchToCounter('ZERO')}>reset stats</button>

      <div>good {store.getState().good}</div>
      <div>neutral {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)