## ty-nav-tag

该组件用来记录打开的页面，方便快速切换

该组件默认监听路由变化，监听到路由变化的时候自动存储路由信息

### 使用前的准备
```js
import Vue from 'vue'
import TyNavTag from '@tuya-fe/ty-nav-tag'

Vue.use(TyNavTag)
// or
Vue.component(TyNavTag.name, TyNavTag)
```

### 基本用法
:::demo 当前模式无法显示完整效果
```html
<template>
  <ty-nav-tag />
</template>

<script>
export default {

}
</script>
```
:::

### prop


| 参数     | 说明                                         | 类型    | 可选值 | 默认值  |
| -------- | -------------------------------------------- | ------- | ------ | ------- |
| cache    | 是否缓存到本地                               | Boolean | -      | true    |
| cacheKey | 如果缓存，对应的缓存的key (防止多网站，冲突) | string  | -      | nav-tag |


