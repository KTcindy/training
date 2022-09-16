import { createStore, combineReducers, applyMiddleware } from 'redux'
import {sizeReducers,listReducers,addReducers} from './reducers'
import thunk from 'redux-thunk'//处理异步任务

const allReducers = combineReducers({
    sizeReducers,
    listReducers,
    addReducers
})
export default createStore(allReducers,applyMiddleware(thunk))