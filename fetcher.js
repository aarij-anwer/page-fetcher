const request = require('request');
const fs = require('fs');

const fetcher = function() {
  let URL = process.argv[2];
  let file = process.argv[3];

  if ((URL) && (file)) {
    request(URL, (error, response, body) => {
      if ((!error) && response.statusCode === 200) {
        // do something
        fs.writeFile(file, body, err => {
          if (err) {
            console.log(err);
          } else {
            console.log(`Downloaded and saved ${body.length} bytes to ${file}`);
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