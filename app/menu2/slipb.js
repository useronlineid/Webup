// ฟังก์ชันเพื่อโหลดฟอนต์
function loadFonts() {
    const fonts = [
        //SukhumvitSet
        new FontFace('SukhumvitSetThin', 'url(/assets/fonts/SukhumvitSet-Thin.woff)'),
        new FontFace('SukhumvitSetText', 'url(/assets/fonts/SukhumvitSet-Text.woff)'),
        new FontFace('SukhumvitSetLight', 'url(/assets/fonts/SukhumvitSet-Light.woff)'),
        new FontFace('SukhumvitSetMedium', 'url(/assets/fonts/SukhumvitSet-Medium.woff)'),
        new FontFace('SukhumvitSetSemiBold', 'url(/assets/fonts/SukhumvitSet-SemiBold.woff)'),
        new FontFace('SukhumvitSetBold', 'url(/assets/fonts/SukhumvitSet-Bold.woff)'),
        new FontFace('SukhumvitSetExtraBold', 'url(/assets/fonts/SukhumvitSet-Extra%20Bold.woff)'),
        //SFThonburi
        new FontFace('SFThonburiLight', 'url(/assets/fonts/SFThonburi.woff)'),
        new FontFace('SFThonburiRegular', 'url(/assets/fonts/SFThonburi-Regular.woff)'),
        new FontFace('SFThonburiSemiBold', 'url(/assets/fonts/SFThonburi-Semibold.woff)'),
        new FontFace('SFThonburiBold', 'url(/assets/fonts/SFThonburi-Bold.woff)'),
        //Kanit
        new FontFace('KanitThin', 'url(/assets/fonts/Kanit-Thin.woff)'),
        new FontFace('KanitExtraLight', 'url(/assets/fonts/Kanit-ExtraLight.woff)'),
        new FontFace('KanitLight', 'url(/assets/fonts/Kanit-Light.woff)'),
        new FontFace('KanitRegular', 'url(/assets/fonts/Kanit-Regular.woff)'),
        new FontFace('KanitMedium', 'url(/assets/fonts/Kanit-Medium.woff)'),
        new FontFace('KanitSemiBold', 'url(/assets/fonts/Kanit-SemiBold.woff)'),
        new FontFace('KanitBold', 'url(/assets/fonts/Kanit-Bold.woff)'),
        new FontFace('KanitExtraBold', 'url(/assets/fonts/Kanit-ExtraBold.woff)'),
        new FontFace('KanitBlack', 'url(/assets/fonts/Kanit-Black.woff)'),
        //Bangkok
        new FontFace('BangkokTime1', 'url(/assets/fonts/Bangkok-Time1.woff)'),
        new FontFace('BangkokTime2', 'url(/assets/fonts/Bangkok-Time2.woff)'),
        new FontFace('BangkokMoney', 'url(/assets/fonts/Bangkok-Money.woff)'),
        new FontFace('BangkokTime', 'url(/assets/fonts/Bangkok-Time.woff)'),
        //BangkokMoney
        new FontFace('BangkokMoneyRegular', 'url(/assets/fonts/Bangkok-Money-Regular.woff)'),
        new FontFace('BangkokMoneyMedium', 'url(/assets/fonts/Bangkok-Money-Medium.woff)'),
        new FontFace('BangkokMoneySemiBold', 'url(/assets/fonts/Bangkok-Money-SemiBold.woff)'),
        new FontFace('BangkokMoneyBold', 'url(/assets/fonts/Bangkok-Money-Bold.woff)'),
        //TTB-Money
        new FontFace('TTBMoneyRegular', 'url(/assets/fonts/TTB-Money-Regular.woff)'),
        new FontFace('TTBMoneyMedium', 'url(/assets/fonts/TTB-Money-Medium.woff)'),
        new FontFace('TTBMoneySemiBold', 'url(/assets/fonts/TTB-Money-SemiBold.woff)'),
        new FontFace('TTBMoneyBold', 'url(/assets/fonts/TTB-Money-Bold.woff)'),
        new FontFace('TTBMoneyExtraBold', 'url(/assets/fonts/TTB-Money-ExtraBold.woff)'),
        //THSarabunNew
        new FontFace('THSarabunRegular', 'url(/assets/fonts/THSarabun.woff)'),
        new FontFace('THSarabunBold', 'url(/assets/fonts/THSarabun-Bold.woff)'),
        new FontFace('THSarabunItalic', 'url(/assets/fonts/THSarabun-Italic.woff)'),
        new FontFace('THSarabunBoldItalic', 'url(/assets/fonts/THSarabun-BoldItalic.woff)'),
        new FontFace('THSarabunNew', 'url(/assets/fonts/THSarabunNew.woff)'),
        new FontFace('THSarabunNewBold', 'url(/assets/fonts/THSarabunNew-Bold.woff)'),
        new FontFace('THSarabunNewItalic', 'url(/assets/fonts/THSarabunNew-Italic.woff)'),
        new FontFace('THSarabunNewBoldItalic', 'url(/assets/fonts/THSarabunNew-BoldItalic.woff)'),
        //other
        new FontFace('DXKrungthaiSemiBold', 'url(/assets/fonts/DX-Krungthai-SemiBold.woff)'),
        new FontFace('DXKrungthaiThin', 'url(/assets/fonts/DX-Krungthai-Thin.woff)'),
        new FontFace('DXSCB', 'url(/assets/fonts/DX-SCB.woff)'),
        new FontFace('DXTTBBold', 'url(/assets/fonts/DX-TTB-bold.woff)'),
        new FontFace('DXTTBRegular', 'url(/assets/fonts/DX-TTB-regular.woff)'),
        new FontFace('DXKrungthaiBold', 'url(/assets/fonts/DX-Krungthai-Bold.woff)'),
        new FontFace('DXKrungthaiMedium', 'url(/assets/fonts/DX-Krungthai-Medium.woff)'),
        new FontFace('DXKrungthaiRegular', 'url(/assets/fonts/DX-Krungthai-Regular.woff)'),
        new FontFace('TTBMoney', 'url(/assets/fonts/TTB Money.woff)'),
        new FontFace('CoreSansLight', 'url(/assets/fonts/Core-Sans-E-W01-35-Light.woff)'),
        new FontFace('CoreSansBold', 'url(/assets/fonts/Core-Sans-N-65-Bold.woff)'),
        new FontFace('THSarabun', 'url(/assets/fonts/THSarabun.woff)')
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
    const year = now.getFullYear().toString();
    const month = padZero(now.getMonth() + 1);
    const day = padZero(now.getDate());
    const hours = padZero(now.getHours());
    const minutes = padZero(now.getMinutes());
    const seconds = padZero(now.getSeconds());
    const randomNumber = Math.floor(Math.random() * 100000000000).toString().padStart(11, '0'); // สุ่ม 11 หลัก
    return `${year}${month}${day}${hours}${minutes}${seconds}${randomNumber}`;
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
    const selectedImage = document.getElementById('imageSelect').value || '';
    const QRCode = document.getElementById('QRCode').value || '';


    let bankLogoUrl = '';
    switch (bank) {
        case 'ธนาคารกสิกรไทย':
            bankLogoUrl = '/assets/image/logo/KBANK.png';
            break;
        case 'ธนาคารกรุงไทย':
            bankLogoUrl = '/assets/image/logo/KTB2.png';
            break;
        case 'ธนาคารกรุงเทพ':
            bankLogoUrl = '/assets/image/logo/BBL2.png';
            break;
        case 'ธนาคารไทยพาณิชย์':
            bankLogoUrl = '/assets/image/logo/SCB.png';
            break;
        case 'ธนาคารกรุงศรีอยุธยา':
            bankLogoUrl = '/assets/image/logo/BAY1.png';
            break;
        case 'ธนาคารทหารไทยธนชาต':
            bankLogoUrl = '/assets/image/logo/TTB.png';
            break;
        case 'ธนาคารออมสิน':
            bankLogoUrl = '/assets/image/logo/O2.png';
            break;
        case 'ธนาคารเพื่อการเกษตรและ':
            bankLogoUrl = '/assets/image/logo/T.png';
            break;
        case 'ธนาคารอาคารสงเคราะห์':
            bankLogoUrl = '/assets/image/logo/C1.png';
            break;
        case 'ธนาคารเกียรตินาคินภัทร':
            bankLogoUrl = '/assets/image/logo/K.png';
            break;
        case 'ธนาคารซีไอเอ็มบี':
            bankLogoUrl = '/assets/image/logo/CIMB.png';
            break;
        case 'ธนาคารยูโอบี':
            bankLogoUrl = '/assets/image/logo/UOB1.png';
            break;
        case 'ธนาคารแลนด์ แอนด์ เฮ้าส์':
            bankLogoUrl = '/assets/image/logo/LHBANK.png';
            break;
        case 'ธนาคารไอซีบีซี':
            bankLogoUrl = '/assets/image/logo/ICBC.png';
            break;
        case 'พร้อมเพย์': bankLogoUrl = '../assets/image/logo/P-Bangkok.png'; break;
        case 'พร้อมเพย์ e-Wallet': bankLogoUrl = '../assets/image/logo/P-Bangkok.png'; break;
        case 'MetaAds': bankLogoUrl = '../assets/image/logo/Meta2.png'; break;
        default: bankLogoUrl = '';
    }

    const formattedDate = formatDate(datetime);
    const formattedTime = new Date(datetime).toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' });

    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    
     // ถ้าเลือกพร้อมเพย์ e-Wallet (EW01) => ขยาย canvas + เปลี่ยนพื้นหลัง + ย้ายตำแหน่ง
    let backgroundImageSrc = '../assets/image/bs/B1.jpg';
    if (bank === 'พร้อมเพย์ e-Wallet') {
        canvas.width = 607;
        canvas.height = 1280;
        backgroundImageSrc = '../assets/image/bs/BB1.jpg';
    } else if (bank === 'MetaAds') {
        canvas.width = 607;
        canvas.height = 1280;
        backgroundImageSrc = '../assets/image/bs/BB2.jpg'; // ภาพเฉพาะของ MetaAds
    } else {
        canvas.width = 607;
        canvas.height = 1200;
        backgroundImageSrc = '../assets/image/bs/B1.jpg';
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
            ctx.drawImage(bankLogo, 160.5, 664.0, 43, 43); // Adjust position and size as needed
            
            // Draw text with custom styles
            drawText(ctx, `${formattedDate}, ${formattedTime}`, 303, 353.1,23.50, 'BangkokTime2', '#8a8a8a', 'center', 1.5, 3, 0, 0, 800, -1);

            drawText(ctx, `${sendername}`, 224.1, 560.4,24.3, 'SukhumvitSetExtraBold', '#101011', 'left', 1.5, 3, 0, 0, 800, 0);
            drawText(ctx, `ธนาคารกรุงเทพ`, 224.1, 625.2,23.0, 'SukhumvitSetSemiBold', '#101011', 'left', 1.5, 2, 0, 0, 500, 0);
            drawText(ctx, `${senderaccount}`, 224.1, 593.3,23.5, 'CoreSansBold', '#101011', 'left', 1.5, 1, 0, 0, 500, 0);
            

            // ========== เช็คว่าธนาคารเป็นพร้อมเพย์ e-Wallet หรือไม่ ========== //
            if (bank === 'พร้อมเพย์ e-Wallet') {
                drawText(ctx, `${receivername}<br>เติมเงินพร้อมเพย์ / G-Wallet`, 224.1, 691.3,24.3, 'SukhumvitSetExtraBold', '#101011', 'left', 34, 3, 0, 0, 800, 0);
                drawText(ctx, `ทรูมันนี่`, 224.1, 756.3,19, 'SukhumvitSetSemiBold', '#9d9da5', 'left', 1.5, 3, 0, 0, 800, 0);
                //drawText(ctx, `${bank}`, 224.1, 756.3,23.0, 'SukhumvitSetSemiBold', '#101011', 'left', 1.5, 2, 0, 0, 500, 0);
                drawText(ctx, `${receiveraccount}`, 224.1, 828.5,23.5, 'BangkokTime2', '#101011', 'left', 1.5, 1, 0, 0, 500, 0);
                
                drawText(ctx, `${generateRandomNumber()}`, 47.2, 1073,20.63, 'BangkokTime2', '#101011', 'left', 1.5, 3, 0, 0, 500, -1);
                drawText(ctx, `${generateUniqueID()}`, 47.2, 1135,20.63, 'BangkokTime2', '#101011', 'left', 1.5, 3, 0, 0, 500, -1);


            } else if (bank === 'MetaAds') {
                drawText(ctx, `META ADS (KGP)`, 224.1, 691.3, 24.3, 'SukhumvitSetExtraBold', '#101011', 'left', 34, 3, 0, 0, 800, 0);
                drawText(ctx, `Biller ID:${receivername}`, 224.1, 719, 20, 'SukhumvitSetMedium', '#9d9da5', 'left', 1.5, 3, 0, 0, 800, 0);
                drawText(ctx, `${receiveraccount}`, 224.1, 785, 23.5, 'BangkokTime2', '#101011', 'left', 1.5, 1, 0, 0, 500, 0);
                drawText(ctx, `${receiveraccount}`, 224.1, 845, 23.5, 'BangkokTime2', '#101011', 'left', 1.5, 1, 0, 0, 500, 0);

                drawText(ctx, `${generateRandomNumber()}`, 47.2, 1107, 20.63, 'BangkokTime2', '#101011', 'left', 1.5, 3, 0, 0, 500, -1);
                drawText(ctx, `${generateUniqueID()}`, 47.2, 1173, 20.63, 'BangkokTime2', '#101011', 'left', 1.5, 3, 0, 0, 500, -1);
            } else {
                drawText(ctx, `${receivername}`, 224.1, 691.3,24.3, 'SukhumvitSetExtraBold', '#101011', 'left', 1.5, 3, 0, 0, 800, 0);
                drawText(ctx, `${bank}`, 224.1, 756.3,23.0, 'SukhumvitSetSemiBold', '#101011', 'left', 1.5, 2, 0, 0, 500, 0);
                drawText(ctx, `${receiveraccount}`, 224.1, 723.5,23.5, 'CoreSansBold', '#101011', 'left', 1.5, 1, 0, 0, 500, 0);
                
                drawText(ctx, `${generateRandomNumber()}`, 47.2, 993,20.63, 'BangkokTime2', '#101011', 'left', 1.5, 3, 0, 0, 500, -1);

                drawText(ctx, `${generateUniqueID()}`, 47.2, 1057,20.63, 'BangkokTime2', '#101011', 'left', 1.5, 3, 0, 0, 500, -1);
    
            }



            const amountText = `${amount11}`;
            const amountUnit = 'THB';
            const totalText = amountText + ' ' + amountUnit;
            const canvasWidth = canvas.width;
            const centerX = canvasWidth / 2;
          
            const amountX = centerX - (ctx.measureText(totalText).width / 1.25);
            const amountY = 460.0;
            
            drawText(ctx, amountText, amountX, amountY,35.44, 'BangkokMoneyMedium', '#232121', 'left', 1.5, 3, 0, 0, 500, -1);
            
            const amountWidth = ctx.measureText(amountText).width;
            drawText(ctx, amountUnit, amountX + amountWidth + 1, amountY,21.00, 'BangkokMoneyMedium', '#232121', 'left', 1.5, 3, 0, 0, 500, 0);
            
            
            drawText(ctx, `${QRCode}`, 238.9, 599.0,33, 'SukhumvitSetSemiBold', '#4e4e4e', 'left', 1.5, 5, 0, 0, 500, 0);
            drawImage(ctx, '/assets/image/logo/BBL2.png', 160.5, 531.5, 43, 43);  
       
               
          
            // Draw the selected image
            if (selectedImage) {
                const customImage = new Image();
                customImage.src = selectedImage;
                customImage.onload = function() {
                    ctx.drawImage(customImage, 0, 0, 607, 1200); // Adjust the position and size as needed
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
