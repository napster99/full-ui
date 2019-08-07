import TyInputList from './src/main';

/* istanbul ignore next */
TyInputList.install = function(Vue) {
  Vue.component(TyInputList.name, TyInputList);
};

export default TyInputList;
