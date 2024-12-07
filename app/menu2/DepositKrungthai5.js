// ฟังก์ชันเพื่อโหลดฟอนต์
function loadFonts() {
    const fonts = [
        //SFThonburi
        new FontFace('SFThonburiLight', 'url(../assets/fonts/SFThonburi.woff)'),
        new FontFace('SFThonburiRegular', 'url(../assets/fonts/SFThonburi-Regular.woff)'),
        new FontFace('SFThonburiSemiBold', 'url(../assets/fonts/SFThonburi-Semibold.woff)'),
        new FontFace('SFThonburiBold', 'url(../assets/fonts/SFThonburi-Bold.woff)'),

        //sarabun
        new FontFace('SarabunThin', 'url(../assets/fonts/Sarabun-Thin.woff)'),
        new FontFace('SarabunExtraLight', 'url(../assets/fonts/Sarabun-ExtraLight.woff)'),
        new FontFace('SarabunLight', 'url(../assets/fonts/Sarabun-Light.woff)'),
        new FontFace('SarabunRegular', 'url(../assets/fonts/Sarabun-Regular.woff)'),
        new FontFace('SarabunMedium', 'url(../assets/fonts/Sarabun-Medium.woff)'),
        new FontFace('SarabunSemiBold', 'url(../assets/fonts/Sarabun-SemiBold.woff)'),
        new FontFace('SarabunBold', 'url(../assets/fonts/Sarabun-Bold.woff)'),
        new FontFace('SarabunExtraBold', 'url(../assets/fonts/Sarabun-ExtraBold.woff)'),
    ];

    // โหลดฟอนต์ทั้งหมดและเพิ่มเข้าไปที่ document
    return Promise.all(fonts.map(font => font.load())).then(function(loadedFonts) {
        loadedFonts.forEach(function(font) {
            document.fonts.add(font);
        });
    });
}

// กำหนดตัวแปรสำหรับเก็บรูปภาพแบตเตอรี่
let batteryIcon = new Image();
batteryIcon.src = '../assets/image/icon/icona.png'; // ตรวจสอบนามสกุลไฟล์ให้ถูกต้อง เช่น .png หรือ .jpg

// รอให้รูปภาพโหลดเสร็จก่อนที่จะวาดบนแคนวาส
batteryIcon.onload = function() {
    updateDisplay(); // อัปเดตการแสดงผลหลังจากโหลดรูปภาพเสร็จ
};

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
    
    const formattedDateTime = localDateTime.substring(0, 16); // ตัดส่วนวินาทีออก
    document.getElementById('datetime').value = formattedDateTime;
    
    // ตั้งค่าเวลาที่มากกว่า 1 นาที
    const oneMinuteLater = new Date(now.getTime() + 60000); // เพิ่ม 1 นาที (60,000 มิลลิวินาที)
    const hours = oneMinuteLater.getHours().toString().padStart(2, '0');
    const minutes = oneMinuteLater.getMinutes().toString().padStart(2, '0');
    const formattedTimePlusOne = `${hours}:${minutes}`;
    document.getElementById('datetime_plus_one').value = formattedTimePlusOne;
}


function padZero(number) {
    return number < 10 ? '0' + number : number;
}

function formatDateWithDay(date) {
    const days = ['อา.', 'จ.', 'อ.', 'พ.', 'พฤ.', 'ศ.', 'ส.'];
    const months = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];
    
    const dayName = days[new Date(date).getDay()];
    const day = new Date(date).getDate();
    const month = months[new Date(date).getMonth()];

    return `${dayName} ${day} ${month}`;
}


function formatDate(date) {
    const options = { day: 'numeric', month: 'short', year: '2-digit' };
    let formattedDate = new Date(date).toLocaleDateString('th-TH', options);
    formattedDate = formattedDate.replace(/ /g, ' ').replace(/\./g, '');
    const months = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];
    const day = parseInt(formattedDate.split(' ')[0]); // แปลงเป็น int เพื่อเอาเลข 0 ออก
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
    const datetimePlusOne = document.getElementById('datetime_plus_one').value || '-';
    const batteryLevel = document.getElementById('battery').value || '100';
    const money01 = document.getElementById('money01').value || '-';
    
    const formattedDate = formatDate(datetime.substring(0, 10)); // แปลงวันที่เป็นรูปแบบ DD/MM/YY
    const formattedDateWithDay = formatDateWithDay(datetime.substring(0, 10)); // แปลงวันที่เป็นรูปแบบ วันอังคารที่ 3 กันยายน
    const formattedTime = datetime.substring(11, 16); // เอาเฉพาะ ชั่วโมง:นาที
    const formattedTimePlusOne = datetimePlusOne; // อยู่ในรูปแบบ HH:mm แล้ว



    // คำนวณความต่างของเวลาและสร้างข้อความ timeMessage สำหรับเงินเข้า 1
    let timeDifference = Math.floor((new Date(`1970-01-01T${formattedTimePlusOne}:00`) - new Date(`1970-01-01T${formattedTime}:00`)) / 60000);
    let timeMessage = "";

    if (timeDifference >= 60) {
        let hours = Math.floor(timeDifference / 60);
        timeMessage = `${hours} ชั่วโมงที่แล้ว`;
    } else if (timeDifference > 1) {
        timeMessage = `${timeDifference} นาทีที่แล้ว`;
    } else if (timeDifference === 1) {
        timeMessage = "1 นาทีที่แล้ว";
    } else {
        timeMessage = "ตอนนี้";
    }


    
    const senderaccount1 = document.getElementById('senderaccount1').value || '-';
    const bank1 = document.getElementById('bank1').value || '-';
    const receiveraccount = document.getElementById('receiveraccount').value || '-';


    
  

    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    // Load background image
    const backgroundImage = new Image();
    backgroundImage.src = '../assets/image/bs/backgroundEnter-KT6.1.jpg';
    backgroundImage.onload = function() {
        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw background image
        ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
        drawText(ctx, `${batteryLevel}%`, 521.8, 61.5,18,'SarabunRegular', '#414141', 'right', 1.5, 3, 0, 0, 800,0);
    // ตั้งค่า font ให้ตรงกับข้อความที่วาด
    ctx.font = '18px SarabunRegular';

    // ข้อความแบตเตอรี่
    const batteryText = `${batteryLevel}%`;

    // วัดความกว้างของข้อความแบตเตอรี่
    const textMetrics = ctx.measureText(batteryText);
    const textWidth = textMetrics.width;

    // กำหนดระยะห่างจากข้อความถึงรูปภาพ
    const spacing = 10; // 10 พิกเซล

    // กำหนดขนาดรูปภาพที่ต้องการวาด
    const imageWidth = 110; // ปรับขนาดตามต้องการ
    const imageHeight = 42; // ปรับขนาดตามต้องการ

    // คำนวณตำแหน่งของรูปภาพ
    const imageX = 531.8 - textWidth - spacing - imageWidth;
    const imageY = 55.5 - (imageHeight / 2); // ปรับตำแหน่งตามแนวแกน Y ให้ตรงกับข้อความ

    // ตรวจสอบว่ารูปภาพถูกโหลดแล้วหรือยัง
    if (batteryIcon.complete) {
        ctx.drawImage(batteryIcon, imageX, imageY, imageWidth, imageHeight);
    }

        // Draw text with custom styles
         drawText(ctx, `   ${formattedDateWithDay}   `, 36.8, 119,27.5, 'SarabunRegular', '#2c2c2c','left', 24, 3, 0, 0, 800, 0);

       3
        drawText(ctx, `${formattedTimePlusOne}`, 62, 60,20, 'SarabunMedium', '#2c2c2c','center', 1.5, 3, 0, 0, 800,0);

        drawText(ctx, `รับเงินสำเร็จ`, 45.8, 435,23, 'SarabunMedium', '#282828', 'left', 1.5, 3, 0, 0, 800, 0.25);
        drawText(ctx, `${formattedTime}`, 128, 390.3,18.50, 'SFThonburiRegular', '#585858', 'left', 1.5, 3, 0, 0, 800, 0);

        drawText(ctx, `ได้รับ +${money01} บาท เข้าบัญชี ${senderaccount1} จากบัญชี ${bank1} ${receiveraccount}
        `, 45.8, 463.9,20.50, 'SarabunRegular', '#525252', 'left', 30, 3, 0, 0, 430, 0.25);






   
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
    // Set battery outline and fill styles
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#9b9b9b'; 
    ctx.fillStyle = '#ffffff'; 

    // Draw battery container (rounded rectangle)
    const x = 525.2;
    const y = 48.1;
    const width = 11.7; 
    const height = 13.9; 
    const radius = 1;


    // Determine battery fill color based on level and mode
    let batteryColor = '#414141'; 
    if (batteryLevel <= 20) {
        batteryColor = '#ff0000'; 
    } else if (powerSavingMode) {
        batteryColor = '#fccd0e'; 
    }

    // Draw vertical battery fill
    const fillHeight = (batteryLevel / 100) * height; // Scale fill based on battery level
    const fillY = y + height - fillHeight; // Start filling from the bottom

    ctx.fillStyle = batteryColor;
    ctx.beginPath();
    ctx.moveTo(x + radius, fillY); 
    ctx.lineTo(x + width - radius, fillY); 
    ctx.arcTo(x + width, fillY, x + width, fillY + radius, radius); 
    ctx.lineTo(x + width, y + height - radius); 
    ctx.arcTo(x + width, y + height, x + width - radius, y + height, radius);
    ctx.lineTo(x + radius, y + height); 
    ctx.arcTo(x, y + height, x, y + height - radius, radius); 
    ctx.lineTo(x, fillY + radius); 
    ctx.arcTo(x, fillY, x + radius, fillY, radius); 
    ctx.closePath();
    ctx.fill();
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
