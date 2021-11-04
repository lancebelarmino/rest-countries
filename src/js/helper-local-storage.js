export default class Storage {
  constructor(itemList) {
    this.itemList = itemList;
  }

  getItems() {
    let items;

    if (localStorage.getItem(this.itemList) === null) {
      items = [];
    } else {
      items = JSON.parse(localStorage.getItem(this.itemList));
    }
    
    return items;
  }

  addItem(newItem) {
    const items = this.getItems();

    // If item does not exist, add item to list
    if (!items.some(item => item === newItem)) {
      items.push(newItem);
      localStorage.setItem(this.itemList, JSON.stringify(items));
    }
  }

  updateItem(itemToUpdate) {
    const items = this.getItems();

    items.splice(0, 1, itemToUpdate);

    this.addItem(itemToUpdate);

    localStorage.setItem(this.itemList, JSON.stringify(items));
  }

  deleteItem(itemToDelete) {
    const items = this.getItems();

    items.forEach((item, index) => {
      if (item === itemToDelete) {
        items.splice(index, 1);
        localStorage.setItem(this.itemList, JSON.stringify(items));
      }
    });
  }

  deleteMultipleItems(itemArr) {
    localStorage.setItem(this.itemList, JSON.stringify(itemArr));
  }

  deleteList() {
    localStorage.removeItem(this.itemList);
  }
}