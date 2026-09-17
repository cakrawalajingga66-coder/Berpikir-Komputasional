import { TeacherConfig } from '../types';

export function generateSingleFileHtml(config: TeacherConfig): string {
  return `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Pembelajaran Daring Informatika Kelas X - SMA Negeri 1 Tenggarong Seberang</title>
  
  <!-- Tailwind CSS via CDN -->
  <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
  
  <!-- FontAwesome 6 Icons CDN -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
  
  <!-- Google Fonts: Plus Jakarta Sans -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap" rel="stylesheet">

  <style>
    body { font-family: 'Plus Jakarta Sans', sans-serif; }
  </style>
</head>
<body class="bg-slate-50 text-slate-800 antialiased min-h-screen flex flex-col">

  <!-- =========================================================================
       IDENTITAS WEB & HEADER UTAMA
       Sekolah: SMA Negeri 1 Tenggarong Seberang
       Guru Pengampu: Yunyta Kartika
       Mata Pelajaran: Informatika (Kelas X - Fase E)
       ========================================================================= -->
  <header class="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
    <div class="bg-gradient-to-r from-emerald-700 via-teal-700 to-indigo-800 text-white px-4 py-2.5">
      <div class="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2 text-xs">
        <div class="flex items-center gap-2">
          <i class="fa-solid fa-graduation-cap text-emerald-300 text-sm"></i>
          <span class="font-semibold">${config.school}</span>
          <span>•</span>
          <span>Kurikulum Merdeka (Fase E)</span>
        </div>
        <div class="flex items-center gap-2">
          <i class="fa-solid fa-user-tie text-emerald-300"></i>
          <span>Guru Pengampu: <strong>${config.teacherName}</strong></span>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-3">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center shadow-md">
          <i class="fa-solid fa-laptop-code text-xl"></i>
        </div>
        <div>
          <h1 class="text-lg font-bold text-slate-900 leading-tight">Pembelajaran Daring Informatika Kelas X</h1>
          <p class="text-xs text-slate-500">Berpikir Komputasional & Struktur Data: Searching, Sorting, Stack, Queue</p>
        </div>
      </div>
      <button onclick="openPresensiModal()" class="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-sm transition flex items-center gap-2 cursor-pointer">
        <i class="fa-solid fa-clipboard-user"></i>
        <span>Presensi Kehadiran Siswa</span>
      </button>
    </div>

    <!-- 6 TABS NAVIGATION -->
    <nav class="max-w-7xl mx-auto px-4 border-t border-slate-100 overflow-x-auto">
      <div class="flex space-x-2 py-2 text-xs md:text-sm font-medium">
        <button onclick="switchTab('tab-presentation')" id="btn-tab-presentation" class="tab-btn active px-3.5 py-2 rounded-lg bg-emerald-600 text-white flex items-center gap-2 cursor-pointer">
          <i class="fa-solid fa-chalkboard-user"></i> Presentation
        </button>
        <button onclick="switchTab('tab-searching')" id="btn-tab-searching" class="tab-btn px-3.5 py-2 rounded-lg text-slate-600 hover:bg-slate-100 flex items-center gap-2 cursor-pointer">
          <i class="fa-solid fa-magnifying-glass"></i> Searching
        </button>
        <button onclick="switchTab('tab-sorting')" id="btn-tab-sorting" class="tab-btn px-3.5 py-2 rounded-lg text-slate-600 hover:bg-slate-100 flex items-center gap-2 cursor-pointer">
          <i class="fa-solid fa-arrow-down-wide-short"></i> Sorting
        </button>
        <button onclick="switchTab('tab-stack')" id="btn-tab-stack" class="tab-btn px-3.5 py-2 rounded-lg text-slate-600 hover:bg-slate-100 flex items-center gap-2 cursor-pointer">
          <i class="fa-solid fa-layer-group"></i> Stack
        </button>
        <button onclick="switchTab('tab-queue')" id="btn-tab-queue" class="tab-btn px-3.5 py-2 rounded-lg text-slate-600 hover:bg-slate-100 flex items-center gap-2 cursor-pointer">
          <i class="fa-solid fa-people-line"></i> Queue
        </button>
        <button onclick="switchTab('tab-fun')" id="btn-tab-fun" class="tab-btn px-3.5 py-2 rounded-lg text-slate-600 hover:bg-slate-100 flex items-center gap-2 cursor-pointer">
          <i class="fa-solid fa-gamepad"></i> Fun & Refleksi
        </button>
      </div>
    </nav>
  </header>

  <!-- MAIN CONTAINER -->
  <main class="max-w-7xl mx-auto px-4 py-6 flex-1 w-full space-y-6">

    <!-- TAB 1: PRESENTATION -->
    <section id="tab-presentation" class="tab-content space-y-6">
      <div class="bg-slate-900 text-white rounded-2xl p-6 md:p-8 shadow-xl border border-slate-800">
        <div class="flex items-center justify-between text-xs text-slate-400 mb-4 border-b border-slate-800 pb-2">
          <span>SLIDE INTERAKTIF BERPIKIR KOMPUTASIONAL</span>
          <span class="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-bold">Fase E</span>
        </div>
        <h2 class="text-2xl font-bold text-white mb-2">4 Pilar Berpikir Komputasional & Struktur Data</h2>
        <p class="text-slate-300 text-sm mb-6 leading-relaxed">
          Berpikir Komputasional (Computational Thinking) adalah cara berpikir terstruktur untuk memecahkan persoalan kompleks melalui Dekomposisi, Pengenalan Pola, Abstraksi, dan Perancangan Algoritma.
        </p>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div class="bg-white/10 p-4 rounded-xl border border-white/10">
            <i class="fa-solid fa-puzzle-piece text-indigo-400 text-xl mb-2 block"></i>
            <h3 class="font-bold text-sm text-white mb-1">1. Dekomposisi</h3>
            <p class="text-xs text-slate-300">Memecah masalah besar menjadi bagian yang lebih sederhana.</p>
          </div>
          <div class="bg-white/10 p-4 rounded-xl border border-white/10">
            <i class="fa-solid fa-chart-line text-emerald-400 text-xl mb-2 block"></i>
            <h3 class="font-bold text-sm text-white mb-1">2. Pengenalan Pola</h3>
            <p class="text-xs text-slate-300">Menemukan kesamaan atau tren dari masalah-masalah serupa.</p>
          </div>
          <div class="bg-white/10 p-4 rounded-xl border border-white/10">
            <i class="fa-solid fa-filter text-amber-400 text-xl mb-2 block"></i>
            <h3 class="font-bold text-sm text-white mb-1">3. Abstraksi</h3>
            <p class="text-xs text-slate-300">Fokus pada informasi utama dan mengabaikan detail tak perlu.</p>
          </div>
          <div class="bg-white/10 p-4 rounded-xl border border-white/10">
            <i class="fa-solid fa-list-ol text-rose-400 text-xl mb-2 block"></i>
            <h3 class="font-bold text-sm text-white mb-1">4. Algoritma</h3>
            <p class="text-xs text-slate-300">Menyusun langkah bertahap untuk menyelesaikan masalah.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- TAB 2: SEARCHING -->
    <section id="tab-searching" class="tab-content hidden space-y-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span class="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs font-bold rounded">Linear Search O(n)</span>
          <h3 class="font-bold text-base text-slate-900 mt-2 mb-1">Pencarian Berurutan</h3>
          <p class="text-xs text-slate-600 leading-relaxed">Mengecek data satu per satu dari awal sampai akhir. Tidak perlu data terurut, namun lebih lambat untuk data besar.</p>
        </div>
        <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span class="px-2 py-0.5 bg-indigo-100 text-indigo-800 text-xs font-bold rounded">Binary Search O(log n)</span>
          <h3 class="font-bold text-base text-slate-900 mt-2 mb-1">Pencarian Biner Bagi Dua</h3>
          <p class="text-xs text-slate-600 leading-relaxed">Membagi dua rentang data pada elemen tengah. Sangat cepat, namun data WAJIB sudah terurut lebih dulu.</p>
        </div>
      </div>

      <!-- VIDEO EMBED SEARCHING -->
      <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
        <h3 class="font-bold text-sm text-slate-900"><i class="fa-brands fa-youtube text-red-600 mr-2"></i>Video Pembelajaran Searching</h3>
        <!-- LINK EMBED VIDEO SEARCHING (DAPAT DISESUAIKAN GURU) -->
        <div class="aspect-video w-full rounded-xl overflow-hidden bg-black">
          <iframe class="w-full h-full" src="${config.searchingVideoUrl}" allowfullscreen></iframe>
        </div>
      </div>
    </section>

    <!-- TAB 3: SORTING -->
    <section id="tab-sorting" class="tab-content hidden space-y-6">
      <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
        <h3 class="font-bold text-sm text-slate-900"><i class="fa-brands fa-youtube text-red-600 mr-2"></i>Video Pembelajaran Sorting</h3>
        <!-- LINK EMBED VIDEO SORTING (DAPAT DISESUAIKAN GURU) -->
        <div class="aspect-video w-full rounded-xl overflow-hidden bg-black">
          <iframe class="w-full h-full" src="${config.searchingVideoUrl}" allowfullscreen></iframe>
        </div>
      </div>
    </section>

    <!-- TAB 4: STACK -->
    <section id="tab-stack" class="tab-content hidden space-y-6">
      <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
        <h3 class="font-bold text-sm text-slate-900"><i class="fa-brands fa-youtube text-red-600 mr-2"></i>Video Pembelajaran Stack (LIFO)</h3>
        <!-- LINK EMBED VIDEO STACK (DAPAT DISESUAIKAN GURU) -->
        <div class="aspect-video w-full rounded-xl overflow-hidden bg-black">
          <iframe class="w-full h-full" src="${config.stackQueueVideoUrl}" allowfullscreen></iframe>
        </div>
      </div>
    </section>

    <!-- TAB 5: QUEUE -->
    <section id="tab-queue" class="tab-content hidden space-y-6">
      <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
        <h3 class="font-bold text-sm text-slate-900"><i class="fa-brands fa-youtube text-red-600 mr-2"></i>Video Pembelajaran Queue (FIFO)</h3>
        <!-- LINK EMBED VIDEO QUEUE (DAPAT DISESUAIKAN GURU) -->
        <div class="aspect-video w-full rounded-xl overflow-hidden bg-black">
          <iframe class="w-full h-full" src="${config.stackQueueVideoUrl}" allowfullscreen></iframe>
        </div>
      </div>
    </section>

    <!-- TAB 6: FUN ACTIVITY & REFLEKSI -->
    <section id="tab-fun" class="tab-content hidden space-y-6">
      <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <h3 class="font-bold text-base text-slate-900 mb-2">Refleksi Belajar Siswa</h3>
        <p class="text-xs text-slate-500 mb-4">Ungkapkan pemahaman dan pengalaman belajarmu hari ini.</p>
        <div class="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800">
          Gunakan fitur interaktif lengkap pada aplikasi daring untuk mengikuti kuis skor otomatis dan simulasi pengurutan kartu!
        </div>
      </div>
    </section>
  </main>

  <!-- MODAL PRESENSI SISWA -->
  <!-- 
    =========================================================================
    PANDUAN GURU YUNYTA KARTIKA (PENGATURAN FORM PRESENSI):
    Ganti src iframe di bawah dengan URL Google Form Presensi Anda jika ingin
    menampilkan formulir Google resmi di dalam modal ini.
    =========================================================================
  -->
  <div id="presensi-modal" class="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs hidden items-center justify-center p-4">
    <div class="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
      <div class="flex items-center justify-between border-b pb-3">
        <h3 class="font-bold text-base text-slate-900">Formulir Presensi Siswa</h3>
        <button onclick="closePresensiModal()" class="text-slate-400 hover:text-slate-700 text-lg">&times;</button>
      </div>
      <form onsubmit="handlePresensiSubmit(event)" class="space-y-3 text-xs md:text-sm">
        <div>
          <label class="block font-semibold mb-1">Nama Lengkap Siswa</label>
          <input type="text" id="presensi-nama" required class="w-full border rounded-lg p-2" placeholder="Nama lengkap...">
        </div>
        <div>
          <label class="block font-semibold mb-1">Kelas (Fase E)</label>
          <select id="presensi-kelas" class="w-full border rounded-lg p-2">
            <option>X1</option><option>X2</option><option>X3</option>
            <option>X4</option><option>X5</option><option>X6</option><option>X7</option>
          </select>
        </div>
        <div>
          <label class="block font-semibold mb-1">Status Kehadiran</label>
          <select id="presensi-status" class="w-full border rounded-lg p-2">
            <option>Hadir</option><option>Izin</option><option>Sakit</option><option>Alpha</option>
          </select>
        </div>
        <div class="flex justify-end gap-2 pt-2">
          <button type="button" onclick="closePresensiModal()" class="px-4 py-2 text-slate-600">Batal</button>
          <button type="submit" class="px-4 py-2 bg-emerald-600 text-white rounded-lg font-bold">Simpan Presensi</button>
        </div>
      </form>
    </div>
  </div>

  <footer class="bg-white border-t border-slate-200 py-4 text-center text-xs text-slate-500 mt-auto">
    <p>&copy; ${new Date().getFullYear()} ${config.school} • Guru: ${config.teacherName} • Pembelajaran Informatika Kelas X</p>
  </footer>

  <script>
    function switchTab(tabId) {
      document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));
      document.getElementById(tabId).classList.remove('hidden');
      document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('bg-emerald-600', 'text-white');
        btn.classList.add('text-slate-600');
      });
      const activeBtn = document.getElementById('btn-' + tabId);
      if (activeBtn) {
        activeBtn.classList.add('bg-emerald-600', 'text-white');
        activeBtn.classList.remove('text-slate-600');
      }
    }
    function openPresensiModal() {
      document.getElementById('presensi-modal').classList.remove('hidden');
      document.getElementById('presensi-modal').classList.add('flex');
    }
    function closePresensiModal() {
      document.getElementById('presensi-modal').classList.add('hidden');
      document.getElementById('presensi-modal').classList.remove('flex');
    }
    function handlePresensiSubmit(e) {
      e.preventDefault();
      const nama = document.getElementById('presensi-nama').value;
      const kelas = document.getElementById('presensi-kelas').value;
      const status = document.getElementById('presensi-status').value;
      alert('Presensi berhasil disimpan!\\nNama: ' + nama + ' (' + kelas + ')\\nStatus: ' + status);
      closePresensiModal();
    }
  </script>
</body>
</html>`;
}
