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

function toThaiNumber(number) {
    return number.toString().replace(/\d/g, d => '๐๑๒๓๔๕๖๗๘๙'[d]);
}

function formatDate(date) {
    const months = ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
                    'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'];

    const d = new Date(date);
    const day = toThaiNumber(d.getDate());
    const month = months[d.getMonth()];
    const year = toThaiNumber(d.getFullYear() + 543);

    return `วันที่ ${day} เดือน ${month} พุทธศักราช ${year}`;
}
function updateDisplay() {
    const companyName = document.getElementById('companyName').value || '-';
    const sendername = document.getElementById('sendername').value || '-';
    const datetime = document.getElementById('datetime').value || '-';


    const formattedDate = formatDate(datetime);
    const formattedTime = new Date(datetime).toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' });

    // คำนวณปี พ.ศ. และแปลงเป็นเลขไทย
    const buddhistYear = new Date(datetime).getFullYear() + 543;
    const yearText = toThaiNumber(buddhistYear);


    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    
    const backgroundImage = new Image();
    backgroundImage.src = '../assets/image/paper/G.jpg';
    backgroundImage.onload = function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);


        drawText(ctx, `คดีหมายเลขดำที่ ผบ.๗๔๕/${yearText}<br>คดีหมายเลขแดงที่ ผบ.๗๔๙/${yearText}`, 820,230,30,'THSarabunNew', '#000000', 'right', 40, 3, 0, 0, 800, 0);

        drawText(ctx, `ในพระปรมาภิไธยพระมหากษัตริย์`, 452,325,50, 'THSarabunBold', '#000000', 'center', 25, 3, 0, 0, 800, 0);

        drawText(ctx, `${formattedDate}<br> <br>ความแพ่ง`, 452,380,30, 'THSarabunBold', '#000000', 'center', 25, 3, 0, 0, 800, 0);

        drawText(ctx, `ระหว่าง`, 160,525,33, 'THSarabunRegular', '#000000', 'left', 25, 3, 0, 0, 800, 0);

        drawText(ctx, `${companyName}`, 313,477,33, 'THSarabunRegular', '#000000', 'left', 25, 3, 0, 0, 800, 0);
        drawText(ctx, `โจทก์`, 820,477,33, 'THSarabunRegular', '#000000', 'right', 25, 3, 0, 0, 800, 0);

        drawText(ctx, `${sendername}`, 313,579,33, 'THSarabunRegular', '#000000', 'left', 25, 3, 0, 0, 800, 0);
        drawText(ctx, `จำเลย`, 820,579,33, 'THSarabunRegular', '#000000', 'right', 25, 3, 0, 0, 800, 0);

        drawText(ctx, `
                                      ตามคำพิพากษาหรือคำสั่งของศาล ให้จำเลย- ต้องรับผิดชอบต่อการที่ไม่ปฏิบัติตามข้อตกลงในการดำเนินการที่บริษัท - ได้ช่วยเหลือในการยื่นเรื่องต่าง ๆ ทั้งหมดเพื่อให้จำเลยนำเงินบัญชีตัวเองตามที่ได้ตกลงไว้ จำเลยปฏิเสธการ หาเงินตามที่กำหนด ส่งผลให้บริษัทต้องดำเนินการฟ้องร้องในศาลเพื่อขอความเป็นธรรม
ศาลพิจารณาแล้ว เห็นว่าการกระทำของจำเลยก่อให้เกิดความเสียหายแก่บริษัท อย่างมีนัยสำคัญ และจำเลยไม่ได้ดำเนินการตามที่ตกลงไว้กับโจทก์
        <br>  
        <br>               ให้ ${sendername} จำเลย
        <br>
                                      ปฎิบัติตามคำพิพากษาหรือคำสั่งที่กล่าวแล้วภายในวันนี้ วันนับแต่วันที่ได้รับคำบังคับนี้เป็นต้นไป ถ้าไม่ปฎิบัติตามคำบังคับภายในระยะเวลาหรือเงื่อนไขดังกล่าวข้างต้นจะต้องถูกยึดทรัพย์ หรือถูกจับและจำขังดังที่บัญญัติไว้ในประมวลกฎหมายวิธีพิจารณาความแพ่ง
                                      `,60,640,30,'THSarabunNew', '#000000', 'left', 40, 3, 0, 0, 800, 0);
            

        drawText(ctx, `...............................................ผู้พิพากษา
                       <br>     ( นาย นพดล มณีนาค )
                                      `,510,1140,30,'THSarabunBold', '#000000', 'left', 35, 3, 0, 0, 800, 0);
            




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
