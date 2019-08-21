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
<ty-search-form :form="searchForm" @search="handleSearch" @change="handleChange"></ty-search-form>

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
    handleSearch(searchForm) {
      console.log(searchForm);
    },
    handleChange(searchForm) {
      console.log(searchForm);
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
  :form="searchForm"
  :options="options"
  @onHelloChange="handleHello"
  @onColorChange="handleColor"
  @change="handleChange"
  @onBtnClick="handleBtn"
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
    handleChange(form) {
      console.log(form)
    },
    handleHello(val) {
      console.log(val)
    },
    handleColor(val) {
      console.log(val)
    },
    handleBtn(form, event) {
      console.log(form, event)
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
  ref="linkageRef"
  :form="searchForm"
  :options="options"
  @onProvinceChange="handleProvince"
  @onCityChange="handleCity"
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
      ]
    }
  },
  methods: {
    handleReset(form) {
      console.log('重置之前的表单快照', form);
      this.setProvinceOpt();
    },
    setProvinceOpt() {
      const province = this.$refs['linkageRef'].searchOptions.find(item => item['search-value'] === 'province');
      province ? province.options = provinceOpt : '';
    },
    setCityOpt(provinceId) {
      const city = this.$refs['linkageRef'].searchOptions.find(item => item['search-value'] === 'city');
      city ? city.options = cityOpt.filter(item => item.provinceId === provinceId) : '';
    },
    handleProvince(val) {
      this.$refs['linkageRef'].searchForm.city = '';
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

如果现有的配置无法满足需求，也可以使用render组件，render组件同样需要对组件内部进行一些控制。

:::demo
```html
<ty-search-form
  :form="searchForm"
  :options="options"
  @change="handleChange"
  @reset="handleReset"
></ty-search-form>

<script>
export default {
  data() {
    return {
      // 传入了options的情况下，searchForm会自动补全表单字段
      searchForm: {},
      options: [
        {
          'search-type': 'render',
          'search-value': 'renderSelect',
          render: function(h) {
            const parent = this.$parent;
            const searchForm = parent.searchForm;

            const options = [
              { value: 'option1', label: '选项1' },
              { value: 'option2', label: '选项2' }
            ];

            return (
              <el-select 
                value={searchForm.renderSelect} 
                onChange={(...args) => {
                  searchForm.renderSelect = args[0];
                  parent.handleSelect({'search-value': 'renderSelect'}, ...args);
                }} 
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
          'search-value': 'renderInput',
          render: function(h) {
            const parent = this.$parent;
            const searchForm = parent.searchForm;

            return (
              <el-input
                value={searchForm.renderInput}
                onInput={(...args) => {
                  searchForm.renderInput = args[0];
                  parent.handleInput({'search-value': 'renderInput'}, ...args);
                }}
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
    handleReset(form) {
      console.log('重置之前的表单快照', form);
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
| form                  | 筛选数据，对象的每一个key对应一个筛选框的v-model(当options已设置时，可不传对应的key值) | object                       | —    | —     |
| options               | 筛选框配置，每一项对应一个筛选框的配置，配置项说明：{ search-type, search-value, button-text, options, ...args} `'search-type'`表示筛选框的类型，可选[`input`,`select`,`number`,`timePicker`,`datePicker`,`button`, `render`]；`search-value`表示筛选框对应的v-model名称；`options`在`search-type="select"`时有效，表示选择器的选项；`button-text`在`search-type="button"`时有效，表示按钮的文案；`args`表示更多其他配置，这些配置会传递到基本组件里面，如`placeholder="hello_world"`会给筛选框设置一个灰色提示；`render`在`search-type="render"`时有效，注入一个render函数 | array | —    | — |
| no-search              | 不展示搜索按钮                              | boolean                    | true/false | false |
| no-reset               | 不展示重置按钮                              | boolean                    | true/false | false |

### Events
| 事件名称           | 说明                                         | 回调参数                                     |
| -------------- | -------------------------------------------    | ---------------------------------------- |
| search         | 点击搜索按钮                                     | form，当前searchForm数据  |
| change         | 筛选框变更事件，某一个筛选框变化时触发               | form，当前searchForm数据 |
| reset          | 点击重置按钮                                     | preForm，重置之前的数据快照 |
| on[key]Change  | 具体的某个筛选框修改的回调，key是该筛选框的v-model名称 | value，当前筛选框更改的数据 |
| on[key]Click   | 具体的某个自定义按钮点击的回调，key是该按钮的标识      | 该事件有两个参数：分别是当前searchForm数据和event对象 |
