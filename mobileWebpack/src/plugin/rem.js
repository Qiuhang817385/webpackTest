/**
 * remCalc对象
 */
const remCalc = {};
/**
 * 获取body对象
 */
const docEl = window.document.documentElement;

let tid;

function refreshRem () {
  // 获取当前窗口的宽度
  let { width } = docEl.getBoundingClientRect();
  // 大于640px 按640算
  if (width > 750) { width = 750; }
  // 把窗口的宽度固定分为10份 也就是10rem
  // 按视觉稿640算  640/10=64px  那么1rem = 64px
  // 640视觉中 80px*80px的按钮 转换为rem  80/64 = 1.25rem

  // 按钮的宽高固定为  1.25rem * 1.25rem

  // 当窗口宽度缩放为 320px的时候
  // 那么 1rem = 32px
  // 原来 80px*80px的按钮现在变为 1.25rem * 32px = 40px
  // 按钮变为 40px * 40px
  // 其他宽度也类似
  //
  // cms做法也类似
  // 只是我们把窗口宽度固定分为 6.4份，即6.4rem
  // 所以 1rem = 100px
  // 640视觉中 80px*80px的按钮 转换为rem  80/100 = 0.8rem
  // ....其他也差不多
  //
  //
  // 对比
  // 其实也就是计算rem的问题 视觉稿量出来的值  除64 或 100的问题
  // 除100 总比 除64 好口算
  // 就算用sass写个 @function px2rem代替口算
  // .8rem 总比输入 px2rem(80)少几个字符
  //
  //
  const rem = 20 * (width / 375); // cms 只要把这行改成  var rem = width /640 * 100
  // 宽度750--->满rem  40   字体设置成40px   

  docEl.style.fontSize = `${rem}px`;

  remCalc.rem = rem;
  // 误差、兼容性处理

  const actualSize = parseFloat(window.getComputedStyle(document.documentElement)['font-size']);

  if (actualSize !== rem && actualSize > 0 && Math.abs(actualSize - rem) > 1) {
    const remScaled = rem * rem / actualSize;
    docEl.style.fontSize = `${remScaled}px`;
  }
}

// 函数节流，避免频繁更新
function dbcRefresh () {
  clearTimeout(tid);
  tid = setTimeout(refreshRem, 100);
}

function dbcRefresh2 (fn, time) {
  var falg = true;
  return function () {
    if (!falg) return;
    falg = false;
    setTimeout(() => {
      fn.call(this)
      falg = true;
    }, time);
  }
}

// 窗口更新动态改变font-size
window.addEventListener('resize', () => { dbcRefresh(); }, false);

// 页面显示的时候再计算一次   难道切换窗口之后再切换来窗口大小会变?....
window.addEventListener('pageshow', (e) => {
  if (e.persisted) { dbcRefresh(); }
}, false);

refreshRem();

remCalc.refreshRem = refreshRem;
/**
 * rem转px
 */
remCalc.rem2px = (d) => {
  let val = parseFloat(d) * this.rem;
  if (typeof d === 'string' && d.match(/rem$/)) { val += 'px'; }
  return val;
};
/**
 *px转rem 
 */
remCalc.px2rem = (d) => {
  let val = parseFloat(d) / this.rem;
  if (typeof d === 'string' && d.match(/px$/)) { val += 'rem'; }
  return val;
};

window.remCalc = remCalc;
