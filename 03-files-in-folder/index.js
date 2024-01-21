const fs = require('fs');
const path = require('path');
const { stdout } = process;

const dirPath = path.join(__dirname, 'secret-folder');

fs.readdir(dirPath, { encoding: 'utf8', withFileTypes: true }, (err, files) => {
  if (err) {
    stdout.write(err);
  } else {
    files.forEach((element) => {
      //console.log(element);
      //console.log(element.isFile());
      if (element.isFile()) {
        let ext = path.extname(element.name);
        let name = path.basename(element.name, ext);
        fs.stat(path.join(dirPath, element.name), (err, stats) => {
          stdout.write(`${name} - ${ext.slice(1)} - ${stats.size}b\n`);
        });
      }
    });
  }
});
