## TyRenderTable 表格

用于展示多条结构类似的数据，可对数据进行排序、筛选、对比或其他自定义操作。

### 安装

```shell
yarn add @tuya-fe/ty-render-table
```

### 基础表格

基础的表格展示用法。

:::demo

```html
<template>
  <el-ty-render-table
    :table-data="tableData"
    :table-columns="tableColumns"
    :page-info="pageInfo"
    :current-change="search"
    :size-change="sizeChange"
    :table-loading="loading"
  ></el-ty-render-table>
</template>

<script>
  export default {
    data() {
      return {
        loading: false,
        tableData: [],
        tableColumns: [
          {
            prop: 'xxx',
            label: 'xxx'
          },
          {
            prop: 'xxx',
            label: 'xxx',
            render: (h, { data }) => {
              return h('div', data.XXX);
            }
          },
          {
            prop: 'operate',
            label: '操作',
            render: (h, { data }) => {
              return h(
                'el-buttom',
                {
                  props: {
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.todo(data);
                    }
                  }
                },
                '操作按钮文案'
              );
            }
          }
        ],

        pageInfo: {
          pageSize: 20,
          pageIndex: 1,
          totalRecords: 0,
          layout: 'total,sizes,prev, pager, next, jumper'
        }
      };
    },
    components: {},
    computed: {
      pageOffset() {
        return (this.pageInfo.pageIndex - 1) * this.pageInfo.pageSize;
      }
    },
    methods: {
      async search(pageIndex) {
        this.pageInfo.pageIndex = pageIndex || 1;
        this.loading = true;
        let param = {
          limit: this.pageInfo.pageSize,
          offset: this.pageOffset
        };
        this.tableData = res.xx;
        this.pageInfo.totalRecords = res.xx;

        this.loading = false;
      },
      sizeChange(pageSize) {
        this.pageInfo.pageSize = pageSize;
        this.search();
      }
    }
  };
</script>
```

:::
