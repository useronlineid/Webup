// ฟังก์ชันเพื่อโหลดฟอนต์
function loadFonts() {
    const fonts = [
        //SFThonburi
        new FontFace('SFThonburiLight', 'url(../assets/fonts/SFThonburi.woff)'),
        new FontFace('SFThonburiRegular', 'url(../assets/fonts/SFThonburi-Regular.woff)'),
        new FontFace('SFThonburiSemiBold', 'url(../assets/fonts/SFThonburi-Semibold.woff)'),
        new FontFace('SFThonburiBold', 'url(../assets/fonts/SFThonburi-Bold.woff)'),
        new FontFace('SFThonburiExtraBold', 'url(../assets/fonts/SFThonburi-Bold-ExtraBold.woff)'),

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
    const formattedDateTime = localDateTime.substring(0, 16); // Remove seconds
    document.getElementById('datetime').value = formattedDateTime;
    document.getElementById('datetime2').value = formattedDateTime;

    // Set notification time one minute later
    const oneMinuteLater = new Date(now.getTime() + 60000);
    const hours = oneMinuteLater.getHours().toString().padStart(2, '0');
    const minutes = oneMinuteLater.getMinutes().toString().padStart(2, '0');
    const formattedTimePlusOne = `${hours}:${minutes}`;
    document.getElementById('datetime_plus_one').value = formattedTimePlusOne;
}

function padZero(number) {
    return number < 10 ? '0' + number : number;
}

function formatDateWithDay(date) {
    const days = ['วันอาทิตย์', 'วันจันทร์', 'วันอังคาร', 'วันพุธ', 'วันพฤหัสบดี', 'วันศุกร์', 'วันเสาร์'];
    const months = ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'];
    
    const dayName = days[new Date(date).getDay()];
    const day = new Date(date).getDate();
    const month = months[new Date(date).getMonth()];

    return `${dayName}ที่ ${day} ${month}`;
}


function formatDate(date) {
    const day = padZero(new Date(date).getDate());
    const month = padZero(new Date(date).getMonth() + 1);
    const year = "20" + new Date(date).getFullYear().toString().substr(-2);
    return `${day}/${month}/${year}`;
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
    const batteryLevel = document.getElementById('battery').value || '100';
    const datetimePlusOne = document.getElementById('datetime_plus_one').value || '-';
    const senderaccount = document.getElementById('senderaccount').value || '-';
    const backgroundSelect = document.getElementById('backgroundSelect').value || '';

    //รายการ 1 
    const senderaccount1 = document.getElementById('senderaccount1').value || '-';
    const name1 = document.getElementById('name1').value || '-';
    const bank1 = document.getElementById('bank1').value || '-';
    const money01 = document.getElementById('money01').value || '-';
    const remaining1 = document.getElementById('remaining1').value || '-';
    const datetime = document.getElementById('datetime').value || '-';

    // Transaction 2 Inputs
    const senderaccount2 = document.getElementById('senderaccount2').value || '-';
    const name2 = document.getElementById('name2').value || '-';
    const bank2 = document.getElementById('bank2').value || '-';
    const money02 = document.getElementById('money02').value || '-';
    const remaining2 = document.getElementById('remaining2').value || '-';
    const datetime2 = document.getElementById('datetime2').value || '-';

    // Time Formatting
    const formattedDate1 = formatDate(datetime.substring(0, 10));
    const formattedTime1 = datetime.substring(11, 16);

    const formattedDate2 = formatDate(datetime2.substring(0, 10));
    const formattedTime2 = datetime2.substring(11, 16);

    const formattedTimePlusOne = datetimePlusOne;


    
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    // Load background image
    const backgroundImage = new Image();
    backgroundImage.src = backgroundSelect;
    backgroundImage.onload = function() {
        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw background image
        ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

        // Draw notification time
        drawText(ctx, `${formattedTimePlusOne}`, 98, 49, 23, 'SFThonburiSemiBold', '#ffffff', 'center', 1.5, 3, 0, 0, 800, -0.25);

        // Draw Transaction 1
        drawText(ctx, `รายการเงินเข้า`, 85.7, 200.9, 22.3, 'SFThonburiSemiBold', '#3d3d3d', 'left', 1.5, 3, 0, 0, 1250, 0);
        drawText(ctx, `+${money01} บาท`, 85.7, 238, 25, 'SFThonburiBold', '#881cff', 'left', 1.5, 3, 0, 0, 1250,0);
        drawText(ctx, `${name1} ${senderaccount1}`, 453.5, 283.8, 19.4, 'SFThonburiSemiBold', '#3d3d3d', 'right', 1.5, 3, 0, 0, 1250, -1);
        drawText(ctx, `${bank1}`, 453.5, 316, 19.4, 'SFThonburiSemiBold', '#3d3d3d', 'right', 1.5, 3, 0, 0, 1250, -1);
        drawText(ctx, `${senderaccount}`, 453.5, 353.5, 19.4, 'SFThonburiSemiBold', '#3d3d3d', 'right', 1.5, 3, 0, 0, 1250, -1);
        drawText(ctx, `${formattedDate1} ${formattedTime1}`, 453.5, 391.5, 19.4, 'SFThonburiSemiBold', '#3d3d3d', 'right', 1.5, 3, 0, 0, 1250, -1);
        drawText(ctx, `${remaining1} บาท`, 453.5, 438, 19.4, 'SFThonburiSemiBold', '#3d3d3d', 'right', 1.5, 3, 0, 0, 1250, -1);

        drawText(ctx, `${formattedTime1}`, 483, 610, 13, 'SFThonburiRegular', '#1b3422', 'left', 1.5, 3, 0, 0, 1250, -0.25);

        // Draw Transaction 2
        drawText(ctx, `รายการเงินเข้า`, 85.7, 734, 22.3, 'SFThonburiSemiBold', '#3d3d3d', 'left', 1.5, 3, 0, 0, 1250, 0);
        drawText(ctx, `+${money02} บาท`, 85.7, 770, 25, 'SFThonburiBold', '#881cff', 'left', 1.5, 3, 0, 0, 1250,0);
        drawText(ctx, `${name2} ${senderaccount2}`, 453.5, 817, 19.4, 'SFThonburiSemiBold', '#3d3d3d', 'right', 1.5, 3, 0, 0, 1250, -1);
        drawText(ctx, `${bank2}`, 453.5, 848.7, 19.4, 'SFThonburiSemiBold', '#3d3d3d', 'right', 1.5, 3, 0, 0, 1250, -1);
        drawText(ctx, `${senderaccount}`, 453.5, 886.8, 19.4, 'SFThonburiSemiBold', '#3d3d3d', 'right', 1.5, 3, 0, 0, 1250, -1);
        drawText(ctx, `${formattedDate2} ${formattedTime2}`, 453.5, 924.9, 19.4, 'SFThonburiSemiBold', '#3d3d3d', 'right', 1.5, 3, 0, 0, 1250, -1);
        drawText(ctx, `${remaining2} บาท`, 453.5, 971, 19.4, 'SFThonburiSemiBold', '#3d3d3d', 'right', 1.5, 3, 0, 0, 1250, -1);

        drawText(ctx, `${formattedTime2}`, 483, 1142, 13, 'SFThonburiRegular', '#1b3422', 'left', 1.5, 3, 0, 0, 1250, -0.25);
        // Draw QR code if available
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


function drawBattery(ctx, batteryLevel, powerSavingMode) {
    // วาดกรอบแบตเตอรี่ด้วยมุมโค้งมน
    ctx.lineWidth = 2; // กำหนดความหนาของเส้นเป็น 2 พิกเซล
    ctx.strokeStyle = '#9b9b9b'; // กำหนดสีเส้นขอบเป็นสีเทา
    ctx.fillStyle = '#ffffff'; // กำหนดสีพื้นหลังของกรอบแบตเตอรี่เป็นสีขาว

    // กำหนดสีแบตเตอรี่ตามระดับและโหมดประหยัดพลังงาน
    let batteryColor = '#ffffff'; // สีเขียวสำหรับโหมดปกติ
    if (batteryLevel <= 20) {
        batteryColor = '#ff0000'; // สีแดงสำหรับแบตเตอรี่ต่ำ
    } else if (powerSavingMode) {
        batteryColor = '#fccd0e'; // สีส้มสำหรับโหมดประหยัดพลังงาน
    }

    // วาดการเติมแบตเตอรี่
    const fillWidth = (batteryLevel / 100) * 33.5; // คำนวณความกว้างของการเติมแบตเตอรี่ตามระดับแบตเตอรี่
    const x = 498.5;
    const y = 32.5;
    const height = 14.5;
    const radius = 5; // รัศมีของโค้ง

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
    ctx.fill(); // เติมสีการเติมแบตเตอรี่

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
