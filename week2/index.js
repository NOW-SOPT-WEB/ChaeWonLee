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


// 사이드 바
document.addEventListener('DOMContentLoaded', function() {
    const menuButton = document.querySelector('.open-btn');
    const closeSidebarButton = document.querySelector('.close-btn');
    const sidebar = document.querySelector('.side-bar');

    // 사이드바 열기
    function openSidebar() {
        // 사이드바를 열기 전에 'close' 클래스가 있으면 제거
        if (sidebar.classList.contains('close')) {
            sidebar.classList.remove('close');
        }
        sidebar.classList.add('open');
        sidebar.style.visibility = 'visible'; // 'visibility'를 명시적으로 'visible'로 설정
        sidebar.style.opacity = '1'; // 'opacity'를 명시적으로 1로 설정
    }

    // 사이드바 닫기
    function closeSidebar() {
        sidebar.classList.remove('open');
        sidebar.classList.add('close');

        // 'close' 애니메이션이 끝난 후 'visibility'와 'opacity'를 업데이트
        sidebar.addEventListener('animationend', () => {
            if(sidebar.classList.contains('close')) {
                sidebar.style.visibility = 'hidden';
                sidebar.style.opacity = '0';
            }
        }, { once: true }); // 이벤트 리스너가 한 번 실행된 후 제거되도록 설정
    }

    // 사이드바 열기 버튼 클릭
    menuButton.addEventListener('click', openSidebar);

    // 사이드바 닫기 버튼 클릭
    closeSidebarButton.addEventListener('click', closeSidebar);
});



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