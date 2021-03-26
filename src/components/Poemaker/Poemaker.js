import PoetryProvider from "../../providers/PoetryProvider.class";

export default async function Poemaker(
  paragraphs = 0,
  verses = 0,
  book = 0,
  author = 0
) {
  if ((paragraphs, verses, book, author)) {
    let allVerses = [];
    let randomVerses = [];

    console.log("poemaker´s movidas", paragraphs, verses, book, author);
    const poetryData = new PoetryProvider();

    const result = await poetryData.getPoemsByBook(book);
    console.log(
      "resultado del fetch en poemaker",
      result,
      "sobre el libro",
      book
    );
    // Escoger aleatoriamente n versos de todos los poemas donde n = paragraphs * verses
    // Calcular cuántos versos tengo en total
    console.log("result", result);
    console.log("mapeando versos");
    // const mapVerses = () => {
    if (result) {
      result.forEach((title) => {
        title.verses.forEach((verse) => {
          allVerses.push(verse.text);
        });
      });
      console.info("Aquí están los versos originales con los que fue montado el poema random", allVerses);
      for (let i = 0; i < paragraphs * verses; i++) {
        randomVerses.push(
          allVerses[Math.floor(Math.random() * allVerses.length)]
        );
      }

      return randomVerses;
    }
  }
}
