import { lists } from '../services/getList'
import { uniqueFunc } from '../views/utils/index'
const goodsList = {
    namespace: 'list',
    state: {
        list: []
    },
    reducers: {
        setList (state, action) {
            return {
                list: uniqueFunc(action.data, 'id')
            }
        }
    },
    effects: {
        // 初始化数据
        *initList ({ payload }, { call, put }) {
            const { data } = yield call(lists, payload);
            yield put({ type: 'setList', data: data.list })
        },
        // 筛选大小
        *filterSize ({ checks }, { call, put, select }) {
            let filters = []
            let filtersSzies = yield select(({ list }) => {
                checks.map(v => {
                    list.list.map(item => {
                        if (item.availableSizes.includes(v)) filters.push(item)
                    })
                })
                return filters
            })
            yield put({ type: 'setList', data: filtersSzies })
        },
        // 排序
        *sort ({ sort }, { call, put, select }) {
            let sorts = []
            if (sort === 'asc') {
                yield select(({ list }) => {
                    sorts = list.list.sort((a, b) => a.price - b.price)
                })
            }
            if (sort === 'desc') {
                yield select(({ list }) => {
                    sorts = list.list.sort((a, b) => b.price - a.price)
                })
            }
            yield put({ type: 'setList', data: sorts })
        }
    },
}
export default goodsList