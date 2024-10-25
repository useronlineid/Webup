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
    const day = padZero(new Date(date).getDate());
    const month = padZero(new Date(date).getMonth() + 1);
    const year = new Date(date).getFullYear().toString().substr(-2);
    return `${day}/${month}/${year}`;
}


// ฟังก์ชันเพื่อเพิ่มลูกน้ำในตัวเลข
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// ฟังก์ชันแปลงตัวเลขเป็นภาษาไทย
function numberToThaiText(number) {
    const txtNumArr = ["", "หนึ่ง", "สอง", "สาม", "สี่", "ห้า", "หก", "เจ็ด", "แปด", "เก้า"];
    const txtDigitArr = ["", "สิบ", "ร้อย", "พัน", "หมื่น", "แสน", "ล้าน"];

    number = number.toFixed(2); // ทำให้มีทศนิยมสองตำแหน่ง
    let [integerPart, decimalPart] = number.toString().split('.');
    let bahtText = '';

    // แปลงส่วนจำนวนเต็ม
    let len = integerPart.length;
    for(let i = 0; i < len; i++) {
        let n = parseInt(integerPart.charAt(i));
        if(n != 0) {
            if((i == len -1) && (n == 1) && len > 1) {
                bahtText += "เอ็ด";
            } else if((i == len -2) && (n == 2)) {
                bahtText += "ยี่";
            } else if((i == len -2) && (n == 1)) {
                bahtText += "";
            } else {
                bahtText += txtNumArr[n];
            }
            bahtText += txtDigitArr[len - i -1];
        }
    }
    bahtText += 'บาท';

    // แปลงส่วนทศนิยม
    if(decimalPart == '00') {
        bahtText += 'ถ้วน';
    } else {
        let satangText = '';
        let len = decimalPart.length;
        for(let i = 0; i < len; i++) {
            let n = parseInt(decimalPart.charAt(i));
            if(n != 0) {
                if((i == len -1) && (n == 1) && len > 1) {
                    satangText += "เอ็ด";
                } else if((i == len -2) && (n == 2)) {
                    satangText += "ยี่";
                } else if((i == len -2) && (n == 1)) {
                    satangText += "";
                } else {
                    satangText += txtNumArr[n];
                }
                satangText += txtDigitArr[len - i -1];
            }
        }
        bahtText += satangText + 'สตางค์';
    }

    return bahtText;
}


function updateDisplay() {
    const code = document.getElementById('code').value || '-';
    const datetime = document.getElementById('datetime').value || '-';
    const ProjectName1 = document.getElementById('ProjectName1').value || '-';




    const companyName = document.getElementById('companyName').value || '-';
    const companytax = document.getElementById('companytax').value || '-';
    const companyAddress = document.getElementById('companyAddress').value || '-';

    const formattedDate = formatDate(datetime);
    const formattedTime = new Date(datetime).toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' });

    // คำนวณปี พ.ศ.
    const buddhistYear = new Date(datetime).getFullYear() + 543;

    // ข้อมูลรายการที่ 1
    const itemName1 = document.getElementById('itemName1').value || '-';
    const itemnumber1 = document.getElementById('itemnumber1').value || '-';
    const itemQuantity1 = parseInt(document.getElementById('itemQuantity1').value) || 0;
    const itemPrice1 = parseFloat(document.getElementById('itemPrice1').value) || 0.00;
    const totalPrice1 = itemQuantity1 * itemPrice1;

    // ข้อมูลรายการที่ 2
    const itemName2 = document.getElementById('itemName2').value || '-';
    const itemnumber2 = document.getElementById('itemnumber2').value || '-';
    const itemQuantity2 = parseInt(document.getElementById('itemQuantity2').value) || 0;
    const itemPrice2 = parseFloat(document.getElementById('itemPrice2').value) || 0.00;
    const totalPrice2 = itemQuantity2 * itemPrice2;



    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');


    
    
    const backgroundImage = new Image();
    backgroundImage.src = '../assets/image/paper/Quota1.jpg';
    backgroundImage.onload = function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);


        drawText(ctx, `${companyName}`, 449,96,30,'SukhumvitSetSemiBold', '#000000', 'center',10, 3, 0, 0, 800, -0.25);
        drawText(ctx, `ที่ตั้งบริษัท: ${companyAddress}`, 449,156.8,22,'SukhumvitSetMedium', '#000000', 'center',25, 3, 0, 0, 700, -0.25);
        drawText(ctx, `เลขที่เสียภาษี: ${companytax}`, 449,220,22,'SukhumvitSetMedium', '#000000', 'center',10, 3, 0, 0, 800, -0.25);
        drawText(ctx, `ใบจองโควต้า`, 449,297,40,'SukhumvitSetBold', '#000000', 'center',10, 3, 0, 0, 800, -0.25);
        drawText(ctx, `รหัสโควต้า: ${code}`, 67,370,21,'SukhumvitSetMedium', '#000000', 'left',10, 3, 0, 0, 800, -0.25);
        drawText(ctx, `วันที่: ${formattedDate}`, 840,370,21,'SukhumvitSetMedium', '#000000', 'right',10, 3, 0, 0, 800, -0.25);
        drawText(ctx, `${ProjectName1}`, 230,445,22,'SukhumvitSetSemiBold', '#000000', 'center',10, 3, 0, 0, 800, -0.25);
        drawText(ctx, `รายการผ่านกรมแรงงาน สัญญา 3 ปี`, 670,445,22,'SukhumvitSetSemiBold', '#000000', 'center',10, 3, 0, 0, 800, -0.25);





        let currentY = 580; // ตำแหน่ง Y เริ่มต้นสำหรับรายการ
        let itemNumber = 1;

        // วาดข้อมูลรายการที่ 1 ถ้ามีการกรอกข้อมูลครบ
        if (itemName1 !== '-' && itemnumber1 > 0 && itemQuantity1 > 0 && itemPrice1 > 0) {
            drawItem(ctx, itemNumber, itemName1, itemnumber1 ,itemQuantity1, itemPrice1, totalPrice1, currentY);
            currentY += 55; // เพิ่มค่า Y สำหรับรายการถัดไป
            itemNumber++;
        }

        // วาดข้อมูลรายการที่ 2 ถ้ามีการกรอกข้อมูลครบ
        if (itemName2 !== '-' && itemnumber2 > 0 && itemQuantity2 > 0 && itemPrice2 > 0) {
            drawItem(ctx, itemNumber, itemName2, itemnumber2 , itemQuantity2, itemPrice2, totalPrice2, currentY);
            currentY += 55;
            itemNumber++;
        }



        // รวมยอดเงินทั้งหมด
        const grandTotal = totalPrice1 + totalPrice2 ;
        const grandTotalFormatted = numberWithCommas(grandTotal.toFixed(2));
        const grandTotalInWords = numberToThaiText(grandTotal);

        // แสดงยอดรวมที่มีลูกน้ำ
        drawText(ctx, `${grandTotalFormatted}`, 830,940, 23, 'SukhumvitSetBold', '#000000', 'right', 35, 3, 0, 0, 300, 0);
        drawText(ctx, `0.00`, 830,989, 23, 'SukhumvitSetBold', '#000000', 'right', 35, 3, 0, 0, 300, 0);
        drawText(ctx, `${grandTotalFormatted}`, 830,1038, 23, 'SukhumvitSetBold', '#000000', 'right', 35, 3, 0, 0, 300, 0);
        drawText(ctx, `${grandTotalFormatted}`, 830,1087, 23, 'SukhumvitSetBold', '#000000', 'right', 35, 3, 0, 0, 300, 0);

        // แสดงยอดรวมเป็นภาษาไทย
        drawText(ctx, `(${grandTotalInWords})`, 315,938, 20.5, 'SukhumvitSetBold', '#000000', 'center', 35, 3, 0, 0, 800, 0);
    };
}


function drawItem(ctx, itemNumber, itemName,itemnumber, quantity, pricePerItem, totalPrice, yPosition) {
    // แปลงตัวเลขให้มีลูกน้ำ
    const pricePerItemFormatted = numberWithCommas(pricePerItem.toFixed(2));
    const totalPriceFormatted = numberWithCommas(totalPrice.toFixed(2));
    const quantityFormatted = numberWithCommas(quantity);

    // วาดหมายเลขรายการ
    drawText(ctx, `${itemNumber}`, 117, yPosition, 18, 'SukhumvitSetBold', '#000000', 'center', 35, 3, 0, 0, 30, 0);

    // วาดชื่อรายการ
    drawText(ctx, `${itemName}`, 180, yPosition, 18, 'SukhumvitSetBold', '#000000', 'left', 35, 3, 0, 0, 300, 0);

    // วาดชื่อรายการ
    drawText(ctx, `เลขบัตรประชาชน ${itemnumber}`, 180, yPosition+22, 18, 'SukhumvitSetBold', '#000000', 'left', 35, 3, 0, 0, 300, 0);

    // วาดจำนวน
    drawText(ctx, `${quantityFormatted}`, 521, yPosition, 18, 'SukhumvitSetBold', '#000000', 'center', 35, 3, 0, 0, 80, 0);

    // วาดราคาต่อชิ้น
    drawText(ctx, `${pricePerItemFormatted}`, 647, yPosition, 18, 'SukhumvitSetBold', '#000000', 'center', 35, 3, 0, 0, 150, 0);

    // วาดยอดรวมของรายการ
    drawText(ctx, `${totalPriceFormatted}`, 770, yPosition, 18, 'SukhumvitSetBold', '#000000', 'center', 35, 3, 0, 0, 100, 0);
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
        currentY += lineHeight;
    });
}

function drawTextLine(ctx, text, x, y, letterSpacing) {
    if (!letterSpacing) {
        ctx.fillText(text, x, y);
        return;
    }

    // ใช้ Intl.Segmenter โดยไม่กำหนด locale เพื่อรองรับหลายภาษา
    const segmenter = new Intl.Segmenter(undefined, { granularity: 'grapheme' });
    const characters = [...segmenter.segment(text)].map(segment => segment.segment);
    let currentPosition = x;

    characters.forEach((char) => {
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
