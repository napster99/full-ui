<!--
 * @Description: 列表数据过滤输入form组件
 * @Author: vins
 * @Email: vins@tuya.com
 * @Date: 2019-07-05 15:57:14
 * @Lasteditors: vins
 -->

<template>
  <div
    :class="{active: isActive}"
    class="ui-from"
  >
    <el-form
      :inline="true"
      :label-width="options.labelWidth"
      :model="formValueMap"
      @submit.native.prevent
      class="form"
    >
      <div class="search-filter">
        <el-row ref="jSearchFilter">
          <el-form-item
            :key="item.key || item.label"
            :label="item.label"
            :prop="item.key"
            :rules="item.rules"
            v-for="item in filteredFormList"
          >
            <!-- 基础输入框 -->
            <el-input
              v-bind="item._formatBind"
              v-if="['input', 'textarea', 'email', 'password', 'search', 'number', 'tel'].includes(item.type)"
              v-model="formValueMap[item.key]"
              v-on="item.events"
            ></el-input>
            <!-- 远程搜索输入框 -->
            <el-autocomplete
              :fetch-suggestions="item.remoteMethod"
              :placeholder="item.placeholder"
              @select="item.onSelect || noop"
              v-if="item.type === 'remoteinput'"
              v-model="formValueMap[item.key]"
            ></el-autocomplete>
            <!-- 单选框 -->
            <el-radio-group
              :disabled="!!item.disabled"
              @change="item.change || noop"
              v-if="item.type === 'radio'"
              v-model="formValueMap[item.key]"
            >
              <!-- value字段赋值给label，保证数据结构的统一，label：显示，value：真实值 -->
              <template v-for="radio in item.options">
                <!-- 对象数组格式 -->
                <el-radio
                  :disabled="!!radio.disabled"
                  :key="radio.value || radio.label"
                  :label="radio.value || radio.label"
                  :name="radio.name"
                  @change="radio.change || noop"
                  v-if="radio.label"
                >{{ radio.label }}</el-radio>
                <!-- 字符串格式 -->
                <el-radio
                  :key="radio"
                  :label="radio"
                  v-else
                ></el-radio>
              </template>
            </el-radio-group>
            <!-- 复选框 -->
            <el-checkbox-group
              :disabled="!!item.disabled"
              @change="item.change || noop"
              v-if="item.type === 'checkbox'"
              v-model="formValueMap[item.key]"
            >
              <template v-for="checkbox in item.options">
                <!-- 对象数组格式 -->
                <el-checkbox
                  :disabled="!!checkbox.disabled"
                  :key="checkbox.value"
                  :label="checkbox.value || checkbox.label"
                  :name="checkbox.name"
                  @change="checkbox.change || noop"
                  v-if="checkbox.label"
                >{{ checkbox.label }}</el-checkbox>
                <!-- 字符串格式 -->
                <el-checkbox
                  :key="checkbox"
                  :label="checkbox"
                  v-else
                ></el-checkbox>
              </template>
            </el-checkbox-group>
            <!-- 选择框 -->
            <el-select
              v-bind="item._formatBind"
              v-if="item.type === 'select'"
              v-model="formValueMap[item.key]"
              v-on="item.events"
            >
              <el-option
                :disabled="!!option.disabled"
                :key="option.value"
                :label="option.label"
                :value="option.value"
                v-for="option in item.options"
              ></el-option>
            </el-select>
            <!-- 分组选择框 -->
            <el-select
              v-bind="item._formatBind"
              v-if="item.type === 'selectgroup'"
              v-model="formValueMap[item.key]"
              v-on="item.events"
            >
              <el-option-group
                :key="group.label"
                :label="group.label"
                v-for="group in item.groups"
              >
                <el-option
                  :disabled="!!option.disabled"
                  :key="option.value"
                  :label="option.label"
                  :value="option.value"
                  v-for="option in group.options"
                ></el-option>
              </el-option-group>
            </el-select>
            <!-- 集联选择 -->
            <el-cascader
              :options="item.options"
              change-on-select
              v-if="item.type === 'cascader'"
              v-model="formValueMap[item.key]"
            ></el-cascader>
            <!-- 时间选择器 tag: el-time-select的type类型不能存在，否则不能显示输入的值-->
            <el-time-select
              :type="undefined"
              v-bind="item._formatBind"
              v-if="item.type === 'time'"
              v-model="formValueMap[item.key]"
              v-on="item.events"
            ></el-time-select>
            <!-- 时间选择器 -->
            <el-time-picker
              v-bind="item._formatBind"
              v-if="item.type === 'timepicker'"
              v-model="formValueMap[item.key]"
              v-on="item.events"
            ></el-time-picker>
            <!-- 日期选择 -->
            <el-date-picker
              v-bind="item._formatBind"
              v-if="['year', 'month', 'date', 'dates', 'week', 'datetime', 'datetimerange', 'daterange', 'monthrange'].includes(item.type)"
              v-model="formValueMap[item.key]"
              v-on="item.events"
            ></el-date-picker>
            <!-- 自定义组件 -->
            <render-component
              :render="item.render"
              v-if="item.render"
            ></render-component>
          </el-form-item>
        </el-row>
      </div>
      <div class="search-op">
        <slot
          class="other"
          name="op"
        ></slot>
        <el-form-item>
          <el-button
            @click="handleSearch"
            icon="el-icon-search"
            type="primary"
          >搜索</el-button>
        </el-form-item>
        <el-form-item v-show="isVisible">
          <el-tooltip
            :open-delay="1000"
            content="展开/隐藏搜索选项"
            placement="top"
          >
            <el-button
              @click="handleToggleSearch"
              class="btn-toggle"
            >
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
import event from 'full-ui/src/utils/event';
import throttle from 'throttle-debounce/throttle';

// 使用render方法渲染自定义的组件
const RenderComponent = {
  name: 'RenderComponent',
  props: {
    render: Function
  },
  render(h) {
    let parent = this;
    // 绑定渲染函数的this值为ty-search-box组件所在的上下文
    while (parent) {
      if (parent.$options._componentTag === 'ty-search-box') {
        parent = parent.$vnode.context;
        break;
      } else {
        parent = parent.$parent;
      }
    }
    return this.render.call(parent, h, parent);
  }
};

export default {
  name: 'TySearchBox',
  data() {
    return {
      formValueMap: {},
      isActive: false,
      isVisible: false
    };
  },
  components: {
    RenderComponent
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
      return this.formList.filter(item => {
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
      let height = parseInt(
        this.getStyle(this.$refs.jSearchFilter.$el).height,
        10
      );
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