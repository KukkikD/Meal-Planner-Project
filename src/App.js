import MealPlanner from './MealPlanner.js';
import RecipeSearch from './RecipeSearch.js';
import UI from './UI.js';


const mealPlanner = new MealPlanner();
const recipeSearch = new RecipeSearch("a905b34156124719af649f3347619292");

// Event listener for searching recipes
document.querySelector('#searchForm').addEventListener('submit', async (e) => {
   e.preventDefault();
   const query = document.querySelector('#searchInput').value;
   const recipes = await recipeSearch.searchRecipes(query);
   UI.displayRecipes(recipes);
});


// Event listener for adding meals
document.querySelector('#addMealBtn').addEventListener('click', () => {
   const mealInput = document.querySelector('#mealInput').value;
   const dayInput = document.querySelector('#dayInput').value;

   if (mealInput && dayInput) {
       // use Method addMeal in MealPlanner
       mealPlanner.addMeal(dayInput, mealInput);
       
       // display meal to UI
       UI.displayMeal(dayInput, mealInput);
       
       // Clear form fields after adding
       document.querySelector('#mealInput').value = '';
       document.querySelector('#dayInput').value = '';
   } else {
       alert('Please enter a meal and select a day.');
   }
});

// Event listener for recipe card clicks
document.querySelector('#recipesContainer').addEventListener('click', async (e) => {
   if (e.target.closest('.recipe-card')) {
       const recipeId = e.target.closest('.recipe-card').dataset.id; 
       localStorage.setItem('selectedRecipeId', recipeId); // Save recipe ID in Local Storage
       window.location.href = './recipes.html?recipeId=' + recipeId; // Go to recipe.html and submit ID
   }
});