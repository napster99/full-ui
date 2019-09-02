import TySteps from './src/main';

/* istanbul ignore next */
TySteps.install = function(Vue) {
  Vue.component(TySteps.name, TySteps);
};

export default TySteps;

