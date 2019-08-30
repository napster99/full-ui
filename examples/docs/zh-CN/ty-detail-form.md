## TyDetailForm

### 安装
```shell
yarn add @tuya-fe/ty-detail-form
```

### 用法

:::demo
```html
<template>
  <ty-detail-form :datas="datas"/>
</template>

<script>
  export default {
    data() {
      return {
        datas : {
          '基本信息': {
            columns: 2,
            list: [
              {
                name: '名称',
                color: 'red',
                value: 'AAAAAAAAAAAAAAAA',
              },
              {
                name: '年龄',
                value: '26',
              },
              {
                name: '兴趣',
                value: '26',
              },
              {
                name: '生日',
                value: '26',
              },
            ],
          },
          '订单详情': {
            columns: 3,
            list: [
              {
                name: '字段1',
                color: 'blue',
                value: 'AAAAAA',
              },
              {
                name: '字段2',
                value: 'AA',
              },
              {
                name: '字段3',
                value: 'BB',
              },
              {
                name: '字段4',
                value: 'CC',
              },
              {
                name: '字段5',
                value: 'DD',
              },
              {
                name: '字段6',
                value: 'EE',
              },
            ],
          }
        }
      };
    },
    methods: {}
  };
</script>
```
:::


### Attributes
| 参数          | 说明                | 类型   | 可选值 | 默认值 |
| ------------- | ------------------- | ------ | ------ | ------ |
| datas         | 渲染参数,key为title | Object | —      | —      |
| datas-columns | 渲染列数            | Number | —      | 1      |
| datas-list    | 渲染name&value      | Array  | —      | —      |

