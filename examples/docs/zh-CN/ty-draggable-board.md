## TyDraggableBoard ty-draggable-board

### 安装

```shell
yarn add @tuya-fe/ty-draggable-board
```

### 用法

:::demo

```html
<template>
  <ty-draggable-board
    ref="dragItem"
    :list-array="listArray"
    :card-content="cardContent"
    @dragend="dragend"
  ></ty-draggable-board>
</template>

<script>
  export default {
    name: 'app',
    data() {
      return {
        listArray: [
          {
            params: {
              limit: 5,
              offset: 0
            },
            order: 0,
            listName: '第一组',
            list: [
              {
                id: 123
              },
              {
                id: 1234
              }
            ],
            total: 2
          },
          {
            params: {
              limit: 5,
              offset: 0
            },
            order: 1,
            listName: '第二组',
            list: [
              {
                id: 90
              },
              {
                id: 34
              }
            ],
            total: 2
          },
          {
            params: {
              limit: 5,
              offset: 0
            },
            order: 2,
            listName: '第三组',
            list: [],
            total: 0
          },
          {
            params: {
              limit: 5,
              offset: 0
            },
            order: 3,
            listName: '达成合作意向',
            list: [],
            total: 0
          },
          {
            params: {
              limit: 5,
              offset: 0
            },
            order: 4,
            listName: '第四组',
            list: [],
            total: 0
          },
          {
            params: {
              limit: 5,
              offset: 0
            },
            order: 5,
            listName: '第五组',
            list: [],
            total: 0
          }
        ],
        cardContent: [
          {
            prop: 'id',
            label: 'id'
          }
        ]
      }
    },

    methods: {
      dragend(add, remove) {
        this.$refs.dragItem.updateCount()
        //this.$refs.dragItem.dragback();
      }
    }
  }
</script>
```

:::
