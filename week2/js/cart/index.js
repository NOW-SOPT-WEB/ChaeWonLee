import { 
    getCartItems, 
    addItem
} from './store.js';

import {
    createItemTemplate,
    renderItems,
    formatPrice  
} from './redering.js';

import {
    openModal,
    closeModal, 
    purchaseItems
} from './modal.js';

import './event.js'