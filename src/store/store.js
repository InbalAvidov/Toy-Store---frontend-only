import { combineReducers, legacy_createStore as createStore } from 'redux'

// import { userReducer } from './user.reducer.js'
import { toyReducer } from './toy.reducer.js'

const middleware = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()

const rootReducer = combineReducers({
    toyModule: toyReducer
})

export const store = createStore(rootReducer, middleware)

// For debug 
store.subscribe(() => {
 
})
