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





function formatBirthDate(date) {
    if (!date || date === '-') {
        return '-';
    }

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
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
    return `${day} - ${month} - ${year}`;
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
            return `${day} - ${month} - ${year}`;
        }
        
                // ตั้งค่าวันที่ปัจจุบันเป็นค่าเริ่มต้นใน input date
                document.addEventListener('DOMContentLoaded', function() {
                    const today = new Date().toISOString().split('T')[0];
                    document.getElementById('customDate1').value = today;
                });


// Positions for each title image
const titleImagePositions = {
    'Male': { x: 139, y: 575 },
    'Female': { x: 200, y: 575 }
};

// Fixed position for the title text
const titleTextPosition = { x: 126, y: 581 }; // Adjust x and y as needed

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







function updateDisplay() {
    const Applicationnumber = document.getElementById('Applicationnumber').value || '-';
    const Clientnumber = document.getElementById('Clientnumber').value || '-';
    const firstname = document.getElementById('firstname').value || '-';
    const country = document.getElementById('country').value || '-';

    const PassportNo = document.getElementById('PassportNo').value || 'AD1186973';

    const birthdate = document.getElementById('birthdate').value || '-';
    const formattedBirthDate = formatBirthDate(birthdate);

    const customDate = document.getElementById('customDate').value || '-';
    const formattedCustomDate = formatCustomDate(customDate);

    const customDate1 = document.getElementById('customDate1').value || '-';
    const formattedCustomDate1 = formatCustomDate(customDate1);




    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');


    
    
    const backgroundImage = new Image();
    backgroundImage.src = '../assets/image/paper/dra3.jpg';
    backgroundImage.onload = function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
        drawText(ctx, `${Applicationnumber}`, 252,69,17,'arialRegular', '#000000', 'left',37, 3, 0, 0, 800, 0);
        drawText(ctx, `${Clientnumber}`, 200,124,17,'arialRegular', '#000000', 'left',37, 3, 0, 0, 800, 0);
        drawText(ctx, `${formattedCustomDate}`, 48,150,17,'arialRegular', '#000000', 'left',37, 3, 0, 0, 800, 0);
        drawText(ctx, `Kia ora ${firstname}`, 48,210,17,'arialRegular', '#000000', 'left',37, 3, 0, 0, 800, 0);

        drawText(ctx, `${firstname}`, 112,537.5,17,'arialRegular', '#000000', 'left',37, 3, 0, 0, 800, 0);
        drawText(ctx, `${country}`, 146,633,17,'arialRegular', '#000000', 'left',37, 3, 0, 0, 800, 0);

        drawText(ctx, `${formattedBirthDate}`, 620,518.5,17,'arialRegular', '#000000', 'left',37, 3, 0, 0, 800, 0);
        drawText(ctx, `${PassportNo}`, 643,581,17,'arialRegular', '#000000', 'left',37, 3, 0, 0, 800, 0);
        drawText(ctx, `${Clientnumber}`, 618,633,17,'arialRegular', '#000000', 'left',37, 3, 0, 0, 800, 0);

        drawText(ctx, `${formattedCustomDate}`, 461,739.3,17,'arialRegular', '#000000', 'left',37, 3, 0, 0, 800, 0);
        drawText(ctx, `${formattedCustomDate1}`, 460,790.3,17,'arialRegular', '#000000', 'left',37, 3, 0, 0, 800, 0);





    
        // Draw the title text at the fixed position
        if (selectedTitle) {
            drawText(ctx, selectedTitle, titleTextPosition.x, titleTextPosition.y, 16, 'arialRegular', '#000000', 'left', 20, 1, null, null, 100, 0);
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
