// const express = require("express");
const axios = require('axios');
const cheerio = require('cheerio');
const MongoClient = require('mongodb').MongoClient;
const urlDatabase = "mongodb://localhost:27017/";
let fs = require('fs')

// pdfReader Test
const https = require("https");
const pdfreader = require("pdfreader");

const PDFDocument = require('pdfkit');

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


// pdfReader test

const poetryUrl = 'https://pdf.zlibcdn.com/dtoken/c85e3df150992c3d902ea7ae986aeb1b/Poesia_Completa_by_Edgar_Allan_Poe)_3345720_(z-lib.org).pdf'

async function bufferize(url) {
  var hn = url.substring(url.search("//") + 2);
  hn = hn.substring(0, hn.search("/"));
  var pt = url.substring(url.search("//") + 2);
  pt = pt.substring(pt.search("/"));
  const options = { hostname: hn, port: 443, path: pt, method: "GET" };
  return new Promise(function (resolve, reject) {
    var buff = new Buffer.alloc(0);
    const req = https.request(options, (res) => {
      res.on("data", (d) => {
        buff = Buffer.concat([buff, d]);
      });
      res.on("end", () => {
        resolve(buff);
      });
    });
    req.on("error", (e) => {
      console.error("https request error: " + e);
    });
    req.end();
  });
}
// async function getPdf(){
//   await fs.readFile("./public/pdfFiles/alfonsina-storni.pdf", (err, pdfBuffer) => {
//     // pdfBuffer contains the file content
//     new PdfReader().parseBuffer(pdfBuffer, function (err, item) {
//       if (err) callback(err);
//       else if (!item) callback();
//       else if (item.text) console.log(item.text);
//     });
//   });

// }

let pdfBuffer;

function toArrayBuffer(buf) {
  var ab = new ArrayBuffer(buf.length);
  var view = new Uint8Array(ab);
  for (var i = 0; i < buf.length; ++i) {
      view[i] = buf[i];
  }
  console.log("arrayBuffer", ab)
  let bufferOk = Buffer.from(ab)
  console.log("buffer to json", bufferOk.toJSON());
  pdfBuffer = bufferOk
  writeJson()
  return ab;
}

const result = bufferize(poetryUrl).then(res => {
  console.log(res)
  toArrayBuffer(res)

})


// let buf = Buffer.from(result)

// console.log("buffer to json", buf.toJSON());


async function readlines(buffer, xwidth) {
  return new Promise((resolve, reject) => {
    var pdftxt = new Array();
    var pg = 0;
    new pdfreader.PdfReader().parseBuffer(buffer, function (err, item) {
      if (err) console.log("pdf reader error: " + err);
      else if (!item) {
        pdftxt.forEach(function (a, idx) {
          pdftxt[idx].forEach(function (v, i) {
            pdftxt[idx][i].splice(1, 2);
          });
        });
        resolve(pdftxt);
      } else if (item && item.page) {
        pg = item.page - 1;
        pdftxt[pg] = [];
      } else if (item.text) {
        var t = 0;
        var sp = "";
        pdftxt[pg].forEach(function (val, idx) {
          if (val[1] == item.y) {
            if (xwidth && item.x - val[2] > xwidth) {
              sp += " ";
            } else {
              sp = "";
            }
            pdftxt[pg][idx][0] += sp + item.text;
            t = 1;
          }
        });
        if (t == 0) {
          pdftxt[pg].push([item.text, item.y, item.x]);
        }
      }
    });
  });
}

// (async () => {
//   var url =
//     "https://www.w3.org/TR/2011/NOTE-WCAG20-TECHS-20111213/working-examples/PDF2/bookmarks.pdf";
//   var buffer = await bufferize(poetryUrl);
//   var lines = await readlines(result, 50);
//   lines = await JSON.parse(JSON.stringify(lines));
//   console.log(lines);
// })();


//pdf2json test


PDFParser = require("pdf2json");

function writeJson(){
  
  let pdfParser = new PDFParser();
  
  pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError) );
  pdfParser.on("pdfParser_dataReady", pdfData => {
    fs.writeFile("./public/poems/poems3.json", pdfBuffer, () => {
      console.log("hola")
    });
    });
  // pdfParser.on("pdfParser_dataReady", pdfData => {
  //   fs.writeFile("./public/poems/poems.json", JSON.stringify(pdfData));
  //   });
    
    pdfParser.loadPDF("./public/pdfFiles/alfonsina-storni.pdf");

}



//app.listen(port, () => `Listening on ${port}`);