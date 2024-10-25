import { getLocalStorage, setLocalStorage } from './utils.js';

export class MealPlanner {
  constructor() {
     this.weeklyMeals = {}; // Object to store meals for each day
  }

  addMeal(day, meal) {
     if (!this.weeklyMeals[day]) {
        this.weeklyMeals[day] = [];
     }
     this.weeklyMeals[day].push(meal);
  }

  getMeals(day) {
     return this.weeklyMeals[day] || [];
  }

  generateShoppingList() {
     // Logic to consolidate ingredients from all meals in the week
  }
}


export default class MealPlan {
  constructor(key, dayListSelector) {
    this.key = key;
    this.dayListSelector = dayListSelector; // Selector สำหรับวันที่ใน planner
  }

  // ฟังก์ชันสำหรับเพิ่มรีเซพีใน planner
  addRecipe(day, recipe) {
    const weeklyPlan = getLocalStorage(this.key) || {};
    if (!weeklyPlan[day]) {
      weeklyPlan[day] = []; // สร้างวันใหม่ถ้ายังไม่มี
    }

    // เพิ่มรีเซพีลงในวันที่กำหนด
    weeklyPlan[day].push(recipe);
    setLocalStorage(this.key, weeklyPlan); // อัพเดท LocalStorage
    this.renderDayRecipes(day); // อัพเดท UI สำหรับวันที่นี้
  }

  // ฟังก์ชันสำหรับลบรีเซพีจาก planner
  removeRecipe(day, recipeId) {
    const weeklyPlan = getLocalStorage(this.key) || {};
    if (weeklyPlan[day]) {
      weeklyPlan[day] = weeklyPlan[day].filter(recipe => recipe.id !== recipeId); // ลบรีเซพีที่มี id ตรงกัน
      setLocalStorage(this.key, weeklyPlan); // อัพเดท LocalStorage
      this.renderDayRecipes(day); // อัพเดท UI สำหรับวันที่นี้
    }
  }

   renderDayRecipes(day) {
    const weeklyPlan = getLocalStorage(this.key) || {};
    
    // ใช้ map ในการหา selector ที่ถูกต้อง
    const dayMap = {
      "Monday": "mondayMeals",
      "Tuesday": "tuesdayMeals",
      "Wednesday": "wednesdayMeals",
      "Thursday": "thursdayMeals",
      "Friday": "fridayMeals",
      "Saturday": "saturdayMeals",
      "Sunday": "sundayMeals",
    };

    if (!dayMap[day]) {
      console.error(`Invalid day provided: ${day}`);
      return;
    }
    
    const dayList = document.querySelector(`#${dayMap[day]}`); // ใช้ map เพื่อหา selector
  
    if (!dayList) {
      console.error(`No element found for selector: #${dayMap[day]}`); // ตรวจสอบว่าเจอ element หรือไม่
      return; // ออกจากฟังก์ชันถ้าไม่พบ element
    }
  
    dayList.innerHTML = ""; // ล้างรายการเก่า
  
    if (weeklyPlan[day]) {
      weeklyPlan[day].forEach(recipe => {
        const recipeItem = document.createElement("li");
        recipeItem.innerHTML = `
          <span>${recipe.title}</span>
          <img src="${recipe.image}" alt="${recipe.title}" />
          <button class="remove-recipe" data-id="${recipe.id}">Remove</button>
        `;
        dayList.appendChild(recipeItem);
      });
  
      // เพิ่ม event listener ให้ปุ่มลบ
      dayList.querySelectorAll(".remove-recipe").forEach(button => {
        button.addEventListener("click", () => {
          const recipeId = button.dataset.id;
          this.removeRecipe(day, recipeId); // เรียกใช้งานฟังก์ชันลบรีเซพี
        });
      });
    }
  }
  
  // ฟังก์ชันสำหรับโหลดรีเซพีเมื่อหน้าโหลด
  loadWeeklyPlan() {
    const weeklyPlan = getLocalStorage(this.key) || {};
    Object.keys(weeklyPlan).forEach(day => {
      this.renderDayRecipes(day);
    });
  }
  
  // ฟังก์ชันเริ่มต้น
  init() {
    this.loadWeeklyPlan(); // โหลดข้อมูลรีเซพีเมื่อเริ่มต้น
  }
}

