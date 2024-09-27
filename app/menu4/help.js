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

// ฟังก์ชันคำนวณจำนวนเงินช่วยเหลือและจำนวนเงินที่ต้องดำเนินการ
function calculateAmounts(amount1, Percent) {
    const percentValue = parseFloat(Percent.replace('%', '')) / 100;
    const helpAmount = amount1 * percentValue;
    const remainingAmount = amount1 - helpAmount;
    return { helpAmount, remainingAmount };
}

function updateDisplay() {
    const user1 = document.getElementById('user1').value || '-';
    const amount1 = document.getElementById('amount1').value || '-';
    const Percent = document.getElementById('Percent').value || '-';
    const sendername = document.getElementById('sendername').value || '-';
    const datetime = document.getElementById('datetime').value || '-';

    const notes = document.getElementById('notes').value || '-';
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
    const helpAmountFormatted = calculatedAmounts.helpAmount.toLocaleString('th-TH', currencyFormatOptions);
    const remainingAmountFormatted = calculatedAmounts.remainingAmount.toLocaleString('th-TH', currencyFormatOptions);
    const amount1Formatted = amount1Value.toLocaleString('th-TH', currencyFormatOptions);

    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    
    const backgroundImage = new Image();
    backgroundImage.src = '../assets/image/bs/paper2.jpg';
    backgroundImage.onload = function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);


        drawText(ctx, `เลขที่ 12659/${buddhistYear}`, 60,110.0,30,'THSarabunNew', '#000000', 'left', 40, 3, 0, 0, 800, 0);

        drawText(ctx, `${companyName}`, 452,190,30,'THSarabunNew', '#000000', 'center', 40, 3, 0, 0, 800, 0);
        drawText(ctx, `${companyNameEng}`, 452,220,30,'THSarabunNew', '#000000', 'center', 40, 3, 0, 0, 800, 0);
        drawText(ctx, `${companyAddress}`, 452,250,30, 'THSarabunNew', '#000000', 'center', 40, 3, 0, 0, 800, 0);

        drawText(ctx, `${formattedDate}`, 844,300,30, 'THSarabunNew', '#000000', 'right', 25, 3, 0, 0, 800, 0);

        drawText(ctx, `
        เรื่อง การยื่นเรื่องเข้าระบบเพื่อ${notes}
        <br>
        เรียน ${sendername}
        <br>
        ยูสเซอร์ ${user1}
        `,0,340,30,'THSarabunNew', '#000000', 'left', 35, 3, 0, 0, 800, 0);

        drawText(ctx, `
            เนื่องจากการตรวจสอบพบความผิดพลาดในระบบของสมาชิก จึงขอให้สมาชิกยื่นเรื่องเข้าระบบ จำนวนเงิน ${amount1Formatted} บาท เพื่อทำการ${notes} อย่างไรก็ตามเพื่อเป็นการช่วยเหลือสมาชิก ทางบริษัทฯ ได้จัดสรรเงินกองทุนช่วยเหลือสมาชิกจำนวน ${Percent}% หรือประมาณ ${helpAmountFormatted} บาท เพื่อให้สมาชิกได้ดำเนินการด้วยจำนวนเงินที่น้อยลง และดำเนินการให้เสร็จสิ้น
            <br>
            <br>รายละเอียดการดำเนินการ:
            <br>- จำนวนเงินที่ต้องยื่นเรื่องเข้าระบบ: ${amount1Formatted} บาท
            <br>- จำนวนเงินช่วยเหลือจากกองทุน: ${Percent}% (${helpAmountFormatted} บาท)
            <br>- จำนวนเงินที่ต้องดำเนินการ: ${remainingAmountFormatted} บาท
            <br>หมายเหตุ: ${footnote}
                      `,60,460,30,'THSarabunNew', '#000000', 'left', 35, 3, 0, 0, 800, 0);
            




drawText(ctx, `
ขอแสดงความนับถือ
<br>
<br>
<br>
(${companyName1})
<br>${companyName}
<br>ออก ณ วันที่ ${formattedDate}
`,645,1035,30,'THSarabunNew', '#000000', 'center', 35, 3, 0, 0, 810, 0);
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
