/*
 * @Description: 组件的节流处理
 * @Author: vins
 * @Email: vins@tuya.com
 * @Date: 2019-07-26 10:46:05
 * @Lasteditors: vins
 */

import throttle from 'throttle-debounce/throttle';
import { typeis } from 'full-ui/src/utils/util';
import { on, off } from 'full-ui/src/utils/dom';

export { throttle };

// 节流的默认配置
let throttleOption = {
  delay: 1000, // 节流的延迟时间
  noTrailing: false // 在最后一次调用时是否执行 callback，true 不执行，false 执行
};

/**
 * @description: 给vode节流化处理
 * @param {type}
 *    vnode: vue vnode
 *    event: 节流处理的事件名称
 *    fn: 节流的函数
 *    delay: 延迟的时间(ms)
 *    noTrailing: 在最后一次调用时是否执行 callback，true 不执行，false 执行
 * @return: void
 */
function throttleVnode(vnode, event, fn, delay, noTrailing) {
  let throttleDelay =
    typeof delay === 'undefined' ? throttleOption.delay : delay;
  let throttleNoTrailing =
    typeof noTrailing === 'undefined' ? throttleOption.noTrailing : noTrailing;
  // 如果有节流的函数，就不拦截组件上定义的函数
  if (typeis(fn, 'function')) {
    if (vnode.componentInstance) {
      let newfn = throttle(throttleDelay, throttleNoTrailing, fn);
      vnode.componentInstance.$on(event, newfn);
    } else {
      let newfn = throttle(throttleDelay, throttleNoTrailing, fn);
      on(vnode.elm, event, newfn);
    }
    return false;
  }
  if (vnode.componentInstance) {
    // 自定义组件
    if (typeis(event, 'string')) {
      let oldfns = vnode.componentInstance.$listeners[event].fns;
      if (typeis(oldfns, 'array')) {
        // 事件解绑
        vnode.componentInstance.$off(event);
        // 事件的节流重新绑定
        oldfns.forEach(fn => {
          // 过滤掉非用户绑定的事件，例如v-model指令，vue会自动绑定的change或者input事件
          if (fn.name && fn.name.indexOf('bound ') > -1) {
            let newfn = throttle(throttleDelay, throttleNoTrailing, fn);
            vnode.componentInstance.$on(event, newfn);
          } else {
            vnode.componentInstance.$on(event, fn);
          }
        });
      } else if (typeis(oldfns, 'function')) {
        if (oldfns.name && oldfns.name.indexOf('bound ') > -1) {
          vnode.componentInstance.$off(event);
          let newfn = throttle(throttleDelay, throttleNoTrailing, oldfns);
          vnode.componentInstance.$on(event, newfn);
        }
      }
    }
  } else {
    // 原生标签元素
    if (typeis(event, 'string')) {
      let oldfns = vnode.data.on[event].fns;
      // 移除原始的事件监听
      off(vnode.elm, event, vnode.data.on[event]._withTask);
      if (typeis(oldfns, 'array')) {
        oldfns.forEach((fn, index) => {
          // 过滤掉非用户绑定的事件，例如v-model指令，vue会自动绑定的change或者input事件
          if (fn.name && fn.name.indexOf('bound ') > -1) {
            let newfn = throttle(throttleDelay, throttleNoTrailing, fn);
            on(vnode.elm, event, newfn);
          } else {
            on(vnode.elm, event, fn);
          }
        });
      } else if (typeis(oldfns, 'function')) {
        if (oldfns.name && oldfns.name.indexOf('bound ') > -1) {
          off(vnode.elm, event, vnode.data.on[event]._withTask);
          let newfn = throttle(throttleDelay, throttleNoTrailing, oldfns);
          on(vnode.elm, event, newfn);
        }
      }
    }
  }
}

/**
 * @description: 自定义的格式化输入框内容的指令
 * @param {type} eg: v-throttle:event.noTrailing.delay=value
 *    - @required event: 要节流处理的时间名称事件名称
 *    - noTrailing: 在最后一次调用时是否执行 callback，true 不执行，false 执行
 *    - delay: 延迟的时间(ms)
 *    - value: 节流事件的回调函数
 * @return: void
 */
export default {
  bind(el, binding, vnode) {
    // 格式化正则或者函数构建
    const event = binding.arg;
    if (!event) {
      throw new Error('缺少要处理的事件名称参数，格式: v-throttle:event');
    }
    let bindHandle = binding.value; // 绑定的事件回调
    let delay, noTrailing;
    if (binding.modifiers) {
      let modifiers = Object.keys(binding.modifiers);
      modifiers.length > 0 &&
        modifiers.forEach(k => {
          if (k === 'noTrailing') {
            noTrailing = true;
            return;
          }
          if (!isNaN(k)) {
            delay = Number(k);
          } else {
            console.warn(
              `delay: ${k} 不符合规范，将使用默认的延迟时间：${
                throttleOption.delay
              }`
            );
          }
        });
    }

    throttleVnode(vnode, event, bindHandle, delay, noTrailing);
  },
  setThrottleOption(option) {
    throttleOption = Object.assign(throttleOption, option);
  }
};
