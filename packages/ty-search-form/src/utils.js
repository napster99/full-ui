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
  return JSON.parse(JSON.stringify(obj));
};
