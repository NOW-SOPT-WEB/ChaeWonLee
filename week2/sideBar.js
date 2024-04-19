/*// 사이드 바
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
        sidebar.style.visibility = 'visible'; // 'visibility'를 visible'로 설정
        sidebar.style.opacity = '1'; // 'opacity'를 1로 설정
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
});*/

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
