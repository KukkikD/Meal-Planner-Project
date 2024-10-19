class RecipeSearch {
   constructor(apiKey) {
     this.apiKey = apiKey;
   }
 
   async searchRecipes(query, dietaryPreferences = '') {
     try {
     // Check if dietaryPreferences has a value, if not remove it from the query.
       const dietParam = dietaryPreferences ? `&diet=${dietaryPreferences}` : '';
       
       // Call API with error handling
       const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${query}${dietParam}&apiKey=${this.apiKey}`);
       
       if (!response.ok) {
         throw new Error(`Error: ${response.status} ${response.statusText}`);
       }
       
       const data = await response.json();
       return data.results;
     } catch (error) {
       console.error('Failed to fetch recipes:', error);
       // Can notify users or make further corrections in case of errors.
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
        return data; // ส่งกลับข้อมูลสูตร
      } catch (error) {
        console.error('Failed to fetch recipe:', error);
        return null; // ส่งกลับ null ถ้ามีข้อผิดพลาด
      }
   }
 }
 
 export default RecipeSearch;
 