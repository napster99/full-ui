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
              value: 'a'
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
