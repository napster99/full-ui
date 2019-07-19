import Searchform from './src/main';

/* istanbul ignore next */
Searchform.install = function(Vue) {
  Vue.component(Searchform.name, Searchform);
};

export default Searchform;
