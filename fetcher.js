const fetcher = function() {
  let URL = process.argv[2];
  let file = process.argv[3];

  if ((URL) && (file)) {
    console.log(URL);
    console.log(file);


  } else {
    if (!URL) {
      console.log("Provide URL and file path");
    } else {
      console.log("Provide file path");
    }
  }
};

fetcher();