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
    setCurrentDateTime();
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
    const formattedDate = now.toISOString().split('T')[0]; // ได้วันที่ในรูปแบบ YYYY-MM-DD
    document.getElementById('datetime').value = formattedDate;

    // ตั้งค่าเริ่มต้นสำหรับวันที่เริ่มต้น
    document.getElementById('startDate').value = formattedDate;
}

function padZero(number) {
    return number < 10 ? '0' + number : number;
}

function formatDate(date) {
    const options = { day: 'numeric', month: 'short', year: '2-digit' };
    let formattedDate = new Date(date).toLocaleDateString('th-TH', options);
    formattedDate = formattedDate.replace(/ /g, ' ').replace(/\./g, '');
    const months = ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'];
    const day = padZero(formattedDate.split(' ')[0]);
    const month = months[new Date(date).getMonth()];
    let year = formattedDate.split(' ')[2];
    year = `25${year}`;
    return `${day} ${month} ${year}`;
}

// ฟังก์ชันแปลงตัวเลขเป็นข้อความภาษาไทย
function convertNumberToThaiText(number) {
    if (isNaN(number) || number === 0) {
        return 'ศูนย์บาทถ้วน';
    }

    const numberText = ['', 'หนึ่ง', 'สอง', 'สาม', 'สี่', 'ห้า', 'หก', 'เจ็ด', 'แปด', 'เก้า'];
    const positionText = ['', 'สิบ', 'ร้อย', 'พัน', 'หมื่น', 'แสน', 'ล้าน'];

    let bahtText = '';
    let numberStr = Math.floor(number).toString();
    let len = numberStr.length;

    for (let i = 0; i < len; i++) {
        let digit = parseInt(numberStr.charAt(i));
        let position = len - i - 1;

        if (digit !== 0) {
            if (position === 1 && digit === 1) {
                bahtText += 'สิบ';
            } else if (position === 1 && digit === 2) {
                bahtText += 'ยี่สิบ';
            } else if (position !== 1 && digit === 1) {
                bahtText += 'หนึ่ง' + positionText[position];
            } else {
                bahtText += numberText[digit] + positionText[position];
            }
        } else {
            if (position === 6) {
                bahtText += positionText[position];
            }
        }
    }

    bahtText += 'บาทถ้วน';
    return bahtText;
}

// ฟังก์ชันคำนวณวันชำระโดยเพิ่มจำนวนเดือนที่ระบุ
function calculatePaymentDate(startDate, monthsToAdd) {
    let date = new Date(startDate);
    date.setMonth(date.getMonth() + monthsToAdd);
    return date;
}

function updateDisplay() {
    const newCompanyName1 = document.getElementById('newCompanyName1').value || '-';
    const newCompanyAddress1 = document.getElementById('newCompanyAddress1').value || '-';
    const newCompanyAddressA1 = document.getElementById('newCompanyAddressA1').value || '-';

    const newCompanyName2 = document.getElementById('newCompanyName2').value || '-';
    const newCompanyAddress2 = document.getElementById('newCompanyAddress2').value || '-';
    const witness1 = document.getElementById('witness1').value || '-';
    const witness2 = document.getElementById('witness2').value || '-';

    const amount1 = document.getElementById('amount1').value || '-';
    const datetime = document.getElementById('datetime').value || '-';
    const paymentMonths = parseInt(document.getElementById('paymentMonths').value) || 0;
    const text1 = document.getElementById('text1').value || '-';

    // รับวันที่เริ่มต้นจากช่อง input ใหม่
    const startDateInput = document.getElementById('startDate').value || datetime;
    const startDate = new Date(startDateInput);

    const formattedDate = formatDate(datetime);
    const formattedTime = new Date(datetime).toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' });

    // คำนวณปี พ.ศ.
    const buddhistYear = new Date(datetime).getFullYear() + 543;

        // แปลงจำนวนเงินเป็นข้อความภาษาไทย
        const amountInThaiText = convertNumberToThaiText(parseFloat(amount1));

    // คำนวณวันชำระโดยเพิ่มจำนวนเดือนที่ระบุจากวันที่เริ่มต้น
    const paymentDate = calculatePaymentDate(startDate, paymentMonths);
    const formattedPaymentDate = formatDate(paymentDate);

    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    
    const backgroundImage = new Image();
    backgroundImage.src = '../assets/image/paper/loan1.jpg';
    backgroundImage.onload = function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);


        drawText(ctx, `${newCompanyName1}`, 525,183,30,'THSarabunNew', '#000000', 'left', 40, 3, 0, 0, 350, -0.25);
        drawText(ctx, `${formattedDate}`, 525,218,30,'THSarabunNew', '#000000', 'left', 40, 3, 0, 0, 350, -0.25);
        drawText(ctx, `${newCompanyName1}`, 240,301,30,'THSarabunNew', '#000000', 'left', 40, 3, 0, 0, 400, -0.25);
        drawText(ctx, `                                                                                               ${newCompanyAddress1}`, 60,301,30,'THSarabunNew', '#000000', 'left', 36, 3, 0, 0, 770, -0.25);
        drawText(ctx, `${newCompanyName2}`, 303,374,30,'THSarabunNew', '#000000', 'left', 40, 3, 0, 0, 300, -0.25);
        drawText(ctx, `                                                                                                     ${newCompanyAddress2}`, 60,374,30,'THSarabunNew', '#000000', 'left', 36, 3, 0, 0, 780, -0.25);
        drawText(ctx, `${amount1}`, 700,497,30,'THSarabunNew', '#000000', 'center', 40, 3, 0, 0, 300, -0.25);
        drawText(ctx, `${amountInThaiText}`, 210,533,30,'THSarabunNew', '#000000', 'center', 40, 3, 0, 0, 600, -0.25);

        // เพิ่มการแสดงผลวันชำระ
        drawText(ctx, `${formattedPaymentDate}`, 135,676,30,'THSarabunNew', '#000000', 'left', 40, 3, 0, 0, 500, -0.25);
        drawText(ctx, `${text1}`, 560,713,30,'THSarabunNew', '#000000', 'left', 40, 3, 0, 0, 500, -0.25);

        drawText(ctx, `${newCompanyName2}`, 234,1014,30,'THSarabunNew', '#000000', 'center', 40, 3, 0, 0, 300, -0.25);
        drawText(ctx, `${newCompanyName1}`, 234,1051,30,'THSarabunNew', '#000000', 'center', 40, 3, 0, 0, 300, -0.25);
        drawText(ctx, `${witness1}`, 234,1086,30,'THSarabunNew', '#000000', 'center', 40, 3, 0, 0, 300, -0.25);
        drawText(ctx, `${witness2}`, 234,1122,30,'THSarabunNew', '#000000', 'center', 40, 3, 0, 0, 300, -0.25);

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
        // ใช้ Intl.Segmenter โดยไม่กำหนด locale เพื่อรองรับหลายภาษา
        const segmenter = new Intl.Segmenter(undefined, { granularity: 'word' });
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
        currentY += lineHeight;
    });
}

function drawTextLine(ctx, text, x, y, letterSpacing) {
    if (!letterSpacing) {
        ctx.fillText(text, x, y);
        return;
    }

    // ใช้ Intl.Segmenter โดยไม่กำหนด locale เพื่อรองรับหลายภาษา
    const segmenter = new Intl.Segmenter(undefined, { granularity: 'grapheme' });
    const characters = [...segmenter.segment(text)].map(segment => segment.segment);
    let currentPosition = x;

    characters.forEach((char) => {
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
