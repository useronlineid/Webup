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
    return `${day} ${month} ${year}`;
}

        // ตั้งค่าวันที่ปัจจุบันเป็นค่าเริ่มต้นใน input date
        document.addEventListener('DOMContentLoaded', function() {
            const today = new Date().toISOString().split('T')[0];
            document.getElementById('customDate').value = today;
        });


function formatCustomDate1(date) {
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
    return `${day} ${month} ${year}`;
}

        // ตั้งค่าวันที่ปัจจุบันเป็นค่าเริ่มต้นใน input date
        document.addEventListener('DOMContentLoaded', function() {
            const today = new Date().toISOString().split('T')[0];
            document.getElementById('customDate1').value = today;
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

// Function to update the hidden 'province' field
function updateProvinceValue() {
    const provinceInput = document.getElementById('provinceInput').value;
    const provinceCode = provinceMap[provinceInput] || provinceInput; // Use input as is if not found in map
    document.getElementById('province').value = provinceCode;
}

// Modify the event listener to call updateProvinceValue()
document.getElementById('provinceInput').addEventListener('input', function() {
    updateProvinceValue();
    updateDisplay();
});



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
    const registered = document.getElementById('registered').value || '-';
    const number1 = document.getElementById('number1').value || '-';
    const capital = document.getElementById('capital').value || '-';

    const registered1 = document.getElementById('registered1').value || '-';
    const Importedmoney1 = document.getElementById('Importedmoney1').value || '-';

    const employ = document.getElementById('employ').value || '-';
    const License = document.getElementById('License').value || '-';

    const Years = document.getElementById('Years').value || '-';
    const Income = document.getElementById('Income').value || '-';
    const Tax1 = document.getElementById('Tax1').value || '-';

    const Employer1 = document.getElementById('Employer1').value || '-';
    const Location1 = document.getElementById('Location1').value || '-';
    const business1 = document.getElementById('business1').value || '-';

    const Income1 = document.getElementById('Income1').value || '-';
    const Duration1 = document.getElementById('Duration1').value || '-';

    const name1 = document.getElementById('name1').value || '-';
    const Blood = document.getElementById('Blood').value || '-';
    const Passport1 = document.getElementById('Passport1').value || '-';
    const work1 = document.getElementById('work1').value || '-';
    const Job1 = document.getElementById('Job1').value || '-';
    const Location2 = document.getElementById('Location2').value || '-';
    const Years1 = document.getElementById('Years1').value || '-';
    const Income2 = document.getElementById('Income2').value || '-';
    const level = document.getElementById('level').value || '-';
    const work2 = document.getElementById('work2').value || '-';
    const Status1 = document.getElementById('Status1').value || '-';
    const province = document.getElementById('province').value || '-';



    const customDate = document.getElementById('customDate').value || '-';
    const formattedCustomDate = formatCustomDate(customDate);

    const customDate1 = document.getElementById('customDate1').value || '-';
    const formattedCustomDate1 = formatCustomDate(customDate1);




    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');


    
    
    const backgroundImage = new Image();
    backgroundImage.src = '../assets/image/paper/ec2.jpg';
    backgroundImage.onload = function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
        drawText(ctx, `${registered}`, 317,215,14,'arialRegular', '#000000', 'center',37, 3, 0, 0, 800, 0);
        drawText(ctx, `${number1}`, 496,215,14,'arialRegular', '#000000', 'center',37, 3, 0, 0, 800, 0);
        drawText(ctx, `${capital}`, 769,215,14,'arialRegular', '#000000', 'center',37, 3, 0, 0, 800, 0);
        
        drawText(ctx, `${registered1}`, 317,262.2,14,'arialRegular', '#000000', 'center',37, 3, 0, 0, 800, 0);
        drawText(ctx, `${Importedmoney1}`, 675,262.2,14,'arialRegular', '#000000', 'center',37, 3, 0, 0, 800, 0);

        drawText(ctx, `${employ}`, 314,308.5,14,'arialRegular', '#000000', 'center',37, 3, 0, 0, 800, 0);
        drawText(ctx, `${License}`, 715,308.5,14,'arialRegular', '#000000', 'center',37, 3, 0, 0, 800, 0);

        drawText(ctx, `${Years}`, 180,403,14,'arialRegular', '#000000', 'center',37, 3, 0, 0, 800, 0);
        drawText(ctx, `${Income}`, 478,403,14,'arialRegular', '#000000', 'center',37, 3, 0, 0, 800, 0);
        drawText(ctx, `${Tax1}`, 736,403,14,'arialRegular', '#000000', 'center',37, 3, 0, 0, 800, 0);

        drawText(ctx, `${Employer1}`, 625,442,14,'arialRegular', '#000000', 'center',37, 3, 0, 0, 800, 0);
        drawText(ctx, `${Location1}`, 550,466,14,'arialRegular', '#000000', 'center',37, 3, 0, 0, 800, 0);
        drawText(ctx, `${business1}`, 550,490,14,'arialRegular', '#000000', 'center',37, 3, 0, 0, 800, 0);

        drawText(ctx, `${Income1}`, 353,537,14,'arialRegular', '#000000', 'center',37, 3, 0, 0, 800, 0);
        drawText(ctx, `${Duration1}`, 751,537,14,'arialRegular', '#000000', 'center',37, 3, 0, 0, 800, 0);
        drawText(ctx, `8,942`, 432,560,14,'arialRegular', '#000000', 'center',37, 3, 0, 0, 800, 0);
        drawText(ctx, `26`, 413,584,14,'arialRegular', '#000000', 'center',37, 3, 0, 0, 800, 0);
        drawText(ctx, `12`, 517,608,14,'arialRegular', '#000000', 'center',37, 3, 0, 0, 800, 0);

        drawText(ctx, `${name1}`, 662,663,14,'arialRegular', '#000000', 'center',37, 3, 0, 0, 800, 0);
        drawText(ctx, `thai`, 198,686.2,14,'arialRegular', '#000000', 'center',37, 3, 0, 0, 800, 0);
        drawText(ctx, `${Blood}`, 600,686.2,14,'arialRegular', '#000000', 'center',37, 3, 0, 0, 800, 0);
        drawText(ctx, `${province}`, 360,711,14,'arialRegular', '#000000', 'center',37, 3, 0, 0, 800, 0);
        drawText(ctx, `${Passport1}`, 762,711,14,'arialRegular', '#000000', 'center',37, 3, 0, 0, 800, 0);
        drawText(ctx, `${work1}`, 530,733,14,'arialRegular', '#000000', 'center',37, 3, 0, 0, 800, 0);
        drawText(ctx, `${Job1}`, 530,757,14,'arialRegular', '#000000', 'center',37, 3, 0, 0, 800, 0);
        drawText(ctx, `${Location2}`, 635,780,14,'arialRegular', '#000000', 'center',37, 3, 0, 0, 800, 0);
        drawText(ctx, `${Years1}`, 173,805,14,'arialRegular', '#000000', 'center',37, 3, 0, 0, 800, 0);
        drawText(ctx, `0`, 240,805,14,'arialRegular', '#000000', 'center',37, 3, 0, 0, 800, 0);
        drawText(ctx, `0`, 357,805,14,'arialRegular', '#000000', 'center',37, 3, 0, 0, 800, 0);
        drawText(ctx, `${formattedCustomDate}`, 685,805,14,'arialRegular', '#000000', 'center',37, 3, 0, 0, 800, 0);
        drawText(ctx, `${Income2}`,290,829,14,'arialRegular', '#000000', 'center',37, 3, 0, 0, 800, 0);
        drawText(ctx, `None`,633,829,14,'arialRegular', '#000000', 'center',37, 3, 0, 0, 800, 0);
        drawText(ctx, `${level}`,230,875,14,'arialRegular', '#000000', 'center',37, 3, 0, 0, 800, 0);
        drawText(ctx, `${work2}`,465,875,14,'arialRegular', '#000000', 'center',37, 3, 0, 0, 800, 0);
        drawText(ctx, `${Status1}`,650,875,14,'arialRegular', '#000000', 'center',37, 3, 0, 0, 800, 0);
        drawText(ctx, `Entrepreneur`,600,1068,14,'arialRegular', '#000000', 'center',37, 3, 0, 0, 800, 0);
        drawText(ctx, `${formattedCustomDate1}`,600,1091,14,'arialRegular', '#000000', 'center',37, 3, 0, 0, 800, 0);



// ส่วนของการวาดภาพ QRCode ที่สอง (ถ้ามี)
if (qrCodeImage) {
    const specifiedHeight = 200;
    const maxWidth = 200;
    const x_center = 765;
    const y = 900;

    const scaleFactor = specifiedHeight / qrCodeImage.height;
    const scaledWidth = qrCodeImage.width * scaleFactor;

    if (scaledWidth <= maxWidth) {
        const x_draw = x_center - (scaledWidth / 2);
        ctx.drawImage(qrCodeImage, x_draw, y, scaledWidth, specifiedHeight);

    } else {
        const sWidth = maxWidth / scaleFactor;
        const sx = (qrCodeImage.width - sWidth) / 2;
        const sy = 0;
        const x_draw = x_center - (maxWidth / 2);
        ctx.drawImage(qrCodeImage, sx, sy, sWidth, qrCodeImage.height, x_draw, y, maxWidth, specifiedHeight);


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
