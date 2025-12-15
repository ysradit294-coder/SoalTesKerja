// --- Pengaturan Spreadsheet (KONFIGURASI AKHIR) ---
const FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLScEJMYXVD0GevH3nP6NpI340YUWlHJ2rDMm-rfyCIS739w1tw/formResponse"; 

// Entry ID dari input pengguna telah disatukan dan diperbaiki
const FORM_ENTRIES = {
    name: "entry.437577020",    
    class: "entry.901797838",   
    score: "entry.660013072",   
    accuracy: "entry.129012407",  // Disertakan kembali
    status: "entry.1599521228", 
};

// --- Data Soal Ujian (30 Soal) ---
const questions = [
    { question: "Jika 5x + 3 = 18, nilai 2x - 1?", options: ["5", "6", "7", "8"], answer: "5" },
    { question: "Tipe data non-primitif di JS?", options: ["Number", "Boolean", "String", "Object"], answer: "Object" },
    { question: "Kecepatan rata-rata 180 km dalam 3 jam?", options: ["50", "60", "70", "80"], answer: "60" },
    { question: "Fungsi utama dari CSS?", options: ["Menyimpan data", "Mengontrol struktur", "Mengontrol tampilan", "Menjalankan logika"], answer: "Mengontrol tampilan" },
    { question: "Kepanjangan dari 'HTTP'?", options: ["HyperText Transfer Protocol", "High Technology...", "Hyperlink Text...", "Home Text..."], answer: "HyperText Transfer Protocol" },
    { question: "Barisan: 2, 4, 8, 16, ... Angka selanjutnya?", options: ["20", "24", "32", "36"], answer: "32" },
    { question: "Perintah SQL untuk mengambil data?", options: ["UPDATE", "INSERT", "DELETE", "SELECT"], answer: "SELECT" },
    { question: "Prioritas utama metodologi Agile?", options: ["Dokumentasi lengkap", "Perencanaan panjang", "Adaptasi perubahan", "Kontrak ketat"], answer: "Adaptasi terhadap perubahan" },
    { question: "Jika hari ini Senin, 100 hari ke depan?", options: ["Minggu", "Senin", "Selasa", "Rabu"], answer: "Rabu" },
    { question: "Peran 'public key' dalam kriptografi?", options: ["Mendekripsi", "Menganalisis", "Menenkripsi", "Menandatangani"], answer: "Menenkripsi" },
    
    // 20 soal tambahan untuk mencapai total 30
    { question: "Apa ibu kota Australia?", options: ["Sydney", "Melbourne", "Canberra", "Perth"], answer: "Canberra" },
    { question: "Pendiri Microsoft?", options: ["Steve Jobs", "Bill Gates", "Mark Zuckerberg", "Jeff Bezos"], answer: "Bill Gates" },
    { question: "1 kodi = berapa buah?", options: ["10", "12", "15", "20"], answer: "20" },
    { question: "Warna yang tidak ada di pelangi?", options: ["Merah", "Ungu", "Coklat", "Biru"], answer: "Coklat" },
    { question: "Planet terdekat dengan Matahari?", options: ["Venus", "Bumi", "Mars", "Merkurius"], answer: "Merkurius" },
    { question: "Struktur data LIFO?", options: ["Queue", "Stack", "Array", "List"], answer: "Stack" },
    { question: "Operator sisa bagi di kebanyakan bahasa pemrograman?", options: ["/", "//", "%", "MOD"], answer: "%" },
    { question: "Apa nama tulang tertinggi pada manusia?", options: ["Femur", "Tibia", "Radius", "Humerus"], answer: "Femur" },
    { question: "Berapa sisi kubus?", options: ["4", "6", "8", "12"], answer: "6" },
    { question: "Bahasa pemrograman untuk Android Native?", options: ["Swift", "C#", "Kotlin", "PHP"], answer: "Kotlin" },
    
    { question: "Jika 5x + 3 = 18, nilai 2x - 1?", options: ["5", "6", "7", "8"], answer: "5" },
    { question: "Tipe data non-primitif di JS?", options: ["Number", "Boolean", "String", "Object"], answer: "Object" },
    { question: "Kecepatan rata-rata 180 km dalam 3 jam?", options: ["50", "60", "70", "80"], answer: "60" },
    { question: "Fungsi utama dari CSS?", options: ["Menyimpan data", "Mengontrol struktur", "Mengontrol tampilan", "Menjalankan logika"], answer: "Mengontrol tampilan" },
    { question: "Apa ibu kota Australia?", options: ["Sydney", "Melbourne", "Canberra", "Perth"], answer: "Canberra" },
    { question: "Pendiri Microsoft?", options: ["Steve Jobs", "Bill Gates", "Mark Zuckerberg", "Jeff Bezos"], answer: "Bill Gates" },
    { question: "1 kodi = berapa buah?", options: ["10", "12", "15", "20"], answer: "20" },
    { question: "Warna yang tidak ada di pelangi?", options: ["Merah", "Ungu", "Coklat", "Biru"], answer: "Coklat" },
    { question: "Planet terdekat dengan Matahari?", options: ["Venus", "Bumi", "Mars", "Merkurius"], answer: "Merkurius" },
    { question: "Struktur data LIFO?", options: ["Queue", "Stack", "Array", "List"], answer: "Stack" },
];


// --- Variabel Global & DOM ---
let participantName = "";
let participantClass = "";
let currentQuestionIndex = 0;
let score = 0;
let timeRemaining = 300; // 5 menit = 300 detik
let timerInterval;
let quizActive = false;
let userSelection = null;
let statusText = "";

const participantForm = document.getElementById('participant-form');
const startQuizBtn = document.getElementById('start-quiz-btn');
const nextBtn = document.getElementById('next-btn');
const restartBtn = document.getElementById('restart-btn');
const timerDisplay = document.getElementById('timer-display');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const currentQDisplay = document.getElementById('current-q');
const resNameDisplay = document.getElementById('res-name');
const resClassDisplay = document.getElementById('res-class');
const finalScoreDisplay = document.getElementById('final-score');
const resStatusDisplay = document.getElementById('res-status');
const submissionStatusDisplay = document.getElementById('submission-status');


// --- Fungsi Navigasi & Utility ---

function switchScreen(activeScreenId) {
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => screen.classList.remove('active'));
    document.getElementById(activeScreenId).classList.add('active');
}

function formatTime(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
    const seconds = (totalSeconds % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
}

// --- Fungsi Timer ---
function startTimer() {
    timerInterval = setInterval(() => {
        timeRemaining--;
        timerDisplay.textContent = formatTime(timeRemaining);

        if (timeRemaining <= 60) {
            timerDisplay.style.color = 'var(--accent-red)'; 
            timerDisplay.style.textShadow = '0 0 7px var(--accent-red)';
        }

        if (timeRemaining <= 0) {
            clearInterval(timerInterval);
            finishQuiz('Waktu Habis');
        }
    }, 1000);
}

// --- Fungsi Quiz ---

function loadQuestion() {
    if (currentQuestionIndex >= questions.length) {
        finishQuiz('Selesai');
        return;
    }

    const q = questions[currentQuestionIndex];
    questionText.textContent = q.question;
    currentQDisplay.textContent = currentQuestionIndex + 1;
    optionsContainer.innerHTML = '';
    nextBtn.classList.add('hidden');
    userSelection = null;

    q.options.forEach(option => {
        const btn = document.createElement('button');
        btn.classList.add('option-btn');
        btn.textContent = option;
        btn.addEventListener('click', () => selectAnswer(btn, option, q.answer));
        optionsContainer.appendChild(btn);
    });
}

function selectAnswer(selectedButton, selectedOption, correctAnswer) {
    if (userSelection !== null) return; 

    userSelection = selectedOption;
    nextBtn.classList.remove('hidden');

    document.querySelectorAll('.option-btn').forEach(btn => btn.classList.remove('selected'));
    selectedButton.classList.add('selected');

    if (selectedOption === correctAnswer) {
        score++;
    }

    document.querySelectorAll('.option-btn').forEach(btn => {
        btn.disabled = true; 
        if (btn.textContent === correctAnswer) {
            btn.classList.add('correct');
        } else if (btn.textContent === selectedOption) {
            btn.classList.add('incorrect');
        }
    });
}

function nextQuestion() {
    currentQuestionIndex++;
    loadQuestion();
}

// --- FUNGSI PENGIRIMAN DATA KE SPREADSHEET (GOOGLE FORM) ---
function submitToSpreadsheet(name, classData, finalScore, status) {
    submissionStatusDisplay.textContent = 'Mengirim hasil ke database... (Proses)';
    submissionStatusDisplay.style.color = '#888';
    
    // Hitung Akurasi
    const totalQuestions = questions.length;
    const accuracyValue = ((finalScore / totalQuestions) * 100).toFixed(2) + '%'; 

    const data = new FormData();
    data.append(FORM_ENTRIES.name, name);
    data.append(FORM_ENTRIES.class, classData);
    data.append(FORM_ENTRIES.score, `${finalScore}/${totalQuestions}`); 
    data.append(FORM_ENTRIES.accuracy, accuracyValue); 
    data.append(FORM_ENTRIES.status, status);

    fetch(FORM_URL, {
        method: 'POST',
        mode: 'no-cors', 
        body: data
    })
    .then(() => {
        submissionStatusDisplay.textContent = '✅ Hasil Berhasil Direkap Otomatis!';
        submissionStatusDisplay.style.color = 'var(--neon-green)';
    })
    .catch(error => {
        console.error('Submission error:', error);
        submissionStatusDisplay.textContent = '⚠️ Gagal merekap data ke database. Cek Form ID atau koneksi!';
        submissionStatusDisplay.style.color = 'var(--accent-red)';
    });
}


// Mengakhiri Quiz dan Menampilkan Hasil
function finishQuiz(reason) {
    if (!quizActive) return; 
    quizActive = false;
    clearInterval(timerInterval);

    // Kriteria Kelulusan (Contoh: Lulus jika skor >= 20/30)
    const minPassScore = 20;
    statusText = score >= minPassScore ? "LULUS" : "GAGAL";
    let statusClass = score >= minPassScore ? "passed" : "failed";

    // Update Tampilan Hasil
    resNameDisplay.textContent = participantName;
    resClassDisplay.textContent = participantClass;
    finalScoreDisplay.textContent = score;
    resStatusDisplay.textContent = `${statusText} (${reason})`;
    resStatusDisplay.className = '';
    resStatusDisplay.classList.add(statusClass);

    switchScreen('result-screen');
    
    submitToSpreadsheet(participantName, participantClass, score, statusText);
}

// --- Anti-Cheat Sederhana ---
function setupAntiCheat() {
    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'hidden' && quizActive) {
            finishQuiz('Keluar dari Halaman (Integrity Violation)');
        }
    });

    window.addEventListener('blur', () => {
        if (quizActive) {
            setTimeout(() => {
                if (document.visibilityState === 'hidden' || !document.hasFocus()) {
                    finishQuiz('Fokus Beralih (Integrity Violation)');
                }
            }, 500);
        }
    });
}

// --- Event Listeners ---

// 1. Perbaikan Navigasi (Penyebab Masalah Anda Sebelumnya)
participantForm.addEventListener('submit', (e) => {
    e.preventDefault();
    participantName = document.getElementById('name').value.trim();
    participantClass = document.getElementById('class').value.trim();

    // Logika ini memastikan perpindahan halaman terjadi
    if (participantName && participantClass) {
        switchScreen('rules-screen');
    } else {
        alert("Mohon isi Nama Lengkap dan Posisi/Kelas Tes sebelum melanjutkan.");
    }
});

// 2. Klik Mulai Tes
startQuizBtn.addEventListener('click', () => {
    currentQuestionIndex = 0;
    score = 0;
    timeRemaining = 300;
    quizActive = true;
    timerDisplay.textContent = '05:00';
    timerDisplay.style.color = 'var(--neon-blue)';
    timerDisplay.style.textShadow = 'var(--shadow-blue)';

    questions.sort(() => Math.random() - 0.5);

    switchScreen('quiz-screen');
    loadQuestion();
    startTimer();
    setupAntiCheat(); 
});

// 3. Klik Soal Selanjutnya
nextBtn.addEventListener('click', nextQuestion);

// 4. Klik Ulangi Tes
restartBtn.addEventListener('click', () => {
    location.reload(); 
});

// Inisialisasi: Pastikan di layar awal saat load
document.addEventListener('DOMContentLoaded', () => {
    switchScreen('start-screen');
});
