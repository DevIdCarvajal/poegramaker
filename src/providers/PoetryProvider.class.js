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
    return new Promise((resolve, reject) => {
      fetch(`${this.BASE_URL}/poems/${id}`).then((res) => {
        if (res.status === 200) {
          resolve(res.json());
        } else {
          reject(res.message);
        }
      });
    });
  }
}
