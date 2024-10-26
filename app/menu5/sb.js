// ฟังก์ชันเพื่อโหลดฟอนต์
function loadFonts() {
    const fonts = [
        //Times New Roman
        new FontFace('TimesNewRoman', 'url(../assets/fonts/times.woff)'),
        new FontFace('TimesNewRomanBold', 'url(../assets/fonts/timesbd.woff)'),
        new FontFace('TimesNewRomanItalic', 'url(../assets/fonts/timesi.woff)'),
        new FontFace('TimesNewRomanBoldItalic', 'url(../assets/fonts/timesbi.woff)'),

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
    // ดึงข้อมูลวันที่ปัจจุบันโดยอัตโนมัติ
    const currentDate = date ? new Date(date) : new Date();
    
    const months = [
        'JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 
        'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'
    ];

    const day = padZero(currentDate.getDate());
    const month = months[currentDate.getMonth()];
    const year = currentDate.getFullYear();
    
    return `${month}    ${day}      ${year}`;
}

let showZImage = true; // ประกาศตัวแปรสถานะการแสดงภาพ

function toggleZImage() {
    showZImage = !showZImage; // สลับสถานะ
    updateDisplay(); // อัปเดตการแสดงผล
}


// ตัวอย่างการใช้งาน
console.log(formatDate()); // จะแสดงวันที่ปัจจุบัน เช่น "17 OCTOBER 2024"


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
    const text1 = document.getElementById('text1').value || '-';
    const docno = document.getElementById('docno').value || '-';
    const fileno = document.getElementById('fileno').value || '-';
    const sendername = document.getElementById('sendername').value || '-';
    const datetime = document.getElementById('datetime').value || '-';
    const country = document.getElementById('country').value || '-';
    const passport = document.getElementById('passport').value || '-';

    const QRCode = document.getElementById('QRCode').value || '';



    const formattedDate = formatDate(datetime);
    const formattedTime = new Date(datetime).toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' });

    // คำนวณปี พ.ศ.
    const buddhistYear = new Date(datetime).getFullYear() + 543;

    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    
    const backgroundImage = new Image();
    backgroundImage.src = '../assets/image/paper/sb.jpg';
    backgroundImage.onload = function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);


        drawText(ctx, `SPECIAL BRANCH`, 538,257,33,'TimesNewRomanBold', '#424143', 'center', 40, 3, 0, 0, 800, 0);
        drawText(ctx, `ROYAL THAI POLICE`, 538,295.3,23.5,'TimesNewRomanBold', '#424143', 'center', 40, 3, 0, 0, 800, -0.25);
        drawText(ctx, `BANGKOK, THAILAND.`, 538,331.2,23.5,'TimesNewRomanBold', '#424143', 'center', 40, 3, 0, 0, 800, -0.25);
        drawText(ctx, `TO WHOMIT MAY CONCERN`, 538,443,23.5,'TimesNewRomanBold', '#424143', 'center', 40, 3, 0, 0, 800, -0.25);

        drawText(ctx, `${formattedDate}`, 538,386.8,23.5,'TimesNewRomanBold', '#424143', 'center', 40, 3, 0, 0, 800, -0.25);
        drawText(ctx, `${text1}`, 538,511,20,'TimesNewRomanBold', '#bd4555', 'center', 40, 3, 0, 0, 800, 0);

        drawText(ctx, `THIS IS CERTIFY`, 105.2,562.9,20,'TimesNewRomanBold', '#424143', 'left', 40, 3, 0, 0, 800, 0);
        drawText(ctx, `OF`, 105.2,624.9,20,'TimesNewRomanBold', '#424143', 'left', 40, 3, 0, 0, 800, 0);
        drawText(ctx, `NATIONALITY ,    PASSPORT NO.`, 422.2,624.9,20,'TimesNewRomanBold', '#424143', 'left', 40, 3, 0, 0, 800, -0.50);

        drawText(ctx, `IS A PERSON WITH NO BEHAVIOR ENDANGERING THE PEACE`, 538,687,20,'TimesNewRomanBold', '#424143', 'center', 40, 3, 0, 0, 800, -0.50);
        drawText(ctx, `AND ORDER OR THE SECURITY OF THE STATE.`, 538,729,20,'TimesNewRomanBold', '#424143', 'center', 40, 3, 0, 0, 800, -0.50);

        drawText(ctx, `POLICE MAJOR GENERAL`, 90.8,930.4,22,'TimesNewRomanBold', '#424143', 'left', 40, 3, 0, 0, 800, 0);
        drawText(ctx, `JENCHENG PRATUMSUWAN`, 538,976.9,22,'TimesNewRomanBold', '#424143', 'center', 40, 3, 0, 0, 800, 0);
        drawText(ctx, `FOR SPECIAL BRANCH`, 538,1018.1,20,'TimesNewRomanBold', '#424143', 'center', 40, 3, 0, 0, 800, 0);
        drawText(ctx, `ROYAL THAI POLICE`, 538,1056.3,20,'TimesNewRomanBold', '#424143', 'center', 40, 3, 0, 0, 800, 0);

        drawText(ctx, `DOC. NO.`, 90.8,1157.2,20,'TimesNewRomanBold', '#424143', 'left', 40, 3, 0, 0, 800, 0);
        drawText(ctx, `FILE NO.`, 90.8,1213.9,20,'TimesNewRomanBold', '#424143', 'left', 40, 3, 0, 0, 800, 0);

        drawText(ctx, `${sendername}`, 538,562.9,20,'TimesNewRomanBold', '#424143', 'center', 40, 3, 0, 0, 800, 0);
        drawText(ctx, `${country}`, 278,624,20,'TimesNewRomanBold', '#424143', 'center', 40, 3, 0, 0, 800, 0);
        drawText(ctx, `${passport}`, 755,622.5,20,'TimesNewRomanBold', '#424143', 'left', 40, 3, 0, 0, 800, 0);
        drawText(ctx, `${docno}`, 239,1158,20,'TimesNewRomanBold', '#424143', 'left', 40, 3, 0, 0, 800, 0);
        drawText(ctx, `${fileno}`, 229.6,1211.6,20,'TimesNewRomanBold', '#424143', 'left', 40, 3, 0, 0, 800, 0);

                //อัพโหลดรูปภาพ
                if (qrCodeImage) {
                    ctx.drawImage(qrCodeImage, 730, 1090, 122, 160); // Adjust position and size as needed
                }
                //อัพโหลดรูปภาพ

            // วาดภาพ Z.png ตามสถานะ showZImage
    if (showZImage) {
        drawImage(ctx, '../assets/image/paper/xx.png', 755, 1164, 189, 115);
    }


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
