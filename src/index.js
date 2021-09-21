import { applyMiddleware, createStore, compose } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { rootReducer } from "./redux/rootReducer";
import { asyncIncrement, changeTheme, decrement, increment } from "./redux/actions";
import './styles.css'

const counter = document.getElementById('counter')
const addBtn = document.getElementById('add')
const subBtn = document.getElementById('sub')
const asyncBtn = document.getElementById('async')
const themeBtn = document.getElementById('theme')

// Logger
// function logger(state) {
//   return function(next) {
//     return function(action) {
//       console.log('previous state: ', state.getState())
//       console.log('action: ', action)
//       const newState = next(action)
//       console.log('new state: ', newState)

//       return newState
//     }
//   }
// }

const store = createStore(rootReducer, compose(applyMiddleware(thunk, logger), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()))

addBtn.addEventListener('click', () => {
  store.dispatch(increment())
  // if (document.body.classList.contains('light'))
  // {
  //   store.dispatch(increment())
  // }
  // else {
  //   alert('Dark theme)
  // }
})

subBtn.addEventListener('click', () => {
  store.dispatch(decrement())
  // if (document.body.classList.contains('light'))
  // {
  //   store.dispatch(decrement())
  // }
  // else {
  //   alert('Dark theme)
  // }
})

asyncBtn.addEventListener('click', () => {
  store.dispatch(asyncIncrement())
  // if (document.body.classList.contains('light'))
  // {
  //  store.dispatch(asyncIncrement())
  // }
  // else {
  //   alert('Dark theme)
  // }
})

themeBtn.addEventListener('click', () => {
  const newTheme = document.body.classList.contains('light') ? 'dark' : 'light'
  store.dispatch(changeTheme(newTheme))
})

store.subscribe(() => {
  const state = store.getState()

  counter.textContent = state.counter
  document.body.className = state.theme.value;
  
  [addBtn, subBtn, themeBtn, asyncBtn].forEach(btn => {
    btn.disabled = state.theme.disabled
  })
})

store.dispatch({type: 'INIT_APPLICATION'})