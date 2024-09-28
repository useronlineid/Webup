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


function updateDisplay() {
    const user1 = document.getElementById('user1').value || '-';
    const amount1 = document.getElementById('amount1').value || '-';
    const amount2 = document.getElementById('amount2').value || '-';
    const amount3 = document.getElementById('amount3').value || '-';
    const sendername = document.getElementById('sendername').value || '-';
    const datetime = document.getElementById('datetime').value || '-';

    const companyName = document.getElementById('companyName').value || '-';
    const companyNameEng = document.getElementById('companyNameEng').value || '-';
    const companyAddress = document.getElementById('companyAddress').value || '-';
    const companyName1 = document.getElementById('companyName1').value || '-';

    const formattedDate = formatDate(datetime);
    const formattedTime = new Date(datetime).toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' });

    // คำนวณปี พ.ศ.
    const buddhistYear = new Date(datetime).getFullYear() + 543;

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
        เรื่อง ยืนยันฐานข้อมูลธุรกรรม
        <br>
        เรียน ${sendername}
        <br>
        ยูสเซอร์ ${user1}
        `,0,340,30,'THSarabunNew', '#000000', 'left', 35, 3, 0, 0, 800, 0);

        drawText(ctx, `
              เนื่องด้วยเมื่อวันที่ ${formattedDate} ระบบไม่สามารถดำเนินการสั่งจ่ายยอด วงเงินทั้งสิ้น ${amount1} บาท ไปยังหมายเลขธุรกรรมปลายทางได้
            `,60,460,30,'THSarabunNew', '#000000', 'left', 35, 3, 0, 0, 800, 0);


            drawText(ctx, `
              เนื่องจากกรอกหมายเลขธุรกรรมผิดพลาด ยื่นคําร้องโดยเอกสารรูปธรรมและเอกสารอิเล็กทรอนิกส์ระบบ ไม่รับรอง จึงจําเป็นที่จะต้องดําเนินการยืนยันบัญชีส่งฐานข้อมูลด้วยยอดวงเงินที่ระบบร้องเรียน ${amount2} บาท บุคคลที่สองไม่สามารถยืนยันแทนได้นั้นหมายความว่าทางบริษัทไม่สามารถ สํารองจ่ายในส่วนนี้ได้ ทั้งส่วนกลางสามารถ ทําการแก้ไขข้อมูลบุคคลในระบบให้ได้ก็ ต่อเมื่อได้รับการยืนยันข้อมูลธุรกรรมภายใต้ ${sendername} ยอดเงินที่สามารถทํารายการในระบบได้อยู่ที่ ${amount3} บาท
        <br>               ผลเสียที่จะได้รับหากไม่มีการดําเนินการยืนยันตัวตนภายใต้ชื่อยอดวงเงินทั้งหมด
        <br>                  1. ไม่ได้รับวงเงินแต่ต้องชำระเงิน 50000 บาท และเงินถูกตัดยอดเป็นศูนย์
        <br>                  2. หากไม่ยอมรับผลเสียถือว่าสมาชิกมีเจตนาฉ้อโกงบริษัท
        <br>                  3. ว่าด้วยกฎหมายมาตรา10ผู้ใดกระทําด้วยประการโดยมิชอบเพื่อให้การทางานของระบบ
คอมพิวเตอร์ของผู้อื่นถูกระงับ ชะลอ ขัดขวาง หรือรบกวนจนไม่สามารถทํางานปกติได้ ต้อง ระวางโทษจําคุกไม่เกิน 5 ปี หรือปรับไม่เกิน 100,000 บาท หรือทั้งจําทั้งปรับหมายเหตุ : โปรดยืนยันบัญชีส่งฐานข้อมูลตามยอดที่ระบบกําหนดภายใน 2 ชั่วโมง มิเช่นนั้นจะเสี่ยงต่อการระงับถาวร
       
              `,60,540,30,'THSarabunNew', '#000000', 'left', 35, 3, 0, 0, 800, 0);



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
