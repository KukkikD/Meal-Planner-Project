import MealPlanner from './MealPlanner.js';
import RecipeSearch from './RecipeSearch.js';
import UI from './UI.js';
import recipesUrl from "./recipes/recipes.html";

// Initialize classes
const mealPlanner = new MealPlanner();
const recipeSearch = new RecipeSearch("a905b34156124719af649f3347619292");

// Event listener for searching recipes
document.querySelector('#searchForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const query = document.querySelector('#searchInput').value;
    await searchRecipes(query);
});

// Function to search for recipes
async function searchRecipes(query) {
    try {
        const recipes = await recipeSearch.searchRecipes(query);
        UI.displayRecipes(recipes);
    } catch (error) {
        console.error('Error searching recipes:', error);
    }
}

// Event listener for adding meals
document.querySelector('#addMealBtn').addEventListener('click', () => {
    const mealInput = document.querySelector('#mealInput').value;
    const dayInput = document.querySelector('#dayInput').value;

    addMeal(dayInput, mealInput);
});

// Function to add meal
function addMeal(day, meal) {
    if (meal && day) {
        mealPlanner.addMeal(day, meal);
        UI.displayMeal(day, meal);
        clearMealInputFields();
    } else {
        alert('Please enter a meal and select a day.');
    }
}

// Function to clear input fields for meal
function clearMealInputFields() {
    document.querySelector('#mealInput').value = '';
    document.querySelector('#dayInput').value = '';
}

// Event listener for recipe card clicks
document.querySelector('#recipesContainer').addEventListener('click', async (e) => {
    const recipeCard = e.target.closest('.recipe-card');
    if (recipeCard) {
        const recipeId = recipeCard.dataset.id;
        localStorage.setItem('selectedRecipeId', recipeId);
        await redirectToRecipePage(recipeId); // Use await for redirection
    }
});

// Function to redirect to recipe page
async function redirectToRecipePage(recipeId) {
    window.location.href = window.location.href = recipesUrl + "?recipeId=" + recipeId;;
}
