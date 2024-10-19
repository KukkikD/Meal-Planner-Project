import { loadHeader, loadFooter } from './utils.js';
import MealPlanner from './MealPlanner.js';
import RecipeSearch from './RecipeSearch.js';
import UI from './UI.js';

loadHeader('header-container');
loadFooter('footer-container');


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
       // ใช้เมธอด addMeal ใน MealPlanner
       mealPlanner.addMeal(dayInput, mealInput);
       
       // แสดงมื้ออาหารที่เพิ่มไปยัง UI
       UI.displayMeal(dayInput, mealInput);
       
       // เคลียร์ฟิลด์ฟอร์มหลังจากเพิ่ม
       document.querySelector('#mealInput').value = '';
       document.querySelector('#dayInput').value = '';
   } else {
       alert('Please enter a meal and select a day.');
   }
});