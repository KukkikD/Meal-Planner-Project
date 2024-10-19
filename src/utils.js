// ฟังก์ชันสำหรับตั้งค่า Local Storage
export function setLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

// ฟังก์ชันสำหรับดึงข้อมูลจาก Local Storage
export function getLocalStorage(key) {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : null; // ถ้าไม่มีข้อมูลให้คืนค่า null
}

// ฟังก์ชันสำหรับลบข้อมูลใน Local Storage
export function removeLocalStorage(key) {
  localStorage.removeItem(key);
}