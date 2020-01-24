// 入口js文件
import Str from './test';
// 引入css,需要loader翻译成js
import './../css/style.scss'
window.onload = function () {
  let div1 = document.getElementById('div1');
  div1.innerHTML = Str.title + Str.content;
}