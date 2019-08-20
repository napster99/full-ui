<template>
  <div>
    <template v-for="(search, index) in searchOptions">
      <template v-if="search.type === 'input'">
        <el-input
          :key="index"
          v-bind="search"
          v-model="searchForm[search.value]"
          @input="(...args) => handleInput(search, ...args)"
        ></el-input>
      </template>
      <template v-else-if="search.type === 'select'">
        <el-select
          :key="index"
          v-bind="search"
          v-model="searchForm[search.value]"
          @change="(...args) => handleSelect(search, ...args)"
        >
          <el-option v-for="option in search.options" :key="option.value" v-bind="option"></el-option>
        </el-select>
      </template>
    </template>
    <el-button size="small" type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
    <el-button size="small" type="warning" @click="handleReset">重置</el-button>
  </div>
</template>

<script>
import * as defOptions from './enum';
import { fistLetterUpper, deepClone } from './utils';

export default {
  name: 'TySearchForm',
  props: {
    form: {
      required: true,
      type: Object,
      default: {}
    },
    options: {
      required: false,
      type: Array
    }
  },
  data() {
    return {
      searchForm: {},
      searchOptions: []
    };
  },
  methods: {
    /**
     * @description 初始化筛选框
     */
    initSearchForm() {
      this.searchForm = deepClone(this.form);
      this.searchOptions = this.options ? this.assignOptions() : this.setDefOptions();
      this.checkSearchForm();
    },
    /**
     * @description 如果没有传入options，默认全部使用input类型的筛选框
     */
    setDefOptions() {
      const options = [];
      Object.keys(this.searchForm).forEach(key => {
        let option = deepClone(defOptions.input());
        option.value = key;
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
        switch (options.type) {
          case 'input': {
            return deepClone(Object.assign(defOptions.input(), option));
          }
          case 'select': {
            return deepClone(Object.assign(defOptions.select(), option));
          }
          default: {
            return deepClone(Object.assign(defOptions.input(), option));
          }
        }
      });
    },
    /**
     * @description 如果传入的form参数不全，但是传入了options，则根据options自动补全
     */
    checkSearchForm() {
      this.searchOptions.forEach(search => {
        !this.searchForm[search.value] ? this.$set(this.searchForm, search.value, '') : '';
      });
    },
    /**
     * @description 搜索事件
     * @emits search 暴露搜索事件
     */
    handleSearch() {
      this.$emit('search', this.searchForm);
    },
    /**
     * @description 重置事件
     * @emits reset 暴露重置事件 @argument 重置之前searchForm快照
     */
    handleReset() {
      const formSnapshoot = deepClone(this.searchForm);
      this.initSearchForm();
      this.handleSearch();
      this.$emit('reset', formSnapshoot);
    },
    /**
     * @description 输入框事件
     */
    handleInput(search, ...args) {
      const name = fistLetterUpper(search['value']);
      this.$emit(`on${name}`, ...args);

      // TODO 防抖返回searchForm
      this.searchChange();
    },
    /**
     * @description 选择器选择事件
     */
    handleSelect(search, ...args) {
      const name = fistLetterUpper(search['value']);
      this.$emit(`on${name}`, ...args);

      this.searchChange();
    },
    /**
     * @description 过滤器选项有更改时触发
     */
    searchChange() {
      this.$emit('change', this.searchForm);
    }
  },
  mounted() {
    this.initSearchForm();
  }
};
</script>
