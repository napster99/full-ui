/*
 * @Description: 输入框内容的格式化
 * @Author: vins
 * @Email: vins@tuya.com
 * @Date: 2019-07-16 10:46:05
 * @Lasteditors: vins
 */

/**
 * 使用注意
 * 该指令会添加相应的事件监听去格式化内容，相应的事件回调的第二个参数
 */

import { on, off } from 'element-ui/src/utils/dom';
import { typeis, isEmptyObject } from 'element-ui/src/utils/util';

/**
 * @description: 自定义的格式化输入框内容的指令
 * @param {type} eg: v-format-input:arg.modifiers=value
 *    - arg: 要格式化的字段，默认为输入框的value值，如果为非value值，则认为取标签上的自定义属性(暂未实现)
 *    - modifiers: 校验时机；目前支持: input、blur、change;支持多个，默认为：blur
 *    - @required value: 分为以下几种类型
 *      - String: 以该string生成正则去格式化
 *      - RegExp: 以该正则去格式化
 *      - Function: 函数，参数为输入值，需要返回一个格式化之后的值，返回falsy，显示为“”
 * @return: void
 */
export default {
  bind(el, binding, vnode) {
    // 要格式化的字段
    let arg = 'value' || binding.arg; // 目前处理输入框的value情况
    let formatReg = ''; // 格式化的正则
    let formatFun; // 格式化的函数
    let oldValue = ''; // 原始值/上一次输入的值，当输入的值不符合规则的时候，回到上一次输入的值
    let _el; // 输入框的element
    // 重新构造的事件处理函数
    let eventsHandle = {
      input: function handleInput() {},
      change: function handleChange() {},
      blur: function handleBlur() {}
    };

    // 格式化修饰符，默认为blur
    let modifiers = isEmptyObject(binding.modifiers)
      ? { blur: true }
      : binding.modifiers;

    // 格式化正则或者函数构建
    const val = binding.value;
    if (!val) {
      throw new Error('v-format-input need a value to format');
    }

    if (typeis(val, 'string')) {
      formatReg = new RegExp(val);
    } else if (typeis(val, 'RegExp')) {
      formatReg = val;
    } else if (typeis(val, 'function')) {
      formatFun = val;
    }

    // dom的寻找
    if (vnode.tag === 'input') {
      // 原生input
      _el = el;
      // 取消监听原本事件
      for (let event in modifiers) {
        off(vnode.elm, event, vnode.data.on[event]._withTask);

        let resetHandle;
        // 获取原本事件，构造回调函数
        let oldfns = vnode.data.on[event].fns;
        if (typeis(oldfns, 'array')) {
          resetHandle = function resetHandle(e, reformat) {
            oldfns.forEach(fn => {
              fn.call(vnode.context, e, reformat);
            });
          };
        } else if (typeis(oldfns, 'function')) {
          resetHandle = function resetHandle(e, reformat) {
            oldfns.call(vnode.context, e, reformat);
          };
        }
        // 根据监听的事件类型，构造相应的回调函数
        eventsHandle[event] = resetHandle;
      }
    } else {
      let resetHandle;
      for (let event in modifiers) {
        // 判断是否含有原生的事件监听，有则清除
        let resetNativeFns = function() {};
        if (vnode.data.on && vnode.data.on[event]) {
          let oldNativeFns = vnode.data.on[event].fns;
          off(vnode.elm, event, vnode.data.on[event]._withTask);
          if (typeis(oldNativeFns, 'array')) {
            resetNativeFns = function resetNativeFns(e, reformat) {
              oldNativeFns.forEach(fn => {
                fn.call(vnode.context, e, reformat);
              });
            };
          } else if (typeis(oldNativeFns, 'function')) {
            resetNativeFns = function resetNativeFns(e, reformat) {
              oldNativeFns.call(vnode.context, e, reformat);
            };
          }
        }

        // 更改 $emit 方式为监听原生事件手动执行
        vnode.componentInstance.$off(event);

        // 获取原本事件，构造回调函数
        let oldfns = vnode.componentInstance.$listeners[event].fns;
        if (typeis(oldfns, 'array')) {
          resetHandle = function resetHandle(e, reformat) {
            oldfns.forEach(fn => {
              fn.call(vnode.context, e.target.value, reformat);
            });
            resetNativeFns.call(vnode.context, e, reformat);
          };
        } else if (typeis(oldfns, 'function')) {
          resetHandle = function resetHandle(e, reformat) {
            oldfns.call(vnode.context, e.target.value, reformat);
            resetNativeFns.call(vnode.context, e, reformat);
          };
        }

        // 根据监听的事件类型，构造相应的回调函数
        eventsHandle[event] = resetHandle;
      }
      _el = vnode.child.getInput();
    }

    // 改变值的函数
    function changeValueHandle(e, eventType) {
      let formatValue = '';
      let reformat; // 是否重新格式化
      if (arg === 'value') {
        formatValue = e.target[arg];
      }
      if (formatReg && formatReg.test(formatValue)) {
        // 重置上一次输入的值
        oldValue = formatValue;
        reformat = false;
      } else {
        if (arg === 'value') {
          if (typeis(formatFun, 'function')) {
            e.target[arg] = formatFun.call(vnode.context, formatValue, e) || '';
          } else {
            e.target[arg] = oldValue;
          }
        }
        reformat = true;
      }

      // 事件手动触发
      eventsHandle[eventType].call(vnode.context, e, reformat);
    }

    // 监听原生事件，并且把事件挂载到当前实例的_formatIntercept中，供外部取消监听和拦截
    // 输入事件
    if (modifiers.input) {
      let formatInput = function formatInput(e) {
        changeValueHandle(e, 'input');
      };
      (vnode.context._formatIntercept = vnode.context._formatIntercept || {})[
        'input'
      ] = formatInput;
      on(_el, 'input', formatInput);
    }
    // 值变化事件
    if (modifiers.change) {
      let formatChange = function formatChange(e) {
        changeValueHandle(e, 'change');
      };
      (vnode.context._formatIntercept = vnode.context._formatIntercept || {})[
        'change'
      ] = formatChange;
      on(_el, 'change', formatChange);
    }
    // 失去焦点事件
    if (modifiers.blur) {
      let formatBlur = function formatBlur(e) {
        changeValueHandle(e, 'blur');
      };
      (vnode.context._formatIntercept = vnode.context._formatIntercept || {})[
        'blur'
      ] = formatBlur;
      on(_el, 'blur', formatBlur);
    }
  }
};
