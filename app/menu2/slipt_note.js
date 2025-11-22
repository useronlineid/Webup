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
    const months = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];
    const day = formattedDate.split(' ')[0];
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
    const randomNumber = Math.floor(Math.random() * 100000000).toString().padStart(8, '0');
    return `${year}${month}${day}${hours}${randomNumber}`;
}


function updateDisplay() {
    const sendername = document.getElementById('sendername').value || '-';
    const senderaccount = document.getElementById('senderaccount').value || '-';
    const receivername = document.getElementById('receivername').value || '-';
    const receiveraccount = document.getElementById('receiveraccount').value || '-';
    const bank = document.getElementById('bank').value || '-';
    const amount11 = document.getElementById('amount11').value || '-';
    const amountDecimal = document.getElementById('amountDecimal').value || '-';
    const datetime = document.getElementById('datetime').value || '-';
    const selectedImage = document.getElementById('imageSelect').value || '';
    const AideMemoire = document.getElementById('AideMemoire').value || '-';
    const backgroundSelect = document.getElementById('backgroundSelect').value || '';
    const QRCode = document.getElementById('QRCode').value || '';

    // เลือกโลโก้ตาม bank
    let bankLogoUrl = '';
    switch (bank) {
        case 'KBANK': bankLogoUrl = '../assets/image/logo/KBANK1.3.png'; break;
        case 'KTB': bankLogoUrl = '../assets/image/logo/KTB2.png'; break;
        case 'BBL': bankLogoUrl = '../assets/image/logo/BBL4.png'; break;
        case 'SCB': bankLogoUrl = '../assets/image/logo/SCB.png'; break;
        case 'BAY': bankLogoUrl = '../assets/image/logo/BAY2.1.png'; break;
        case 'ttb': bankLogoUrl = '../assets/image/logo/TTB2.png'; break;
        case 'GSB': bankLogoUrl = '../assets/image/logo/O2.png'; break;
        case 'BAAC': bankLogoUrl = '../assets/image/logo/T2.png'; break;
        case 'GHB': bankLogoUrl = '../assets/image/logo/C1.png'; break;
        case 'KKP': bankLogoUrl = '../assets/image/logo/K1.png'; break;
        case 'CIMB': bankLogoUrl = '../assets/image/logo/CIMB.png'; break;
        case 'UOB': bankLogoUrl = '../assets/image/logo/UOB4.png'; break;
        case 'LH Bank': bankLogoUrl = '../assets/image/logo/LHBANK1.png'; break;
        case 'ICBC': bankLogoUrl = '../assets/image/logo/ICBC.png'; break;
        case 'พร้อมเพย์': bankLogoUrl = '../assets/image/logo/P-TTB1.png'; break;
        case 'พร้อมเพย์ e-Wallet': bankLogoUrl = '../assets/image/logo/P-TTB1.png'; break;
        default: bankLogoUrl = '';
    }

    const formattedDate = formatDate(datetime);
    const formattedTime = new Date(datetime).toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' });

    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    // ถ้าเลือกพร้อมเพย์ e-Wallet (EW01) => ขยาย canvas + เปลี่ยนพื้นหลัง + ย้ายตำแหน่ง
    let backgroundImageSrc = backgroundSelect;
    if (bank === 'พร้อมเพย์ e-Wallet') {
        // ขยายขนาด canvas เป็น 752 x 1321
        canvas.width = 714;
        canvas.height = 1320;
        // พื้นหลังเฉพาะ e-Wallet
        backgroundImageSrc = '../assets/image/bs/TT1T.jpg';
    } else {
        // ธนาคารอื่น => canvas ปกติ
        canvas.width = 714;
        canvas.height = 1280;
        backgroundImageSrc = backgroundSelect; 
    }

    // โหลดภาพพื้นหลัง
    const backgroundImage = new Image();
    backgroundImage.src = backgroundImageSrc;
    backgroundImage.onload = function() {
        // เคลียร์ canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // วาดพื้นหลัง
        ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

        // วาด bank logo
        const bankLogo = new Image();
        bankLogo.src = bankLogoUrl;
        bankLogo.onload = function() {
            ctx.drawImage(bankLogo, 49.5, 740.7, 80.0, 80.0); // Adjust position and size as needed
                        
          // ========== ข้อความต่าง ๆ ส่วนบน ========== //
            // วันที่ + เวลา
            drawText(ctx, `${formattedDate}, ${formattedTime} น.`, 356, 400.8,21.33, 'DXTTBRegular', '#9099a2', 'center', 1.5, 3, 0, 0, 800, 0);

            // --------- ข้อมูลผู้โอน --------- //
            drawText(ctx, `${sendername}`, 138.5, 598.5,24.3, 'DXTTBBold', '#0a2e6c', 'left', 1.5, 3, 0, 0, 800, 0);
            drawText(ctx, `${senderaccount}`, 138.5, 637.8,24.3, 'DXTTBRegular', '#7d8085', 'left', 1.5, 1, 0, 0, 500, 0);
            drawText(ctx, `ttb`, 138.5, 678.1,24.3, 'DXTTBRegular', '#7d8085', 'left', 1.5, 2, 0, 0, 500, 0);
            
            // ========== เช็คว่าธนาคารเป็นพร้อมเพย์ e-Wallet หรือไม่ ========== //
            if (bank === 'พร้อมเพย์ e-Wallet') {
                // ย้ายตำแหน่ง bank
                drawText(ctx, `${bank}`, 138.5, 772.7,24.3, 'DXTTBBold', '#0a2e6c', 'left', 1.5, 3, 0, 0, 800, 0);
                // ย้ายตำแหน่ง receiveraccount
                drawText(ctx, `${receiveraccount}`, 138.5, 850.9,24.3, 'DXTTBRegular', '#7d8085', 'left', 1.5, 1, 0, 0, 500, 0);
                // ย้ายตำแหน่ง receivername
                drawText(ctx, `${receivername}`, 138.5, 889.9,24.3, 'DXTTBRegular', '#7d8085', 'left', 1.5, 3, 0, 0, 800, 0);
                // แสดง (EW01)
                drawText(ctx, `(EW01)`, 138.5, 811.9,24.3, 'DXTTBRegular', '#0a2e6c', 'left', 1.5, 1, 0, 0, 500, 0);
                // ย้าย generateUniqueID
                drawText(ctx, `${generateUniqueID()}`, 166.9, 1032.7,21.33, 'DXTTBRegular', '#8e959d', 'left', 1.5, 3, 0, 0, 500, 0);
                drawText(ctx, `${AideMemoire}`, 655, 970.9,24.3, 'DXTTBBold', '#0a2e6c', 'right', 1.5, 3, 0, 0, 800, 0);


                // *** ส่วนของจำนวนเงิน (amount11 / amountDecimal) ย้ายตำแหน่งใหม่ ***
                // สมมุติให้ย้ายลงมาอีกประมาณ +40 px จากของเดิม เพื่อให้ขยับลง
                const amountText = `${amount11}`;
                const amountUnit = `${amountDecimal}`;
                const totalText = amountText + ' ' + amountUnit;

                // จัดกึ่งกลางเหมือนเดิม แต่เปลี่ยน Y
                const centerX = canvas.width / 1.90;
                const amountY = 483.5;
                
                // วาดเลขจำนวนเงิน
                const amountX = centerX - (ctx.measureText(totalText).width / 0.83);
                drawText(ctx, amountText, amountX, amountY, 58.0, 'DXTTBBold', '#00225c', 'left', 1.5, 3, 0, 0, 500, 0);
                const amountWidth = ctx.measureText(amountText).width;
                // วาดทศนิยมต่อจาก amountText
                drawText(ctx, amountUnit, amountX + amountWidth - 1, amountY, 42.50, 'DXTTBBold', '#00225c', 'left', 1.5, 0, 0, 0, 500, 0);



            } else {
                // ไม่ใช่พร้อมเพย์ e-Wallet => ตำแหน่งปกติ
                drawText(ctx, `${receivername}`, 138.5, 772.7,24.3, 'DXTTBBold', '#0a2e6c', 'left', 1.5, 3, 0, 0, 800, 0);
                drawText(ctx, `${receiveraccount}`, 138.5, 811.9,24.3, 'DXTTBRegular', '#7d8085', 'left', 1.5, 1, 0, 0, 500, 0);
                drawText(ctx, `${bank}`, 138.5, 850.9,24.3, 'DXTTBRegular', '#7d8085', 'left', 1.5, 2, 0, 0, 500, 0);
                // ซ่อน (EW01) => ไม่ต้องวาด
                // generateUniqueID กลับตำแหน่งเดิม
                drawText(ctx, `${generateUniqueID()}`, 166.9, 993.0,21.33, 'DXTTBRegular', '#8e959d', 'left', 1.5, 3, 0, 0, 500, 0);
                drawText(ctx, `${AideMemoire}`, 655, 931.2,24.3, 'DXTTBBold', '#0a2e6c', 'right', 1.5, 3, 0, 0, 800, 0);


                // *** ส่วนของจำนวนเงิน ตำแหน่งปกติ ***
                const amountText = `${amount11}`;
                const amountUnit = `${amountDecimal}`;
                const totalText = amountText + ' ' + amountUnit;

                const centerX = canvas.width / 1.90;
                const amountY = 483.5;
                
                const amountX = centerX - (ctx.measureText(totalText).width / 0.83);
                drawText(ctx, amountText, amountX, amountY, 58.0, 'DXTTBBold', '#00225c', 'left', 1.5, 3, 0, 0, 500, 0);
                const amountWidth = ctx.measureText(amountText).width;
                drawText(ctx, amountUnit, amountX + amountWidth - 1, amountY, 42.50, 'DXTTBBold', '#00225c', 'left', 1.5, 0, 0, 0, 500, 0);
            }


            // วาด QRCode Text (ถ้าต้องการเอาไปทำอย่างอื่น ก็ปรับใช้ตามต้องการ)
            drawText(ctx, `${QRCode}`, 238.9, 599.0,33, 'DXTTBRegular', '#4e4e4e', 'left', 1.5, 5, 0, 0, 500, 0);
            // ตัวอย่างวาดโลโก้ TTB ซ้ำ (ถ้าต้องการ)
            drawImage(ctx, '../assets/image/logo/TTB2.png', 49.5, 565.1, 80.0, 80.0);  
            // สุดท้ายวาดสติ๊กเกอร์ที่เลือก
            if (selectedImage) {
                const customImage = new Image();
                customImage.src = selectedImage;
                customImage.onload = function() {
                    // ปรับตำแหน่ง/ขนาดตามต้องการ
                    ctx.drawImage(customImage, 0, 0, canvas.width, canvas.height);
                }
            }
        }
    }
}


function drawText(ctx, text, x, y, fontSize, fontFamily, color, align, lineHeight, maxLines, shadowColor, shadowBlur, maxWidth, letterSpacing) {
    
    ctx.font = `${fontSize}px ${fontFamily}`;
    ctx.fillStyle = color;
    ctx.textAlign = 'left';
    ctx.shadowColor = shadowColor;
    ctx.shadowBlur = shadowBlur;

    
    
    const paragraphs = text.split('<br>');
    let currentY = y;

    paragraphs.forEach(paragraph => {
        const lines = [];
        let currentLine = '';

        for (let i = 0; i < paragraph.length; i++) {
            const char = paragraph[i];
            const nextChar = i < paragraph.length - 1 ? paragraph[i + 1] : '';
            const isThai = /[\u0E00-\u0E7F]/.test(char);
            const isWhitespace = /\s/.test(char);

            // แยกข้อความตามพยางค์ไทยหรือคำอังกฤษและอักขระพิเศษ
            if (isThai && !isWhitespace) {
                const testLine = currentLine + char;
                const metrics = ctx.measureText(testLine);
                const testWidth = metrics.width + (testLine.length - 1) * letterSpacing;

                if (testWidth > maxWidth) {
                    lines.push(currentLine.trim());
                    currentLine = char;
                } else {
                    currentLine = testLine;
                }
            } else {
                // กรณีภาษาอังกฤษ สัญลักษณ์ และช่องว่าง
                const testLine = currentLine + char;
                const metrics = ctx.measureText(testLine);
                const testWidth = metrics.width + (testLine.length - 1) * letterSpacing;

                if (testWidth > maxWidth) {
                    lines.push(currentLine.trim());
                    currentLine = char;
                } else {
                    currentLine = testLine;
                }
            }
        }

        lines.push(currentLine.trim());

        lines.forEach((line, index) => {
            let currentX = x;
            
            if (align === 'center') {
                // ปรับการจัดกึ่งกลางตามค่าของ x ที่กำหนดเอง
                currentX = x - (ctx.measureText(line).width / 2) - ((line.length - 1) * letterSpacing) / 2;
            } else if (align === 'right') {
                // จัดให้อยู่ทางขวา โดยใช้ค่าของ x ที่กำหนดเองเป็นจุดอ้างอิง
                currentX = x - ctx.measureText(line).width - ((line.length - 1) * letterSpacing);
            }
        
            drawTextLine(ctx, line, currentX, currentY, letterSpacing);
            currentY += lineHeight;
            if (maxLines && index >= maxLines - 1) {
                return;
            }
        });
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
        const charCode = char.charCodeAt(0);
        const prevChar = index > 0 ? characters[index - 1] : null;
        const prevCharCode = prevChar ? prevChar.charCodeAt(0) : null;

        const isUpperVowel = (charCode >= 0x0E34 && charCode <= 0x0E37);
        const isToneMark = (charCode >= 0x0E48 && charCode <= 0x0E4C);
        const isBeforeVowel = (charCode === 0x0E31);
        const isBelowVowel = (charCode >= 0x0E38 && charCode <= 0x0E3A);

        let yOffset = 0;
        let xOffset = 0;

        if (isUpperVowel) {
            yOffset = -1;
            xOffset = 0;
        }

        if (isToneMark) {
            if (prevChar && ((prevChar.charCodeAt(0) >= 0x0E34 && prevChar.charCodeAt(0) <= 0x0E37) || prevChar.charCodeAt(0) === 0x0E31)) {
                yOffset = -8;
                xOffset = 0;
            } else {
                yOffset = 0;
                xOffset = -7;
            }
        }

        if (isBeforeVowel) {
            yOffset = -1;
            xOffset = 1;
        }

        if (isBelowVowel) {
            yOffset = 0;
            xOffset = -10;
        }

        ctx.fillText(char, currentPosition + xOffset, y + yOffset);

        if (!isToneMark && !isBeforeVowel && !isBelowVowel) {
            currentPosition += ctx.measureText(char).width + letterSpacing;
        } else {
            currentPosition += ctx.measureText(char).width;
        }
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
