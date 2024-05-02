import { SHOPPING_LIST } from "../common/listData.js"; // SHOPPING_LIST를 임포트합니다.

// 고정된 목록을 추가했습니다.
let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

export const addItemToCart = (itemId) => {
  console.log("Attempting to add item to cart with ID:", itemId); // 디버깅을 위한 로그
  if (confirm("장바구니에 추가하시겠습니까?")) {
    // SHOPPING_LIST에서 itemId를 문자열로 처리하여 아이템을 찾습니다.
    const item = SHOPPING_LIST.find((item) => item.id === itemId);

    console.log("Found item:", item); // 찾은 아이템 로그
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
