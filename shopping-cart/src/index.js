import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'
import store from '../src/redux/store'
import './index.css';
import { Spin } from 'antd';

// 容器组件
import App from '../src/containers/index.jsx';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Suspense fallback={<Spin/>}>
      <Provider store={store}>
        <App />
      </Provider>
    </Suspense>
  </React.StrictMode>
);
reportWebVitals();
