/**
 * @description 返回首字母大写的单词
 * @param {string} str
 */
export const fistLetterUpper = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
/**
 * @description 对象深拷贝
 * @param {any} obj
 */
export const deepClone = (obj) => {
  const Type = {};
  const types = 'Array Object String Date RegExp Function Boolean Number Null Undefined'.split(' ');
  function type() {
    return Object.prototype.toString.call(this).slice(8, -1);
  }
  for (let i = types.length; i--;) {
    Type['is' + types[i]] = (function(self) {
      return function(elem) {
        return type.call(elem) === self;
      };
    })(types[i]);
  }

  function copy(obj, deep) {
    if (Type.isFunction(obj)) {
      return new Function('return ' + obj.toString())();
    } else if (obj === null || (typeof obj !== 'object')) {
      return obj;
    } else {
      let name = '';
      let target = Type.isArray(obj) ? [] : {};
      let value = '';

      for (name in obj) {
        value = obj[name];

        if (value === obj) {
          continue;
        }

        if (deep) {
          if (Type.isArray(value) || Type.isObject(value)) {
            target[name] = copy(value, deep);
          } else if (Type.isFunction(value)) {
            target[name] = new Function('return ' + value.toString())();
          } else {
            target[name] = value;
          }
        } else {
          target[name] = value;
        }
      }
      return target;
    }
  }

  return copy(obj);
};
