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
        //other
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
    const months = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];
    const day = padZero(formattedDate.split(' ')[0]);
    const month = months[new Date(date).getMonth()];
    const year = formattedDate.split(' ')[2];
    return `${day} ${month} ${year}`;
}

function generateUniqueID() {
    const now = new Date(document.getElementById('datetime').value);
    const year = now.getFullYear().toString().slice(-4);
    const month = padZero(now.getMonth() + 1);
    const day = padZero(now.getDate());
    const hours = padZero(now.getHours());
    const minutes = padZero(now.getMinutes());
    const randomNumber = Math.floor(Math.random() * 10000000000000).toString().padStart(13, '0');
    return `${year}${month}${day}${hours}${minutes}${randomNumber}`;
}

function generateRandomNumber() {
    return Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
}

function updateDisplay() {
    const sendername = document.getElementById('sendername').value || '-';
    const senderaccount = document.getElementById('senderaccount').value || '-';
    const receivername = document.getElementById('receivername').value || '-';
    const receiveraccount = document.getElementById('receiveraccount').value || '-';
    const bank = document.getElementById('bank').value || '-';
    const amount11 = document.getElementById('amount11').value || '-';
    const datetime = document.getElementById('datetime').value || '-';
    const AideMemoire = document.getElementById('AideMemoire').value || '-';
    const selectedImage = document.getElementById('imageSelect').value || '';
    const QRCode = document.getElementById('QRCode').value || '';

    let bankLogoUrl = '';
    switch (bank) {
        case 'ธนาคารกสิกรไทย':
            bankLogoUrl = '../assets/image/logo/KBANK.png';
            break;
        case 'ธนาคารกรุงไทย':
            bankLogoUrl = '../assets/image/logo/KTB2.png';
            break;
        case 'ธนาคารกรุงเทพ':
            bankLogoUrl = '../assets/image/logo/BBL2.png';
            break;
        case 'ธนาคารไทยพาณิชย์':
            bankLogoUrl = '../assets/image/logo/SCB.png';
            break;
        case 'ธนาคารกรุงศรีอยุธยา':
            bankLogoUrl = '../assets/image/logo/BAY1.png';
            break;
        case 'ธนาคารทหารไทยธนชาต':
            bankLogoUrl = '../assets/image/logo/TTB.png';
            break;
        case 'ธนาคารออมสิน':
            bankLogoUrl = '../assets/image/logo/O2.png';
            break;
        case 'ธนาคารเพื่อการเกษตรและ':
            bankLogoUrl = '../assets/image/logo/T.png';
            break;
        case 'ธนาคารอาคารสงเคราะห์':
            bankLogoUrl = '../assets/image/logo/C1.png';
            break;
        case 'ธนาคารเกียรตินาคินภัทร':
            bankLogoUrl = '../assets/image/logo/K.png';
            break;
        case 'ธนาคารซีไอเอ็มบี':
            bankLogoUrl = '../assets/image/logo/CIMB.png';
            break;
        case 'ธนาคารยูโอบี':
            bankLogoUrl = '../assets/image/logo/UOB1.png';
            break;
        case 'ธนาคารแลนด์ แอนด์ เฮาส์':
            bankLogoUrl = '../assets/image/logo/LHBANK.png';
            break;
        case 'ธนาคารไอซีบีซี':
            bankLogoUrl = '../assets/image/logo/ICBC.png';
            break;
        case 'พร้อมเพย์': 
            bankLogoUrl = '../assets/image/logo/P-Bangkok.png'; 
            break;
        case 'พร้อมเพย์ e-Wallet TrueMoney': 
            bankLogoUrl = '../assets/image/logo/P-Bangkok.png'; 
            break;
        case 'พร้อมเพย์ e-Wallet Jaew': 
            bankLogoUrl = '../assets/image/logo/P-Bangkok.png'; 
            break;
        case 'พร้อมเพย์ e-Wallet K Plus Wallet': 
            bankLogoUrl = '../assets/image/logo/P-Bangkok.png'; 
            break;
        case 'MetaAds': 
            bankLogoUrl = '../assets/image/logo/Meta2.png'; 
            break;
        default: bankLogoUrl = '';
    }

    const formattedDate = formatDate(datetime);
    const formattedTime = new Date(datetime).toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' });

    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    
    let backgroundImageSrc = '../assets/image/bs/B17T.jpg';
    if (bank === 'พร้อมเพย์ e-Wallet TrueMoney') {
        canvas.width = 495;
        canvas.height = 1280;
        backgroundImageSrc = '../assets/image/bs/BB17T.jpg';
    } else if (bank === 'พร้อมเพย์ e-Wallet Jaew') {
        canvas.width = 495;
        canvas.height = 1280;
        backgroundImageSrc = '../assets/image/bs/BB17T.jpg';
    } else if (bank === 'พร้อมเพย์ e-Wallet K Plus Wallet') {
        canvas.width = 495;
        canvas.height = 1280;
        backgroundImageSrc = '../assets/image/bs/BB17T.jpg';
    } else if (bank === 'MetaAds') {
        canvas.width = 495;
        canvas.height = 1280;
        backgroundImageSrc = '../assets/image/bs/B17T.jpg'; 
    } else {
        canvas.width = 495;
        canvas.height = 1280;
        backgroundImageSrc = '../assets/image/bs/B17T.jpg';
    }
    
    // Load background image
    const backgroundImage = new Image();
    backgroundImage.src = backgroundImageSrc;
    backgroundImage.onload = function() {
        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw background image
        ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
        
        // Draw bank logo
        const bankLogo = new Image();
        bankLogo.src = bankLogoUrl;
        bankLogo.onload = function() {
            ctx.drawImage(bankLogo, 160.5, 760, 39, 39); // Adjust position and size as needed
            
            // Draw text with custom styles
            drawText(ctx, `${formattedDate}, ${formattedTime}`, 247.5, 470.6,22, 'BangkokTime2', '#8a8a8a', 'center', 1.5, 3, 0, 0, 800, -1);

            drawText(ctx, `${sendername}`, 218.6, 666.9,22, 'SukhumvitSetExtraBold', '#101011', 'left', 1.5, 3, 0, 0, 800,-1);
            drawText(ctx, `ธนาคารกรุงเทพ`, 218.6, 723.5,21.5, 'SukhumvitSetSemiBold', '#101011', 'left', 1.5, 2, 0, 0, 500,-1);
            drawText(ctx, `${senderaccount}`, 218.6, 695.8,21, 'CoreSansBold', '#101011', 'left', 1.5, 1, 0, 0, 500,-1);
            


            if (bank === 'พร้อมเพย์ e-Wallet TrueMoney') {
            drawText(ctx, `${receivername}<br>เติมเงินพร้อมเพย์ / <br>G-Wallet`, 218.6, 784.9,22, 'SukhumvitSetExtraBold', '#101011', 'left', 29, 3, 0, 0, 800,-1);
            drawText(ctx, `ทรูมันนี่`, 218.6, 869,19, 'SukhumvitSetSemiBold', '#9d9da5', 'left', 1.5, 2, 0, 0, 500,-1);
            drawText(ctx, `${receiveraccount}`, 218.6, 918.8,21, 'SukhumvitSetSemiBold', '#101011', 'left', 1.5, 1, 0, 0, 500,-1);
            
            
            drawText(ctx, `${AideMemoire}`, 163.4, 1040.6,18, 'BangkokTime2', '#101011', 'left', 1.5, 3, 0, 0, 500, 0);
            drawText(ctx, `${generateRandomNumber()}`, 41, 1137.7,18.30, 'BangkokTime2', '#101011', 'left', 1.5, 3, 0, 0, 500, -1);

            drawText(ctx, `${generateUniqueID()}`, 41, 1191,18.30, 'BangkokTime2', '#101011', 'left', 1.5, 3, 0, 0, 500, -1);

            } else if (bank === 'พร้อมเพย์ e-Wallet Jaew') {
            drawText(ctx, `${receivername}<br>เติมเงินพร้อมเพย์ / <br>G-Wallet`, 218.6, 784.9,22, 'SukhumvitSetExtraBold', '#101011', 'left', 29, 3, 0, 0, 800,-1);
            drawText(ctx, `${receiveraccount}`, 218.6, 918.8,21, 'SukhumvitSetSemiBold', '#101011', 'left', 1.5, 1, 0, 0, 500,-1);
            
            
            drawText(ctx, `${AideMemoire}`, 163.4, 1040.6,18, 'BangkokTime2', '#101011', 'left', 1.5, 3, 0, 0, 500, 0);
            drawText(ctx, `${generateRandomNumber()}`, 41, 1137.7,18.30, 'BangkokTime2', '#101011', 'left', 1.5, 3, 0, 0, 500, -1);

            drawText(ctx, `${generateUniqueID()}`, 41, 1191,18.30, 'BangkokTime2', '#101011', 'left', 1.5, 3, 0, 0, 500, -1);

            } else if (bank === 'พร้อมเพย์ e-Wallet K Plus Wallet') {
            drawText(ctx, `${receivername}<br>เติมเงินพร้อมเพย์ / <br>G-Wallet`, 218.6, 784.9,22, 'SukhumvitSetExtraBold', '#101011', 'left', 29, 3, 0, 0, 800,-1);
            drawText(ctx, `K Plus Wallet`, 218.6, 869,19, 'SukhumvitSetSemiBold', '#9d9da5', 'left', 1.5, 2, 0, 0, 500,-1);
            drawText(ctx, `${receiveraccount}`, 218.6, 918.8,21, 'SukhumvitSetSemiBold', '#101011', 'left', 1.5, 1, 0, 0, 500,-1);
            
            
            drawText(ctx, `${AideMemoire}`, 163.4, 1040.6,18, 'BangkokTime2', '#101011', 'left', 1.5, 3, 0, 0, 500, 0);
            drawText(ctx, `${generateRandomNumber()}`, 41, 1137.7,18.30, 'BangkokTime2', '#101011', 'left', 1.5, 3, 0, 0, 500, -1);

            drawText(ctx, `${generateUniqueID()}`, 41, 1191,18.30, 'BangkokTime2', '#101011', 'left', 1.5, 3, 0, 0, 500, -1);

            } else if (bank === 'MetaAds') {
            drawText(ctx, `${receivername}`, 218.6, 784.9,22, 'SukhumvitSetExtraBold', '#101011', 'left', 1.5, 3, 0, 0, 800,-1);
            drawText(ctx, `${bank}`, 218.6, 841.2,21.5, 'SukhumvitSetSemiBold', '#101011', 'left', 1.5, 2, 0, 0, 500,-1);
            drawText(ctx, `${receiveraccount}`, 218.6, 813.8,21, 'CoreSansBold', '#101011', 'left', 1.5, 1, 0, 0, 500,-1);
            
            
            drawText(ctx, `${AideMemoire}`, 163.4, 992.6,18, 'BangkokTime2', '#101011', 'left', 1.5, 3, 0, 0, 500, 0);
            drawText(ctx, `${generateRandomNumber()}`, 41, 1117.7,18.30, 'BangkokTime2', '#101011', 'left', 1.5, 3, 0, 0, 500, -1);

            drawText(ctx, `${generateUniqueID()}`, 41, 1174.4,18.30, 'BangkokTime2', '#101011', 'left', 1.5, 3, 0, 0, 500, -1);

            } else {
            drawText(ctx, `${receivername}`, 218.6, 784.9,22, 'SukhumvitSetExtraBold', '#101011', 'left', 1.5, 3, 0, 0, 800,-1);
            drawText(ctx, `${bank}`, 218.6, 841.2,21.5, 'SukhumvitSetSemiBold', '#101011', 'left', 1.5, 2, 0, 0, 500,-1);
            drawText(ctx, `${receiveraccount}`, 218.6, 813.8,21, 'CoreSansBold', '#101011', 'left', 1.5, 1, 0, 0, 500,-1);
            
            
            drawText(ctx, `${AideMemoire}`, 163.4, 992.6,18, 'BangkokTime2', '#101011', 'left', 1.5, 3, 0, 0, 500, 0);
            drawText(ctx, `${generateRandomNumber()}`, 41, 1117.7,18.30, 'BangkokTime2', '#101011', 'left', 1.5, 3, 0, 0, 500, -1);

            drawText(ctx, `${generateUniqueID()}`, 41, 1174.4,18.30, 'BangkokTime2', '#101011', 'left', 1.5, 3, 0, 0, 500, -1);

            }

            const amountText = `${amount11}`;
            const amountUnit = 'THB';
            const totalText = amountText + ' ' + amountUnit;
            const canvasWidth = canvas.width;
            const centerX = canvasWidth / 2;
          
            const amountX = centerX - (ctx.measureText(totalText).width / 1.35);
            const amountY = 556.3;
            
            drawText(ctx, amountText, amountX, amountY,31, 'BangkokMoneyMedium', '#232121', 'left', 1.5, 3, 0, 0, 500, -2);
            
            const amountWidth = ctx.measureText(amountText).width;
            drawText(ctx, amountUnit, amountX + amountWidth + -8, amountY,18, 'BangkokMoneyMedium', '#232121', 'left', 1.5, 3, 0, 0, 500, 0);
            
            
            drawText(ctx, `${QRCode}`, 238.9, 599.0,33, 'SukhumvitSetSemiBold', '#4e4e4e', 'left', 1.5, 5, 0, 0, 500, 0);
            drawImage(ctx, '../assets/image/logo/BBL2.png', 160.5,642, 39, 39);  
       
               
          
            // Draw the selected image
            if (selectedImage) {
                const customImage = new Image();
                customImage.src = selectedImage;
                customImage.onload = function() {
                    ctx.drawImage(customImage, -75, 125, 572, 1200); // Adjust the position and size as needed
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
