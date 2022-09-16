import { SIZE, LIST, ADD, DEL, EDIT } from '../constants.js'
// Sizes
const initSize =[]; //初始化
function sizeReducers (perState = initSize, active) {
    const { type, data } = active;
    switch (type) {
        case SIZE:
            return [...data]
        default:
            return perState
    }
}

// 列表
const initList =[]; //初始化
function listReducers (perState = initList, active) {
    const { type, data } = active;
    switch (type) {
        case LIST:
            
            return [...data]
        default:
            return perState
    }
}
//添加购物车
const initAdd = [];
function addReducers (perState = initAdd, active) {
    const { type, data } = active;
    switch (type) {
        case ADD:
            return [...data]
        case DEL:
            return [...data]
        case EDIT:
            return [...data]
        default:
            return perState
    }
}
export {
    sizeReducers,
    listReducers,
    addReducers
 }
