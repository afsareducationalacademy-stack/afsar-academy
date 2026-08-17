const https = require('https');

https.get('https://academy-test-kappa.vercel.app/', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const match = data.match(/<meta property="og:image" content="([^"]+)"/);
    if (match) {
      console.log('OG Image URL:', match[1]);
      // Now fetch that URL
      https.get(match[1], (imgRes) => {
        console.log('Image fetch status:', imgRes.statusCode);
        console.log('Image headers:', imgRes.headers);
      });
    } else {
      console.log('No og:image found');
    }
  });
});
