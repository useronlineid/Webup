// ฟังก์ชันเพื่อโหลดฟอนต์
function loadFonts() {
    const fonts = [
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

// Define images data
const imagesLeft = [
    {
        name: 'Line',
        src: '../assets/image/icon/Z-Line.png',
        width: 17,
        height: 17,
        y: 22
    },
    {
        name: 'Messenger',
        src: '../assets/image/icon/Z-Mess.png',
        width: 17,
        height: 17,
        y: 22
    },
    {
        name: 'Call in',
        src: '../assets/image/icon/Z-Call.png',
        width: 17,
        height: 17,
        y: 22
    },
    {
        name: 'Kbank',
        src: '../assets/image/icon/Z-Kbank.png',
        width: 17,
        height: 17,
        y: 22
    },
    {
        name: 'Shopee',
        src: '../assets/image/icon/Z-Shopee.png',
        width: 17,
        height: 17,
        y: 22
    },
    {
        name: 'Instagram',
        src: '../assets/image/icon/Z-Instagram.png',
        width: 17,
        height: 17,
        y: 22
    },
    {
        name: 'Facebook',
        src: '../assets/image/icon/Z-Facebook.png',
        width: 17,
        height: 17,
        y: 22
    },
    {
        name: 'Youtube',
        src: '../assets/image/icon/Z-Youtube.png',
        width: 17,
        height: 17,
        y: 22
    },
    {
        name: 'Netflix',
        src: '../assets/image/icon/Z-Net.png',
        width: 17,
        height: 17,
        y: 22
    },
    {
        name: 'Amazon',
        src: '../assets/image/icon/Z-Amazon.png',
        width: 17,
        height: 17,
        y: 22
    },
    {
        name: 'X',
        src: '../assets/image/icon/Z-X.png',
        width: 17,
        height: 17,
        y: 22
    },
    {
        name: 'Telegram',
        src: '../assets/image/icon/Z-Telegram.png',
        width: 17,
        height: 17,
        y: 22
    },
    {
        name: 'Gmail',
        src: '../assets/image/icon/Z-Gmail.png',
        width: 17,
        height: 17,
        y: 22
    },
    {
        name: 'Nba',
        src: '../assets/image/icon/Z-Nba.png',
        width: 17,
        height: 17,
        y: 22
    },
    {
        name: 'Whatsapp',
        src: '../assets/image/icon/Z-Whatsapp.png',
        width: 17,
        height: 17,
        y: 22
    }
];

// Define images data for right to left images
const imagesRight = [
    {
        name: 'Wifi',
        src: '../assets/image/icon/Z-Wifi.png',
        width: 17,
        height: 17,
        y: 22
    },
    {
        name: 'Z-N',
        src: '../assets/image/icon/Z-N.png',
        width: 17,
        height: 17,
        y: 22
    },
    {
        name: 'Z-S',
        src: '../assets/image/icon/Z-S.png',
        width: 17,
        height: 17,
        y: 22
    },
    {
        name: 'Bluetooth',
        src: '../assets/image/icon/Z-Bluetooth.png',
        width: 17,
        height: 17,
        y: 22
    }
];

// Initial x positions for images
const initialXLeft = 110;   // Starting x position for images drawn from left to right
const initialXRight = 442;   // Starting x position for images drawn from right to left
// Spacing between images
const xSpacingLeft = 27;  // Adjusted spacing for left images
const xSpacingRight = 24; // Adjusted spacing for right images

// Arrays to keep track of the order in which images are selected
let selectedImageOrderLeft = [];
let selectedImageOrderRight = [];

// Function to handle checkbox changes for left images
function checkboxChangedLeft(checkbox) {
    if (checkbox.checked) {
        // Add to the end of the selection order
        selectedImageOrderLeft.push(checkbox.value);
    } else {
        // Remove from the selection order
        selectedImageOrderLeft = selectedImageOrderLeft.filter(name => name !== checkbox.value);
    }
    updateDisplay();
}

// Function to handle checkbox changes for right images
function checkboxChangedRight(checkbox) {
    if (checkbox.checked) {
        // Add to the end of the selection order
        selectedImageOrderRight.push(checkbox.value);
    } else {
        // Remove from the selection order
        selectedImageOrderRight = selectedImageOrderRight.filter(name => name !== checkbox.value);
    }
    updateDisplay();
}


function updateDisplay() {
    const coin = document.getElementById('coin').value || '-';
    const website = document.getElementById('website').value || '-';
    const datetime = document.getElementById('datetime').value || '-';
    const QRCode = document.getElementById('QRCode').value || '';
    const batteryLevel = document.getElementById('battery').value || '100';
    const formattedTime = datetime;


    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    
    // Load background image
    const backgroundImage = new Image();
    backgroundImage.src = '../assets/image/bs/A-android1.jpg';
    backgroundImage.onload = function() {
        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw background image
        ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
        drawImage(ctx, '../assets/image/icon/Z-Volte.png', 452,22,17, 17);  
        // Draw text with custom styles
        drawText(ctx, `${datetime} น.`, 26.6, 38.3,20, 'SFThonburiRegular', '#767676', 'left', 1.5, 3, 0, 0, 800, 0);
        
        drawText(ctx, `${coin}`, 26.6,69.1,21.3, 'SFThonburiBold', '#101011', 'left', 1.5, 3, 0, 0, 800, -0.50);
        drawText(ctx, `${website}`, 26.6, 88,16.0, 'SFThonburiRegular', '#929292', 'left', 1.5, 1, 0, 0, 800, 0);
        

        drawText(ctx, `${QRCode}`, 238.9, 599.0,33, 'SFThonburiRegular', '#4e4e4e', 'left', 1.5, 5, 0, 0, 500, 0);
        

   
        if (qrCodeImage) {
            ctx.drawImage(qrCodeImage, 0, 106.5, 571, 955); // Adjust position and size as needed
        }

        // Draw selected images based on selection order
        drawSelectedImages(ctx);


        // Draw battery
        drawBattery(ctx, batteryLevel, powerSavingMode);
    };
}

function drawSelectedImages(ctx) {
    // Draw images from the left set
    let selectedImagesLeft = selectedImageOrderLeft.map(name => imagesLeft.find(img => img.name === name));
    for (let i = 0; i < selectedImagesLeft.length; i++) {
        let imgData = selectedImagesLeft[i];
        let x = initialXLeft + i * xSpacingLeft;
        drawImage(ctx, imgData.src, x, imgData.y, imgData.width, imgData.height);
    }

    // Draw images from the right set
    let selectedImagesRight = selectedImageOrderRight.map(name => imagesRight.find(img => img.name === name));
    for (let i = 0; i < selectedImagesRight.length; i++) {
        let imgData = selectedImagesRight[i];
        let x = initialXRight - i * xSpacingRight - imgData.width; // Subtract imgData.width to align images properly
        drawImage(ctx, imgData.src, x, imgData.y, imgData.width, imgData.height);
    }
}

function drawImage(ctx, imageUrl, x, y, width, height) {
    const image = new Image();
    image.src = imageUrl;
    image.onload = function() {
        ctx.drawImage(image, x, y, width, height);
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
    let batteryColor = '#b6b6b6'; // สีเขียวสำหรับโหมดปกติ
    if (batteryLevel <= 20) {
        batteryColor = '#ff0000'; // สีแดงสำหรับแบตเตอรี่ต่ำ
    } else if (powerSavingMode) {
        batteryColor = '#fccd0e'; // สีส้มสำหรับโหมดประหยัดพลังงาน
    }

// วาดการเติมแบตเตอรี่
const fillWidth = (batteryLevel / 100) * 29; // คำนวณความกว้างของการเติมแบตเตอรี่ตามระดับแบตเตอรี่
const x = 511.3;
const y = 23.5;
const height = 13;
const radius = 3; // รัศมีของโค้ง

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




 drawText(ctx, `${batteryLevel}`, x + 29 / 2, y + height / 1.25, 12, 'SFThonburiSemiBold', '#767676', 'center', 1, 1, 0, 0, 100, 0);
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
