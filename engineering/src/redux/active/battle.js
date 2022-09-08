import { ADD, DEL, INFO } from '../../redux/constants';
import baseFetch from '../../utils/require'

export const addBattle = objBattle => ({ type: ADD, data: objBattle })
export const delBattle = objBattle => ({ type: DEL, data: objBattle })
export const asyncGetinfo = (type,data) => {
    return (dispatch) => {
        baseFetch(`user/${222}`, {}).then(res => {
            // dispatch(createAdd(data))
            console.log(res,'res')
        })
    }
}
