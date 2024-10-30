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
      this.weeklyPlan[day] = [];
    }
  
    // เช็คว่ามี recipe ที่ id ตรงกันอยู่แล้วหรือไม่
    const existingRecipe = this.weeklyPlan[day].find(item => item.id === recipe.id);
    if (existingRecipe) {
      console.warn(`Recipe with ID ${recipe.id} already exists for ${day}.`);
      return; // หยุดถ้ามี recipe อยู่แล้ว
    }
  
    // ถ้าไม่มี recipe ซ้ำ เพิ่มข้อมูลใหม่
    this.weeklyPlan[day].push(recipe);
    setLocalStorage(this.key, this.weeklyPlan); // Update LocalStorage
    this.renderDayRecipes(day); // Update UI for this day
  }

  removeRecipe(day, recipeId) {
  const initialLength = this.weeklyPlan[day].length;
  
  this.weeklyPlan[day] = this.weeklyPlan[day].filter(recipe => recipe.id !== recipeId);

  if (this.weeklyPlan[day].length < initialLength) {
    console.log(`Recipe with ID ${recipeId} removed from ${day}.`);
    setLocalStorage(this.key, this.weeklyPlan); // อัปเดต Local Storage
    this.renderDayRecipes(day); // อัปเดต UI ให้แสดงผลตามข้อมูลใหม่
  } else {
    console.error(`No recipe with ID ${recipeId} found in ${day}.`);
  }
}
    
  renderDayRecipes(day) {
    console.log(`Rendering recipes for ${day}:`, this.weeklyPlan[day]);
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
  
    dayList.innerHTML = ""; // ลบรายการเก่า
  
    if (this.weeklyPlan[day] && this.weeklyPlan[day].length > 0) {
      this.weeklyPlan[day].forEach(recipe => {
        const recipeItem = document.createElement("li");
        recipeItem.innerHTML = `
          <span>${recipe.title}</span>
          <img src="${recipe.image}" alt="${recipe.title}" />
          <button class="remove-recipe" data-id="${recipe.id}">Remove</button>
        `;
        dayList.appendChild(recipeItem);
      });
  
      // เพิ่ม event listener สำหรับปุ่มลบใหม่
      dayList.querySelectorAll(".remove-recipe").forEach(button => {
        button.addEventListener("click", () => {
          const recipeId = button.dataset.id;
          this.removeRecipe(day, recipeId); // เรียกฟังก์ชันเพื่อลบสูตร
        });
      });
    } else {
      // ถ้าไม่พบสูตรให้แสดงข้อความ
      dayList.innerHTML = `<p>No meals found for ${day}.</p>`;
    }
  }

  loadWeeklyPlan() {
    // Render meals for each day on page load
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

    console.log('Weekly plan contents:', this.weeklyPlan); // Log contents for debugging

    days.forEach(day => {
      if (this.weeklyPlan[day] && this.weeklyPlan[day].length > 0) {
        this.renderDayRecipes(day); // Render recipes for valid days
      } else {
        console.warn(`No meals found for: ${day}`); // Changed to warn for clarity
      }
    });
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
  mealPlan.loadWeeklyPlan(); // โหลดแผนประจำสัปดาห์
});