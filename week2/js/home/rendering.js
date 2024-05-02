import { SHOPPING_LIST } from "../common/listData.js";

const itemsSection = document.querySelector(".items");
// 상품 렌더링
export const renderItems = (category) => {
  itemsSection.innerHTML = "";
  const fragment = document.createDocumentFragment();

  SHOPPING_LIST.forEach((item) => {
    if (category === "all" || item.category === category) {
      const itemBox = createItemBox(item);
      fragment.appendChild(itemBox);
    }
  });

  itemsSection.appendChild(fragment);
};

export const createItemBox = (item) => {
  const itemBox = document.createElement("article");
  itemBox.className = "item-box";
  itemBox.dataset.id = item.id;
  itemBox.dataset.category = item.category;
  itemBox.innerHTML = `
        <img src="${item.image}" alt="${item.title}">
        <i class="fas fa-heart"></i>
        <h2 class="item-title">${item.title}</h2>
        <p class="item-charge">${item.price}원</p>
    `;
  return itemBox;
};

// 제목 업데이트
export const updateTitle = (text) => {
  const titleElement = document.querySelector(".title");
  titleElement.innerText = text;
};
