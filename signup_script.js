document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signup-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const passwordConfirmInput = document.getElementById('password-confirm');

    signupForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const nameValue = nameInput.value.trim();
        const emailValue = emailInput.value.trim();
        const passwordValue = passwordInput.value.trim();
        const passwordConfirmValue = passwordConfirmInput.value.trim();

        // 1. 모든 필드 입력 확인
        if (nameValue === '' || emailValue === '' || passwordValue === '' || passwordConfirmValue === '') {
            alert('모든 필드를 입력해주세요.');
            return;
        }

        // 2. 비밀번호 일치 확인
        if (passwordValue !== passwordConfirmValue) {
            alert('비밀번호가 일치하지 않습니다.');
            return;
        }

        // 3. localStorage에서 기존 사용자 정보 가져오기
        const existingUsers = localStorage.getItem('users');
        const users = existingUsers ? JSON.parse(existingUsers) : [];

        // 4. 이메일 중복 확인
        const emailExists = users.some(user => user.email === emailValue);
        if (emailExists) {
            alert('이미 가입된 이메일입니다. 다른 이메일을 사용해주세요.');
            return;
        }

        // 5. 비밀번호를 Base64로 인코딩
        const encryptedPassword = btoa(passwordValue);

        // 6. 새 사용자 객체 생성
        const newUser = {
            name: nameValue,
            email: emailValue,
            password: encryptedPassword
        };

        // 7. 새 사용자를 배열에 추가하고 localStorage에 저장
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

        alert('회원가입 성공! 로그인 페이지로 이동합니다.');
        
        // 성공 후 로그인 페이지로 리디렉션
        window.location.href = 'index.html';
    });
});