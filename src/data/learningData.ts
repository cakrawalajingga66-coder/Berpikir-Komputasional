import { TeacherConfig, QuizQuestion } from '../types';

/**
 * ============================================================================================
 * PANDUAN PENGATURAN GURU (IBU YUNYTA KARTIKA - SMAN 1 TENGGARONG SEBERANG)
 * ============================================================================================
 * Anda dapat dengan mudah menyesuaikan link Google Form, Google Sheets, Slide PPT, dan Video
 * melalui variabel TEACHER_CONFIG di bawah ini atau melalui panel "Pengaturan Guru" di aplikasi.
 * ============================================================================================
 */
export const TEACHER_CONFIG: TeacherConfig = {
  teacherName: 'Yunyta Kartika, S.Kom.',
  subject: 'Informatika (Kelas X - Fase E)',
  school: 'SMA Negeri 1 Tenggarong Seberang',
  grade: 'Kelas X (Fase E - Kurikulum Merdeka)',

  // GANTI LINK GOOGLE FORM PRESENSI ANDA DI SINI:
  // Contoh: 'https://docs.google.com/forms/d/e/1FAIpQLSc.../viewform?embedded=true'
  googleFormUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSdExamplePresensiSMAN1TenggarongSeberang/viewform?embedded=true',

  // GANTI LINK SPREADSHEET HASIL PRESENSI DI SINI:
  googleSheetsUrl: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vExampleSpreadsheetYunytaKartika/pubhtml',

  // GANTI LINK EMBED GOOGLE SLIDES / POWERPOINT ONLINE DI SINI:
  // Contoh: 'https://docs.google.com/presentation/d/e/2PACX-1v.../embed?start=false&loop=false&delayms=3000'
  embedPptUrl: 'https://docs.google.com/presentation/d/e/2PACX-1vQEmbedPresentationExample/embed?start=false&loop=false&delayms=3000',

  // LINK VIDEO PEMBELAJARAN SESUAI REQUEST:
  // Tab 2 & Tab 3: Searching & Sorting -> https://www.youtube.com/watch?v=RN4wc9ClciM
  searchingVideoUrl: 'https://www.youtube-nocookie.com/embed/RN4wc9ClciM',
  
  // Tab 4 & Tab 5: Stack & Queue -> https://youtu.be/f7uGriR93xw?si=WKGxr2RYFMZjf_OU
  stackQueueVideoUrl: 'https://www.youtube-nocookie.com/embed/f7uGriR93xw',
};

export interface SlideData {
  id: number;
  title: string;
  badge: string;
  subtitle: string;
  description: string;
  keyPoints: { icon: string; title: string; desc: string }[];
  summary: string;
  tagColor: string;
}

export const SLIDES_DATA: SlideData[] = [
  {
    id: 1,
    badge: 'PENGANTAR BERPIKIR KOMPUTASIONAL',
    title: 'Apa itu Berpikir Komputasional (Computational Thinking)?',
    subtitle: 'Fondasi Utama Pemecahan Masalah Sistematis Siswa Abad 21',
    description: 'Berpikir Komputasional adalah metode pemecahan masalah (problem solving) dengan menerapkan teknik yang digunakan oleh software engineer dan ilmuwan komputer. Bukan sekadar memprogram komputer, melainkan melatih cara berpikir logis dan terstruktur.',
    keyPoints: [
      {
        icon: 'fa-puzzle-piece',
        title: 'Dekomposisi (Decomposition)',
        desc: 'Memecah masalah kompleks yang besar menjadi bagian-bagian yang lebih kecil, sederhana, dan mudah diselesaikan.'
      },
      {
        icon: 'fa-magnifying-glass-chart',
        title: 'Pengenalan Pola (Pattern Recognition)',
        desc: 'Melihat kesamaan, tren, atau keteraturan di antara masalah-masalah kecil yang sudah dipecah sebelumnya.'
      },
      {
        icon: 'fa-filter',
        title: 'Abstraksi (Abstraction)',
        desc: 'Fokus pada informasi utama yang esensial dan mengabaikan detail-detail yang tidak relevan.'
      },
      {
        icon: 'fa-list-ol',
        title: 'Perancangan Algoritma (Algorithms)',
        desc: 'Menyusun urutan langkah instruksi logis bertahap untuk menyelesaikan masalah secara tepat dan terulang.'
      }
    ],
    summary: 'Dengan 4 pilar ini, kita dapat merancang algoritma efisien dan memilih struktur data yang tepat untuk menyimpan informasi.',
    tagColor: 'from-blue-600 to-indigo-600'
  },
  {
    id: 2,
    badge: 'STRUKTUR DATA & ALGORITMA',
    title: 'Pilar Struktur Data: Mengapa Kita Butuh Penyimpanan Teratur?',
    subtitle: 'Data yang Rapi Memungkinkan Pemrosesan Cepat dan Andal',
    description: 'Dalam informatika, Struktur Data adalah cara mengorganisasi, mengelola, dan menyimpan data dalam memori komputer agar dapat diakses dan dimodifikasi secara efisien.',
    keyPoints: [
      {
        icon: 'fa-magnifying-glass',
        title: 'Searching (Pencarian)',
        desc: 'Proses menemukan lokasi data spesifik dalam sekumpulan data yang ada (Linear Search & Binary Search).'
      },
      {
        icon: 'fa-arrow-up-wide-short',
        title: 'Sorting (Pengurutan)',
        desc: 'Mengatur sekumpulan elemen dalam urutan tertentu (menaik / ascending atau menurun / descending).'
      },
      {
        icon: 'fa-layer-group',
        title: 'Stack (Tumpukan Data)',
        desc: 'Struktur data linear dengan aturan LIFO (Last In, First Out). Elemen terakhir masuk adalah yang pertama keluar.'
      },
      {
        icon: 'fa-people-line',
        title: 'Queue (Antrean Data)',
        desc: 'Struktur data linear dengan aturan FIFO (First In, First Out). Elemen pertama masuk adalah yang pertama dilayani.'
      }
    ],
    summary: 'Memilih struktur data yang salah dapat membuat aplikasi berjalan sangat lambat. Pemahaman mendalam adalah kunci!',
    tagColor: 'from-emerald-600 to-teal-600'
  },
  {
    id: 3,
    badge: 'MATERI 1: SEARCHING',
    title: 'Searching: Menemukan Jarum dalam Jerami Data',
    subtitle: 'Linear Search vs Binary Search',
    description: 'Ketika kamu memiliki ribuan bahkan jutaan data, bagaimana caramu mencari data tertentu? Apakah memeriksa satu per satu atau membagi dua area pencarian?',
    keyPoints: [
      {
        icon: 'fa-arrow-right',
        title: 'Linear / Sequential Search',
        desc: 'Memeriksa elemen satu per satu dari awal sampai akhir. Tidak memerlukan data terurut, namun lambat untuk data besar (O(n)).'
      },
      {
        icon: 'fa-code-fork',
        title: 'Binary Search (Pencarian Biner)',
        desc: 'Membagi rentang data menjadi dua secara berulang pada elemen tengah. Syarat mutlak: data WAJIB terurut lebih dulu! Sangat cepat (O(log n)).'
      },
      {
        icon: 'fa-bolt',
        title: 'Perbandingan Kecepatan',
        desc: 'Untuk 1.000.000 data: Linear Search butuh hingga 1.000.000 langkah. Binary Search hanya butuh maksimal 20 langkah!'
      }
    ],
    summary: 'Contoh nyata: Membuka buku telepon atau kamus bahasa tebal menggunakan teknik belah tengah (Binary Search).',
    tagColor: 'from-sky-600 to-blue-600'
  },
  {
    id: 4,
    badge: 'MATERI 2: SORTING',
    title: 'Sorting: Menertibkan Kekacauan Menjadi Pola Berurutan',
    subtitle: 'Ascending (A-Z, 0-9) & Descending (Z-A, 9-0)',
    description: 'Pengurutan adalah salah satu operasi paling fundamental dalam ilmu komputer. Data yang terurut memudahkan pembacaan, analisis, dan pencarian biner.',
    keyPoints: [
      {
        icon: 'fa-soap',
        title: 'Bubble Sort',
        desc: 'Membandingkan pasangan elemen bersebelahan dan menukarnya jika urutannya salah, hingga elemen terbesar mengapung ke akhir.'
      },
      {
        icon: 'fa-hand-pointer',
        title: 'Selection Sort',
        desc: 'Mencari nilai terkecil dari bagian yang belum terurut dan menempatkannya di posisi awal secara berulang.'
      },
      {
        icon: 'fa-file-import',
        title: 'Insertion Sort',
        desc: 'Menyisipkan setiap elemen ke posisi yang tepat pada bagian yang sudah terurut, mirip merapikan kartu remi di tangan.'
      },
      {
        icon: 'fa-gauge-high',
        title: 'Quick & Merge Sort',
        desc: 'Algoritma tingkat lanjut berbasis Divide and Conquer yang memecah array untuk kecepatan pengurutan optimal.'
      }
    ],
    summary: 'Contoh nyata: Guru mengurutkan lembar ujian berdasarkan nilai tertinggi ke terendah, atau mengurutkan siswa saat upacara.',
    tagColor: 'from-amber-600 to-orange-600'
  },
  {
    id: 5,
    badge: 'MATERI 3 & 4: STACK & QUEUE',
    title: 'Stack (LIFO) vs Queue (FIFO): Siapa yang Didahulukan?',
    subtitle: 'Dua Filosofi Antrean dan Tumpukan dalam Komputasi',
    description: 'Stack dan Queue adalah struktur data linear dengan batasan khusus pada titik penambahan dan penghapusan data.',
    keyPoints: [
      {
        icon: 'fa-layer-group',
        title: 'Stack: LIFO (Last In First Out)',
        desc: 'Hanya memiliki satu pintu masuk & keluar (TOP). Operasi: PUSH (tambah), POP (ambil), PEEK (intip teratas). Contoh: tombol Undo/Redo dan tumpukan piring.'
      },
      {
        icon: 'fa-users',
        title: 'Queue: FIFO (First In First Out)',
        desc: 'Memiliki dua ujung: REAR/Back (tempat masuk) dan FRONT (tempat keluar). Operasi: ENQUEUE (masuk) dan DEQUEUE (keluar). Contoh: antrean kasir tiket & printer spooling.'
      },
      {
        icon: 'fa-shield-halved',
        title: 'Kondisi Batas',
        desc: 'Overflow: mencoba menambah ke struktur yang sudah penuh. Underflow: mencoba mengambil data dari struktur yang kosong.'
      }
    ],
    summary: 'Pahami kata kuncinya: Stack = Piring Tumpuk (LIFO); Queue = Antrean Bioskop (FIFO).',
    tagColor: 'from-purple-600 to-pink-600'
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    topic: 'Searching',
    question: 'Syarat utama dan mutlak agar algoritma Binary Search (Pencarian Biner) dapat dijalankan adalah...',
    options: [
      'Jumlah data harus berjumlah genap',
      'Data sudah harus terurut (sorted) secara teratur terlebih dahulu',
      'Data harus berupa huruf alfabet, tidak boleh angka',
      'Data tidak boleh memiliki elemen duplikat'
    ],
    correctIndex: 1,
    explanation: 'Benar sekali! Binary Search bekerja dengan membagi dua area pencarian pada elemen tengah (mid). Teknik eliminasi setengah data ini hanya valid jika data sudah terurut rapi (ascending atau descending).'
  },
  {
    id: 2,
    topic: 'Stack',
    question: 'Ketika kamu mengetik dokumen di Microsoft Word dan tidak sengaja menghapus paragraf penting, lalu kamu menekan tombol "Ctrl + Z (Undo)", struktur data manakah yang bekerja di balik layar?',
    options: [
      'Queue (FIFO)',
      'Binary Tree',
      'Stack (LIFO)',
      'Linear Array'
    ],
    correctIndex: 2,
    explanation: 'Tepat! Tombol Undo bekerja berdasarkan prinsip Stack (LIFO - Last In First Out), di mana tindakan terakhir yang kamu lakukan disimpan di puncak tumpukan (TOP) dan akan dibatalkan terlebih dahulu.'
  },
  {
    id: 3,
    topic: 'Queue',
    question: 'Sebuah printer di lab komputer SMA Negeri 1 Tenggarong Seberang menerima 5 tugas cetak dokumen secara bersamaan. Dokumen siswa yang dikirim paling awal akan dicetak terlebih dahulu. Prinsip ini menerapkan konsep...',
    options: [
      'FIFO (First In First Out) pada Queue',
      'LIFO (Last In First Out) pada Stack',
      'Bubble Sort pada Data Array',
      'Binary Search pada Dokumen'
    ],
    correctIndex: 0,
    explanation: 'Hebat! Printer Spooling menerapkan konsep antrean (Queue) dengan prinsip FIFO (First In First Out), siapa yang mengirim dokumen pertama kali akan dilayani dan dicetak pertama kali.'
  },
  {
    id: 4,
    topic: 'Sorting',
    question: 'Algoritma pengurutan yang bekerja dengan cara membandingkan dua elemen yang bersebelahan dan menukarnya jika posisinya belum benar, sehingga elemen terbesar perlahan terdorong ke posisi akhir seperti gelembung udara, disebut...',
    options: [
      'Insertion Sort',
      'Quick Sort',
      'Selection Sort',
      'Bubble Sort'
    ],
    correctIndex: 3,
    explanation: 'Tepat sekali! Ini adalah karakteristik utama dari Bubble Sort (Pengurutan Gelembung), di mana elemen terbesar akan berpindah ke kanan secara bertahap dalam setiap putaran komparasi.'
  },
  {
    id: 5,
    topic: 'Berpikir Komputasional',
    question: 'Seorang siswa memecah tugas proyek pembuatan aplikasi Informatika menjadi bagian perancangan antarmuka (UI), penulisan logika algoritma, dan pengujian kesalahan. Langkah ini mencerminkan pilar berpikir komputasional yaitu...',
    options: [
      'Abstraksi',
      'Dekomposisi',
      'Pengenalan Pola',
      'Kompresi Data'
    ],
    correctIndex: 1,
    explanation: 'Luar biasa! Dekomposisi adalah kemampuan memecah masalah yang kompleks menjadi komponen-komponen yang lebih kecil dan lebih terfokus agar mudah dikerjakan satu per satu.'
  }
];
