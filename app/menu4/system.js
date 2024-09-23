document.addEventListener('DOMContentLoaded', () => {
    const dropArea = document.getElementById('dropArea');
    const previewImage = document.getElementById('previewImage');
    const dropInstruction = document.getElementById('dropInstruction');
    const loader = document.getElementById('loader');
    const progressBar = document.getElementById('progressBar');
    const verificationForm = document.getElementById('verificationForm');
    const resultPopup = document.getElementById('resultPopup');
    const resultText = document.getElementById('resultText');
    const resultImage = document.getElementById('resultImage');
    const closeBtn = document.querySelector('.close-btn');
    const hiddenButton = document.getElementById('hiddenButton'); // ปุ่มลับ

    // ฟังก์ชั่นเพื่อประมวลผลรูปภาพที่วางหรือวางจากคลิปบอร์ด
    function processImage(file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            // แสดงภาพใน drop area
            previewImage.src = e.target.result;
            previewImage.style.display = 'block';
            dropInstruction.style.display = 'none';

            // แสดงภาพใน popup ผลลัพธ์
            resultImage.src = e.target.result;
        }
        reader.readAsDataURL(file);
    }

    // จัดการการลากและวาง
    ['dragenter', 'dragover'].forEach(eventName => {
        dropArea.addEventListener(eventName, (e) => {
            e.preventDefault();
            e.stopPropagation();
            dropArea.classList.add('hover');
        }, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, (e) => {
            e.preventDefault();
            e.stopPropagation();
            dropArea.classList.remove('hover');
        }, false);
    });

    dropArea.addEventListener('drop', (e) => {
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            const file = files[0];
            if (file.type.startsWith('image/')) {
                processImage(file);
            } else {
                alert("กรุณาวางไฟล์รูปภาพเท่านั้น");
            }
        }
    });

    // จัดการการวางจากคลิปบอร์ด
    dropArea.addEventListener('paste', (e) => {
        const items = e.clipboardData.items;
        let imageFound = false;

        for (let i = 0; i < items.length; i++) {
            if (items[i].type.startsWith('image/')) {
                imageFound = true;
                const file = items[i].getAsFile();
                processImage(file);
                break;
            }
        }

        if (!imageFound) {
            alert("ไม่มีรูปภาพในคลิปบอร์ด");
        }
    });

    // ให้ drop area สามารถโฟกัสได้เมื่อคลิก
    dropArea.addEventListener('click', () => {
        dropArea.focus();
    });

    // ฟังก์ชั่นเพื่อแสดง popup
    function showPopup(message, isPassed = false) {
        // แสดงแถบโหลดและรีเซ็ตแถบโหลด
        loader.style.display = 'flex';
        progressBar.style.width = '0%';

        // ฟังก์ชั่นสำหรับอัปเดตแถบโหลด
        let progress = 0;
        const interval = setInterval(() => {
            progress += 10;
            progressBar.style.width = `${progress}%`;
            if (progress >= 100) {
                clearInterval(interval);
                loader.style.display = 'none';

                // แสดงผลลัพธ์ใน Popup
                resultText.textContent = message;
                if (isPassed) {
                    document.querySelector('.warning').textContent = 'หมายเหตุ: ผ่านการตรวจสอบ';
                } else {
                    document.querySelector('.warning').textContent = 'หมายเหตุ: ไม่สามารถดำเนินการ AI SMART CONTRACT ไม่สามารถอ่านค่าของสลิปได้';
                }
                resultPopup.style.display = 'flex';
            }
        }, 500); // อัปเดตทุก 0.5 วินาที
    }

    // Event listener สำหรับการ submit ฟอร์ม
    verificationForm.addEventListener('submit', function(e) {
        e.preventDefault(); // ป้องกันการรีเฟรชหน้า

        // ตรวจสอบว่ามีรูปภาพถูกอัปโหลดหรือไม่
        if (previewImage.src === "") {
            alert("กรุณาวางรูปภาพก่อนทำการตรวจสอบ");
            return;
        }

        // รับค่าจากฟอร์ม
        const username = document.getElementById('username').value;
        const resultMessage = `User: ${username} `;

        // แสดง popup ด้วยข้อความเดิม
        showPopup(resultMessage);
    });

    // Event listener สำหรับปุ่มลับ
    hiddenButton.addEventListener('click', function() {
        // ตรวจสอบว่ามีรูปภาพถูกอัปโหลดหรือไม่
        if (previewImage.src === "") {
            alert("กรุณาวางรูปภาพก่อนทำการตรวจสอบ");
            return;
        }

        // รับค่าจากฟอร์ม
        const username = document.getElementById('username').value;
        const resultMessage = `User: ${username} `;

        // แสดง popup ด้วยข้อความผ่านการตรวจสอบ
        showPopup(resultMessage, true);
    });

    // ปิด Popup เมื่อคลิกปุ่มปิด
    closeBtn.addEventListener('click', () => {
        resultPopup.style.display = 'none';
    });

    // ปิด Popup เมื่อคลิกนอกเนื้อหา Popup
    window.addEventListener('click', (e) => {
        if (e.target === resultPopup) {
            resultPopup.style.display = 'none';
        }
    });
});
