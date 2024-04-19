window.onload = function() {
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
    
            const itemIndex = cartItems.findIndex(item => item.title === title); // 고유한 ID를 사용하여 해당 아이템을 찾습니다.
            if (itemIndex !== -1) {
                cartItems.splice(itemIndex, 1); // 해당 아이템 삭제
            }
    
            tr.remove(); // DOM에서 tr 요소 제거
        });
    
        localStorage.setItem('cartItems', JSON.stringify(cartItems)); // 업데이트된 장바구니 데이터 저장
        renderCartItems(); // 장바구니 아이템 다시 렌더링
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

        // 체크박스 셀
        const tdInput = document.createElement('td');
        tdInput.className = 'td-input';
        const input = document.createElement('input');
        input.type = 'checkbox';
        tdInput.appendChild(input);

        // 이미지 셀
        const tdImg = document.createElement('td');
        tdImg.className = 'td-img';
        const img = document.createElement('img');
        img.className = 'cart-img';
        img.src = item.image;
        img.alt = item.title;
        tdImg.appendChild(img);

        // 제목 셀
        const tdTitle = document.createElement('td');
        tdTitle.className = 'td-title';
        tdTitle.textContent = item.title;

        // 가격 셀
        const tdCharge = document.createElement('td');
        tdCharge.className = 'td-charge';
        const numericPrice = item.price.replace(/[^0-9.-]+/g, "");
        const formattedPrice = new Intl.NumberFormat('ko-KR').format(Number(numericPrice));
        tdCharge.textContent = `${formattedPrice}원`;
        
        // 카테고리 셀
        const tdCate = document.createElement('td');
        tdCate.className = 'td-cate';
        tdCate.textContent = item.category;

        // 삭제 버튼 셀
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

        // tr에 모든 셀 추가
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
        // 콤마와 '원' 문자 제거 후 정수 변환
        const price = parseInt(tr.querySelector('.td-charge').textContent.replace(/,/g, '').replace('원', ''));
        
        totalAmount += price;
        
        const article = document.createElement('article');
        article.className = 'modal-item-content';
        
        // 이미지 요소 생성 및 설정
        const imgElement = document.createElement('img');
        imgElement.className = 'modal-item-img';
        imgElement.src = imgSrc;
        imgElement.alt = title;
        
        // 가격 표시 요소 생성 및 설정
        const priceElement = document.createElement('p');
        priceElement.className = 'modal-item-charge';
        priceElement.textContent = `${price.toLocaleString()}원`;
        
        // 제목 표시 요소 생성 및 설정
        const titleElement = document.createElement('p');
        titleElement.className = 'modal-item-title';
        titleElement.textContent = title;
        
        // article 요소에 생성한 이미지, 가격, 제목 요소를 순서대로 추가
        article.appendChild(imgElement);
        article.appendChild(priceElement);
        article.appendChild(titleElement);
        
        // 최종적으로 모달 아이템에 article 요소 추가
        modalItems.appendChild(article);
    });
    
    // 총 금액 업데이트, 숫자에 콤마 추가
    const modalTop = document.querySelector('.modal-top h1');
    modalTop.textContent = `총 금액 : ${totalAmount.toLocaleString()}원`;
    
}