export class Section {
  constructor( renderer, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector)
  }

  renderItems(items) {
    items.forEach(item => this.addItem(item));
  }

  addItem(item) {
    this._container.prepend(this._renderer(item))
  }
}
