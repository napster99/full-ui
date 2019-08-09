<template>
  <div>
    <el-button
      type="primary"
      size="small"
      @click="addBtn"
    >{{title}}</el-button>
    <el-table
      :data="datas"
      style="width: 100%"
    >
      <el-table-column
        v-for="item in colums"
        align="center"
        :width="item.width ? item.width : ''"
        :key="item.value"
        :prop="item.value"
        :label="item.name"
      >
        <template slot-scope="scope">
          <el-input
            size="small"
            placeholder="请输入"
            v-model="scope.row[item.value]"
          />
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="操作"
      >
        <template slot-scope="scope">
          <el-button
            size="small"
            type="danger"
            @click="() => removeBtn(scope.$index, scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>

</template>

<script>
export default {
  name: 'TyInputList',
  props: {
    inputList: {
      type: Object,
      default: function() {
        return {
          title: '添加',
          colums: [],
          datas: []
        };
      }
    }
  },
  watch: {
    inputList: {
      handler(newVal) {
        this.$emit('inputList', newVal);
      },
      deep: true
    }
  },
  data() {
    return {
      title: this.inputList.title,
      colums: this.inputList.colums,
      datas: this.inputList.datas
    };
  },
  methods: {
    addBtn() {
      this.datas.push({ __new: true });
    },
    removeBtn(index, row) {
      this.$emit('removeItem', row, () => {
        this.datas.splice(index, 1);
      });
    }
  }
};
</script>
