## TySteps ty-steps

### 安装

```shell
yarn add @tuya-fe/ty-steps
```

### 用法

基础用法：使用 `active` 指定当前步骤
:::demo
```html
<template>
    <ty-steps :node-list="nodeList" :active="active" finish-status="success"></ty-steps>
</template>

<script>
    export default {
        data() {
        return {
            nodeList: [
                {
                    icon: '',
                    title: '步骤1',
                    description: '描述1'
                },
                {
                    icon: 'el-icon-edit',
                    title: '步骤2',
                    description: '描述2'
                },
                {
                    icon: '',
                    title: '步骤3',
                    description: '描述3'
                },
                {
                    icon: '',
                    title: '步骤4',
                    description: '描述4'
                },
                {
                    icon: '',
                    title: '步骤5',
                    description: '描述5'
                }
            ],
        active: 1
        }
    }
    }
</script>
```
:::

基础用法：使用 `status` 设定每个节点状态
:::demo
```html
<template>
    <ty-steps :node-list="nodeList"></ty-steps>
</template>

<script>
    export default {
        data() {
        return {
            nodeList: [
                {
                    icon: '',
                    title: '步骤1',
                    description: '描述1',
                    status: 'success'
                },
                {
                    icon: 'el-icon-edit',
                    title: '步骤2',
                    description: '描述2',
                    status: 'success'
                },
                {
                    icon: '',
                    title: '步骤3',
                    description: '描述3',
                    status: 'process'
                },
                {
                    icon: '',
                    title: '步骤4',
                    description: '描述4',
                    status: 'wait'
                },
                {
                    icon: '',
                    title: '步骤5',
                    description: '描述5',
                    status: 'wait'
                }
            ]
        }
    }
    }
</script>
```
:::

使用 `slot` 为`icon`、`title`、`description`添加定制
（P.S. Full-ui使用2.6.0以下版本Vue，不支持slot新语法，先注释了）
:::demo
```html
<template>
    <ty-steps :node-list="nodeList">
        <!-- <template v-slot:icon="{ node }">
            <i v-if="node.status === 'wait'" class="el-icon-delete" />
        </template>
        <template v-slot:title="{ node }">
            <span v-if="node.status === 'process'">{{
            `嘿嘿嘿:${node.description}`
            }}</span>
        </template>
        <template v-slot:description="{ node }">
            <span v-if="node.status === 'process'">{{
            `嘿嘿嘿:${node.description}`
            }}</span>
        </template> -->
    </ty-steps>
</template>

<script>
    export default {
        data() {
        return {
            nodeList: [
                {
                    icon: '',
                    title: '步骤1',
                    description: '描述1',
                    status: 'success'
                },
                {
                    icon: 'el-icon-edit',
                    title: '步骤2',
                    description: '描述2',
                    status: 'success'
                },
                {
                    icon: '',
                    title: '步骤3',
                    description: '描述3',
                    status: 'process'
                },
                {
                    icon: '',
                    title: '步骤4',
                    description: '描述4',
                    status: 'wait'
                },
                {
                    icon: '',
                    title: '步骤5',
                    description: '描述5',
                    status: 'wait'
                }
            ]
        }
    }
    }
</script>
```
:::

使用`options` **覆盖、添加** 默认状态的`wait / process / finish / error / success`对应的颜色
:::demo
```html
<template>
    <ty-steps :node-list="nodeList" :options="options"></ty-steps>
</template>

<script>
    export default {
        data() {
        return {
            nodeList: [
                {
                    icon: '',
                    title: '步骤1',
                    description: '描述1',
                    status: 'success'
                },
                {
                    icon: 'el-icon-edit',
                    title: '步骤2',
                    description: '描述2',
                    status: 'success'
                },
                {
                    icon: '',
                    title: '步骤3',
                    description: '描述3',
                    status: 'pause'
                },
                {
                    icon: '',
                    title: '步骤4',
                    description: '描述4',
                    status: 'process'
                },
                {
                    icon: '',
                    title: '步骤5',
                    description: '描述5',
                    status: 'wait'
                }
            ],
            options: {
                process: 'SkyBlue',
                pause: 'DarkOrange'
            }
        }
    }
    }
</script>
```
:::

其他使用：居中的步骤条、竖式步骤条、简洁风格风格的步骤条，和 `Steps` 一致，参照 `Steps`

### TySteps Attributes
| 参数             | 说明       | 类型   | 可选值 | 默认值 |
| ---------------- | ---------- | ------ | ------ | ------ |
| nodeList        | 节点数据 | Array | —      | —      |
| options  | 颜色配置数据 | Object | —      | {}   |

其他参数参照`steps`
