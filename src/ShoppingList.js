class ShoppingList {
   constructor() {
     this.items = [];
   }
 
   addItem(item) {
     // Check if the item already exists in the list
     const existingItem = this.items.find(existing => existing.name === item.name);
     if (existingItem) {
       // If it exists, increase the amount
       existingItem.amount += item.amount;
     } else {
       // If it does not exist, add it to the list
       this.items.push({ ...item }); // Spread operator to clone the object
     }
   }
 
   generateList(meals) {
     this.items = []; // Reset the items array before generating the new list
     meals.forEach(meal => {
       meal.ingredients.forEach(ingredient => {
         this.addItem(ingredient);
       });
     });
   }
 
   displayList(containerSelector) {
     const container = document.querySelector(containerSelector); // Select the container for the list
     if (!container) {
       console.error(`Container not found: ${containerSelector}`);
       return;
     }
 
     // Clear existing content
     container.innerHTML = "";
 
     // Create list items
     this.items.forEach(item => {
       const listItem = document.createElement("li");
       listItem.textContent = `${item.amount} ${item.name}`; // Display amount and name
       container.appendChild(listItem); // Add item to the container
     });
   }
 }
 
 export default ShoppingList;
 