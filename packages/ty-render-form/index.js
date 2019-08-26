import TyRenderForm from '@tuya-fe/ty-render-form';

/* istanbul ignore next */
TyRenderForm.install = function(Vue) {
  Vue.component(TyRenderForm.name, TyRenderForm);
};

export default TyRenderForm;
