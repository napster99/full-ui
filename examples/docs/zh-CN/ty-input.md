## ty-input 输入框

基于 element-ui 的 input 组件

### 基础用法

```html
<ty-input v-model="input" placeholder="请输入内容"></ty-input>

<script>
  export default {
    data() {
      return {
        input: '',
      };
    },
  };
</script>
```

### 数据格式校验

通过 `reg-exp-option` 属性指定校验规则，type 取值 interger 整数 | positive 整数 + 0 | positiveInt 正整数 + 0 | character 数字、字母、下划线，regExp 可以自定义校验规则，会被 type 覆盖

```html
<ty-input
  v-model="input"
  placeholder="请输入内容"
  :reg-exp-option="regExpOption"
></ty-input>

<script>
  export default {
    data() {
      return {
        input: '',
        regExpOption:{
          {
            type: 'integer',
            regExp: /input/,
            message: '输入错误'
          }
        }
      };
    },
  };
</script>
```

### 输入内容复制

:::demo 通过 `copyable` 属性指定是否开启复制功能 append slot 可以自定义复制按钮内容

```html
<ty-input copyable placeholder="请输入" v-model="input">
  <template slot="append"
    >复制</template
  >
</ty-input>
```

```js
export default {
  data() {
    return {
      input: '',
    };
  },
};
```
