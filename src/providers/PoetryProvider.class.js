class PoetryProvider {
  constructor() {}

  getAuthors() {
    const authors = [
      {
        id: 1,
        name: "Federico García Lorca"
      },
      {
        id: 2,
        name: "Rosalía de Castro"
      }
    ];

    return authors;
  }

  getBooksByAuthor(id) {
    const books = [
      {
        id: 1,
        title: "Poeta en Nueva York",
        idAuthor: 1
      },
      {
        id: 2,
        title: "Romancero gitano",
        idAuthor: 1
      },
      {
        id: 3,
        title: "Cantares gallegos",
        idAuthor: 2
      },
      {
        id: 4,
        title: "Follas novas",
        idAuthor: 2
      }
    ];

    return books.filter(book => book.idAuthor === id)
  }

  getPoemsByBook(id) {
    const poems = [
      {
        id: 1,
        idBook: 1,
        title: "Poema L1",
        paragraphs: [
          [
            "Verso L111",
            "Verso L112",
            "Verso L113"
          ],
          [
            "Verso L121",
            "Verso L122",
            "Verso L123"
          ],
          [
            "Verso L131",
            "Verso L132",
            "Verso L133"
          ]
        ]
      },
      {
        id: 2,
        idBook: 2,
        title: "Poema L2",
        paragraphs: [
          [
            "Verso L211",
            "Verso L212",
            "Verso L213"
          ],
          [
            "Verso L221",
            "Verso L222",
            "Verso L223"
          ],
          [
            "Verso L231",
            "Verso L232",
            "Verso L233"
          ]
        ]
      },
      {
        id: 3,
        idBook: 3,
        title: "Poema R1",
        paragraphs: [
          [
            "Verso R111",
            "Verso R112",
            "Verso R113"
          ],
          [
            "Verso R121",
            "Verso R122",
            "Verso R123"
          ],
          [
            "Verso R131",
            "Verso R132",
            "Verso R133"
          ]
        ]
      },
      {
        id: 4,
        idBook: 4,
        title: "Poema R2",
        paragraphs: [
          [
            "Verso R211",
            "Verso R212",
            "Verso R213"
          ],
          [
            "Verso R221",
            "Verso R222",
            "Verso R223"
          ],
          [
            "Verso R231",
            "Verso R232",
            "Verso R233"
          ]
        ]
      }
    ];

    return poems.filter(poem => poem.idBook === id)
  }
}