import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import cartItems from './Reducers/cartItem'
import errorReducer from './Reducers/errorReducer'
import tableReducer from './Reducers/Table'


const reducers = combineReducers({
    cartItems : cartItems,
    errorReducer: errorReducer,
    tableReducer: tableReducer
})

const store = createStore(
    reducers,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
)

export default store;
