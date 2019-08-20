import TySearchForm from './src/main';
// import TySearchForm from '@tuya-fe/ty-search-form';

/* istanbul ignore next */
TySearchForm.install = function(Vue) {
  Vue.component(TySearchForm.name, TySearchForm);
};

export default TySearchForm;
