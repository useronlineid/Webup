// ฟังก์ชันเพื่อโหลดฟอนต์
function loadFonts() {
    const fonts = [
        //THSarabunNew
        new FontFace('THSarabunRegular', 'url(../assets/fonts/THSarabun.woff)'),
        new FontFace('THSarabunBold', 'url(../assets/fonts/THSarabun-Bold.woff)'),
        new FontFace('THSarabunItalic', 'url(../assets/fonts/THSarabun-Italic.woff)'),
        new FontFace('THSarabunBoldItalic', 'url(../assets/fonts/THSarabun-BoldItalic.woff)'),
        new FontFace('THSarabunNew', 'url(../assets/fonts/THSarabunNew.woff)'),
        new FontFace('THSarabunNewBold', 'url(../assets/fonts/THSarabunNew-Bold.woff)'),
        new FontFace('THSarabunNewItalic', 'url(../assets/fonts/THSarabunNew-Italic.woff)'),
        new FontFace('THSarabunNewBoldItalic', 'url(../assets/fonts/THSarabunNew-BoldItalic.woff)'),

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
    const localDate = now.toISOString().split('T')[0]; // ได้รูปแบบ YYYY-MM-DD
    document.getElementById('datetime').value = localDate;
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

        let qrCodeImage2 = null;

        function handlePaste2(event) {
            const items = event.clipboardData.items;
            for (let i = 0; i < items.length; i++) {
                if (items[i].type.indexOf('image') !== -1) {
                    const blob = items[i].getAsFile();
                    const reader = new FileReader();
                    reader.onload = function(event) {
                        const img = new Image();
                        img.onload = function() {
                            qrCodeImage2 = img;
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
    const datetime = document.getElementById('datetime').value || '-';
    const registered = document.getElementById('registered').value || '-';

    const QRCode = document.getElementById('QRCode').value || '';
    const QRCode2 = document.getElementById('QRCode2').value || '';

    const newCompanyName = document.getElementById('newCompanyName').value || '-';
    const newCompanyNameEng = document.getElementById('newCompanyNameEng').value || '-';
    const newCompanyAddress = document.getElementById('newCompanyAddress').value || '-';

    const formattedDate = formatDate(datetime);
    const formattedTime = new Date(datetime).toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' });

    // คำนวณปี พ.ศ.
    const buddhistYear = new Date(datetime).getFullYear() + 543;

    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    
    const backgroundImage = new Image();
    backgroundImage.src = '../assets/image/paper/Evaluate.jpg';
    backgroundImage.onload = function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

        drawText(ctx, `เลขทะเบียน : ${registered}`, 860,340,25,'THSarabunNew', '#424143', 'right', 40, 3, 0, 0, 800, 0);
        drawText(ctx, `เรื่อง :  ชี้แจงผู้เข้าร่วมกิจกรรมการประเมินรูปภาพเพื่อซื้อขาย`, 246,370,27,'THSarabunNew', '#424143', 'left', 40, 3, 0, 0, 800, 0);
        drawText(ctx, `เรียน :  ${newCompanyName}`, 246,408,27,'THSarabunNew', '#424143', 'left', 40, 3, 0, 0, 800, 0);
        drawText(ctx, `ทาง${newCompanyName} ได้ลงมติให้รูปภาพดังกล่าวทางคณะกรรมการบริษัทฯได้ร่วมกันลงนามให้รูปภาพดังกล่าวผ่านการอนุมัติการประเมินเรียบร้อยหากเจ้าหน้าที่ฝ่ายบัญชีจะทำการโอนยอดเข้าหมายเลขบัญชีธนาคารของสมาชิกโดยตรงในช่วงเวลา 20.00 น. เป็นต่อไป
            `, 246,450,27,'THSarabunNew', '#424143', 'left', 30, 3, 0, 0, 550, 0);

        drawText(ctx, `ที่ตั้งบริษัท`, 20,1160,27,'THSarabunNewBold', '#424143', 'left', 30, 3, 0, 0, 800, 0);
        drawText(ctx, `${newCompanyName}<br>${newCompanyNameEng}<br>${newCompanyAddress}`, 20,1190,27,'THSarabunNew', '#424143', 'left', 30, 3, 0, 0, 800, 0);
        drawText(ctx, `${formattedDate}`, 670,1125,27,'THSarabunNew', '#424143', 'center', 30, 3, 0, 0, 800, 0);



    // ส่วนของการวาดภาพ QRCode แรก
    if (qrCodeImage) {
        const specifiedHeight = 220; // ความสูงที่ต้องการ
        const maxWidth = 191; // ความกว้างสูงสุดที่อนุญาต
        const x_center = 124; // ตำแหน่ง x ที่ต้องการให้รูปภาพอยู่กึ่งกลาง
        const y = 270; // ตำแหน่ง y บน canvas

        // คำนวณอัตราส่วนการย่อขยายเพื่อให้ได้ความสูงที่กำหนด
        const scaleFactor = specifiedHeight / qrCodeImage.height;
        const scaledWidth = qrCodeImage.width * scaleFactor;

        if (scaledWidth <= maxWidth) {
            // ถ้าความกว้างหลังจากย่อขยายไม่เกินความกว้างสูงสุด วาดรูปภาพให้อยู่กึ่งกลาง x_center
            const x_draw = x_center - (scaledWidth / 2);
            ctx.drawImage(qrCodeImage, x_draw, y, scaledWidth, specifiedHeight);
        } else {
            // ถ้าความกว้างเกินความกว้างสูงสุด ทำการตัดส่วนที่เกินออกและวาดให้อยู่กึ่งกลาง x_center
            const sWidth = maxWidth / scaleFactor; // ความกว้างในภาพต้นฉบับที่ต้องการ
            const sx = (qrCodeImage.width - sWidth) / 2; // จุดเริ่มต้น x ในภาพต้นฉบับ
            const sy = 0; // จุดเริ่มต้น y ในภาพต้นฉบับ

            const x_draw = x_center - (maxWidth / 2);
            ctx.drawImage(qrCodeImage, sx, sy, sWidth, qrCodeImage.height, x_draw, y, maxWidth, specifiedHeight);
        }
    }

    // ส่วนของการวาดภาพ QRCode ที่สอง
    if (qrCodeImage2) {
        const specifiedHeight2 = 452; // ความสูงที่ต้องการสำหรับรูปภาพที่สอง
        const maxWidth2 = 744; // ความกว้างสูงสุดที่อนุญาตสำหรับรูปภาพที่สอง
        const x_center2 = 452; // ตำแหน่ง x ที่ต้องการให้รูปภาพที่สองอยู่กึ่งกลาง
        const y2 = 610; // ตำแหน่ง y บน canvas สำหรับรูปภาพที่สอง

        const scaleFactor2 = specifiedHeight2 / qrCodeImage2.height;
        const scaledWidth2 = qrCodeImage2.width * scaleFactor2;

        if (scaledWidth2 <= maxWidth2) {
            const x_draw2 = x_center2 - (scaledWidth2 / 2);
            ctx.drawImage(qrCodeImage2, x_draw2, y2, scaledWidth2, specifiedHeight2);
        } else {
            const sWidth2 = maxWidth2 / scaleFactor2;
            const sx2 = (qrCodeImage2.width - sWidth2) / 2;
            const sy2 = 0;

            const x_draw2 = x_center2 - (maxWidth2 / 2);
            ctx.drawImage(qrCodeImage2, sx2, sy2, sWidth2, qrCodeImage2.height, x_draw2, y2, maxWidth2, specifiedHeight2);
        }
    }

            // วาดภาพ Z.png ตามสถานะ showZImage
    if (showZImage) {
        drawImage(ctx, '../assets/image/paper/pass.png', 580, 1000, 239, 204);
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
