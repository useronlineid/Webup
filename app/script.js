const users = {
    max168: { password: '123456', duration: 60 * 480 * 1000, maxSessions: 1 },  // 8 ชั่วโมง
    luck001: { password: '123456', duration: 60 * 60 * 1000, maxSessions: 1 },   // 1 ชั่วโมง
    pass899: { password: '899899', duration: 60 * 480 * 1000, maxSessions: 1 },  // 8 ชั่วโมง
    admin168: { password: '123456', duration: 60 * 480 * 1000, maxSessions: 1 }, // 8 ชั่วโมง
    god168: { password: '123456', duration: 60 * 480 * 1000, maxSessions: 1 },   // 8 ชั่วโมง
    eqxjdg: { password: 'eqxjdg1999', duration: 60 * 480 * 1000, maxSessions: 1 }, // 8 ชั่วโมง
    admin99: { password: '123456', duration: 60 * 480 * 1000, maxSessions: 1 },  // 8 ชั่วโมง
    dx: { password: '164626', duration: 60 * 2880 * 1000, maxSessions: 1 }       // ไม่จำกัดเวลา
};

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (users[username] && users[username].password === password) {
        let sessions = JSON.parse(localStorage.getItem('sessions')) || {};
        const currentTime = new Date().getTime();

        // ลบ session ที่หมดอายุ
        Object.keys(sessions).forEach(user => {
            sessions[user] = sessions[user].filter(session => session + users[user].duration > currentTime);
        });

        // ตรวจสอบว่ามี session อยู่แล้วหรือไม่ ถ้ามีจะลบ session เก่าทันที
        if (sessions[username] && sessions[username].length >= users[username].maxSessions) {
            alert(`ยูสเซอร์ ${username} มีการเข้าสู่ระบบอยู่แล้ว กำลังเด้งออกจากระบบ`);
            sessions[username] = []; // ลบ session เดิมทั้งหมดเพื่อให้เข้าสู่ระบบใหม่ได้
        }
        
        const loginTime = new Date().getTime();
        const duration = users[username].duration;

        // เพิ่ม session ใหม่
        if (!sessions[username]) sessions[username] = [];
        sessions[username].push(loginTime);

        localStorage.setItem('sessions', JSON.stringify(sessions));
        localStorage.setItem('loginTime', loginTime);
        localStorage.setItem('username', username);
        localStorage.setItem('duration', duration);
        document.getElementById('login').classList.add('hidden');
        document.getElementById('menu').classList.remove('hidden');
        updateTimeLeft(); // แสดงเวลาที่เหลือ
        checkSession(); // ตรวจสอบสถานะ session
    } else {
        alert('รหัสผ่านไม่ถูกต้อง');
    }
}

function updateTimeLeft() {
    const loginTime = parseInt(localStorage.getItem('loginTime'), 10);
    const duration = parseInt(localStorage.getItem('duration'), 10);
    const currentTime = new Date().getTime();
    const timeLeft = loginTime + duration - currentTime;

    if (timeLeft <= 0) {
        logout();
        alert('เวลาหมดแล้ว กรุณาเข้าสู่ระบบใหม่');
    } else {
        const minutes = Math.floor(timeLeft / 60000);
        const seconds = ((timeLeft % 60000) / 1000).toFixed(0);
        document.getElementById('time-left').innerText = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }
}

function checkSession() {
    updateTimeLeft();
    setInterval(updateTimeLeft, 1000); // อัปเดตเวลาทุกๆ 1 วินาที
}

function logout() {
    const username = localStorage.getItem('username');
    const loginTime = parseInt(localStorage.getItem('loginTime'), 10);

    const sessions = JSON.parse(localStorage.getItem('sessions')) || {};
    sessions[username] = sessions[username].filter(session => session !== loginTime);

    localStorage.setItem('sessions', JSON.stringify(sessions));
    localStorage.removeItem('loginTime');
    localStorage.removeItem('username');
    localStorage.removeItem('duration');
    document.getElementById('menu').classList.add('hidden');
    document.querySelectorAll('.sub-menu').forEach(subMenu => {
        subMenu.classList.add('hidden');
    });
    document.getElementById('login').classList.remove('hidden');
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
