import TySearchList from './src/main';

/* istanbul ignore next */
TySearchList.install = function(Vue) {
  Vue.component(TySearchList.name, TySearchList);
};

export default TySearchList;
