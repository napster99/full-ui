export const LOAD_EXTRA_DOCS_MAP = {
  'ty-image-preview': r =>
    require.ensure([], () => r(require('@tuya-fe/ty-image-preview/README.md')))
};
