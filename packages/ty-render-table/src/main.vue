<template>
  <div>
    <!-- table -->
    <el-table
      :data="tableData"
      style="width: 100%"
      :stripe="stripe"
      :border="border"
      @selection-change="handleSelectionChange"
      v-loading="tableLoading"
      :span-method="spanMethod"
    >
      <template v-for="item in tableColumns">
        <el-table-column
          v-if="item.type"
          :type="item.type"
          :width="item.width"
          :min-width="item.minWidth"
          :key="item.type"
        >
        </el-table-column>

        <el-table-column
          v-else
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          :min-width="item.minWidth"
          :key="item.prop+item.label"
          :fixed="item.fixed"
          :align="item.align || 'center'"
        >
          <expand
            slot-scope="scope"
            :render="item.render? item.render : normalRender"
            :row="item"
            :data="scope.row"
            :index="scope.$index"
            :key="item.prop"
          ></expand>
        </el-table-column>
      </template>

    </el-table>
    <!-- 分页 -->
    <el-pagination
      v-if="pageInfo.totalRecords"
      @current-change="currentChange"
      @size-change="sizeChange"
      :current-page="pageInfo.pageIndex"
      :page-size="pageInfo.pageSize"
      :page-sizes="pageInfo.pageSizes || [10,20,30,40,50,100]"
      :layout="pageInfo.layout ||'total,prev, pager, next, jumper'"
      :total="pageInfo.totalRecords"
    >
    </el-pagination>

  </div>
</template>

<script>
import expand from './expand';
export default {
  name: 'TyRenderTable',
  components: {
    expand
  },
  props: {
    tableData: {
      type: Array,
      default: () => []
    },
    tableColumns: {
      type: Array,
      default: () => []
    },
    handleSelectionChange: {
      type: Function,
      default: function() {}
    },
    currentChange: {
      type: Function,
      default: function() {}
    },
    sizeChange: {
      type: Function,
      default: function() {}
    },
    pageInfo: {
      type: Object,
      default: function() {
        return {};
      }
    },
    tableLoading: {
      type: Boolean,
      default: false
    },
    spanMethod: {
      type: Function,
      default: function() {}
    },
    stripe: {
      type: Boolean,
      default: true
    },
    border: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    normalRender(h, params) {
      let prop = params.row.prop;
      let data = params.data[prop];
      return h('div', {}, data || '--');
    }
  }
};
</script>






