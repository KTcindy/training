import React, { Component, Fragment } from 'react'

export default class cheItem extends Component {
    render () {
        let { item } = this.props
        return (
            <Fragment>
                <div className='text-red-600 mb-2 py-3  flex flex-wrap px-4 items-center'>
                    <div className='w-1/5'>
                        <img width={80}
                            src={require(`../../assets/products/${item.sku}-1-product.webp`)} alt="" />
                    </div>
                    <div className='w-3/5 px-3'>
                        <p className='text-white'>{item.title}</p>
                        <p className='text-gray-500'>X | {item.style}</p>
                        <p className='text-gray-500'>Quantity: {item.num}</p>
                    </div>
                    <div className='w-1/5 text-right '>
                        <div className='icon text-black hover:text-gray-50 font-black pb-3' onClick={() => this.props.del(item)}>X</div>
                        <div className='text-yellow-400'>$ {item.price}</div>
                        <div className='pt-3'>
                            <span className={['text-gray-50', 'inline-block', 'w-6', 'text-center', item.num === 1 ? 'bg-gray-600' : 'bg-black icon'].join(' ')} onClick={() => {
                                return item.num === 1 ? false : this.props.del(item, 'delNum')
                            }
                            }>-</span>
                            <span className={['icon', 'text-gray-50', 'inline-block', 'w-6', 'text-center', 'bg-black'].join(' ')} onClick={() => this.props.del(item, 'addNum')}>+</span>
                        </div>
                    </div>
                </div>
                <hr className='bg-gray-900 border-none h-1' />
            </Fragment>

        )
    }
}
