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
        document.fonts.ready.then(function() {
            updateDisplay(); // วาดใหม่ด้วยฟอนต์ที่ถูกต้องหลังจากฟอนต์ถูกโหลดเสร็จ
        });
    }).catch(function() {
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
    const months = ['ม.ค', 'ก.พ', 'มี.ค', 'เม.ย', 'พ.ค', 'มิ.ย', 'ก.ค', 'ส.ค', 'ก.ย', 'ต.ค', 'พ.ย', 'ธ.ค'];
    const d = new Date(date);
    const day = padZero(d.getDate());
    const month = months[d.getMonth()];
    const year = d.getFullYear() + 543; // แปลงเป็นปี พ.ศ.
    return `${day}-${month}-${year}`;
}

// เพิ่มฟังก์ชันเพื่อจัดรูปแบบเวลา
function formatTime(date) {
    const d = new Date(date);
    const hours = padZero(d.getHours());
    const minutes = padZero(d.getMinutes());
    const seconds = padZero(d.getSeconds());
    return `${hours}:${minutes}:${seconds}`;
}


// เพิ่มรายการรายชื่อและข้อมูลธนาคาร
const accountList = [
    "KBANK x3592 น.ส. ลักขณา ทวาดิตร์",
    "SCB x6942 นาย ตนพล มัคคะที",
    "BAAC x1342 น.ส. วรวรรณ แก้วกัณหา",
    "TTB x4700 นาย กัญญาณัฐ อุ่นแสง",
    "SCB x1001 นาย โชคชัย ปัญญา",
    "KBANK x4378 น.ส. ฐิตาภา ยอดใบ",
    "KTB x7101 นาย ธนาชัย อุดมศักดิ์ศิริ",
    "BAY x0579 นาย อาณาจักร เจนด่านกลาง",
    "SCB x1990 น.ส. ศุภลักษณ์ ลันนันท์",
    "SCB x7891 นาย ณัฐธิดา บูชาลี",
    "KBANK x4521 น.ส. ศิรลักษณ์ บุตรชา",
    "TTB x7441 น.ส. ขันทอง จุลเต",
    "BBL x4931 นาย ปัญญา ทับเอี่ยม",
    "BAAC x7796 นาย พาราดอน สินสมุทร",
    "SCB x1103 น.ส. ภิลาวรรณ์  สอนเสน",
    "KBANK x4644 น.ส. บัณฑิต วังวรน",
    "KKP x9631 น.ส. กมลทิพย์ อุปวงษ์",
    "BAAC x8854 นาย อุกฤษ ถวิลวรรณะ",
    "KTB x6341 น.ส. ณัฐมน คำสะอาด",
    "KBANK x4410 นาย พิพัฒน์ ภูทวี",
    "BBL x8520 นาย สมชัย แก่นนาคำ",
    "BAAC x4210 น.ส. ระพีพร เล็กวิญญาณ",
    "SCB x5390 นาง มนชยา ไทยใหม่",
    "SCB x9906 น.ส. สุจิตรา คล้ายแก้ว",
    "SCB x9137 นาย ณัฐรุจ อาษาพา",
    "KBANK x8216 นาย บุณยนุช ชะม้อย",
    "KBANK x8314 นาย ศศิเพชร ถือพุทรา",
    "BAY x5881 นาย ชาย พุทธภาวี",
    "KTB x3942 น.ส. วรรณนิศา แก้วบุตร",
    "KKP x0012 น.ส. วาสนา หล่อเหลี่ยม",
    "KBANK x4377 น.ส. อามานี มาหะมิง",
    "SCB x4674 น.ส. สุภาพร พรมภักดี",
    "KTB x9971 นาย ปริญญา สวัสดี",
    "GSB x4309 น.ส. รัตนาภรณ์ จันทวี",
    "SCB x1094 น.ส. ศิริวรรณ กวานกลม",
    "BAAC x0004 น.ส. ขวัญจิตร เกื้อเอียด",
    "GSB x5541 นาง บานเย็น สร้อยพูล",
    "TTB x9415 น.ส. มุฐิตา ดวงจิต",
    "KBANK x6284 น.ส. กรองทอง โจทย์รัมย์",
    "BAY x6151 น.ส. ชลธิชา ปิตธวัชชัย",
    "GSB x0023 นาย บารนาบัส ประทุมรัตน์",
    "CIMBT x9055 นาย ธานี ศรีรุ่งเรือง",
    "KTB x6135 น.ส. สุภาพร รัตนรัตน์",
    "BAY x9770 นาย โกมินทร์ แก้วจวง",
    "UOB x6640 นาย ณรงศ์ฤทธิ์ ถกลจิตร",
    "KBANK x5977 น.ส. ปภาดา เมืองแดง",
    "TTB x0011 นาย วงเพ็ชร  ภูปาง",
    "KBANK x4110 น.ส. ณภัทร กิจอาจเมธา",
    "SCB x6120 น.ส. นวรัตน์ ยอดผักแว่น",
    "BBL x0036 น.ส. ณิชาภัทร ศรีสุคนธ์",
    "BBL x6340 นาย ชาญชัย วิภัชภาพันธ์",
    "KKP x0590 นาย ณัฐณรงค์ ไวปัญญา",
    "KBANK x5011 น.ส. สุชาดา ทวยไธสง",
    "BAY x9340 น.ส. พัฒน์รพี กมลานนท์",
    "BAAC x9320 น.ส. รัชนก ตั้งแต่ง",
    "KTB x9058 นาย ณัชพล แสงเดือน",
    "BBL x0942 น.ส. กนกวรรณ ฉิมจิ๋ว",
    "KBANK x1069 น.ส. สายชล เปรมปรี",
    "BAY x9058 น.ส. ศิริกุล ตระกูลเกิด",
    "UOB x0694 น.ส. ศุภวรรณ์ นวลละออง",
    "KTB x8545 นาย ชูสิทธิ์ สิงห์ชู",
    "KBANK x9105 น.ส. ภุมรินทร์ คากาญจน์",
    "BAAC x1265 นาย อัครสิทธิ์ ชุ่มใจรัก",
    "KBANK x8920 น.ส. มัฐฐิตา บุญหล้า",
    "SCB x1809 น.ส. เพ็ญแสง จันทวี",
    "UOB x1810 นาย ฐาปกรณ์ ฉางแก้ว",
    "KBANK x4520 นาย พัสกร แย้มลังกา",
    "SCB x5009 น.ส. สุรีรัตน์ สุวรพันธ์",
    "BAY x0800 น.ส. เนตรชนก ภู่พงษ์พันธ์",
    "GSB x5005 น.ส. มณัญญา นันทะวงศ์",
    "KBANK x8512 น.ส. อัจฉรา ซอวงค์",
    "SCB x1212 น.ส. วรันธร ปภัสสรศิริ",
    "UOB x5409 น.ส. วรันธร ปภัสสรศิริ",
    "BBL x6559 น.ส. ธนภรณ์ มีลาภ",
    "SCB x9404 นาย สุทธิสาร เนตรจตุพร",
    "UOB x1085 น.ส. วิริยา สุดแดน",
    "KBANK x8084 นาย สิทธิโชค อินทศรี",
    "SCB x1058 นาง ออฤดี เคนพรม",
    "KTB x9450 น.ส. มุทิตา เปรมกาศ",
    "KTB x7098 น.ส. ภัทราภรณ์ กาบแก้ว",
    "KBANK x8400 นาย ณัฐพงษ์ เปลี่ยนพลอย",
    "BAAC x6840 น.ส. ธานี สร้อยมี",
];


// เพิ่มรายการจำนวนเงิน
const moneyList = [
    "50,000.00",
    "170,000.00",
    "80,000.00",
    "60,000.00",
    "160,000.00",
    "1,050,000.00",
    "100,000.00",
    "350,000.00",
    "110,000.00",
    "50,000.00",
    "700,000.00",
    "60,000.00",
    "500,000.00",
    "130,000.00",
    "150,000.00",
    "50,000.00",
    "110,000.00",
    "60,000.00",
    "50,000.00",
    "440,000.00",
    "50,000.00",
    "880,000.00",
    "70,000.00",
    "50,000.00",
    "600,000.00",
    "50,000.00",
    "50,000.00",
    "50,000.00",
    "300,000.00",
    "380,000.00",
    "90,000.00",
    "1,650,000.00",
    "990,000.00",
    "270,000.00",
    "60,000.00",
    "50,000.00",
    "130,000.00",
    "80,000.00",
    "110,000.00",
    "400,000.00",
    "550,000.00",
    "330,000.00",
    "500,000.00",
    "100,000.00",
    "70,000.00",
    "160,000.00",
    "60,000.00",
    "550,000.00",
    "180,000.00",
    "70,000.00",
    "80,000.00",
    "100,000.00",
    "110,000.00",
    "50,000.00",
    "380,000.00",
    "990,000.00",
    "60,000.00",
    "400,000.00",
    "330,000.00",
    "60,000.00",
    "440,000.00",
    "190,000.00",
    "70,000.00",
    "50,000.00",
    "2,650,000.00",
    "70,000.00",
    "350,000.00",
    "110,000.00",
    "50,000.00",
    "600,000.00",
    "300,000.00",
    "1,600,000.00",
    "990,000.00",
    "330,000.00",
    "80,000.00",
    "490,000.00",
    "3,000,000.00",
    "160,000.00",
    "550,000.00",
    "880,000.00",
    "300,000.00"
];


// ฟังก์ชันสำหรับสุ่มเลือก 16 รายการที่ไม่ซ้ำจาก list
function getRandomItems(list, count) {
    const shuffled = [...list].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

// ฟังก์ชันสำหรับสร้างรหัสสุ่มตามรูปแบบที่กำหนด (012351031019AOR09534)
function generateRandomCode() {
    // สุ่มตัวเลข 12 หลักแรก
    const firstPart = Array.from({ length: 12 }, () => Math.floor(Math.random() * 10)).join('');

    // สุ่มเลือกจาก 'AOR', 'BOR', 'COR'
    const middlePartOptions = ['AOR', 'BOR', 'COR'];
    const middlePart = middlePartOptions[Math.floor(Math.random() * middlePartOptions.length)];

    // สุ่มตัวเลข 5 หลักท้าย
    const lastPart = Array.from({ length: 5 }, () => Math.floor(Math.random() * 10)).join('');

    return firstPart + middlePart + lastPart;
}

// ฟังก์ชันสำหรับสุ่มสร้างรหัส 16 รหัสไม่ซ้ำกัน (สำหรับรหัส 012351031019AOR09534)
function generateRandomCodes(count) {
    const codes = new Set();
    while (codes.size < count) {
        codes.add(generateRandomCode());
    }
    return Array.from(codes);
}

// ฟังก์ชันสำหรับสร้างรหัสสุ่มในรูปแบบ K052XXXX
function generateK052Code() {
    const fixedPart = 'K052';
    const randomPart = Array.from({ length: 4 }, () => Math.floor(Math.random() * 10)).join('');
    return fixedPart + randomPart;
}

// ฟังก์ชันสำหรับสุ่มสร้างรหัส 16 รหัสไม่ซ้ำกัน (สำหรับรหัส K052XXXX)
function generateK052Codes(count) {
    const codes = new Set();
    while (codes.size < count) {
        codes.add(generateK052Code());
    }
    return Array.from(codes);
}

function updateDisplay() {
    const accountNumber = document.getElementById('accountNumber').value || '1365986532';
    const accountName = document.getElementById('accountName').value || 'ระบบสั่งจ่ายอิเล็กทรอนิกส์';
    const name10 = document.getElementById('name10').value || 'KASIKORNBANK';
    const datetimeInput = document.getElementById('datetime').value || new Date().toISOString();
    const selectedDate = new Date(datetimeInput);

    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    const backgroundImage = new Image();
    backgroundImage.src = '../assets/image/paper/Statement-KBank.jpg';
    backgroundImage.onload = function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

        let currentDate = new Date(selectedDate);
        const startDate = new Date(currentDate); // เก็บวันที่เริ่มต้น

        // สุ่มเลือก 16 รายการที่ไม่ซ้ำ
        const selectedAccounts = getRandomItems(accountList, 16);
        const selectedAmounts = getRandomItems(moneyList, 16);
        const randomCodes = generateRandomCodes(16);
        const k052Codes = generateK052Codes(16);

        const zeroAmount = "0.00"; // เพิ่มตัวแปรสำหรับค่า 0.00

        let endDate; // ตัวแปรสำหรับเก็บวันที่สิ้นสุด

        // วาดวันที่ เวลา รายชื่อ จำนวนเงิน และรหัส 16 บรรทัด
        for (let i = 0; i < 16; i++) {
            // สุ่มจำนวนที่จะลดลงในแต่ละบรรทัด (1 - 10 นาที)
            const randomMinutes = Math.floor(Math.random() * 10) + 1; // 1 - 10 นาที
            const randomSeconds = Math.floor(Math.random() * 60); // 0 - 59 วินาที

            // ลดเวลาลง
            currentDate.setMinutes(currentDate.getMinutes() - randomMinutes);
            currentDate.setSeconds(randomSeconds);

            // ทำสำเนาของวันที่ปัจจุบันเพื่อการแสดงผล
            let displayDate = new Date(currentDate);
            let displayTime = formatTime(displayDate);

            // ตรวจสอบเวลาว่าต่ำกว่า 09:00:00 หรือไม่
            const hours = displayDate.getHours();
            if (hours < 9) {
                // ปรับวันที่เป็นวันก่อนหน้า
                displayDate.setDate(displayDate.getDate() - 1);
            }

            // จัดรูปแบบวันที่หลังจากปรับแล้ว
            const formattedDate = formatDate(displayDate);

            // รับรายชื่อและจำนวนเงินจากรายการที่สุ่มมา
            const accountInfo = selectedAccounts[i];
            const amountInfo = selectedAmounts[i];
            const randomCode = randomCodes[i];
            const k052Code = k052Codes[i];

            // ปรับค่า y ให้เพิ่มขึ้นในแต่ละบรรทัด
            const yPosition = 694.2 + (i * 32.3); // แต่ละบรรทัดห่างกัน 32.3 พิกเซล

            // วาดวันที่
            drawText(ctx, `${formattedDate}`, 69, yPosition, 25, 'THSarabunNew', '#737373', 'left', 25, 3, 0, 0, 800, 0);
            // วาดเวลา
            drawText(ctx, `${displayTime}`, 207.6, yPosition, 25, 'THSarabunNew', '#737373', 'left', 25, 3, 0, 0, 800, 0);
            // วาดรายชื่อ
            drawText(ctx, `${accountInfo}`, 313, yPosition, 25, 'THSarabunNew', '#737373', 'left', 25, 3, 0, 0, 800, -0.8);
            // วาดจำนวนเงิน
            drawText(ctx, `${amountInfo}`, 863.8, yPosition, 25, 'THSarabunNew', '#737373', 'right', 25, 3, 0, 0, 200, 0);
            // วาดค่า 0.00
            drawText(ctx, `${zeroAmount}`, 1081.7, yPosition, 25, 'THSarabunNew', '#737373', 'right', 25, 3, 0, 0, 200, 0);
            // วาดรหัสสุ่ม (012351031019AOR09534)
            drawText(ctx, `${randomCode}`, 581, yPosition, 25, 'THSarabunNew', '#737373', 'left', 25, 3, 0, 0, 800, -0.8);
            // วาดรหัส K052XXXX
            drawText(ctx, `${k052Code}`, 1125.7, yPosition, 25, 'THSarabunNew', '#737373', 'left', 25, 3, 0, 0, 800, 0);
            // วาดวันที่2
            drawText(ctx, `${formattedDate}`, 1232.5, yPosition, 25, 'THSarabunNew', '#737373', 'left', 25, 3, 0, 0, 800, 0);
            // เก็บวันที่สิ้นสุดเป็นวันที่ของบรรทัดสุดท้าย
            if (i === 15) {
                endDate = new Date(displayDate);
            }
        }

        // แสดงวันที่เริ่มต้น
        const formattedStartDate = formatDate(startDate);
        drawText(ctx, `${formattedStartDate}`, 779.4, 466.4, 26, 'THSarabunNew', '#737373', 'center', 30, 1, 0, 0, 1000, 0);
        // แสดงวันที่สิ้นสุด
        const formattedEndDate = formatDate(endDate);
        drawText(ctx, `${formattedEndDate}`, 995.8, 466.4, 26, 'THSarabunNew', '#737373', 'center', 30, 1, 0, 0, 1000, 0);
        
        drawText(ctx, `${accountNumber}`, 85.5, 466.4, 26, 'THSarabunNew', '#737373', 'left', 30, 1, 0, 0, 1000, 0);


        // วาดข้อความ accountName ด้วยสีดำ
        drawText(ctx, `${accountName} - `, 51, 549.8, 30, 'THSarabunNew', '#737373', 'left', 1.5, 3, 0, 0, 800, 0);
        
        // คำนวณความกว้างของข้อความ accountName เพื่อกำหนดตำแหน่ง x สำหรับ accountNumber
        const accountNameWidth = ctx.measureText(`${accountName} - `).width;

        // วาดข้อความ accountNumber ด้วยสีเขียว (#008000)
        drawText(ctx, `${accountNumber}`, 51 + accountNameWidth, 549.8, 30, 'THSarabunNew', '#008000', 'left', 1.5, 3, 0, 0, 800, 0);

        // คำนวณความกว้างของข้อความ accountNumber เพื่อกำหนดตำแหน่ง x สำหรับ 'noet'
        const accountNumberWidth = ctx.measureText(`${accountNumber}`).width;

        // วาดข้อความ 'noet' ด้วยสีดำ (#737373)
        drawText(ctx, `- Baht - ${name10}`, 51 + accountNameWidth + accountNumberWidth, 549.8, 30, 'THSarabunNew', '#737373', 'left', 1.5, 3, 0, 0, 800, 0);




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
