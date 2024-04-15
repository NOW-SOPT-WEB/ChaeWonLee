document.addEventListener('DOMContentLoaded', function() {

    const menuButton = document.querySelector('.open-btn');
    const closeSidebarButton = document.querySelector('.close-btn');
    const sidebar = document.querySelector('.side-bar');

    // 사이드바 열기
    function open() {
        sidebar.classList.add('open');
    }

    // 사이드바 닫기
    function close() {
        sidebar.classList.remove('open');
    }

    // 사이드 바 열기 버튼 클릭
    menuButton.addEventListener('click', open);

    // 사이드바 닫기 버튼 클릭
    closeSidebarButton.addEventListener('click', close);
});
