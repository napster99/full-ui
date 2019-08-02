## Ty-search-box 通用搜索组合

用在表单的数据筛选上

### 基础用法

:::demo

```html
<template>
  <section class="mod-contract-box">
    <ty-search-box :form-list="formList"></ty-search-box>
  </section>
</template>

<script>
  let _self
  export default {
    data() {
      return {
        formList: Object.freeze([
          {
            type: 'input',
            label: '输入框',
            defaultValue: '',
            key: 'ipt',
            clearable: true,
            rules: [
              { required: true, message: '年龄不能为空', trigger: 'blur' },
              { type: 'string', message: '年龄必须为数字值' },
            ],
            events: {
              change(value) {
                console.log('数据变化', value)
              },
              blur() {
                console.log('失去焦点')
                _self.formList[1].options = [
                  { label: '4', value: '4', text: '展示4' },
                ]
                _self.formList = Object.freeze(
                  Object.assign([], _self.formList)
                )
              },
            },
          },
          {
            type: 'radio',
            label: '单选',
            defaultValue: '2',
            key: 'num',
            options: [
              'vins',
              { label: 'a1', value: '1' },
              { label: 'a2', value: '2' },
              { label: 'a3', value: '3' },
            ],
          },
          {
            type: 'checkbox',
            label: '复选',
            defaultValue: ['2'],
            key: 'checkbox1',
            options: [
              { label: 'a1', value: '1' },
              { label: 'a2', value: '2' },
              { label: 'a3', value: '3' },
            ],
          },
          {
            type: 'checkbox',
            label: '复选2',
            defaultValue: ['2'],
            key: 'checkbox2',
            options: ['1', '2', '3'],
          },
          {
            type: 'remoteinput',
            label: 'remote',
            key: 'remote',
            clearable: true,
            remoteMethod(str, cb) {
              console.log(str)
              let data = [
                { value: '1' },
                { value: '2' },
                { value: '3' },
                { value: '4' },
              ]
              let filterdata = data.filter(i => i.value === str)
              cb(filterdata)
            },
          },
          {
            type: 'select',
            label: 'ty-select',
            key: 'select',
            defaultValue: '2',
            clearable: true,
            multiple: false,
            options: [
              { label: 'select-1', value: '1' },
              { label: 'select-2', value: '2' },
              { label: 'select-3', value: '3' },
            ],
            events: {
              change(value) {
                console.log('数据变化', value)
              },
            },
          },
          {
            type: 'select',
            label: 'ty-select2',
            key: 'select2',
            defaultValue: ['3', '6'],
            clearable: true,
            multiple: true,
            collapseTags: true,
            options: [
              { label: 'select-1', value: '1', disabled: true },
              { label: 'select-2', value: '2' },
              { label: 'select-3', value: '3' },
              { label: 'select-4', value: '4' },
              { label: 'select-5', value: '5' },
              { label: 'select-6', value: '6' },
              { label: 'select-7', value: '7' },
            ],
            events: {
              change(value) {
                console.log('数据变化', value)
              },
            },
          },
          {
            type: 'selectgroup',
            label: '分组下拉选择',
            key: 'select-group',
            groups: [
              {
                label: '热门',
                options: [
                  { label: '北京', value: 'beijing' },
                  { label: '上海', value: 'shanghai' },
                ],
              },
              {
                label: '一般',
                options: [
                  { label: '南京', value: 'nanjing' },
                  { label: '深圳', value: 'shenzhen' },
                ],
              },
            ],
          },
          {
            type: 'time',
            label: '时间',
            key: 'time1',
            clearable: false,
            pickerOptions: {
              start: '08:30',
              step: '00:30',
              end: '12:30',
            },
            placeholder: 'select time',
          },
          {
            type: 'timepicker',
            label: '时间1',
            key: 'timepicker',
            arrowControl: true,
            pickerOptions: {
              selectableRange: '18:30:00 - 20:30:00',
            },
            placeholder: 'select time',
          },
          {
            type: 'timepicker',
            label: '时间范围',
            key: 'timerange',
            arrowControl: true,
            defaultValue: [
              new Date(2016, 9, 10, 8, 40),
              new Date(2016, 9, 10, 9, 40),
            ],
            isRange: true,
            rangeSeparator: '-',
            placeholder: 'select time',
          },
          {
            type: 'date',
            label: '日期',
            key: 'date',
            placeholder: 'select date',
          },
          {
            type: 'week',
            label: '周',
            key: 'week',
            format: 'yyyy - WW',
            placeholder: 'select date',
          },
          {
            type: 'month',
            label: '月',
            key: 'month',
            placeholder: 'select date',
          },
          {
            type: 'year',
            label: '年',
            key: 'year',
            placeholder: 'select date',
          },
          {
            type: 'daterange',
            label: '日期范围',
            key: 'daterange',
            placeholder: 'select date',
          },
          {
            type: 'monthrange',
            label: '月份范围',
            key: 'monthrange',
            placeholder: 'select date',
          },
        ]),
      }
    },
    created() {
      _self = this
    },
    updated() {
      console.log('更新')
    },
    mounted() {},
  }
</script>
```

:::

### search-box Attributes

| 参数     | 说明             | 类型   | 可选值 | 默认值 |
| -------- | ---------------- | ------ | ------ | ------ |
| formList | 每一项的配置文件 | object | —      | —      |

### formList Attributes

:::tip
该组件是对 element UI 的 form 表单的封装，element 表单上支持什么属性，相应的条目类型也支持
:::

| 参数         | 说明                     | 类型               | 可选值                                                                                                                                                                                                               | 默认值 |
| ------------ | ------------------------ | ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| type         | 条目类型                 | string             | input, textarea, email, password, search, number, tel，remoteinput，radio，checkbox，select，selectgroup，cascader，time，timepicker，year, month, date, dates, week, datetime, datetimerange, daterange, monthrange | —      |
| label        | 条目 label               | string             | —                                                                                                                                                                                                                    | false  |
| defaultValue | 默认值                   | -                  | —                                                                                                                                                                                                                    | —      |
| key          | vue 的 key               | string             | —                                                                                                                                                                                                                    | —      |
| placeholder  | placeholder              | string             | —                                                                                                                                                                                                                    | —      |
| rules        | 验证规则                 | string             | —                                                                                                                                                                                                                    | —      |
| events       | 条目监听的事件           | object< function > | —                                                                                                                                                                                                                    | —      |
| options      | 下拉，单选，多选的子元素 | Array              | —                                                                                                                                                                                                                    | —      |

### options Attributes

| 参数     | 说明     | 类型     | 可选值 | 默认值 |
| -------- | -------- | -------- | ------ | ------ |
| label    | label    | string   | —      | —      |
| value    | value    | -        | —      | —      |
| disabled | disabled | string   | —      | —      |
| change   | change   | function | —      | —      |

:::tip
option 也可以是字符串数组，这种情况，该字符串作为 label 和 value 的值
:::
