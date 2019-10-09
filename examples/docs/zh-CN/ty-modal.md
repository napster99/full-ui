## TyModal 业务弹窗

该组件用于完成一些基于当前业务逻辑的一些额外的功能，如新增、编辑、查看等。

### 安装

```shell
yarn add @tuya-fe/ty-modal
```

### 基础用法

直接使用el-dialog入参生成

:::demo
```html
<el-button type="primary" size="small" @click="dialogVisible = true">打开弹窗</el-button>

<ty-modal
  :visible.sync="dialogVisible"
  title="示例弹窗"
  width="40%"
  @onClose="handleClose"
  @onSure="handleSure"
></ty-modal>

<script>
export default {
  data() {
    return {
      dialogVisible: false
    }
  },
  methods: {
    handleClose() {},
    handleSure(data) {
      console.log(data);
    }
  }
}
</script>
```
:::