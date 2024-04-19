// 페이지 로딩 시 전체 상품 렌더링 및 초기 제목 설정
window.onload = function() {
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
});