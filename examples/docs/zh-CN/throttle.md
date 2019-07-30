## ty-throttle 节流

使用插件的方式，添加全局自定义指令、全局自定义组件和全局方法

### 组件方式

:::warning
ty-throttle 组件内部只能有一个元素节点
:::

#### 基本用法

:::demo

```html
<template>
  <div>
    <p>
      原生输入框：
      <ty-throttle events="input">
        <template
          ><input v-model="a" @input="handle" @blur="blur"
        /></template>
      </ty-throttle>
    </p>

    <ty-throttle events="input">
      <el-input v-model="a" @input="handle" @blur="blur" @change="handleChange">
        <template slot="prepend"
          >el-input</template
        >
      </el-input>
    </ty-throttle>
    <ty-throttle events="click">
      <button @click="click"><span>原生button</span></button>
    </ty-throttle>
    <ty-throttle events="click">
      <el-button type="primary" @click="click">el-button</el-button>
    </ty-throttle>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        a: 'input',
      }
    },
    methods: {
      click(e) {
        console.log('click', this.a)
        this.$message.success('触发点击事件')
      },
      handle(e) {
        console.log('el-input', this.a)
        this.$message.success('触发input事件')
      },
      blur(e) {
        console.log('el-blur', e, this.a)
        this.$message.success('触发blur事件')
      },
      handleChange(e) {
        console.log('el-change', e, this.a)
        this.$message.success('触发change事件')
      },
    },
  }
</script>
```

:::

#### 绑定多个事件

:::demo

```html
<template>
  <div>
    <ty-throttle
      :events="[{event: 'input'}, 'change', {event: 'blur', noTrailing: false, delay: 1000, handle: throttleHandle}]"
    >
      <el-input v-model="a" @input="handle" @blur="blur" @change="handleChange">
        <template slot="prepend"
          >绑定 input、change、blur三个事件</template
        >
      </el-input>
    </ty-throttle>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        a: 'input',
      }
    },
    methods: {
      throttleHandle(e) {
        console.log('throttleHandle-change', this.a)
        this.$message.success('触发自定义的blur事件')
      },
      handle(e) {
        console.log('el-input', this.a)
        this.$message.success('触发input事件')
      },
      blur(e) {
        console.log('el-blur', e, this.a)
        this.$message.success('触发blur事件')
      },
      handleChange(e) {
        console.log('el-change', e, this.a)
        this.$message.success('触发change事件')
      },
    },
  }
</script>
```

:::

#### 节流事件配置

:::demo 在组件上添加 **events-option** 字段，配置即可

```html
<template>
  <div>
    <ty-throttle
      :events="[{event: 'input'}, 'change']"
      :events-option="{noTrailing: false, delay: 1000}"
    >
      <el-input v-model="a" @input="handle" @blur="blur" @change="handleChange">
        <template slot="prepend"
          >events-option</template
        >
      </el-input>
    </ty-throttle>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        a: 'input',
      }
    },
    methods: {
      handle(e) {
        console.log('el-input', this.a)
        this.$message.success('触发input事件')
      },
      blur(e) {
        console.log('el-blur', e, this.a)
        this.$message.success('触发blur事件')
      },
      handleChange(e) {
        console.log('el-change', e, this.a)
        this.$message.success('触发change事件')
      },
    },
  }
</script>
```

:::

### 指令方式

:::demo

```html
<template>
  <div>
    <p>
      原生输入框：<input
        v-model="a"
        @input="handle"
        @blur="blur"
        @change="handleChange"
        v-throttle:input.1000.noTrailing
        v-throttle:input="handleInput"
        v-throttle:change
      />
    </p>
    <el-input
      v-model="a"
      @input="handle"
      @blur="blur"
      @change="handleChange"
      v-throttle:input
    >
      <template slot="prepend"
        >el-input</template
      >
    </el-input>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        a: 'input',
      }
    },
    methods: {
      handleInput(e) {
        console.log('handleInput', this.a)
        this.$message.success('触发自定义的input事件')
      },
      handle(e) {
        console.log('el-input', this.a)
        this.$message.success('触发input事件')
      },
      blur(e) {
        console.log('el-blur', e, this.a)
        this.$message.success('触发blur事件')
      },
      handleChange(e) {
        console.log('el-change', e, this.a)
        this.$message.success('触发change事件')
      },
    },
  }
</script>
```

:::

### 在组件中调用方法

```js
this.$throttle(dealy, noTrailing, cb)

/** 参数说明
 * delay 延迟时间，必填
 * noTrailing  在最后一次调用时是否执行 callback，true 不执行，false 执行，可选
 * cb  要处理的事件，必填
 */
```

### 插件使用配置

```js
Vue.use(Tythrottle, {
  delay: 1000, // 延迟
  noTrailing: false, // 在最后一次调用时是否执行 callback，true 不执行，false 执行
  isRegisterFunction: true, // 是否注册全局方法，只有该字段为false时，跳过注册
  isRegisterComponent: true, // 是否注册全局组件，只有该字段为false时，跳过注册
})
```

:::warning
是否注册全局方法和组件，只有当相应字段为 false 时，跳过注册，为 undefined 或者 null，都会注册，这样做的目的是，减少这两个字段的传入，只有明确关闭的时候再跳过注册
:::

### ty-throttle Attributes

| 参数          | 说明                 | 类型                                      | 可选值 | 默认值 |
| ------------- | -------------------- | ----------------------------------------- | ------ | ------ |
| events        | 节流的事件名称和配置 | string / object / array< string / object> | 必填   | —      |
| events-option | 节流的事件配置       | object / array < object >                 | —      | —      |

:::tip
如果 **events-option** 类型为 object， 则该对象的配置应用到 **events** 中的每个事件；如果为数组，则和 **events** 中的一一对应，如果 **events** 选项也配置了，以项目配置为主，覆盖 **events-option** 中的配置
:::

### 配置对象 Attributes

| 参数       | 说明                     | 类型     | events 字段独有 |
| ---------- | ------------------------ | -------- | --------------- |
| event      | 事件名称                 | string   | 是              |
| noTrailing | 在最后一次调用时是否执行 | boolean  | -               |
| delay      | 延迟时间(ms)             | number   | -               |
| handle     | 回调函数                 | function | 是              |

:::tip
如果 **handle** 传入，则以该事件进行节流化处理，忽略子组件上的对应事件
:::

### directve Attributes

指令使用格式: **v-throttle:event.noTrailing.delay=handle**

| 参数       | 说明                     | 类型     | 必须 |
| ---------- | ------------------------ | -------- | ---- |
| event      | 事件名称                 | string   | 是   |
| noTrailing | 在最后一次调用时是否执行 | boolean  | -    |
| delay      | 延迟时间(ms)             | number   | -    |
| handle     | 回调函数                 | function | -    |
