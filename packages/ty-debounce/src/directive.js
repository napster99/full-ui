/*
 * @Description: 组件的防抖处理
 * @Author: vins
 * @Email: vins@tuya.com
 * @Date: 2019-07-16 10:46:05
 * @Lasteditors: vins
 */

import debounce from 'throttle-debounce/debounce';
import { typeis } from 'full-ui/src/utils/util';
import { on, off } from 'full-ui/src/utils/dom';

export { debounce };

// 防抖的默认配置
let debounceOption = {
  delay: 1000, // 防抖的延迟时间
  im: false // 是否立即执行
};

/**
 * @description: 给vode防抖化处理
 * @param {type}
 *    vnode: vue vnode
 *    event: 防抖处理的事件名称
 *    fn: 防抖的函数
 *    delay: 延迟的时间(ms)
 *    im: 是否立即执行
 * @return: void
 */
function debounceVnode(vnode, event, fn, delay, im) {
  let debounceDelay =
    typeof delay === 'undefined' ? debounceOption.delay : delay;
  let debounceIm = typeof im === 'undefined' ? debounceOption.im : im;
  // 如果有防抖的函数，就不拦截组件上定义的函数
  if (typeis(fn, 'function')) {
    if (vnode.componentInstance) {
      let newfn = debounce(debounceDelay, debounceIm, fn);
      vnode.componentInstance.$on(event, newfn);
    } else {
      let newfn = debounce(debounceDelay, debounceIm, fn);
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
            let newfn = debounce(debounceDelay, debounceIm, fn);
            vnode.componentInstance.$on(event, newfn);
          } else {
            vnode.componentInstance.$on(event, fn);
          }
        });
      } else if (typeis(oldfns, 'function')) {
        if (oldfns.name && oldfns.name.indexOf('bound ') > -1) {
          vnode.componentInstance.$off(event);
          let newfn = debounce(debounceDelay, debounceIm, oldfns);
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
            let newfn = debounce(debounceDelay, debounceIm, fn);
            on(vnode.elm, event, newfn);
          } else {
            on(vnode.elm, event, fn);
          }
        });
      } else if (typeis(oldfns, 'function')) {
        if (oldfns.name && oldfns.name.indexOf('bound ') > -1) {
          off(vnode.elm, event, vnode.data.on[event]._withTask);
          let newfn = debounce(debounceDelay, debounceIm, oldfns);
          on(vnode.elm, event, newfn);
        }
      }
    }
  }
}

/**
 * @description: 自定义的格式化输入框内容的指令
 * @param {type} eg: v-debounce:event.im.delay=value
 *    - @required event: 要防抖处理的时间名称事件名称
 *    - im: 是否立即执行
 *    - delay: 延迟的时间(ms)
 *    - value: 防抖事件的回调函数
 * @return: void
 */
export default {
  bind(el, binding, vnode) {
    // 格式化正则或者函数构建
    const event = binding.arg;
    if (!event) {
      throw new Error('缺少要处理的事件名称参数，格式: v-debounce:event');
    }
    let bindHandle = binding.value; // 绑定的事件回调
    let delay;
    let im;
    if (binding.modifiers) {
      let modifiers = Object.keys(binding.modifiers);
      modifiers.length > 0 &&
        modifiers.forEach(k => {
          if (k === 'im') {
            im = true;
            return;
          }
          if (!isNaN(k)) {
            delay = Number(k);
          } else {
            console.warn(
              `delay: ${k} 不符合规范，将使用默认的延迟时间：${
                debounceOption.delay
              }`
            );
          }
        });
    }

    debounceVnode(vnode, event, bindHandle, delay, im);
  },
  setDebounceOption(option) {
    debounceOption = Object.assign(debounceOption, option);
  }
};
