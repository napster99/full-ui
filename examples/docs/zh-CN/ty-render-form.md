## ty-render-form

该组件用来渲染大量的form表单，以及表单分组、联合，模型化

### 使用前的准备

:::demo
```html
<template>
  <div id="app">
    <ty-render-form :form-list="list" v-model="formValue"></ty-render-form>
  </div>
</template>

<script>
export default {
  name: 'app',
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
          // slot: {
          //   append: <el-button type="primary" icon="el-icon-search" />,
          // },
          on: {
            change(value) {
              console.log('数据变化', value)
            },
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
