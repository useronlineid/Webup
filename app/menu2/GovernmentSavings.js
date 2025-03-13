// ฟังก์ชันเพื่อโหลดฟอนต์
function loadFonts() {
    const fonts = [
        //SFThonburi
        new FontFace('SFThonburiLight', 'url(../assets/fonts/SFThonburi.woff)'),
        new FontFace('SFThonburiRegular', 'url(../assets/fonts/SFThonburi-Regular.woff)'),
        new FontFace('SFThonburiSemiBold', 'url(../assets/fonts/SFThonburi-Semibold.woff)'),
        new FontFace('SFThonburiBold', 'url(../assets/fonts/SFThonburi-Bold.woff)'),
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
    let year = formattedDate.split(' ')[2];
    year = `25${year}`;
    return `${day} ${month} ${year}`;
}

function generateUniqueID() {
    const fixedPart1 = "428"; // คงที่ไม่เปลี่ยน
    const fixedPart2 = "I0000"; // คงที่ไม่เปลี่ยน
    const fixedPart3 = "B9790"; // คงที่ไม่เปลี่ยน

    // สุ่มส่วนที่ 118817029 (9 หลัก)
    const randomPart1 = Math.floor(Math.random() * 1000000000).toString().padStart(9, '0');

    // สุ่มเลขระหว่าง 1 ถึง 30 สำหรับ "24"
    const randomPart2 = Math.floor(Math.random() * 30) + 1;

    // ประกอบ ID ที่ต้องการ
    return `${fixedPart1}${randomPart1}${fixedPart2}${randomPart2.toString().padStart(2, '0')}${fixedPart3}`;
}

// เรียกใช้ฟังก์ชันและแสดงผล
console.log(generateUniqueID());



function padZero(num) {
    return num.toString().padStart(2, '0');
}

function handlePaste(event) {
    const items = event.clipboardData.items;
    for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') !== -1) {
            const blob = items[i].getAsFile();
            const reader = new FileReader();
            reader.onload = function(event) {
                const img = new Image();
                img.onload = function() {
                    qrCodeImage = img;
                    updateDisplay();
                };
                img.src = event.target.result;
            };
            reader.readAsDataURL(blob);
        }
    }
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
        case 'ธนาคารกสิกรไทย':
            bankLogoUrl = '../assets/image/logo/KBANK.png';
            break;
        case 'ธนาคารกรุงไทย':
            bankLogoUrl = '../assets/image/logo/KTB.png';
            break;
        case 'ธนาคารกรุงเทพ':
            bankLogoUrl = '../assets/image/logo/BBL.png';
            break;
        case 'ธนาคารไทยพาณิชย์':
            bankLogoUrl = '../assets/image/logo/SCB.png';
            break;
        case 'ธนาคารกรุงศรีอยุธยา':
            bankLogoUrl = '../assets/image/logo/BAY.png';
            break;
        case 'ธนาคารทหารไทยธนชาต':
            bankLogoUrl = '../assets/image/logo/TTB1.png';
            break;
        case 'ธนาคารออมสิน':
            bankLogoUrl = '../assets/image/logo/O3.png';
            break;
        case 'ธ.ก.ส.':
            bankLogoUrl = '../assets/image/logo/T.png';
            break;
        case 'ธนาคารอาคารสงเคราะห์':
            bankLogoUrl = '../assets/image/logo/C.png';
            break;
        case 'ธนาคารเกียรตินาคินภัทร':
            bankLogoUrl = '../assets/image/logo/K.png';
            break;
        case 'ธนาคารซีไอเอ็มบีไทย':
            bankLogoUrl = '../assets/image/logo/CIMB.png';
            break;
        case 'ธนาคารยูโอบี':
            bankLogoUrl = '../assets/image/logo/UOB3.png';
            break;
        case 'ธนาคารแลนด์ แอนด์ เฮาส์':
            bankLogoUrl = '../assets/image/logo/LHBANK.png';
            break;
        case 'ธนาคารไอซีบีซี':
            bankLogoUrl = '../assets/image/logo/ICBC.png';
            break;
        case 'เติมเงินพร้อมเพย์':
            bankLogoUrl = '../assets/image/logo/P-savings.png';
            break;
    }
    
    

    const formattedDate = formatDate(datetime);
    const formattedTime = new Date(datetime).toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' });

    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    
    // Load background image
    const backgroundImage = new Image();
    backgroundImage.src = '../assets/image/bs/O1.jpg?raw=true';
    backgroundImage.onload = function() {
        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw background image
        ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
        
        // Draw bank logo
        const bankLogo = new Image();
        bankLogo.src = bankLogoUrl;
        bankLogo.onload = function() {
            ctx.drawImage(bankLogo, 71, 601, 78, 78); // Adjust position and size as needed
            
            drawText(ctx, `${amount11}`, 308.5, 225.1,45, 'SFThonburiBold', '#000000', 'center', 1.5, 3, 0, 0, 500, 0);

            drawText(ctx, `0.00 ค่าธรรมเนียม`, 308.5, 262.7,21, 'SFThonburiBold', '#979797', 'center', 1.5, 3, 0, 0, 500, 0);
            drawText(ctx, `รหัสอ้างอิง: ${generateUniqueID()}`, 308.5, 290.3,21, 'SFThonburiRegular', '#979797', 'center', 1.5, 3, 0, 0, 500, -0.7);

            // Draw text with custom styles
            drawText(ctx, `${formattedDate}    ${formattedTime}`, 308.5, 323.4,21, 'SFThonburiBold', '#000000', 'center', 1.5, 3, 0, 0, 500, 0);

            drawText(ctx, `${sendername}`, 163.4, 446.5, 33,'SFThonburiBold', '#000000', 'left', 1.5, 3, 0, 0, 500, -0.50);
            drawText(ctx, `ธนาคารออมสิน`, 163.4, 482.8,25, 'SFThonburiRegular', '#525252', 'left', 1.5, 2, 0, 0, 500, 0);
            drawText(ctx, `${senderaccount}`, 163.4, 512.7, 25,'SFThonburiRegular', '#525252', 'left', 1.5, 1, 0, 0, 500,-1);
            
            drawText(ctx, `${receivername}`,163.4, 637.7,33, 'SFThonburiBold', '#000000', 'left', 1.5, 3, 0, 0, 500, -0.50);
            drawText(ctx, `${bank}`, 163.4, 674.2,25, 'SFThonburiRegular', '#525252', 'left', 1.5, 2, 0, 0, 500, 0);
            drawText(ctx, `${receiveraccount}`, 163.4, 705.2,25, 'SFThonburiRegular', '#525252', 'left', 1.5, 1, 0, 0, 500,-1);
            
            drawImage(ctx, '../assets/image/logo/O3.png', 71, 409.5, 78, 78);  
        
          
            // Draw the selected image
            if (selectedImage) {
                const customImage = new Image();
                customImage.src = selectedImage;
                customImage.onload = function() {
                    ctx.drawImage(customImage, 0, 0, 617, 1280); // Adjust the position and size as needed
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
