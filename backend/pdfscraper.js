const fs = require("fs");
const PDFParser = require("pdf2json");

const filesPath = './data/pdf';
const files = fs.readdirSync(filesPath);

let poems = [];

async function pdfscraper() {
    await Promise.all(files.map(async (file) => {
        let pdfParser = new PDFParser(this, 2);
        pdfParser.loadPDF(`${filesPath}/${file}`);

        let poem = await new Promise(async (resolve, reject) => {
            pdfParser.on("pdfParser_dataReady", (pdfData) => {
                let verses = [];
                
                const raw = pdfParser
                    .getRawTextContent()
                    .split("\r\n")
                    .filter( line => !/\-{16}Page\s\(\d+\)\sBreak\-{16}/g.test(line) )
                    .map(line => verses.push(line.trim()));
                
                resolve({
                    text: verses
                });
            });
        });
        
        poems.push(poem);
    }));

    console.log(poems);
}

pdfscraper();