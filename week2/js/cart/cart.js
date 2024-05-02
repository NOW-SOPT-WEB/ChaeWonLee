const modal = document.querySelector(".modal");
const checkboxAll = document.querySelector('thead input[type="checkbox"]');

// 모달 열기
const openModal = () => {
  const selectedItems = document.querySelectorAll(
    'tbody input[type="checkbox"]:checked'
  );
  renderModalItems(selectedItems);
  modal.style.display = "block";
};

// 모달 닫기
const closeModal = () => {
  modal.style.display = "none";
};

// thead의 체크박스 클릭시 tbody의 모든 체크박스 체크/언체크
const toggleCheckboxes = () => {
  document.querySelectorAll('tbody input[type="checkbox"]').forEach((chk) => {
    chk.checked = checkboxAll.checked;
  });
};

// 모달 내 '구매하기' 버튼 클릭시 선택된 상품 삭제 및 모달 닫힘
const purchaseItems = () => {
  const selectedItems = document.querySelectorAll(
    'tbody input[type="checkbox"]:checked'
  );
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  selectedItems.forEach((chk) => {
    const tr = chk.closest("tr");
    const title = tr.querySelector(".td-title").textContent;
    const itemIndex = cartItems.findIndex((item) => item.title === title);
    if (itemIndex !== -1) {
      cartItems.splice(itemIndex, 1);
    }
    tr.remove();
  });

  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  renderCartItems();
  alert("구매 완료했습니다");
  modal.style.display = "none";
  checkboxAll.checked = false;
};

const handleTableClick = (e) => {
  if (!e.target.matches(".delete-btn")) return;
  const tr = e.target.closest("tr");
  const title = tr.querySelector(".td-title").textContent;
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  const itemIndex = cartItems.findIndex((item) => item.title === title);
  if (itemIndex !== -1) {
    cartItems.splice(itemIndex, 1);
  }
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  renderCartItems();
};

const eventHandlers = [
  { selector: ".buy-btn", event: "click", handler: openModal },
  { selector: ".modal-close-btn", event: "click", handler: closeModal },
  {
    selector: 'thead input[type="checkbox"]',
    event: "change",
    handler: toggleCheckboxes,
  },
  { selector: ".modal-buy-btn", event: "click", handler: purchaseItems },
  { selector: "table tbody", event: "click", handler: handleTableClick },
];

eventHandlers.forEach(({ selector, event, handler }) => {
  const targets = document.querySelectorAll(selector);
  targets.forEach((target) => {
    target.addEventListener(event, handler);
  });
});

const createCartItemTemplate = (item) => `
    <tr>
        <td class='td-input'><input type='checkbox'></td>
        <td class='td-img'><img class='cart-img' src='${item.image}' alt='${
  item.title
}'></td>
        <td class='td-title'>${item.title}</td>
        <td class='td-charge'>${formatPrice(item.price)}원</td>
        <td class='td-cate'>${item.category}</td>
        <td class='td-btn'><button class='delete-btn' type='button'>삭제</button></td>
    </tr>
`;

const renderCartItems = () => {
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  const tbody = document.querySelector("table tbody");
  tbody.innerHTML = cartItems.map(createCartItemTemplate).join("");
};

// 숫자에 , 추가
const formatPrice = (price) => {
  return new Intl.NumberFormat("ko-KR").format(price);
};

// 모달 아이템
const renderModalItems = (selectedItems) => {
  const modalItems = document.querySelector(".modal-items");
  modalItems.innerHTML = "";
  let totalAmount = 0;
  let itemsHTML = "";

  selectedItems.forEach((input) => {
    const tr = input.closest("tr");
    const imgSrc = tr.querySelector(".cart-img").src;
    const title = tr.querySelector(".td-title").textContent;
    const price = parseInt(
      tr
        .querySelector(".td-charge")
        .textContent.replace(/,/g, "")
        .replace("원", "")
    );

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
  const modalTop = document.querySelector(".modal-top h1");
  modalTop.textContent = `총 금액 : ${totalAmount.toLocaleString()}원`;
};

renderCartItems();
