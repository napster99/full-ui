<template>
  <el-input
    :value="value"
    @blur="value => emitEvent('blur',value)"
    @change="handleChange"
    @focus="value => emitEvent('focus',value)"
    @input="value => emitEvent('input', value)"
    v-bind="$attrs"
  >
    <template slot="prepend">
      <slot name="prepend"></slot>
    </template>
    <template slot="append">
      <el-button
        :data-clipboard-text="value"
        :size="$attrs.size"
        @click="btnFunc"
        class="copy-btn"
        v-if="copyable"
      >
        <slot name="append"></slot>
      </el-button>
      <slot name="append" v-else></slot>
    </template>
  </el-input>
</template>

<script>
import Clipboard from 'clipboard';

const RegExpMap = {
  integer: /^-?\d+$/, // 整数
  positive: /^\d+(?=\.{0,1}\d+$|$)/, // 正数 + 0
  positiveInt: /^(0|[1-9][0-9]*)$/, // 正整数 + 0
  character: /^\w+$/ // 数字、英文字母、下划线
};

export default {
  name: 'TyInput',

  componentName: 'TyInput',

  data() {
    return {};
  },

  props: {
    value: {
      type: String,
      default: ''
    },
    regExpOption: {
      type: Object,
      default: () => ({})
    },
    copyable: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    emitEvent(eventName, value) {
      this.$emit(eventName, value);
    },

    handleChange(value) {
      value = this.checkValue(value);
      value === '' && this.emitEvent('input', value);
      this.emitEvent('change', value);
    },

    checkValue(value) {
      const { type, regExp, message } = this.regExpOption;
      const rule = RegExpMap[type] || regExp;
      if (rule) {
        if (!rule.test(value)) {
          this.$message.error(message || 'Invalid value');
          value = '';
        }
      }
      return value;
    },

    btnFunc() {
      this.copyable && this.copy();
    },

    // 复制功能
    copy() {
      const btnCopy = new Clipboard('.copy-btn');
      btnCopy.on('success', () => {
        this.$message.success('复制成功！');
        btnCopy.destroy();
      });

      // 复制失败后执行的回调函数
      btnCopy.on('error', () => {
        this.$message.error('复制失败！');
        btnCopy.destroy();
      });
    }
  }
};
</script>
