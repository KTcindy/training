import React, { Component } from 'react'
import { Button } from 'antd';
export default class Item extends Component {
    state = {
        flag: 1
    }
    filter = (e, index) => {
        if (typeof e === 'number') {
            return e.toFixed(2).split('.')[index]
        }
    }
    sum = (e1, e2) => {
        if (typeof e1 === 'number' && typeof e2 === 'number') {
            return (e1 / e2).toFixed(2)
        }
    }
    showToolTip = () => this.setState({ flag: 2 })
    hideToolTip = () => this.setState({ flag: 1 })
    render () {
        let { item } = this.props
        let { flag } = this.state
        return (
            <div className='xl:w-1/4 w-2/4 px-2 pb-8' key={item.id}
                onMouseEnter={this.showToolTip}
                onMouseLeave={this.hideToolTip}
            >
                <div className={['bgimg']} style={{ backgroundImage: `url(${require(`../../assets/products/${item.sku}-${flag}-product.webp`)})` }}>
                    {
                        item.isFreeShipping && <div className='bHJSNa'>Free shipping</div>
                    }
                </div>
                <p className="eeXMBo text-center mt-2 text-base">{item.title}</p>
                <div className="fTQxRg text-center">
                    <p className="ljgnQL m-0">
                        <small>{item.currencyFormat}</small>
                        <b className='text-lg'>{this.filter(item.price, 0)}</b>
                        <span>.{this.filter(item.price, 1)}</span>
                    </p>
                    {
                        item.installments && <p className="kIYxbn text-base">
                            <span>or {item.installments} x</span>
                            <b>${this.sum(item.price, item.installments)}</b>
                        </p>
                    }
                </div>
                <Button type={flag == 2 ? 'primary' : ''} className='mt-2' block size='large' onClick={()=>this.props.add(item)}>
                    Add to cart
                </Button>
            </div>
        )
    }
}
