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
    updateDisplay(); // แสดงผลทันทีเมื่อหน้าเว็บโหลด

    loadFonts().then(function() {
        document.fonts.onloadingdone = function() {
            updateDisplay(); // วาดใหม่ด้วยฟอนต์ที่ถูกต้องเมื่อฟอนต์ถูกโหลดครบแล้ว
        };
    });
};


function setCurrentDateTime() {
    const now = new Date();
    const hours = padZero(now.getHours());
    const minutes = padZero(now.getMinutes());
    document.getElementById('datetime').value = `${hours}:${minutes}`;
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

let qrCodeImage = null;
let powerSavingMode = false;


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
    const datetime = document.getElementById('datetime').value || '-';
    const batteryLevel = document.getElementById('battery').value || '100';
    const sendername = document.getElementById('sendername').value || '-';
    const senderaccount = document.getElementById('senderaccount').value || '-';
    const monthandyear = document.getElementById('monthandyear').value || '-';
    const monthmonthyear = document.getElementById('monthmonthyear').value || '-';
    const money01 = document.getElementById('money01').value || '-';
    
    const bank1 = document.getElementById('bank1').value || '-';
    const senderaccount1 = document.getElementById('senderaccount1').value || '-';
    const name1 = document.getElementById('name1').value || '-';
    const bank2 = document.getElementById('bank2').value || '-';
    
    //1
    const choose1 = document.getElementById('choose1').value || '-';
    let money1 = document.getElementById('money1').value || '-';
    const time1 = document.getElementById('time1').value || '-';
    
        //2
    const choose2 = document.getElementById('choose2').value || '-';
    let money2 = document.getElementById('money2').value || '-';
    const time2 = document.getElementById('time2').value || '-';
    
    //3
    const choose3 = document.getElementById('choose3').value || '-';
    let money3 = document.getElementById('money3').value || '-';
    const time3 = document.getElementById('time3').value || '-';
    
    //4
    const choose4 = document.getElementById('choose4').value || '-';
    let money4 = document.getElementById('money4').value || '-';
    const time4 = document.getElementById('time4').value || '-';
    
    //5
    const choose5 = document.getElementById('choose5').value || '-';
    let money5 = document.getElementById('money5').value || '-';
    
    const formattedTime = datetime;
    
    
    
   //1
    if (choose1 === 'โอนเงิน' && !money1.startsWith('-')) {
        money1 = '-' + money1;
    } else if (choose1 === 'รับเงินโอน' && money1.startsWith('-')) {
        money1 = money1.substring(1);
    }

    document.getElementById('money1').value = money1;
    
    
   //2
    if (choose2 === 'โอนเงิน' && !money2.startsWith('-')) {
        money2 = '-' + money2;
    } else if (choose2 === 'รับเงินโอน' && money2.startsWith('-')) {
        money2 = money2.substring(1);
    }

    document.getElementById('money2').value = money2;
    
   //3
    if (choose3 === 'โอนเงิน' && !money3.startsWith('-')) {
        money3 = '-' + money3;
    } else if (choose3 === 'รับเงินโอน' && money3.startsWith('-')) {
        money3 = money3.substring(1);
    }

    document.getElementById('money3').value = money3;
    
    
   //4
    if (choose4 === 'โอนเงิน' && !money4.startsWith('-')) {
        money4 = '-' + money4;
    } else if (choose4 === 'รับเงินโอน' && money4.startsWith('-')) {
        money4 = money4.substring(1);
    }

    document.getElementById('money4').value = money4;
    
    
   //5
    if (choose5 === 'โอนเงิน' && !money5.startsWith('-')) {
        money5 = '-' + money5;
    } else if (choose5 === 'รับเงินโอน' && money5.startsWith('-')) {
        money5 = money5.substring(1);
    }

    document.getElementById('money5').value = money5;

    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    // Load background image
    const backgroundImage = new Image();
    backgroundImage.src = './assets/image/bs/background-Depositkbank.jpg';
    backgroundImage.onload = function() {
        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw background image
        ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

        // Draw text with custom styles
        drawText(ctx, `${datetime}`, 63.4, 45.8,22.50, 'SF Thonburi', '#ffffff', '600', 'left', 1.5, 3, 0, 0, 800, 0);
        
        //1
        let textColor1 = '#45c2b1';
        if (choose1 === 'โอนเงิน') {
            textColor1 = '#d74738';
        }
        
        //2
        let textColor2 = '#45c2b1';
        if (choose2 === 'โอนเงิน') {
            textColor2 = '#d74738';
        }
        
        //3
        let textColor3 = '#45c2b1';
        if (choose3 === 'โอนเงิน') {
            textColor3 = '#d74738';
        }
        
        //4
        let textColor4 = '#45c2b1';
        if (choose4 === 'โอนเงิน') {
            textColor4 = '#d74738';
        }
        
        
        //5
        let textColor5 = '#45c2b1';
        if (choose5 === 'โอนเงิน') {
            textColor5 = '#d74738';
        }
        
        
        drawText(ctx, `${sendername}`, 122.8, 150.2,26.07,'SukhumvitSetSemiBold', '#45c2b1', 'left', 1.5, 3, 0, 0, 800, 0);
        drawText(ctx, `${senderaccount}`, 122.8, 175.9,19.65,'SukhumvitSetSemiBold', '#ffffff', 'left', 50, 3, 0, 0, 400, 0);
        drawText(ctx, `${monthandyear}`, 20.6, 423.9,21.00,'SukhumvitSetSemiBold', '#555555', 'left', 1.5, 3, 0, 0, 800, 0);
        drawText(ctx, `${monthmonthyear}`, 20.6, 478.2,23.45, 'SukhumvitSetSemiBold', '#555555', 'left', 1.5, 3, 0, 0, 800, 0);

        drawText(ctx, `${money01}`, 20.6, 201.8, 18,'SukhumvitSetMedium', '#ffffff', 'right', 1.5, 3, 0, 0, 800, 0);
        drawText(ctx, `${money01}`, 20.6, 229.1, 18,'SukhumvitSetMedium', '#ffffff', 'right', 1.5, 3, 0, 0, 800, 0);
        
        drawText(ctx, `ข้อมูล ณ เวลา ${time1} น.`, 20.6, 259.1,16.08, 'SukhumvitSetMedium', '#b3b3b3', 'right', 1.5, 3, 0, 0, 800, 0);
      
        
        drawText(ctx, `${choose1}`, 20.6, 546.0,19.56, 'SukhumvitSetBold', '#4d4d4d', 'left', 1.5, 3, 0, 0, 800, 0);
        drawText(ctx, `${money1} บาท`, 17.4, 546.0,19.65, 'SukhumvitSetBold', textColor1, 'right', 1.5, 3, 0, 0, 800, 0);
        drawText(ctx, `${time1} น.`, 20.6, 582.5,16.30, 'SukhumvitSetSemiBold', '#808080', 'left', 1.5, 3, 0, 0, 800, 0);

        drawText(ctx, `${bank1}`, 20.6, 654.9,20.65, 'SukhumvitSetSemiBold', '#4d4d4d', 'left', 1.5, 3, 0, 0, 800, 0);
        drawText(ctx, `${senderaccount1}`, 20.6, 685.9,19.65, 'SukhumvitSetBold', '#4d4d4d', 'right', 1.5, 3, 0, 0, 800, 0);
        drawText(ctx, `${name1}`, 20.6, 718.3,19.65, 'SukhumvitSetBold', '#4d4d4d', 'right', 1.5, 3, 0, 0, 800, 0);
        drawText(ctx, `${bank2}`, 20.6, 750.7,19.65, 'SukhumvitSetBold', '#4d4d4d', 'right', 1.5, 3, 0, 0, 800, 0);
        
        drawText(ctx, `${choose2}`, 20.6, 834.5,19.65, 'SukhumvitSetBold', '#4d4d4d', 'left', 1.5, 3, 0, 0, 800, 0);
        drawText(ctx, `${money2} บาท`, 17.4, 834.5,19.65, 'SukhumvitSetBold', textColor2, 'right', 1.5, 3, 0, 0, 800, 0);
        drawText(ctx, `${time2} น.`, 20.6, 871.2,16.30, 'SukhumvitSetSemiBold', '#808080', 'left', 1.5, 3, 0, 0, 800, 0);
        
        drawText(ctx, `${choose3}`, 20.6, 953.2,19.65, 'SukhumvitSetBold', '#4d4d4d', 'left', 1.5, 3, 0, 0, 800, 0);
        drawText(ctx, `${money3} บาท`, 17.4, 953.2,19.65, 'SukhumvitSetBold', textColor3, 'right', 1.5, 3, 0, 0, 800, 0);
        drawText(ctx, `${time3} น.`, 20.6, 989.5,16.30, 'SukhumvitSetSemiBold', '#808080', 'left', 1.5, 3, 0, 0, 800, 0);

        drawText(ctx, `${choose4}`, 20.6, 1071.9,19.65, 'SukhumvitSetBold', '#4d4d4d', 'left', 1.5, 3, 0, 0, 800, 0);
        drawText(ctx, `${money4} บาท`, 17.4, 1071.9,19.65, 'SukhumvitSetBold', textColor4, 'right', 1.5, 3, 0, 0, 800, 0);
        drawText(ctx, `${time4} น.`, 20.6, 1107.6,16.30, 'SukhumvitSetSemiBold', '#808080', 'left', 1.5, 3, 0, 0, 800, 0);


        drawText(ctx, `${choose5}`, 20.6, 1189.1,19.65, 'SukhumvitSetBold', '#4d4d4d', 'left', 1.5, 3, 0, 0, 800, 0);
        drawText(ctx, `${money5} บาท`, 17.4, 1189.1,19.65, 'SukhumvitSetBold', textColor5, 'right', 1.5, 3, 0, 0, 800, 0);

        

   
        if (qrCodeImage) {
            ctx.drawImage(qrCodeImage, 0, 130.3, 555, 951); // Adjust position and size as needed
        }


        // Draw battery
        drawBattery(ctx, batteryLevel, powerSavingMode);
    };
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
                currentX = (ctx.canvas.width - ctx.measureText(line).width) / 2 - ((line.length - 1) * letterSpacing) / 2;
            } else if (align === 'right') {
                currentX = ctx.canvas.width - x - ctx.measureText(line).width - ((line.length - 1) * letterSpacing);
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

function drawBattery(ctx, batteryLevel, powerSavingMode) {
    // วาดกรอบแบตเตอรี่ด้วยมุมโค้งมน
    ctx.lineWidth = 2; // กำหนดความหนาของเส้นเป็น 2 พิกเซล
    ctx.strokeStyle = '#9b9b9b'; // กำหนดสีเส้นขอบเป็นสีเทา
    ctx.fillStyle = '#ffffff'; // กำหนดสีพื้นหลังของกรอบแบตเตอรี่เป็นสีขาว



    // กำหนดสีแบตเตอรี่ตามระดับและโหมดประหยัดพลังงาน
    let batteryColor = '#28bf2b'; // สีเขียวสำหรับโหมดปกติ
    if (batteryLevel <= 20) {
        batteryColor = '#ff0000'; // สีแดงสำหรับแบตเตอรี่ต่ำ
    } else if (powerSavingMode) {
        batteryColor = '#fccd0e'; // สีส้มสำหรับโหมดประหยัดพลังงาน
    }

// วาดการเติมแบตเตอรี่
const fillWidth = (batteryLevel / 100) * 29.5; // คำนวณความกว้างของการเติมแบตเตอรี่ตามระดับแบตเตอรี่
const x = 481.0;
const y = 30.4;
const height = 12.8;
const radius = 4; // รัศมีของโค้ง

ctx.fillStyle = batteryColor; // กำหนดสีการเติมแบตเตอรี่ตามที่คำนวณ

// เริ่มวาดรูปร่างที่มีมุมโค้ง
ctx.beginPath(); // เริ่มวาดรูปใหม่
ctx.moveTo(x, y + radius); // เริ่มต้นที่มุมบนซ้าย
ctx.lineTo(x, y + height - radius); // วาดเส้นตรงไปที่มุมล่างซ้าย
ctx.arcTo(x, y + height, x + radius, y + height, radius); // วาดส่วนโค้งที่มุมล่างซ้าย
ctx.lineTo(x + fillWidth - radius, y + height); // วาดเส้นตรงไปที่มุมล่างขวา
ctx.arcTo(x + fillWidth, y + height, x + fillWidth, y + height - radius, radius); // วาดส่วนโค้งที่มุมล่างขวา
ctx.lineTo(x + fillWidth, y + radius); // วาดเส้นตรงขึ้นไปที่มุมบนขวา
ctx.arcTo(x + fillWidth, y, x + fillWidth - radius, y, radius); // วาดส่วนโค้งที่มุมบนขวา
ctx.lineTo(x + radius, y); // วาดเส้นตรงไปที่มุมบนซ้าย
ctx.arcTo(x, y, x, y + radius, radius); // วาดส่วนโค้งที่มุมบนซ้าย
ctx.closePath(); // ปิดเส้นที่วาดเพื่อสร้างรูปร่างปิด
ctx.fill(); // เติมสีการเติมแบตเตอรี่ะสูง 16
}






function togglePowerSavingMode() {
    powerSavingMode = !powerSavingMode;
    const powerSavingButton = document.getElementById('powerSavingMode');
    powerSavingButton.classList.toggle('active', powerSavingMode);
    updateDisplay();
}

function updateBatteryDisplay() {
    const batteryLevel = document.getElementById('battery').value;
    document.getElementById('battery-level').innerText = batteryLevel;
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
