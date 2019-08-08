<template>
  <div>
    asdfasdf
    <div v-for="(filter, index) in filterOptions" :key="index">
      <template v-if="filter.type === 'input'">
        <el-input v-modal="filterForm[filter.value]" :placeholer="filter.placeholder"></el-input>
      </template>
    </div>
  </div>
</template>

<script>
import * as defOptions from './enum'

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
    initSearchForm() {
      this.filterForm = this.form;
      this.filterOptions = this.options ? this.options : this.setDefOptions();
    },
    setDefOptions() {
      const options = [];
      Object.keys(this.filterForm).forEach(key => {
        const option = defOptions.input;
        options.push(option);
      });
      return options;
    }
  },
  mounted() {
    this.initSearchForm();
  }
};
</script>
