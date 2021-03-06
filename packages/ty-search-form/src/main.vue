<template>
  <div class="ty-search-form">
    <template v-for="(search, index) in searchOptions">
      <el-input
        v-if="search['search-type'] === 'input'"
        :key="index"
        v-bind="getBindSearch(search)"
        v-model="searchForm[search['search-value']]"
        @input="(...args) => handleInput(search, ...args)"
      ></el-input>
      <el-select
        v-else-if="search['search-type'] === 'select'"
        :key="index"
        v-bind="getBindSearch(search)"
        v-model="searchForm[search['search-value']]"
        @change="(...args) => handleSelect(search, ...args)"
      >
        <el-option v-for="option in search.options" :key="option.value" v-bind="option"></el-option>
      </el-select>
      <el-input-number
        v-else-if="search['search-type'] === 'number'"
        :key="index"
        v-bind="getBindSearch(search)"
        v-model="searchForm[search['search-value']]"
        @change="(...args) => handleSelect(search, ...args)"
        >
      </el-input-number>
      <el-time-select
        v-else-if="search['search-type'] === 'timePicker'"
        :key="index"
        v-bind="getBindSearch(search)"
        v-model="searchForm[search['search-value']]"
        @change="(...args) => handleSelect(search, ...args)"
      >
      </el-time-select>
      <el-date-picker
        v-else-if="search['search-type'] === 'datePicker'"
        :key="index"
        v-bind="getBindSearch(search)"
        v-model="searchForm[search['search-value']]"
        @change="(...args) => handleSelect(search, ...args)"
      >
      </el-date-picker>
      <div
        v-else-if="search['search-type'] === 'render'"
        :key="index"
        class="render-search"
      >
        <render-search :render="search['render']"></render-search>
      </div>
      <el-button
        v-else-if="search['search-type'] === 'button'"
        :key="index"
        v-bind="getBindSearch(search)"
        @click="(...args) => handleBtnClick(search, ...args)"
      >
        {{ search['button-text'] }}
      </el-button>
    </template>
    <el-button v-if="!noSearch" size="small" type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
    <el-button v-if="!noReset" size="small" type="warning" @click="handleReset">重置</el-button>
  </div>
</template>

<script>
import * as defOptions from './enum';
import { fistLetterUpper, deepClone } from './utils';

export default {
  name: 'TySearchForm',
  /**
   * @property value 筛选框表单
   * @property options 筛选框配置
   * @property noSearch 不显示搜索按钮
   * @property noReset 不显示重置按钮
   * @property onRender 组件的表单配置加载完毕后的钩子
   - @returns 钩子接受两个参数，表单数据和表单配置
   */
  props: {
    value: {
      required: true,
      type: Object,
      default: {}
    },
    options: {
      required: false,
      type: Array
    },
    noSearch: {
      required: false,
      type: Boolean,
      default: false
    },
    noReset: {
      required: false,
      type: Boolean,
      default: false
    },
    onRender: {
      required: false,
      type: Function,
      default: () => {}
    }
  },
  components: {
    RenderSearch: {
      render(h) {
        const target = this.$parent.$parent;
        return this.$attrs.render.call(target, h);
      }
    }
  },
  data() {
    return {
      searchForm: {},
      searchOptions: [],
      // 首次渲染组件的表单，作为reset时的参照
      resetForm: {}
    };
  },
  methods: {
    /**
     * 获取所有能够传递的props参数
     */
    getBindSearch(search) {
      const bindSearch = deepClone(search);
      delete bindSearch['search-value'];
      delete bindSearch.options;
      delete bindSearch['search-type'];
      return bindSearch;
    },
    /**
     * @description 初始化筛选框
     */
    initSearchForm() {
      this.searchForm = deepClone(this.resetForm);
      this.searchOptions = this.options ? this.assignOptions() : this.setDefOptions();
      this.checkSearchForm();
      this.onRender(this.searchForm, this.searchOptions);
    },
    /**
     * @description 如果没有传入options，默认全部使用input类型的筛选框
     */
    setDefOptions() {
      const options = [];
      Object.keys(this.searchForm).forEach(key => {
        let option = deepClone(defOptions.input());
        option['search-value'] = key;
        options.push(option);
      });
      return options;
    },
    /**
     * @description 将传入的参数配置与默认配置合并
     */
    assignOptions() {
      const options = deepClone(this.options);
      return options.map(option => {
        if (!defOptions[option['search-type']]) {
          return deepClone(Object.assign(defOptions.input(), option));
        }
        return deepClone(Object.assign(defOptions[option['search-type']](), option));
      });
    },
    /**
     * @description 如果传入的form参数不全，但是传入了options，则根据options自动补全
     */
    checkSearchForm() {
      this.searchOptions.forEach(search => {
        !this.searchForm[search['search-value']] ? this.$set(this.searchForm, search['search-value'], '') : '';
      });
    },
    /**
     * @description 搜索事件
     * @emits search 暴露搜索事件
     */
    handleSearch() {
      this.$emit('search', this.emitSearchForm());
    },
    /**
     * @description 重置事件
     * @emits reset 暴露重置事件 @argument 重置之前searchForm快照
     */
    handleReset() {
      const formSnapshoot = deepClone(this.emitSearchForm());
      this.initSearchForm();
      this.handleSearch();
      this.$emit('input', deepClone(this.resetForm));
      this.$emit('reset', deepClone(this.resetForm), formSnapshoot);
    },
    /**
     * @description 输入框事件
     */
    handleInput(search, ...args) {
      const name = fistLetterUpper(search['search-value']);
      this.$emit(`on${name}Change`, ...args);

      // TODO 防抖返回searchForm
      this.searchChange();
    },
    /**
     * @description 选择器选择事件
     */
    handleSelect(search, ...args) {
      const name = fistLetterUpper(search['search-value']);
      this.$emit(`on${name}Change`, ...args);

      this.searchChange();
    },
    /**
     * @description 按钮点击事件
     */
    handleBtnClick(search, ...args) {
      const name = fistLetterUpper(search['search-value']);
      this.$emit(`on${name}Click`, ...args);
    },
    /**
     * @description 过滤器选项有更改时触发
     */
    searchChange() {
      const emitSearchForm = this.emitSearchForm();
      this.$emit('input', emitSearchForm);
      this.$emit('change', emitSearchForm);
    },
    /**
     * @description 为render函数做的兼容，导出的searchForm内容为组件外部的render对象及组件内部对象的合并对象
     */
    emitSearchForm() {
      const searchForm = {};
      this.searchOptions.forEach(option => {
        switch (option['search-type']) {
          case 'render': {
            break;
          }
          case 'button': {
            break;
          }
          default: {
            searchForm[option['search-value']] = this.searchForm[option['search-value']];
            break;
          }
        };
      });
      return Object.assign(this.value, searchForm);
    }
  },
  mounted() {
    this.resetForm = deepClone(this.value);
    this.initSearchForm();
  }
};
</script>
