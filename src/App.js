import RecipeSearch from "./RecipeSearch.js";
import UI from "./UI.js";

// Initialize classes
const recipeSearch = new RecipeSearch("a905b34156124719af649f3347619292");

// Event listener for searching recipes
document.querySelector("#searchForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const query = document.querySelector("#searchInput").value;
    console.log("Searching for:", query); // ดูค่าของ query
    await searchRecipes(query);
});

// Function to search for recipes
async function searchRecipes(query) {
    try {
        const recipes = await recipeSearch.searchRecipes(query);
        UI.displayRecipes(recipes);
    } catch (error) {
        console.error("Error searching recipes:", error);
    }
}

// Event listener for recipe card clicks
document
    .querySelector("#recipesContainer")
    .addEventListener("click", async (e) => {
        const recipeCard = e.target.closest(".recipe-card");
        if (recipeCard) {
            const recipeId = recipeCard.dataset.id;
            localStorage.setItem("selectedRecipeId", recipeId);
            await redirectToRecipePage(recipeId);
        }
    });

// Function to redirect to recipe page
async function redirectToRecipePage(recipeId) {
    window.location.href = "/recipes.html?recipeId=" + recipeId;
}


