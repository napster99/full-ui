<!--
 * @Description: 列表数据过滤输入form组件
 * @Author: vins
 * @Email: vins@tuya.com
 * @Date: 2019-07-05 15:57:14
 * @Lasteditors: vins
 -->

<template>
  <div class="ui-from" :class="{active: isActive}">
    <el-form
      class="form"
      :model="formValueMap"
      :inline="true"
      @submit.native.prevent
      :label-width="options.labelWidth">
      <div class="search-filter">
        <el-row ref="jSearchFilter">
          <el-form-item
            v-for="item in filteredFormList"
            :label="item.label"
            :prop="item.key"
            :rules="item.rules"
            :key="item.key || item.label">
            <!-- 基础输入框 -->
            <el-input
              v-if="['input', 'textarea', 'email', 'password', 'search', 'number', 'tel'].includes(item.type)"
              v-model="formValueMap[item.key]"
              v-on="item.events"
              v-bind="item._formatBind">
            </el-input>
            <!-- 远程搜索输入框 -->
            <el-autocomplete
              v-if="item.type === 'remoteinput'"
              v-model="formValueMap[item.key]"
              :fetch-suggestions="item.remoteMethod"
              :placeholder="item.placeholder"
              @select="item.onSelect || noop"
            ></el-autocomplete>
            <!-- 单选框 -->
            <el-radio-group
              v-if="item.type === 'radio'"
              v-model="formValueMap[item.key]"
              :disabled="!!item.disabled"
              @change="item.change || noop">
              <!-- value字段赋值给label，保证数据结构的统一，label：显示，value：真实值 -->
              <template v-for="radio in item.options">
                <!-- 对象数组格式 -->
                <el-radio
                  v-if="radio.label"
                  :name="radio.name"
                  :label="radio.value || radio.label"
                  :disabled="!!radio.disabled"
                  :key="radio.value || radio.label"
                  @change="radio.change || noop">{{ radio.label }}</el-radio>
                <!-- 字符串格式 -->
                <el-radio
                  v-else
                  :label="radio"
                  :key="radio"></el-radio>
              </template>
            </el-radio-group>
            <!-- 复选框 -->
            <el-checkbox-group
              v-if="item.type === 'checkbox'"
              v-model="formValueMap[item.key]"
              :disabled="!!item.disabled"
              @change="item.change || noop">
              <template v-for="checkbox in item.options">
                <!-- 对象数组格式 -->
                <el-checkbox
                  v-if="checkbox.label"
                  :name="checkbox.name"
                  :label="checkbox.value || checkbox.label"
                  :disabled="!!checkbox.disabled"
                  :key="checkbox.value"
                  @change="checkbox.change || noop">{{ checkbox.label }}</el-checkbox>
                <!-- 字符串格式 -->
                <el-checkbox
                  v-else
                  :label="checkbox"
                  :key="checkbox"></el-checkbox>
              </template>
            </el-checkbox-group>
            <!-- 选择框 -->
            <el-select
              v-if="item.type === 'select'"
              v-model="formValueMap[item.key]"
              v-on="item.events"
              v-bind="item._formatBind">
              <el-option
                v-for="option in item.options"
                :label="option.label"
                :value="option.value"
                :disabled="!!option.disabled"
                :key="option.value"></el-option>
            </el-select>
            <!-- 分组选择框 -->
            <el-select
              v-if="item.type === 'selectgroup'"
              v-model="formValueMap[item.key]"
              v-on="item.events"
              v-bind="item._formatBind">
              <el-option-group
                v-for="group in item.groups"
                :key="group.label"
                :label="group.label">
                <el-option
                  v-for="option in group.options"
                  :label="option.label"
                  :value="option.value"
                  :disabled="!!option.disabled"
                  :key="option.value"></el-option>
              </el-option-group>
            </el-select>
            <!-- 集联选择 -->
            <el-cascader
              v-if="item.type === 'cascader'"
              v-model="formValueMap[item.key]"
              :options="item.options"
              change-on-select></el-cascader>
            <!-- 时间选择器 tag: el-time-select的type类型不能存在，否则不能显示输入的值-->
            <el-time-select
              v-if="item.type === 'time'"
              v-model="formValueMap[item.key]"
              v-on="item.events"
              v-bind="item._formatBind"
              :type="undefined"></el-time-select>
            <!-- 时间选择器 -->
            <el-time-picker
              v-if="item.type === 'timepicker'"
              v-model="formValueMap[item.key]"
              v-on="item.events"
              v-bind="item._formatBind"></el-time-picker>
            <!-- 日期选择 -->
            <el-date-picker
              v-if="['year', 'month', 'date', 'dates', 'week', 'datetime', 'datetimerange', 'daterange', 'monthrange'].includes(item.type)"
              v-model="formValueMap[item.key]"
              v-on="item.events"
              v-bind="item._formatBind"></el-date-picker>
          </el-form-item>
        </el-row>
      </div>
      <div class="search-op">
        <slot class="other" name="op"></slot>
        <el-form-item>
          <el-button type="primary" @click="handleSearch" icon="el-icon-search">搜索</el-button>
        </el-form-item>
        <el-form-item v-show="isVisible">
          <el-tooltip content="展开/隐藏搜索选项" placement="top" :open-delay="1000">
            <el-button class="btn-toggle" @click="handleToggleSearch">
              <i class="el-icon-arrow-down"></i>
            </el-button>
          </el-tooltip>
        </el-form-item>
        <!-- <el-form-item>
          <ty-header-select
            @change="handleHeaderChange"
            :list="$props.tableHeader"
            storage="searchBox"
          >
          </ty-header-select>
        </el-form-item>-->
      </div>
    </el-form>
  </div>
</template>

<script>
// import TyHeaderSelect from '~/components/common/table/header-select';
import event from 'element-ui/src/utils/event';
import throttle from 'throttle-debounce/throttle';

export default {
  name: 'TySearchBox',
  data() {
    return {
      formValueMap: {},
      isActive: false,
      isVisible: false
    };
  },
  props: {
    formList: {
      required: true,
      type: Array,
      default() {
        // 表单列表 对象数组
        return [];
      }
    },
    options: {
      type: Object,
      default() {
        return {
          labelWidth: '100px'
        };
      }
    },
    tableHeader: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  computed: {
    filteredFormList() {
      // 过滤掉key值为空的项
      return this.formList.filter((item) => {
        if (item.key && !item._isFormatBind) {
          // 过滤掉不需要bind的数据，并添加是否已过滤的标识
          item._formatBind = this.formatBindData(item);
          item._isFormatBind = true;
        }
        return !!item.key;
      });
    }
  },
  created() {
    let val = Object.create(null);
    this.filteredFormList.forEach(item => {
      val[item.key] = item.defaultValue;
    });
    this.formValueMap = val;
  },
  mounted() {
    this.checkToggle();
    this.handleResize = throttle(100, this.checkToggle);
    event.on(window, 'resize', this.handleResize);
  },
  methods: {
    noop() {},
    // 格式化v-bind的数据格式
    formatBindData(obj) {
      let formatObj = {};
      for (let k in obj) {
        if (!['events', 'label', 'rules', 'value'].includes(k)) {
          formatObj[k] = obj[k];
        }
      }
      return formatObj;
    },
    checkToggle() {
      let height = parseInt(this.getStyle(this.$refs.jSearchFilter.$el).height, 10);
      if (height > 47 * 2) {
        this.isVisible = true;
      } else {
        this.isVisible = false;
      }
    },
    getStyle(el) {
      var oStyle = el.currentStyle
        ? el.currentStyle
        : window.getComputedStyle(el, null);
      return oStyle;
    },
    handleToggleSearch() {
      this.isActive = !this.isActive;
    },
    handleSearch() {
      this.$emit('search', this.formValueMap);
    },
    handleHeaderChange(val) {
      this.$emit('headerChange', val);
    }
  },
  //   components: {
  //     TyHeaderSelect
  //   },
  destroyed() {
    event.off(window, 'resize', this.handleResize);
  }
};
</script>
<style lang="scss">
.ui-from {
  &.active {
    max-height: 1000px;
    .search-filter {
      max-height: 1000px;
    }
    .search-op {
      .btn-toggle {
        .el-icon-arrow-down {
          transform: rotate(180deg);
        }
      }
    }
  }
  .search-filter {
    max-height: 57px;
    overflow: hidden;
    transition: all 0.3s ease;
    .el-form-item {
      .el-form-item__label {
        height: 47px;
        overflow: hidden;
      }
      .el-input,
      .el-date-editor {
        width: 235px;
      }
    }
  }
  .search-op {
    text-align: right;
    .btn-toggle {
      .el-icon-arrow-down {
        transition: all 0.3s ease;
      }
    }
  }
}
</style>

