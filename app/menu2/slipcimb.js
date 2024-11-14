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

function formatDate(date) {
    const options = { day: 'numeric', month: 'short', year: '2-digit' };
    let formattedDate = new Date(date).toLocaleDateString('th-TH', options);
    formattedDate = formattedDate.replace(/ /g, ' ').replace(/\./g, '');
    const months = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];
    const day = formattedDate.split(' ')[0];
    const month = months[new Date(date).getMonth()];

    // เพิ่ม 543 ปีให้กับปี ค.ศ. เพื่อแปลงเป็นปี พ.ศ.
    const yearCE = new Date(date).getFullYear();
    const yearBE = (yearCE + 543).toString();

    return `${day} ${month} ${yearBE}`;
}


function generateUniqueID() {
    const now = new Date(document.getElementById('datetime').value);
    
    // กำหนดค่าให้ฟอร์แมตตรงตามที่ต้องการ
    const year = (now.getFullYear() % 100).toString().padStart(2, '0'); // ปี ค.ศ. เช่น 22
    const month = (now.getMonth() + 1).toString().padStart(2, '0'); // เดือน
    const day = now.getDate().toString().padStart(2, '0'); // วัน
    const time = `${padZero(now.getHours())}${padZero(now.getMinutes())}`; // เวลาในรูปแบบ HHMM

    // ส่วนของเลขสุ่มที่เปลี่ยนทุกครั้ง
    const randomPart = Math.floor(Math.random() * 10000000000).toString().padStart(10, '0');

    // รวมค่าทั้งหมดให้เป็น ID
    return `${year}${month}${day}${time}${randomPart}`;
}

function padZero(num) {
    return num.toString().padStart(2, '0');
}

function updateDisplay() {
    const sendername = document.getElementById('sendername').value || '-';
    const senderaccount = document.getElementById('senderaccount').value || '-';
    const receivername = document.getElementById('receivername').value || '-';
    const receiveraccount = document.getElementById('receiveraccount').value || '-';
    const bank = document.getElementById('bank').value || '-';
    const amount11 = document.getElementById('amount11').value || '0.00';
    const datetime = document.getElementById('datetime').value || '-';
    const selectedImage = document.getElementById('imageSelect').value || '';
    const QRCode = document.getElementById('QRCode').value || '';

    let bankLogoUrl = '';
    switch (bank) {
        case 'ธ.กสิกรไทย':
            bankLogoUrl = '../assets/image/logo/KBANK.png';
            break;
        case 'ธ.กรุงไทย':
            bankLogoUrl = '../assets/image/logo/KTB.png';
            break;
        case 'ธ.กรุงเทพ':
            bankLogoUrl = '../assets/image/logo/BBL1.png';
            break;
        case 'ธ.ไทยพาณิชย์':
            bankLogoUrl = '../assets/image/logo/SCB1.png';
            break;
        case 'ธ.กรุงศรีอยุธยา':
            bankLogoUrl = '../assets/image/logo/BAY.png';
            break;
        case 'ธ.ทหารไทยธนชาต':
            bankLogoUrl = '../assets/image/logo/TTB1.png';
            break;
        case 'ธ.ออมสิน':
            bankLogoUrl = '../assets/image/logo/O.png';
            break;
        case 'ธ.ก.ส.':
            bankLogoUrl = '../assets/image/logo/T.png';
            break;
        case 'ธ.อาคารสงเคราะห์':
            bankLogoUrl = '../assets/image/logo/C.png';
            break;
        case 'ธ.เกียรตินาคินภัทร':
            bankLogoUrl = '../assets/image/logo/K.png';
            break;
        case 'ธ.ซีไอเอ็มบีไทย':
            bankLogoUrl = '../assets/image/logo/CIMB.png';
            break;
        case 'ธ.ยูโอบี':
            bankLogoUrl = '../assets/image/logo/UOB.png';
            break;
        case 'ธ.แลนด์ แอนด์ เฮาส์':
            bankLogoUrl = '../assets/image/logo/LHBANK.png';
            break;
        case 'ธ.ไอซีบีซี':
            bankLogoUrl = '../assets/image/logo/ICBC.png';
            break;
    }

    const formattedDate = formatDate(datetime);
    const formattedTime = new Date(datetime).toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' });

    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    
    // Load background image
    const backgroundImage = new Image();
    backgroundImage.src = '../assets/image/bs/C1.jpg';
    backgroundImage.onload = function() {
        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw background image
        ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
        
        // Draw bank logo
        const bankLogo = new Image();
        bankLogo.src = bankLogoUrl;
        bankLogo.onload = function() {
            ctx.drawImage(bankLogo, 32.5, 638,120,120); // Adjust position and size as needed
            drawImage(ctx, '../assets/image/logo/C-CIMB.png', 32.5, 412.5, 120, 120);  

            // Draw text with custom styles
            drawText(ctx, `${formattedDate} - ${formattedTime} น.`, 41.7, 345,36, 'SukhumvitSetLight', '#a0a0a0', 'left', 1.5, 3, 0, 0, 800, 0);

            drawText(ctx, `${sendername}`, 186.3, 461.0,40, 'SukhumvitSetMedium', '#0f0f0f', 'left', 1.5, 3, 0, 0, 800, 0.25);
            drawText(ctx, `${senderaccount}`, 186.3, 518.2,35, 'SukhumvitSetMedium', '#585858', 'left', 1.5, 1, 0, 0, 500, 0.25);
            
            drawText(ctx, `${receivername}`, 186.3, 687.5,40, 'SukhumvitSetMedium', '#0f0f0f', 'left', 1.5, 3, 0, 0, 800, 0);
            drawText(ctx, `${receiveraccount}`, 186.3, 744.6,35, 'SukhumvitSetMedium', '#585858', 'left', 1.5, 1, 0, 0, 500, 0.25);
           
            drawText(ctx, `฿ ${amount11}`, 881, 890,46, 'SukhumvitSetSemiBold', '#000000', 'right', 1.5, 3, 0, 0, 500, 0);

            drawText(ctx, `${generateUniqueID()}`, 41.7, 1064.4,31, 'SukhumvitSetMedium', '#6a6a6a', '6a6a6a', 1.5, 3, 0, 0, 500, 0);
            drawText(ctx, `฿ 0.00`, 41.7, 1161.5,31, 'SukhumvitSetMedium', '#6a6a6a', 'left', 1.5, 3, 0, 0, 500, 0);
            
            drawText(ctx, `${QRCode}`, 238.9, 599.0,40, 'SukhumvitSetMedium', '#4e4e4e', 'left', 1.5, 5, 0, 0, 500, 0);
        
          
            // Draw the selected image
            if (selectedImage) {
                const customImage = new Image();
                customImage.src = selectedImage;
                customImage.onload = function() {
                    ctx.drawImage(customImage, 0, 0, 842, 1200); // Adjust the position and size as needed
                }
            }
            //ถึงที่นี่
            
            
        }
    }
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
            lines.push(currentLine.trimStart()); // ตัดช่องว่างที่ขึ้นต้นบรรทัดใหม่ออก
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
