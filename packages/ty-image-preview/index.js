import TyImagePreview from '@tuya-fe/ty-image-preview/src/lib/index';

/* istanbul ignore next */
TyImagePreview.install = function(Vue) {
  Vue.component(TyImagePreview.name, TyImagePreview);
};

export default TyImagePreview;
