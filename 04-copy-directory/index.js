const fs = require('fs');
const path = require('path');
const {stdout} = process;

const originalPath = path.join(__dirname, 'files');
const copyPath = path.join(__dirname, 'files-copy');

//TODO возможно стоит добавить проверку папка/файл и соотв. создавать папки
function copyDir () {
  fs.mkdir(copyPath, {recursive: true}, (err) => {
    if (err) {
      console.log(err);
    }
  });
  fs.readdir(originalPath, (err, files) => {
    files.forEach(element => {
      fs.copyFile(path.join(originalPath, element),
        path.join(copyPath, element), (err) => {
          if (err) {
            console.log(err);
          }
        });
    });
  });
  fs.readdir(copyPath, (err, files) => {
    files.forEach(element => {
      fs.access(path.join(originalPath, element), (err) => {
        if (err) {
          fs.unlink(path.join(copyPath, element), (err) => {
            if (err) {
              console.log(err);
            }
          })
        }
      })
    });
  });
}
copyDir();