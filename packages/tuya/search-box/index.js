import SearchBox from './src/search-box.vue';

/* istanbul ignore next */
SearchBox.install = function(Vue) {
  Vue.component(SearchBox.name, SearchBox);
};

export default SearchBox;
