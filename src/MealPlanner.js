import { MealPlan } from "./MealPlan";

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

    // Iterate over each day and its meals
    for (const day in this.weeklyMeals) {
      this.weeklyMeals[day].forEach((meal) => {
        meal.ingredients.forEach((ingredient) => {
          if (shoppingList[ingredient.name]) {
            shoppingList[ingredient.name] += ingredient.amount; // Sum amounts if already exists
          } else {
            shoppingList[ingredient.name] = ingredient.amount; // Initialize amount if not exists
          }
        });
      });
    }

    return shoppingList; // Return consolidated shopping list
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const mealPlan = new MealPlan("weeklyPlan", "dayListSelector"); // Adjust the second argument as needed

  // Manually add some test meals
  mealPlan.addRecipe("sunday", {
    id: 1,
    title: "Pasta",
    image: "pasta.jpg",
    ingredients: [],
  });
  mealPlan.addRecipe("monday", {
    id: 2,
    title: "Salad",
    image: "salad.jpg",
    ingredients: [],
  });

  mealPlan.loadWeeklyPlan(); // Call to load and display the meal plan
});

//Use this code when API not limit
//document.addEventListener("DOMContentLoaded", () => {
//  const mealPlan = new MealPlan('weeklyPlan', 'dayListSelector'); // Adjust the second argument as needed

// Load existing meals from local storage
//  mealPlan.loadWeeklyPlan(); // Call to load and display the meal plan
//});
