## format 指令 格式化输入框内容

格式化输入框内容

### 基础用法

:::demo

```html
<template>
  <section>
    <input v-model='a' v-bind:a='a' @input="handle" @blur="blur" @change="handleChange" v-format:value.change.blur.input='/[2|3]/'></input>
    <input v-model='a' v-bind:a='a' @input="handle" @blur="blur" @change="handleChange" v-format.input='/[2|3]/'></input>
  </section>
</template>

<script>
export default {
  data () {
    return {
      a: 'hello'
    }
  },
  methods: {
    handle (e, reformat) {
      console.log('el-input', e, reformat, this.a)
    },
    blur (e, reformat) {
      console.log('el-blur', e, reformat, this.a)
    },
    handleChange (e, reformat) {
      console.log('el-change', e, reformat, this.a)
    },
    format (v, e) {
      console.log(v,e);
      return '1'
    }
  }
}
</script>
```

:::

:::demo

```html
<template>
  <section>
    <el-input
      v-model="a"
      v-bind:a="a"
      @input.native="nativeInput($event, 1)"
      @input="handle($event, 2)"
      @blur="blur"
      @change="handleChange"
      v-format:value.change.blur.input="/[2|3]/"
    ></el-input>
  </section>
</template>

<script>
  export default {
    data() {
      return {
        a: 'hello',
      }
    },
    methods: {
      handle(e, reformat) {
        console.log('el-input', e, reformat, this.a)
      },
      blur(e, reformat) {
        console.log('el-blur', e, reformat, this.a)
      },
      nativeInput(e, reformat) {
        console.log('nativeInput', arguments, e, reformat, this.a)
      },
      handleChange(e, reformat) {
        console.log('el-change', e, reformat, this.a)
      },
    },
  }
</script>
```

:::

### format Attributes

指令格式 **v-format-input:arg.modifiers=value**

| 参数      | 说明           | 类型                       | 可选值                                  | 默认值 |
| --------- | -------------- | -------------------------- | --------------------------------------- | ------ |
| arg       | input 的 value | string                     | —                                       | value  |
| modifiers | 校验时机       | string                     | 目前支持 : input、blur、change;支持多个 | blur   |
| value     | 格式化规则     | string / regexp / function | 必填                                    | —      |
