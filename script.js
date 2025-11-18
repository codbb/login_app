document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const googleLoginButton = document.getElementById('google-login-button'); // 구글 로그인 버튼 추가

    loginForm.addEventListener('submit', (event) => {
        // 폼의 기본 제출 동작을 막습니다.
        event.preventDefault();

        const emailValue = emailInput.value.trim();
        const passwordValue = passwordInput.value.trim();

        // 1. 필드가 비어있는지 확인
        if (emailValue === '' || passwordValue === '') {
            alert('이메일과 비밀번호를 모두 입력해주세요.');
            return;
        }

        // 2. localStorage에서 사용자 정보 가져오기
        const existingUsers = localStorage.getItem('users');
        const users = existingUsers ? JSON.parse(existingUsers) : [];

        // 3. 입력된 비밀번호를 Base64로 인코딩하여 비교 준비
        const encryptedPassword = btoa(passwordValue);

        // 4. 이메일과 암호화된 비밀번호가 일치하는 사용자 찾기
        const foundUser = users.find(user => user.email === emailValue && user.password === encryptedPassword);

        // 5. 로그인 성공 또는 실패 처리
            if (foundUser) {
                alert('로그인 성공!');
                localStorage.setItem('lastLoggedInEmail', emailValue); // 로그인한 사용자 이메일 저장
                window.location.href = 'dashboard.html'; // 대시보드 페이지로 리디렉션
            } else {
                alert('이메일 또는 비밀번호가 잘못되었습니다.');
            }
    });

    // 구글 로그인 버튼 클릭 이벤트 리스너
    if (googleLoginButton) {
        googleLoginButton.addEventListener('click', () => {
            alert('구글 로그인 기능이 실행됩니다.');
            // 실제 구글 로그인 API 연동 코드가 여기에 들어갑니다.
        });
    }
});