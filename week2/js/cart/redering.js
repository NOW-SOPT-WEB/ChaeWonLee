import { getCartItems } from './cartStore.js';

export const createCartItemTemplate = (item) => `
    <tr>
        <td class='td-input'><input type='checkbox'></td>
        <td class='td-img'><img class='cart-img' src='${item.image}' alt='${item.title}'></td>
        <td class='td-title'>${item.title}</td>
        <td class='td-charge'>${formatPrice(item.price)}원</td>
        <td class='td-cate'>${item.category}</td>
        <td class='td-btn'><button class='delete-btn' type='button'>삭제</button></td>
    </tr>
`;

export const renderCartItems = () => {
    const cartItems = getCartItems(); 
    //const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const tbody = document.querySelector('table tbody');
    tbody.innerHTML = cartItems.map(createCartItemTemplate).join('');
};

// 숫자에 , 추가
const formatPrice = (price) => {
    const numericPrice = price.replace(/[^0-9.-]+/g, "");
    return new Intl.NumberFormat('ko-KR').format(parseFloat(numericPrice));
};