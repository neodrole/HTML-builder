const fs = require('fs');
const path = require('path');

const projectPath = path.join(__dirname, 'project-dist');

fs.mkdir(projectPath, {recursive: true}, (err) => {
  if (err) {
    console.log(err);
  }
});

const indexPath = path.join(projectPath, 'index.html');
const componentsPath = path.join(__dirname, 'components');
let template = '';

fs.readFile(path.join(__dirname, 'template.html'),'utf-8', (err, data) => {
  if (err) {
    console.log(err);
  }
  template = data;
  const componentsList = template.match(/{{[a-z]*}}/g);
  console.log(componentsList);
  componentsList.forEach((component, index) => {
    console.log(component);
    let componentFileName = component.slice(2,-2) + '.html';
    fs.readFile(path.join(componentsPath, componentFileName), 'utf-8', (err, data) => {
      if (err) {
        console.log(err);
      }
      template = template.replace(component, data);
      console.log(component);
      //console.log(template);
      fs.writeFile(indexPath, template, (err) => {
        if (err) {
          console.log(err);
        }
      });
    })
  })
});

const stylesPath = path.join(__dirname, 'styles');
const bundlePath = path.join(__dirname, 'project-dist', 'style.css');
const writeStream = fs.createWriteStream(bundlePath);
fs.readdir(stylesPath,
  {encoding: 'utf8', withFileTypes: true},
  (err, files) => {
    if (err) {
      console.log(err);
    }
    files.forEach(element => {
      if(element.isFile() && path.extname(element.name) === '.css') {
        let readStream = fs.createReadStream(path.join(stylesPath, element.name), 'utf-8');
        readStream.on("data", (chunk) => {
          writeStream.write(chunk);
        })
      }
    })
});


function copyDir (originalPath, copyPath) {
  fs.mkdir(copyPath, {recursive: true}, (err) => {
    if (err) {
      console.log(err);
    }
  });
  fs.readdir(originalPath, {encoding: 'utf8', withFileTypes: true}, (err, files) => {
    files.forEach(element => {
      if (element.isFile()) {
        fs.copyFile(path.join(originalPath, element.name),
          path.join(copyPath, element.name), (err) => {
          if (err) {
            console.log(err);
          }
        });
      }
      if (element.isDirectory()) {
        copyDir(path.join(originalPath, element.name), path.join(copyPath, element.name));
      }

    });
  });
  fs.readdir(copyPath, {encoding: 'utf8', withFileTypes: true}, (err, files) => {
    files.forEach(element => {
      fs.access(path.join(originalPath, element.name), (err) => {
        if (err) {
          fs.unlink(path.join(copyPath, element.name), (err) => {
            if (err) {
              console.log(err);
            }
          })
        }
      })
    });
  });
}

copyDir(path.join(__dirname, 'assets'), path.join(__dirname, 'project-dist', 'assets'));