import directive, { throttle } from './src/directive.js';
import TyThrottle from './src/main.vue';

TyThrottle.install = function(
  Vue,
  opts = {
    isRegisterFunction: true, // 是否注册全局方法
    isRegisterComponent: true // 是否组册全局组件
  }
) {
  // 设置默认的节流配置
  directive.setThrottleOption(opts);
  // 注册全局指令
  Vue.directive('throttle', directive);
  // 注册全局函数
  if (opts.isRegisterFunction !== false) {
    Vue.prototype.$throttle = throttle;
  }
  // 注册全局组件
  if (opts.isRegisterComponent !== false) {
    Vue.component(TyThrottle.name, TyThrottle);
  }
};

// 暴露默认配置的更改方式
TyThrottle.setThrottleOption = function(opts) {
  directive.setThrottleOption(opts);
};

export default TyThrottle;
