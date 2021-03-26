export default class PoetryProvider {
  constructor(query) {
    this.BASE_URL = "https://poesiapi.herokuapp.com";
  }

  async getAuthors() {
    return new Promise((resolve, reject) => {
      fetch(`${this.BASE_URL}/authors`).then((res) => {
        if (res.status === 200) {
          resolve(res.json());
        } else {
          reject(res.message);
        }
      });
    });
  }

  async getBooksByAuthor(id) {
    return new Promise((resolve, reject) => {
      fetch(`${this.BASE_URL}/books/${id}`).then((res) => {
        if (res.status === 200) {
          resolve(res.json());
        } else {
          reject(res.message);
        }
      });
    });
  }

  async getPoemsByBook(id) {
    console.log("book id", `${this.BASE_URL}/poems/${id}`)
    return new Promise((resolve, reject) => {
      return fetch(`${this.BASE_URL}/poems/${id}`).then((res) => {
        if (res.status === 200) {
          const result = res.json()
          console.log("lo que llega a getPoemsByBook", result)
          resolve(result);
        } else {
          console.log("error en res", res.message)
          reject(res.message);
        }
      });
    });
  }
}
