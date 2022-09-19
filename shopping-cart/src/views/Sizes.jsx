import React, { Component } from 'react'
import { connect } from 'dva'
// import { checkSize } from '../redux/active/index'
 class Sizes extends Component {
  state = {
    optionsWithDisabled: [
      {
        label: 'XS',
        value: 'XS',
        checked: false
      },
      {
        label: 'S',
        value: 'S',
        checked: false
      },
      {
        label: 'M',
        value: 'M',
        checked: false
      },
      {
        label: 'ML',
        value: 'ML',
        checked: false
      },
      {
        label: 'L',
        value: 'L',
        checked: false
      },
      {
        label: 'XL',
        value: 'XL',
        checked: false
      },
      {
        label: 'XXL',
        value: 'XXL',
        checked: false
      },
    ]
  }
  handleChang = (value, e) => {
    let { optionsWithDisabled } = this.state
    let arr = optionsWithDisabled.map(item => {
      if (item.value === value) item.checked = e.target.checked
      return item
    })
    this.setState({ optionsWithDisabled: arr }, async() => {
     await this.props.dispatch({type: 'list/initList'})
      let checks = arr.map(item => item.checked && item.value).filter(item => item)
      this.props.dispatch({type:'list/filterSize',checks})
    })
  }
  render () {
    let { optionsWithDisabled } = this.state
    return (
      <div className='xl:w-1/6 p-8'>
        <div className='py-4 text-xl font-black'>Sizes:</div>
        <div>
          {
            optionsWithDisabled.map(item => {
              return <div className="hcyKTa" key={item.value}>
                <label>
                  <input type="checkbox" data-testid="checkbox" onChange={(e) => this.handleChang(item.value, e)} value={item.value} />
                  <span className="checkmark">{item.label}</span>
                </label>
              </div>
            })
          }
        </div>
        <div>
        My mall list, please enjoy
        </div>
      </div>
    )
  }
}
export default connect(
  state => state.list,
)(Sizes)