import { SHOPPING_LIST } from './listData.js';

/*window.onload = function() {
    renderItems("all");
    updateTitle("전체"); // 초기 제목 "전체"로
};

// 카테고리별 상품 리스트 보여주기 및 제목 업데이트
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', function() {
        const category = this.dataset.category;
        renderItems(category);
        updateTitle(this.innerText);
    });
});

// 상품 렌더링 
function renderItems(category) {
    const itemsSection = document.querySelector('.items');
    itemsSection.innerHTML = ''; 

    const filteredList = SHOPPING_LIST.filter(item => category === "all" || item.category === category);

    filteredList.forEach(item => {
        const itemBox = document.createElement('article');
        itemBox.className = 'item-box';
        itemBox.setAttribute('data-category', item.category);

        const img = document.createElement('img');
        img.setAttribute('src', item.image);
        img.setAttribute('alt', item.title);

        const heartIcon = document.createElement('i');
        heartIcon.className = 'fas fa-heart';

        const titleH2 = document.createElement('h2');
        titleH2.className = 'item-title';
        titleH2.textContent = item.title;

        const priceP = document.createElement('p');
        priceP.className = 'item-charge';
        priceP.textContent = `${item.price}원`;

        itemBox.appendChild(img);
        itemBox.appendChild(heartIcon);
        itemBox.appendChild(titleH2);
        itemBox.appendChild(priceP);

        itemsSection.appendChild(itemBox);
    });
}

// 제목 업데이트 
function updateTitle(text) {
    const titleElement = document.querySelector('.title');
    titleElement.innerText = text; 
}



// 상품 아이템 클릭 이벤트
document.querySelector('.items').addEventListener('click', function(e) {
    if (e.target.closest('.item-box')) {
        const itemElement = e.target.closest('.item-box');
        const item = {
            title: itemElement.querySelector('.item-title').textContent,
            price: itemElement.querySelector('.item-charge').textContent,
            image: itemElement.querySelector('img').getAttribute('src'),
            category: itemElement.getAttribute('data-category')
        };

        if (confirm('장바구니에 추가하시겠습니까?')) {
            let cartItems = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];
            cartItems.push(item);
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            console.log("h1", JSON.stringify(cartItems))
        }
    }
});*/



/*let navElement = document.querySelector('.nav');
let itemsSection = document.querySelector('.items');
let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

window.onload = function() {
    init(); 
};

function init() {
    renderItems("all");
    updateTitle("전체");
    setupEventListeners();
}

function setupEventListeners() {
    navElement.addEventListener('click', function(event) {
        const category = event.target.dataset.category;
        if (category) {
            renderItems(category);
            updateTitle(event.target.innerText);
        }
    });
    
    itemsSection.addEventListener('click', function(event) {
        const itemBox = event.target.closest('.item-box');
        if (itemBox) {
            addItemToCart(itemBox);
        }
    });
}

function renderItems(category) {
    itemsSection.innerHTML = ''; 
    const fragment = document.createDocumentFragment();

    SHOPPING_LIST.filter(item => category === "all" || item.category === category)
    .map(item => {
        const itemBox = document.createElement('article');
        itemBox.className = 'item-box';
        itemBox.dataset.category = item.category;
        itemBox.innerHTML = `
            <img src="${item.image}" alt="${item.title}">
            <i class="fas fa-heart"></i>
            <h2 class="item-title">${item.title}</h2>
            <p class="item-charge">${item.price}원</p>
        `;
        return itemBox;
    })
    .forEach(itemBox => fragment.appendChild(itemBox));

    itemsSection.appendChild(fragment);
}

function addItemToCart(itemElement) {
    const item = {
        title: itemElement.querySelector('.item-title').textContent,
        price: itemElement.querySelector('.item-charge').textContent,
        image: itemElement.querySelector('img').src,
        category: itemElement.dataset.category
    };

    if (confirm('장바구니에 추가하시겠습니까?')) {
        cartItems.push(item);
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        console.log("장바구니에 추가됨:", item.title);
    }
}


function updateTitle(text) {
    const titleElement = document.querySelector('.title');
    titleElement.innerText = text; 
}
*/



const navElement = document.querySelector('.nav');
const itemsSection = document.querySelector('.items');
let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];



const setupEventListeners = () => {
    navElement.addEventListener('click', handleNavClick);
    itemsSection.addEventListener('click', handleItemClick);
}

const handleNavClick = (event) => {
    const category = event.target.dataset.category;
    if (category) {
        renderItems(category);
        updateTitle(event.target.innerText);
    }
}

const handleItemClick = (event) => {
    const itemBox = event.target.closest('.item-box');
    if (itemBox) {
        addItemToCart(itemBox);
    }
}

const renderItems = (category) => {
    itemsSection.innerHTML = ''; 
    const fragment = document.createDocumentFragment();

    SHOPPING_LIST.forEach(item => {
        if (category === "all" || item.category === category) {
            const itemBox = createItemBox(item);
            fragment.appendChild(itemBox);
        }
    });

    itemsSection.appendChild(fragment);
}

const createItemBox = (item) => {
    const itemBox = document.createElement('article');
    itemBox.className = 'item-box';
    itemBox.dataset.category = item.category;
    itemBox.innerHTML = `
        <img src="${item.image}" alt="${item.title}">
        <i class="fas fa-heart"></i>
        <h2 class="item-title">${item.title}</h2>
        <p class="item-charge">${item.price}원</p>
    `;
    return itemBox;
}

const addItemToCart = (itemElement) => {
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

const updateTitle = (text) => {
    const titleElement = document.querySelector('.title');
    titleElement.innerText = text; 
}

renderItems("all");
updateTitle("전체");
setupEventListeners();