
// 사이드바 열기 버튼 클릭 이벤트 리스너
export const setupSidebar = () => {
    const menuButton = document.querySelector('.open-btn');
    const closeSidebarButton = document.querySelector('.close-btn');

    menuButton.addEventListener('click', () => {
        toggleSidebar(true);
    });

    closeSidebarButton.addEventListener('click', () => {
        toggleSidebar(false);
    });
};

// 사이드바 열고 닫기 함수
const toggleSidebar = (isOpen) => {
    const sidebar = document.querySelector('.side-bar');
    if (isOpen) {
        sidebar.classList.remove('close');
        sidebar.classList.add('open');
    } else {
        sidebar.classList.remove('open');
        sidebar.classList.add('close');
    }
};
