import { addItemToCart } from "./cartStore.js";

const navElement = document.querySelector(".nav");
const itemsSection = document.querySelector(".items");

export const setupEventListeners = () => {
  navElement.addEventListener("click", handleNavClick);
  itemsSection.addEventListener("click", handleItemClick);
};

// nav 아이템 클릭 시 카테고리 별로 필터링
export const handleNavClick = (event) => {
  const category = event.target.dataset.category;
  if (category) {
    renderItems(category);
    updateTitle(event.target.innerText);
  }
};

export const handleItemClick = (event) => {
  const itemBox = event.target.closest(".item-box");
  if (itemBox) {
    const itemId = itemBox.dataset.id;
    console.log("Clicked item ID:", itemId); // 디버깅을 위한 로그
    addItemToCart(itemId);
  }
};
