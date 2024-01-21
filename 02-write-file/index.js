const fs = require('fs');
const path = require('path');
const {stdout, stdin} = process;

const filePath = path.join(__dirname, "text.txt");
const writeStream = fs.createWriteStream(filePath);

stdout.write("Enter any text you want to write in file\n");
stdin.on("data", (data) => {
  let stringData = data.toString();

  if (stringData.trim() === "exit") {
    process.exit();
  }
  writeStream.write(data);
});

process.on("exit", () => {
  stdout.write("\nGoodbye!");
});
process.on("SIGINT", () => {
  process.exit();
})