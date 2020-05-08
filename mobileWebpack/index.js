import React from 'react';
import ReactDom from 'react-dom';
import './index.scss'
import App from './App';
import './src/plugin/rem'
const jsx = (<div
  className='div1'
><h1>你好</h1></div>)

ReactDom.render(<App />, document.querySelector('#root'))