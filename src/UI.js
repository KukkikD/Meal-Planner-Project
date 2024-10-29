export class UI {
  // Display recipes on the HTML page
  static displayRecipes(recipes) {
    const recipesContainer = document.getElementById('recipesContainer');
    recipesContainer.innerHTML = ''; // Clear old results

    const fragment = document.createDocumentFragment(); // Create DocumentFragment

    recipes.forEach(recipe => {
      const recipeCard = document.createElement('div'); // Create a recipe card
      recipeCard.className = 'recipe-card';
      recipeCard.dataset.id = recipe.id; // Assume that recipe has an id
      recipeCard.innerHTML = `
          <img src="${recipe.image}" alt="${recipe.title}" />
          <h3>${recipe.title}</h3>
      `;
      fragment.appendChild(recipeCard); // Add to DocumentFragment
    });

    recipesContainer.appendChild(fragment); // Append DocumentFragment to the DOM

    // Create an animation when the recipes are displayed
    recipesContainer.querySelectorAll('.recipe-card').forEach((recipeElement, index) => {
      recipeElement.style.opacity = 0;
      requestAnimationFrame(() => {
        setTimeout(() => {
          recipeElement.style.transition = 'opacity 0.5s ease';
          recipeElement.style.opacity = 1;
        }, 100 * index); // Slight display delay
      });
    });
  }

  static displayMeal(day, meal) {
    // Display the meal for the selected day
    const dayListId = day.toLowerCase() + 'Meals'; // e.g., 'mondayMeals'
    const mealItem = document.createElement('li');
    mealItem.textContent = meal; // Set the value as the meal name

    const dayList = document.getElementById(dayListId);
    if (dayList) {
      dayList.appendChild(mealItem); // Add to the selected day
    } else {
      console.error(`Element with ID ${dayListId} not found.`);
    }
  }

  // Update the UI of the meal planner
  static updateMealPlanner(day, meal) {
    // Get the UL for the selected day (e.g., Monday, Tuesday, etc.)
    const mealList = document.querySelector(`#${day.toLowerCase()}Meals`);
  
    // Check if there is a UL for that specific day
    if (mealList) {
      // Create a new LI item
      const mealItem = document.createElement('li');
      mealItem.textContent = meal;
  
      // Append LI to the UL
      mealList.appendChild(mealItem);
  
      // เพิ่มการแสดงผลด้วย Animation
      mealItem.style.opacity = 0; // ตั้งค่า opacity เป็น 0
      requestAnimationFrame(() => {
        setTimeout(() => {
          mealItem.style.transition = 'opacity 0.5s ease';
          mealItem.style.opacity = 1; // ทำให้ชัดเจนขึ้น
        }, 100); // Slight display delay
      });
    } else {
      console.error("No meal list found for", day);
    }
  }
  

  // Display the shopping list with animation
  static displayShoppingList(items) {
    const shoppingListContainer = document.getElementById('shoppingList');
    shoppingListContainer.innerHTML = ''; // Clear old items

    const fragment = document.createDocumentFragment(); // Create DocumentFragment

    items.forEach(item => {
      const itemElement = document.createElement('li');
      itemElement.textContent = item;
      fragment.appendChild(itemElement); // Add to DocumentFragment

      // Animation when the list is displayed
      itemElement.style.opacity = 0;
      requestAnimationFrame(() => {
        setTimeout(() => {
          itemElement.style.transition = 'opacity 0.5s ease';
          itemElement.style.opacity = 1;
        }, 100); // Slight display delay
      });
    });

    shoppingListContainer.appendChild(fragment); // Append DocumentFragment to the DOM
  }
}

export default UI;
