const request = require('request');
const fs = require('fs');
const { access, constants } = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


const writeToFile = function(file,body) {
  fs.writeFile(file, body, err => {
    if (err) {
      console.log(err);
    } else {
      console.log(`Downloaded and saved ${body.length} bytes to ${file}`);
    }
  });
  rl.close();
};

const fetcher = function() {
  let URL = process.argv[2];
  let file = process.argv[3];

  if ((URL) && (file)) {
    request(URL, (error, response, body) => {
      if ((!error) && response.statusCode === 200) {
        access(file, constants.F_OK, (fileDoesNotExist) => {
          if (fileDoesNotExist) {
            writeToFile(file,body);
          } else {
            rl.question('File exists. Override? Y/N ', (answer) => {
              // do something
              if (answer === "Y") {
                writeToFile(file,body);
              }
              rl.close();
            });
          }
        });
      } else {
        console.log("Invalid URL: ", URL, error.code);
      }
    });
  } else {
    if (!URL) {
      console.log("Provide URL and file path");
    } else {
      console.log("Provide file path");
    }
  }
};

fetcher();