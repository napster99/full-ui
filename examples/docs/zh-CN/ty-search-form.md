## TySearchForm 筛选栏

### 基础用法

:::demo
```html
<ty-search-form :form="filterForm"></ty-search-form>

<script>
export default {
  data() {
    return {
      filterForm: {
        hello: 'hello',
        world: 'world'
      }
    }
  }
}
</script>
```
:::