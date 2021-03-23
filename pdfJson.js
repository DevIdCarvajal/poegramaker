// Import dependencies
const fs = require("fs");
const PDFParser = require("pdf2json");

// Get all the filenames from the poems folder
const files = fs.readdirSync("./public/pdfFiles");

// All of the parse poems
let poems = [];

// Make a IIFE so we can run asynchronous code
(async () => {

    // Await all of the poems to be passed
    // For each file in the poems folder
    await Promise.all(files.map(async (file) => {

        // Set up the pdf parser
        let pdfParser = new PDFParser(this, 2);
        // Load the pdf document
        pdfParser.loadPDF(`./public/pdfFiles/${file}`);

        // Parsed the poem
        let poem = await new Promise(async (resolve, reject) => {

            // On data ready
            pdfParser.on("pdfParser_dataReady", (pdfData) => {
                let verses = []
                // The raw PDF data in text form
                const raw = pdfParser
                    .getRawTextContent()
                    .split("\r\n")
                    .filter( line => !/\-{16}Page\s\(\d+\)\sBreak\-{16}/g.test(line) )
                    .map(line => {
                        const verse = line.trim();
                        verses.push(verse);
                        console.log(verse)
                        })              
                        // //Return the parsed data
                        resolve({
                            text: verses
                        });
                        
                    });
        
    });
    // Add the poems to the poems array
    poems.push(poem);
}));

// Save the extracted information to a json file
const json_poems = JSON.stringify(poems);
fs.writeFileSync("./public/poems/poem.json",json_poems, 'utf-8');

})();  
