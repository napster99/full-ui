// import TyTestProcessZty from './src/main';
import TyTestProcessZty from '@tuya-fe/ty-test-process-zty';

/* istanbul ignore next */
TyTestProcessZty.install = function(Vue) {
  Vue.component(TyTestProcessZty.name, TyTestProcessZty);
};

export default TyTestProcessZty;
