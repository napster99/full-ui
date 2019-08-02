import directive, { debounce } from './src/directive.js';
import TyDebounce from './src/main.vue';
import Vue from 'vue';

TyDebounce.install = function(
  Vue,
  opts = {
    isRegisterFunction: true, // 是否注册全局方法
    isRegisterComponent: true // 是否组册全局组件
  }
) {
  // 设置默认的防抖配置
  directive.setDebounceOption(opts);
  // 注册全局指令
  Vue.directive('debounce', directive);
  // 注册全局函数
  if (opts.isRegisterFunction !== false) {
    Vue.prototype.$debounce = debounce;
  }
  // 注册全局组件
  if (opts.isRegisterComponent !== false) {
    Vue.component(TyDebounce.name, TyDebounce);
  }
};

// 暴露默认配置的更改方式
TyDebounce.setDebounceOption = function(opts) {
  directive.setDebounceOption(opts);
};

Vue.use(TyDebounce, {
  delay: 200,
  im: false
});

export default TyDebounce;
