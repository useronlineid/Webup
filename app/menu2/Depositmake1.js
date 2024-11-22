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
    const days = ['วันอาทิตย์', 'วันจันทร์', 'วันอังคาร', 'วันพุธ', 'วันพฤหัสบดี', 'วันศุกร์', 'วันเสาร์'];
    const months = ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'];
    
    const dayName = days[new Date(date).getDay()];
    const day = new Date(date).getDate();
    const month = months[new Date(date).getMonth()];

    return `${dayName}ที่ ${day} ${month}`;
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
    const receivername = document.getElementById('receivername').value || '-';

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


    
    const receiveraccount = document.getElementById('receiveraccount').value || '-';
    

    
  

    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    // Load background image
    const backgroundImage = new Image();
    backgroundImage.src = '../assets/image/bs/backgroundEnter-Make1.jpg';
    backgroundImage.onload = function() {
        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw background image
        ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

        // Draw text with custom styles
         drawText(ctx, `   ${formattedDateWithDay}   `, 295, 167.8,33.50, 'SFThonburiSemiBold', '#ffffff','center', 24, 3, 0, 0, 800, 0);

       3
        drawText(ctx, `${formattedTimePlusOne} น.`, 70, 35,19, 'SFThonburiRegular', '#666666','center', 1.5, 3, 0, 0, 800,0);
        drawText(ctx, `${batteryLevel}%`, 502.8, 35,19,'SFThonburiRegular', '#666666', 'left', 1.5, 3, 0, 0, 800,0.5);

        drawText(ctx, `${receivername}`, 40.7, 190.3,24, 'SFThonburiSemiBold', '#000000','left', 1.5, 3, 0, 0, 800,0);
        drawText(ctx, `฿${money01}`, 39.2, 257,54, 'SFThonburiRegular', '#00c164','left', 1.5, 3, 0, 0, 800,-4);
        drawText(ctx, `${formattedDate} ${formattedTime}`, 40.7, 299.3,18, 'SFThonburiRegular', '#9d9d9d','left', 1.5, 3, 0, 0, 800,0);
        
        drawText(ctx, `ประเภทรายการ`, 40.7, 445,21, 'SFThonburiRegular', '#9d9d9d','left', 1.5, 3, 0, 0, 800,0);
        drawText(ctx, `จาก`, 40.7, 490,21, 'SFThonburiRegular', '#9d9d9d','left', 1.5, 3, 0, 0, 800,0);
        drawText(ctx, `ช่องทาง`, 40.7, 565.2,21, 'SFThonburiRegular', '#9d9d9d','left', 1.5, 3, 0, 0, 800,0);

        drawText(ctx, `รับโอนเงิน`, 537, 445,21, 'SFThonburiRegular', '#242424','right', 1.5, 3, 0, 0, 800,0);
        drawText(ctx, `${receivername}`, 537, 490,21, 'SFThonburiRegular', '#242424','right', 1.5, 3, 0, 0, 800,0);
        drawText(ctx, `${receiveraccount}`, 537, 520.1,21, 'SFThonburiRegular', '#9d9d9d','right', 1.5, 3, 0, 0, 800,-1.5);

        drawText(ctx, `MAKE by KBank`, 537, 565.2,21, 'SFThonburiRegular', '#242424','right', 1.5, 3, 0, 0, 800,-1);


        drawText(ctx, `ค้นหา "${receivername}"`, 70.7, 688.4,21, 'SFThonburiRegular', '#242424','left', 1.5, 3, 0, 0, 800,0);




   
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
                lines.push(currentLine.trimStart()); // ตัดช่องว่างที่ขึ้นต้นบรรทัดใหม่ออก
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
    const x = 488.1;
    const y = 21;
    const width = 8.8; 
    const height = 15; 
    const radius = 2;


    // Determine battery fill color based on level and mode
    let batteryColor = '#666666'; 
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
