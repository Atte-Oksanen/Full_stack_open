import React from 'react'
import ReactDOM from 'react-dom/client'

import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {
  const clickHandler = (event) => {
    store.dispatch({
      type: event.target.value
    })
  }

  return (
    <div>
      <button onClick={clickHandler} value='GOOD'>good</button> 
      <button onClick={clickHandler} value='OK'>ok</button> 
      <button onClick={clickHandler} value='BAD'>bad</button>
      <button onClick={clickHandler} value='ZERO'>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>ok {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)
