// ฟังก์ชันเพื่อโหลดฟอนต์
function loadFonts() {
    const fonts = [
        //NotoSansKR
        new FontFace('NotoSansKRThin', 'url(../assets/fonts/NotoSansKR-Thin.woff)'),
        new FontFace('NotoSansKRExtraLight', 'url(../assets/fonts/NotoSansKR-ExtraLight.woff)'),
        new FontFace('NotoSansKRLight', 'url(../assets/fonts/NotoSansKR-Light.woff)'),
        new FontFace('NotoSansKRRegular', 'url(../assets/fonts/NotoSansKR-Regular.woff)'),
        new FontFace('NotoSansKRMedium', 'url(../assets/fonts/NotoSansKR-Medium.woff)'),
        new FontFace('NotoSansKRSemiBold', 'url(../assets/fonts/NotoSansKR-SemiBold.woff)'),
        new FontFace('NotoSansKRBold', 'url(../assets/fonts/NotoSansKR-Bold.woff)'),
        new FontFace('NotoSansKRExtraBold', 'url(../assets/fonts/NotoSansKR-ExtraBold.woff)'),
        new FontFace('NotoSansKRBlack', 'url(../assets/fonts/NotoSansKR-Black.woff)'),

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
    const formattedDateTime = localDateTime.replace(' ', ' ');
    document.getElementById('datetime').value = formattedDateTime;
}

function padZero(number) {
    return number < 10 ? '0' + number : number;
}

function formatDate(date) {
    const options = { day: 'numeric', month: 'short', year: '2-digit' };
    let formattedDate = new Date(date).toLocaleDateString('th-TH', options);
    formattedDate = formattedDate.replace(/ /g, ' ').replace(/\./g, '');
    const months = ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'];
    const day = padZero(formattedDate.split(' ')[0]);
    const month = months[new Date(date).getMonth()];
    let year = formattedDate.split(' ')[2];
    year = `25${year}`;
    return `${day} ${month} ${year}`;
}

        //อัพโหลดรูปภาพ
let qrCodeImage = null;

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
        //อัพโหลดรูปภาพ
        
function updateDisplay() {
      const QRCode = document.getElementById('QRCode').value || '';

    const VisaNo = document.getElementById('VisaNo').value || 'AB0000';
    const accountNumber = document.getElementById('accountNumber').value || '-';
    const day = document.getElementById('day').value;
    const month = document.getElementById('month').value;
    const year = document.getElementById('year').value;


    // Combine day, month, and year into one string
    const Dateofbirth = day && month && year ? `${day} ${month} ${year}` : '-';
    
    const sex = document.getElementById('sex').value || '-';
    const country = document.getElementById('country').value || '-';
    const PassportNo = document.getElementById('PassportNo').value || 'AD1186973';

    const day1 = document.getElementById('day1').value;
    const month1 = document.getElementById('month1').value;
    const year1 = document.getElementById('year1').value;


    // Combine day, month, and year into one string
    const ped = day1 && month1 && year1 ? `${day1} ${month1} ${year1}` : '-';
    
    
    const StatusofStay = document.getElementById('StatusofStay').value || '-';
    const Year = document.getElementById('Year').value || '-';
    const Dateoflssue = document.getElementById('Dateoflssue').value || '-';
    const ValidityPeriodofVisa = document.getElementById('ValidityPeriodofVisa').value || '-';
    const Remarkds = document.getElementById('Remarkds').value || '-';
    
    // Example of initializing undefined variables
const amount1 = document.getElementById('amount1') ? document.getElementById('amount1').value : '0';
const x = document.getElementById('x') ? document.getElementById('x').value : '1';
const datetime = document.getElementById('datetime') ? document.getElementById('datetime').value : new Date().toISOString();


    // แปลงค่าจำนวนเงินจาก string เป็น number เพื่อนำไปคำนวณ
    const amount1Num = parseFloat(amount1.replace(/,/g, '')) || 0;
    const xNum = parseFloat(x.replace(/,/g, '')) || 1;
    const amount11 = amount1Num * xNum;
    const Commission = amount11 / 2;
    const total = amount11 + Commission;

    const formattedDate = formatDate(datetime);
    const formattedTime = new Date(datetime).toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' });

    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    
    const backgroundImage = new Image();
    backgroundImage.src = '../assets/image/paper/1visa-grant-notice-korea.jpg';
    backgroundImage.onload = function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
        
        //อัพโหลดรูปภาพ
                if (qrCodeImage) {
            ctx.drawImage(qrCodeImage, 74.0, 251.6, 143.5, 183); // Adjust position and size as needed
        }
        //อัพโหลดรูปภาพ
        
        
        drawText(ctx, ` ${VisaNo}`, 222.1, 203.0,14.50,'NotoSansKRBold', '#000000', 'left',23,3,0,0,450,0);
        drawText(ctx, `${datetime}`, 836.6, 203.0,14.50,'NotoSansKRBold', '#000000', 'right',23,3,0,0,450,0);
        drawText(ctx, `${accountNumber}`, 466.3, 273.5,14.50,'NotoSansKRBold', '#000000', 'left',23,3,0,0,300,0);
        drawText(ctx, `${Dateofbirth}`, 466.3, 308.0,14.50,'NotoSansKRBold', '#000000', 'left',23,3,0,0,300,0);
        drawText(ctx, `${sex}`, 715.0, 308.0,14.50,'NotoSansKRBold', '#000000', 'left',23,3,0,0,300,0);
        drawText(ctx, `${country}`, 466.3, 343.0,14.50,'NotoSansKRBold', '#000000', 'left',23,3,0,0,300,0);
        drawText(ctx, `${PassportNo}`, 466.3, 376.6,14.50,'NotoSansKRBold', '#000000', 'left',23,3,0,0,300,0);
        drawText(ctx, `${ped}`, 466.3, 413.4,14.50,'NotoSansKRBold', '#000000', 'left',23,3,0,0,300,0);

        drawText(ctx, `${StatusofStay}`, 275.5, 509.0,14.50,'NotoSansKRBold', '#000000', 'center',23,3,0,0,120,0);
        drawText(ctx, `${Year}`, 538.3, 509.0,14.50,'NotoSansKRBold', '#000000', 'center',23,3,0,0,120,0);
        drawText(ctx, `Single`, 777.3, 509.0,14.50,'NotoSansKRBold', '#000000', 'center',23,3,0,0,120,0);

        drawText(ctx, `${Dateoflssue}`, 275.5, 567.4,14.50,'NotoSansKRBold', '#000000', 'center',23,3,0,0,120,0);
        drawText(ctx, `${ValidityPeriodofVisa}`, 538.3, 567.4,14.50,'NotoSansKRBold', '#000000', 'center',23,3,0,0,120,0);
        drawText(ctx, `Korean Erbassy in Thailand`, 725.0, 559.0,14.50,'NotoSansKRBold', '#000000', 'left',23,3,0,0,120,0);

        drawText(ctx, `${Remarkds}`, 229.8, 621.5,14.50,'NotoSansKRBold', '#000000', 'left',23,3,0,0,700,0);


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
        // ใช้ Intl.Segmenter เพื่อแบ่งคำภาษาไทยและภาษาอังกฤษ
        const segmenter = new Intl.Segmenter(['th', 'en'], { granularity: 'word' });
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

    const characters = text.split('');
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
