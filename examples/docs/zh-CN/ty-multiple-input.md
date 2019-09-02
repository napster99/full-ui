## TyMultipleInput ty-multiple-input

### 安装

```shell
yarn add @tuya-fe/ty-multiple-input
```

### 用法

:::demo
```html
<template>
    <ty-multiple-input :value.sync="value"></ty-multiple-input>
</template>

<script>
    export default {
        data(){
            return {
                value: ''
            };
        }
    }
</script>
```
:::

### TyMultipleInput Attributes
| 参数             | 说明       | 类型   | 可选值 | 默认值 |
| ---------------- | ---------- | ------ | ------ | ------ |
| value        | 输入框值 | String | —      | ''     |
| placeholder  | 输入框默认值 | String | —      |  ''  |
| width  | 输入框宽度 | String | —      |  85%  |
| tipInfo  | 提示框文本 | String | —      |  '输入提示：单个输入完后，按回车结束'  |
| tipTheme  | 提示框主题 | String | —      |  light  |

