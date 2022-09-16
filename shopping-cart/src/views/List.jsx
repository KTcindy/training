import React, { Component } from 'react'
import Item from './component/Item'
import { connect } from 'react-redux'
import { asyncInitList, addInit } from '../redux/active/index'
import { uniqueFunc } from '../views/utils'
class List extends Component {
  state = {
    flag: 1
  }
  //寻找匹配型号
  include = () => {
    let { lists, size } = this.props
    let filters = []
    size.map(v => {
      lists.map(item => {
        if (item.availableSizes.includes(v)) filters.push(item)
      })
    })
    // 判断当长度为0 就显示所有的 
    return {
      lists: !uniqueFunc(filters, 'id').length ? lists : uniqueFunc(filters, 'id')
    }
  }
  // 添加商品
  handleAdd = (item) => {
    let { addList,addChe } = this.props
    // 1 、判断默认有没有商品
    if (addList.length) {
      let newKey = addList.findIndex(i => i.id === item.id)
      if (newKey === -1) {
        item['num'] = 1
        addList.push(item)
      } else {
        addList[newKey]['num']++
      }
      addChe(addList)
    } else {
      item['num'] = 1
      addChe([item])
    }
  }
  componentDidMount = () => this.props.initList()
  render () {
    let { lists } = this.include()
    return (
      <div className='xl:w-2/4 p-4'>
        <div className='py-3 text-base'>{lists.length} Product(s) found</div>
        <div className='flex flex-wrap'>
          {
            lists?.map(item => {
              return <Item item={item} key={item.id} add={this.handleAdd} />
            })
          }
        </div>
      </div>
    )
  }
}
export default connect(
  state => ({
    lists: state.listReducers,
    size: state.sizeReducers,
    addList: state.addReducers
  }),
  dispatch => ({
    initList: (arr) => dispatch(asyncInitList(arr)),
    addChe: (arr) => dispatch(addInit(arr)),
  })
)(List)