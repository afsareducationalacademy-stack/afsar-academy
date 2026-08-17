const fs = require('fs');
const https = require('https');

const url = "https://cdn.sanity.io/images/o58ljzka/production/a2608ab996e05e893242fa25985c763efdd5d016-4032x2268.jpg?w=1200&h=630&fit=crop";
const file = fs.createWriteStream('public/og-image.jpg');

https.get(url, function(response) {
  response.pipe(file);
  file.on('finish', function() {
    file.close();
    console.log('Image downloaded successfully!');
  });
});
