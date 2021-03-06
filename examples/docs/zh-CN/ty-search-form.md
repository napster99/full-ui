## TySearchForm 筛选栏

通过简单的配置生成用于表格数据的筛选展示。

### 安装

```shell
yarn add @tuya-fe/ty-search-form
```

### 基础用法

传入form生成两个input输入框。

:::demo
```html
<ty-search-form v-model="searchForm" @search="handleSearch" @change="handleChange"></ty-search-form>

<script>
export default {
  data() {
    return {
      searchForm: {
        hello: '',
        world: 'world'
      }
    }
  },
  methods: {
    handleSearch() {
      console.log(this.searchForm);
    },
    handleChange() {
      console.log(this.searchForm);
    }
  }
}
</script>
```
:::

### 定制筛选框

传入options生成定制的输入框。

:::demo
```html
<ty-search-form
  v-model="searchForm"
  :options="options"
  @onHelloChange="handleHello"
  @onColorChange="handleColor"
  @change="handleChange"
  @onBtnClick="handleBtn"
  @search="handleSearch"
></ty-search-form>

<script>
export default {
  data() {
    return {
      searchForm: {
        hello: '',
        color: '',
        readNum: 10,
        time: '08:30',
        date: new Date()
      },
      options: [
        {
          'search-type': 'input',
          'search-value': 'hello',
          placeholder: '请输入hello'
        },
        {
          'search-type': 'select',
          'search-value': 'color',
          placeholder: '请选择color',
          style: {
            width: '15em'
          },
          options: [
            {
              value: '#F56C6C',
              label: 'red',
              disabled: true
            },
            {
              value: '#67C23A',
              label: 'green'
            },
            {
              value: '#E6A23C',
              label: 'orange'
            }
          ]
        },
        {
          'search-type': 'number',
          'search-value': 'readNum',
          'step-strictly': true,
          step: 2
        },
        {
          'search-type': 'timePicker',
          'search-value': 'time',
          'picker-options': {
            start: '08:30',
            step: '00:15',
            end: '18:30'
          },
          placeholder: '选择时间'
        },
        {
          'search-type': 'datePicker',
          'search-value': 'date'
        },
        {
          'search-type': 'button',
          'search-value': 'btn',
          'button-text': '自定义按钮'
        }
      ]
    }
  },
  methods: {
    handleChange() {
      console.log(this.searchForm);
    },
    handleHello(val) {
      console.log(val);
    },
    handleColor(val) {
      console.log(val);
    },
    handleBtn(event) {
      console.log(event);
    },
    handleSearch() {
      console.log(this.searchForm);
    }
  }
}
</script>
```
:::

### 联动选择框

联动的选择框，需要对组件内部状态做一些干预。

:::demo
```html
<ty-search-form
  v-model="searchForm"
  :options="options"
  :on-render="onRender"
  @onProvinceChange="handleProvince"
  @onCityChange="handleCity"
  @search="handleSearch"
  @reset="handleReset"
></ty-search-form>

<script>
const provinceOpt = [
  {
    value: 0,
    label: '浙江省'
  },
  {
    value: 1,
    label: '广东省'
  }
]
const cityOpt = [
  {
    value: 0,
    label: '杭州市',
    provinceId: 0
  },
  {
    value: 1,
    label: '宁波市',
    provinceId: 0
  },
  {
    value: 2,
    label: '广州市',
    provinceId: 1
  },
  {
    value: 3,
    label: '深圳市',
    provinceId: 1,
    disabled: true
  }
]
export default {
  data() {
    return {
      // 传入了options的情况下，searchForm会自动补全表单字段
      searchForm: {},
      options: [
        {
          'search-type': 'select',
          'search-value': 'province',
          placeholder: '请选择省',
          options: []
        },
        {
          'search-type': 'select',
          'search-value': 'city',
          placeholder: '请选择市',
          options: []
        }
      ],
      // ty-search-form组件内部的钩子
      renderForm: {}
    }
  },
  methods: {
    handleSearch(form) {
      console.log(form);
    },
    onRender(form, options) {
      this.renderForm = { form, options };
    },
    handleReset(form, preForm) {
      console.log('重置后的表单::', form);
      console.log('重置之前的表单快照::', preForm);
      this.setProvinceOpt();
    },
    setProvinceOpt() {
      // 赋值省下拉选框
      this.renderForm.options.forEach(item => {
        if (item['search-value'] === 'province') {
          this.$set(item, 'options', provinceOpt);
        }
      });
    },
    setCityOpt(provinceId) {
      const filterCityOpt = cityOpt.filter(item => item.provinceId === provinceId);
      // 赋值市下拉选框
      this.renderForm.options.forEach(item => {
        if (item['search-value'] === 'city') {
          this.$set(item, 'options', filterCityOpt);
        }
      });
    },
    handleProvince(val) {
      this.renderForm.form.city = '';
      this.setCityOpt(val);
    },
    handleCity(val) {
      console.log(val);
    }
  },
  mounted() {
    this.setProvinceOpt();
  }
}
</script>
```
:::

### 使用render组件

如果现有的配置无法满足需求，也可以使用render组件，缺点是render的输入框数据变更时，ty-search-form无法暴露@change钩子，需要自己定义。

:::demo
```html
<ty-search-form
  v-model="searchForm"
  :options="options"
  @search="handleSearch"
  @change="handleChange"
  @reset="handleReset"
></ty-search-form>

<script>
export default {
  data() {
    return {
      searchForm: {
        input: '这不是 render input',
        renderSelect: '',
        renderInput: '',
      },
      options: [
        {
          'search-type': 'input',
          'search-value': 'input',
          style: {
            width: '14em'
          }
        },
        {
          'search-type': 'render',
          render: function(h) {
            const options = [
              { value: 'option1', label: '选项1' },
              { value: 'option2', label: '选项2' }
            ];

            return (
              <el-select 
                value={this.searchForm.renderSelect} 
                onChange={val => this.searchForm.renderSelect = val} 
                style="width: 12em;" 
                size="small" 
                placeholder="这是一个render select"
              >
                { options.map(option => (<el-option value={option.value} label={option.label}></el-option>)) }
              </el-select>
            );
          }
        },
        {
          'search-type': 'render',
          render: function(h) {
            return (
              <el-input
                value={this.searchForm.renderInput}
                onInput={val => this.searchForm.renderInput = val}
                style="width: 12em;"
                size="small"
                placeholder="这是一个render input"
              ></el-input>
            );
          }
        }
      ]
    }
  },
  methods: {
    handleSearch() {
      console.log(this.searchForm);
    },
    handleReset(form, preForm) {
      console.log('重置后的表单::', form);
      console.log('重置之前的表单快照::', preForm);
    },
    handleChange(val) {
      console.log(val);
    }
  }
}
</script>
```
:::

### Attributes
| 参数                  | 说明                                      | 类型                        | 可选值  | 默认值 |
| --------------------- | ---------------------------------------- | --------------------------- | ---- | ----- |
| v-model                  | 筛选数据，对象的每一个key对应一个筛选框的v-model(当options已设置时，可不传对应的key值) | object                       | —    | —     |
| options               | 筛选框配置，每一项对应一个筛选框的配置，配置项说明：{ search-type, search-value, button-text, options, ...args} `'search-type'`表示筛选框的类型，可选[`input`,`select`,`number`,`timePicker`,`datePicker`,`button`, `render`]；`search-value`表示筛选框对应的v-model名称；`options`在`search-type="select"`时有效，表示选择器的选项；`button-text`在`search-type="button"`时有效，表示按钮的文案；`args`表示更多其他配置，这些配置会传递到基本组件里面，如`placeholder="hello_world"`会给筛选框设置一个灰色提示；`render`在`search-type="render"`时有效，注入一个render函数 | array | —    | — |
| no-search              | 不展示搜索按钮                              | boolean                    | true/false | false |
| no-reset               | 不展示重置按钮                              | boolean                    | true/false | false |
| on-render              | 组件数据渲染后的钩子，钩子接受两个参数，表单数据和表单配置| function             | —        | —    |

### Events
| 事件名称           | 说明                                         | 回调参数                                     |
| -------------- | -------------------------------------------    | ---------------------------------------- |
| search         | 点击搜索按钮                                     | form，当前searchForm数据  |
| change         | 筛选框变更事件，某一个筛选框变化时触发               | form，当前searchForm数据 |
| reset          | 点击重置按钮                                     | [form, preForm]，当前searchForm数据，重置之前的数据快照 |
| on[key]Change  | 具体的某个筛选框修改的回调，key是该筛选框的v-model名称 | value，当前筛选框更改的数据 |
| on[key]Click   | 具体的某个自定义按钮点击的回调，key是该按钮的标识      | event |
