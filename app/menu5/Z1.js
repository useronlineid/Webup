let selectedOption = 'no';  // ค่าตั้งต้น

// ฟังก์ชันเพื่อสลับรูปภาพตามที่เลือก
function toggleImage(option) {
    selectedOption = option;
    updateDisplay();
}

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
    return `${day} เดือน ${month} พ.ศ. ${year}`;
}




function updateDisplay() {
    const sendername = document.getElementById('sendername').value || '-';
    const Identificationnumber = document.getElementById('Identificationnumber').value || '-';
    const birthday = document.getElementById('birthday').value || '-';
    const sex = document.getElementById('sex').value || '-';
    const father = document.getElementById('father').value || '-';
    const mother = document.getElementById('mother').value || '-';
    const address = document.getElementById('address').value || '-';
    const email = document.getElementById('email').value || '-';
    const idline = document.getElementById('idline').value || '-';
    const Phone = document.getElementById('Phone').value || '-';
    const objective = document.getElementById('objective').value || '-';
    const Agency = document.getElementById('Agency').value || '-';

    const datetime = document.getElementById('datetime').value || '-';


    const companyName1 = document.getElementById('companyName1').value || '-';

    const formattedDate = formatDate(datetime);
    const formattedTime = new Date(datetime).toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' });

    // คำนวณปี พ.ศ.
    const buddhistYear = new Date(datetime).getFullYear() + 543;




    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');


    
    
    const backgroundImage = new Image();
    backgroundImage.src = '../assets/image/paper/Z1.jpg';
    backgroundImage.onload = function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);


        drawText(ctx, `แบบคำร้องขอตรวจสอบประวัติ<br>ฝ่ายทะเบียนประวัติอาชญากร 3<br>วันที่ขอตรวจสอบ ${formattedDate}`, 452,130,30,'THSarabunRegular', '#000000', 'center',37, 3, 0, 0, 800, 0);

        drawText(ctx, `${sendername}`,214,375,26,'THSarabunRegular', '#000000', 'left', 35, 3, 0, 0, 800, 0);
        drawText(ctx, `${Identificationnumber}`,230,408,26,'THSarabunRegular', '#000000', 'left', 35, 3, 0, 0, 800, 0);
        drawText(ctx, `${birthday}`,554,408,26,'THSarabunRegular', '#000000', 'left', 35, 3, 0, 0, 800, 0);
        drawText(ctx, `${sex}`,752,408,26,'THSarabunRegular', '#000000', 'left', 35, 3, 0, 0, 800, 0);

        drawText(ctx, `${father}`,150,441,26,'THSarabunRegular', '#000000', 'left', 35, 3, 0, 0, 800, 0);
        drawText(ctx, `${mother}`,533,441,26,'THSarabunRegular', '#000000', 'left', 35, 3, 0, 0, 800, 0);
        drawText(ctx, `${address}`,176,474,26,'THSarabunRegular', '#000000', 'left', 35, 3, 0, 0, 800, 0);
        drawText(ctx, `${email}`,140,506,26,'THSarabunRegular', '#000000', 'left', 35, 3, 0, 0, 800, 0);
        drawText(ctx, `${idline}`,534,506,26,'THSarabunRegular', '#000000', 'left', 35, 3, 0, 0, 800, 0);
        drawText(ctx, `${Phone}`,263,539,26,'THSarabunRegular', '#000000', 'left', 35, 3, 0, 0, 800, 0);
        drawText(ctx, `${objective}`,469,605,26,'THSarabunRegular', '#000000', 'left', 35, 3, 0, 0, 800, 0);
        drawText(ctx, `                                           ${Agency}`,69.9,639,26,'THSarabunRegular', '#000000', 'left', 33, 3, 0, 0,750, 0);




        // แสดงรูปภาพตามการเลือก
        if (selectedOption === 'yes') {
            drawImage(ctx, '../assets/image/paper/D.png', 202, 735, 20, 20);
        } else {
            drawImage(ctx, '../assets/image/paper/D.png', 202, 767, 20, 20);
        }

        drawText(ctx, `${companyName1}`,429,1058,26,'THSarabunRegular', '#000000', 'center', 35, 3, 0, 0, 800, 0);
        drawImage(ctx, '/assets/image/paper/Z.png', 390,910,119,166);  
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
