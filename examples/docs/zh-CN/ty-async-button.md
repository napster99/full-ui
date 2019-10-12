## TyAsyncButton 异步按钮

<el-tag type=“warning” size="mini"><a target="_blank" href="https://registry.code.tuya-inc.top/backendComponents/ty-nav-tag/issues">意见反馈</a></el-tag>

### 使用前的准备
```js
import Vue from 'vue'
import TyAsyncButton from '@tuya-fe/ty-async-button'

Vue.use(TyAsyncButton)
// or
Vue.component(TyAsyncButton.name, TyAsyncButton)
```

### 基本用法
点击事件处理完异步操作之后，调用回调参数的 **resolve** 方法完成异步完成状态

:::demo
```html
<template>
  <ty-async-button :useLoading="true" @click="click('asd', $event)" type="primary">click</ty-async-button>
</template>

<script>
export default {
  methods: {
    click(value, rest) {
      setTimeout(() => {
        rest.resolve()
      }, 2000)
    }
  }
}
</script>
```
:::

:::tip
异步操作过程中，默认使用 **loading** 展示加载状态，如果不想使用该效果，可以使用 **useLoading** 字段标识为 false

**ty-async-button** 组件的属性完全覆盖 **el-button** 的属性
:::


## 文档

### Attributes
| 参数        | 说明            | 类型    | 可选值                                             | 默认值 |
| ----------- | --------------- | ------- | -------------------------------------------------- | ------ |
| size        | 尺寸            | string  | medium / small / mini                              | -      |
| type        | 类型            | string  | primary / success / warning / danger / info / text | -      |
| plain       | 是否朴素按钮    | boolean | -                                                  | false  |
| round       | 是否圆角按钮    | boolean | -                                                  | false  |
| circle      | 是否圆形按钮    | boolean | -                                                  | false  |
| loading     | 是否加载中状态  | boolean | -                                                  | false  |
| disabled    | 是否禁用状态    | boolean | -                                                  | false  |
| icon        | 图标类名        | string  | -                                                  | -      |
| autofocus   | 是否默认聚焦    | boolean | -                                                  | false  |
| native-type | 原生 type 属性  | string  | button / submit / reset                            | button |
| useLoading  | 是否使用loading | boolean | -                                                  | true   |

### 事件

| 名称  | 说明                                                   | 参数                 |
| ----- | ------------------------------------------------------ | -------------------- |
| click | 点击事件，使用 resolve 执行后续的状态更换，类似promise | event resolve reject |
