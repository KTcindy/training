import React, { Component } from 'react'
import Item from './component/Item'
import { connect } from 'dva'
import {  Radio } from 'antd';
class List extends Component {
  state = {
    flag: 1,
    sort: void 0,
    list: []
  }
  // 添加商品
  handleAdd =  (item) => {
    let { dispatch } = this.props
    dispatch({ type: 'cart/add', check: item })
  }
  //排序
  sort =  (sort) => {
    let {dispatch}=this.props
    let { value } = sort.target
    dispatch({type:'list/sort',sort:value})    
  }
  componentDidMount = () => this.props.dispatch({type: 'list/initList'})
  render () {
    let { list}=this.props.state
    return (
      <div className='xl:w-2/4 p-4'>
        <div className='flex items-center justify-between px-1'>
          <div className='py-3 xl:w-3/12 text-base'>{list.length} Product(s) found</div>
          <div className='flex items-center'>
            <p className='mr-2'>Order by</p>
            <Radio.Group buttonStyle="solid" onChange={(e)=>this.sort(e)}>
                  <Radio.Button value='asc'>升序</Radio.Button>
                  <Radio.Button value='desc'>降序</Radio.Button>
            </Radio.Group>
          </div>
        </div>
        <div className='flex flex-wrap'>
          {
            list?.map(item => {
              return <Item item={item} key={item.id} add={this.handleAdd} />
            })
          }
        </div>
      </div>
    )
  }
}
function mapState (params) {
  return {
    state: params.list,
    check:params.cart
  }
}
export default connect(mapState)(List)