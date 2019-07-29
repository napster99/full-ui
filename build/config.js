var path = require('path');
var fs = require('fs');
var nodeExternals = require('webpack-node-externals');
var Components = require('../components.json');

var utilsList = fs.readdirSync(path.resolve(__dirname, '../src/utils'));
var mixinsList = fs.readdirSync(path.resolve(__dirname, '../src/mixins'));
var transitionList = fs.readdirSync(
  path.resolve(__dirname, '../src/transitions')
);
var externals = {};

Object.keys(Components).forEach(function(key) {
  externals[`@tuya-fe/full-ui/packages/${key}`] = `@tuya-fe/full-ui/lib/${key}`;
});

externals['@tuya-fe/full-ui/src/locale'] = '@tuya-fe/full-ui/lib/locale';
utilsList.forEach(function(file) {
  file = path.basename(file, '.js');
  externals[
    `@tuya-fe/full-ui/src/utils/${file}`
  ] = `@tuya-fe/full-ui/lib/utils/${file}`;
});
mixinsList.forEach(function(file) {
  file = path.basename(file, '.js');
  externals[
    `@tuya-fe/full-ui/src/mixins/${file}`
  ] = `@tuya-fe/full-ui/lib/mixins/${file}`;
});
transitionList.forEach(function(file) {
  file = path.basename(file, '.js');
  externals[
    `@tuya-fe/full-ui/src/transitions/${file}`
  ] = `@tuya-fe/full-ui/lib/transitions/${file}`;
});

externals = [
  Object.assign(
    {
      vue: 'vue'
    },
    externals
  ),
  nodeExternals()
];

exports.externals = externals;

exports.alias = {
  main: path.resolve(__dirname, '../src'),
  packages: path.resolve(__dirname, '../packages'),
  examples: path.resolve(__dirname, '../examples'),
  'full-ui': path.resolve(__dirname, '../'),
  '@tuya-fe/full-ui': path.resolve(__dirname, '../')
};

exports.vue = {
  root: 'Vue',
  commonjs: 'vue',
  commonjs2: 'vue',
  amd: 'vue'
};

exports.jsexclude = /node_modules|utils\/popper\.js|utils\/date\.js/;
