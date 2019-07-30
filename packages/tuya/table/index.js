import TyTable from './src/table.vue';

/* istanbul ignore next */
TyTable.install = function(Vue) {
  Vue.component(TyTable.name, TyTable);
};

export default TyTable;
