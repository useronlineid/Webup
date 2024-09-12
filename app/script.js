// ข้อมูลผู้ใช้และการกำหนด session
const users = {
    max168: { password: '123456', duration: 60 * 480 * 1000, maxSessions: 10 },  // 8 ชั่วโมง
    luck001: { password: '123456', duration: 60 * 60 * 1000, maxSessions: 1 },   // 1 ชั่วโมง
    pass899: { password: '899899', duration: 60 * 480 * 1000, maxSessions: 1 },   // 8 ชั่วโมง
    admin168: { password: '123456', duration: 60 * 480 * 1000, maxSessions: 10 }, // 8 ชั่วโมง
    god168: { password: '123456', duration: 60 * 480 * 1000, maxSessions: 10 },   // 8 ชั่วโมง
    eqxjdg: { password: 'eqxjdg1999', duration: 60 * 480 * 1000, maxSessions: 10 }, // 8 ชั่วโมง
    admin99: { password: '123456', duration: 60 * 480 * 1000, maxSessions: 10 },  // 8 ชั่วโมง
    dx: { password: '164626', duration: 60 * 2880 * 1000, maxSessions: 10 }       // ไม่จำกัดเวลา
};

// ฟังก์ชันล็อกอิน
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (users[username] && users[username].password === password) {
        const sessions = JSON.parse(localStorage.getItem('sessions')) || {};
        const currentTime = new Date().getTime();

        // ลบ session ที่หมดอายุแล้ว
        Object.keys(sessions).forEach(user => {
            sessions[user] = sessions[user].filter(session => session + users[user].duration > currentTime);
        });

        // ตรวจสอบจำนวน session สูงสุด
        if (sessions[username] && sessions[username].length >= users[username].maxSessions) {
            alert(`ยูสเซอร์ ${username} มีการเข้าสู่ระบบเต็มจำนวนแล้ว`);
            return;
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
        updateTimeLeft();  // อัปเดตเวลา
        checkSession();    // ตรวจสอบ session
    } else {
        alert('รหัสผ่านไม่ถูกต้อง');
    }
}

// ฟังก์ชันแสดงเมนูย่อย
function showSubMenu(subMenuId) {
    checkLogin();  // ตรวจสอบการล็อกอินก่อนเข้าถึงเมนูย่อย

    document.getElementById('menu').classList.add('hidden');
    document.querySelectorAll('.sub-menu').forEach(subMenu => subMenu.classList.add('hidden'));

    if (subMenuId === 'submenu8') {
        if (isSubmenu8Unlocked) {
            document.getElementById('submenu8').classList.remove('hidden');
        } else {
            document.getElementById('submenu8-password').classList.remove('hidden');
        }
    } else {
        document.getElementById(subMenuId).classList.remove('hidden');
    }
}

// ฟังก์ชันกลับไปที่เมนูหลัก
function backToMenu() {
    document.querySelectorAll('.sub-menu').forEach(subMenu => subMenu.classList.add('hidden'));
    document.getElementById('menu').classList.remove('hidden');
}

// ฟังก์ชันล็อกเอาท์
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
    document.querySelectorAll('.sub-menu').forEach(subMenu => subMenu.classList.add('hidden'));
    document.getElementById('login').classList.remove('hidden');
}

// ฟังก์ชันอัปเดตเวลาที่เหลือในการใช้งาน
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

// ฟังก์ชันตรวจสอบ session ทุกๆ วินาที
function checkSession() {
    updateTimeLeft();
    setInterval(updateTimeLeft, 1000);
}

// ฟังก์ชันตรวจสอบการล็อกอิน
function checkLogin() {
    const username = localStorage.getItem('username');
    const loginTime = localStorage.getItem('loginTime');
    const duration = localStorage.getItem('duration');

    if (!username || !loginTime || !duration) {
        // ถ้าไม่ได้ล็อกอินให้รีไดเรคกลับไปที่หน้าล็อกอิน
        alert('กรุณาล็อกอินก่อนเข้าถึงเมนู');
        document.querySelectorAll('.sub-menu').forEach(subMenu => subMenu.classList.add('hidden'));
        document.getElementById('menu').classList.add('hidden');
        document.getElementById('login').classList.remove('hidden');
    } else {
        // ถ้าเข้าสู่ระบบแล้วให้ตรวจสอบ session
        updateTimeLeft();
        checkSession();
    }
}

// ฟังก์ชันสำหรับเมนูย่อยที่ต้องใส่รหัสผ่าน
let isSubmenu8Unlocked = false;
document.getElementById('submenu8-pass').addEventListener('input', function() {
    const password = this.value;
    const errorElement = document.getElementById('password-error');

    if (password.length === 6) {
        if (password === '164626') {
            document.getElementById('submenu8').classList.remove('hidden');
            document.getElementById('submenu8-password').classList.add('hidden');
            isSubmenu8Unlocked = true;  // ตั้งสถานะการปลดล็อกเมนูสำเร็จ
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

// ตรวจสอบสถานะล็อกอินเมื่อโหลดหน้า
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
