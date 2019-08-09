import TyRenderTable from './src/main';

/* istanbul ignore next */
TyRenderTable.install = function(Vue) {
  Vue.component(TyRenderTable.name, TyRenderTable);
};

export default TyRenderTable;
