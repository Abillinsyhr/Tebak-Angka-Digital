// Mengambil referensi ke elemen-elemen HTML yang akan kita manipulasi
const guesses = document.querySelector('.guesses'); // Untuk menampilkan tebakan sebelumnya
const lastResult = document.querySelector('.lastResult'); // Untuk menampilkan hasil tebakan (benar/salah)
const lowOrHi = document.querySelector('.lowOrHi'); // Untuk menampilkan petunjuk (terlalu tinggi/rendah)

const guessSubmit = document.querySelector('.guessSubmit'); // Tombol "Tebak"
const guessField = document.querySelector('.guessField'); // Input untuk angka tebakan

const resetButton = document.querySelector('.resetButton'); // Tombol "Mulai Game Baru"

// Variabel untuk logika game
let randomNumber = Math.floor(Math.random() * 100) + 1; // Angka acak antara 1-100
let guessCount = 1; // Menghitung berapa kali pemain menebak

// Fungsi utama yang dipanggil saat tombol "Tebak" diklik
function checkGuess() {
    const userGuess = Number(guessField.value); // Ambil nilai tebakan dari input dan ubah jadi angka

    // Menampilkan tebakan pemain di daftar tebakan sebelumnya
    if (guessCount === 1) {
        guesses.textContent = 'Tebakan sebelumnya: ';
    }
    guesses.textContent += userGuess + ' ';

    // Logika untuk memeriksa tebakan
    if (userGuess === randomNumber) {
        lastResult.textContent = 'Selamat! Tebakanmu BENAR!';
        lastResult.style.backgroundColor = 'lightgreen'; // Latar belakang hijau
        lowOrHi.textContent = ''; // Hapus petunjuk
        lastResult.classList.add('correct'); // Tambahkan kelas 'correct' untuk gaya khusus
        setGameOver(); // Akhiri game
    } else if (guessCount === 10) { // Jika sudah 10 kali tebakan
        lastResult.textContent = '!!! GAME OVER !!!';
        lowOrHi.textContent = '';
        setGameOver(); // Akhiri game
    } else { // Jika tebakan salah tapi belum game over
        lastResult.textContent = 'SALAH!';
        lastResult.style.backgroundColor = 'red'; // Latar belakang merah
        lastResult.classList.remove('correct'); // Pastikan kelas 'correct' dihapus
        if (userGuess < randomNumber) {
            lowOrHi.textContent = 'Terlalu RENDAH!';
        } else if (userGuess > randomNumber) {
            lowOrHi.textContent = 'Terlalu TINGGI!';
        }
    }

    guessCount++; // Tambah hitungan tebakan
    guessField.value = ''; // Kosongkan input tebakan
    guessField.focus(); // Fokuskan kembali ke input agar bisa langsung menebak lagi
}

// Menambahkan event listener ke tombol "Tebak"
guessSubmit.addEventListener('click', checkGuess);

// Fungsi untuk mengakhiri game
function setGameOver() {
    guessField.disabled = true; // Nonaktifkan input
    guessSubmit.disabled = true; // Nonaktifkan tombol tebak
    resetButton.style.display = 'block'; // Tampilkan tombol reset
    resetButton.addEventListener('click', resetGame); // Tambahkan event listener untuk tombol reset
}

// Fungsi untuk mereset game
function resetGame() {
    guessCount = 1; // Reset hitungan tebakan

    // Kosongkan semua teks hasil
    const resultParas = document.querySelectorAll('.result-paras p');
    for (const p of resultParas) {
        p.textContent = '';
    }

    resetButton.style.display = 'none'; // Sembunyikan tombol reset
    guessField.disabled = false; // Aktifkan kembali input
    guessSubmit.disabled = false; // Aktifkan kembali tombol tebak
    guessField.value = ''; // Kosongkan input
    guessField.focus(); // Fokuskan ke input

    lastResult.style.backgroundColor = 'transparent'; // Hapus latar belakang hasil
    lastResult.classList.remove('correct'); // Hapus kelas 'correct'

    randomNumber = Math.floor(Math.random() * 100) + 1; // Buat angka acak baru
}