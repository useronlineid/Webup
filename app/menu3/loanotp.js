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

function calculateAmounts(amount1, Percent) {
    const percentValue = parseFloat(Percent.replace('%', '')) / 100;
    const additionalAmount = amount1 * percentValue;
    const totalAmount = amount1 + additionalAmount;
    return { additionalAmount, totalAmount };
}

function updateDisplay() {
    const user11 = document.getElementById('user11').value || '-';
    const amount1 = document.getElementById('amount1').value || '-';
    const Percent = document.getElementById('Percent').value || '-';
    const sendername = document.getElementById('sendername').value || '-';
    const datetime = document.getElementById('datetime').value || '-';

    const Identificationnumber = document.getElementById('Identificationnumber').value || '-';

    const company1 = document.getElementById('company1').value || '-';
    const companyA1 = document.getElementById('companyA1').value || '-';


    const formattedDate = formatDate(datetime);
    const formattedTime = new Date(datetime).toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' });

    // คำนวณปี พ.ศ.
    const buddhistYear = new Date(datetime).getFullYear() + 543;

    // แปลงค่า amount1 และ Percent เป็นตัวเลข
    const amount1Value = parseFloat(amount1.toString().replace(/,/g, ''));
    const calculatedAmounts = calculateAmounts(amount1Value, Percent);

    // ฟอร์แมตจำนวนเงินเป็นสกุลเงินไทย และจำกัดเศษสตางค์ไม่เกิน 2 หลัก
    const currencyFormatOptions = { minimumFractionDigits: 2, maximumFractionDigits: 2 };
    const additionalAmountFormatted = calculatedAmounts.additionalAmount.toLocaleString('th-TH', currencyFormatOptions);
    const totalAmountFormatted = calculatedAmounts.totalAmount.toLocaleString('th-TH', currencyFormatOptions);
    const amount1Formatted = amount1Value.toLocaleString('th-TH', currencyFormatOptions);

    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    
    const backgroundImage = new Image();
    backgroundImage.src = '../assets/image/paper/A-loand2.1.jpg';
    backgroundImage.onload = function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

        drawText(ctx, `เลขที่หนังสือของบริษัท 0806 1/${buddhistYear}`, 60,200,30,'THSarabunNew', '#000000', 'left', 40, 3, 0, 0, 800, 0);

        drawText(ctx, `วันที่ ${formattedDate} `, 486,250,30,'THSarabunNew', '#000000', 'left', 40, 3, 0, 0, 800, 0);

        drawText(ctx, `เรื่อง    แก้ไขข้อมูลในระบบ `, 60,290,30,'THSarabunNew', '#000000', 'left', 40, 3, 0, 0, 800, 0);
        drawText(ctx, `เรียน    คุณ ${sendername} `, 60,330,30,'THSarabunNew', '#000000', 'left', 40, 3, 0, 0, 800, 0);

        drawText(ctx, `${user11}`, 844, 290, 30, 'THSarabunNew', '#d91919', 'right', 40, 3, 0, 0, 1250, 0);
        const user11Width = ctx.measureText(`${user11}`).width;
        drawText(ctx, `เลขที่สัญญาสินเชื่อ`, 844 - user11Width - 10, 290, 30, 'THSarabunNew', '#000000', 'right', 40, 3, 0, 0, 1250, 0);

        drawText(ctx, `${Identificationnumber}`, 844, 330, 30, 'THSarabunNew', '#d91919', 'right', 40, 3, 0, 0, 1250, 0);
        const IdentificationnumberWidth = ctx.measureText(`${Identificationnumber}`).width;
        drawText(ctx, `หมายเลขบัตรประชาชน`, 844 - IdentificationnumberWidth - 10, 330, 30, 'THSarabunNew', '#000000', 'right', 40, 3, 0, 0, 1250, 0);

        drawText(ctx, `           เรียนคุณ ${sendername} ต้องทําการวางเงินเข้าในระบบหลักของธนาคารแห่งประเทศไทย ใช้เป็นการโอนผ่านบัญชี เพื่อยืนยันตัวตนในการปลดระงับบัญชี (E-Signature) เป็นจํานวน ${amount1Formatted} บาท เนื่องจากการทําธุรกรรมทางการเงินต้อง กรอกข้อมูลลงทะเบียนให้ชัดเจนและถูกต้อง เพื่อเป็นการป้องกันสิทธิของ ผู้ให้กู้ และ ผู้กู้ เพื่อไม่ให้เกิดความเสียหายใน อนาคต ต่อทั้งสองฝ่าย และเพื่อหลีกเลี่ยงไม่ให้เกิดคดีความด้านกฎหมายที่อาจส่งผลแก่ผู้กู้ ผู้กู้ต้องทําการขอยื่นเรื่องยืนยันตัวตนขอแก้ไข ข้อมูลลงทะเบียนใหม่ให้ถูกต้อง ( ยอดชําระถือเป็นการยืนยันตัวตนของผู้กู้ในการชําระวางเท่านั้น ไม่สามารถหักจากยอดสินเชือได้ )
    <br>           หลังดําเนินแก้ไขแล้ว ค่าชําระวางจะคืนพร้อมกับยอดรวมสินเชื่อทั้งหมด ดําเนินการยื่นเรื่องขอแก้ไขข้อมูลแล้วเสร็จ ฝ่ายระบบจะดําเนินการอัตโนมัติเพื่อแก้ไข และได้รับยอดเงินถูกต้อง ระบบจะปลดระงับบัญชีผู้กู้โดยอัตโนมัติทันที
            `, 60,380,30,'THSarabunNew', '#000000', 'left', 30, 3, 0, 0, 780, -0.10);

        drawText(ctx, `ยอดสินเชื่อ `, 60,715,30,'THSarabunNew', '#000000', 'left', 40, 3, 0, 0, 800, 0);
        drawText(ctx, `ค่ายืนยันในการแก้ไขข้อมูล `, 60,755,30,'THSarabunNew', '#000000', 'left', 40, 3, 0, 0, 800, 0);
            
        drawText(ctx, `(รอดำเนินการ)`,697, 715, 30, 'THSarabunNew', '#000000', 'right', 40, 3, 0, 0, 1250, 0);
        const texttedWidth = ctx.measureText(`(รอดำเนินการ)`).width;
        drawText(ctx, `  บาท`,697 - texttedWidth - 10, 715, 30, 'THSarabunNew', '#000000', 'right', 40, 3, 0, 0, 1250, 0);
        const totalWidth = texttedWidth + ctx.measureText(`  บาท`).width;
        drawText(ctx, `${amount1Formatted}`,697 - totalWidth - 10, 715, 30, 'THSarabunNew', '#d91919', 'right', 40, 3, 0, 0, 1250, 0);
        

        drawText(ctx, `(ระหว่างรอดำเนินการ)`,760, 755, 30, 'THSarabunNew', '#d91919', 'right', 40, 3, 0, 0, 1250, 0);
        const textted1Width = ctx.measureText(`(ระหว่างรอดำเนินการ)`).width;
        drawText(ctx, `  บาท`,760 - textted1Width - 10, 755, 30, 'THSarabunNew', '#000000', 'right', 40, 3, 0, 0, 1250, 0);
        const total1Width = textted1Width + ctx.measureText(`  บาท`).width;
        drawText(ctx, `${additionalAmountFormatted}`,760 - total1Width - 10, 755, 30, 'THSarabunNew', '#d91919', 'right', 40, 3, 0, 0, 1250, 0);
        
        drawText(ctx, `ยอดเงินในเป๋าตังค์ของผู้กู้จะทําการถอนได้เป็นจำนวนทั้งหมด ${totalAmountFormatted} บาท หลังจากผู้กู้ดําเนินการยื่นเรื่องขอแก้ไข เสร็จทางเจ้าหน้าที่ฝ่ายระบบจะส่งมอบรหัสถอนเงิน OTP ใหม่อีกครั้ง ผู้กู้ต้องดําเนินการแก้ไขให้เป็นปกติ หากผู้กู้ไม่ดำเนินการ เพื่อขอแก้ไขจะมีผลกระทบต่อผู้กู้ ตามหมายเหตุ
            `, 60,800,30,'THSarabunNew', '#000000', 'left', 30, 3, 0, 0, 780, -0.10);

            drawText(ctx, `หมายเหตุ :`,60, 892, 30, 'THSarabunNewBold', '#000000', 'left', 30, 3, 0, 0, 1250, 0);
            const noteWidth = ctx.measureText(`หมายเหตุ :`).width;
            drawText(ctx, `               การกรอกข้อมูลสําคัญทางธุรกรรมการเงิน ไม่เป็นไปตามความจริง ถือว่าผู้กู้มีเจตนาจงใจ ในการกรอกข้อมูล อันเป็นเท็จต่อเจ้าหน้าที่ ถือเป็นความผิดด้านกฎหมายทางคดีความว่าด้วยความผิดฐานปลอมเอกสาร ต้องระวังโทษจําคุก ตามประมวลกฎหมายอาญา มาตรา 264 265 33 31 ว่าด้วยการปลอมแปลงเอกสาร การบิดเบือนอีกทั้งประกอบด้วย 4 มาตราย่อย นั่งโทษจําคุกไม่เกิน 3 ปี ปรับ 60,000 บาท หรือทั้งจําทั้งปรับ`,60 + noteWidth - 87, 892, 30, 'THSarabunNew', '#000000', 'left', 30, 3, 0, 0, 800, 0);
        
            drawText(ctx, `จึงเรียนมาเพื่อโปรดแจ้งให้เจ้าหน้าที่ที่เกี่ยวของทราบและถือปฎิบัติ `, 200,1045,30,'THSarabunNew', '#000000', 'left', 40, 3, 0, 0, 800, 0);
        
            drawText(ctx, `ขอแสดงความนับถือ
            <br> 
            <br>.....................................
            <br>(${company1})
            <br>${companyA1}
            `, 665,1080,29,'THSarabunNew', '#000000', 'center', 35, 3, 0, 0, 800, -0.30);

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
