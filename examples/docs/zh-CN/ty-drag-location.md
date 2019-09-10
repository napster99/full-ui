## TyDragLocation 定位拖动

### 安装
```shell
yarn add @tuya-fe/ty-drag-location
```

### 用法

:::demo
```html
<template>
  <ty-drag-location :datas="dragDatas" @setLocation="setLocation" />
</template>

<script>
  export default {
    data() {
      return {
        dragDatas: {
          mainPic: require('../../assets/images/1.jpg'),  //定位图
          offsetLeft: 600, //图标距离左侧间距
          offsetStep: 80, //各个图标距离间距
          mainPicWidth: 500, //定位图宽度
          mainPicHeight: 500,//定位图高度
          coordinate: [
            {
              pic: require('../../assets/images/2.jpg'), //icon图标
              limit: 9, //最多重叠数
              info: {
                id: 1,
              },
            },
            {
              pic: require('../../assets/images/2.jpg'),
              limit: 9,
              info: {
                id: 2,
              },
            },
            {
              pic: require('../../assets/images/2.jpg'),
              limit: 4,
              info: {
                id: 3,
              },
            },
          ],
        }
      };
    },
    methods: {
      setLocation(args) {
        console.log(args)
      },
    }
  };
</script>
```
:::
