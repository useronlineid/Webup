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
    const User = document.getElementById('User').value || '-';
    const accountNumber = document.getElementById('accountNumber').value || '-';
    const transactionDate = document.getElementById('transactionDate').value || '-';
    const transactionDate1 = document.getElementById('transactionDate1').value || '-';
    const time = document.getElementById('time').value || '-';
    const amount = document.getElementById('amount').value || '-';
    const Memo = document.getElementById('Memo').value || '-';
    const footnote = document.getElementById('footnote').value || '-';

    const companyName = document.getElementById('companyName').value || '-';
    const companyNameEng = document.getElementById('companyNameEng').value || '-';
    const companyAddress = document.getElementById('companyAddress').value || '-';
    const companyName1 = document.getElementById('companyName1').value || '-';
    
   

    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    // Load background image
    const backgroundImage = new Image();
    backgroundImage.src = '../assets/image/bs/paper2.jpg';
    backgroundImage.onload = function() {
        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw background image
        ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);


        drawText(ctx, `${companyName}`, 452,190,30,'THSarabunNew', '#000000', 'center', 25, 3, 0, 0, 800, 0);
        drawText(ctx, `${companyNameEng}`, 452,220,30,'THSarabunNew', '#000000', 'center', 25, 3, 0, 0, 800, 0);
        drawText(ctx, `${companyAddress}`, 452,250,30, 'THSarabunNew', '#000000', 'center', 25, 3, 0, 0, 800, 0);

        drawText(ctx, `${transactionDate}`, 844,300,30, 'THSarabunNew', '#000000', 'right', 25, 3, 0, 0, 800, 0);

        drawText(ctx, `เรื่อง: ยืนยันฐานข้อมูลธุรกรรม`, 60,350,30, 'THSarabunNew', '#000000', 'left',25, 3, 0, 0, 800, 0);

        drawText(ctx, `เรียน: ${accountNumber}`, 60,400,30, 'THSarabunNew', '#000000', 'left',25, 3, 0, 0, 800, 0);

        drawText(ctx, `ตามที่สมาชิกได้ยื่นคำร้องขอการขยายระยะเวลาในการดำเนินการ ทางผู้อนุมัติได้พิจารณาคำร้อง และเห็นชอบให้มีการขยายระยะเวลาเพิ่มเติมตามที่ระบุ เพื่อให้สมาชิกสามารถดำเนินการได้อย่างครบถ้วน และสมบูรณ์ 
        <br> 
        <br>รายละเอียดการขยายเวลา:
        <br>-ผู้ใช้งาน : ${User} 
        <br>-ชื่อ-นามสกุล : ${accountNumber}
        <br>-ยอดเงินที่ต้องดำเนินการ${Memo} : ${amount} บาท
        <br>-กำหนดเวลาใหม่ : ${transactionDate1} ก่อนเวลา ${time} น.    
        
        
            `, 60,450,30, 'THSarabunNew', '#000000', 'left', 30, 3, 0, 0, 800, 0);

        drawText(ctx, `

            
        `, 60,550,30, 'THSarabunNew', '#000000', 'left', 35, 3, 0, 0, 800, 0);


        drawText(ctx, `หมายเหตุ: ${footnote}`, 60,730,30, 'THSarabunNew', '#000000', 'left', 30, 3, 0, 0, 800, 0);

      
        drawText(ctx, `ขอแสดงความนับถือ<br> <br> <br>(${companyName1})<br>ผู้จัดการ ${companyName}<br>ออก ณ วันที่ ${transactionDate}`, 640,1037,30, 'THSarabunNew', '#000000', 'center', 35, 3, 0, 0, 490, 0);

    
        if (qrCodeImage) {
            ctx.drawImage(qrCodeImage, 0, 130.3, 555, 951); // Adjust position and size as needed
        }


        // Draw battery
        drawBattery(ctx, batteryLevel, powerSavingMode);
    };
}

function drawText(ctx, text, x, y, fontSize, fontFamily, color, align, lineHeight, maxLines, shadowColor, shadowBlur, maxWidth, letterSpacing) {
    ctx.font = `${fontSize}px ${fontFamily}`;
    ctx.fillStyle = color;
    ctx.textAlign = 'left';
    ctx.shadowColor = shadowColor;
    ctx.shadowBlur = shadowBlur;

    // แยกข้อความตาม <br>
    const paragraphs = text.split('<br>');
    let currentY = y;

    paragraphs.forEach(paragraph => {
        // ใช้ Intl.Segmenter เพื่อแบ่งคำภาษาไทย
        const segmenter = new Intl.Segmenter('th', { granularity: 'word' });
        const words = [...segmenter.segment(paragraph)].map(segment => segment.segment);

        let lines = [];
        let currentLine = '';

        words.forEach((word) => {
            const testLine = currentLine + word;
            const metrics = ctx.measureText(testLine);
            const testWidth = metrics.width + (testLine.length - 1) * letterSpacing;

            if (testWidth > maxWidth && currentLine !== '') {
                lines.push(currentLine);
                currentLine = word;
            } else {
                currentLine = testLine;
            }
        });
        if (currentLine) {
            lines.push(currentLine);
        }

        lines.forEach((line, index) => {
            let currentX = x;

            if (align === 'center') {
                currentX = x - (ctx.measureText(line).width / 2) - ((line.length - 1) * letterSpacing) / 2;
            } else if (align === 'right') {
                currentX = x - ctx.measureText(line).width - ((line.length - 1) * letterSpacing);
            }

            drawTextLine(ctx, line, currentX, currentY, letterSpacing);
            currentY += lineHeight;
            if (maxLines && index >= maxLines - 1) {
                return;
            }
        });

        // เพิ่มระยะห่างหลังจากขึ้นบรรทัดใหม่ด้วย <br>
        currentY + lineHeight;
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
        ctx.fillText(char, currentPosition, y);
        const charWidth = ctx.measureText(char).width;
        currentPosition += charWidth + letterSpacing;
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
