document.addEventListener('DOMContentLoaded', () => {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanels = document.querySelectorAll('.tab-panel');

    // --- Tab Switching Logic ---
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Deactivate all tabs
            tabButtons.forEach(btn => {
                btn.classList.remove('active');
                btn.classList.add('text-gray-300');
            });
            tabPanels.forEach(panel => panel.classList.add('hidden'));

            // Activate clicked tab
            button.classList.add('active');
            button.classList.remove('text-gray-300');
            const targetPanel = document.querySelector(button.dataset.tabTarget);
            if (targetPanel) {
                targetPanel.classList.remove('hidden');
            }
        });
    });

    // --- Find ID Logic ---
    const findIdForm = document.getElementById('find-id-form');
    const findIdEmailInput = document.getElementById('find-id-email');
    const findIdResult = document.getElementById('find-id-result');

    findIdForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const email = findIdEmailInput.value.trim();
        findIdResult.textContent = ''; // Clear previous result

        if (!email) {
            findIdResult.textContent = '이메일을 입력해주세요.';
            findIdResult.classList.add('text-red-400');
            return;
        }

        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const foundUser = users.find(user => user.email === email);

        if (foundUser) {
            findIdResult.innerHTML = `회원님의 아이디는 <br> <strong class="text-orange-300">${foundUser.email}</strong> 입니다.`;
            findIdResult.classList.remove('text-red-400');
        } else {
            findIdResult.textContent = '해당 이메일로 가입된 아이디가 없습니다.';
            findIdResult.classList.add('text-red-400');
        }
    });

    // --- Find Password Logic ---
    const findPasswordForm = document.getElementById('find-password-form');
    const findPwEmailInput = document.getElementById('find-pw-email');
    const findPasswordResult = document.getElementById('find-password-result');

    findPasswordForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const email = findPwEmailInput.value.trim();
        findPasswordResult.textContent = ''; // Clear previous result

        if (!email) {
            findPasswordResult.textContent = '이메일을 입력해주세요.';
            findPasswordResult.classList.add('text-red-400');
            return;
        }

        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const foundUser = users.find(user => user.email === email);

        if (foundUser) {
            findPasswordResult.textContent = '가입하신 이메일로 비밀번호 재설정 링크를 보냈습니다. (임시 메시지)';
            findPasswordResult.classList.remove('text-red-400');
        } else {
            findPasswordResult.textContent = '해당 이메일로 가입된 계정이 없습니다.';
            findPasswordResult.classList.add('text-red-400');
        }
    });
});
