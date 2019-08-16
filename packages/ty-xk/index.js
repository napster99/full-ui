import TyXk from './src/main';

/* istanbul ignore next */
TyXk.install = function(Vue) {
  Vue.component(TyXk.name, TyXk);
};

export default TyXk;
