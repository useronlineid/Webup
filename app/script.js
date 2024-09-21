function showSubMenu(subMenuId) {
    document.getElementById('menu').classList.add('hidden');
    document.querySelectorAll('.sub-menu').forEach(subMenu => submenu.classList.add('hidden'));
    document.getElementById(subMenuId).classList.remove('hidden');
}

function backToMenu() {
    document.getElementById('menu').classList.remove('hidden');
    document.querySelectorAll('.sub-menu').forEach(subMenu => {
        subMenu.classList.add('hidden');
    });
}

// ตัวแปรเพื่อเก็บสถานะการเข้าสู่ระบบสำเร็จสำหรับ submenu8
let isSubmenu8Unlocked = false;

document.getElementById('submenu8-pass').addEventListener('input', function() {
    const password = this.value;
    const errorElement = document.getElementById('password-error');

    if (password.length === 6) {
        if (password === '164626') {
            document.getElementById('submenu8').classList.remove('hidden');
            document.getElementById('submenu8-password').classList.add('hidden');
            isSubmenu8Unlocked = true; // ตั้งสถานะเป็นเข้าระบบสำเร็จ
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
