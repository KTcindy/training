// ui组件
import ResultUi from '@/views/Battle/components/result.jsx'
import { connect } from 'react-redux'
import { asyncGetinfo } from '../redux/active/battle.js'
export default connect(
    state => ({ battleObject: state.battle }),
    {
        asyncGetinfo: asyncGetinfo
    }
)(ResultUi)