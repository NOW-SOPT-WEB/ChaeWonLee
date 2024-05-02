import { SHOPPING_LIST } from "../common/listData.js";

// 고정된 목록을 추가했습니다.
let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

export const addItemToCart = (itemId) => {
  if (confirm("장바구니에 추가하시겠습니까?")) {
    // SHOPPING_LIST에서 itemId를 문자열로 처리하여 아이템을 찾는다.
    const item = SHOPPING_LIST.find((item) => item.id === itemId);

    if (item) {
      const isItemInCart = cartItems.find(
        (cartItem) => cartItem.id === item.id
      );

      if (!isItemInCart) {
        cartItems.push(item);
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        alert("장바구니에 추가되었습니다.");
      } else {
        // 이미 장바구니에 있는 경우
        alert("이미 장바구니에 있습니다.");
      }
    } else {
      console.error("아이템을 찾을 수 없습니다.");
    }
  }
};
