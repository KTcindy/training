import React, { Component } from 'react'
import {connect} from 'dva'
import List from './views/List.jsx'
import Sizes from './views/Sizes.jsx'
import Settlement from './views/Settlement'
import Icon from './assets/products/che.png'

 class App extends Component {
  state = {
    flag: 'hidden'
  }
  numTotal = () => {
    let { checks } = this.props.checks;
    return checks.reduce((c, r) => ~~c + r.num,0)
  }
   componentDidMount () {
    window.addEventListener('beforeunload', this.beforeUnload);
  }
  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.beforeUnload);
  }
  beforeUnload = e => {
    e.preventDefault();
    let {checks}=this.props.checks
    localStorage.setItem('checks',JSON.stringify(checks))
  };

   showModel = (e) => this.setState({ flag: e })
  render () {
    let { flag } = this.state
    return (
      <div className='xl:flex justify-center'>
        <Sizes />
        <List />
        <div className='icon bg-gray-800 fixed top-0 right-0' onClick={() => this.showModel('block')}>
          <img
            className='p-2'
            width={50}
            height={50}
            src={Icon}
          />
          <div className='absolute bg-yellow-400 text-center rounded-2xl bottom-0  right-0' style={{ width: '24px', height: '24px' }}>{this.numTotal()}</div>
        </div>
        <div className={[flag]}>
          <Settlement showModel={this.showModel} />
        </div>
      </div>
    )
  }
 }
function mapState (params) {
  return {
    checks:params.cart
   }
 }
export default connect(mapState)(App)
