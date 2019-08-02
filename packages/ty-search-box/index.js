import TySearchBox from './src/main';

/* istanbul ignore next */
TySearchBox.install = function(Vue) {
  Vue.component(TySearchBox.name, TySearchBox);
};

export default TySearchBox;
