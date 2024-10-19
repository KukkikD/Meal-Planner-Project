import { setLocalStorage, getLocalStorage } from "./utils.js";
import RecipeSearch from './RecipeSearch.js';


// ฟังก์ชันดึงส่วนผสมจาก API โดยใช้ recipeId
async function getIngredients(recipeId) {
  const apiKey = "a905b34156124719af649f3347619292"; // API Key ของคุณ
  
  try {
    const response = await fetch(`https://api.spoonacular.com/recipes/${recipeId}/ingredientWidget.json?apiKey=${apiKey}`);
    
    //Check if the request was successful.
    if (!response.ok) {
      throw new Error(`Error fetching ingredients: ${response.statusText}`);
    }

    const data = await response.json();
    return data.ingredients; // return ingredients obtained from API

  } catch (error) {
    console.error('Error:', error);
    return []; // return null if an error occurs
  }
}

// Function to display ingredients in HTML page
function renderIngredients(ingredients) {
  const ingredientsContainer = document.getElementById("ingredientsContainer");
  ingredientsContainer.innerHTML = ""; // Clear old data

  // วนลูปเพื่อแสดงส่วนผสมทีละตัว
  ingredients.forEach(ingredient => {
    console.log(ingredient.image); // Show image URL in console
    const ingredientElement = document.createElement("div");
    ingredientElement.className = "ingredient-card";
    ingredientElement.innerHTML = `
      <p>${ingredient.name}: ${ingredient.amount.metric.value} ${ingredient.amount.metric.unit}</p>
    `;
    ingredientsContainer.appendChild(ingredientElement);
  });
}

// Recipe details display function
function renderRecipe(recipe) {
    const recipeContainer = document.getElementById("recipeContainer"); // ตรวจสอบให้แน่ใจว่ามี element นี้ใน HTML
    recipeContainer.innerHTML = `
      <h2>${recipe.title}</h2>
      <img src="${recipe.image}" alt="${recipe.title}" />
      <h3>Ingredients:</h3>
      <div id="ingredientsContainer"></div>
    `;
  
    // Call the extract ingredients function
    getIngredients(recipe.id) // Use recipe.id to fetch ingredients
      .then(ingredients => renderIngredients(ingredients))
      .catch(error => console.error(error));
  }

  // Get recipeId from URL (if any)
const params = new URLSearchParams(window.location.search);
const recipeId = params.get("recipeId");

if (recipeId) {
  const recipeSearch = new RecipeSearch("a905b34156124719af649f3347619292"); // my API Key 
  recipeSearch.getRecipeById(recipeId) // This method must be created in RecipeSearch.
    .then(recipe => {
      renderRecipe(recipe); // Call a function to display formula details.
    })
    .catch(error => console.error(error));

} else {
  console.error('Recipe ID not found in the URL');
}

// Management of adding menu items to weekly plans
document.getElementById("addToPlanner").addEventListener("click", () => {
  if (recipeId) {
    let plannerItems = getLocalStorage("weekly-planner") || [];
    
    // Check if this menu has been added to the plan.
    if (!plannerItems.includes(recipeId)) {
      plannerItems.push(recipeId); // Add a menu to your weekly plan
      setLocalStorage("weekly-planner", plannerItems); // Update LocalStorage

      alert("Recipe added to your weekly planner!");
    } else {
      alert("This recipe is already in your weekly planner.");
    }
  } else {
    alert("No recipe selected to add to the planner.");
  }
})
