
import { LIST, SIZE, ADD, DEL,EDIT } from '../../redux/constants'
const axios = require('axios');
const checkSize = obj => ({ type: SIZE, data: obj })
const initList = obj => ({ type: LIST, data: obj })
const asyncInitList = () => {
    return async (dispatch) => {
        try {
            let { data: { list } } = await axios.get('./list.json')
            dispatch(initList(list))
        } catch (error) {
            throw error
        }
    }
}
const addInit = obj => ({ type: ADD, data: obj })
const delInit = obj => ({ type: DEL, data: obj })
const editInit = obj => ({ type: EDIT, data: obj })

export {
    checkSize,
    asyncInitList,
    addInit,
    delInit,
    editInit
}