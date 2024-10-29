import { getLocalStorage, setLocalStorage } from './utils.js';

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
      this.weeklyMeals[day].forEach(meal => {
        meal.ingredients.forEach(ingredient => {
          // Consolidate ingredients into the shopping list
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

export default class MealPlan {
  constructor(key, dayListSelector) {
    this.key = key;
    this.dayListSelector = dayListSelector; // Selector for the days in the planner
    this.weeklyPlan = getLocalStorage(this.key) || {}; // Load existing meals from local storage
  }

  addRecipe(day, recipe) {
    if (!this.weeklyPlan[day]) {
      this.weeklyPlan[day] = []; // Create a new day if it doesn’t exist yet
    }

    // Add the recipe to the specified day
    this.weeklyPlan[day].push(recipe);
    setLocalStorage(this.key, this.weeklyPlan); // Update LocalStorage
    this.renderDayRecipes(day); // Update UI for this day
  }

  removeRecipe(day, recipeId) {
    if (this.weeklyPlan[day]) {
      this.weeklyPlan[day] = this.weeklyPlan[day].filter(recipe => recipe.id !== recipeId); // Remove the recipe with the matching id
      setLocalStorage(this.key, this.weeklyPlan); // Update LocalStorage
      this.renderDayRecipes(day); // Update UI for this day
    }
  }

  renderDayRecipes(day) {
    const dayMap = {
      'sunday': 'sundayMeals',
      'monday': 'mondayMeals',
      'tuesday': 'tuesdayMeals',
      'wednesday': 'wednesdayMeals',
      'thursday': 'thursdayMeals',
      'friday': 'fridayMeals',
      'saturday': 'saturdayMeals',
    };

    const dayList = document.querySelector(`#${dayMap[day.toLowerCase()]}`);

    if (!dayList) {
      console.error(`No element found for selector: #${dayMap[day]}`);
      return;
    }

    dayList.innerHTML = ""; // Clear old items

    if (this.weeklyPlan[day]) {
      this.weeklyPlan[day].forEach(recipe => {
        const recipeItem = document.createElement("li");
        recipeItem.innerHTML = `
          <span>${recipe.title}</span>
          <img src="${recipe.image}" alt="${recipe.title}" />
          <button class="remove-recipe" data-id="${recipe.id}">Remove</button>
        `;
        dayList.appendChild(recipeItem);
      });

      // Add event listener for the remove button
      dayList.querySelectorAll(".remove-recipe").forEach(button => {
        button.addEventListener("click", () => {
          const recipeId = button.dataset.id;
          this.removeRecipe(day, recipeId); // Call the function to remove the recipe
        });
      });
    }
  }

  loadWeeklyPlan() {
    // Render meals for each day on page load
    const dayMap = {
      "sunday": "sundayMeals",
      "monday": "mondayMeals",
      "tuesday": "tuesdayMeals",
      "wednesday": "wednesdayMeals",
      "thursday": "thursdayMeals",
      "friday": "fridayMeals",
      "saturday": "saturdayMeals",
    };

    Object.keys(this.weeklyPlan).forEach(day => {
      const lowerCaseDay = day.toLowerCase();
      if (lowerCaseDay in dayMap) {
        this.renderDayRecipes(lowerCaseDay); // Render recipes for valid days
      } else {
        console.error(`Invalid day provided: ${day}`);
      }
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const weeklyPlan = getLocalStorage('weekly-planner') || {};
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

  days.forEach(day => {
    const dayList = document.getElementById(day); // ตรวจสอบให้แน่ใจว่า element นี้มีอยู่ใน HTML
    if (dayList && weeklyPlan[day]) {
      weeklyPlan[day].forEach(item => {
        const recipeElement = document.createElement("li");
        recipeElement.textContent = `${item.title} (ID: ${item.id})`; // คุณสามารถปรับแต่งได้ตามที่ต้องการ
        dayList.appendChild(recipeElement);
      });
    }
  });
});

