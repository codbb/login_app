document.addEventListener('DOMContentLoaded', () => {
    const userEmailSpan = document.getElementById('user-email');
    const userNameSpan = document.getElementById('user-name');
    const logoutButton = document.getElementById('logout-button');

    const updateNameForm = document.getElementById('update-name-form');
    const newNameInput = document.getElementById('new-name');
    const updateNameResult = document.getElementById('update-name-result');

    const updatePasswordForm = document.getElementById('update-password-form');
    const currentPasswordInput = document.getElementById('current-password');
    const newPasswordInput = document.getElementById('new-password');
    const confirmNewPasswordInput = document.getElementById('confirm-new-password');
    const updatePasswordResult = document.getElementById('update-password-result');

    let currentUser = null;
    let users = [];
    let currentUserIndex = -1;

    // --- 초기화 및 사용자 정보 로드 ---
    function initialize() {
        const lastLoggedInEmail = localStorage.getItem('lastLoggedInEmail');
        if (!lastLoggedInEmail) {
            alert('로그인이 필요합니다.');
            window.location.href = 'index.html';
            return;
        }

        users = JSON.parse(localStorage.getItem('users') || '[]');
        currentUserIndex = users.findIndex(user => user.email === lastLoggedInEmail);

        if (currentUserIndex === -1) {
            alert('사용자 정보를 찾을 수 없습니다. 다시 로그인해주세요.');
            localStorage.removeItem('lastLoggedInEmail');
            window.location.href = 'index.html';
            return;
        }

        currentUser = users[currentUserIndex];
        displayUserInfo();
    }

    function displayUserInfo() {
        userEmailSpan.textContent = currentUser.email;
        userNameSpan.textContent = currentUser.name || '이름 없음';
    }

    // --- 이름(닉네임) 수정 로직 ---
    updateNameForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const newName = newNameInput.value.trim();
        if (!newName) {
            updateNameResult.textContent = '새 이름을 입력해주세요.';
            return;
        }

        users[currentUserIndex].name = newName;
        localStorage.setItem('users', JSON.stringify(users));
        
        updateNameResult.textContent = '이름이 성공적으로 변경되었습니다.';
        updateNameResult.classList.add('text-green-400');
        setTimeout(() => updateNameResult.textContent = '', 3000);
        
        initialize(); // 정보 다시 로드하여 화면 갱신
        newNameInput.value = '';
    });

    // --- 비밀번호 수정 로직 ---
    updatePasswordForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const currentPassword = currentPasswordInput.value;
        const newPassword = newPasswordInput.value;
        const confirmNewPassword = confirmNewPasswordInput.value;

        // 1. 새 비밀번호 일치 여부 확인
        if (newPassword !== confirmNewPassword) {
            updatePasswordResult.textContent = '새 비밀번호가 일치하지 않습니다.';
            updatePasswordResult.classList.add('text-red-400');
            return;
        }

        // 2. 현재 비밀번호 확인
        if (btoa(currentPassword) !== currentUser.password) {
            updatePasswordResult.textContent = '현재 비밀번호가 올바르지 않습니다.';
            updatePasswordResult.classList.add('text-red-400');
            return;
        }

        // 3. 비밀번호 업데이트
        users[currentUserIndex].password = btoa(newPassword);
        localStorage.setItem('users', JSON.stringify(users));

        updatePasswordResult.textContent = '비밀번호가 성공적으로 변경되었습니다.';
        updatePasswordResult.classList.remove('text-red-400');
        updatePasswordResult.classList.add('text-green-400');
        
        // 폼 초기화 및 메시지 숨기기
        updatePasswordForm.reset();
        setTimeout(() => updatePasswordResult.textContent = '', 3000);
    });

    // --- 로그아웃 로직 ---
    logoutButton.addEventListener('click', () => {
        localStorage.removeItem('lastLoggedInEmail');
        alert('로그아웃 되었습니다.');
        window.location.href = 'index.html';
    });

    initialize();
});
