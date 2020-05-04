/* eslint-disable no-console */
'use strict';

const fs = require('fs');
const path = require('path');
const glob = require('glob');

const pathTargetIndexJs = path.resolve(__dirname, '..', 'index.js');

const pathVueComponentsRoot = path.resolve(__dirname, '..', 'components');
const pathsVueComponents = glob.sync('*/*/Ca*.vue', {
  cwd: pathVueComponentsRoot
});
const pathsVueMixins = glob.sync('*/*/Mix*.js', {
  cwd: pathVueComponentsRoot
});
const pathsVueAll = pathsVueComponents.concat(pathsVueMixins);
function createIndexFiles() {
  const filesContent = generateFilesContent();
  saveIndexJs(filesContent.contentIndexJs);
  console.log('index.js created');
}

function generateFilesContent() {
  const imports = [];
  const exports = [];
  for (const pathComponentVue of pathsVueAll) {
    let caComponentName = pathComponentVue.replace(/.*\/(Ca.+)\.vue/, '$1');
    caComponentName = caComponentName.replace(/.*\/(Mix.+)\.js/, '$1');
    const importLine = `import ${caComponentName} from "./components/${pathComponentVue}";`;
    imports.push(importLine);
    const exportLine = '  ' + caComponentName;
    exports.push(exportLine);
  }
  const contentIndexJs =
    '/* eslint-disable */\n// Auto-generated file by create-index-files.js. Do not edit manually\n' +
    imports.join('\n') +
    '\n\n' +
    'export {\n' +
    exports.join(',\n') +
    '\n};\n';
  const contentJsJs = contentIndexJs.replace(/\.vue";/g, '.js";');

  return {
    contentIndexJs,
    contentJsJs
  };
}

function saveIndexJs(contentIndexJs) {
  fs.writeFileSync(pathTargetIndexJs, contentIndexJs);
}

module.exports = {
  createIndexFiles
};

if (require.main === module) {
  createIndexFiles();
}
