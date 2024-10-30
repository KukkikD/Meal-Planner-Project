import { setLocalStorage, getLocalStorage } from "./utils.js";
import RecipeSearch  from "./RecipeSearch.js";
import { MealPlan } from "./MealPlan.js";
import { UI } from "./UI.js";

const mealPlan = new MealPlan();

async function getIngredients(recipeId) {
  const apiKey = "a905b34156124719af649f3347619292";
  
  try {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/${recipeId}/ingredientWidget.json?apiKey=${apiKey}`
    );
    if (!response.ok)
      throw new Error(`Error fetching ingredients: ${response.statusText}`);

    const data = await response.json();
    console.log("Ingredients data:", data.ingredients); // Debugging
    return data.ingredients;
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred while retrieving data from the API. Please try again.');
    return [];
  }
}

function renderIngredients(ingredients) {
  const ingredientsContainer = document.getElementById("ingredientsContainer");
  ingredientsContainer.innerHTML = "";

  ingredients.forEach((ingredient) => {
    const ingredientElement = document.createElement("div");
    ingredientElement.className = "ingredient-card";
    ingredientElement.innerHTML = `
      <p>${ingredient.name}: ${ingredient.amount.metric.value} ${ingredient.amount.metric.unit}</p>
    `;
    ingredientsContainer.appendChild(ingredientElement);
  });
}

function renderRecipe(recipe) {
  console.log("Loaded recipe data:", recipe); // Debugging
  const recipeContainer = document.getElementById("recipeContainer");
  recipeContainer.innerHTML = `
    <h2>${recipe.title}</h2>
    <img src="${recipe.image}" alt="${recipe.title}" />
    <h3>Ingredients:</h3>
    <div id="ingredientsContainer"></div>
  `;
  
  getIngredients(recipe.id)
   .then((ingredients) => renderIngredients(ingredients))
   .catch((error) => console.error(error));
}

const params = new URLSearchParams(window.location.search);
const recipeId = params.get("recipeId");

if (recipeId) {
  const recipeSearch = new RecipeSearch("a905b34156124719af649f3347619292");
  recipeSearch
  .getRecipeById(recipeId)
  .then((recipe) => renderRecipe(recipe))
  .catch((error) => console.error(error));
} else {
  console.error('Recipe ID not found in the URL');
}

document.getElementById("addToPlanner").addEventListener("click", () => {
  const day = document.getElementById("daySelect").value;
  const recipeContainer = document.getElementById("recipeContainer");

  if (recipeContainer) {
    const recipeTitle = recipeContainer.querySelector("h2").textContent;
    const recipeImage = recipeContainer.querySelector("img").src;

    if (recipeId && day) {
      let plannerItems = getLocalStorage("weeklyPlan") || {};

      if (!plannerItems[day]) {
        plannerItems[day] = [];
      }

      if (!plannerItems[day].some((item) => item.id === recipeId)) {
        plannerItems[day].push({
          id: recipeId,
          title: recipeTitle,
          image: recipeImage,
        });

        setLocalStorage("weeklyPlan", plannerItems);

        alert(`Recipe added to ${day} in your weekly planner!`);
        
        addRecipeToDay(day, recipeId);
        mealPlan.loadWeeklyPlan();
      } else {
        alert(`This recipe is already in your ${day} plan.`);
      }
    } else {
      alert("Please select a recipe and a day to add to the planner.");
    }
  }
});

function addRecipeToDay(day, recipeId) {
  const validDays = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

  if (!validDays.includes(day.toLowerCase())) {
    console.error(`Invalid day provided: ${day}`);
    return;
  }

  const weeklyPlan = getLocalStorage('weeklyPlan') || {};
  if (!Array.isArray(weeklyPlan[day])) weeklyPlan[day] = [];

  if (!weeklyPlan[day].includes(recipeId)) {
    weeklyPlan[day].push(recipeId);
    setLocalStorage('weeklyPlan', weeklyPlan);
    console.log(`Added recipe ID: ${recipeId} to ${day}`);

    const recipeTitle = getRecipeTitleById(recipeId);
    if (recipeTitle !== "Recipe Title Not Found") {
      UI.updateMealPlanner(day, recipeTitle);
    }
  } else {
    console.log('Recipe already added for this day');
  }
}

function getRecipeMap() {
  const plannerItems = getLocalStorage("weeklyPlan") || {};
  const recipeMap = new Map();

  for (const day in plannerItems) {
    if (Array.isArray(plannerItems[day])) {
      plannerItems[day].forEach(item => {
        recipeMap.set(item.id, item.title);
      });
    }
  }

  return recipeMap;
}

function getRecipeTitleById(recipeId) {
  const recipeMap = getRecipeMap();
  return recipeMap.get(recipeId) || "Recipe Title Not Found";
} 