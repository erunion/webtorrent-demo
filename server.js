const express = require('express')
const app = express()

app.get('/movie.torrent', function(req, res){
  res.download(`${__dirname}/The Last Man On Earth (1964) - Trailer.mp4.torrent`);
});

app.get('/', function (req, res) {
  res.sendFile(`${__dirname}/index.html`);
})

app.listen(3000)

console.log('Listening on http://localhost:3000')
