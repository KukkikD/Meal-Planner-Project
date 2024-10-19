import { setLocalStorage, getLocalStorage } from "./utils.js";

async function getIngredients(recipeId) {
  const apiKey = "a905b34156124719af649f3347619292"; // my API Key 
  const response = await fetch(`https://api.spoonacular.com/recipes/${recipeId}/ingredientWidget.json?apiKey=${apiKey}`);
  if (!response.ok) {
    throw new Error("Failed to fetch ingredients");
  }
  const data = await response.json();
  return data.ingredients; // คืนค่ารายการส่วนผสม
}

function renderIngredients(ingredients) {
  const ingredientsContainer = document.getElementById("ingredientsContainer");
  ingredientsContainer.innerHTML = ""; // ล้างข้อมูลเก่า

  ingredients.forEach(ingredient => {
    const ingredientElement = document.createElement("div");
    ingredientElement.className = "ingredient-card";
    ingredientElement.innerHTML = `
      <p>${ingredient.name}: ${ingredient.amount} ${ingredient.unit}</p>
    `;
    ingredientsContainer.appendChild(ingredientElement);
  });
}

// สมมุติว่าเรามี recipeId จาก URL
const params = new URLSearchParams(window.location.search);
const recipeId = params.get("recipeId");

if (recipeId) {
  getIngredients(recipeId)
    .then(ingredients => renderIngredients(ingredients))
    .catch(error => console.error(error));
}

// ส่วนจัดการเพิ่มไปยังแผนการสัปดาห์
document.getElementById("addToPlanner").addEventListener("click", () => {
  const plannerItems = getLocalStorage("weekly-planner") || [];
  plannerItems.push(recipeId); // เพิ่ม ID ของสูตรอาหารไปใน Local Storage
  setLocalStorage("weekly-planner", plannerItems);
});
