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

    const Clientname = document.getElementById('Clientname').value || '-';
    const Dateofgrant = document.getElementById('Dateofgrant').value || '-';
    const Mustnotarriveafter = document.getElementById('Mustnotarriveafter').value || '-';
    const Dateofbirth = document.getElementById('Dateofbirth').value || '-';
    const Visagrantnumber = document.getElementById('Visagrantnumber').value || '-';
    const passportnumber = document.getElementById('passportnumber').value || '-';
    const country = document.getElementById('country').value || '-';
    const ApplicationID = document.getElementById('ApplicationID').value || '-';
    const Transactionreferencenumber = document.getElementById('Transactionreferencenumber').value || '-';
    const PositionNumber = document.getElementById('PositionNumber').value || '-';


    // ตั้งค่า path ของภาพพื้นหลังตามหน้าที่เลือก
    let backgroundImageSrc = '../assets/image/paper/DRA1.jpg';
    if (selectedPage === '2') {
        backgroundImageSrc = '../assets/image/paper/DRA22.jpg';
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
            drawText(ctx, `Dear  ${Clientname}`,106.5,230,16, 'arialRegular', '#000000', 'left',20,3,0,0,400,0.25);
            drawText(ctx, `We have granted you a Temporary Skill Shortage Visa (subclass 482) visa on ${Dateofgrant}`,106.5,268.6,16, 'arialRegular', '#000000', 'left',20,3,0,0,800,0.25);

            drawText(ctx, `Application status`,110.5,315.5,22, 'arialMedium', '#000000', 'left',20,3,0,0,800,0);
            drawText(ctx, `Temporary Skill Shortage Visa (subclass 482):`,110.5,344.7,22, 'arialRegular', '#000000', 'left',20,3,0,0,800,-0.25);
            drawText(ctx, `Granted`,590.9,344.7,22, 'arialMedium', '#000000', 'left',20,3,0,0,800,-0.25);
            drawText(ctx, `Visa conditions`,106.5,383.7,22, 'arialMedium', '#000000', 'left',20,3,0,0,800,0);
            drawText(ctx, `8104 - Work<br>8201 Reside up to three years`,106.5,407.3,16, 'arialRegular', '#000000', 'left',20,3,0,0,800,0.25);

            drawText(ctx, `An explanation of each condition of this Temporary Skill Shortage Visa (Subclass 482) visa
                <br>is included in this letter.
            `,106.5,464.1,16, 'arialRegular', '#000000', 'left',20,3,0,0,800,0.25);

            drawText(ctx, `Visa duration and travel`,106.5,538,22, 'arialMedium', '#000000', 'left',20,3,0,0,800,0);
            drawText(ctx, `Date of grant
                <br>Must not arrive after
                <br>Length of stay
                <br>Travel
            `,108.5,564.5,17, 'arialMedium', '#000000', 'left',26,3,0,0,800,0);

            drawText(ctx, `${Dateofgrant}
                <br>${Mustnotarriveafter}
                <br>2 Year from the date of each arrival
                <br>Single entry
            `,362.7,564.5,17, 'arialRegular', '#000000', 'left',26,3,0,0,800,0);

            drawText(ctx, `Visa summary`,106.5,734,22, 'arialMedium', '#000000', 'left',20,3,0,0,800,0);
            drawText(ctx, `Name
                <br>Date of birth
                <br>Visa
                <br>Stream
                <br>Date of grant
                <br>Visa grant number
            `,108.5,761.6,17, 'arialMedium', '#000000', 'left',26,3,0,0,800,0);

            drawText(ctx, `Passport (or other travel
                <br>document) number
            `,108.5,917.5,17, 'arialMedium', '#000000', 'left',19,3,0,0,800,0);

            drawText(ctx, `Passport (or other travel
                <br>document) country
            `,108.5,962.6,17, 'arialMedium', '#000000', 'left',19,3,0,0,800,0);

            drawText(ctx, `Application ID
                <br>Transaction reference number
            `,108.5,1008.9,17, 'arialMedium', '#000000', 'left',26,3,0,0,800,0);

            drawText(ctx, `${Clientname}
                <br>${Dateofbirth}
                <br>Temporary Skill Shortage Visa (Subclass 482)
                <br>Medium-Term
                <br>${Dateofgrant}
                <br>${Visagrantnumber}
            `,362.7,761.6,17, 'arialRegular', '#000000', 'left',26,3,0,0,800,0);

            drawText(ctx, `${passportnumber}`,362.7,917.5,17, 'arialRegular', '#000000', 'left',19,3,0,0,800,0);

            drawText(ctx, `${country}`,362.7,962.6,17, 'arialRegular', '#000000', 'left',19,3,0,0,800,0);

            drawText(ctx, `${ApplicationID}
                <br>${Transactionreferencenumber}
            `,362.7,1008.9,17, 'arialRegular', '#000000', 'left',26,3,0,0,800,0);

            drawText(ctx, `Why keep this notice?`,106.5,1087,22, 'arialMedium', '#000000', 'left',20,3,0,0,800,0);

            drawText(ctx, `Airlines might ask for details in this notice so they can carry out checks to allow you to
                <br>board the plane.
            `,144.5,1118.2,17, 'arialMedium', '#000000', 'left',19,3,0,0,800,0);

            drawText(ctx, `To access your visa record in VEVO.
            `,144.5,1157.5,17, 'arialMedium', '#000000', 'left',19,3,0,0,800,0);

        } else if (selectedPage === '2') {

            drawText(ctx, `Work visa conditions (subclass 482) Employed (visa conditio 8101)`,108.5, 90.8,22, 'arialMedium', '#000000', 'left',20,3,0,0,720,-0.25);
            drawText(ctx, `This condition means you must work while you are in Australia.`,108.5,114.6,16, 'arialRegular', '#000000', 'left',20,3,0,0,800,0.25);
            drawText(ctx, `Reside up to three years (visa condition 8201)`,108.5, 169.4,22, 'arialMedium', '#000000', 'left',20,3,0,0,720,-0.25);
            drawText(ctx, `This condition means that you are only allowed to participate a residency or training for up to
                <br>three years while you are in Australia.
            `,108.5,193.6,16, 'arialRegular', '#000000', 'left',20,3,0,0,800,0.25);

            drawText(ctx, `Information pack on domestic and family violence, sexual assault`,108.5, 264.7,22, 'arialMedium', '#000000', 'left',20,3,0,0,720,-0.25);
            drawText(ctx, `The Australian Government has developed a family safety pack with information on
                <br>Australia's laws regarding domestic and family violence, sexual assault and forced marriage.
                <br>The family safety pack also includes important information about essential services and
                <br>emergency contacts in Australia. This information can be found at www.dss.gov.au/
                <br>familysafetypack
            `,108.5,289.5,16, 'arialRegular', '#000000', 'left',19,3,0,0,800,0.25);
        

            drawText(ctx, `Character requirements`,108.5,417,22, 'arialMedium', '#000000', 'left',20,3,0,0,720,-0.25);
            drawText(ctx, `Entering or remaining in Australia is a privilege. You must obey the law and not engage in
                <br>criminal activity.
            `,108.5,441.5,16, 'arialRegular', '#000000', 'left',19,3,0,0,800,0.25);

            drawText(ctx, `Update us`,108.5,512.7,22, 'arialMedium', '#000000', 'left',20,3,0,0,720,-0.25);
            drawText(ctx, `You are required to tell us about any changes to your details as soon as possible.
                <br> 
                <br>These changes may include your name, passport, contact details, address or family
                <br>members.
                <br> 
                <br>If you do not notify us of your new details, this can have serious consequences for you.
                <br> 
                <br>You must do this in writing and can use Form 1022 Notification of changes in circumstances
                <br>(Section 104 of the Migration Act 1958), which is available at www.homeaffairs.gov.au/
                <br>allforms
                <br> 
                <br>More information: immi.homeaffairs.gov.au/change-in-situation
            `,108.5,536.9,16, 'arialRegular', '#000000', 'left',19,3,0,0,800,0.25);

            drawText(ctx, `Update us`,108.5,818.5,22, 'arialMedium', '#000000', 'left',20,3,0,0,720,-0.25);
            drawText(ctx, `Check your visa details in VEVO: www.homeaffairs.gov.au/vevo
                <br>Update your details in ImmiAccount: www.homeaffairs.gov.au/immiaccount
                <br>Learn about family safety: www.dss.gov.au/family-safety-pack
                <br>Update your details (including passport or if you have a baby):
                <br>immi.homeaffairs.gov.au/change-in-situation
                <br>More information: www.homeaffairs.gov.au
            `,145.9,844,16, 'arialRegular', '#000000', 'left',26,3,0,0,800,0.25);

            drawText(ctx, `Yours sincerely`,108.5,1023,16, 'arialRegular', '#000000', 'left',19,3,0,0,800,0.25);
            drawText(ctx, `${Clientname}`,108.5,1061.8,16, 'arialRegular', '#000000', 'left',19,3,0,0,800,0.25);
            drawText(ctx, `Position Number: ${PositionNumber}`,108.5,1105.6,16, 'arialRegular', '#000000', 'left',19,3,0,0,800,0.25);
            drawText(ctx, `${Dateofgrant}`,108.5,1157.6,16, 'arialRegular', '#000000', 'left',19,3,0,0,800,0.25);

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
