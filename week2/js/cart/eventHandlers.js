import { openModal, closeModal, purchaseItems } from './modal.js';

const eventHandlers = [
    { selector: '.buy-btn', event: 'click', handler: openModal },
    { selector: '.modal-close-btn', event: 'click', handler: closeModal },
    { selector: 'thead input[type="checkbox"]', event: 'change', handler: toggleCheckboxes },
    { selector: '.modal-buy-btn', event: 'click', handler: purchaseItems },
    { selector: 'table tbody', event: 'click', handler: handleTableClick }
];

const toggleCheckboxes = () => {
    document.querySelectorAll('tbody input[type="checkbox"]').forEach(chk => {
        chk.checked = checkboxAll.checked;
    });
};

const handleTableClick = (e) => {
    if (!e.target.matches('.delete-btn')) return;
    const tr = e.target.closest('tr');
    const title = tr.querySelector('.td-title').textContent;
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const itemIndex = cartItems.findIndex(item => item.title === title);
    if (itemIndex !== -1) {
        cartItems.splice(itemIndex, 1);
    }
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    renderCartItems();
};