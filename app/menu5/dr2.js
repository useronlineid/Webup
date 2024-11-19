let selectedOption = 'no';  // ค่าตั้งต้น

// ฟังก์ชันเพื่อสลับรูปภาพตามที่เลือก
function toggleImage(option) {
    selectedOption = option;
    updateDisplay();
}

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
    const d = new Date(date);
    const day = padZero(d.getDate());
    const month = padZero(d.getMonth() + 1); // เดือนเริ่มต้นที่ 0 ดังนั้นต้องบวก 1
    const year = d.getFullYear() + 543; // แปลงเป็น พ.ศ.
    return { day, month, year };
}

// ตัวอย่างการใช้งาน
console.log(formatDate(new Date())); // เช่น "18/11/2567"
console.log(formatDate('2024-12-01')); // "01/12/2567"


function formatBirthDate(date) {
    if (!date || date === '-') {
        return '-';
    }

    const months = [
        '01', '02', '03', '04', '05', '06',
        '07', '08', '09', '10', '11', '12'
    ];

    const d = new Date(date);
    const day = padZero(d.getDate()); // Zero-pad the day
    const month = months[d.getMonth()];
    const year = d.getFullYear();

    return `${day}${month}${year}`;
}

function formatBirthDate1(date) {
    if (!date || date === '-') {
        return '-';
    }

    const months = [
        '01', '02', '03', '04', '05', '06',
        '07', '08', '09', '10', '11', '12'
    ];

    const d = new Date(date);
    const day = padZero(d.getDate()); // Zero-pad the day
    const month = months[d.getMonth()];
    const year = d.getFullYear();

    return `${day}${month}${year}`;
}

function formatCustomDate(date) {
    if (!date || date === '-') {
        return '-';
    }

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const d = new Date(date);
    const day = d.getDate();
    const month = months[d.getMonth()];
    const year = d.getFullYear();

    // แสดงในรูปแบบ '24 January 2024'
    return `${month} ${year} - ${day} `;
}

        // ตั้งค่าวันที่ปัจจุบันเป็นค่าเริ่มต้นใน input date
        document.addEventListener('DOMContentLoaded', function() {
            const today = new Date().toISOString().split('T')[0];
            document.getElementById('customDate').value = today;
        });



let showZImage = true; // ประกาศตัวแปรสถานะการแสดงภาพ

function toggleZImage() {
    showZImage = !showZImage; // สลับสถานะ
    updateDisplay(); // อัปเดตการแสดงผล
}

// ประกาศตัวแปรเพื่อเก็บแมปปิ้งจังหวัด
const provinceMap = {
    "กรุงเทพมหานคร": "BANGKOK",
    "กระบี่": "KRABI",
    "กาญจนบุรี": "KANCHANABURI",
    "กาฬสินธุ์": "KALASIN",
    "กำแพงเพชร": "KAMPHAENG PHET",
    "ขอนแก่น": "KHON KAEN",
    "จันทบุรี": "CHAN THABURI",
    "ฉะเชิงเทรา": "CHACHOENGSAO",
    "ชลบุรี": "CHON BURI",
    "ชัยนาท": "CHAINAT",
    "ชัยภูมิ": "CHAIYAPHUM",
    "ชุมพร": "CHUMPHON",
    "เชียงราย": "CHIANG RAI",
    "เชียงใหม่": "CHIANG MAI",
    "ตรัง": "TRANG",
    "ตราด": "TRAT",
    "ตาก": "TAK",
    "นครนายก": "NAKHON NAYOK",
    "นครปฐม": "NAKHON PATHOM",
    "นครพนม": "NAKHON PHANOM",
    "นครราชสีมา": "NAKHON RATCHASIMA",
    "นครศรีธรรมราช": "NAKHON SI THAMMARAT",
    "นครสวรรค์": "NAKHON SAWAN",
    "นนทบุรี": "NONTHABURI",
    "นราธิวาส": "NARATHIWAT",
    "น่าน": "NAN",
    "บึงกาฬ": "BUENG KAN",
    "บุรีรัมย์": "BURIRAM",
    "ปทุมธานี": "PATHUM THANI",
    "ประจวบคีรีขันธ์": "PRACHUAP KHIRI KHAN",
    "ปราจีนบุรี": "PRACHIN BURI",
    "ปัตตานี": "PATTANI",
    "พระนครศรีอยุธยา": "PHRA NAKHON SI AYUTTHAYA",
    "พังงา": "PHANGNGA",
    "พัทลุง": "PHATTHALUNG",
    "พิจิตร": "PHICHIT",
    "พิษณุโลก": "PHITSANULOK",
    "เพชรบุรี": "PHETCHABURI",
    "เพชรบูรณ์": "PHETCHABUN",
    "แพร่": "PHRAE",
    "พะเยา": "PHAYAO",
    "ภูเก็ต": "PHUKET",
    "มหาสารคาม": "MAHA SARAKHAM",
    "มุกดาหาร": "MUKDAHAN",
    "แม่ฮ่องสอน": "MAE HONG SON",
    "ยโสธร": "YASOTHON",
    "ยะลา": "YALA",
    "ร้อยเอ็ด": "ROI ET",
    "ระนอง": "RANONG",
    "ระยอง": "RAYONG",
    "ราชบุรี": "RATCHABURI",
    "ลพบุรี": "LOP BURI",
    "ลำปาง": "LAMPANG",
    "ลำพูน": "LAM PHUN",
    "เลย": "LOEI",
    "ศรีสะเกษ": "SI SA KET",
    "สกลนคร": "SAKON NAKHON",
    "สงขลา": "SONGKHLA",
    "สตูล": "SATUN",
    "สมุทรปราการ": "SAMUT PRAKAN",
    "สมุทรสงคราม": "SAMUT SONGKHRAM",
    "สมุทรสาคร": "SAMUT SAKHON",
    "สระแก้ว": "SA KAEO",
    "สระบุรี": "SARABURI",
    "สิงห์บุรี": "SING BURI",
    "สุโขทัย": "SUKHOTHAI",
    "สุพรรณบุรี": "SUPHAN BURI",
    "สุราษฎร์ธานี": "SURAT THANI",
    "สุรินทร์": "SURIN",
    "หนองคาย": "NONG KHAI",
    "หนองบัวลำภู": "NONG BUA LAM PHU",
    "อ่างทอง": "ANG THONG",
    "อำนาจเจริญ": "AMNAT CHAROEN",
    "อุดรธานี": "UDON THANI",
    "อุตรดิตถ์": "UTTARADIT",
    "อุทัยธานี": "UTHAI THANI",
    "อุบลราชธานี": "UBON RATCHATHANI"
};

// ฟังก์ชันเพื่ออัปเดตค่า province ที่ซ่อนอยู่
function updateProvinceValue() {
    const provinceInput = document.getElementById('provinceInput').value;
    const provinceCode = provinceMap[provinceInput] || ''; // หากไม่พบ ให้ตั้งค่าเป็นค่าว่าง
    document.getElementById('province').value = provinceCode;
}



// Positions for each title image
const titleImagePositions = {
    'Mr': { x: 207, y: 472 },
    'Mrs': { x: 265, y: 472 },
    'Ms': { x: 320, y: 472 },
    'Miss': { x: 385, y: 472 },
    'Dr': { x: 433, y: 472 }
};

// Fixed position for the title text
const titleTextPosition = { x: 611, y: 498 }; // Adjust x and y as needed

// Variable to store the selected title
let selectedTitle = '';

// Function to handle title button clicks
function selectTitle(title) {
    selectedTitle = title;
    document.getElementById('selectedTitle').value = title;
    updateTitleButtons();
    updateDisplay();
}

// Function to update the styling of title buttons
function updateTitleButtons() {
    const buttons = document.querySelectorAll('.title-btn');
    buttons.forEach(button => {
        if (button.getAttribute('data-value') === selectedTitle) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
}


// ประกาศตัวแปรเพื่อเก็บค่าเพศที่เลือก
let selectedGender = '';

// กำหนดตำแหน่งที่จะแสดงเครื่องหมายถูกสำหรับแต่ละเพศ
const genderImagePositions = {
    'Male': { x: 139, y: 575 },
    'Female': { x: 200, y: 575 }
};

// ฟังก์ชันเพื่อจัดการเมื่อมีการคลิกปุ่มเลือกเพศ
function selectGender(gender) {
    selectedGender = gender;
    document.getElementById('selectedGender').value = gender;
    updateGenderButtons();
    updateDisplay();
}

// ฟังก์ชันเพื่ออัปเดตสไตล์ของปุ่มเพศที่เลือก
function updateGenderButtons() {
    const buttons = document.querySelectorAll('#gender-selection .title-btn');
    buttons.forEach(button => {
        if (button.getAttribute('data-value') === selectedGender) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
}




// Variable to store the selected partnership status
let selectedStatus = '';

// Positions for each status image
const statusImagePositions = {
    'Single': { x: 274, y: 817 },
    'Separated': { x: 474, y: 817 },
    'Partner/De facto': { x: 610, y: 817 },
    'Divorced': { x: 787, y: 817 },
    'Married/in civil union': { x: 274, y: 841 },
    'Engaged': { x: 474, y: 841 },
    'Widowed': { x: 610, y: 841 }
};

// Fixed position for the status text
const statusTextPosition = { x: 283, y: 490 }; // Adjust x and y as needed

// Function to handle status button clicks
function selectStatus(status) {
    selectedStatus = status;
    document.getElementById('selectedStatus').value = status;
    updateStatusButtons();
    updateDisplay();
}

// Function to update the styling of status buttons
function updateStatusButtons() {
    const buttons = document.querySelectorAll('#status-selection .title-btn');
    buttons.forEach(button => {
        if (button.getAttribute('data-value') === selectedStatus) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
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




function updateDisplay() {
    const Clientno = document.getElementById('Clientno').value || '-';
    const Applicationno = document.getElementById('Applicationno').value || '-';
    const datetime = document.getElementById('datetime').value || '-';
    const lastname = document.getElementById('lastname').value || '-';
    const firstname = document.getElementById('firstname').value || '-';
    const birthdate = document.getElementById('birthdate').value || '-';
    const formattedBirthDate = formatBirthDate(birthdate);
    const province = document.getElementById('province').value || '-';
    const country = document.getElementById('country').value || '-';
    const PassportNo = document.getElementById('PassportNo').value || 'AD1186973';
    const country1 = document.getElementById('country1').value || '-';
    const address = document.getElementById('address').value || '-';
    const email = document.getElementById('email').value || '-';
    const Phone = document.getElementById('Phone').value || '-';
    const QRCode = document.getElementById('QRCode').value || '';

    const birthdate1 = document.getElementById('birthdate1').value || '-';
    const formattedBirthDate1 = formatBirthDate(birthdate1);


    const customDate = document.getElementById('customDate').value || '-';
    const formattedCustomDate = formatCustomDate(customDate);



    // แยกวัน เดือน ปี
    const { day, month, year } = formatDate(datetime);
    const formattedDate = `${day}/${month}/${year}`;
    const formattedTime = new Date(datetime).toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' });

    // คำนวณปี พ.ศ.
    const buddhistYear = new Date(datetime).getFullYear() + 543;




    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');


    
    
    const backgroundImage = new Image();
    backgroundImage.src = '../assets/image/paper/dr2.jpg';
    backgroundImage.onload = function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
        drawText(ctx, `${Clientno}`, 205,25.5,14,'arialRegular', '#8c8c8c', 'left',37, 3, 0, 0, 800, 0);

        drawText(ctx, `${day}`, 505,25.5,14,'arialRegular', '#8c8c8c', 'center',37, 3, 0, 0, 800, 0);
        drawText(ctx, `${month}`, 550,25.5,14,'arialRegular', '#8c8c8c', 'center',37, 3, 0, 0, 800, 0);
        drawText(ctx, `${year}`, 600,25.5,14,'arialRegular', '#8c8c8c', 'center',37, 3, 0, 0, 800, 0);

        drawText(ctx, `${Applicationno}`, 745,25.5,14,'arialRegular', '#8c8c8c', 'left',37, 3, 0, 0, 800, 0);

        drawText(ctx, `${lastname}`, 283,385,16,'arialRegular', '#000000', 'center',37, 3, 0, 0, 800, 0);
        drawText(ctx, `${firstname}`, 283,455,16,'arialRegular', '#000000', 'center',37, 3, 0, 0, 800, 0);
        drawText(ctx, `${formattedBirthDate}`, 456,601,16,'arialRegular', '#000000', 'left',37, 3, 0, 0, 800, 10);
        drawText(ctx, `${province}`, 220, 638, 16, 'arialRegular', '#000000', 'left', 35, 3, 0, 0, 800, 0);
        drawText(ctx, `${country}`, 220, 671, 16, 'arialRegular', '#000000', 'left', 35, 3, 0, 0, 800, 0);
        drawText(ctx, `${PassportNo}`, 160, 743, 16, 'arialRegular', '#000000', 'left', 35, 3, 0, 0, 800, 0);
        drawText(ctx, `${country1}`, 160, 778, 16, 'arialRegular', '#000000', 'left', 35, 3, 0, 0, 800, 0);
        drawText(ctx, `${formattedBirthDate1}`, 720, 772, 16, 'arialRegular', '#000000', 'left', 35, 3, 0, 0, 800, 10);
        drawText(ctx, `                 ${address}`, 80, 1000, 16, 'arialRegular', '#000000', 'left', 35, 3, 0, 0, 700, 0);
        drawText(ctx, `${Phone}`, 250, 1070, 16, 'arialRegular', '#000000', 'left', 35, 3, 0, 0, 700, 0);
        drawText(ctx, `${email}`, 140, 1105, 16, 'arialRegular', '#000000', 'left', 35, 3, 0, 0, 700, 0);

        drawText(ctx, `Work visa application form - ${formattedCustomDate}`, 890, 1260, 16, 'arialRegular', '#000000', 'right', 35, 3, 0, 0, 800, 0);

// ส่วนของการวาดภาพ QRCode แรก
if (qrCodeImage) {
    const specifiedHeight = 200; // ความสูงที่ต้องการ
    const maxWidth = 162; // ความกว้างสูงสุดที่อนุญาต
    const x_center = 610; // ตำแหน่ง x ที่ต้องการให้รูปภาพอยู่กึ่งกลาง
    const y = 188; // ตำแหน่ง y บน canvas

    // คำนวณอัตราส่วนการย่อขยายเพื่อให้ได้ความสูงที่กำหนด
    const scaleFactor = specifiedHeight / qrCodeImage.height;
    const scaledWidth = qrCodeImage.width * scaleFactor;

    if (scaledWidth <= maxWidth) {
        // วาดรูปภาพ QRCode
        const x_draw = x_center - (scaledWidth / 2);
        ctx.drawImage(qrCodeImage, x_draw, y, scaledWidth, specifiedHeight);

        // วาดกรอบรอบรูปภาพ
        ctx.lineWidth = 10;
        ctx.strokeStyle = '#929699'; // เปลี่ยนสีตามต้องการ
        ctx.strokeRect(x_draw, y, scaledWidth, specifiedHeight);
    } else {
        // วาดรูปภาพ QRCode ที่ถูกตัดส่วนเกิน
        const sWidth = maxWidth / scaleFactor;
        const sx = (qrCodeImage.width - sWidth) / 2;
        const sy = 0;
        const x_draw = x_center - (maxWidth / 2);
        ctx.drawImage(qrCodeImage, sx, sy, sWidth, qrCodeImage.height, x_draw, y, maxWidth, specifiedHeight);

        // วาดกรอบรอบรูปภาพ
        ctx.lineWidth = 10;
        ctx.strokeStyle = '#929699'; // เปลี่ยนสีตามต้องการ
        ctx.strokeRect(x_draw, y, maxWidth, specifiedHeight);
    }
}

// ส่วนของการวาดภาพ QRCode ที่สอง (ถ้ามี)
if (qrCodeImage) {
    const specifiedHeight = 200;
    const maxWidth = 162;
    const x_center = 783;
    const y = 188;

    const scaleFactor = specifiedHeight / qrCodeImage.height;
    const scaledWidth = qrCodeImage.width * scaleFactor;

    if (scaledWidth <= maxWidth) {
        const x_draw = x_center - (scaledWidth / 2);
        ctx.drawImage(qrCodeImage, x_draw, y, scaledWidth, specifiedHeight);

        // วาดกรอบรอบรูปภาพ
        ctx.lineWidth = 10;
        ctx.strokeStyle = '#929699';
        ctx.strokeRect(x_draw, y, scaledWidth, specifiedHeight);
    } else {
        const sWidth = maxWidth / scaleFactor;
        const sx = (qrCodeImage.width - sWidth) / 2;
        const sy = 0;
        const x_draw = x_center - (maxWidth / 2);
        ctx.drawImage(qrCodeImage, sx, sy, sWidth, qrCodeImage.height, x_draw, y, maxWidth, specifiedHeight);

        // วาดกรอบรอบรูปภาพ
        ctx.lineWidth = 10;
        ctx.strokeStyle = '#929699';
        ctx.strokeRect(x_draw, y, maxWidth, specifiedHeight);
    }
}
    
        // Draw the title text at the fixed position
        if (selectedTitle) {
            drawText(ctx, selectedTitle, titleTextPosition.x, titleTextPosition.y, 16, 'arialRegular', '#000000', 'center', 20, 1, null, null, 100, 0);
        }

        // Display the image based on the selected title
        if (selectedTitle) {
            const position = titleImagePositions[selectedTitle];
            // Draw the image at the specified position
            drawImage(ctx, '../assets/image/paper/DD.png', position.x, position.y, 29, 29);
        }


        // แสดงเครื่องหมายถูกตามเพศที่เลือก
        if (selectedGender) {
            const position = genderImagePositions[selectedGender];
        if (position) {
        drawImage(ctx, '../assets/image/paper/DD.png', position.x, position.y, 29, 29);
        }
        }

        // Draw the status text at the fixed position
        //if (selectedStatus) {
              //drawText(ctx, selectedStatus, statusTextPosition.x, statusTextPosition.y, 16, 'arialRegular', '#000000', 'center', 20, 1, null, null, 200, 0);
        //}
        

        // Display the image based on the selected status
        if (selectedStatus) {
           const position = statusImagePositions[selectedStatus];
           if (position) {
        // Draw the image at the specified position
        drawImage(ctx, '../assets/image/paper/DD.png', position.x, position.y, 29, 29);
        }
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
