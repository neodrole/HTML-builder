const fs = require('fs');
const path = require('path');

const stylesPath = path.join(__dirname, 'styles');
const bundlePath = path.join(__dirname, 'project-dist', 'bundle.css');
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