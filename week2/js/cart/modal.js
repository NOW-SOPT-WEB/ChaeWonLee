const modal = document.querySelector('.modal');
// 모달 열기
export const openModal = () => {
    const selectedItems = document.querySelectorAll('tbody input[type="checkbox"]:checked');
    renderModalItems(selectedItems);
    modal.style.display = 'block';
};
    
// 모달 닫기
export const closeModal = () => {
    modal.style.display = 'none';
};

// 모달 아이템
export const renderModalItems = (selectedItems) => {
    const modalItems = document.querySelector('.modal-items');
    modalItems.innerHTML = ''; 
    let totalAmount = 0; 
    let itemsHTML = ''; 

    selectedItems.forEach(input => {
        const tr = input.closest('tr');
        const imgSrc = tr.querySelector('.cart-img').src;
        const title = tr.querySelector('.td-title').textContent;
        const price = parseInt(tr.querySelector('.td-charge').textContent.replace(/,/g, '').replace('원', ''));

        totalAmount += price; 

        itemsHTML += `
            <article class="modal-item-content">
                <img class="modal-item-img" src="${imgSrc}" alt="${title}">
                <p class="modal-item-charge">${price.toLocaleString()}원</p>
                <p class="modal-item-title">${title}</p>
            </article>
        `;
    });

    modalItems.innerHTML = itemsHTML; 

    // 총 금액을 표시하는 부분 업데이트
    const modalTop = document.querySelector('.modal-top h1');
    modalTop.textContent = `총 금액 : ${totalAmount.toLocaleString()}원`;
};
