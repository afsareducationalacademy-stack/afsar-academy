const { createClient } = require('@sanity/client');
const fs = require('fs');
const https = require('https');

const client = createClient({
  projectId: 'o58ljzka',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2023-05-03'
});

client.fetch('*[_type == "contactPageImages"][0]{"url": buildingPhoto.asset->url}').then(res => {
  if (res && res.url) {
    console.log('Downloading:', res.url);
    const file = fs.createWriteStream('public/og-image.jpg');
    https.get(res.url, function(response) {
      response.pipe(file);
      file.on('finish', function() {
        file.close();
        console.log('Image downloaded successfully!');
      });
    }).on('error', function(err) {
      console.error('Error downloading image:', err);
    });
  } else {
    console.log('No building photo found in Sanity.');
  }
});
