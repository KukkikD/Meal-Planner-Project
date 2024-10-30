import { UI } from "./UI.js";

// Utility functions for localStorage
function getLocalStorage(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null; // Parse the data back to JavaScript object
  }
  
  function setLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value)); // Stringify the object before saving
  }
  
  export class MealPlan {
    constructor(key, dayListSelector) {
      this.key = key;
      this.dayListSelector = dayListSelector;
      this.weeklyPlan = getLocalStorage(this.key) || {}; // Load existing meals from local storage
    }
  
    addRecipe(day, recipe) {
      if (!this.weeklyPlan[day]) {
        this.weeklyPlan[day] = [];
      }
  
      const existingRecipe = this.weeklyPlan[day].find(item => item.id === recipe.id);
      if (existingRecipe) {
        console.warn(`Recipe with ID ${recipe.id} already exists for ${day}.`);
        return;
      }
  
      this.weeklyPlan[day].push(recipe);
      setLocalStorage(this.key, this.weeklyPlan);
      this.renderDayRecipes(day);
    }
  
    removeRecipe(day, recipeId) {
      const initialLength = this.weeklyPlan[day].length;
      recipeId = Number(recipeId); // Convert to number if needed
  
      this.weeklyPlan[day] = this.weeklyPlan[day].filter(recipe => recipe.id !== recipeId);
  
      if (this.weeklyPlan[day].length < initialLength) {
        console.log(`Recipe with ID ${recipeId} removed from ${day}.`);
        setLocalStorage(this.key, this.weeklyPlan);
        this.renderDayRecipes(day);
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
  
      dayList.innerHTML = "";
  
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
  
        // Attach event listeners to remove buttons
        dayList.querySelectorAll(".remove-recipe").forEach(button => {
          button.addEventListener("click", (event) => {
            const recipeId = event.target.dataset.id; // Get the recipe ID from the button
            this.removeRecipe(day, recipeId); // Call the removeRecipe function
          });
        });
      } else {
        dayList.innerHTML = `<p>No meals found for ${day}.</p>`;
      }
    }
  
    // Updated loadWeeklyPlan method in MealPlan.js
loadWeeklyPlan() {
    const weeklyPlan = getLocalStorage("weeklyPlan") || {}; // Load the meal plan from localStorage
  
    // Loop through each day in the weeklyPlan
    for (const day in weeklyPlan) {
      if (Array.isArray(weeklyPlan[day])) {
        weeklyPlan[day].forEach((recipe) => {
          // Check if recipe is an object (and not an ID string)
          if (typeof recipe === "object" && recipe.id && recipe.title && recipe.image) {
            console.log(`Loading ${recipe.title} for ${day}`);
            
            // Render recipe details with title, image, and remove button
            this.renderRecipe(day, recipe);
          }
        });
      }
    }
  }
  
  // New renderRecipe method to display title, image, and remove button
  renderRecipe(day, recipe) {
    // Select the correct list for each day
    const dayList = document.querySelector(`#${day.toLowerCase()}Meals`);
    
    if (!dayList) {
      console.error(`No element found for selector: #${day.toLowerCase()}Meals`);
      return;
    }
  
    // Create the list item for the recipe
    const recipeItem = document.createElement("li");
    recipeItem.innerHTML = `
      <span><img src="${recipe.image}" alt="${recipe.title}" style="width:100px; height:auto;" /></span>${recipe.title}
      
      <button class="remove-recipe" data-day="${day}" data-id="${recipe.id}">Remove</button>
    `;
  
    // Append the recipe item to the day's meal list
    dayList.appendChild(recipeItem);
  
    // Add event listener to the remove button
    recipeItem.querySelector(".remove-recipe").addEventListener("click", (event) => {
      const recipeId = event.target.dataset.id;
      this.removeRecipe(day, recipeId);
    });
  }
}
  