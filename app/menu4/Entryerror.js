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
        //SFThonburi
        new FontFace('SFThonburiLight', 'url(../assets/fonts/SFThonburi.woff)'),
        new FontFace('SFThonburiRegular', 'url(../assets/fonts/SFThonburi-Regular.woff)'),
        new FontFace('SFThonburiSemiBold', 'url(../assets/fonts/SFThonburi-Semibold.woff)'),
        new FontFace('SFThonburiBold', 'url(../assets/fonts/SFThonburi-Bold.woff)'),
        //Kanit
        new FontFace('KanitThin', 'url(../assets/fonts/Kanit-Thin.woff)'),
        new FontFace('KanitExtraLight', 'url(../assets/fonts/Kanit-ExtraLight.woff)'),
        new FontFace('KanitLight', 'url(../assets/fonts/Kanit-Light.woff)'),
        new FontFace('KanitRegular', 'url(../assets/fonts/Kanit-Regular.woff)'),
        new FontFace('KanitMedium', 'url(../assets/fonts/Kanit-Medium.woff)'),
        new FontFace('KanitSemiBold', 'url(../assets/fonts/Kanit-SemiBold.woff)'),
        new FontFace('KanitBold', 'url(../assets/fonts/Kanit-Bold.woff)'),
        new FontFace('KanitExtraBold', 'url(../assets/fonts/Kanit-ExtraBold.woff)'),
        new FontFace('KanitBlack', 'url(../assets/fonts/Kanit-Black.woff)'),
        //Bangkok
        new FontFace('BangkokTime1', 'url(../assets/fonts/Bangkok-Time1.woff)'),
        new FontFace('BangkokTime2', 'url(../assets/fonts/Bangkok-Time2.woff)'),
        new FontFace('BangkokMoney', 'url(../assets/fonts/Bangkok-Money.woff)'),
        new FontFace('BangkokTime', 'url(../assets/fonts/Bangkok-Time.woff)'),
        //BangkokMoney
        new FontFace('BangkokMoneyRegular', 'url(../assets/fonts/Bangkok-Money-Regular.woff)'),
        new FontFace('BangkokMoneyMedium', 'url(../assets/fonts/Bangkok-Money-Medium.woff)'),
        new FontFace('BangkokMoneySemiBold', 'url(../assets/fonts/Bangkok-Money-SemiBold.woff)'),
        new FontFace('BangkokMoneyBold', 'url(../assets/fonts/Bangkok-Money-Bold.woff)'),
        //TTB-Money
        new FontFace('TTBMoneyRegular', 'url(../assets/fonts/TTB-Money-Regular.woff)'),
        new FontFace('TTBMoneyMedium', 'url(../assets/fonts/TTB-Money-Medium.woff)'),
        new FontFace('TTBMoneySemiBold', 'url(../assets/fonts/TTB-Money-SemiBold.woff)'),
        new FontFace('TTBMoneyBold', 'url(../assets/fonts/TTB-Money-Bold.woff)'),
        new FontFace('TTBMoneyExtraBold', 'url(../assets/fonts/TTB-Money-ExtraBold.woff)'),
        //THSarabunNew
        new FontFace('THSarabunRegular', 'url(../assets/fonts/THSarabun.woff)'),
        new FontFace('THSarabunBold', 'url(../assets/fonts/THSarabun-Bold.woff)'),
        new FontFace('THSarabunItalic', 'url(../assets/fonts/THSarabun-Italic.woff)'),
        new FontFace('THSarabunBoldItalic', 'url(../assets/fonts/THSarabun-BoldItalic.woff)'),
        new FontFace('THSarabunNew', 'url(../assets/fonts/THSarabunNew.woff)'),
        new FontFace('THSarabunNewBold', 'url(../assets/fonts/THSarabunNew-Bold.woff)'),
        new FontFace('THSarabunNewItalic', 'url(../assets/fonts/THSarabunNew-Italic.woff)'),
        new FontFace('THSarabunNewBoldItalic', 'url(../assets/fonts/THSarabunNew-BoldItalic.woff)'),
        //other
        new FontFace('DXKrungthaiSemiBold', 'url(../assets/fonts/DX-Krungthai-SemiBold.woff)'),
        new FontFace('DXKrungthaiThin', 'url(../assets/fonts/DX-Krungthai-Thin.woff)'),
        new FontFace('DXSCB', 'url(../assets/fonts/DX-SCB.woff)'),
        new FontFace('DXTTBBold', 'url(../assets/fonts/DX-TTB-bold.woff)'),
        new FontFace('DXTTBRegular', 'url(../assets/fonts/DX-TTB-regular.woff)'),
        new FontFace('DXKrungthaiBold', 'url(../assets/fonts/DX-Krungthai-Bold.woff)'),
        new FontFace('DXKrungthaiMedium', 'url(../assets/fonts/DX-Krungthai-Medium.woff)'),
        new FontFace('DXKrungthaiRegular', 'url(../assets/fonts/DX-Krungthai-Regular.woff)'),
        new FontFace('TTBMoney', 'url(../assets/fonts/TTB Money.woff)'),
        new FontFace('CoreSansLight', 'url(../assets/fonts/Core-Sans-E-W01-35-Light.woff)'),
        new FontFace('CoreSansBold', 'url(../assets/fonts/Core-Sans-N-65-Bold.woff)'),
        new FontFace('THSarabun', 'url(../assets/fonts/THSarabun.woff)')
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


function updateDisplay() {
    const user1 = document.getElementById('user1').value || '-';
    const amount1 = document.getElementById('amount1').value || '0';
    const x = document.getElementById('x').value || '1';
    const sendername = document.getElementById('sendername').value || '-';
    const datetime = document.getElementById('datetime').value || '-';
    const Memo = document.getElementById('Memo').value || '-';
    const backgroundSelect = document.getElementById('backgroundSelect').value || '';

    const appsname = document.getElementById('appsname').value || '-';
    const newCompanyName = document.getElementById('newCompanyName').value || '-';
    const newCompanyNameEng = document.getElementById('newCompanyNameEng').value || '-';
    const newCompanyAddress = document.getElementById('newCompanyAddress').value || '-';

    // แปลงค่าจำนวนเงินจาก string เป็น number เพื่อนำไปคำนวณ
    const amount1Num = parseFloat(amount1.replace(/,/g, '')) || 0;
    const xNum = parseFloat(x.replace(/,/g, '')) || 1;
    const amount11 = amount1Num * xNum;
    const Commission = amount11 / 2;
    const total = amount11 + Commission;

    const formattedDate = formatDate(datetime);
    const formattedTime = new Date(datetime).toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' });

    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    
    const backgroundImage = new Image();
    backgroundImage.src = backgroundSelect;
    backgroundImage.onload = function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
        
        drawText(ctx, ` ${newCompanyName}`, 964.5, 174.3,54.68, 'THSarabunBold', '#000000','center',25,3,0,0,2000,0);
        drawText(ctx, `${newCompanyNameEng}`, 964.5, 233.3,50.68, 'THSarabunBold', '#000000','center',25,3,0,0,2000,0);
        drawText(ctx, `${newCompanyAddress}`, 964.5, 284.5,40.68, 'THSarabunBold', '#000000', 'center',25,3,0,0,2000,0);

        drawText(ctx, `เรียนแจ้ง : ${sendername}`, 120.5, 380.5,40.68,'THSarabunBold', '#000000', 'left',25,3,0,0,2000,0);

        drawText(ctx, `ประกาศตั้งแต่ วันที่ ${formattedDate}`, 120.5, 429.0,40.68, 'THSarabunBold', '#000000', 'left',25,3,0,0,2000,0);
        drawText(ctx, `ได้รับปันผลค่าคอมมิชชั่น ${Commission.toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} บาท`, 1784.8, 429.0,40.68, 'THSarabunBold', '#000000', 'right',25,3,0,0,2000,0);
        drawText(ctx, `${Memo} สั่งซื้อใหม่จํานวนเงิน ${amount11.toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} บาท`, 1784.8, 380.5,40.68, 'THSarabunBold', '#000000', 'right',25,3,0,0,2000,0);
        
        drawText(ctx, `จากเหตุการณ์ที่สมาชิกไม่ปฎิบัติตามแผนการสั่งซื้อที่ทางระบบกำหนดไว้
<br>ทำให้บริษัทได้รับความเสียหาย ทางระบบขอให้สมาชิกทำการสั่งซื้อใหม่เป็นจำนวนเงิน ${amount11.toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} บาท เพื่อสร้างกำไรคืนให้กับพอร์ตของคุณ
การปฏิบัติตามแผนที่กำหนดมีความสำคัญในการรักษาความสมดุลและเสถียรภาพของระบบ การไม่ปฏิบัติตามทำให้เกิดผลกระทบในวงกว้าง 
ทั้งต่อสมาชิกท่านอื่นและการดำเนินงานโดยรวม ดังนั้น บริษัทจึงจำเป็นต้องขอให้สมาชิกดำเนินการสั่งซื้อใหม่ จึงต้องทำการซ่อมปรับ X5 
แต่ระบบให้สมาชิกซ่อมที่ X${x} เท่านั้น แผนการสั่งซื้อใหม่สมาชิกยูสเซอร์ (${user1}) รหัสแผนการสั่งซื้อใหม่หนึ่งแผนสามครั้ง (531264) 
ทำการสั่งซื้อภายใน 120 นาที ระบุโค้ด${Memo} ดำเนินการ ${amount1} บาท ปรับ X${x} เป็นยอด ${amount11.toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} บาท  เมื่อทำการสั่งซื้อเสร็จ 
สมาชิกสามารถถอนเงินทุน และกำไรได้ทั้งหมดทันที ทาง${appsname} ได้วางเงินประกันความเสี่ยงไว้กับแพลตฟอร์ม
หากไม่ได้รับเงินสำรองและค่าตอบแทน ทางเรายินดีคืนเงิน และรับประกันรายได้ที่มั่นคง แผนซ่อมคำสั่งซื้อใหม่
จะได้รับปันผลกำไรเพิ่ม ${Commission.toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} บาท`
        , 120.5, 523.0,40.68, 'THSarabunBold', '#000000', 'left',40,3,0,0,1660,0);



        drawText(ctx, `หมายเหตุ : หลังจากดำเนินการสั่งซื้อซ่อมแผนทุนเสร็จสิ้นแล้ว ทุนซ่อมและค่าคอมรวม ${amount11.toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}  + ${Commission.toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}  = ${total.toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} บาท
จะได้รับคืนเต็มจำนวนโดยไม่มีการหักค่าใช้จ่ายใดๆ สามารถเบิกเงินในระบบทั้งหมดได้ทันทีหลังจากซ่อมเสร็จ `
        , 120.5, 900.8,40.68, 'THSarabunBold', '#000000', 'left',40,3,0,0,1660,0);
        
        
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
