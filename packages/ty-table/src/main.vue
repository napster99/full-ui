<template>
  <el-table ref="_ref" v-bind="$attrs" v-on="$listeners">
    <template v-for="item in columns">
      <el-table-column :key="item.label || item.prop" v-bind="item" v-if="item.type"></el-table-column>
      <el-table-column :key="item.label || item.prop" v-bind="item" v-else>
        <template slot-scope="scope">
          <div v-if="!item.render">{{scope.row[item.prop]}}</div>
          <render-component :render="item.render" :scope="scope" v-else />
        </template>
      </el-table-column>
    </template>
    <template slot="append">
      <slot name="append"></slot>
    </template>
  </el-table>
</template>

<script>
// 使用render方法渲染column里面的slot
const RenderComponent = {
  name: 'RenderComponent',
  functional: true,
  props: {
    render: Function,
    scope: Object
  },
  render: (h, ctx) => ctx.props.render(h, ctx.props.scope)
};
export default {
  name: 'TyTable',
  components: {
    RenderComponent
  },
  props: {
    // ref: String,
    columns: {
      required: true,
      type: Array,
      default() {
        return [];
      }
    }
  },
  mounted() {
    // ref引用透传
    if (this.$vnode.data.ref) {
      this.$parent.$refs[this.$vnode.data.ref] = this.$refs['_ref'];
    }
  }
};
</script>

