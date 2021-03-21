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

                // The raw PDF data in text form
                const raw = pdfParser.getRawTextContent().replace(" ");
                console.log(raw)
                // //Return the parsed data
                resolve({
                    id: /id\s(.*?)idBook/i.exec(raw),
                    idBook: /idBook\s(.*?)title/i.exec(raw),
                    title: /title\s(.*?)paragraphs/i.exec(raw),
                    paragraphs: /paragraphs\s(.*?)--/i.exec(raw),
            });
            
        });
        
    });
    // Add the patient to the poems array
    poems.push(poem);
}));


// Save the extracted information to a json file
const json_poems = JSON.stringify(poems);
fs.writeFileSync("./public/poems/poem.json",json_poems, 'utf-8');


})();  
