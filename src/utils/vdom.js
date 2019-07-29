import { hasOwn } from '@tuya-fe/full-ui/src/utils/util';

export function isVNode(node) {
  return (
    node !== null &&
    typeof node === 'object' &&
    hasOwn(node, 'componentOptions')
  );
}
