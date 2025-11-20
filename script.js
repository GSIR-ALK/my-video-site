// 页面元素
const passwordScreen = document.getElementById('passwordScreen');
const videoScreen = document.getElementById('videoScreen');
const passwordInput = document.getElementById('passwordInput');
const errorMsg = document.getElementById('errorMsg');
const videoElement = document.getElementById('mainVideo');

// 检查密码
function checkPassword() {
    const inputPassword = passwordInput.value.trim();
    
    if (inputPassword === CONFIG.PASSWORD) {
        // 密码正确，进入视频界面
        passwordScreen.classList.add('hidden');
        videoScreen.classList.remove('hidden');
        initializeVideo();
    } else {
        // 密码错误
        errorMsg.textContent = '密码错误，请重新输入';
        passwordInput.value = '';
        passwordInput.focus();
        
        // 添加抖动效果
        passwordInput.style.animation = 'shake 0.5s';
        setTimeout(() => {
            passwordInput.style.animation = '';
        }, 500);
    }
}

// 初始化视频
function initializeVideo() {
    // 设置视频源
    videoElement.src = CONFIG.VIDEO_URL;
    if (CONFIG.VIDEO_POSTER) {
        videoElement.poster = CONFIG.VIDEO_POSTER;
    }
    
    // 禁用右键菜单
    videoElement.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        return false;
    });
    
    // 禁用键盘控制
    document.addEventListener('keydown', (e) => {
        if (e.key === ' ' || e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
            e.preventDefault();
        }
    });
    
    // 视频加载后自动播放
    videoElement.addEventListener('loadeddata', () => {
        videoElement.play().catch(e => {
            console.log('自动播放被阻止，需要用户交互');
        });
    });
}

// 按回车键提交密码
passwordInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        checkPassword();
    }
});

// 页面加载完成后聚焦密码输入框
window.addEventListener('load', () => {
    passwordInput.focus();
});

// 添加抖动动画
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
`;
document.head.appendChild(style);