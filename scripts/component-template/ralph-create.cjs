/* eslint-disable no-console */
'use strict';
process.on('exit', code => {
  if (code === 0) {
    console.log(
      '\n\nNew component created successfully. Refresh your files tree, if you can\'t see the new files :)"\n\n"'
    );
  }
});

const path = require('path');
const fs = require('fs');
const fileSave = require('file-save');
const uppercamelcase = require('uppercamelcase');
const glob = require('glob');
const prompts = require('prompts');

const ATOMIC_TYPE = ['atoms', 'molecules', 'organisms', 'mixins'];

const questions = [
  {
    type: 'select',
    name: 'component',
    message: 'What type of component do you want to create?',
    choices: ATOMIC_TYPE,
    initial: 1
  },
  {
    type: 'text',
    name: 'name',
    message: 'Enter the name for the component',
    initial: 'banner-image'
  }
];

(async () => {
  const response = await prompts(questions);

  const component = ATOMIC_TYPE[response.component];
  const fwFolder = './scripts/component-template/';
  const name = response.name;

  createComponent(component, name);

  function createComponent(componentFolder, componentName) {
    const ComponentPrefix = componentFolder === 'mixins' ? 'mix' : 'ca';
    const ComponentType = componentFolder;
    const ComponentTypeCamelCase = uppercamelcase(componentFolder);
    const ComponentName = uppercamelcase(componentName);
    const ComponentNameCamelCase = uppercamelcase(
      ComponentPrefix + ComponentName
    );
    const ComponentNameKebabCase =
      ComponentPrefix +
      ComponentName.replace(
        /([A-Z])(?=\w)/g,
        (s1, s2) => '-' + s2.toLowerCase()
      );
    const PackagePath = path.resolve(
      __dirname,
      `../components/${componentFolder}`,
      `${ComponentNameCamelCase}`
    );
    const SASSpath = path.resolve(
      __dirname,
      `../styles/components/${componentFolder}`
    );
    const ret = glob.sync(PackagePath + '/' + ComponentNameCamelCase + '.js');

    if (ret.length > 0) {
      console.warn(
        `${ComponentNameCamelCase} component was already created. \n`
      );
      process.exit(-1);
    }
    if (!fs.existsSync(fwFolder)) {
      console.warn(
        '\n\nSomething went wrong while generating files: no component templates available. Component not created. \n'
      );
      process.exit(-1);
    }

    fs.readdirSync(fwFolder).forEach(file => {
      let fileName;
      const filePath = file.includes('.scss') ? SASSpath : PackagePath;

      if (file.includes('.vue') && componentFolder === 'mixins') {
        return;
      }

      if (file.includes('.mixin.js') && componentFolder !== 'mixins') {
        return;
      }

      if (
        (file.includes('.spec.js') || file.includes('.scss')) &&
        componentFolder === 'mixins'
      ) {
        return;
      }

      if (file.includes('.scss')) {
        fileName = file.replace('component', ComponentNameKebabCase);
      } else {
        fileName = file.replace('component', ComponentNameCamelCase);
      }
      if (file.includes('.mixin.js') && componentFolder === 'mixins') {
        fileName = fileName.replace('.mixin.js', '.js');
      }

      let content = fs.readFileSync(fwFolder + file, 'utf8');
      content = content.replace(/ComponentFolder/g, componentFolder);
      content = content.replace(
        /ComponentNameCamelCase/g,
        ComponentNameCamelCase
      );
      content = content.replace(
        /ComponentNameKebabCase/g,
        ComponentNameKebabCase
      );
      content = content.replace(/ComponentName/g, ComponentName);
      content = content.replace(
        /ComponentTypeCamelCase/g,
        ComponentTypeCamelCase
      );
      content = content.replace(/ComponentType/g, ComponentType);

      fileSave(path.join(filePath, fileName))
        .write(content, 'utf8')
        .end();
    });
  }
})();
