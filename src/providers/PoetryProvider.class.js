export default class PoetryProvider {
  constructor() {}

  getAuthors() {
    const authors = [
      {
        _id: 1,
        name: "Federico García Lorca"
      },
      {
        _id: 2,
        name: "Rosalía de Castro"
      }
    ];

    return authors;
  }

  getBooksByAuthor(id) {
    const books = [
      {
        _id: 1,
        title: "Poeta en Nueva York",
        idAuthor: 1
      },
      {
        _id: 2,
        title: "Romancero gitano",
        idAuthor: 1
      },
      {
        _id: 3,
        title: "Cantares gallegos",
        idAuthor: 2
      },
      {
        _id: 4,
        title: "Follas novas",
        idAuthor: 2
      }
    ];

    return books.filter(book => book.idAuthor === id)
  }

  getPoemsByBook(id) {
    const poems = [
      {
        _id: 1,
        title: "Poema L1",
        verses: [
          "Verso L111",
          "Verso L112",
          "Verso L113",
          "Verso L121",
          "Verso L122",
          "Verso L123",
          "Verso L131",
          "Verso L132",
          "Verso L133"
        ],
        idBook: 1,
        idAuthor: 1
      },
      {
        _id: 2,
        title: "Poema L2",
        verses: [
          "Verso L211",
          "Verso L212",
          "Verso L213",
          "Verso L221",
          "Verso L222",
          "Verso L223",
          "Verso L231",
          "Verso L232",
          "Verso L233"
        ],
        idBook: 2,
        idAuthor: 1
      },
      {
        _id: 3,
        title: "Poema R1",
        verses: [
          "Verso R111",
          "Verso R112",
          "Verso R113",
          "Verso R121",
          "Verso R122",
          "Verso R123",
          "Verso R131",
          "Verso R132",
          "Verso R133"
        ],
        idBook: 1,
        idAuthor: 2
      },
      {
        _id: 4,
        title: "Poema R2",
        verses: [
          "Verso R211",
          "Verso R212",
          "Verso R213",
          "Verso R221",
          "Verso R222",
          "Verso R223",
          "Verso R231",
          "Verso R232",
          "Verso R233"
        ],
        idBook: 1,
        idAuthor: 2
      }
    ];

    return poems.filter(poem => poem.idBook === id)
  }
}