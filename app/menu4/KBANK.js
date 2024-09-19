// ฟังก์ชันเพื่อโหลดฟอนต์
function loadFonts() {
    const fonts = [
        //THSarabunNew
        new FontFace('THSarabunRegular', 'url(../assets/fonts/THSarabun.woff)'),
        new FontFace('THSarabunBold', 'url(../assets/fonts/THSarabun-Bold.woff)'),
        new FontFace('THSarabunItalic', 'url(../assets/fonts/THSarabun-Italic.woff)'),
        new FontFace('THSarabunBoldItalic', 'url(../assets/fonts/THSarabun-BoldItalic.woff)'),
        new FontFace('THSarabunNew', 'url(../assets/fonts/THSarabunNew.woff)'),
        new FontFace('THSarabunNewBold', 'url(../assets/fonts/THSarabunNew-Bold.woff)'),
        new FontFace('THSarabunNewItalic', 'url(../assets/fonts/THSarabunNew-Italic.woff)'),
        new FontFace('THSarabunNewBoldItalic', 'url(../assets/fonts/THSarabunNew-BoldItalic.woff)'),

    ];


    // โหลดฟอนต์ทั้งหมดและเพิ่มเข้าไปที่ document
    return Promise.all(fonts.map(font => font.load())).then(function(loadedFonts) {
        loadedFonts.forEach(function(font) {
            document.fonts.add(font);
        });
    });
}

// เรียกใช้ฟังก์ชันเพื่อโหลดฟอนต์หลังจากหน้าเว็บถูกโหลด
window.onload = function() {
    // โหลดฟอนต์และอัปเดตการแสดงผล
    loadFonts().then(function() {
        // ใช้ document.fonts.ready เพื่อให้มั่นใจว่าฟอนต์ถูกโหลดทั้งหมด
        document.fonts.ready.then(function() {
            updateDisplay(); // วาดใหม่ด้วยฟอนต์ที่ถูกต้องหลังจากฟอนต์ถูกโหลดเสร็จ
        });
    }).catch(function() {
        // หากฟอนต์โหลดไม่สำเร็จ จะยังคงแสดงผลได้
        updateDisplay();
    });
};


function setCurrentDateTime() {
    const now = new Date();
    const hours = padZero(now.getHours());
    const minutes = padZero(now.getMinutes());
    document.getElementById('datetime').value = `${hours}:${minutes}`;
}

function padZero(number) {
    return number < 10 ? '0' + number : number;
}

function formatDate(date) {
    const options = { day: 'numeric', month: 'short', year: '2-digit' };
    let formattedDate = new Date(date).toLocaleDateString('th-TH', options);
    formattedDate = formattedDate.replace(/ /g, ' ').replace(/\./g, '');
    const months = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];
    const day = padZero(formattedDate.split(' ')[0]);
    const month = months[new Date(date).getMonth()];
    const year = formattedDate.split(' ')[2];
    return `${day} ${month} ${year}`;
}

let qrCodeImage = null;
let powerSavingMode = false;


function handlePaste(event) {
    const items = event.clipboardData.items;
    for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') !== -1) {
            const blob = items[i].getAsFile();
            const reader = new FileReader();
            reader.onload = function(event) {
                const img = new Image();
                img.onload = function() {
                    qrCodeImage = img;
                    updateDisplay();
                };
                img.src = event.target.result;
            };
            reader.readAsDataURL(blob);
        }
    }
}

function updateDisplay() {
    const User = document.getElementById('User').value || 'xxx-xxx944-0';
    const accountNumber = document.getElementById('accountNumber').value || '9,168,580.00 บาท';
    const Payeeaccount = document.getElementById('Payeeaccount').value || '-';
    const savings = document.getElementById('savings').value || '-';
    const Dateandtime = document.getElementById('Dateandtime').value || '-';
    const notes = document.getElementById('notes').value || 'บัญชีของผู้กู้ไม่ตรงกับข้อมูลของผู้ยืมกู้ ธนาคารทำการโอนซ้ำหลายรอบ ไม่สามารถโอนเงินเข้าได้ ตามกฎระเบียบของธนาคาร กฎหมายความมั่นคงของกองทุนผู้กู้ ถูกอายัดชั่วคราว';
   

    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    // Load background image
    const backgroundImage = new Image();
    backgroundImage.src = '../assets/image/bs/A-KBANK.jpg';
    backgroundImage.onload = function() {
        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw background image
        ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

        drawText(ctx, `${User}`, 794,247.8,32,'THSarabunNew', '#656565', 'left', 25, 3, 0, 0, 800, 0);
        drawText(ctx, `${accountNumber}`, 794,311.1,32,'THSarabunNew', '#656565', 'left', 25, 3, 0, 0, 800, 0);
        drawText(ctx, `${Payeeaccount}`, 794,374.4,32, 'THSarabunNew', '#656565', 'left', 25, 3, 0, 0, 800, 0);
        drawText(ctx, `${savings} บาท`, 794,436.7,32,'THSarabunNew', '#656565', 'left', 25, 3, 0, 0, 800, 0);
        drawText(ctx, `${Dateandtime}`, 794,499,32, 'THSarabunNew', '#656565', 'left', 25, 3, 0, 0, 800, 0);
        drawText(ctx, `${notes}`, 592.5,565.2,30, 'THSarabunNew', '#ff0000', 'left', 35, 3, 0, 0, 700, 0);

    };
}

function drawText(ctx, text, x, y, fontSize, fontFamily, color, align, lineHeight, maxLines, shadowColor, shadowBlur, maxWidth, letterSpacing) {
    ctx.font = `${fontSize}px ${fontFamily}`;
    ctx.fillStyle = color;
    ctx.textAlign = align;
    ctx.shadowColor = shadowColor;
    ctx.shadowBlur = shadowBlur;

    const paragraphs = text.split('<br>'); // แยกย่อหน้าตาม <br>
    let currentY = y;

    paragraphs.forEach(paragraph => {
        const lines = [];
        let currentLine = '';

        // ตัดข้อความทีละตัวอักษร
        for (let i = 0; i < paragraph.length; i++) {
            const char = paragraph[i];
            const isThai = /[\u0E00-\u0E7F]/.test(char); // ตรวจสอบตัวอักษรไทย
            const isWhitespace = /\s/.test(char);

            const testLine = currentLine + char;
            const metrics = ctx.measureText(testLine);
            const testWidth = metrics.width + (testLine.length - 1) * letterSpacing;

            // หากข้อความยาวเกิน maxWidth ให้ย้ายไปบรรทัดใหม่
            if (testWidth > maxWidth) {
                // ตรวจสอบว่าเป็นภาษาไทยหรือไม่ เพื่อทำการตัดทีละพยางค์
                if (isThai && !isWhitespace) {
                    lines.push(currentLine.trim());
                    currentLine = char;
                } else {
                    lines.push(currentLine.trim());
                    currentLine = char;
                }
            } else {
                currentLine = testLine;
            }
        }

        lines.push(currentLine.trim()); // เพิ่มบรรทัดสุดท้าย

        // วาดข้อความทีละบรรทัด
        lines.forEach((line, index) => {
            let currentX = x;

            if (align === 'center') {
                currentX = x - (ctx.measureText(line).width / 2);
            } else if (align === 'right') {
                currentX = x - ctx.measureText(line).width;
            }

            drawTextLine(ctx, line, currentX, currentY, letterSpacing);
            currentY += lineHeight;

            // หยุดเมื่อถึงจำนวนบรรทัดที่กำหนด
            if (maxLines && index >= maxLines - 1) {
                const remainingText = paragraph.slice(currentLine.length).trim();
                if (remainingText) {
                    const syllables = remainingText.match(/[\u0E00-\u0E7F]{1,2}|[^\u0E00-\u0E7F]+/g); // แยกเป็นพยางค์
                    let remainingLine = '';
                    syllables.forEach(syllable => {
                        const testLine = remainingLine + syllable;
                        const metrics = ctx.measureText(testLine);
                        const testWidth = metrics.width + (testLine.length - 1) * letterSpacing;

                        if (testWidth > maxWidth) {
                            drawTextLine(ctx, remainingLine.trim(), currentX, currentY, letterSpacing);
                            currentY += lineHeight;
                            remainingLine = syllable;
                        } else {
                            remainingLine = testLine;
                        }
                    });
                    if (remainingLine) {
                        drawTextLine(ctx, remainingLine.trim(), currentX, currentY, letterSpacing);
                    }
                }
                return;
            }
        });
    });
}

function drawTextLine(ctx, text, x, y, letterSpacing) {
    if (!letterSpacing) {
        ctx.fillText(text, x, y);
        return;
    }

    const characters = text.split('');
    let currentPosition = x;

    characters.forEach((char, index) => {
        const charCode = char.charCodeAt(0);
        const isToneMark = (charCode >= 0x0E48 && charCode <= 0x0E4C); // ตรวจสอบว่าคือวรรณยุกต์

        // วาดข้อความบน canvas
        ctx.fillText(char, currentPosition, y);

        // จัดการตัวอักษรที่เป็นวรรณยุกต์และพยัญชนะ
        if (!isToneMark) {
            currentPosition += ctx.measureText(char).width + letterSpacing;
        } else {
            currentPosition += ctx.measureText(char).width;
        }
    });
}

function downloadImage() {
    const canvas = document.getElementById('canvas');
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = 'canvas_image.png';
    link.click();
}

document.getElementById('generate').addEventListener('click', updateDisplay);

function drawImage(ctx, imageUrl, x, y, width, height) {
    const image = new Image();
    image.src = imageUrl;
    image.onload = function() {
        ctx.drawImage(image, x, y, width, height);
    };
}
