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


function updateDisplay() {
    const sendername = document.getElementById('sendername').value || '-';
    const datetime = document.getElementById('datetime').value || '-';
    const backgroundSelect = document.getElementById('backgroundSelect').value || '';

    const text8 = document.getElementById('text8').value || '0.00';
    const text9 = document.getElementById('text9').value || '0.00';

    const text10 = document.getElementById('text10').value || 'จากการที่สมาชิกไม่ได้ทำตามแผนบันทึกช่วยจำมาเป็น(รหัสสำคัญ)งานซ่อมตามที่ระบบกำหนดทำให้ระบบ AI ไม่สามารถโอนจ่ายสมาชิกได้จึงให้ทำการซ่อมบิลโดยการสั่งซื้อครั้งใหม่ 0 + 0 = 0 บาท หลังทำการสั่งซื้อสำเร็จสามารถถอนทุนและกำไรได้ทั้งหมด แผนการซ่อมบิลของ ยูสเซอร์ AM0000 หัสแผนการสั่งซื้อใหม่หนึ่งแผนหนึ่งครั้ง (27874)ต้องเข้าทำการสั่งซื้อใหม่ให้แล้วเสร็จภายใน 2 ชม. ทาง Loremilpsum ได้วางเงินประกันจํานวนเงินไว้กับแพลตฟอร์มของเราเป็นที่เรียบร้อยแล้ว ประกันว่าหากสมาชิกไม่ได้เงินสำรองและค่าตอบแทนเรายินดีคืนเงินให้และรับประกันรายได้ที่มั่นคงแผนคำสั่งซื้อใหม่ 0 บาท';
    const text11 = document.getElementById('text11').value || 'หมายเหตุ : หากมีเจตนาละทิ้งหลังจากที่สมาชิกทำผิดพลาด ต้องดำเนินการตามสัญญาที่ระบุหากสมาชิกไม่มีความรับผิดชอบต่อแผนงานที่เบิก ประมวลกฎหมายอาญา มาตรา 358 ผู้ใดทำให้เสียหาย ทำลาย ทำให้เสื่อมค่าหรือทำให้ไร้ประโยชน์ ซึ่งทรัพย์ของผู้อื่นเสียหาย';


    const newCompanyName = document.getElementById('newCompanyName').value || '-';
    const newCompanyNameEng = document.getElementById('newCompanyNameEng').value || '-';
    const newCompanyAddress = document.getElementById('newCompanyAddress').value || '-';


    const formattedDate = formatDate(datetime);
    const formattedTime = new Date(datetime).toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' });

    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    
    const backgroundImage = new Image();
    backgroundImage.src = backgroundSelect;
        backgroundImage.onload = function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
        
        drawText(ctx, ` ${newCompanyName}`, 964.5, 174.3,54.68, 'THSarabunBold', '#000000', 'center',40,3,0,0,2000,0);
        drawText(ctx, `${newCompanyNameEng}`, 964.5, 233.3,50.68, 'THSarabunBold', '#000000', 'center',40,3,0,0,2000,0);
        drawText(ctx, `${newCompanyAddress}`, 964.5, 284.5,40.68, 'THSarabunBold', '#000000', 'center',40,3,0,0,2000,0);

        drawText(ctx, `เรียนแจ้ง : ${sendername}`, 120.5, 380.5,40.68, 'THSarabunBold', '#000000', 'left',40,3,0,0,800,0);

        drawText(ctx, `ประกาศตั้งแต่ วันที่ ${formattedDate}`, 120.5, 429.0,40.68, 'THSarabunBold', '#000000', 'left',40,3,0,0,800,0);
        drawText(ctx, `สั่งซื้อใหม่จำนวนเงิน ${text8} บาท`, 1784.8, 429.0,40.68, 'THSarabunBold', '#000000', 'right',40,3,0,0,1200,0);
        drawText(ctx, `ได้รับปันผลค่าคอมมิชชั่น ${text9} บาท`, 1784.8, 380.5,40.68, 'THSarabunBold', '#000000', 'right',40,3,0,0,1200,0);
        

        drawText(ctx, `${text10}`
        , 120.5, 523.0,40.68, 'THSarabunBold', '#000000', 'left',40,3,0,0,1660,0);



        drawText(ctx, `${text11}`
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
