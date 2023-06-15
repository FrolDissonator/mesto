export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = containerSelector;
  }

// метод отрисовки всех элементов
  renderItems(items) {
    items.forEach(item => {
      this._renderer(item)
    })
  }

// метод добавления DOM элемента в контейнер
  addItem(element) {
    this._container.prepend(element);
  }
}
