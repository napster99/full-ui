import TyZsy from '@tuya-fe/ty-zsy';

/* istanbul ignore next */
TyZsy.install = function(Vue) {
  Vue.component(TyZsy.name, TyZsy);
};

export default TyZsy;
