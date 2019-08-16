import TyInput from './src/main';

/* istanbul ignore next */
TyInput.install = function(Vue) {
  Vue.component(TyInput.name, TyInput);
};

export default TyInput;
