## ty-message-box 确认框

### 基础用法

:::demo

```html
<div id="app">
  <el-button type="text" @click="open">点击打开 Message Box</el-button>
</div>

<script>
  //通过以下方式引入
  //import TyMessageBox from '@tuya-fe/ty-message-box'
  export default {
    data() {
      return {
        TyMessageBox: this.$TyMessageBox,
      }
    },

    methods: {
      open() {
        const h = this.$createElement
        this.TyMessageBox(
          this,
          h('p', null, [
            h('span', null, '内容可以是 '),
            h('i', { style: 'color: teal' }, 'xxxx'),
          ]),
          {
            title: '我是标题',
          },
          () => {
            console.log('success')
          },
          () => {
            console.log('cancel.....')
          }
        )
      },
    },
  }
</script>
```

:::
