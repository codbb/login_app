document.addEventListener('DOMContentLoaded', () => {
    const userNameSpan = document.getElementById('user-name');
    const logoutButton = document.getElementById('logout-button');
    const mypageButton = document.getElementById('mypage-button'); // 마이페이지 버튼 추가

    // localStorage에서 마지막으로 로그인한 사용자 이메일 가져오기
    const lastLoggedInEmail = localStorage.getItem('lastLoggedInEmail');

    if (lastLoggedInEmail) {
        // 이메일에서 @ 앞부분을 이름으로 사용 (임시)
        const namePart = lastLoggedInEmail.split('@')[0];
        userNameSpan.textContent = namePart;
    } else {
        // 로그인 정보가 없으면 로그인 페이지로 리디렉션
        alert('로그인이 필요합니다.');
        window.location.href = 'index.html';
        return; // 리디렉션 후 스크립트 실행 중단
    }

    // 마이페이지 버튼 이벤트 리스너
    mypageButton.addEventListener('click', () => {
        window.location.href = 'mypage.html';
    });

    logoutButton.addEventListener('click', () => {
        // localStorage에서 로그인 정보 삭제
        localStorage.removeItem('lastLoggedInEmail');

        alert('로그아웃 되었습니다.');
        window.location.href = 'index.html'; // 로그인 페이지로 리디렉션
    });
});
