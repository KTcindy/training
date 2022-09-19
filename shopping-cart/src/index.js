import './index.css';
import dva from 'dva'
import goodsList from './models/product';
import cart from './models/cart';
// 容器组件
import App from './App';
// 创建应用
const app = dva();
// 
app.model(goodsList);
app.model(cart);
// 注册视图
app.router(()=><App/>)
// 启用视图
app.start('#root')

