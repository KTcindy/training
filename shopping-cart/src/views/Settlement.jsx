import React, { Component } from 'react'
import { Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { connect } from 'react-redux'
import Icon from '../assets/products/che.png'
import CheckItem from './component/CheckItem';
import Submit from './component/Submit';
import { delInit, editInit, addInit } from '../redux/active/index'
class Settlement extends Component {
    sumTotal = () => {
        let { checks } = this.props;
        return checks.reduce((c, r) => ~~c + r.num, 0)
    }
    //移除商品、添加数量、减少数量
    del = (item, type = 'all') => {
        let { checks, editNum } = this.props
        let index = checks.findIndex(i => i.id === item.id)
        if (type === 'all') {
            let newArr = checks.filter(v => v.id !== item.id)
            this.props.delChe(newArr)
        }
        if (type === 'delNum') {
            checks[index].num--
            editNum(checks)
        }
        if (type === 'addNum') {
            checks[index].num++
            editNum(checks)
        }
    }
    render () {
        let { checks } = this.props
        return (
            <div className='fixed w-full xl:w-3/12 top-0 right-0 h-full bg-gray-800 z-10'>
                <div className='h-full'>
                    <div className='clons absolute xl:-left-10 top-0' onClick={() => this.props.showModel('hidden')}>
                        <Button type="primary" className='bg-gray-800 ' icon={<CloseOutlined />} size='large' />
                    </div>
                    <div className='h-36 text-gray-400'>
                        <div className='py-10  transform flex items-center absolute'>
                            <img
                                className='p-2'
                                width={50}
                                height={50}
                                src={Icon}
                            />
                            <div className='bg-yellow-400 bottom-10 absolute text-center text-gray-50 rounded-2xl bottom-0  left-6' style={{ width: '24px', height: '24px' }}>{this.sumTotal()}</div>
                            <div className='text-gray-50 text-xl pl-2'>Cart</div>
                        </div>
                    </div>
                    <div className='overflow-x-auto h'>
                        {
                            checks.length ? (
                                checks.map(v => <CheckItem item={v} key={v.id} del={this.del} />)
                            ) : <div className='text-white text-center text-lg'>Add some products in the cart
                                :)</div>

                        }
                    </div>
                </div>
                <div className='absolute bottom-0 w-full py-12 px-6 bg-gray-900'>
                    <Submit />
                </div>
            </div>
        )
    }
}
export default connect(
    state => ({
        checks: state.addReducers,
    }),
    dispatch => ({
        delChe: (arr) => dispatch(delInit(arr)),
        editNum: (arr) => dispatch(editInit(arr)),
        addChe: (arr) => dispatch(addInit(arr))
    })
)(Settlement)