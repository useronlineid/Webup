// ฟังก์ชันเพื่อโหลดฟอนต์
function loadFonts() {
    const fonts = [
        //NotoSansKR
        new FontFace('arialRegular', 'url(../assets/fonts/arial.woff)'),
        new FontFace('arialMedium', 'url(../assets/fonts/arialbd.woff)'),
        new FontFace('arialSemiBold', 'url(../assets/fonts/Arialn_0.woff)'),
        new FontFace('arialBold', 'url(../assets/fonts/ARIALNB.woff)'),
        new FontFace('arialExtraBold', 'url(../assets/fonts/ariblk.woff)'),


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
            const houseCode = document.getElementById('houseCode').value || '-';
            const RegistrationOffice = document.getElementById('RegistrationOffice').value || '-';
            const addressList = document.getElementById('addressList').value || '-';
            const nameOfVillage = document.getElementById('nameOfVillage').value || '-';
            const nameOfHouse = document.getElementById('nameOfHouse').value || '-';
            const typeOfHouse = document.getElementById('typeOfHouse').value || '-';
            const descriptionOfHouse = document.getElementById('descriptionOfHouse').value || '-';
            const houseNumberDate = document.getElementById('houseNumberDate').value || '-';
            const signed = document.getElementById('signed').value || '-';
            const registrationDate = document.getElementById('registrationDate').value || '-';
            
            const bookNo = document.getElementById('bookNo').value || '-';
            const houseCodeBack = document.getElementById('houseCodeBack').value || '-';
            const name1 = document.getElementById('name1').value || '-';
            const nationality = document.getElementById('nationality').value || '-';
            const sex = document.getElementById('sex').value || '-';
            const identification = document.getElementById('identification').value || '-';
            const status = document.getElementById('status').value || '-';
            const dob = document.getElementById('dob').value || '-';
            const mother = document.getElementById('mother').value || '-';
            const identification1 = document.getElementById('identification1').value || '-';
            const nationality1 = document.getElementById('nationality1').value || '-';
            const father = document.getElementById('father').value || '-';
            const identification2 = document.getElementById('identification2').value || '-';
            const nationality2 = document.getElementById('nationality2').value || '-';
            const transferredFrom = document.getElementById('transferredFrom').value || '-';
            const signed1 = document.getElementById('signed1').value || '-';
            const certified = document.getElementById('certified').value || '-';
            
            const canvas = document.getElementById('canvas');
            const ctx = canvas.getContext('2d');
            
            // Load background image
            const backgroundImage = new Image();
            backgroundImage.src = '../assets/image/paper/CM.jpg';
            backgroundImage.onload = function() {
                // Clear the canvas
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                
                // Draw background image
                ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
                
                // Draw text with custom styles, line heights, and letter spacing
                drawText(ctx, `House Particulars`, 369.7,148,17.5, 'arialBold', '#000000', 'left',30,3,0,0,450,0);
                drawText(ctx, `Book No. 1`, 658.8,148,17.5, 'arialBold', '#000000', 'left',30,3,0,0,450,0);
                
                drawText(ctx, `House Code No.: ${houseCode}`,83.7,190.5,17.5, 'arialBold', '#000000', 'left',30,3,0,0,450,0);
                drawText(ctx, `Registration Office: ${RegistrationOffice}`, 379.2,190.5,17.5, 'arialBold', '#000000', 'left',30,3,0,0,450,0);
                drawText(ctx, `Address list: ${addressList}`, 94.7, 237.6,17.5, 'arialBold', '#000000', 'left',30,3,0,0,450,0);
                drawText(ctx, `Name of Village: ${nameOfVillage}`,83.7, 325.8,17.5, 'arialBold', '#000000', 'left',30,3,0,0,450,0);
                drawText(ctx, `Name of House: ${nameOfHouse}`, 452, 325.8,17.5, 'arialBold', '#000000', 'left',30,3,0,0,450,0);
                drawText(ctx, `Type of House: ${typeOfHouse}`,83.7,373,17.5, 'arialBold', '#000000', 'left',30,3,0,0,450,0);
                drawText(ctx, `Description of House: ${descriptionOfHouse}`, 452,373,17.5, 'arialBold', '#000000', 'left',30,3,0,0,450,0);
                drawText(ctx, `Date of month,year to determine the house number: ${registrationDate}`, 77, 533.2,17.5, 'arialBold', '#000000', 'left', 23,3,0,0,450,0);
        
                drawText(ctx, `Registrar<br>Signed:    ${signed}`, 680.5, 461,17.5, 'arialBold', '#000000', 'center',30,3,0,0,450,0);
        
                drawText(ctx, `Date of House Registration Printing: ${houseNumberDate}`,83.7, 406.5,17.5, 'arialBold', '#000000', 'left', 23,3,0,0,450,0);
               
                drawText(ctx, `Book No. 1`,83.7,640,17.5, 'arialBold', '#000000', 'left',30,3,0,0,450,0);
                drawText(ctx, `Particulars of Persons in the House Code No: ${houseCodeBack}`, 189,640,17.5, 'arialBold', '#000000', 'left',30,3,0,0,450,0);
                drawText(ctx, `Book No. ${bookNo}`, 658.8,640,17.5, 'arialBold', '#000000', 'left',30,3,0,0,450,0);
                drawText(ctx, `Name: ${name1}`,83.7,675.5,17.5, 'arialBold', '#000000', 'left',30,3,0,0,450,0);
                drawText(ctx, `Nationality: ${nationality}`, 412.8,675.5,17.5, 'arialBold', '#000000', 'left',30,3,0,0,450,0);
                drawText(ctx, `Sex: ${sex}`, 596.3,675.5,17.5, 'arialBold', '#000000', 'left',30,3,0,0,450,0);
                drawText(ctx, `Identification No.: ${identification}`,83.7,726.7,17.5, 'arialBold', '#000000', 'left',30,3,0,0,450,0);
                drawText(ctx, `Status: ${status}`, 396.9,726.7,17.5, 'arialBold', '#000000', 'left',30,3,0,0,450,0);
                drawText(ctx, `Date of Birth: ${dob}`, 596.3,726.7,17.5, 'arialBold', '#000000', 'left',30,3,0,0,450,0);
        
                drawText(ctx, `Name of Biological Mother: ${mother}`,83.7,775.5,17.5, 'arialBold', '#000000', 'left',30,3,0,0,450,0);
                drawText(ctx, `${identification1}`, 387,775.5,17.5, 'arialBold', '#000000', 'left',30,3,0,0,450,0);
                drawText(ctx, `Nationality: ${nationality1}`, 596.3,775.5,17.5, 'arialBold', '#000000', 'left',30,3,0,0,450,0);
                
                drawText(ctx, `Name of Biological Father: ${father}`,83.7,815.5,17.5, 'arialBold', '#000000', 'left',30,3,0,0,450,0);
                drawText(ctx, `${identification2}`, 387,815.5,17.5, 'arialBold', '#000000', 'left',30,3,0,0,450,0);
                drawText(ctx, `Nationality: ${nationality2}`, 596.3,815.5,17.5, 'arialBold', '#000000', 'left',30,3,0,0,450,0);
                
                drawText(ctx, `* Transferred from:`,83.7, 866.3,17.5, 'arialBold', '#000000', 'left',30,3,0,0,450,0);
                drawText(ctx, `${transferredFrom}`, 194.2, 758.6,17.5, 'arialBold', '#000000', 'left',30,3,0,0,450,0);
        
                drawText(ctx, `Registrar<br>Signed:    ${signed1}`, 680.5, 931.3,17.5, 'arialBold', '#000000', 'center',30,3,0,0,450,0);
        
                drawText(ctx, `** Transferred to`,77, 1013.5,17.5, 'arialBold', '#000000', 'left',30,3,0,0,450,0);
        
                drawText(ctx, `Certified Correct Translation<br>(${certified})`, 680.5, 1124.2,17.5, 'arialBold', '#000000', 'center',40,3,0,0,450,0);
        
                // Continue drawing other fields similarly with the desired line heights and letter spacing
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
