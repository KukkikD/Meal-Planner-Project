import { getLocalStorage, setLocalStorage } from './utils.js';
import { MealPlan } from "./MealPlan.js";

export class MealPlanner {
  constructor() {
    this.weeklyMeals = {}; // Object to store meals for each day
  }

  addMeal(day, meal) {
    if (!this.weeklyMeals[day]) {
      this.weeklyMeals[day] = [];
    }
    this.weeklyMeals[day].push(meal);
  }

  getMeals(day) {
    return this.weeklyMeals[day] || [];
  }

  generateShoppingList() {
    const shoppingList = {}; // Object to consolidate ingredients

    for (const day in this.weeklyMeals) {
      this.weeklyMeals[day].forEach((meal) => {
        meal.ingredients.forEach((ingredient) => {
          if (shoppingList[ingredient.name]) {
            shoppingList[ingredient.name] += ingredient.amount;
          } else {
            shoppingList[ingredient.name] = ingredient.amount;
          }
        });
      });
    }

    return shoppingList;
  }
}
//document.addEventListener("DOMContentLoaded", () => {
 // const mealPlan = new MealPlan('weeklyPlan', 'dayListSelector');

  // Manually add some test meals
  //mealPlan.addRecipe('sunday', { id: 1, title: 'Pasta',  image: 'pasta.jpg', ingredients: [] });
  //mealPlan.addRecipe('monday', { id: 2, title: 'Salad',  image: 'salad.jpg', ingredients: [] });

  //mealPlan.loadWeeklyPlan(); // Call to load and display the meal plan
//});

//Use this code when API not limit
document.addEventListener("DOMContentLoaded", () => {
  const mealPlan = new MealPlan('weeklyPlan', 'dayListSelector');
  mealPlan.loadWeeklyPlan(); // Call to load and display the meal plan
});