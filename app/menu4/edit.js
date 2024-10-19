// ฟังก์ชันเพื่อโหลดฟอนต์
function loadFonts() {
    const fonts = [
        //SukhumvitSet
        new FontFace('SukhumvitSetThin', 'url(../assets/fonts/SukhumvitSet-Thin.woff)'),
        new FontFace('SukhumvitSetText', 'url(../assets/fonts/SukhumvitSet-Text.woff)'),
        new FontFace('SukhumvitSetLight', 'url(../assets/fonts/SukhumvitSet-Light.woff)'),
        new FontFace('SukhumvitSetMedium', 'url(../assets/fonts/SukhumvitSet-Medium.woff)'),
        new FontFace('SukhumvitSetSemiBold', 'url(../assets/fonts/SukhumvitSet-SemiBold.woff)'),
        new FontFace('SukhumvitSetBold', 'url(../assets/fonts/SukhumvitSet-Bold.woff)'),
        new FontFace('SukhumvitSetExtraBold', 'url(../assets/fonts/SukhumvitSet-Extra%20Bold.woff)'),
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
    const localDateTime = now.toLocaleString('sv-SE', { timeZone: 'Asia/Bangkok', hour12: false });
    const formattedDateTime = localDateTime.replace(' ', 'T');
    document.getElementById('datetime').value = formattedDateTime;
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

function calculateAmounts(amount1, Percent) {
    const percentValue = parseFloat(Percent.replace('%', '')) / 100;
    const additionalAmount = amount1 * percentValue;
    const totalAmount = amount1 + additionalAmount;
    return { additionalAmount, totalAmount };
}

function updateDisplay() {
    const user1 = document.getElementById('user1').value || '-';
    const amount1 = document.getElementById('amount1').value || '-';
    const Percent = document.getElementById('Percent').value || '0';
    const Percent1 = document.getElementById('Percent1').value || '0';
    const sendername = document.getElementById('sendername').value || '-';
    const datetime = document.getElementById('datetime').value || '-';
    const footnote = document.getElementById('footnote').value || '-';

    const companyName = document.getElementById('companyName').value || '-';
    const companyNameEng = document.getElementById('companyNameEng').value || '-';
    const companyAddress = document.getElementById('companyAddress').value || '-';
    const companyName1 = document.getElementById('companyName1').value || '-';

    const formattedDate = formatDate(datetime);
    const formattedTime = new Date(datetime).toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' });

    // คำนวณปี พ.ศ.
    const buddhistYear = new Date(datetime).getFullYear() + 543;

    // แปลงค่า amount1 และ Percent เป็นตัวเลข
    const amount1Value = parseFloat(amount1.toString().replace(/,/g, ''));
    const calculatedAmounts = calculateAmounts(amount1Value, Percent);

    // ฟอร์แมตจำนวนเงินเป็นสกุลเงินไทย และจำกัดเศษสตางค์ไม่เกิน 2 หลัก
    const currencyFormatOptions = { minimumFractionDigits: 2, maximumFractionDigits: 2 };
    const additionalAmountFormatted = calculatedAmounts.additionalAmount.toLocaleString('th-TH', currencyFormatOptions);
    const totalAmountFormatted = calculatedAmounts.totalAmount.toLocaleString('th-TH', currencyFormatOptions);
    const amount1Formatted = amount1Value.toLocaleString('th-TH', currencyFormatOptions);


    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    
    const backgroundImage = new Image();
    backgroundImage.src = '../assets/image/bs/paper3.jpg';
    backgroundImage.onload = function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);


        drawText(ctx, `เลขที่ 13685/${buddhistYear}`, 60,110.0,30,'THSarabunNew', '#000000', 'left', 40, 3, 0, 0, 800, 0);

        drawText(ctx, `${companyName}`, 452,190,30,'THSarabunNew', '#000000', 'center', 40, 3, 0, 0, 800, 0);
        drawText(ctx, `${companyNameEng}`, 452,220,30,'THSarabunNew', '#000000', 'center', 40, 3, 0, 0, 800, 0);
        drawText(ctx, `${companyAddress}`, 452,250,30, 'THSarabunNew', '#000000', 'center', 40, 3, 0, 0, 800, 0);

        drawText(ctx, `เรียน ${sendername}<br>เอกสารรูปธรรมการกู้คืนยอดเงิน`,60,320,32,'THSarabunNewBold', '#000000', 'left', 45, 3, 0, 0, 800, 0);
        drawText(ctx, `${formattedDate}<br>ยูสเซอร์ ${user1}`,840,320,32,'THSarabunNewBold', '#000000', 'right', 45, 3, 0, 0, 800, 0);

        drawText(ctx, `            ณ วันที่ ${formattedDate} สมาชิกยูสเซอร์ ${user1}, ได้ทำการเบิกถอนยอดเงินผิด ซึ่งไม่ได้เบิกถอนตามที่ระบบแจ้งทำให้ยอดเงินที่เบิกถอนไปนั้นเสียทั้งหมด
            `,60,450,30,'THSarabunNew', '#000000', 'left', 35, 3, 0, 0, 800, -0.25);

            drawText(ctx, `หมายเหตุ :`, 60,530,30, 'THSarabunNew', '#dd0000', 'left',35, 3, 0, 0, 800,  -0.25);
            drawText(ctx, `               ${footnote}<br> 
            <br>ฝ่ายส่วนกลางจําเป็นต้องให้สมาชิกทำรายการแก้ไขระบบเพื่อปลดล็อคในส่วนของแพลตฟอร์ม เพื่อให้แพลตฟอร์มกู้คืนยอดเงินที่สมาชิกถอนผิดไปให้กลับคืนมา แล้วจะถอนใหม่อีกครั้ง สมาชิกยูสเซอร์ ${user1} ทำรายการถอนยอดเงินผิดทั้งหมด ${amount1Formatted} บาท ระบบแจ้งให้สมาชิกแก้ไขระบบ ${Percent}% ของยอดเงินที่เบิกถอนผิดไป นั้นคือยอดทำรายการ ${additionalAmountFormatted} บาท และทำรายการอีกครั้งที่ยอด ${Percent1}% ฝากยอดเข้าสู่แพลตฟอร์ม หลังจากดำเนินกู้คืนหลักทรัพย์เสร็จสิ้นแล้วสมาชิกจะสามารถเบิกถอนยอดเงินได้ใหม่อีกครั้ง`, 60,530,30, 'THSarabunNew', '#000000', 'left',35, 3, 0, 0, 800,  -0.25);

            drawText(ctx, `(`, 60, 850, 30, 'THSarabunNew', '#dd0000', 'left', 40, 3, 0, 0, 1250, 0);
            const text1Width = ctx.measureText(`(`).width;
            drawText(ctx, `การถอนในครั้งนี้จะถอนทั้งหมดทีเดียวไม่ต้องแบ่งยอดถอนและจำกัดเวลาในการเบิกถอน`, 60 + text1Width +10 , 850, 30, 'THSarabunNew', '#000000', 'left', 40, 3, 0, 0, 1250, 0);
            const text2Width = ctx.measureText(`การถอนในครั้งนี้จะถอนทั้งหมดทีเดียวไม่ต้องแบ่งยอดถอนและจำกัดเวลาในการเบิกถอน`).width;
            drawText(ctx, `)`, 60 + text2Width +25, 850, 30, 'THSarabunNew', '#dd0000', 'left', 40, 3, 0, 0, 1250, 0);


            drawText(ctx, `ขั้นตอนที่ 1 สมาชิกต้องทำรายการฝากยอดเงิน ${Percent}% ตามที่ระบบแจ้งให้ถูกต้องและครบถ้วน<br>หลังจากทำรายการเข้ามาเสร็จแล้วให้รอระบบแพลตฟอร์มกู้คืนยอดเงินที่เบิกถอนผิดไปให้กลับคืนมา<br>หลังจากยอดเงินกลับเข้ามาทั้งหมดแล้ว แก้ไขเสร็จตามที่ระบบแจ้งแล้ว จะถอนได้ทันที
            `,100,900,30,'THSarabunNew', '#000000', 'left', 35, 3, 0, 0, 800, -0.25);

             drawText(ctx, `ขอแสดงความนับถือ<br> <br> <br>(${companyName1})<br>ผู้จัดการ ${companyName}<br>ออก ณ วันที่ ${formattedDate}`, 640,1037,30, 'THSarabunNew', '#000000', 'center', 35, 3, 0, 0, 490, 0);

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

    const segmenter = new Intl.Segmenter('th', { granularity: 'grapheme' });
    const characters = [...segmenter.segment(text)].map(segment => segment.segment);
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
