<template>
  <div>
    <template v-for="(filter, index) in filterOptions">
      <template v-if="filter.type === 'input'">
        <el-input
          :key="index"
          v-model="filterForm[filter.value]"
          :placeholder="filter.placeholder"
          :size="filter.size"
          :style="'width:' + filter.width"
          @input="(...args) => handleInput(filter, ...args)"
        ></el-input>
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
      filterForm: {},
      filterOptions: []
    };
  },
  methods: {
    /**
     * @description 初始化筛选框
     */
    initFilterForm() {
      this.filterForm = deepClone(this.form);
      this.filterOptions = this.options ? this.assignOptions() : this.setDefOptions();
    },
    /**
     * @description 如果没有传入options，默认全部使用input类型的筛选框
     */
    setDefOptions() {
      const options = [];
      Object.keys(this.filterForm).forEach(key => {
        let option = deepClone(defOptions.input);
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
            return deepClone(Object.assign(defOptions.input, option));
          }
          case 'select': {
            return deepClone(Object.assign(defOptions.select, option));
          }
          default: {
            return deepClone(Object.assign(defOptions.input, option));
          }
        }
      });
    },
    /**
     * @description 搜索事件
     */
    handleSearch() {
      this.$emit('search', this.filterForm);
    },
    /**
     * @description 重置事件
     */
    handleReset() {
      this.initFilterForm();
      this.handleSearch();
    },
    /**
     * @description 输入框事件
     */
    handleInput(filter, ...args) {
      const name = fistLetterUpper(filter['value']);
      this.$emit(`on${name}`, ...args);

      // TODO 防抖返回filterForm
      this.filterChange();
    },
    /**
     * 过滤器选项有更改时触发
     */
    filterChange() {
      this.$emit('change', this.filterForm);
    }
  },
  mounted() {
    this.initFilterForm();
  }
};
</script>
