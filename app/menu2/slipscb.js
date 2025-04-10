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
        //krungsri
        new FontFace('krungsriRegular', 'url(../assets/fonts/krungsri_con-webfont.woff)'),
        new FontFace('krungsriMedium', 'url(../assets/fonts/krungsri_con_med-webfont.woff)'),
        new FontFace('krungsriBold', 'url(../assets/fonts/krungsri_con_bol-webfont.woff)'),

        //THSarabunNew
        new FontFace('THSarabunRegular', 'url(../assets/fonts/THSarabun.woff)'),
        new FontFace('THSarabunBold', 'url(../assets/fonts/THSarabun-Bold.woff)'),
        new FontFace('THSarabunItalic', 'url(../assets/fonts/THSarabun-Italic.woff)'),
        new FontFace('THSarabunBoldItalic', 'url(../assets/fonts/THSarabun-BoldItalic.woff)'),
        new FontFace('THSarabunNew', 'url(../assets/fonts/THSarabunNew.woff)'),
        new FontFace('THSarabunNewBold', 'url(../assets/fonts/THSarabunNew-Bold.woff)'),
        new FontFace('THSarabunNewItalic', 'url(../assets/fonts/THSarabunNew-Italic.woff)'),
        new FontFace('THSarabunNewBoldItalic', 'url(../assets/fonts/THSarabunNew-BoldItalic.woff)'),
        //DBHelvethaicaMonX
        new FontFace('DBHelvethaicaMonX', 'url(../assets/fonts/DBHelvethaicaMonX.woff)'),
        new FontFace('DBHelvethaicaMonXCond', 'url(../assets/fonts/DBHelvethaicaMonXCond.woff)'),
        new FontFace('DBHelvethaicaMonXMed', 'url(../assets/fonts/DBHelvethaicaMonXMed.woff)'),
        new FontFace('DBHelvethaicaMonXMedCond', 'url(../assets/fonts/DBHelvethaicaMonXMedCond.woff)'),
        new FontFace('DBHelvethaicaMonXBold', 'url(../assets/fonts/DBHelvethaicaMonXBd.woff)'),
        new FontFace('DBHelvethaicaMonXBoldCond', 'url(../assets/fonts/DBHelvethaicaMonXBdCond.woff)'),
        new FontFace('DBHelvethaicaMonXBlk', 'url(../assets/fonts/DBHelvethaicaMonXBlk.woff)'),
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

loadFonts().then(function() {
    // ใช้ document.fonts.ready เพื่อให้มั่นใจว่าฟอนต์ถูกโหลดทั้งหมด
    document.fonts.ready.then(function() {
        updateDisplay(); // วาดใหม่ด้วยฟอนต์ที่ถูกต้องหลังจากฟอนต์ถูกโหลดเสร็จ
    });
}).catch(function() {
    // หากฟอนต์โหลดไม่สำเร็จ จะยังคงแสดงผลได้
    updateDisplay();
});

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
    let year = formattedDate.split(' ')[2];
    year = `25${year}`;
    return `${day} ${month} ${year}`;
}


function generateUniqueID() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');

    // สุ่มตัวเลข 1 หลัก
    const randomNumber = Math.floor(Math.random() * 10);

    // สุ่มตัวอักษร A-Z ทั้งพิมพ์เล็กและพิมพ์ใหญ่ พร้อมสุ่มตัวเลข 2 ตัวแทรกในโอกาส 5%
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let randomString = '';
    for (let i = 0; i < 16; i++) {
        const isDigit = Math.random() < 0.05;
        if (isDigit) {
            randomString += Math.floor(Math.random() * 10);
        } else {
            const randomChar = characters.charAt(Math.floor(Math.random() * characters.length));
            randomString += randomChar;
        }
    }

    // สร้าง ID
    const uniqueID = `${year}${month}${day}${randomNumber}${randomString}`;

    return uniqueID;
}

function calculateTextWidth(ctx, text, font) {
    ctx.font = font;
    return ctx.measureText(text).width;
}

function calculateTextWidth1(ctx, text, font) {
    ctx.font = font;
    return ctx.measureText(text).width;
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
    const backgroundSelect = document.getElementById('backgroundSelect').value || '';
    const QRCode = document.getElementById('QRCode').value || '';

    // เลือกโลโก้ตาม bank
    let bankLogoUrl = '';
    switch (bank) {
        case 'กสิกรไทย':
            bankLogoUrl = '../assets/image/logo/A-KBANK.png';
            break;
        case 'กรุงไทย':
            bankLogoUrl = '../assets/image/logo/A-KTB.png';
            break;
        case 'กรุงเทพ':
            bankLogoUrl = '../assets/image/logo/A-BBL.png';
            break;
        case 'ไทยพาณิชย์':
            bankLogoUrl = '../assets/image/logo/A-SCB.png';
            break;
        case 'กรุงศรี':
            bankLogoUrl = '../assets/image/logo/A-BAY.png';
            break;
        case 'ทีเอ็มบีธนชาต':
            bankLogoUrl = '../assets/image/logo/A-TTB.png';
            break;
        case 'ออมสิน':
            bankLogoUrl = '../assets/image/logo/A-O.png';
            break;
        case 'ธ.ก.ส.':
            bankLogoUrl = '../assets/image/logo/A-T.png';
            break;
        case 'อาคารสงเคราะห์':
            bankLogoUrl = '../assets/image/logo/A-C.png';
            break;
        case 'เกียรตินาคินภัทร':
            bankLogoUrl = '../assets/image/logo/A-K.png';
            break;
        case 'ซีไอเอ็มบีไทย':
            bankLogoUrl = '../assets/image/logo/A-CIMB.png';
            break;
        case 'ยูโอบี':
            bankLogoUrl = '../assets/image/logo/A-UOB2.png';
            break;
        case 'แลนด์ แอนด์ เฮาส์':
            bankLogoUrl = '../assets/image/logo/A-LHBANK.png';
            break;
        case 'ไอซีบีซี':
            bankLogoUrl = '../assets/image/logo/A-ICBC.png';
            break;
        case 'พร้อมเพย์': 
        bankLogoUrl = '../assets/image/logo/P-SCB.png'; 
            break;
        case 'พร้อมเพย์ e-Wallet': 
        bankLogoUrl = '../assets/image/logo/P-SCB2.png'; 
            break;
        default: bankLogoUrl = '';
    }

    const formattedDate = formatDate(datetime);
    const formattedTime = new Date(datetime).toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' });

    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    
    // กำหนดฟอนต์สำหรับการคำนวณความกว้างของข้อความ
    ctx.font = '44.3px DBHelvethaicaMonXMed';

    // **ปรับการเชื่อมโยง: sendername กับรูปภาพ /assets/image/logo/A-SCB.png**

    // คำนวณความกว้างของ sendername
    const senderNameWidth = ctx.measureText(sendername).width;

    
    // กำหนดความกว้างของรูปภาพที่เชื่อมโยงกับ sendername
    const senderImageWidth = 55; // ปรับตามต้องการ

    // ระยะห่างระหว่างรูปภาพและ sendername
    const senderSpacing = 10; // ปรับตามต้องการ

    // ความกว้างรวมของรูปภาพ sender, ระยะห่าง และ sendername
    const senderTotalWidth = senderImageWidth + senderSpacing + senderNameWidth;

    // ตำแหน่ง x เริ่มต้นของกลุ่ม sender
    const senderStartX = 769 - senderTotalWidth; // จัดชิดขวาที่ x = 769

    // ตำแหน่ง x ของรูปภาพและ sendername
    const senderImageX = senderStartX;
    const senderNameX = senderImageX + senderImageWidth + senderSpacing;

    // **ปรับการเชื่อมโยง: receivername กับ bankLogo**

    // คำนวณความกว้างของ receivername
    const receiverNameWidth = ctx.measureText(receivername).width;

    
    // กำหนดความกว้างของ bankLogo
    const bankLogoWidth = 55; // ปรับตามต้องการ

    // ระยะห่างระหว่าง bankLogo และ receivername
    const receiverSpacing = 10; // ปรับตามต้องการ

    // ความกว้างรวมของ bankLogo, ระยะห่าง และ receivername
    const receiverTotalWidth = bankLogoWidth + receiverSpacing + receiverNameWidth;

    // ตำแหน่ง x เริ่มต้นของกลุ่ม receiver
    const receiverStartX = 769 - receiverTotalWidth; // จัดชิดขวาที่ x = 769

    // ตำแหน่ง x ของ bankLogo และ receivername
    const bankLogoX = receiverStartX;
    const receiverNameX = bankLogoX + bankLogoWidth + receiverSpacing;


    // ถ้าเลือกพร้อมเพย์ e-Wallet (EW01) => ขยาย canvas + เปลี่ยนพื้นหลัง + ย้ายตำแหน่ง
    let backgroundImageSrc = backgroundSelect;
    if (bank === 'พร้อมเพย์ e-Wallet') {
        // ขยายขนาด canvas เป็น 752 x 1321
        canvas.width = 818;
        canvas.height = 1413;
        // พื้นหลังเฉพาะ e-Wallet
        backgroundImageSrc = '../assets/image/bs/SCBB2.jpg';
    } else {
        // ธนาคารอื่น => canvas ปกติ
        canvas.width = 818;
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


        const senderLogo = new Image();
        senderLogo.src = '../assets/image/logo/A-SCB.png';
        senderLogo.onload = function() {
            // วาดรูปภาพ sender
            ctx.drawImage(senderLogo, senderImageX, 449, senderImageWidth, 55);

            // --------- ข้อมูลผู้โอน --------- //
            drawText(ctx, `${sendername}`, senderNameX, 488.4, 44.3, 'DBHelvethaicaMonXMed', '#47424e', 'left', 1.5, 3, 0, 0, 1500, 0);
            drawText(ctx, `${senderaccount}`, 769, 538, 38.5, 'DXSCB', '#76737b', 'right', 1.5, 1, 0, 0, 500, 0);

            // **วาด bankLogo และ receivername**

            const bankLogo = new Image();
            bankLogo.src = bankLogoUrl;
            bankLogo.onload = function() {
                // วาด bankLogo
                ctx.drawImage(bankLogo, bankLogoX, 573.7, bankLogoWidth, 55);


                // วาดจำนวนเงิน
                drawText(ctx, `${amount11}`, 769, 791.0, 44.3, 'DBHelvethaicaMonXMed', '#47424e', 'right', 1.5, 3, 0, 0, 500, 0);

                // วาดวันที่และเวลาที่โอน
                drawText(ctx, `${formattedDate} - ${formattedTime}`, 407, 332.4, 38.5, 'DXSCB', '#76737b', 'center', 1.5, 3, 0, 0, 800, 0);



                            // ========== เช็คว่าธนาคารเป็นพร้อมเพย์ e-Wallet หรือไม่ ========== //
            if (bank === 'พร้อมเพย์ e-Wallet') {
                drawImage(ctx, '../assets/image/logo/P-SCB1.png', 486, 573.7, 55, 55);
                drawText(ctx, `เติมเงินพร้อมเพย์`, 551, 613.0, 44.3, 'DBHelvethaicaMonXMed', '#47424e', 'left', 1.5, 3, 0, 0, 1500, 0);
                drawText(ctx, `${receiveraccount}`, 769, 662.4, 38.5, 'DXSCB', '#76737b', 'right', 1.5, 1, 0, 0, 500, 0);
                drawText(ctx, `${receivername} (TrueMoney)`, 47, 924.5, 35.5, 'DXSCB', '#76737b', 'left', 1.5, 3, 0, 0, 800, 0);


             } else {
                drawText(ctx, `${receivername}`, receiverNameX, 613.0, 44.3, 'DBHelvethaicaMonXMed', '#47424e', 'left', 1.5, 3, 0, 0, 1500, 0);
                drawText(ctx, `${receiveraccount}`, 769, 662.4, 38.5, 'DXSCB', '#76737b', 'right', 1.5, 1, 0, 0, 500, 0);

             }

                // วาดรหัสอ้างอิง
                drawText(ctx, `รหัสอ้างอิง: ${generateUniqueID()}`, 407, 377.5, 38.5, 'DXSCB', '#76737b', 'center', 1.5, 1, 0, 0, 800, 0);

                // วาด QRCode
                drawText(ctx, `${QRCode}`, 238.9, 599.0, 33, 'DBHelvethaicaMonXMed', '#4e4e4e', 'left', 1.5, 5, 0, 0, 500, 0);

                // วาดภาพที่เลือกเพิ่มเติม (ถ้ามี)
                if (selectedImage) {
                    const customImage = new Image();
                    customImage.src = selectedImage;
                    customImage.onload = function() {
                        ctx.drawImage(customImage, 0, 0, 818, 1280);
                    }
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
