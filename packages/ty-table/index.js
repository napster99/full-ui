import TyTable from './src/main';

/* istanbul ignore next */
TyTable.install = function(Vue) {
  Vue.component(TyTable.name, TyTable);
};

export default TyTable;
