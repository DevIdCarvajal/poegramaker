// const express = require("express");
const axios = require('axios');
const cheerio = require('cheerio');
const mongoose = require('mongoose');

require('dotenv').config();

//const MongoClient = require('mongodb').MongoClient;

const urlDatabase = `${process.env.DB_PROT}://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
const mongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

mongoose.connect(urlDatabase, mongoOptions);


// const app = express();
// app.use(express.static(__dirname + "/build"));

// const port = 8080;

// app.get("/", function(req, res) {
// })

async function scraper() {
  const urlPoem = process.argv[2] || 'https://www.poemas-del-alma.com/el-rey-de-harlem.htm';
  const html = await axios.get(urlPoem);
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
    
    // Insert poem into database
  const VerseSchema = new mongoose.Schema({ text: String, paragraph: Number }, { _id: false, autoIndex: false });
  const PoemSchema = new mongoose.Schema({ title: String, verses: [VerseSchema] }, { versionKey: false });
    
    const Poem = mongoose.model('poems', PoemSchema);

    const newPoem = new Poem({ title, verses });

    newPoem
      .save()
      .then(() => console.log("Ok poema ahora sí que sí"));
}

scraper();

//app.listen(port, () => `Listening on ${port}`);
