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
            address: '上海市普陀区金沙江路 1518 弄',
            age: 1
          },
          {
            name: '王小虎',
            sex: 1,
            isStatus: true,
            position: 2,
            address: '上海市普陀区金沙江路 1517 弄',
            age: 1
          },
          {
            name: '王小虎',
            sex: 2,
            isStatus: false,
            position: 3,
            address: '上海市普陀区金沙江路 1519 弄',
            age: 1
          },
          {
            name: '王小虎',
            sex: 2,
            isStatus: false,
            position: 4,
            address: '上海市普陀区金沙江路 1516 弄',
            age: 1
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
            disabled: false,
            multiple: false,
            filterable: true,
            defaultSelect: true,
            options: [
              { label: '男', value: 1 },
              { label: '女', value: 2 },
            ],
            render: (h, param) => {
              return h('div', param.row.sex == 1 ? '男' : '女')
            },
            customSelect: (h, param) => {
              return h(
                //自定义渲染函数
                'div', {}, '自定义'
              )
            },
          },
          {
            prop: 'address',
            label: '地址',
          },
          {
            prop: 'age',
            label: '年龄',
            type: 'custom',
            needEdit: true,
            customRender: (h, param) => {
              return h(
                //自定义渲染函数
                'div', {}, '自定义'
              )
            },
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
      //自定义保存按钮的操作
      sureFun(row) {
        //获取本次操作的数据
        console.log(row)

        //你的请求
        // return fetch('http://localhost:3001/getUserInfo')
        //   .then(function(response) {
        //     return response.json().then((res) => {
        //       return res.success
        //     })
        //   })

        //或者不请求，只是前端操作 可以返回true/false
        return true;
      }
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

- 默认自定义渲染显示要`render`属性（后续加入`jsx`）

- 如果这一列需要编辑需要`needEdit`属性

- `type`属性用来表示编辑状态要展示成什么类型（目前支持`input`、`select`、`radio`和`custom`类型）

  - `input`类型只要传入`type`

  - `select`类型
    - 传入`defaultSelect`为`true`时，要传入`options`属性，用于显示下拉框的值
    - 传入`defaultSelect`为`false`时，传入`customSelect`属性，用于自定义选择框

  - `radio`类型
    - 传入`defaultRadio`属性为`true`时，默认展示是和两个选项
    - 传入`defaultRadio`属性为`false`时，为自定义，需传入`options`属性，用于展示可以选择的值
  - `custom`类型
    - 传入`customRender`属性，用于自定义

### Events
| 事件名称           | 说明                                         | 回调参数                                     |
| -------------- | -------------------------------------------    | ---------------------------------------- |
| onSure         | 获取当前修改行的数据，并可以自定义请求事件            | value，当前修改行的数据  |

### onSure Details
- 如果只是前端操作，可以直接返回`true`和`false`来表示编辑是否成功
- 如果有请求的操作，可以通过返回请求结果成功与否来表示编辑是否成功
