let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

export const getCartItems = () => cartItems; 

export const addItem = (item) => {
    cartItems.push(item);
    saveCartItems();
};

const saveCartItems = () => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
};