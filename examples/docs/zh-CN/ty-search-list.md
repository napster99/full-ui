## TySearchList 搜索列表页

常用页面之一

### 命令行

```shell
tg page 1 pagename.vue
```

:::demo

```html
<template>
  <section>
    <el-container>
      <el-header>
        <ty-search-form
          v-model="searchForm"
          @search="handleSearch"
          @change="handleChange"
        ></ty-search-form>
      </el-header>
      <el-main>
        <ty-render-table
          :table-data="tableData"
          :table-columns="tableColumns"
          :page-info="pageInfo"
          :current-change="search"
          :size-change="sizeChange"
          :table-loading="loading"
        ></ty-render-table
      ></el-main>
    </el-container>
  </section>
</template>

<script>
  export default {
    data() {
      return {
        searchForm: {
          hello: '',
          world: 'world'
        },

        loading: false,
        tableData: [
          {
            name: '张三',
            age: 20
          }
        ],
        tableColumns: [
          {
            prop: 'name',
            label: '名称'
          },
          {
            prop: 'age',
            label: '年龄',
            render: (h, { data }) => {
              return h('div', data.age);
            }
          },
          {
            prop: 'operate',
            label: '操作',
            render: (h, { data }) => {
              return h('div', {}, [
                h(
                  'el-button',
                  {
                    props: {
                      size: 'small',
                      type: 'primary'
                    },
                    on: {
                      click: () => {
                        this.todo(data);
                      }
                    }
                  },
                  '编辑'
                ),
                h(
                  'el-button',
                  {
                    props: {
                      size: 'small',
                      type: 'danger'
                    },
                    on: {
                      click: () => {
                        this.todo(data);
                      }
                    }
                  },
                  '删除'
                )
              ]);
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
    methods: {
      handleSearch() {
        console.log(this.searchForm);
      },
      handleChange() {
        console.log(this.searchForm);
      },
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
