import PoetryProvider from '../../providers/PoetryProvider.class'

export default function Poemaker(paragraphs, verses, book = 0, author = 0) {

// if(!author) => trae todos 
// else 
const poetryData = new PoetryProvider()

const selectedBook = poetryData.getPoemsByBook(book)

 // Escoger aleatoriamente n versos de todos los poemas donde n = paragraphs * verses
 // Calcular cuántos versos tengo en total 
let allVerses = []
let randomVersesNumbers = [] // indices
let randomVerses = []

selectedBook.forEach((poem)=>{
    poem.paragraphs.forEach((paragraph) => {
        paragraph.forEach((verse)=>{
            allVerses.push(verse)
        }) 
    })
})

for(let i = 0 ; i < paragraphs*verses ; i++){
    randomVerses.push(allVerses[Math.floor(Math.random() * allVerses.length)])
}

return randomVerses

}
