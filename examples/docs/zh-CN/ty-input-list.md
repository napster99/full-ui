## TyInputList 多行输入框

xxx

### 安装

```shell
yarn add @tuya-fe/ty-input-list
```

### 用法

多行输入框展示用法。

:::demo

```html
<template>
  <ty-input-list :inputList="datas" @inputList="inputListFn"></ty-input-list>
</template>

<script>
  export default {
    data() {
      return {
        datas: {
          title: '添加', //default 添加
          colums: [
            {
              name: '英语',
              value: 'a',
              required: true
            },
            {
              name: '德语',
              value: 'b'
            }
          ],
          datas: [
            {
              a: 22,
              b: 33
            },
            {
              a: 44,
              b: 55
            }
          ]
        }
      };
    },
    methods: {
      inputListFn(newVal) {
        console.log(newVal);
      }
    }
  };
</script>
```

:::

### TyInputList Attributes

| 参数             | 说明       | 类型   | 可选值 | 默认值 |
| ---------------- | ---------- | ------ | ------ | ------ |
| inputList        | 显示的数据 | Object | —      | —      |
| inputList-title  | 显示的数据 | String | —      | —      |
| inputList-colums | 表头       | Array  | —      | —      |
| inputList-datas  | 数据       | Array  | —      | —      |

### TyInputList Events

| 事件名     | 说明                | 参数          |
| ---------- | ------------------- | ------------- |
| inputList  | 监听 inputList 数据 | datas         |
| removeItem | 删除按钮的回调函数  | val, callback |
