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
    const day = padZero(formattedDate.split(' ')[0]);
    const month = months[new Date(date).getMonth()];
    const year = formattedDate.split(' ')[2];
    return `${day} ${month} ${year}`;
}

function generateUniqueID() {
    const now = new Date(document.getElementById('datetime').value);
    const startDate = new Date("2024-07-24");
    const dayDifference = Math.floor((now - startDate) / (1000 * 60 * 60 * 24));
    const uniqueDayNumber = 54206 + dayDifference;
    const uniqueDayString = uniqueDayNumber.toString().padStart(6, '0'); // ตัวเลข 6 หลักที่เพิ่มขึ้นทุกวัน

    const randomString = generateRandomString(13, 3); // สตริงความยาว 13 ตัว มีตัวเลข 3 ตัว

    return uniqueDayString + randomString;
}

function generateRandomString(length, numDigits) {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const digits = '123456789';
    let result = [];

    // สุ่มตัวเลขตามจำนวนที่กำหนด
    for (let i = 0; i < numDigits; i++) {
        result.push(digits.charAt(Math.floor(Math.random() * digits.length)));
    }

    // สุ่มตัวอักษรที่เหลือ
    for (let i = 0; i < length - numDigits; i++) {
        result.push(letters.charAt(Math.floor(Math.random() * letters.length)));
    }

    // สับเปลี่ยนตำแหน่งของตัวอักษรและตัวเลข
    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
    }

    return result.join('');
}

function padZero(num) {
    return num.toString().padStart(2, '0');
}

function updateDisplay() {
    const sendername = document.getElementById('sendername').value;
    const senderaccount = document.getElementById('senderaccount').value;
    const receivername = document.getElementById('receivername').value;
    const receiveraccount = document.getElementById('receiveraccount').value;
    const bank = document.getElementById('bank').value;
    const amount11 = document.getElementById('amount11').value;
    const datetime = document.getElementById('datetime').value;
    const AideMemoire = document.getElementById('AideMemoire').value;
    const selectedImage = document.getElementById('imageSelect').value;
    const QRCode = document.getElementById('QRCode').value;

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
        case 'แลนด์ แอนด์ เฮ้าส์':
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
    backgroundImage.src = '../assets/image/bs/LINEBK1T.jpg';
    backgroundImage.onload = function() {
        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw background image
        ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
        
        // Draw bank logo
        const bankLogo = new Image();
        bankLogo.src = bankLogoUrl;
        bankLogo.onload = function() {

            
            drawText(ctx, `฿${amount11}`, 73, 306,108, 'SFThonburiBold', '#000000', 'left', 1.5, 3, 0, 0, 880, 0);

            // Draw text with custom styles
            drawText(ctx, `${formattedDate} ${formattedTime}`, 73, 382.9,39, 'SFThonburiRegular', '#999999', 'left', 1.5, 3, 0, 0, 880, 0);

            drawText(ctx, `${sendername}`, 805, 503.1,39, 'SFThonburiRegular', '#000000', 'right', 1.5, 3, 0, 0, 880, 0);
            drawText(ctx, `กสิกรไทย ${senderaccount}`, 805, 554,34, 'SFThonburiRegular', '#999999', 'right', 1.5, 2, 0, 0, 880, 0);
            drawImage(ctx, '../assets/image/logo/KBANK.png', 822, 464.5, 95, 95); 


            drawText(ctx, `${receivername}`, 805, 632.4,39, 'SFThonburiRegular', '#000000', 'right', 1.5, 3, 0, 0, 880, 0);
            drawText(ctx, `${bank} ${receiveraccount}`, 805, 682.2,34, 'SFThonburiRegular', '#999999', 'right', 1.5, 2, 0, 0, 880, 0);
            ctx.drawImage(bankLogo, 822,593, 95, 95); // Adjust position and size as needed

            drawText(ctx, `฿0.00`, 911.3, 760,41, 'SFThonburiRegular', '#000000', 'right', 1.5, 3, 0, 0, 880, 0);
            drawText(ctx, `${generateUniqueID()}`, 911.3, 842,41, 'SFThonburiRegular', '#000000', 'right', 1.5, 3, 0, 0, 880, 0);
            drawText(ctx, `${AideMemoire}`, 911.3, 930.7,41, 'SFThonburiRegular', '#000000', 'right', 1.5, 3, 0, 0, 880, 0);


            drawText(ctx, `${QRCode}`, 238.9, 599.0,33, 'SFThonburiRegular', '#4e4e4e', 'left', 1.5, 5, 0, 0, 880, 0);
 
        
          
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
