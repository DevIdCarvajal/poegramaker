// const express = require("express");
const axios = require('axios');
const cheerio = require('cheerio');
const MongoClient = require('mongodb').MongoClient;
const urlDatabase = "mongodb://localhost:27017/";

// const app = express();
// app.use(express.static(__dirname + "/build"));

// const port = 8080;

// app.get("/", function(req, res) {
// })

async function scraper() {
  const html = await axios.get('https://www.poemas-del-alma.com/el-rey-de-harlem.htm');
  const $ = await cheerio.load(html.data);

  const title = $('h2.title-poem').text();
  let verses = [];
  let p = 1;
  let first = true;
  
  $('#contentfont p')
    .html()
    .split("<br>")
    .map(line => {
      const verse = line.trim();
      
      if (verse !== "") {
        if (first) {
          p = 1;
          first = false;
        }

        verses.push({ text: verse, paragraph: p });
      }
      else
        p++;
    });

  MongoClient.connect(urlDatabase, { useUnifiedTopology: true }, (error, database) => {
    if (error) throw error;

    database.db("poetrydb").collection("poems").insertOne({ title, verses }, (error, response) => {
      if (error) throw error;
      database.close();
    });
  });
}

scraper();

//app.listen(port, () => `Listening on ${port}`);