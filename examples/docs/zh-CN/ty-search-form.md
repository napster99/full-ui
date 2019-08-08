## TySearchForm 筛选栏

### 基础用法

:::demo
```html
<ty-search-form :form="filterForm" @search="handleSearch" @change="handleChange"></ty-search-form>

<script>
export default {
  data() {
    return {
      filterForm: {
        hello: '',
        world: 'world'
      }
    }
  },
  methods: {
    handleSearch(filterForm) {
      console.log(filterForm);
    },
    handleChange(filterForm) {
      console.log(filterForm);
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
  :form="filterForm"
  :options="options"
  @onHello="handleHello"
  @onWorld="handleWorld"
></ty-search-form>

<script>
export default {
  data() {
    return {
      filterForm: {
        hello: '',
        world: ''
      },
      options: [
        {
          type: 'input',
          value: 'hello',
          placeholder: '请输入hello'
        },
        {
          type: 'input',
          value: 'world',
          placeholder: '请输入world'
        }
      ]
    }
  },
  methods: {
    handleHello(val) {
      console.log(val)
    },
    handleWorld(val) {
      console.log(val)
    }
  }
}
</script>
```
:::