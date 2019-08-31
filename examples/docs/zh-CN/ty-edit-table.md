## TyEditTable

### 安装
```shell
yarn add @tuya-fe/ty-edit-table
```

### 用法

:::demo
```html
<template>
  <div id="app">
    <ty-edit-table
      :tableColumns="tableColumns"
      :tableData="tableData"
      :needEdit="needEdit"
      :onSure="sureFun"
      :page-info="pageInfo"
    >
  </ty-edit-table>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [
          {
            name: '王小虎',
            sex: 1,
            isStatus: true,
            position: 1,
            address: '上海市普陀区金沙江路 1518 弄'
          },
          {
            name: '王小虎',
            sex: 1,
            isStatus: true,
            position: 2,
            address: '上海市普陀区金沙江路 1517 弄'
          },
          {
            name: '王小虎',
            sex: 2,
            isStatus: false,
            position: 3,
            address: '上海市普陀区金沙江路 1519 弄'
          },
          {
            name: '王小虎',
            sex: 2,
            isStatus: false,
            position: 4,
            address: '上海市普陀区金沙江路 1516 弄'
          }
        ],
        tableColumns: [
          {
            prop: 'name',
            label: '名字',
            needEdit: true,
            type: 'input'
          },
          {
            prop: 'isStatus',
            label: '是否支持',
            needEdit: true,
            type: 'radio',
            defaultRadio: true,
            render: (h, param) => {
              return h('div', param.row.isStatus === true ? '是' : '否')
            },
          },
          {
            prop: 'position',
            label: '方向',
            needEdit: true,
            type: 'radio',
            defaultRadio: false,
            options: [
              { text: '上', value: 1 },
              { text: '中', value: 2 },
              { text: '下', value: 3 },
            ],
            render: (h, param) => {
              return h('div', param.row.position === 1 ? '上' : (param.row.position === 2 ? '中' : '下'))
            },
          },
          {
            prop: 'sex',
            label: '性别',
            needEdit: true,
            type: 'select',
            options: [
              { label: '男', value: 1 },
              { label: '女', value: 2 },
            ],
            render: (h, param) => {
              return h('div', param.row.sex == 1 ? '男' : '女')
            }
          },
          {
            prop: 'address',
            label: '地址',
          }
        ],
        needEdit: true,
        pageInfo: {
          pageSize: 20,
          pageIndex: 1,
          totalRecords: 0
        }
      };
    },
    methods: {
      sureFun(row) {
        //自定义操作
      },
    }
  };
</script>
```
:::

### Attributes
| 参数                  | 说明                                      | 类型                        | 可选值  | 默认值 |
| --------------------- | ---------------------------------------- | --------------------------- | ---- | ----- |
| tableData             | 表格展示的数据                             | Array                       | -    | []    |
| tableColumns          | 表格每列的展示                             | Array                       | -    | []    |
| needEdit              | 用来判断整个表格是否需要编辑操作              | Boolean                     | true/false    | false     |

### tableColumns Details

- 默认只要`prop`和`label`属性

- 自定义渲染要`render`属性（后续加入`jsx`）

- 如果这一列需要编辑需要`needEdit`属性

- `type`属性用来表示编辑状态要展示成什么类型（目前支持`input`、`select`、`radio`类型）

  - `input`类型只要传入`type`

  - `select`类型要传入`options`属性，

  - `radio`类型要传入`defaultRadio`属性，`defaultRadio`属性为`true`时默认为是和否选项，否则为自定义，自定义时需传入`options`属性

### Events
| 事件名称           | 说明                                         | 回调参数                                     |
| -------------- | -------------------------------------------    | ---------------------------------------- |
| onSure         | 获取当前修改行的数据，并可以自定义请求事件            | value，当前修改行的数据  |
