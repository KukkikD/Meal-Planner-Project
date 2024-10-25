class UI {
   // แสดงผลสูตรอาหารบนหน้า HTML
   static displayRecipes(recipes) {
     const recipesContainer = document.getElementById('recipesContainer');
     recipesContainer.innerHTML = ''; // ลบผลลัพธ์เดิมออก
 
     recipes.forEach(recipe => {
      const recipeCard = document.createElement('div');
      recipeCard.className = 'recipe-card';
      recipeCard.dataset.id = recipe.id; // สมมุติว่า recipe มี id
      recipeCard.innerHTML = `
          <img src="${recipe.image}" alt="${recipe.title}" />
          <h3>${recipe.title}</h3>
      `;
      recipesContainer.appendChild(recipeCard);
  });
 
     // การทำให้มี Animation เมื่อสูตรอาหารแสดงขึ้นมา
     recipesContainer.querySelectorAll('.recipe').forEach((recipeElement, index) => {
       recipeElement.style.opacity = 0;
       setTimeout(() => {
         recipeElement.style.transition = 'opacity 0.5s ease';
         recipeElement.style.opacity = 1;
       }, 100 * index); // หน่วงเวลาการแสดงผลเล็กน้อย
     });
   }

   static displayMeal(day, meal) {
    // แสดงมื้ออาหารในวันที่เลือก
    const dayListId = day.toLowerCase() + 'Meals'; // เช่น 'mondayMeals'
    const mealItem = document.createElement('li');
    mealItem.textContent = meal; // ตั้งค่าเป็นชื่อเมนู
  
    const dayList = document.getElementById(dayListId);
    if (dayList) {
      dayList.appendChild(mealItem); // เพิ่มไปยังวันที่เลือก
    } else {
      console.error(`Element with ID ${dayListId} not found.`);
    }
  }

 
   // อัปเดต UI ของ meal planner
   static updateMealPlanner(day, meal) {
      // ดึง UL สำหรับวันที่เลือก (เช่น Monday, Tuesday, เป็นต้น)
      const mealList = document.querySelector(`#${day.toLowerCase()}Meals`);
  
      // ตรวจสอบว่ามี UL สำหรับวันนั้นๆ หรือไม่
      if (mealList) {
        // สร้างรายการ LI ใหม่
        const mealItem = document.createElement('li');
        mealItem.textContent = meal;
  
        // เพิ่ม LI เข้าไปใน UL
        mealList.appendChild(mealItem);
      } else {
        console.error("No meal list found for", day);
      }
    }
 
   // display Shopping List by Animation
   static displayShoppingList(items) {
     const shoppingListContainer = document.getElementById('shoppingList');
     shoppingListContainer.innerHTML = ''; // Clear old items
     items.forEach(item => {
       const itemElement = document.createElement('li');
       itemElement.textContent = item;
       shoppingListContainer.appendChild(itemElement);
 
       // Animation When the list is displayed
       itemElement.style.opacity = 0;
       setTimeout(() => {
         itemElement.style.transition = 'opacity 0.5s ease';
         itemElement.style.opacity = 1;
       }, 100); // Slight display delay
     });
   }
 }
 
 export default UI;
 