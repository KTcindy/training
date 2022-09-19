import React from 'react';
// import ReactDOM from 'react-dom/client';
// import { Provider } from 'react-redux'
// import store from '../src/redux/store'
import './index.css';
// import { Spin } from 'antd';
import dva from 'dva'
import goodsList from './models/goodsList'
// 容器组件
import App from '../src/containers/index.jsx';
// 创建应用
const app = dva();
// 
app.model(goodsList);
// 注册视图
app.router(()=><App/>)
// 启用视图
app.start('#root')
// import reportWebVitals from './reportWebVitals';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <Suspense fallback={<Spin/>}>
//       <Provider store={store}>
//         <App />
//       </Provider>
//     </Suspense>
//   </React.StrictMode>
// );
// reportWebVitals();
