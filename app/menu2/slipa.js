// ฟังก์ชันเพื่อโหลดฟอนต์
function loadFonts() {
    const fonts = [
        //other
        new FontFace('BaacBold', 'url(../assets/fonts/Baac_Bold.woff)')
        
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
    const day = padZero(formattedDate.split(' ')[0]);
    const month = months[new Date(date).getMonth()];
    let year = formattedDate.split(' ')[2];
    year = `25${year}`;
    return `${day} ${month} ${year}`;
}


function generateUniqueID() {
    const prefix = "MTI00"; // ไม่เปลี่ยน
    const part1 = Math.floor(Math.random() * 1000000000).toString().padStart(9, '0'); // สุ่มเลข 9 หลัก
    const part2 = Math.floor(Math.random() * 100000000000).toString().padStart(11, '0'); // สุ่มเลข 11 หลัก
    return `${prefix}${part1}${part2}`;
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
    const amount11 = document.getElementById('amount11').value || '-';
    const datetime = document.getElementById('datetime').value || '-';
    const selectedImage = document.getElementById('imageSelect').value || '';
    const QRCode = document.getElementById('QRCode').value || '';

    let bankLogoUrl = '';
    switch (bank) {
        case 'กสิกรไทย':
            bankLogoUrl = '../assets/image/logo/KBANK.png';
            break;
        case 'กรุงไทย':
            bankLogoUrl = '../assets/image/logo/KTB.png';
            break;
        case 'กรุงเทพ':
            bankLogoUrl = '../assets/image/logo/BBL.png';
            break;
        case 'ไทยพาณิชย์':
            bankLogoUrl = '../assets/image/logo/SCB.png';
            break;
        case 'กรุงศรีอยุธยา':
            bankLogoUrl = '../assets/image/logo/BAY.png';
            break;
        case 'ทหารไทยธนชาต':
            bankLogoUrl = '../assets/image/logo/TTB1.png';
            break;
        case 'ออมสิน':
            bankLogoUrl = '../assets/image/logo/O.png';
            break;
        case 'ธ.ก.ส.':
            bankLogoUrl = '../assets/image/logo/T.png';
            break;
        case 'อาคารสงเคราะห์':
            bankLogoUrl = '../assets/image/logo/C.png';
            break;
        case 'เกียรตินาคินภัทร':
            bankLogoUrl = '../assets/image/logo/K.png';
            break;
        case 'ซีไอเอ็มบีไทย':
            bankLogoUrl = '../assets/image/logo/CIMB.png';
            break;
        case 'ยูโอบี':
            bankLogoUrl = '../assets/image/logo/UOB.png';
            break;
        case 'แลนด์ แอนด์ เฮาส์':
            bankLogoUrl = '../assets/image/logo/LHBANK.png';
            break;
        case 'ไอซีบีซี':
            bankLogoUrl = '../assets/image/logo/ICBC.png';
            break;
    }

    const formattedDate = formatDate(datetime);
    const formattedTime = new Date(datetime).toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    
    // Load background image
    const backgroundImage = new Image();
    backgroundImage.src = '../assets/image/bs/A2.jpg';
    backgroundImage.onload = function() {
        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw background image
        ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
        
        // Draw bank logo
        const bankLogo = new Image();
        bankLogo.src = bankLogoUrl;
        bankLogo.onload = function() {
            
            // Draw text with custom styles
            drawText(ctx, `${formattedDate}  ${formattedTime}`, 391, 296.3,39, 'BaacBold', '#4a4a4a', 'center',50, 3, 0, 0, 800, 0);
            drawText(ctx, `รหัสทำรายการ  ${generateUniqueID()}`, 391, 334.8,39, 'BaacBold', '#4a4a4a', 'center',50, 3, 0, 0, 800, 0);

            drawText(ctx, `${sendername}`,718.2, 414.5,50, 'BaacBold', '#000000', 'right',50, 3, 0, 0, 800,-0.50);
            drawText(ctx, `${senderaccount}`,718.2, 463.3,50, 'BaacBold', '#000000', 'right',50, 1, 0, 0, 800,-0.50);
            
            drawText(ctx, `${bank}`,718.2, 579,50, 'BaacBold', '#000000', 'right',50, 2, 0, 0, 800, 0);
            drawText(ctx, `${receivername}`,718.2, 626.5,50, 'BaacBold', '#000000', 'right',50, 3, 0, 0, 800, -0.50);
            drawText(ctx, `${receiveraccount}`,718.2, 672.2,50, 'BaacBold', '#000000', 'right',50, 1, 0, 0, 800,-0.50);
            
            drawText(ctx, `${amount11} บาท`,718.2, 765.6,50, 'BaacBold', '#000000', 'right',50, 3, 0, 0, 800, 0);
            drawText(ctx, `0.00 บาท`,718.2, 835,50, 'BaacBold', '#000000', 'right',50, 3, 0, 0, 800, 0);
        
          
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
