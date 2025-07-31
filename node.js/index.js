const fs = require("fs");
const { Command } = require('commander')

/*
function main(fileName){
    fs.readFile(fileName,"utf-8", function(rr,data){
      let total =0;
      for (let i = 0; i< data.length; i++){
        if(data[i] === " "){
        total ++;
        }
      }
      console.log(total + 1)
    })
}

main(process.argv[2])*/

const program = new Command();

program
  .name('counter')
  .description('CLI to do file based tasks')
  .version('0.8.0');

program.command('count_words')
  .description('Count the number of  words in a line')
  .argument('<file>', 'file to count')
  .action((file) => {
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) {
        console.log(err);
      } else {
        const words = data.split(' ').length;
        console.log(`There are ${words + 1} in the file`)
      }
    });
  });

program.parse();