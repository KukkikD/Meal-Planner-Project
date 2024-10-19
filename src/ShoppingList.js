class ShoppingList {
  constructor() {
     this.items = [];
  }

  addItem(item) {
     this.items.push(item);
  }

  generateList(meals) {
     meals.forEach(meal => {
        meal.ingredients.forEach(ingredient => {
           this.addItem(ingredient);
        });
     });
  }

  displayList() {
     // Logic to display the list in the UI
  }
}

export default ShoppingList;
