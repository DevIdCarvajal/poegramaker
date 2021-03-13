function getData(author = "", book = "") {
  
  // Mock data
  const bookshelf = [
    {
      author: "Federico García Lorca",
      books: [
        {
          id: "rg",
          title: "Romancero gitano",
          poems: [
            {
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
                ]
              ]
            },
            {
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
                ]
              ]
            }
          ]
        },
        {
          id: "ny",
          title: "Poeta en Nueva York",
          poems: [
            {
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
                ]
              ]
            },
            {
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
                ]
              ]
            }
          ]
        }
      ]
    }
  ];
}