// 把app组件当做UI容器
import AppUi from '../App'
import { connect } from 'react-redux'
// import { checkSize } from '../redux/active/index'
export default connect(
    state => ({checks: state.addReducers}),
    {}
)(AppUi)