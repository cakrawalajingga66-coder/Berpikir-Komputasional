import React, { useState, useEffect, useRef } from 'react';
import { TeacherConfig } from '../../types';

interface SearchingTabProps {
  teacherConfig: TeacherConfig;
}

export const SearchingTab: React.FC<SearchingTabProps> = ({ teacherConfig }) => {
  // Initial array: for Binary search it must be sorted
  const [arrayData, setArrayData] = useState<number[]>([12, 24, 31, 45, 56, 68, 73, 89, 94, 102]);
  const [targetNumber, setTargetNumber] = useState<number>(56);
  const [searchMethod, setSearchMethod] = useState<'linear' | 'binary'>('linear');

  // Simulation states
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [lowIndex, setLowIndex] = useState<number | null>(null);
  const [midIndex, setMidIndex] = useState<number | null>(null);
  const [highIndex, setHighIndex] = useState<number | null>(null);
  const [eliminatedIndices, setEliminatedIndices] = useState<number[]>([]);
  const [foundIndex, setFoundIndex] = useState<number | null>(null);
  const [stepLog, setStepLog] = useState<string[]>([]);
  const [stepCount, setStepCount] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  // Binary search pointer state for step-by-step
  const binaryStateRef = useRef<{ low: number; high: number }>({ low: 0, high: 9 });
  const linearCurrentRef = useRef<number>(0);
  const timerRef = useRef<any>(null);

  // Reset or randomize array
  const handleRandomize = () => {
    resetSimulation();
    const setNums = new Set<number>();
    while (setNums.size < 10) {
      setNums.add(Math.floor(Math.random() * 95) + 5);
    }
    const arr = Array.from(setNums).sort((a, b) => a - b);
    setArrayData(arr);
    // pick a random target from array or nearby
    const randomTarget = Math.random() > 0.3 ? arr[Math.floor(Math.random() * arr.length)] : 42;
    setTargetNumber(randomTarget);
  };

  const resetSimulation = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsPlaying(false);
    setCurrentIndex(null);
    setLowIndex(null);
    setMidIndex(null);
    setHighIndex(null);
    setEliminatedIndices([]);
    setFoundIndex(null);
    setStepCount(0);
    setIsFinished(false);
    setStepLog([]);
    binaryStateRef.current = { low: 0, high: arrayData.length - 1 };
    linearCurrentRef.current = 0;
  };

  useEffect(() => {
    resetSimulation();
  }, [searchMethod, targetNumber, arrayData]);

  // One step forward
  const performNextStep = () => {
    if (isFinished) return;

    if (searchMethod === 'linear') {
      const idx = linearCurrentRef.current;
      if (idx >= arrayData.length) {
        setIsFinished(true);
        setCurrentIndex(null);
        setStepLog((prev) => [
          ...prev,
          `🏁 Pencarian selesai: Seluruh ${arrayData.length} data telah diperiksa. Target ${targetNumber} TIDAK DITEMUKAN dalam array.`
        ]);
        return;
      }

      setCurrentIndex(idx);
      const val = arrayData[idx];
      const newStep = stepCount + 1;
      setStepCount(newStep);

      if (val === targetNumber) {
        setFoundIndex(idx);
        setIsFinished(true);
        setStepLog((prev) => [
          ...prev,
          `🎯 Langkah #${newStep}: Memeriksa indeks [${idx}] bernilai ${val}. SAMA DENGAN target ${targetNumber}! Data berhasil ditemukan!`
        ]);
      } else {
        setStepLog((prev) => [
          ...prev,
          `🔍 Langkah #${newStep}: Memeriksa indeks [${idx}] bernilai ${val}. Tidak cocok (${val} ≠ ${targetNumber}). Lanjut ke elemen berikutnya.`
        ]);
        linearCurrentRef.current = idx + 1;
      }
    } else {
      // Binary Search Step
      const { low, high } = binaryStateRef.current;
      if (low > high) {
        setIsFinished(true);
        setLowIndex(null);
        setHighIndex(null);
        setMidIndex(null);
        setStepLog((prev) => [
          ...prev,
          `🏁 Batas pencarian habis (Low > High). Target ${targetNumber} TIDAK DITEMUKAN dalam array!`
        ]);
        return;
      }

      const mid = Math.floor((low + high) / 2);
      setLowIndex(low);
      setHighIndex(high);
      setMidIndex(mid);

      const val = arrayData[mid];
      const newStep = stepCount + 1;
      setStepCount(newStep);

      if (val === targetNumber) {
        setFoundIndex(mid);
        setIsFinished(true);
        setStepLog((prev) => [
          ...prev,
          `🎯 Langkah #${newStep}: Menghitung nilai tengah (Mid) di indeks [${mid}] bernilai ${val}. TEPAT SAMA dengan target ${targetNumber}! Ditemukan hanya dalam ${newStep} langkah!`
        ]);
      } else if (val < targetNumber) {
        // Target is in the right half, eliminate left half including mid
        const newlyEliminated: number[] = [];
        for (let i = low; i <= mid; i++) {
          newlyEliminated.push(i);
        }
        setEliminatedIndices((prev) => [...prev, ...newlyEliminated]);
        binaryStateRef.current = { low: mid + 1, high };
        setStepLog((prev) => [
          ...prev,
          `➡️ Langkah #${newStep}: Nilai tengah indeks [${mid}] (${val}) < Target (${targetNumber}). Berarti target ada di paruh KANAN. Eliminasi indeks ${low} s.d ${mid}. Geser Low = ${mid + 1}.`
        ]);
      } else {
        // val > targetNumber, eliminate right half including mid
        const newlyEliminated: number[] = [];
        for (let i = mid; i <= high; i++) {
          newlyEliminated.push(i);
        }
        setEliminatedIndices((prev) => [...prev, ...newlyEliminated]);
        binaryStateRef.current = { low, high: mid - 1 };
        setStepLog((prev) => [
          ...prev,
          `⬅️ Langkah #${newStep}: Nilai tengah indeks [${mid}] (${val}) > Target (${targetNumber}). Berarti target ada di paruh KIRI. Eliminasi indeks ${mid} s.d ${high}. Geser High = ${mid - 1}.`
        ]);
      }
    }
  };

  // Auto-play toggle
  const togglePlay = () => {
    if (isPlaying) {
      clearInterval(timerRef.current);
      setIsPlaying(false);
    } else {
      if (isFinished) {
        resetSimulation();
      }
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        performNextStep();
      }, 1100);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isPlaying, isFinished, searchMethod, targetNumber, arrayData]);

  // When finished, stop playing
  useEffect(() => {
    if (isFinished) {
      setIsPlaying(false);
    }
  }, [isFinished]);

  return (
    <div className="space-y-6">
      {/* Title & Badge */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold mb-1.5 border border-blue-100">
            <i className="fa-solid fa-magnifying-glass text-blue-600"></i>
            <span>TAB 2: SEARCHING (PENCARIAN DATA)</span>
          </div>
          <h2 className="text-lg md:text-xl font-bold text-slate-900">
            Konsep & Visualisasi Interaktif Searching
          </h2>
          <p className="text-xs md:text-sm text-slate-500 mt-0.5">
            Pelajari perbedaan cara kerja Sequential (Linear) Search dan Binary Search langkah demi langkah.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-500">Materi Kelas X:</span>
          <span className="px-2.5 py-1 rounded-lg bg-slate-100 font-semibold text-slate-700">
            Fase E • Berpikir Komputasional
          </span>
        </div>
      </div>

      {/* Conceptual Cards: Linear vs Binary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Linear Search Card */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="px-2.5 py-1 rounded-md bg-sky-100 text-sky-800 text-xs font-bold">
                1. Linear / Sequential Search
              </span>
              <span className="text-xs font-mono bg-slate-100 px-2 py-0.5 rounded text-slate-600">
                Kompleksitas: O(n)
              </span>
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-2">
              Pencarian Berurutan dari Awal ke Akhir
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-3">
              Mengecek setiap elemen satu demi satu secara berurutan mulai dari indeks 0 hingga elemen terakhir atau sampai data yang dicari ditemukan.
            </p>
            <ul className="space-y-1.5 text-xs text-slate-600">
              <li className="flex items-start gap-2">
                <i className="fa-solid fa-check text-emerald-600 mt-0.5 shrink-0"></i>
                <span><strong>Kelebihan:</strong> Sangat fleksibel, data <em>TIDAK PERLU terurut</em> terlebih dahulu.</span>
              </li>
              <li className="flex items-start gap-2">
                <i className="fa-solid fa-triangle-exclamation text-amber-600 mt-0.5 shrink-0"></i>
                <span><strong>Kekurangan:</strong> Lambat jika data berjumlah besar (worst-case memeriksa seluruh n data).</span>
              </li>
            </ul>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-sky-800 bg-sky-50/70 p-2.5 rounded-xl">
            <i className="fa-solid fa-circle-question mr-1.5"></i>
            <strong>Analogi Nyata:</strong> Mencari baju kesayangan di tumpukan jemuran acak atau mencari nomor kontak di kertas coretan tanpa abjad.
          </div>
        </div>

        {/* Binary Search Card */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="px-2.5 py-1 rounded-md bg-indigo-100 text-indigo-800 text-xs font-bold">
                2. Binary Search (Pencarian Biner)
              </span>
              <span className="text-xs font-mono bg-slate-100 px-2 py-0.5 rounded text-slate-600">
                Kompleksitas: O(log n)
              </span>
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-2">
              Pencarian Bagi Dua Elemen Terurut
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-3">
              Membandingkan nilai target dengan elemen tengah (mid). Jika target lebih besar, eliminasi paruh kiri; jika lebih kecil, eliminasi paruh kanan. Ulangi hingga ketemu.
            </p>
            <ul className="space-y-1.5 text-xs text-slate-600">
              <li className="flex items-start gap-2">
                <i className="fa-solid fa-check text-emerald-600 mt-0.5 shrink-0"></i>
                <span><strong>Kelebihan:</strong> Super cepat! Untuk 1.000.000 data hanya butuh paling banyak ~20 komparasi.</span>
              </li>
              <li className="flex items-start gap-2">
                <i className="fa-solid fa-circle-exclamation text-rose-600 mt-0.5 shrink-0"></i>
                <span><strong>Syarat Mutlak:</strong> Kumpulan data <em>WAJIB SUDAH TERURUT</em> (sorted) sebelumnya!</span>
              </li>
            </ul>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-indigo-800 bg-indigo-50/70 p-2.5 rounded-xl">
            <i className="fa-solid fa-circle-question mr-1.5"></i>
            <strong>Analogi Nyata:</strong> Membuka Kamus Besar Bahasa Indonesia (KBBI) tebal dengan membelah halaman tengah langsung sesuai huruf awal.
          </div>
        </div>
      </div>

      {/* Interactive Visual Simulation Panel */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <i className="fa-solid fa-flask-vial text-emerald-600"></i>
              Simulasi Interaktif Visual: Uji Coba Searching Langkah Demi Langkah
            </h3>
            <p className="text-xs text-slate-500">
              Pilih algoritma, atur nilai target, dan amati bagaimana pointer memeriksa serta mengeliminasi data.
            </p>
          </div>

          {/* Algorithm Toggle */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setSearchMethod('linear')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                searchMethod === 'linear'
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Linear Search
            </button>
            <button
              onClick={() => setSearchMethod('binary')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                searchMethod === 'binary'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Binary Search
            </button>
          </div>
        </div>

        {/* Controls: Target Input, Steps, Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center bg-slate-50 p-4 rounded-xl border border-slate-200">
          {/* Target input */}
          <div className="flex items-center gap-2">
            <label className="text-xs font-bold text-slate-700 whitespace-nowrap">
              Cari Angka Target:
            </label>
            <input
              type="number"
              value={targetNumber}
              onChange={(e) => setTargetNumber(parseInt(e.target.value) || 0)}
              className="w-24 px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-sm font-bold text-center text-slate-800 focus:ring-2 focus:ring-emerald-500 outline-hidden"
            />
            <button
              onClick={handleRandomize}
              className="px-2.5 py-1.5 bg-white border border-slate-300 hover:bg-slate-100 rounded-lg text-xs font-semibold text-slate-700 transition cursor-pointer"
              title="Acak Data Array"
            >
              <i className="fa-solid fa-shuffle mr-1"></i>
              Acak
            </button>
          </div>

          {/* Step Count & Status */}
          <div className="flex items-center justify-center gap-3 text-xs">
            <div className="px-3 py-1.5 bg-white rounded-lg border border-slate-200 shadow-2xs font-semibold text-slate-700">
              Langkah ke: <strong className="text-emerald-700 text-sm">{stepCount}</strong>
            </div>
            {foundIndex !== null ? (
              <span className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white font-bold animate-pulse">
                <i className="fa-solid fa-check-circle mr-1"></i> Ditemukan (Indeks {foundIndex})
              </span>
            ) : isFinished ? (
              <span className="px-3 py-1.5 rounded-lg bg-rose-600 text-white font-bold">
                <i className="fa-solid fa-xmark-circle mr-1"></i> Tidak Ada
              </span>
            ) : (
              <span className="px-3 py-1.5 rounded-lg bg-slate-200 text-slate-700 font-medium">
                Siap / Berjalan
              </span>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-2">
            <button
              onClick={togglePlay}
              disabled={isFinished}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold text-white transition flex items-center gap-1.5 cursor-pointer ${
                isPlaying ? 'bg-amber-600 hover:bg-amber-700' : 'bg-emerald-600 hover:bg-emerald-700'
              } disabled:opacity-40 disabled:cursor-not-allowed`}
            >
              <i className={`fa-solid ${isPlaying ? 'fa-pause' : 'fa-play'}`}></i>
              {isPlaying ? 'Jeda' : 'Otomatis'}
            </button>

            <button
              onClick={performNextStep}
              disabled={isFinished || isPlaying}
              className="px-3 py-1.5 rounded-lg text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white transition flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              <i className="fa-solid fa-forward-step"></i>
              Langkah Berikutnya
            </button>

            <button
              onClick={resetSimulation}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 transition cursor-pointer"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Array Visualization Container */}
        <div className="pt-2 pb-6 overflow-x-auto">
          <div className="flex items-end justify-center gap-2 min-w-max px-4 py-6">
            {arrayData.map((val, idx) => {
              const isExamining = searchMethod === 'linear' ? currentIndex === idx : midIndex === idx;
              const isFound = foundIndex === idx;
              const isEliminated = eliminatedIndices.includes(idx);
              const isLow = lowIndex === idx;
              const isHigh = highIndex === idx;

              let boxColor = 'bg-white border-slate-300 text-slate-800';
              let badgeText = '';

              if (isFound) {
                boxColor = 'bg-emerald-500 border-emerald-600 text-white shadow-lg scale-110 ring-4 ring-emerald-300';
                badgeText = 'FOUND';
              } else if (isExamining) {
                boxColor = 'bg-amber-400 border-amber-500 text-slate-900 shadow-md scale-105 ring-2 ring-amber-300';
                badgeText = searchMethod === 'binary' ? 'MID' : 'CHECK';
              } else if (isEliminated) {
                boxColor = 'bg-slate-100 border-slate-200 text-slate-400 opacity-40 line-through';
                badgeText = 'ELIMINATED';
              }

              return (
                <div key={idx} className="flex flex-col items-center gap-1.5 relative group">
                  {/* Top Pointer Badges for Binary Search (Low / Mid / High) */}
                  <div className="h-6 flex items-center justify-center text-[10px] font-extrabold font-mono">
                    {searchMethod === 'binary' && isLow && (
                      <span className="px-1.5 py-0.5 rounded bg-blue-600 text-white shadow-2xs">
                        LOW
                      </span>
                    )}
                    {searchMethod === 'binary' && isHigh && !isLow && (
                      <span className="px-1.5 py-0.5 rounded bg-purple-600 text-white shadow-2xs">
                        HIGH
                      </span>
                    )}
                    {searchMethod === 'linear' && isExamining && (
                      <span className="px-1.5 py-0.5 rounded bg-amber-500 text-slate-900 shadow-2xs">
                        PTR ↓
                      </span>
                    )}
                  </div>

                  {/* Main Value Box */}
                  <div
                    className={`w-14 h-16 sm:w-16 sm:h-20 rounded-xl border-2 flex flex-col items-center justify-center font-bold text-base sm:text-lg transition-all duration-300 ${boxColor}`}
                  >
                    <span>{val}</span>
                    {badgeText && (
                      <span className="text-[9px] font-mono tracking-tighter opacity-90">
                        {badgeText}
                      </span>
                    )}
                  </div>

                  {/* Index Indicator */}
                  <span className="text-[11px] font-mono font-semibold text-slate-500">
                    [{idx}]
                  </span>
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-600 pt-2 border-t border-slate-100">
            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded bg-white border-2 border-slate-300"></span>
              <span>Belum diperiksa</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded bg-amber-400 border border-amber-500"></span>
              <span>Sedang diperiksa</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded bg-emerald-500 border border-emerald-600"></span>
              <span>Target Ditemukan</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded bg-slate-200 opacity-50"></span>
              <span>Dieliminasi (Tidak memenuhi syarat)</span>
            </div>
          </div>
        </div>

        {/* Live Step Log */}
        <div className="bg-slate-900 rounded-xl p-4 text-white font-mono text-xs max-h-48 overflow-y-auto">
          <div className="flex items-center justify-between text-slate-400 mb-2 border-b border-slate-800 pb-1.5">
            <span className="text-emerald-400 font-bold">
              <i className="fa-solid fa-terminal mr-1.5"></i>
              Log Langkah Algoritma Real-Time:
            </span>
            <span className="text-[11px] text-slate-500">
              Total Log: {stepLog.length} catatan
            </span>
          </div>

          {stepLog.length === 0 ? (
            <p className="text-slate-500 italic">
              Tekan tombol "Langkah Berikutnya" atau "Otomatis" di atas untuk memulai penelusuran data...
            </p>
          ) : (
            <div className="space-y-1">
              {stepLog.map((log, index) => (
                <div key={index} className="text-slate-200">
                  {log}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Video Pembelajaran Sesuai Request */}
      {/* Link: https://www.youtube.com/watch?v=RN4wc9ClciM */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-50 text-red-700 text-xs font-bold mb-1">
              <i className="fa-brands fa-youtube text-red-600"></i>
              Video Pembelajaran YouTube
            </div>
            <h3 className="font-bold text-slate-900 text-base">
              Video Edukasi: Searching & Sorting dalam Berpikir Komputasional
            </h3>
          </div>
          <a
            href="https://www.youtube.com/watch?v=RN4wc9ClciM"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-red-600 hover:text-red-700 font-semibold flex items-center gap-1.5 hover:underline"
          >
            Buka di YouTube <i className="fa-solid fa-arrow-up-right-from-square text-[10px]"></i>
          </a>
        </div>

        {/* Video Embed Player */}
        <div className="w-full aspect-video rounded-xl overflow-hidden bg-slate-900 border border-slate-200 shadow-md">
          {/* 
            * =========================================================================
            * PANDUAN GURU YUNYTA KARTIKA:
            * Embed URL di bawah bersumber dari request: https://www.youtube.com/watch?v=RN4wc9ClciM
            * =========================================================================
          */}
          <iframe
            src={teacherConfig.searchingVideoUrl}
            title="Video Pembelajaran Searching Informatika Kelas X"
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
      </div>

      {/* Real-World Contextual Examples */}
      <div className="bg-gradient-to-br from-slate-50 to-blue-50/50 rounded-2xl p-6 border border-slate-200">
        <h3 className="font-bold text-slate-900 text-base mb-3 flex items-center gap-2">
          <i className="fa-solid fa-earth-asia text-blue-600"></i>
          Contoh Penerapan Kontekstual Kehidupan Nyata
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs md:text-sm">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold mb-2">
              <i className="fa-solid fa-address-book"></i>
            </div>
            <h4 className="font-bold text-slate-900 mb-1">Buku Telepon Tebal</h4>
            <p className="text-slate-600 text-xs leading-relaxed">
              Mencari nama teman "Siti" di buku telepon tebal tidak pernah dibuka lembar per lembar dari halaman 1, melainkan langsung membuka halaman tengah (huruf M/N) lalu belah kanan menuju huruf S. Ini adalah implementasi murni <strong>Binary Search</strong>.
            </p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold mb-2">
              <i className="fa-solid fa-basket-shopping"></i>
            </div>
            <h4 className="font-bold text-slate-900 mb-1">Mencari Barang di Rak Supermarket</h4>
            <p className="text-slate-600 text-xs leading-relaxed">
              Jika rak barang tidak disusun menurut urutan nama atau kode, pembeli terpaksa mengamati label satu demi satu dari ujung kiri ke kanan rak. Ini adalah <strong>Linear / Sequential Search</strong>.
            </p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
            <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center font-bold mb-2">
              <i className="fa-solid fa-book"></i>
            </div>
            <h4 className="font-bold text-slate-900 mb-1">Kamus Bahasa di Perpustakaan SMAN 1</h4>
            <p className="text-slate-600 text-xs leading-relaxed">
              Kamus kata tersusun rapi menurut abjad A s.d Z. Guru dan siswa memanfaatkannya untuk mempercepat pencarian definisi dengan memotong paruh kata yang tidak sesuai secara efisien.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
