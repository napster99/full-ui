'use strict';

process.on('exit', () => {
  console.log();
});

if (!process.argv[2]) {
  console.error('[组件名]必填 - Please enter a ty-component name');
  process.exit(1);
}

const path = require('path');
const fs = require('fs');
const fileSave = require('file-save');
const uppercamelcase = require('uppercamelcase');
const componentname = process.argv[2];
const chineseName = process.argv[3] || componentname;
const ComponentName = uppercamelcase(componentname);
console.log('ComponentName::', ComponentName);

// 写入到components
function isExist() {
  // 添加到 components.json
  const componentsFile = require('../../components.json');
  if (componentsFile[componentname]) {
    console.error(`${componentname} 已存在.`);
    process.exit(1);
  }

  // 把组件写入配置文件
  componentsFile[componentname] = `@tuya-fe/${componentname}`;
  fileSave(path.join(__dirname, '../../components.json'))
    .write(JSON.stringify(componentsFile, null, '  '), 'utf8')
    .end('\n');
}

// 创建组件文档
function writeFile() {
  // mdFile 文档
  let filename = path.join(
    __dirname,
    '../../examples/docs/zh-CN',
    `${componentname}.md`
  );
  let fileContent = `## ${ComponentName} ${chineseName}

### 使用前的准备
\`\`\`js
import Vue from 'vue'
import ${ComponentName} from '@tuya-fe/${componentname}'

Vue.use(${ComponentName})
// or
Vue.component(${ComponentName}.name, ${ComponentName})
\`\`\`
`;

  fileSave(filename)
    .write(fileContent, 'utf8')
    .end('\n');
}

// 在src/index.js中引入组件
function importFile() {
  const filePath = path.join(__dirname, '../../src/index.js');
  let file = fs.readFileSync(filePath, 'utf8');
  let compTag = '\nconst components = [';
  let exportTag = 'export default {';
  let importStr = `import ${ComponentName} from '@tuya-fe/${componentname}';\n`;
  file = file
    .split(compTag)
    .join(importStr + compTag + `\n  ${ComponentName},`);
  file = file.split(exportTag).join(exportTag + `\n  ${ComponentName},`);
  fileSave(filePath)
    .write(file, 'utf8')
    .end();
}

// 添加到 nav.config.json
function writeNavConfig() {
  const navConfigFile = require('../../examples/nav.config.json');
  Object.keys(navConfigFile).forEach(lang => {
    // 添加到文档的末尾
    let groups = navConfigFile[lang][2].groups;
    groups[groups.length - 1].list.push({
      path: `/${componentname}`,
      title:
        lang === 'zh-CN' && componentname !== chineseName
          ? `${ComponentName} ${chineseName}`
          : ComponentName
    });
  });

  fileSave(path.join(__dirname, '../../examples/nav.config.json'))
    .write(JSON.stringify(navConfigFile, null, '  '), 'utf8')
    .end('\n');
}

isExist();
writeFile();
importFile();
writeNavConfig();

console.log('DONE!');
