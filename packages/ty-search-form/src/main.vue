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
import Vue from 'vue';
import * as defOptions from './enum';
import { fistLetterUpper, deepClone } from './utils';

export default {
  name: 'TySearchForm',
  /**
   * @property form 筛选框表单
   * @property options 筛选框配置
   * @property noSearch 不显示搜索按钮
   * @property noReset 不显示重置按钮
   */
  props: {
    form: {
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
    }
  },
  components: {
    RenderSearch: {
      render(h) {
        return this.$attrs.render.call(this, h);
      }
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
      this.searchForm = deepClone(this.form);
      this.searchOptions = this.options ? this.assignOptions() : this.setDefOptions();
      // this.checkRenderSearch();
      this.checkSearchForm();
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
     * @description 如果配置中存在render函数，需要注册
     */
    checkRenderSearch() {
      this.searchOptions.forEach(search => {
        if (search['search-value'] === 'render') {
          this.newRenderComp(search['render-name'], search['render-fn']);
        }
      });
    },
    /**
     * @description 注册render函数
     */
    newRenderComp(name, renderFn) {
      Vue.component(name, {
        render: renderFn
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
      this.$emit(`on${name}Click`, this.searchForm, ...args);
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
