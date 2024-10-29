// Function to set data in Local Storage
export function setLocalStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error setting data in Local Storage for key ${key}:`, error);
  }
}

// Function to get data from Local Storage
export function getLocalStorage(key) {
  const value = localStorage.getItem(key);
  try {
    return value ? JSON.parse(value) : null; // Return null if no data is found
  } catch (error) {
    console.error(`Error parsing data from Local Storage for key ${key}:`, error);
    return null;
  }
}

// Function to remove data from Local Storage
export function removeLocalStorage(key) {
  localStorage.removeItem(key);
}

// Function to validate day
function isValidDay(day) {
  const validDays = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  return validDays.includes(day.toLowerCase());
}

// Function to add a recipe ID to the meal plan for a specific day
export function addRecipeToDay(day, recipeId) {
  if (!isValidDay(day)) {
    console.error(`Invalid day provided: ${day}`);
    return;
  }

  const weeklyPlan = getLocalStorage('weeklyPlan') || {};

  // If no data for the specified day, initialize it as an empty array
  if (!Array.isArray(weeklyPlan[day])) {
    weeklyPlan[day] = [];
  }

  // Check if the recipe ID already exists for the day before adding
  if (!weeklyPlan[day].includes(recipeId)) {
    weeklyPlan[day].push(recipeId); // Add the recipe ID if not already present
  }

  // Update Local Storage with the modified weekly plan
  setLocalStorage('weeklyPlan', weeklyPlan);
}

// Function to retrieve recipes for a specific day
export function getRecipesForDay(day) {
  if (!isValidDay(day)) {
    console.error(`Invalid day provided: ${day}`);
    return []; // Return an empty array for invalid days
  }

  const weeklyPlan = getLocalStorage('weeklyPlan') || {};
  return weeklyPlan[day] || []; // Return an empty array if no data is found for the day
}

// Function to remove a recipe ID from the meal plan for a specific day
export function removeRecipeFromDay(day, recipeId) {
  if (!isValidDay(day)) {
    console.error(`Invalid day provided: ${day}`);
    return;
  }

  const weeklyPlan = getLocalStorage('weeklyPlan') || {};

  if (Array.isArray(weeklyPlan[day])) {
    // Filter out the recipe ID that needs to be removed
    weeklyPlan[day] = weeklyPlan[day].filter(id => id !== recipeId);
    
    // Update Local Storage with the modified weekly plan
    setLocalStorage('weeklyPlan', weeklyPlan);
  }
}
