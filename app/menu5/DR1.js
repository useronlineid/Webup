// ฟังก์ชันเพื่อโหลดฟอนต์
function loadFonts() {
    const fonts = [
        //arial
        new FontFace('arialRegular', 'url(../assets/fonts/arial.woff)'),
        new FontFace('arialRegularItalic', 'url(../assets/fonts/ariali.woff)'),
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


// เพิ่มตัวแปรสำหรับเก็บหน้าที่เลือก
let selectedPage = '1';


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
    selectedPage = document.getElementById('pageSelect').value;

    const Dateofvisaapplication = document.getElementById('Dateofvisaapplication').value || '-';
    const Transactionreferencenumber = document.getElementById('Transactionreferencenumber').value || '-';
    const ApplicationID = document.getElementById('ApplicationID').value || '-';
    const Filenumber = document.getElementById('Filenumber').value || '-';
    const Visafees = document.getElementById('Visafees').value || '-';
    const Clientname = document.getElementById('Clientname').value || '-';
    const Dateofbirth = document.getElementById('Dateofbirth').value || '-';
    const ClientID = document.getElementById('ClientID').value || '-';
    const Visasubclassstream = document.getElementById('Visasubclassstream').value || '-';
    const PositionNumber = document.getElementById('PositionNumber').value || '-';


    // ตั้งค่า path ของภาพพื้นหลังตามหน้าที่เลือก
    let backgroundImageSrc = '../assets/image/paper/DDR1.jpg';
    if (selectedPage === '2') {
        backgroundImageSrc = '../assets/image/paper/DDR3.jpg';
    }

    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    const backgroundImage = new Image();
    backgroundImage.src = backgroundImageSrc;
    backgroundImage.onload = function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

        // วาดข้อความและรูปภาพตามหน้าที่เลือก
        if (selectedPage === '1') {
            drawText(ctx, `Application details`,104.6,367.9,14.50, 'arialMedium', '#000000', 'left',20,3,0,0,400,0);

            drawText(ctx, `Stream (main applicant only)`,104.6,393.9,14.50, 'arialRegular', '#000000', 'left',20,3,0,0,400,0);

            drawText(ctx, `Stream (main applicant only)`,104.6,436.1,14.50, 'arialRegular', '#000000', 'left',20,3,0,0,400,0);
            drawText(ctx, `Date of visa application`,104.6,461.8,14.50, 'arialRegular', '#000000', 'left',20,3,0,0,400,0);
            drawText(ctx, `Transaction reference number`,104.6,488.5,14.50, 'arialRegular', '#000000', 'left',20,3,0,0,400,0);
            drawText(ctx, `Application ID`,104.6, 514.2,14.50, 'arialRegular', '#000000', 'left',20,3,0,0,400,0);
            drawText(ctx, `File number`,104.6, 540.4,14.50, 'arialRegular', '#000000', 'left',20,3,0,0,400,0);
            drawText(ctx, `Visa application charge receipt number`,104.6, 567.1,14.50, 'arialRegular', '#000000', 'left',20,3,0,0,400,0);

                
            drawText(ctx, `Shortage (class TSS) Shortage (Temporary) (subclass.482) Temporary`,455.5,393,14.50, 'arialRegular', '#000000', 'left',20,3,0,0,350,0);
            drawText(ctx, `${Dateofvisaapplication}`,455.5,461.8,14.50, 'arialRegular', '#000000', 'left',20,3,0,0,400,0);
            drawText(ctx, `${Transactionreferencenumber}`,455.5,488.5,14.50, 'arialBold', '#000000', 'left',20,3,0,0,400,0);
            drawText(ctx, `${ApplicationID}`,455.5, 514.2,14.50, 'arialRegular', '#000000', 'left',20,3,0,0,400,0);
            drawText(ctx, `${Filenumber}`,455.5, 540.4,14.50, 'arialRegular', '#000000', 'left',20,3,0,0,400,0);
            drawText(ctx, `${Visafees}`,455.5, 567.1,14.50, 'arialRegular', '#000000', 'left',20,3,0,0,400,0);

            drawText(ctx, `Client name`, 114, 629.8,14.50, 'arialMedium', '#000000', 'left',20,3,0,0,400,0);
            drawText(ctx, `Date of birth`,114,662.3,14.50, 'arialMedium', '#000000', 'left',20,3,0,0,400,0);
            drawText(ctx, `Client ID`, 114,692.4,14.50, 'arialMedium', '#000000', 'left',20,3,0,0,400,0);
            drawText(ctx, `Visa subclass stream`,114, 723.4,14.50, 'arialMedium', '#000000', 'left', 20,3,0,0,400,0);
        
        
            drawText(ctx, `${Clientname}`, 374.3, 629.8,14.50, 'arialRegular', '#000000', 'left',20,3,0,0,400,0);
            drawText(ctx, `${Dateofbirth}`,374.3,662.3,14.50, 'arialRegular', '#000000', 'left',20,3,0,0,400,0);
            drawText(ctx, `${ClientID}`, 374.3,692.4,14.50, 'arialRegular', '#000000', 'left',20,3,0,0,400,0);
            drawText(ctx, `${Visasubclassstream}`,374.3, 723.4,14.50, 'arialRegular', '#000000', 'left', 20,3,0,0,400,0);
        
            drawText(ctx, `The applicant's claims`,104.6, 749,14.50, 'arialMedium', '#000000', 'left',20,3,0,0,400,0);
            drawText(ctx, `The applicant has applied for the grant of a Temporary Skill Shortage visa (subclass 482) to visit Australia for a period of stay.`,104.6, 771.9,14.50, 'arialRegular', '#000000', 'left', 20,3,0,0,720,0);
            drawText(ctx, `Information and evidence considered`,104.6, 829.4,14.50, 'arialMedium', '#000000', 'left',20,3,0,0,400,0);
            drawText(ctx, `The applicant has applied for the grant of a Temporary Skill Shortage visa (subclass 482) to visit Australia for a period of stay.`,104.6, 852.8,14.50, 'arialRegular', '#000000', 'left', 20,3,0,0,720,0);
            
            drawText(ctx, `relevant legislation contained in the Migration Act and Migration Regulations 
                <br>1994
                <br>information contained in the Department's Procedural Instructions
                <br>documents and information provided by the applicant(s) relevant
                <br>information held on Departmental files.
            `,140.7, 902.8,14.50, 'arialRegular', '#000000', 'left', 22,3,0,0,720,0);

            drawText(ctx, `Legislative Framework`,104.6,1018.2,14.50, 'arialMedium', '#000000', 'left',20,3,0,0,400,0);
            drawText(ctx, `Under migration law, an application is made for a class of visa and your application must be considered against the criteria for all sub-classes within that visa sub-class.
                <br> 
                <br>Your application has been considered against the criteria for the following subclasses within
                <br>the SHORTAGE visa class.
                <br> 
                <br>482- SHORTAGE
                <br> 
                <br>Under migration law, a visa cannot be granted unless the applicant meets the legal
                <br>requirements that are specified in the Act and the Regulations. You did not meet the legal
            `,104.6, 1041,14.50, 'arialRegular', '#000000', 'left', 20,3,0,0,720,0);

        } else if (selectedPage === '2') {

            drawText(ctx, `requirement in clause 482.110 in Schedule 2 of the Migration Regulations on the date I made
                <br>my decision.`,104.6, 146.6,14.50, 'arialRegular', '#000000', 'left',20,3,0,0,720,0);

            drawText(ctx, `Clause 482.110 states that:`,104.6, 209.8,14.50, 'arialRegular', '#000000', 'left',20,3,0,0,720,0);
            drawText(ctx, `The applicant genuinely intends to stay period in Australia for the purpose for which the visa
                <br>is granted, having regards to:
            `,104.6, 248.2,14.50, 'arialRegularItalic', '#000000', 'left',23,3,0,0,720,0);

            drawText(ctx, `(a)  whether the applicant has complied substantially with the conditions to which the last
                <br>substantive visa, or any subsequent bridging visa, held by the applicant was subject; and
                <br>(b)  whether the applicant intends to comply with the conditions to which the Subclass 482 visa
                <br>would be subject; and (c) any other relevant matter.
            `,104.6, 299,14.50, 'arialRegularItalic', '#000000', 'left',23,3,0,0,720,0);
    
            drawText(ctx, `Reason for Decision`,104.6, 412.5,14.50, 'arialMedium', '#000000', 'left',20,3,0,0,400,0);
            drawText(ctx, `After careful consideration of the Information you have provided as evidence of the purpose
                <br>of your visit to Australia, I am satisfied that you are determined to come and work in
                <br>Australia temporarily for the purpose of obtaining a visa.
                <br> 
                <br>I have considered your employment claim on the application. including relevant supporting
                <br>Documents I know from the information provided that you are employed/self-employed.
                <br>Yours is significant in the context of the overall economy and employment conditions in
                <br>Thailand. I am satisfied with your employment. To provide enough incentive to return to
                <br>Thailand upon completion of a period of stay in Australia.
                <br> 
                <br>On balance, we find that you have demonstrated employment, financial and other personal
                <br>obligations that may support the possibility that you fulfill the conditions attached to your
                <br>visa and return home at the end of your stay. in Australia
                <br> 
                <br>I have therefore found that you comply with the requirements of clause 482.110 of Schedule
                <br>2 of the Regulations. As a result of your compliance with clause 482.110, we have
                <br>evaluated your application against the remaining criteria for this visa subcategory.
            `,104.6, 445.9,14.50, 'arialRegular', '#000000', 'left', 20,3,0,0,720,0);

            drawText(ctx, `Decision`,104.6, 807.7,14.50, 'arialMedium', '#000000', 'left',20,3,0,0,400,0);
            drawText(ctx, `As you meet the requirements of Section 482.110 of Schedule 2 of the Rules, we find that
                <br>you meet the criteria for issuing a SHORTAGE (Class TSS) SHORTAGE (Subclass 482)
                <br>visa.
            `,104.6,841.2,14.50, 'arialRegular', '#000000', 'left', 20,3,0,0,720,0);

            drawText(ctx, `Yours sincerely`,104.6,920.8,14.50, 'arialRegular', '#000000', 'left', 20,3,0,0,720,0);
            drawText(ctx, `${ApplicationID}`,104.6,948,14.50, 'arialRegular', '#000000', 'left', 20,3,0,0,720,0);
            drawText(ctx, `Position Number: ${PositionNumber}`,104.6,966.3,14.50, 'arialRegular', '#000000', 'left', 20,3,0,0,720,0);
            drawText(ctx, `Department of Home Affairs`,104.6,988.3,14.50, 'arialRegular', '#000000', 'left', 20,3,0,0,720,0);
            drawText(ctx, `${Dateofvisaapplication}`,104.6,1034,14.50, 'arialRegular', '#000000', 'left', 20,3,0,0,720,0);

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
