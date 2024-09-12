const users = {
    max168: { password: '123456', duration: 60 * 480 * 1000, maxSessions: 10 },  // 8 ชั่วโมง // ห้อง 4
    luck001: { password: '123456', duration: 60 * 60 * 1000, maxSessions: 1 },   // 1 ชัวโมง // มีมี่
    pass899: { password: '899899', duration: 60 * 480 * 1000, maxSessions: 1 },   // 1 ชั่วโมง // ปอน
    admin168: { password: '123456', duration: 60 * 480 * 1000, maxSessions: 10 },   // 8 ชั่วโมง // แจ็ค
    god168: { password: '123456', duration: 60 * 480 * 1000, maxSessions: 10 },   // 8 ชั่วโมง // ซัง
    eqxjdg: { password: 'eqxjdg1999', duration: 60 * 480 * 1000, maxSessions: 10 },   // 8 ชั่วโมง // โต
    admin99: { password: '123456', duration: 60 * 480 * 1000, maxSessions: 10 },   // 8ต ชั่วโมง // พี่น้ำ
    dx: { password: '164626', duration: 60 * 2880 * 1000, maxSessions: 1 }   // ไม่จำกัดเวลา, ไม่จำกัดจำนวนคน
    
};

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const sessions = JSON.parse(localStorage.getItem('sessions')) || {};
    const currentTime = new Date().getTime();

    // ตรวจสอบรหัสผ่าน
    if (users[username] && users[username].password === password) {
        // Remove expired sessions
        Object.keys(sessions).forEach(user => {
            sessions[user] = sessions[user].filter(session => session + users[user].duration > currentTime);
        });

        // ถ้าผู้ใช้เข้าสู่ระบบอยู่ ให้ลบเซสชันก่อนหน้า
        if (sessions[username] && sessions[username].length > 0) {
            alert(`ผู้ใช้ ${username} ได้เข้าสู่ระบบซ้ำ ผู้ใช้งานก่อนหน้านี้จะถูกเด้งออก`);
            logoutUser(username);
        }

        // บันทึกเซสชันใหม่
        const loginTime = new Date().getTime();
        if (!sessions[username]) sessions[username] = [];
        sessions[username].push(loginTime);

        localStorage.setItem('sessions', JSON.stringify(sessions));
        localStorage.setItem('loginTime', loginTime);
        localStorage.setItem('username', username);
        localStorage.setItem('duration', users[username].duration);
        document.getElementById('login').classList.add('hidden');
        document.getElementById('menu').classList.remove('hidden');
        updateTimeLeft();
        checkSession();
    } else {
        alert('รหัสผ่านไม่ถูกต้อง');
    }
}

function logoutUser(username) {
    const sessions = JSON.parse(localStorage.getItem('sessions')) || {};
    if (sessions[username]) {
        delete sessions[username];
        localStorage.setItem('sessions', JSON.stringify(sessions));
    }
}

function logout() {
    const username = localStorage.getItem('username');
    logoutUser(username);
    localStorage.removeItem('loginTime');
    localStorage.removeItem('username');
    localStorage.removeItem('duration');
    document.getElementById('menu').classList.add('hidden');
    document.getElementById('login').classList.remove('hidden');
}

function updateTimeLeft() {
    const loginTime = parseInt(localStorage.getItem('loginTime'), 10);
    const duration = parseInt(localStorage.getItem('duration'), 10);
    const currentTime = new Date().getTime();
    const timeLeft = loginTime + duration - currentTime;

    if (timeLeft <= 0) {
        logout();
        alert('กรุณาเข้าสู่ระบบใหม่อีกครั้ง');
    } else {
        const minutes = Math.floor(timeLeft / 60000);
        const seconds = ((timeLeft % 60000) / 1000).toFixed(0);
        document.getElementById('time-left').innerText = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }
}

function checkSession() {
    updateTimeLeft();
    setInterval(updateTimeLeft, 1000);
}

document.addEventListener('DOMContentLoaded', () => {
    const loginTime = localStorage.getItem('loginTime');
    const duration = localStorage.getItem('duration');
    const username = localStorage.getItem('username');

    if (loginTime && duration && username) {
        const currentTime = new Date().getTime();
        if (currentTime < parseInt(loginTime, 10) + parseInt(duration, 10)) {
            document.getElementById('login').classList.add('hidden');
            document.getElementById('menu').classList.remove('hidden');
            checkSession();
        } else {
            logout();
        }
    }
});

// ฟังก์ชันจัดการเมนูย่อยและปลดล็อกเมนูลับ
let isSubmenu8Unlocked = false;

document.getElementById('submenu8-pass').addEventListener('input', function() {
    const password = this.value;
    const errorElement = document.getElementById('password-error');

    if (password.length === 6) {
        if (password === '164626') {
            document.getElementById('submenu8').classList.remove('hidden');
            document.getElementById('submenu8-password').classList.add('hidden');
            isSubmenu8Unlocked = true;
        } else {
            errorElement.classList.remove('hidden');
            setTimeout(() => {
                errorElement.classList.add('hidden');
                this.value = '';
            }, 2000);
        }
    } else if (password.length > 6) {
        errorElement.classList.remove('hidden');
        setTimeout(() => {
            errorElement.classList.add('hidden');
            this.value = '';
        }, 2000);
    }
});

function showSubMenu(submenuId) {
    document.getElementById('menu').classList.add('hidden');
    document.querySelectorAll('.sub-menu').forEach(submenu => submenu.classList.add('hidden'));

    if (submenuId === 'submenu8') {
        if (isSubmenu8Unlocked) {
            document.getElementById('submenu8').classList.remove('hidden');
        } else {
            document.getElementById('submenu8-password').classList.remove('hidden');
        }
    } else {
        document.getElementById(submenuId).classList.remove('hidden');
    }
}

function backToMenu() {
    document.querySelectorAll('.sub-menu').forEach(submenu => submenu.classList.add('hidden'));
    document.getElementById('menu').classList.remove('hidden');
}
