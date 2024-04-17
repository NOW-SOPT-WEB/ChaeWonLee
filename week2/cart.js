window.onload = function() {
    renderCartItems(); // 장바구니 아이템 렌더링

    /*const thead = document.querySelector("thead");
    const tbody = document.querySelector("tbody");
    
    const theadCells = thead.querySelectorAll("tr:first-child td");
    const tbodyCells = tbody.querySelectorAll("tr:first-child td");
    
    theadCells.forEach((cell, index) => {

        cell.style.width = `60rem`;
    });*/
    
};




function renderCartItems() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    console.log("h2", JSON.stringify(cartItems))
    const tbody = document.querySelector('table tbody');
    tbody.innerHTML = ''; // 기존 내용을 비웁니다.

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
        tdCharge.textContent = item.price;

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
