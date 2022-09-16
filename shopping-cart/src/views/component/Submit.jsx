import React, { Component, Fragment } from 'react'
import { Button } from 'antd';
import { connect } from 'react-redux'

class Submit extends Component {
    sumFunction = () => {
        let { addList } = this.props
        let total = addList.reduce((c, r) => c + (r.price * r.num), 0)
        let priceTotal =total/addList.reduce((c, r) => c + r.installments, 0)
        return {
            total,
            installments: addList.at(0)?.installments,
            priceTotal
        }
    }
    submit = () => {
        let { total } = this.sumFunction()
        alert(total?`Checkout - Subtotal: $ ${total}`:'Add some product in the cart!')
    }
    render () {
        let { total, installments, priceTotal } = this.sumFunction()
        return (
            <Fragment>
                <div className='flex justify-between items-center'>
                    <div className='text-gray-300 '>SUBTOTAL</div>
                            <div>
                        <p className='text-yellow-400 text-lg'>$ {total.toFixed(2)}</p>
                        { 
                        total?(
                            <p className='text-gray-300'>
                                OR UP TO {installments} x $ {priceTotal.toFixed(2)}
                            </p>
                                ):null
                            }
                        </div> 
                        
                    
                </div>
                <div className='mt-4'>
                    <Button type="primary" size='large' block onClick={()=>this.submit()}>CHECKOUT</Button>
                </div>
            </Fragment>
        )
    }
}
export default connect(
    state => ({
        addList: state.addReducers
    }),
    dispatch => ({
    })
)(Submit)