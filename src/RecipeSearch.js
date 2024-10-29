class RecipeSearch {
  constructor(apiKey) {
    this.apiKey = apiKey;
  }

  async searchRecipes(query, dietaryPreferences = '', cuisine = '', intolerances = '') {
    try {
      // Check if dietaryPreferences, cuisine, and intolerances have values, if not remove them from the query.
      const dietParam = dietaryPreferences ? `&diet=${dietaryPreferences}` : '';
      const cuisineParam = cuisine ? `&cuisine=${cuisine}` : '';
      const intoleranceParam = intolerances ? `&intolerances=${intolerances}` : '';

      // Call API with error handling
      const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${query}${dietParam}${cuisineParam}${intoleranceParam}&apiKey=${this.apiKey}`);

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      // Check if any recipes were found
      if (data.results.length === 0) {
        console.warn('No recipes found for your search criteria.');
        return []; // Returns empty array if no recipes found
      }

      return data.results;
    } catch (error) {
      console.error('Failed to fetch recipes:', error);
      return []; // Returns empty array on error
    }
  }

  async getRecipeById(recipeId) {
    try {
      const response = await fetch(`https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${this.apiKey}`);

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return data; // Return recipe details
    } catch (error) {
      console.error('Failed to fetch recipe:', error);
      return null; // Return null if error occurs
    }
  }
}

export default RecipeSearch;