// DODA Cave Suites - AI Concierge & Hotel Automation Engine
// Developed by: Abdullah (AI Automation)

let currentLang = 'tr';
let activeTab = 'chat';

// Local In-Memory CRM Database
let reservations = [
    {
        name: "Alexander Petrov",
        contact: "+7 916 555-0142",
        room: "Jakuzili Mağara Süit",
        dates: "14 Eki - 17 Eki 2026",
        guests: "2 Yetişkin",
        lang: "🇷🇺 Rusça",
        status: "Onaylandı"
    },
    {
        name: "Sarah Jenkins",
        contact: "sarah.j@gmail.com",
        room: "King Balcony Suite",
        dates: "02 Kas - 05 Kas 2026",
        guests: "2 Yetişkin",
        lang: "🇬🇧 İngilizce",
        status: "Yeni Talep"
    }
];

// Multilingual Greetings & Responses
const DICTIONARY = {
    tr: {
        welcome: "Merhaba! 🏛️ **Doda Artisanal Cave Suites**'e hoş geldiniz. Ben otelinizin 7/24 hizmet veren yapay zeka asistanıyım. Oda fiyatları, Kapadokya balon turları, havalimanı transferi veya rezervasyon konularında size nasıl yardımcı olabilirim?",
        roomsAnswer: "Otelimizde doğal tüf kayalardan oyulmuş 3 özel oda tipimiz bulunmaktadır:\n\n✨ **Jakuzili Mağara Süit:** Özel taş içi jakuzi, şömine, vadi manzarası. (**€180 / gece**)\n🏰 **Deluxe Cave Room:** Otantik kemerli taş mimari, king yatak. (**€130 / gece**)\n👑 **King Balcony Suite:** Özel sıcak teras, panoramik Kapadokya manzarası. (**€250 / gece**)\n\nKahvaltı tüm odalarımızda fiyata dahildir.",
        balloonAnswer: "🎈 **Kapadokya Sıcak Hava Balon Turu:**\nHer sabah gün doğumunda otelimizden VIP transfer ile kalkış alanına götürülüyorsunuz. 1 saatlik uçuş, inişte şampanya ikramı ve uçuş sertifikası dahildir.\n\n*Fiyat:* Kişi başı sezonluk **€160 - €220** arasındadır. Sizin için ön rezervasyon yapmamı ister misiniz?",
        transferAnswer: "🚐 **Havalimanı Transfer Hizmetimiz:**\n• **Nevşehir Kapadokya Havalimanı (NAV):** 40 dk (Paylaşımlı €15 / VIP Özel €65)\n• **Kayseri Erkilet Havalimanı (ASR):** 60 dk (Paylaşımlı €15 / VIP Özel €75)\n\nUçuş kodunuzu iletirseniz şoförümüz sizi kapıda karşılar.",
        breakfastAnswer: "🍳 **Kahvaltı Bilgisi:**\nHer sabah 07:30 - 10:30 saatleri arasında teras restoranımızda sıcak balonları izleyerek alacağınız **Organik Yöresel Kapadokya Serpme Kahvaltısı** tüm konaklamalarımızda **ücretsizdir**.",
        bookingPrompt: "Harika bir seçim! Sizin için hemen bir ön rezervasyon talebi oluşturalım. Açılan formu doldurmanız yeterlidir.",
        bookingSuccess: "🎉 **Rezervasyon Talebiniz Alındı!**\nSayın **{name}**, talebiniz başarıyla resepsiyon sistemimize iletildi. Müsaitlik onayınız için **{contact}** üzerinden en geç 15 dakika içinde iletişime geçeceğiz.",
        defaultAI: "Size en iyi şekilde yardımcı olmak için buradayım. Dilerseniz odalarımız, balon turları, vadi yürüyüşleri, transferler hakkında soru sorabilir veya doğrudan rezervasyon oluşturabilirsiniz."
    },
    en: {
        welcome: "Hello! 🏛️ Welcome to **Doda Artisanal Cave Suites (Cappadocia)**. I am your 24/7 AI Concierge. How may I assist you with room rates, hot air balloon tours, airport transfers, or direct bookings?",
        roomsAnswer: "We offer 3 distinct authentic cave room categories carved from volcanic rocks:\n\n✨ **Jacuzzi Cave Suite:** Private stone jacuzzi, fireplace, valley view. (**€180 / night**)\n🏰 **Deluxe Cave Room:** Authentic arched stone architecture, king bed. (**€130 / night**)\n👑 **King Balcony Suite:** Private hot terrace with panoramic balloon views. (**€250 / night**)\n\n*Organic buffet breakfast is included.*",
        balloonAnswer: "🎈 **Cappadocia Hot Air Balloon Experience:**\nIncludes sunrise hotel pickup with VIP shuttle, 1-hour scenic flight over fairy chimneys, landing champagne toast & flight certificate.\n\n*Price:* **€160 - €220 per person**. Would you like me to reserve a basket spot for you?",
        transferAnswer: "🚐 **Airport Shuttle Service:**\n• **Nevsehir Airport (NAV):** 40 mins (Shared €15 / VIP Private €65)\n• **Kayseri Airport (ASR):** 60 mins (Shared €15 / VIP Private €75)\n\nJust provide your flight number and our driver will meet you with your name board.",
        breakfastAnswer: "🍳 **Breakfast Information:**\nComplimentary organic Turkish village breakfast is served on our panoramic rooftop terrace every morning between 07:30 - 10:30 AM while balloons fly overhead.",
        bookingPrompt: "Wonderful choice! Let's arrange your booking request. Please fill out the brief form.",
        bookingSuccess: "🎉 **Booking Request Received!**\nDear **{name}**, your request has been logged into our reception system. We will contact you via **{contact}** within 15 minutes to confirm.",
        defaultAI: "I am pleased to assist you with our cave rooms, hot air balloon rides, airport transfers, or dining reservations. How can I help you today?"
    },
    ru: {
        welcome: "Здравствуйте! 🏛️ Добро пожаловать в **Doda Artisanal Cave Suites (Каппадокия)**. Я ваш виртуальный консьерж 24/7. Чем я могу помочь вам с ценами на номера, полетами на воздушных шарах или трансфером?",
        roomsAnswer: "В нашем отеле 3 типа аутентичных пещерных номеров:\n\n✨ **Jacuzzi Cave Suite:** Личное джакузи в скале, камин. (**€180 / ночь**)\n🏰 **Deluxe Cave:** Королевская кровать, каменные арки. (**€130 / ночь**)\n👑 **King Suite с балконом:** Панорамный вид на взлетающие шары. (**€250 / ночь**)\n\n*Традиционный завтрак включен.*",
        balloonAnswer: "🎈 **Полет на воздушном шаре в Каппадокии:**\nВключает трансфер из отеля на рассвете, 1 час полета над долинами, шампанское и сертификат.\n\n*Цена:* **€160 - €220** на человека. Забронировать для вас?",
        transferAnswer: "🚐 **Трансфер из аэропорта:**\n• **Аэропорт Невшехир (NAV):** €15 общий / €65 VIP\n• **Аэропорт Кайсери (ASR):** €15 общий / €75 VIP",
        breakfastAnswer: "🍳 **Завтрак:** Вкуснейший турецкий завтрак на видовой террасе входит в стоимость каждого номера (07:30 - 10:30).",
        bookingPrompt: "Отлично! Заполните короткую форму для бронирования.",
        bookingSuccess: "🎉 **Заявка на бронирование принята!**\nУважаемый(ая) **{name}**, мы свяжемся с вами по **{contact}** в течение 15 минут.",
        defaultAI: "Я готов ответить на любые вопросы о номерах, экскурсиях и трансферах в Каппадокии."
    },
    ar: {
        welcome: "مرحباً بكم في 🏛️ **أجنحة دودا كيف كابادوكيا**. أنا مساعدكم الذكي على مدار الساعة. كيف يمكنني مساعدتكم في أسعار الغرف أو رحلات المنطاد أو حجز الإقامة؟",
        roomsAnswer: "نقدم أجنحة كهفية فاخرة:\n\n✨ **جناح الكهف مع جاكوزي:** جاكوزي حجري خاص وإطلالة ساحرة (€180/ليلة)\n🏰 **غرفة ديلوكس كهفية:** تصميم عثماني حجري أصيل (€130/ليلة)\n👑 **جناح كينغ مع شرفة:** إطلالة بانورامية على المناطيد (€250/ليلة)\n\n*الإفطار مشمول في جميع الغرف.*",
        balloonAnswer: "🎈 **رحلة المنطاد في كابادوكيا:**\nتشمل التوصيل من وإلى الفندق، رحلة جوية لمدة ساعة وقت الشروق، مع المشروبات وشهادة الطيران. السعر من 160 إلى 220 يورو للشخص.",
        transferAnswer: "🚐 **خدمة التوصيل من المطار:**\nمتوفرة من مطاري قيصري ونوشهر بسيارات VIP مريحة مع سائق خاص.",
        breakfastAnswer: "🍳 **الإفطار:** بوفيه إفطار تركي ريفي تقليدي يومياً مجاناً على شرفة الفندق البانورامية.",
        bookingPrompt: "اختيار رائع! يرجى ملء النموذج السريع لإتمام طلب الحجز.",
        bookingSuccess: "🎉 **تم استلام طلب الحجز بنجاح!** سنقوم بالتواصل معكم عبر {contact} لتأكيد الحجز.",
        defaultAI: "أنا هنا لمساعدتك في كل ما يخص إقامتك ورحلاتك في كابادوكيا."
    },
    de: {
        welcome: "Guten Tag! 🏛️ Willkommen im **Doda Cave Suites (Kappadokien)**. Ich bin Ihr 24/7 KI-Concierge. Wie kann ich Ihnen bei Zimmerpreisen, Heißluftballonfahrten oder Transfers helfen?",
        roomsAnswer: "Wir bieten 3 exklusive Höhlenzimmer:\n\n✨ **Jacuzzi Cave Suite:** Privater Felsen-Whirlpool, Kamin (€180 / Nacht)\n🏰 **Deluxe Cave Room:** Historische Steinarchitektur (€130 / Nacht)\n👑 **King Balcony Suite:** Panoramablick auf die Heißluftballons (€250 / Nacht)",
        balloonAnswer: "🎈 **Kappadokien Ballonfahrt:** Inklusive Hoteltransfer bei Sonnenaufgang, 1-stündiger Flug und Champagnerempfang. (€160 - €220 p.P.)",
        transferAnswer: "🚐 **Flughafentransfer:** Transfer von den Flughäfen Nevsehir (NAV) und Kayseri (ASR) ist 24/7 verfügbar.",
        breakfastAnswer: "🍳 **Frühstück:** Reichhaltiges Bio-Frühstück auf der Panoramaterrasse ist im Preis inbegriffen.",
        bookingPrompt: "Sehr gerne! Bitte füllen Sie das kurze Formular aus.",
        bookingSuccess: "🎉 **Buchungsanfrage erhalten!** Wir kontaktieren Sie in Kürze unter {contact}.",
        defaultAI: "Ich stehe Ihnen für alle Fragen rund um Ihren Aufenthalt in Kappadokien zur Verfügung."
    }
};

// Initialize App
function applyUrlHotelCustomization() {
    const params = new URLSearchParams(window.location.search);
    const hotel = params.get('hotel');
    const region = params.get('region');

    if (hotel) {
        document.title = `${hotel} — 7/24 AI Misafir Asistanı`;
        const brandTitle = document.querySelector('.brand-text h2');
        if (brandTitle) brandTitle.innerText = hotel;

        for (let lang in DICTIONARY) {
            if (DICTIONARY[lang].welcome) {
                DICTIONARY[lang].welcome = DICTIONARY[lang].welcome
                    .replace(/Doda Artisanal Cave Suites \(Kappadokien\)/g, hotel)
                    .replace(/Doda Artisanal Cave Suites \(Каппадокия\)/g, hotel)
                    .replace(/Doda Artisanal Cave Suites \(Cappadocia\)/g, hotel)
                    .replace(/Doda Artisanal Cave Suites/g, hotel)
                    .replace(/Doda Cave Suites/g, hotel)
                    .replace(/Doda Artisanal Cave/g, hotel)
                    .replace(/DODA Cave Suites/g, hotel)
                    .replace(/أجنحة دودا كيف كابادوكيا/g, hotel);
            }
        }
    }
    if (region) {
        const brandRegion = document.querySelector('.brand-text p');
        if (brandRegion) brandRegion.innerText = region;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    applyUrlHotelCustomization();
    renderWelcomeMessage();
    renderLeadsTable();
    setupDefaultDates();
});

function setupDefaultDates() {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 3);

    const checkIn = document.getElementById('checkInDate');
    const checkOut = document.getElementById('checkOutDate');
    if (checkIn && checkOut) {
        checkIn.value = today.toISOString().split('T')[0];
        checkOut.value = tomorrow.toISOString().split('T')[0];
    }
}

// Tab Switching (Chat vs CRM)
function switchTab(tab) {
    activeTab = tab;
    document.getElementById('chatView').classList.toggle('active', tab === 'chat');
    document.getElementById('adminView').classList.toggle('active', tab === 'admin');

    document.getElementById('tabChatBtn').classList.toggle('active', tab === 'chat');
    document.getElementById('tabAdminBtn').classList.toggle('active', tab === 'admin');
}

// Language Switching
function changeLanguage(lang) {
    currentLang = lang;
    const chatContainer = document.getElementById('chatMessages');
    chatContainer.innerHTML = '';
    renderWelcomeMessage();
}

function renderWelcomeMessage() {
    const chatContainer = document.getElementById('chatMessages');
    const text = DICTIONARY[currentLang].welcome;
    appendAIMessage(text);
}

// Handle User Input Submission
function handleUserSubmit(e) {
    e.preventDefault();
    const input = document.getElementById('userInput');
    const message = input.value.trim();
    if (!message) return;

    // Append User Message
    appendUserMessage(message);
    input.value = '';

    // Show Typing indicator & Process AI Response
    showTypingIndicator();

    setTimeout(() => {
        removeTypingIndicator();
        processAIResponse(message);
    }, 600);
}

function sendQuickMessage(text) {
    appendUserMessage(text);
    showTypingIndicator();
    setTimeout(() => {
        removeTypingIndicator();
        processAIResponse(text);
    }, 500);
}

// Intelligent Rule-Based Response Engine
function processAIResponse(query) {
    const q = query.toLowerCase();
    const dict = DICTIONARY[currentLang] || DICTIONARY['en'];

    if (q.includes('fiyat') || q.includes('oda') || q.includes('price') || q.includes('room') || q.includes('номер') || q.includes('غرفة') || q.includes('zimmer') || q.includes('süit') || q.includes('suite')) {
        appendAIMessage(dict.roomsAnswer, true);
    } else if (q.includes('balon') || q.includes('balloon') || q.includes('шар') || q.includes('منطاد') || q.includes('ballonfahrt')) {
        appendAIMessage(dict.balloonAnswer);
    } else if (q.includes('transfer') || q.includes('havalimanı') || q.includes('airport') || q.includes('аэропорт') || q.includes('مطار') || q.includes('flughafen')) {
        appendAIMessage(dict.transferAnswer);
    } else if (q.includes('kahvaltı') || q.includes('breakfast') || q.includes('завтрак') || q.includes('افطار') || q.includes('frühstück')) {
        appendAIMessage(dict.breakfastAnswer);
    } else if (q.includes('rezervasyon') || q.includes('rezerve') || q.includes('book') || q.includes('reserve') || q.includes('бронир') || q.includes('حجز') || q.includes('buchen')) {
        appendAIMessage(dict.bookingPrompt);
        openBookingModal();
    } else {
        appendAIMessage(dict.defaultAI);
    }
}

// Message Rendering Helpers
function appendUserMessage(text) {
    const chatContainer = document.getElementById('chatMessages');
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const row = document.createElement('div');
    row.className = 'msg-row user';
    row.innerHTML = `
        <div class="msg-avatar">Siz</div>
        <div class="msg-content">
            <div class="msg-bubble">${escapeHTML(text)}</div>
            <span class="msg-time">${time}</span>
        </div>
    `;
    chatContainer.appendChild(row);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

function appendAIMessage(markdownText, showRoomCards = false) {
    const chatContainer = document.getElementById('chatMessages');
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const formattedText = formatMarkdown(markdownText);

    let cardsHTML = '';
    if (showRoomCards) {
        cardsHTML = `
            <div class="room-card-grid">
                <div class="room-card">
                    <span class="room-title">✨ Jakuzili Mağara Süit</span>
                    <span class="room-features">Kaya İçi Jakuzi • Şömine • Teras</span>
                    <span class="room-price">€180 / gece</span>
                    <button class="book-now-btn" onclick="openBookingModal('Jakuzili Mağara Süit')">Hemen Rezerve Et</button>
                </div>
                <div class="room-card">
                    <span class="room-title">👑 King Balcony Suite</span>
                    <span class="room-features">Sıcak Teras • Balon Manzarası</span>
                    <span class="room-price">€250 / gece</span>
                    <button class="book-now-btn" onclick="openBookingModal('King Balcony Suite')">Hemen Rezerve Et</button>
                </div>
            </div>
        `;
    }

    const row = document.createElement('div');
    row.className = 'msg-row ai';
    row.innerHTML = `
        <div class="msg-avatar">🛎️</div>
        <div class="msg-content">
            <div class="msg-bubble">
                ${formattedText}
                ${cardsHTML}
            </div>
            <span class="msg-time">${time}</span>
        </div>
    `;
    chatContainer.appendChild(row);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

function showTypingIndicator() {
    const chatContainer = document.getElementById('chatMessages');
    const typingRow = document.createElement('div');
    typingRow.id = 'typingIndicator';
    typingRow.className = 'msg-row ai';
    typingRow.innerHTML = `
        <div class="msg-avatar">🛎️</div>
        <div class="typing-bubble">
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
        </div>
    `;
    chatContainer.appendChild(typingRow);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

function removeTypingIndicator() {
    const typing = document.getElementById('typingIndicator');
    if (typing) typing.remove();
}

// Modal Handlers
function openBookingModal(presetRoom = '') {
    const modal = document.getElementById('bookingModal');
    if (presetRoom) {
        document.getElementById('roomTypeSelect').value = presetRoom;
    }
    modal.classList.remove('hidden');
}

function closeBookingModal() {
    document.getElementById('bookingModal').classList.add('hidden');
}

function handleBookingFormSubmit(e) {
    e.preventDefault();
    const name = document.getElementById('guestName').value;
    const phone = document.getElementById('guestPhone').value;
    const email = document.getElementById('guestEmail').value;
    const checkIn = document.getElementById('checkInDate').value;
    const checkOut = document.getElementById('checkOutDate').value;
    const room = document.getElementById('roomTypeSelect').value;
    const guests = document.getElementById('guestCount').value;

    const contact = phone || email;

    // Add to CRM database
    reservations.unshift({
        name: name,
        contact: contact,
        room: room,
        dates: `${checkIn} / ${checkOut}`,
        guests: guests,
        lang: currentLang.toUpperCase(),
        status: "Yeni Talep"
    });

    closeBookingModal();
    renderLeadsTable();

    // Confirmation in chat
    const dict = DICTIONARY[currentLang] || DICTIONARY['tr'];
    const msg = dict.bookingSuccess.replace('{name}', name).replace('{contact}', contact);
    appendAIMessage(msg);

    // Reset Form
    document.getElementById('bookingForm').reset();
    setupDefaultDates();
}

// CRM Table Rendering
function renderLeadsTable() {
    const tbody = document.getElementById('leadsTableBody');
    if (!tbody) return;

    tbody.innerHTML = '';
    reservations.forEach(r => {
        const tr = document.createElement('tr');
        const statusClass = r.status === 'Onaylandı' ? 'status-confirmed' : 'status-new';
        tr.innerHTML = `
            <td><strong>${escapeHTML(r.name)}</strong></td>
            <td>${escapeHTML(r.contact)}</td>
            <td><span style="color:#f3e5ab;">${escapeHTML(r.room)}</span></td>
            <td>${escapeHTML(r.dates)}</td>
            <td>${escapeHTML(r.guests)}</td>
            <td>${r.lang}</td>
            <td><span class="status-tag ${statusClass}">${r.status}</span></td>
        `;
        tbody.appendChild(tr);
    });

    document.getElementById('totalLeadsCount').innerText = reservations.length;
    document.getElementById('reservationBadge').innerText = reservations.length;
}

function exportReservations() {
    let csv = "Misafir,Iletisim,Oda,Tarihler,Kisi,Dil,Durum\n";
    reservations.forEach(r => {
        csv += `"${r.name}","${r.contact}","${r.room}","${r.dates}","${r.guests}","${r.lang}","${r.status}"\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `Doda_Cave_Rezervasyonlar_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Utilities
function formatMarkdown(text) {
    return text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/\n/g, '<br>');
}

function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
        tag => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            "'": '&#39;',
            '"': '&quot;'
        }[tag] || tag)
    );
}
