// ฟังก์ชันเพื่อโหลดฟอนต์
function loadFonts() {
    const fonts = [
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
    updateMonthAndYear(); // อัพเดทเดือนและปีทุกครั้งที่โหลดหน้าเว็บ

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
    const hours = padZero(now.getHours());
    const minutes = padZero(now.getMinutes());
    document.getElementById('datetime').value = `${hours}:${minutes}`;
}

function padZero(number) {
    return number < 10 ? '0' + number : number;
}


//เปลี่ยน monthandyear และ monthmonthyear เป็นว/ด/ปี ปัจจุบัน
function updateMonthAndYear() {
    const today = new Date();
    

    // ชื่อเดือนแบบย่อสำหรับ `monthmonthyear`
    const fullThaiMonths = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];

    const day = today.getDate(); // แสดงวันโดยไม่ใส่ศูนย์ข้างหน้า

    const fullMonth = fullThaiMonths[today.getMonth()]; // ชื่อเดือนย่อ
    const year = today.getFullYear() + 543; // แปลงปีเป็น พ.ศ.
    
    // อัพเดทสำหรับ `monthmonthyear` (รูปแบบ วัน เดือนเต็ม ปี โดยไม่มีศูนย์ข้างหน้าในวัน)
    const monthMonthYear = `${day} ${fullMonth} ${year % 100}`;
    document.getElementById('monthmonthyear').value = monthMonthYear;
}
//

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
    const monthmonthyear = document.getElementById('monthmonthyear').value || '-';
    const money01 = document.getElementById('money01').value || '-';
    
    //1
    const choose1 = document.getElementById('choose1').value || '-';
    let money1 = document.getElementById('money1').value || '-';
    const time1 = document.getElementById('time1').value || '-';

    //2
    const choose2 = document.getElementById('choose2').value || '-';
    let money2 = document.getElementById('money2').value || '-';
    const time2 = document.getElementById('time2').value || '-';
    const remaining2 = document.getElementById('remaining2').value || '-';
    
    //3
    const choose3 = document.getElementById('choose3').value || '-';
    let money3 = document.getElementById('money3').value || '-';
    
    const formattedTime = datetime;
    
    
    
   //1
   if (choose1 === 'ถอนเงิน' && !money1.startsWith('-')) {
    if (money1.startsWith('+')) {
        money1 = '-' + money1.substring(1);
    } else {
        money1 = '-' + money1;
    }
} else if (choose1 === 'รับเงินโอน' && !money1.startsWith('+')) {
    if (money1.startsWith('-')) {
        money1 = '+' + money1.substring(1);
    } else {
        money1 = '+' + money1;
    }
}

document.getElementById('money1').value = money1;


//2
if (choose2 === 'ถอนเงิน' && !money2.startsWith('-')) {
    if (money2.startsWith('+')) {
        money2 = '-' + money2.substring(1);
    } else {
        money2 = '-' + money2;
    }
} else if (choose2 === 'รับเงินโอน' && !money2.startsWith('+')) {
    if (money2.startsWith('-')) {
        money2 = '+' + money2.substring(1);
    } else {
        money2 = '+' + money2;
    }
}

document.getElementById('money2').value = money2;

//3
if (choose3 === 'ถอนเงิน' && !money3.startsWith('-')) {
    if (money3.startsWith('+')) {
        money3 = '-' + money3.substring(1);
    } else {
        money3 = '-' + money3;
    }
} else if (choose3 === 'รับเงินโอน' && !money3.startsWith('+')) {
    if (money3.startsWith('-')) {
        money3 = '+' + money3.substring(1);
    } else {
        money3 = '+' + money3;
    }
}
    document.getElementById('money3').value = money3;



    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    // Load background image
    const backgroundImage = new Image();
    backgroundImage.src = '../assets/image/bs/DepositKKP.jpg';
    backgroundImage.onload = function() {
        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw background image
        ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

        // Draw text with custom styles
        drawText(ctx, `${datetime}`, 63.4, 45.8,22.50, 'SFThonburiSemiBold', '#000000', 'left', 1.5, 3, 0, 0, 800, 0);
        
        //1
        let textColor1 = '#0d7954';
        if (choose1 === 'ถอนเงิน') {
            textColor1 = '#ac4b4b';
        }
        
        //2
        let textColor2 = '#0d7954';
        if (choose2 === 'ถอนเงิน') {
            textColor2 = '#ac4b4b';
        }
        
        
        //3
        let textColor3 = '#0d7954';
        if (choose3 === 'ถอนเงิน') {
            textColor3 = '#ac4b4b';
        }
        
        


            // ปรับขนาดฟอนต์สำหรับ ${amount11}
            drawText(ctx, `${money01}`, 85.5, 185.6,33, 'KanitRegular', '#ffffff', 'left', 1.5, 3, 0, 0, 500, 0);
            // ปรับขนาดฟอนต์สำหรับ THB
            drawText(ctx, `THB`, 85.5 + ctx.measureText(`${money01}`).width + 15, 185.6, 19, 'KanitLight', '#afa3c7', 'left', 1.5, 3, 0, 0, 500, 0);


        drawText(ctx, `ข้อมูล ณ วันที่ ${monthmonthyear}`, 61.6, 574,18.5, 'KanitRegular', '#acabb0', 'left', 1.5, 3, 0, 0, 800, 0);
      
        
        drawText(ctx, `${choose1}`, 159.7, 814.8,17.5, 'KanitMedium', '#47406c', 'left', 1.5, 3, 0, 0, 800, 0);
        drawText(ctx, `${money1} THB`, 490.5, 814.8,19.5, 'KanitMedium', textColor1, 'right', 1.5, 3, 0, 0, 800, 0);
        drawText(ctx, `${time1} น.`, 159.7, 842.2,18.5, 'KanitRegular', '#acabb0', 'left', 1.5, 3, 0, 0, 800, 0);
        drawText(ctx, `คงเหลือ ${money01} THB`, 490.5, 842.2,18.5, 'KanitRegular', '#acabb0', 'right', 1.5, 3, 0, 0, 800, 0);

        drawText(ctx, `${choose2}`, 159.7, 910,17.5, 'KanitMedium', '#47406c', 'left', 1.5, 3, 0, 0, 800, 0);
        drawText(ctx, `${money2} THB`, 490.5, 910,19.5, 'KanitMedium', textColor2, 'right', 1.5, 3, 0, 0, 800, 0);
        drawText(ctx, `${time2} น.`, 159.7, 938.2,18.5, 'KanitRegular', '#acabb0', 'left', 1.5, 3, 0, 0, 800, 0);
        drawText(ctx, `คงเหลือ ${remaining2} THB`, 490.5, 938.2,18.5, 'KanitRegular', '#acabb0', 'right', 1.5, 3, 0, 0, 800, 0);



        drawText(ctx, `${choose3}`, 159.7, 1006.2,17.5, 'KanitMedium', '#47406c', 'left', 1.5, 3, 0, 0, 800, 0);
        drawText(ctx, `${money3} THB`, 490.5, 1006.2,19.5, 'KanitMedium', textColor3, 'right', 1.5, 3, 0, 0, 800, 0);

        

   
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

function drawBattery(ctx, batteryLevel, powerSavingMode) {
    // วาดกรอบแบตเตอรี่ด้วยมุมโค้งมน
    ctx.lineWidth = 2; // กำหนดความหนาของเส้นเป็น 2 พิกเซล
    ctx.strokeStyle = '#9b9b9b'; // กำหนดสีเส้นขอบเป็นสีเทา
    ctx.fillStyle = '#ffffff'; // กำหนดสีพื้นหลังของกรอบแบตเตอรี่เป็นสีขาว



    // กำหนดสีแบตเตอรี่ตามระดับและโหมดประหยัดพลังงาน
    let batteryColor = '#000000'; // สีเขียวสำหรับโหมดปกติ
    if (batteryLevel <= 20) {
        batteryColor = '#ff0000'; // สีแดงสำหรับแบตเตอรี่ต่ำ
    } else if (powerSavingMode) {
        batteryColor = '#fccd0e'; // สีส้มสำหรับโหมดประหยัดพลังงาน
    }

// วาดการเติมแบตเตอรี่
const fillWidth = (batteryLevel / 100) * 29.4; // คำนวณความกว้างของการเติมแบตเตอรี่ตามระดับแบตเตอรี่
const x = 482.25;
const y = 30.2;
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
