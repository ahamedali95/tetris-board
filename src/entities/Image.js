class Image {
  #name;
  #url;

  constructor(name, url) {
      this.#name = name;
      this.#url = url;
  }

  getName() {
      return this.#name;
  }

  getUrl() {
      return this.#url;
  }
}

export default Image;