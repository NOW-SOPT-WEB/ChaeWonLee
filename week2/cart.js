/*window.onload = function() {
    renderCartItems(); // 장바구니 아이템 렌더링  
};


document.addEventListener("DOMContentLoaded", function() {
    renderCartItems();

    const openModalBtn = document.querySelector('.buy-btn');
    const closeModalBtn = document.querySelector('.close-btn');
    const modal = document.querySelector('.modal');
    const modalBuyBtn = document.querySelector('.modal-buy-btn');
    const checkboxAll = document.querySelector('thead input[type="checkbox"]');

    // '구매하기' 버튼 클릭시 모달 오픈
    openModalBtn.addEventListener('click', function() {
        const selectedItems = document.querySelectorAll('tbody input[type="checkbox"]:checked');
        renderModalItems(selectedItems);
        modal.style.display = 'block';
    });

    // 모달 내 '닫기' 버튼 클릭시 모달 닫힘
    closeModalBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    // thead의 체크박스 클릭시 tbody의 모든 체크박스 체크/언체크
    checkboxAll.addEventListener('change', function() {
        const checkboxes = document.querySelectorAll('tbody input[type="checkbox"]');
        checkboxes.forEach(chk => {
            chk.checked = checkboxAll.checked;
        });
    });

    // 모달 내 '구매하기' 버튼 클릭시 선택된 상품 삭제 및 모달 닫힘
    modalBuyBtn.addEventListener('click', function() {
        const selectedItems = document.querySelectorAll('tbody input[type="checkbox"]:checked');
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        
        selectedItems.forEach(chk => {
            const tr = chk.closest('tr');
            const title = tr.querySelector('.td-title').textContent; 
    
            const itemIndex = cartItems.findIndex(item => item.title === title); 
            if (itemIndex !== -1) {
                cartItems.splice(itemIndex, 1); // 해당 아이템 삭제
            }
    
            tr.remove(); 
        });
    
        localStorage.setItem('cartItems', JSON.stringify(cartItems)); // 업데이트된 장바구니 데이터 저장
        renderCartItems(); 
        // 구매 완료 Alert 추가
        alert("구매 완료했습니다");
        modal.style.display = 'none'; // Alert 확인 후 모달 닫기

        checkboxAll.checked = false;
    });
    
});

function renderCartItems() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    console.log("h2", JSON.stringify(cartItems))
    const tbody = document.querySelector('table tbody');
    tbody.innerHTML = ''; 

    cartItems.forEach((item, index) => {
        const tr = document.createElement('tr');

        // 체크박스
        const tdInput = document.createElement('td');
        tdInput.className = 'td-input';
        const input = document.createElement('input');
        input.type = 'checkbox';
        tdInput.appendChild(input);

        // 이미지
        const tdImg = document.createElement('td');
        tdImg.className = 'td-img';
        const img = document.createElement('img');
        img.className = 'cart-img';
        img.src = item.image;
        img.alt = item.title;
        tdImg.appendChild(img);

        // 제목
        const tdTitle = document.createElement('td');
        tdTitle.className = 'td-title';
        tdTitle.textContent = item.title;

        // 가격
        const tdCharge = document.createElement('td');
        tdCharge.className = 'td-charge';
        const numericPrice = item.price.replace(/[^0-9.-]+/g, "");
        const formattedPrice = new Intl.NumberFormat('ko-KR').format(Number(numericPrice));
        tdCharge.textContent = `${formattedPrice}원`;
        
        // 카테고리
        const tdCate = document.createElement('td');
        tdCate.className = 'td-cate';
        tdCate.textContent = item.category;

        // 삭제 버튼
        const tdBtn = document.createElement('td');
        tdBtn.className = 'td-btn';
        const button = document.createElement('button');
        button.className = 'delete-btn';
        button.textContent = '삭제';
        button.type = 'button';
        button.addEventListener('click', function() {
            cartItems.splice(index, 1); // 해당 아이템 삭제
            localStorage.setItem('cartItems', JSON.stringify(cartItems)); // 업데이트된 장바구니 데이터 저장
            renderCartItems(); // 장바구니 아이템 다시 렌더링
        });
        tdBtn.appendChild(button);


        tr.appendChild(tdInput);
        tr.appendChild(tdImg);
        tr.appendChild(tdTitle);
        tr.appendChild(tdCharge);
        tr.appendChild(tdCate);
        tr.appendChild(tdBtn);

        tbody.appendChild(tr);
    });
}

function renderModalItems(selectedItems) {
    const modalItems = document.querySelector('.modal-items');
    modalItems.innerHTML = '';
    let totalAmount = 0;

    selectedItems.forEach(input => {
        const tr = input.closest('tr');
        const imgSrc = tr.querySelector('.cart-img').src;
        const title = tr.querySelector('.td-title').textContent;
        // ','와 '원' 문자 제거 후 정수 변환
        const price = parseInt(tr.querySelector('.td-charge').textContent.replace(/,/g, '').replace('원', ''));
        
        totalAmount += price;
        
        const article = document.createElement('article');
        article.className = 'modal-item-content';
        
        // 이미지 요소 
        const imgElement = document.createElement('img');
        imgElement.className = 'modal-item-img';
        imgElement.src = imgSrc;
        imgElement.alt = title;
        
        // 가격 표시 요소 
        const priceElement = document.createElement('p');
        priceElement.className = 'modal-item-charge';
        priceElement.textContent = `${price.toLocaleString()}원`;
        
        // 제목 표시 요소 
        const titleElement = document.createElement('p');
        titleElement.className = 'modal-item-title';
        titleElement.textContent = title;
        
        // article 요소
        article.appendChild(imgElement);
        article.appendChild(priceElement);
        article.appendChild(titleElement);
        
        
        modalItems.appendChild(article);
    });
    
    // 총 금액 업데이트, 숫자에 , 추가
    const modalTop = document.querySelector('.modal-top h1');
    modalTop.textContent = `총 금액 : ${totalAmount.toLocaleString()}원`;
    
}*/

// 두번째
/*document.addEventListener("DOMContentLoaded", function() {
    renderCartItems();

    const modal = document.querySelector('.modal');
    const checkboxAll = document.querySelector('thead input[type="checkbox"]');

    // 이벤트 핸들러를 매핑하는 객체
    const eventHandlers = [
        { selector: '.buy-btn', event: 'click', handler: openModal },
        { selector: '.modal-close-btn', event: 'click', handler: closeModal },
        { selector: 'thead input[type="checkbox"]', event: 'change', handler: toggleCheckboxes },
        { selector: '.modal-buy-btn', event: 'click', handler: purchaseItems },
        { selector: 'table tbody', event: 'click', handler: handleTableClick }
    ];
    
    // 이벤트 핸들러 매핑을 기반으로 이벤트 리스너 추가
    eventHandlers.forEach(({ selector, event, handler }) => {
        const targets = document.querySelectorAll(selector);
        targets.forEach(target => {
            target.addEventListener(event, handler);
        });
    });
    

    function openModal() {
        const selectedItems = document.querySelectorAll('tbody input[type="checkbox"]:checked');
        renderModalItems(selectedItems);
        modal.style.display = 'block';
    }

    function closeModal() {
        modal.style.display = 'none';
    }

    function toggleCheckboxes() {
        document.querySelectorAll('tbody input[type="checkbox"]').forEach(chk => {
            chk.checked = checkboxAll.checked;
        });
    }

    function purchaseItems() {
        const selectedItems = document.querySelectorAll('tbody input[type="checkbox"]:checked');
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        
        selectedItems.forEach(chk => {
            const tr = chk.closest('tr');
            const title = tr.querySelector('.td-title').textContent;
            const itemIndex = cartItems.findIndex(item => item.title === title);
            if (itemIndex !== -1) {
                cartItems.splice(itemIndex, 1);
            }
            tr.remove();
        });
    
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        renderCartItems();
        alert("구매 완료했습니다");
        modal.style.display = 'none';
        checkboxAll.checked = false;
    }

    function handleTableClick(e) {
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
    }
});

function createCartItemTemplate(item) {
    return `
        <tr>
            <td class='td-input'><input type='checkbox'></td>
            <td class='td-img'><img class='cart-img' src='${item.image}' alt='${item.title}'></td>
            <td class='td-title'>${item.title}</td>
            <td class='td-charge'>${formatPrice(item.price)}원</td>
            <td class='td-cate'>${item.category}</td>
            <td class='td-btn'><button class='delete-btn' type='button'>삭제</button></td>
        </tr>
    `;
}

function renderCartItems() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const tbody = document.querySelector('table tbody');
    tbody.innerHTML = cartItems.map(createCartItemTemplate).join('');
}

function formatPrice(price) {
    const numericPrice = price.replace(/[^0-9.-]+/g, "");
    return new Intl.NumberFormat('ko-KR').format(parseFloat(numericPrice));
}


function renderModalItems(selectedItems) {
    const modalItems = document.querySelector('.modal-items');
    modalItems.innerHTML = ''; // 모달 아이템 초기화
    let totalAmount = 0; // 총 금액 초기화
    let itemsHTML = ''; // 모든 아이템을 위한 HTML 초기화

    selectedItems.forEach(input => {
        const tr = input.closest('tr');
        const imgSrc = tr.querySelector('.cart-img').src;
        const title = tr.querySelector('.td-title').textContent;
        const price = parseInt(tr.querySelector('.td-charge').textContent.replace(/,/g, '').replace('원', ''));

        totalAmount += price; // 총 금액 계산

        itemsHTML += `
            <article class="modal-item-content">
                <img class="modal-item-img" src="${imgSrc}" alt="${title}">
                <p class="modal-item-charge">${price.toLocaleString()}원</p>
                <p class="modal-item-title">${title}</p>
            </article>
        `;
    });

    modalItems.innerHTML = itemsHTML; // 생성된 모든 아이템의 HTML을 modalItems에 추가

    // 총 금액을 표시하는 부분 업데이트
    const modalTop = document.querySelector('.modal-top h1');
    modalTop.textContent = `총 금액 : ${totalAmount.toLocaleString()}원`;
}*/


// 모달, 체크박스 및 이벤트 핸들러 매핑

/*document.addEventListener("DOMContentLoaded", function() {
    initializeEventListeners();
    renderCartItems()
});

const modal = document.querySelector('.modal');
const checkboxAll = document.querySelector('thead input[type="checkbox"]');

const eventHandlers = [
    { selector: '.buy-btn', event: 'click', handler: openModal },
    { selector: '.modal-close-btn', event: 'click', handler: closeModal },
    { selector: 'thead input[type="checkbox"]', event: 'change', handler: toggleCheckboxes },
    { selector: '.modal-buy-btn', event: 'click', handler: purchaseItems },
    { selector: 'table tbody', event: 'click', handler: handleTableClick }
];

// 이벤트 리스너 초기화 함수
function initializeEventListeners() {
    eventHandlers.forEach(({ selector, event, handler }) => {
        const targets = document.querySelectorAll(selector);
        targets.forEach(target => {
            target.addEventListener(event, handler);
        });
    });
}

// 모달 관련 함수들
function openModal() {
    const selectedItems = document.querySelectorAll('tbody input[type="checkbox"]:checked');
    renderModalItems(selectedItems);
    modal.style.display = 'block';
}

function closeModal() {
    modal.style.display = 'none';
}

function toggleCheckboxes() {
    document.querySelectorAll('tbody input[type="checkbox"]').forEach(chk => {
        chk.checked = checkboxAll.checked;
    });
}

function purchaseItems() {
    const selectedItems = document.querySelectorAll('tbody input[type="checkbox"]:checked');
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    selectedItems.forEach(chk => {
        const tr = chk.closest('tr');
        const title = tr.querySelector('.td-title').textContent;
        const itemIndex = cartItems.findIndex(item => item.title === title);
        if (itemIndex !== -1) {
            cartItems.splice(itemIndex, 1);
        }
        tr.remove();
    });

    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    renderCartItems();
    alert("구매 완료했습니다");
    modal.style.display = 'none';
    checkboxAll.checked = false;
}

function handleTableClick(e) {
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
}

// 장바구니 아이템과 관련된 함수들
function renderCartItems() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const tbody = document.querySelector('table tbody');
    tbody.innerHTML = cartItems.map(createCartItemTemplate).join('');
}

function createCartItemTemplate(item) {
    return `
        <tr>
            <td class='td-input'><input type='checkbox'></td>
            <td class='td-img'><img class='cart-img' src='${item.image}' alt='${item.title}'></td>
            <td class='td-title'>${item.title}</td>
            <td class='td-charge'>${formatPrice(item.price)}원</td>
            <td class='td-cate'>${item.category}</td>
            <td class='td-btn'><button class='delete-btn' type='button'>삭제</button></td>
        </tr>
    `;
}

function formatPrice(price) {
    const numericPrice = price.replace(/[^0-9.-]+/g, "");
    return new Intl.NumberFormat('ko-KR').format(parseFloat(numericPrice));
}

function renderModalItems(selectedItems) {
    const modalItems = document.querySelector('.modal-items');
    modalItems.innerHTML = ''; // 모달 아이템 초기화
    let totalAmount = 0; // 총 금액 초기화
    let itemsHTML = ''; // 모든 아이템을 위한 HTML 초기화

    selectedItems.forEach(input => {
        const tr = input.closest('tr');
        const imgSrc = tr.querySelector('.cart-img').src;
        const title = tr.querySelector('.td-title').textContent;
        const price = parseInt(tr.querySelector('.td-charge').textContent.replace(/,/g, '').replace('원', ''));

        totalAmount += price; // 총 금액 계산

        itemsHTML += `
            <article class="modal-item-content">
                <img class="modal-item-img" src="${imgSrc}" alt="${title}">
                <p class="modal-item-charge">${price.toLocaleString()}원</p>
                <p class="modal-item-title">${title}</p>
            </article>
        `;
    });

    modalItems.innerHTML = itemsHTML; // 생성된 모든 아이템의 HTML을 modalItems에 추가

    // 총 금액을 표시하는 부분 업데이트
    const modalTop = document.querySelector('.modal-top h1');
    modalTop.textContent = `총 금액 : ${totalAmount.toLocaleString()}원`;
}
*/








    const modal = document.querySelector('.modal');
    const checkboxAll = document.querySelector('thead input[type="checkbox"]');

    const openModal = () => {
        const selectedItems = document.querySelectorAll('tbody input[type="checkbox"]:checked');
        renderModalItems(selectedItems);
        modal.style.display = 'block';
    };
    
    const closeModal = () => {
        modal.style.display = 'none';
    };

    const toggleCheckboxes = () => {
        document.querySelectorAll('tbody input[type="checkbox"]').forEach(chk => {
            chk.checked = checkboxAll.checked;
        });
    };

    const purchaseItems = () => {
        const selectedItems = document.querySelectorAll('tbody input[type="checkbox"]:checked');
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        
        selectedItems.forEach(chk => {
            const tr = chk.closest('tr');
            const title = tr.querySelector('.td-title').textContent;
            const itemIndex = cartItems.findIndex(item => item.title === title);
            if (itemIndex !== -1) {
                cartItems.splice(itemIndex, 1);
            }
            tr.remove();
        });
    
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        renderCartItems();
        alert("구매 완료했습니다");
        modal.style.display = 'none';
        checkboxAll.checked = false;
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

    

    const eventHandlers = [
        { selector: '.buy-btn', event: 'click', handler: openModal },
        { selector: '.modal-close-btn', event: 'click', handler: closeModal },
        { selector: 'thead input[type="checkbox"]', event: 'change', handler: toggleCheckboxes },
        { selector: '.modal-buy-btn', event: 'click', handler: purchaseItems },
        { selector: 'table tbody', event: 'click', handler: handleTableClick }
    ];

    eventHandlers.forEach(({ selector, event, handler }) => {
        const targets = document.querySelectorAll(selector);
        targets.forEach(target => {
            target.addEventListener(event, handler);
        });
    });


const createCartItemTemplate = (item) => `
    <tr>
        <td class='td-input'><input type='checkbox'></td>
        <td class='td-img'><img class='cart-img' src='${item.image}' alt='${item.title}'></td>
        <td class='td-title'>${item.title}</td>
        <td class='td-charge'>${formatPrice(item.price)}원</td>
        <td class='td-cate'>${item.category}</td>
        <td class='td-btn'><button class='delete-btn' type='button'>삭제</button></td>
    </tr>
`;

const renderCartItems = () => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const tbody = document.querySelector('table tbody');
    tbody.innerHTML = cartItems.map(createCartItemTemplate).join('');
};

const formatPrice = (price) => {
    const numericPrice = price.replace(/[^0-9.-]+/g, "");
    return new Intl.NumberFormat('ko-KR').format(parseFloat(numericPrice));
};

const renderModalItems = (selectedItems) => {
    const modalItems = document.querySelector('.modal-items');
    modalItems.innerHTML = ''; // 모달 아이템 초기화
    let totalAmount = 0; // 총 금액 초기화
    let itemsHTML = ''; // 모든 아이템을 위한 HTML 초기화

    selectedItems.forEach(input => {
        const tr = input.closest('tr');
        const imgSrc = tr.querySelector('.cart-img').src;
        const title = tr.querySelector('.td-title').textContent;
        const price = parseInt(tr.querySelector('.td-charge').textContent.replace(/,/g, '').replace('원', ''));

        totalAmount += price; // 총 금액 계산

        itemsHTML += `
            <article class="modal-item-content">
                <img class="modal-item-img" src="${imgSrc}" alt="${title}">
                <p class="modal-item-charge">${price.toLocaleString()}원</p>
                <p class="modal-item-title">${title}</p>
            </article>
        `;
    });

    modalItems.innerHTML = itemsHTML; // 생성된 모든 아이템의 HTML을 modalItems에 추가

    // 총 금액을 표시하는 부분 업데이트
    const modalTop = document.querySelector('.modal-top h1');
    modalTop.textContent = `총 금액 : ${totalAmount.toLocaleString()}원`;
};

renderCartItems();