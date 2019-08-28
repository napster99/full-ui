## ty-render-form

该组件用来渲染大量的form表单，以及表单分组、联合，模型化

### 使用前的准备
```js
import Vue from 'vue'
import TyRenderForm from '@tuya-fe/ty-render-form'

Vue.use(TyRenderForm)
// or
Vue.component(TyRenderForm.name, TyRenderForm)
```

### 简单使用
使用 **form-list** 传入表单列表项，使用 **v-model** 初始化表单值和监听表单的变化

:::demo
```html
<template>
  <ty-render-form :form-list="list" v-model="formValue"></ty-render-form>
</template>

<script>
export default {
  data() {
    return {
      list: Object.freeze([
        {
          label: '输入框',
          key: 'ipt',
          defaultValue: '123',
          clearable: true,
          rules: [
            { required: true, message: '年龄不能为空', trigger: 'blur' },
            { type: 'string', message: '年龄必须为数字值' },
          ],
          on: {
            change(value) {
              console.log('数据变化', value)
            },
          },
        },
        {
          type: 'select',
          label: 'select',
          key: 'select',
          defaultValue: '2',
          clearable: true,
          multiple: false,
          options: [
            { label: 'select-1', value: '1' },
            { label: 'select-2', value: '2' },
            { label: 'select-3', value: '3' },
          ],
          on: {
            change(value) {
              console.log('数据变化', value)
            },
          },
        },
      ]),
      formValue: {
        ipt: '1234',
      },
    }
  }
}
</script>
```
:::

### 表单联动
使用 **ref** 获取表单组件的引用，调用 **setItem** 方法修改表单配置项，还可以使用 **setFormValue** 修改指定表单项的值

:::demo 下拉框的值变化，会同步到输入框，并且输入框不可输入
```html
<template>
  <ty-render-form :form-list="list" v-model="formValue" ref="refForm"></ty-render-form>
</template>

<script>
export default {
  data() {
    return {
      list: Object.freeze([
        {
          label: '输入框',
          key: 'ipt',
          defaultValue: '123',
          clearable: true,
          rules: [
            { required: true, message: '年龄不能为空', trigger: 'blur' },
            { type: 'string', message: '年龄必须为数字值' },
          ],
          on: {
            change(value) {
              console.log('数据变化', value)
            },
          },
        },
        {
          type: 'select',
          label: 'select',
          key: 'select',
          defaultValue: '2',
          clearable: true,
          multiple: false,
          options: [
            { label: 'select-1', value: '1' },
            { label: 'select-2', value: '2' },
            { label: 'select-3', value: '3' },
          ],
          on: {
            // 使用箭头函数绑定当前的this为当前组件
            change: (val) => {
              this.$refs.refForm.setItem('ipt', { value: val, disabled: true })
            },
          },
        },
      ]),
      formValue: {
        ipt: '1234',
      },
    }
  }
}
</script>
```
:::

### 表单前后的插槽
在表单列表选项的 **slot** 字段添加 **before** 和 **after** 添加插槽

:::demo
```html
<template>
  <ty-render-form :form-list="list" v-model="formValue"></ty-render-form>
</template>

<script>
export default {
  data() {
    return {
      list: Object.freeze([
        {
          label: '输入框',
          key: 'ipt',
          defaultValue: '123',
          clearable: true,
          rules: [
            { required: true, message: '年龄不能为空', trigger: 'blur' },
            { type: 'string', message: '年龄必须为数字值' },
          ],
          slot: {
            append: <el-button type="primary" icon="el-icon-search" />,
          },
          on: {
            change(value) {
              console.log('数据变化', value)
            },
          },
        },
        {
          type: 'select',
          label: 'select',
          key: 'select',
          defaultValue: '2',
          clearable: true,
          multiple: false,
          slot: {
            before: <el-tag style="margin-right: 10px;">before 插槽</el-tag>,
            after: <el-button type="primary" style="margin-left: 10px;">after 插槽</el-button>,
          },
          options: [
            { label: 'select-1', value: '1' },
            { label: 'select-2', value: '2' },
            { label: 'select-3', value: '3' },
          ],
          on: {
            change(value) {
              console.log('数据变化', value)
            },
          },
        },
      ]),
      formValue: {
        ipt: '1234',
      },
    }
  }
}
</script>
```
:::

:::warning
**before** 和 **after**为组件特有，若自定义组件有同名插槽，会被忽略
:::

### 使用render方法渲染
使用 **render** 渲染自定义组件，如果使用jsx语法，[jsx配置和使用](https://github.com/vuejs/jsx#installation)

:::demo
```html
<template>
  <ty-render-form :form-list="list"></ty-render-form>
</template>

<script>
export default {
  data() {
    return {
      list: Object.freeze([
        {
          key: 'render',
          label: 'render',
          render(h) {
            return h(
              'el-button',
              {
                props: {
                  type: 'warning',
                },
              },
              'render-button'
            )
          },
        },
        {
          key: 'render-jsx',
          label: 'render-jsx',
          render(h) {
            return <el-button type='primary'>render-jsx</el-button>
          },
        },
      ])
    }
  }
}
</script>
```
:::

### 渲染自定义局部组件

:::demo
```html
<template>
  <ty-render-form :form-list="list"></ty-render-form>
</template>

<script>
const CustomInput = {
  name: 'CustomInput',
  props: {
    value: String,
  },
  data() {
    return {
      v: this.value,
    }
  },
  model: {
    prop: 'value',
    event: 'change',
  },
  render(h) {
    return (
      <div>
        <input value={this.v}/>
      </div>
    )
  },
  methods: {
    change(e) {
      this.$emit('change', e.target.value)
    },
  },
}
export default {
  data() {
    return {
      list: Object.freeze([
        {
          key: 'ipt',
          label: 'render',
          component: CustomInput,
          defaultValue: 'vins',
          render(h, form) {
            return <custom-input value={form.formValue['ipt']} />
          },
        },
      ])
    }
  }
}
</script>
```
:::

:::tip
局部组件需要把组件传递给表单的 component 选项
:::

### 表单分组
使用 **group** 的类型，包裹要分组的表单元素，在 **group** 配置项中，可以使用 **hidden** 隐藏整组， 使用 **disabled** 使整组表单不可用

:::demo
```html
<template>
  <ty-render-form :form-list="list" ref="refForm"></ty-render-form>
</template>

<script>
export default {
  data() {
    return {
      list: Object.freeze([
        {
          type: 'group',
          key: 'custom-group',
          tag: 'el-card',
          slot: {
            header: '表单分组',
          },
          group: [
            {
              type: 'radio',
              prop: 'v.radio',
              label: '单选',
              required: true,
              defaultValue: '2',
              key: 'num-group',
              options: [
                { label: 'a1', value: '1' },
                { label: 'a2', value: '2' },
                { label: 'a3', value: '3' },
              ],
            },
            {
              type: 'checkbox',
              label: '复选',
              defaultValue: ['2'],
              key: 'checkbox-group',
              options: [
                { label: 'a1', value: '1' },
                { label: 'a2', value: '2' },
                { label: 'a3', value: '3' },
              ],
            },
          ],
        },
        {
          key: 'button',
          render(h) {
            let prop = {
              on: {
                click: this.click
              }
            }
            return (<el-button {...prop}>disabled</el-button>)
          }
        }
      ])
    }
  },
  methods: {
    click() {
      console.log('this.$refs.refForm', this.$refs.refForm)
      this.$refs.refForm.setItem('custom-group', {
        // hidden: true,
        disabled: true,
      })
    }
  }
}
</script>
```
:::

### 表单联合
表单联合，数据会呈现嵌套的结构，使用 **formFlat** 字段扁平化数据结构

:::demo
```html
<template>
  <ty-render-form :form-list="list" v-model="formValue"></ty-render-form>
</template>

<script>
export default {
  data() {
    return {
      formValue: {},
      list: Object.freeze([
        {
          type: 'year',
          label: '年',
          key: 'year',
          placeholder: 'select date',
        },
        {
          key: 'render-form',
          label: 'render-form',
          formFlat: true, // 扁平化form
          render(h, form) {
            console.log('form', form)
            let list = [
              {
                type: 'radio',
                label: '单选',
                defaultValue: '1',
                key: 'radio',
                options: [
                  { label: 'radio-1', value: '1' },
                  { label: 'radio-2', value: '2' },
                  { label: 'radio-3', value: '3' },
                ],
              },
            ]
            return (
              <ty-render-form
                form-list={list}
                value={form.formValue['render-form']}
                {...{
                  on: {
                    change(val) {
                      form.formValue['render-form'] = val
                    }
                  }
                }}
              />
            )
          },
        },
      ])
    }
  }
}
</script>
```
:::

### 表单模型

通过指定每一项的 **prop** 或者 **propOption** 设置该项的对应model字段

:::demo
```html
<template>
  <div>
    <ty-render-form :form-list="list" ref="refForm"></ty-render-form>
    <el-button @click="getModelValue">获取表单对应的模型的值</el-button>
    <div style="display: flex;">
      <p>
        模型：
        <pre>{{JSON.stringify(list.reduce((a, b) => {a[b.key] = b.propOption.prop;  return a}, {}), null, '  ')}}</pre>
      </p>
      <p style="margin-left: 20px;">
        model:
        <pre>{{modelValue}}</pre>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      modelValue: '',
      list: Object.freeze([
        {
          type: 'selectgroup',
          label: '分组下拉选择',
          key: 'select-group',
          multiple: true,
          propOption: {
            type: Array,
            prop: 'data.user.city',
          },
          group: [
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
      ])
    }
  },
  methods: {
    getModelValue() {
      this.modelValue = JSON.stringify(this.$refs.refForm.getFormModelValue(), null, '  ')
    }
  }
}
</script>
```
:::

在 **ty-render-form** 组件上使用 **propModel** 传入自定义的model，该model会覆盖具体表单项中的 **prop** 或者 **propOption**
:::demo 在模型中使用 format 函数可以格式化数据，default 字段设置默认值
```html
<template>
  <div>
    <ty-render-form :form-list="list" ref="refForm" :propModel="propModel"></ty-render-form>
    <el-button @click="getModelValue">获取表单对应的模型的值</el-button>
    <div style="display: flex;">
      <p>
        模型：
        <pre>{{JSON.stringify(propModel, null, '  ')}}</pre>
      </p>
      <p style="margin-left: 20px;">
        model:
        <pre>{{modelValue}}</pre>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      modelValue: '',
      propModel: {
        input: {
          prop: 'data.name',
          default: 'vins',
          format(val, state) {
            return state === 'parse' ? val + '😄' : val + '😢'
          }
        },
        'select-group': {
          type: Array,
            prop: 'data.user.city',
        }
      },
      list: Object.freeze([
        {
          key: 'input',
          label: 'name'
        },
        {
          type: 'selectgroup',
          label: '分组下拉选择',
          key: 'select-group',
          multiple: true,
          propOption: {
            type: Array,
            prop: 'data.user.city',
          },
          group: [
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
      ])
    }
  },
  mounted() {
    // 模拟服务端数据
    let data = {
      "data": {
        "name": "vins😢"
      },
      "user": {
        "city": [
          "beijing"
        ]
      }
    }
    // 模拟服务端数据，设置表单的值
    this.$refs.refForm.setFormValueByModel(data)
  },
  methods: {
    getModelValue() {
      this.modelValue = JSON.stringify(this.$refs.refForm.getFormModelValue(), null, '  ')
    }
  }
}
</script>
```
:::

:::tip
可以通过 **ty-render-form** 组件的 **setFormValueByModel** 方法通过数据初始化表单的值，通过 **getFormModelValue** 方法获取表单序列化后的值
:::

### 表单组件扩展

对于自定义组件，如果嵌入到 **ty-render-form** 表单组件中，需要提供一个 **value** 的 **prop** 接收表单的数据(如果不需要接收数据可忽略)，在自定义组件中，可以通过render方法的第二个参数获取到当前表单组件的引用后进行操作

### 参数说明

#### 表单项

| 参数         | 说明                        | 类型                         | 可选值        | 默认值 |
| ------------ | --------------------------- | ---------------------------- | ------------- | ------ |
| type         | 组件类型，对应element-ui    | string                       | -             | input  |
| key          | 用于表单值的唯一标识        | string                       | **必填**      | -      |
| hidden       | 是否隐藏                    | boolean                      | -             | false  |
| disabled     | 是否不可用                  | boolean                      | -             | false  |
| on           | 表单项监听的事件            | object< string, function >   | -             | -      |
| nativeOn     | 表单项监听的原生事件        | object< string, function >   | -             | -      |
| label        | 表单项展示的文本            | string                       | -             | -      |
| defaultValue | 默认值                      | any                          | -             | -      |
| rules        | 表单项值的验证规则          | array                        | -             | -      |
| slot         | 表单项可用的插槽            | object< string, render >     | before、after | -      |
| class        | 表单项自定义的类名          | string                       | -             | -      |
| style        | 表单项自定义的样式          | string                       | -             | -      |
| required     | 是否必填                    | string                       | -             | false  |
| group        | 分组类型特有的字段          | string                       | -             | -      |
| formFlat     | 联合表单特有的字段          | string                       | -             | -      |
| prop         | 表单项自的model指定         | string                       | -             | -      |
| propOption   | 表单项的model指定           | object，具体参照表单模型参数 | -             | -      |
| options      | select、radio、checkbox特有 | object                       | -             | -      |

:::tip
补充：element-ui不同表单元素特有的字段均支持，这里不在一一展示
:::

#### 表单项类型对应 **element-ui** 的表单类型

| 类型                                                                           | element-ui        |
| ------------------------------------------------------------------------------ | ----------------- |
| group                                                                          | -                 |
| input、textarea、email、password、search、number、tel                          | el-input          |
| year、month、date、dates、week、datetime、datetimerange、daterange、monthrange | el-date-picker    |
| cascader                                                                       | el-cascader       |
| time                                                                           | el-time-select    |
| timepicker                                                                     | el-time-picker    |
| remoteinput                                                                    | el-autocomplete   |
| radio                                                                          | el-radio-group    |
| checkbox                                                                       | el-checkbox-group |
| select                                                                         | el-select         |
| selectgroup                                                                    | el-select         |
| upload                                                                         | ty-upload         |

:::warning
当前版本 **ty-upload** 还暂未完成
:::

#### 表单元素插槽

在表单项的slot字段中配置，默认支持 **before** 和 **after** 两个插槽，分别作用于具体的表单元素前后位置

#### 表单模型参数

| 参数    | 说明            | 类型     | 可选值 | 默认值            |
| ------- | --------------- | -------- | ------ | ----------------- |
| type    | 数据类型        | 原始类型 | -      | -                 |
| prop    | 对应的model字段 | string   | -      | 当前表单项的key值 |
| format  | 格式化的函数    | function | -      | -                 |
| default | 默认值          | any      | -      | -                 |

:::tip
format函数的第一个参数为当前要格式化的值，第二个参数为当前格式化的状态；**parse**：数据格式化为表单值，**serialize**：表单数据序列化为具体数据
:::

#### 方法
| 名称                | 说明                                            | 参数                   |
| ------------------- | ----------------------------------------------- | ---------------------- |
| setItem             | 动态设置表单配置项，用于表单联动                | key, payload           |
| setItems            | 批量设置表单配置项                              | object< key, payload > |
| getFormValue        | 获取表单的值                                    | -                      |
| setFormValue        | 设置表单的某一个字段的值                        | key, val               |
| setFormValues       | 设置表单的某一个字段的值                        | object< key, val >     |
| setFormValueByModel | 通过表单model设置表单的值，可用作表单值的初始化 | data                   |
| getFormModelValue   | 获取表单的model值                               | -                      |

#### 事件
| 名称   | 说明         | 参数  |
| ------ | ------------ | ----- |
| change | 表单数据变化 | value |

### 建议

:::warning
1、传入 **ty-render-form** 的 **form-list** 使用 **Object.freeze** 冻结，防止vue响应化

2、使用 **setItem** 方法修改表单项的配置项，直接修改可能并不会立即渲染

3、表单的model是惰性计算的，必须使用 **getFormModelValue** 方法才能获取真实数据
:::
