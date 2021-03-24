export default class PoetryProvider {
  constructor(serverUrl) {
    this.serverUrl = serverUrl;
  }

  async getAuthors() {
    const response = await fetch(`${this.serverUrl}authors`);
    return await response.json();
  }

  async getBooksByAuthor(id) {
    const response = await fetch(`${this.serverUrl}books/${id}`);
    return await response.json();
  }

  async getPoemsByBook(id) {
    const response = await fetch(`${this.serverUrl}poems/${id}`);
    return await response.json();
  }
}