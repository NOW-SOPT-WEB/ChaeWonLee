const SHOPPING_LIST = [
    { category: 'outer', title: '가디건', price: 26930, image: './assets/img/outer-cardigan.png' },
    { category: 'outer', title: '후드집업', price: 69700, image: './assets/img/outer-hooded.png' },
    { category: 'outer', title: '가죽자켓', price: 45900, image: './assets/img/outer-leather.png'},
    { category: 'outer', title: '바람막이', price: 44000, image: './assets/img/outer-windbreaker.png'},
    { category: 'top', title: '니트 - 핑크', price: 28500, image: './assets/img/top-knitwear-pink.png'},
    { category: 'top', title: '티셔츠 - 블랙', price: 11000, image: './assets/img/top-shirt-black.png'},
    { category: 'top', title: '셔츠 - 연보라', price: 17100, image: './assets/img/top-shirt-white.png'},
    { category: 'top', title: '셔츠 - 화이트', price: 50000, image: './assets/img/top-shirt-white.png'},
    { category: 'top', title: '긴팔티 - 화이트', price: 21000, image: './assets/img/top-sleeved-shirt-white.png'},
    { category: 'pants', title: '와이드 카고', price: 19400, image: './assets/img/pants-cargo.png'},
    { category: 'pants', title: '데님 팬츠', price: 29900, image: './assets/img/pants-denim.png'},
];

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
