## TySearchForm 筛选栏

### 基础用法

:::demo
```html
<ty-search-form :form="searchForm" @search="handleSearch" @change="handleChange"></ty-search-form>

<script>
export default {
  data() {
    return {
      searchForm: {
        hello: '',
        world: 'world'
      }
    }
  },
  methods: {
    handleSearch(searchForm) {
      console.log(searchForm);
    },
    handleChange(searchForm) {
      console.log(searchForm);
    }
  }
}
</script>
```
:::

### 定制筛选框

:::demo
```html
<ty-search-form
  :form="searchForm"
  :options="options"
  @onHello="handleHello"
  @onColor="handleColor"
></ty-search-form>

<script>
export default {
  data() {
    return {
      searchForm: {
        hello: '',
        color: ''
      },
      options: [
        {
          type: 'input',
          value: 'hello',
          placeholder: '请输入hello'
        },
        {
          type: 'select',
          value: 'color',
          placeholder: '请选择color',
          style: {
            width: '15em'
          },
          options: [
            {
              value: '#F56C6C',
              label: 'red',
              disabled: true
            },
            {
              value: '#67C23A',
              label: 'green'
            },
            {
              value: '#E6A23C',
              label: 'orange'
            }
          ]
        }
      ]
    }
  },
  methods: {
    handleHello(val) {
      console.log(val)
    },
    handleColor(val) {
      console.log(val)
    }
  }
}
</script>
```
:::

### 联动选择框

:::demo
```html
<ty-search-form
  ref="linkageRef"
  :form="searchForm"
  :options="options"
  @onProvince="handleProvince"
  @onCity="handleCity"
  @reset="handleReset"
></ty-search-form>

<script>
const provinceOpt = [
  {
    value: 0,
    label: '浙江省'
  },
  {
    value: 1,
    label: '广东省'
  }
]
const cityOpt = [
  {
    value: 0,
    label: '杭州市',
    provinceId: 0
  },
  {
    value: 1,
    label: '宁波市',
    provinceId: 0
  },
  {
    value: 2,
    label: '广州市',
    provinceId: 1
  },
  {
    value: 3,
    label: '深圳市',
    provinceId: 1,
    disabled: true
  }
]
export default {
  data() {
    return {
      // 传入了options的情况下，searchForm会自动补全表单字段
      searchForm: {},
      options: [
        {
          type: 'select',
          value: 'province',
          placeholder: '请选择省',
          options: []
        },
        {
          type: 'select',
          value: 'city',
          placeholder: '请选择市',
          options: []
        }
      ]
    }
  },
  methods: {
    handleReset(form) {
      console.log('重置之前的表单快照', form);
      this.setProvinceOpt();
    },
    setProvinceOpt() {
      const province = this.$refs['linkageRef'].searchOptions.find(item => item.value === 'province');
      province ? province.options = provinceOpt : '';
    },
    setCityOpt(provinceId) {
      const city = this.$refs['linkageRef'].searchOptions.find(item => item.value === 'city');
      city ? city.options = cityOpt.filter(item => item.provinceId === provinceId) : '';
    },
    handleProvince(val) {
      this.$refs['linkageRef'].searchForm.city = '';
      this.setCityOpt(val);
    },
    handleCity(val) {
      console.log(val);
    }
  },
  mounted() {
    this.setProvinceOpt();
  }
}
</script>
```
:::