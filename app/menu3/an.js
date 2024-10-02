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
    return `${day} ${month} ${year}`;
}

function calculateAmounts(amount1, Percent) {
    const percentValue = parseFloat(Percent.replace('%', '')) / 100;
    const additionalAmount = amount1 * percentValue;
    const totalAmount = amount1 + additionalAmount;
    return { additionalAmount, totalAmount };
}

function updateDisplay() {
    const user11 = document.getElementById('user11').value || '-';
    const amount1 = document.getElementById('amount1').value || '-';
    const Percent = document.getElementById('Percent').value || '-';
    const sendername = document.getElementById('sendername').value || '-';
    const datetime = document.getElementById('datetime').value || '-';

    const Identificationnumber = document.getElementById('Identificationnumber').value || '-';

    const company = document.getElementById('company').value || '-';
    const companyA1 = document.getElementById('companyA1').value || '-';
    const company1 = document.getElementById('company1').value || '-';

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
    backgroundImage.src = '../assets/image/paper/A-loand.jpg';
    backgroundImage.onload = function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);


        drawText(ctx, `หนังสือรับรอง`, 808.5,185,70,'THSarabunNew', '#000000', 'center', 40, 3, 0, 0, 800, 0);
        drawText(ctx, `เรื่อง : การยืนยันตัวตนเข้าระบบเพื่อแก้ไขข้อมูลธนาคาร`, 808.5,230,45,'THSarabunNew', '#000000', 'center', 40, 3, 0, 0, 800, 0);


        drawText(ctx, `ที่194/${buddhistYear}
        <br>วันที่อนุมัติ ${formattedDate}
        <br>เรียน : ${sendername}
        <br>หมายเลขบัตรประจำตัว : ${Identificationnumber}
        <br>สัญญาสินเชื่อเลขที่ CODE : ${user11}
        `,80,310,35,'THSarabunNew', '#000000', 'left', 35, 3, 0, 0, 800, 0);

        drawText(ctx, `                     เนื่องด้วยวันที่ - ทางระบบสินเชื่อไม่สามารถดำเนินการโอนวงเงินสินเชื่อ จำนวน ${amount1Formatted} บาท ไปยังบัญชีของลูกค้า คุณ${sendername}ได้ เนื่องจากลูกค้าได้ทำการกรอกเลขบัญชีเข้ามาผิด ดังนั้นระบบจึงล็อคหรืออายัดยอดเงินในระบบทั้งหมด เพื่อรอการยืนยันตัวตนและแก้ไข ขั้นตอนการยืนยันตัวเนื่องด้วยในระบบเป็นข้อมูลของ คุณ${sendername} จึงจำเป็นต้องยื่นเรื่องแก้ไขให้แล้วเสร็จและทำการถอนเงินออกทันที ดังนั้นลูกค้าจึงต้องยื่นเรื่องยืนยันตัวตนและแก้ไข เพื่อปลดล็อคอายัดวงเงินทั้งหมด
        <br> 
        <br>                     โดยที่ลูกค้าต้องใช้บัญชีที่ถูกต้องทำรายการฝากหลักทรัพย์เข้าระบบกระเป๋าตังค์ของลูกค้าเอง จำนวน ${additionalAmountFormatted} บาท เพื่อดำเนินการการยืนยัน และแก้ไขข้อมูลให้ถูกต้อง หลังจากนั้นระบบจะดำเนินการแก้ไขและปลดล็อคยอดเงินทั้งหมด ไม่เกิน 3-5 นาที ลูกค้าจะสามารถถอนยอดเงินที่ทำรายการพร้อมกับวงเงินสินเชื่อได้ทั้งหมด ${totalAmountFormatted} บาท ระบบ กระเป๋าตังค์ หรือ SMART CONTRACT คือ ระบบดำเนินการด้านการเงินอัตโนมัติทางบริษัทจึงไม่สามารถดึงวงเงินสินเชื่อกลับบัญชีหลักที่สั่งจ่ายได้
        `,173,515,35,'THSarabunNew', '#000000', 'left', 40, 3, 0, 0, 1250, 0);

        drawText(ctx, `ออกให้เมื่อวันที่ ${formattedDate}<br>${company} <br> <br> <br>( ${company1} )<br>${companyA1}`, 1230,945,35, 'THSarabunNew', '#000000', 'center', 40, 3, 0, 0, 800, 0);


        drawText(ctx, `หมายเหตุ :`, 103, 1200, 35, 'THSarabunNew', '#ff0000', 'left', 1.5, 3, 0, 0, 1250, 0);
        
        // คำนวณความกว้างของข้อความ accountName เพื่อกำหนดตำแหน่ง x สำหรับ accountNumber
        const accountNameWidth = ctx.measureText(`หมายเหตุ : `).width;

        // วาดข้อความ accountNumber ด้วยสีเขียว (#008000)
        drawText(ctx, `1.จํานวนเงินที่ทางบริษัทให้ลูกค้าดําเนินการเข้ามา ลูกค้าไม่ได้เสียเงินในส่วนนี้ ระบบจะทําการโอนเงินคืนเข้า “กระเป๋าตังค์” ในระบบให้ลูกค้าพร้อมกับวงเงินต้นที่ยื่นกู้`, 103 + accountNameWidth, 1200, 35, 'THSarabunNew', '#000000', 'left', 40, 3, 0, 0, 1250, 0);

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
