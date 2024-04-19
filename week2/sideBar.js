// 사이드 바
document.addEventListener('DOMContentLoaded', function() {
    const menuButton = document.querySelector('.open-btn');
    const closeSidebarButton = document.querySelector('.close-btn');
    const sidebar = document.querySelector('.side-bar');

    // 사이드바 열고 닫기
    function toggleSidebar(isOpen) {
        if (isOpen) {
            sidebar.classList.remove('close');
            sidebar.classList.add('open');
        } else {
            sidebar.classList.remove('open');
            sidebar.classList.add('close');
        }

    }

    // 사이드바 열기 버튼 클릭
    menuButton.addEventListener('click', function() {
        toggleSidebar(true);
    });

    // 사이드바 닫기 버튼 클릭
    closeSidebarButton.addEventListener('click', function() {
        toggleSidebar(false);
    });
});
