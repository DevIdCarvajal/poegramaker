// const express = require("express");
const axios = require('axios');
const cheerio = require('cheerio');
const mongoose = require('mongoose');

require('dotenv').config();

//const urlDatabase = `${process.env.DB_PROT}://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
const urlDatabase = process.env.DB_ATLAS;
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

async function getNextSequenceValue(sequenceName) {
  let next = 0;

  const CounterSchema = new mongoose.Schema({ _id: String, next: Number }, { versionKey: false });

  CounterSchema.statics.findAndModify = function (query, sort, doc, options, callback) {
    return this.collection.findAndModify(query, sort, doc, options, callback);
  };
  
  const Counter = mongoose.model('counters', CounterSchema);
  
  await Counter.findAndModify({ _id: sequenceName }, [], { $inc: { next: 1 } }, {}, function (err, counter) {
    if (err) throw err;
    next = counter.next;
  });

  console.log(next)

  return next;
}

async function scraper(urlPoem, idPoem, idBook, idAuthor) {
  if (urlPoem) {
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
    const PoemSchema = new mongoose.Schema({ _id: Number, title: String, verses: [VerseSchema], idBook: Number, idAuthor: Number }, { versionKey: false });
      
    const Poem = mongoose.model('poems', PoemSchema);
    //const next = await getNextSequenceValue('idPoem');
    const newPoem = new Poem({ _id: idPoem, title, verses, idBook, idAuthor })
    newPoem.save().then(() => console.log("Poema insertado"));
  }
  else {
    console.log("No se indicó URL a scrapear");
  }
}

scraper(process.argv[2], 1, 1, 1);

//app.listen(port, () => `Listening on ${port}`);
