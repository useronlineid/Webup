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
    const Name1 = document.getElementById('Name1').value || '-';
    const Address = document.getElementById('Address').value || '-';
    const Phone = document.getElementById('Phone').value || '-';





    const companyName = document.getElementById('companyName').value || '-';
    const newCompanyNameEng = document.getElementById('newCompanyNameEng').value || '-';
    const companyAddress = document.getElementById('companyAddress').value || '-';

    const formattedDate = formatDate(datetime);
    const formattedTime = new Date(datetime).toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' });

    // คำนวณปี พ.ศ.
    const buddhistYear = new Date(datetime).getFullYear() + 543;

    // ข้อมูลรายการที่ 1
    const ProjectName1 = document.getElementById('ProjectName1').value || '-';
    const itemQuantity1 = parseInt(document.getElementById('itemQuantity1').value) || 0;
    const itemPrice1 = parseFloat(document.getElementById('itemPrice1').value) || 0.00;
    const totalPrice1 = itemQuantity1 * itemPrice1;

    // ข้อมูลรายการที่ 2
    const ProjectName2 = document.getElementById('ProjectName2').value || '-';
    const itemQuantity2 = parseInt(document.getElementById('itemQuantity2').value) || 0;
    const itemPrice2 = parseFloat(document.getElementById('itemPrice2').value) || 0.00;
    const totalPrice2 = itemQuantity2 * itemPrice2;



    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');


    
    
    const backgroundImage = new Image();
    backgroundImage.src = '../assets/image/paper/Quota2.jpg';
    backgroundImage.onload = function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);


        drawText(ctx, `${companyName}`, 449,152,36,'SukhumvitSetExtraBold', '#0059d1', 'center',10, 3, 0, 0, 800, -0.50);
        drawText(ctx, `${newCompanyNameEng}`, 449,186,27,'SukhumvitSetSemiBold', '#0059d1', 'center',10, 3, 0, 0, 800, -0.50);
        drawText(ctx, `ที่ตั้งบริษัท: ${companyAddress}`, 449,215.8,20,'SukhumvitSetSemiBold', '#0059d1', 'center',25, 3, 0, 0, 600, -0.50);
        drawText(ctx, `ใบสั่งจองโควต้า`, 77,292,50,'SukhumvitSetBold', '#cf8500', 'left',10, 3, 0, 0, 800, -0.50);
        drawText(ctx, `รายละเอียดสั่งซื้อ`, 79,336,31,'SukhumvitSetBold', '#000000', 'left',10, 3, 0, 0, 800, -0.50);
        drawText(ctx, `${Name1}`, 79,375,29,'SukhumvitSetSemiBold', '#000000', 'left',10, 3, 0, 0, 800, -0.50);
        drawText(ctx, `${Address}`, 79,408,25,'SukhumvitSetSemiBold', '#000000', 'left',10, 3, 0, 0, 800, -0.50);
        drawText(ctx, `โทร.${Phone}`, 79,436,25,'SukhumvitSetSemiBold', '#000000', 'left',10, 3, 0, 0, 800, -0.50);
        drawText(ctx, `รหัส:${code}`, 79,465,25,'SukhumvitSetSemiBold', '#000000', 'left',10, 3, 0, 0, 800, -0.50);

        drawText(ctx, `วันที่ ${formattedDate}`, 844,336,28,'SukhumvitSetBold', '#000000', 'right',10, 3, 0, 0, 800, -0.50);
        drawText(ctx, `รายการ`, 168,543,26,'SukhumvitSetExtraBold', '#000000', 'center',10, 3, 0, 0, 800, 0);
        drawText(ctx, `จำนวน`, 373,543,26,'SukhumvitSetExtraBold', '#000000', 'center',10, 3, 0, 0, 800, 0);
        drawText(ctx, `ราคา/หน่วย`, 562,543,26,'SukhumvitSetExtraBold', '#000000', 'center',10, 3, 0, 0, 800, 0);
        drawText(ctx, `ยอดรวม`, 750,543,26,'SukhumvitSetExtraBold', '#000000', 'center',10, 3, 0, 0, 800, 0);

        drawText(ctx, `เงื่อนไขและนโยบายคืนเงิน`, 79,908,25,'SukhumvitSetSemiBold', '#000000', 'left',10, 3, 0, 0, 800, -0.50);
        drawText(ctx, `(จะได้รับเงินคืนในวันที่มารายงานตัวอบรม)`, 79,951,25,'SukhumvitSetSemiBold', '#000000', 'left',10, 3, 0, 0, 800, -0.50);

        drawText(ctx, `ยอดรวม<br>ภาษี 0%<br>ยอดชำระสุทธิ์`, 530,908,25,'SukhumvitSetSemiBold', '#000000', 'left',22, 3, 0, 0, 800, -0.50);
        drawText(ctx, `เจ้าหน้าที่ฝ่ายจัดหาคนงานไปต่างประเทศ`, 715,1130,18,'SukhumvitSetSemiBold', '#000000', 'center',22, 3, 0, 0, 250, -0.50);


        let currentY = 608; // ตำแหน่ง Y เริ่มต้นสำหรับรายการ
        let itemNumber = 1;

        // วาดข้อมูลรายการที่ 1 ถ้ามีการกรอกข้อมูลครบ
        if (ProjectName1 !== '-' && itemQuantity1 > 0 && itemPrice1 > 0) {
            drawItem(ctx, itemNumber, ProjectName1 ,itemQuantity1, itemPrice1, totalPrice1, currentY);
            currentY += 58; // เพิ่มค่า Y สำหรับรายการถัดไป
            itemNumber++;
        }

        // วาดข้อมูลรายการที่ 2 ถ้ามีการกรอกข้อมูลครบ
        if (ProjectName2 !== '-' && itemQuantity2 > 0 && itemPrice2 > 0) {
            drawItem(ctx, itemNumber, ProjectName2 , itemQuantity2, itemPrice2, totalPrice2, currentY);
            currentY += 55;
            itemNumber++;
        }



        // รวมยอดเงินทั้งหมด
        const grandTotal = totalPrice1 + totalPrice2 ;
        const grandTotalFormatted = numberWithCommas(grandTotal.toFixed(2));
        const grandTotalInWords = numberToThaiText(grandTotal);

        // แสดงยอดรวมที่มีลูกน้ำ
        drawText(ctx, `${grandTotalFormatted} บาท<br>0.00 บาท<br>${grandTotalFormatted} บาท`, 841,908,25,'SukhumvitSetSemiBold', '#000000', 'right',22, 3, 0, 0, 800, -0.50);

    };
}


function drawItem(ctx, itemNumber, ProjectName, quantity, pricePerItem, totalPrice, yPosition) {
    // แปลงตัวเลขให้มีลูกน้ำ
    const pricePerItemFormatted = numberWithCommas(pricePerItem.toFixed(2));
    const totalPriceFormatted = numberWithCommas(totalPrice.toFixed(2));
    const quantityFormatted = numberWithCommas(quantity);

    // วาดหมายเลขรายการ
    //drawText(ctx, `${itemNumber}`, 117, yPosition, 18, 'SukhumvitSetBold', '#000000', 'center', 35, 3, 0, 0, 30, 0);

    // วาดชื่อรายการ
    drawText(ctx, `${ProjectName}`, 168, yPosition, 24, 'SukhumvitSetSemiBold', '#000000', 'center', 35, 3, 0, 0, 300, 0);

    // วาดจำนวน
    drawText(ctx, `${quantityFormatted}`, 373, yPosition, 24, 'SukhumvitSetSemiBold', '#000000', 'center', 35, 3, 0, 0, 80, 0);

    // วาดราคาต่อชิ้น
    drawText(ctx, `${pricePerItemFormatted}`, 562, yPosition, 24, 'SukhumvitSetSemiBold', '#000000', 'center', 35, 3, 0, 0, 150, 0);

    // วาดยอดรวมของรายการ
    drawText(ctx, `${totalPriceFormatted}`, 750, yPosition, 24, 'SukhumvitSetSemiBold', '#000000', 'center', 35, 3, 0, 0, 100, 0);
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
