import { createStore,combineReducers,applyMiddleware } from 'redux'
import batter_reducers from './reducers/battle.js'
import thunk from 'redux-thunk'//处理异步任务
// 合并store
const allReducers=combineReducers({
    battle:batter_reducers
})
export default createStore(allReducers,applyMiddleware(thunk))