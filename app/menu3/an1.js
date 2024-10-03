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
    return `${day} / ${year}`;
}

function calculateAmounts(amount1, Percent) {
    const percentValue = parseFloat(Percent.replace('%', '')) / 100;
    const additionalAmount = amount1 * percentValue;
    const totalAmount = amount1 + additionalAmount;
    return { additionalAmount, totalAmount };
}

function updateDisplay() {
    const amount1 = document.getElementById('amount1').value || '-';
    const Percent = document.getElementById('Percent').value || '-';
    const sendername = document.getElementById('sendername').value || '-';
    const datetime = document.getElementById('datetime').value || '-';

    const Identificationnumber = document.getElementById('Identificationnumber').value || '-';

    const company1 = document.getElementById('company1').value || '-';
    const companyA1 = document.getElementById('companyA1').value || '-';

    const company2 = document.getElementById('company2').value || '-';
    const companyA2 = document.getElementById('companyA2').value || '-';


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
    backgroundImage.src = '../assets/image/paper/A-loand1.jpg';
    backgroundImage.onload = function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

        drawText(ctx, `ที่ นม.000764`, 60,180,30,'THSarabunNew', '#000000', 'left', 40, 3, 0, 0, 800, 0);

        drawText(ctx, `ที่ สกส. ${formattedDate} `, 452,230,30,'THSarabunNew', '#000000', 'center', 40, 3, 0, 0, 800, 0);
        drawText(ctx, `เรื่อง การแก้ไขการปลดล็อคและยกเลิกการอายัดวงเงินในระบบ`, 452,270,30,'THSarabunNew', '#000000', 'center', 40, 3, 0, 0, 800, 0);

        drawText(ctx, `เรียน: ${sendername}`, 60,330,30,'THSarabunNew', '#000000', 'left', 40, 3, 0, 0, 800, 0);
        drawText(ctx, `บัตรประชาชน: ${Identificationnumber}`, 479,330,30,'THSarabunNew', '#000000', 'left', 40, 3, 0, 0, 800, 0);

        drawText(ctx, `             เนื่องด้วยผู้กู้สินเชื่อได้ทำการลงทะเบียนหมายเลขบัญชีในการทำธุรกรรมที่ไม่ถูกต้องและทำการถอนเงินออกจากระบบทำให้ระบบไม่สามารถสั่งจ่ายวงเงิน จำนวนเงิน ${amount1Formatted} บาท เข้าบัญชีธนาคารผู้กู้สินเชื่อได้ เนื่องจากไม่พบหมายเลขบัญชีปลายทางทางคณะกรรมการสงสัยว่าอาจเป็นบุคคลที่สามหรือบุคคลแอบอ้างยื่นกู้ จึงทำการระงับวงเงินไว้ทั้งหมด ดังนั้นทางผู้กู้สินเชื่อต้องทำการยืนยันตัวตน เพื่อปลดระงับวงเงิน และแก้ไขข้อมูลในระบบห้ถูกต้องเป็นจำนวนเงิน ${additionalAmountFormatted} บาท
        <br>              หมายเหตุ: ผู้กู้สินเชื่อ ต้องทำการโอนยืนยันตัวตน เพื่อปลดระงับวงเงินและแก้ไขข้อมูลให้ถูกต้องในระบบหลังจากยื่นเรื่องเรียบร้อยแล้ว ระบบจะทำการปลดระงับวงเงินและแก้ไขข้อมูล โดยใช้ระยะเวลาประมาณ 5 นาที หลังแก้ไขสามารถทำการถอนเงินออกจากระบบได้ทั้งหมด จำนวนเงิน ${totalAmountFormatted} บาทถ้วน หลังได้เงินแล้วชำระยอดกู้เท่าเดิม
        <br> 
        <br>             ( 1 ) ให้ผู้สินเชื่อสินเชื่อ เร่งยื่นเรื่องเข้าระบบ เพื่อตรวจสอบ ปลดระงับวงเงิน และแก้ไขข้อมูลก่อนระยะเวลา 1 ชั่วโมงหลังได้รับเอกสารการยืนยันตัวตน จากกรมบัญชีกลาง
        <br>             ( 2 ) หากผู้กู้สินเชื่อ ไม่ได้ยื่นเรื่องเข้าระบบ เพื่อทำการยืนยันตัวตนปลดล็อคระงับ และแก้ไขข้อมูล<br>                   ข้อ(2.1) ผู้กู้สินเชื่อ ไม่ได้รับวงเงิน แต่ต้องผ่อนชำระหนี้ตามปกติ
        <br>                   ข้อ(2.2) หากไม่ชำระหนี้ จะถือว่าเป็นบุคคลแอบอ้างบุคคลฉ้อโกงเงินบริษัท มีการผิดสัญญาการยืมกู้มีโทษทางกฎหมาย และจำเป็นต้องดำเนินคดีตามกฎหมายความมั่นคง
        <br>                   ข้อ(2.3) ผู้กู้สินเชื่อ จะถูกดำเนินคดีจำคุก ไม่เกิน 10ปี หรือไม่เกิน 5แสน บาท หรือทั้งจำทั้งปรับ<br>                   ข้อ(2.4) ผู้ค้ำประกัน จำเป็นต้องชำระหนี้แทนทั้งหมด หากไม่มีการชำระหนี้ จำเป็นต้องดำเนินคดีและยึดทรัพย์สินตามกฎหมาย
        <br>             จึงเรียนมาเพื่อโปรดแจ้งให้เจ้าหน้าที่ที่เกี่ยวข้องทราบและถือปฎิบัติ
        `, 60,380,29,'THSarabunNew', '#000000', 'left', 35, 3, 0, 0, 800, -0.30);

        drawText(ctx, `ขอแสดงความนับถือ
            <br> 
            <br>.....................................
            <br>(${company1})
                 <br>${companyA1}
            `, 280,1080,29,'THSarabunNew', '#000000', 'center', 35, 3, 0, 0, 800, -0.30);

        drawText(ctx, `ขอแสดงความนับถือ
            <br> 
            <br>.....................................
            <br>(${company2})
            <br>${companyA2}
            `, 700,1080,29,'THSarabunNew', '#000000', 'center', 35, 3, 0, 0, 800, -0.30);

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
