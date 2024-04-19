let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

// 장바구니에 추가
export const addItemToCart = (itemElement) => {
    if (confirm('장바구니에 추가하시겠습니까?')) {
        const item = {
            title: itemElement.querySelector('.item-title').textContent,
            price: itemElement.querySelector('.item-charge').textContent,
            image: itemElement.querySelector('img').src,
            category: itemElement.dataset.category
        };

        cartItems.push(item);
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }
}