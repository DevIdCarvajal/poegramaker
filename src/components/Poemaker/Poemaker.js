import PoetryProvider from '../../providers/PoetryProvider.class'

export default async function Poemaker(paragraphs = 0, verses = 0, book = 0, author = 0) {

if(paragraphs, verses, book, author) {
    let allVerses = []
    let randomVersesNumbers = [] // indices
    let randomVerses = []

    console.log("poemaker´s movidas", paragraphs, verses, book, author)
    const poetryData = new PoetryProvider()
    
    const result = await poetryData.getPoemsByBook(book)
    const selectedBook = await result
    console.log(selectedBook)
    
     // Escoger aleatoriamente n versos de todos los poemas donde n = paragraphs * verses
     // Calcular cuántos versos tengo en total 
    console.log("result", result)
    const mapVerses = () => {
        if(selectedBook){  
        selectedBook.forEach((poem)=>{
            poem.paragraphs.forEach((paragraph) => {
                paragraph.forEach((verse)=>{
                    allVerses.push(verse)
                }) 
            })
        })
    }
    mapVerses()
        for(let i = 0 ; i < paragraphs*verses ; i++){
            randomVerses.push(allVerses[Math.floor(Math.random() * allVerses.length)])
        }
        
        return randomVerses
    }
}


}
