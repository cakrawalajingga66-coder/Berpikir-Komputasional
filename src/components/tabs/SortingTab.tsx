import React, { useState, useEffect, useRef } from 'react';
import { TeacherConfig } from '../../types';

interface SortingTabProps {
  teacherConfig: TeacherConfig;
}

type SortAlgorithm = 'bubble' | 'selection' | 'insertion' | 'quick';

interface BarItem {
  id: number;
  value: number;
  status: 'default' | 'comparing' | 'swapping' | 'sorted';
}

interface AnimationStep {
  bars: BarItem[];
  comparingIndices?: [number, number];
  swapIndices?: [number, number];
  sortedIndices?: number[];
  description: string;
}

export const SortingTab: React.FC<SortingTabProps> = ({ teacherConfig }) => {
  const [selectedAlgo, setSelectedAlgo] = useState<SortAlgorithm>('bubble');
  const [bars, setBars] = useState<BarItem[]>([]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(350); // ms per step
  const [comparisons, setComparisons] = useState<number>(0);
  const [swaps, setSwaps] = useState<number>(0);
  const [currentStepDesc, setCurrentStepDesc] = useState<string>('Pilih algoritma lalu tekan Mulai Pengurutan.');
  
  // Animation frames precomputed
  const stepsRef = useRef<AnimationStep[]>([]);
  const currentStepIndexRef = useRef<number>(0);
  const timerRef = useRef<any>(null);

  // Initialize random bars
  const generateRandomBars = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsPlaying(false);
    const initialVals = [45, 18, 72, 33, 90, 25, 60, 12, 84, 52];
    // shuffle a bit or randomize
    const randomized = initialVals.sort(() => Math.random() - 0.5);
    const newBars: BarItem[] = randomized.map((val, idx) => ({
      id: idx,
      value: val,
      status: 'default',
    }));
    setBars(newBars);
    setComparisons(0);
    setSwaps(0);
    setCurrentStepDesc('Data siap. Tekan "Mulai" untuk menjalankan visualisasi pengurutan.');
    currentStepIndexRef.current = 0;
    stepsRef.current = [];
  };

  useEffect(() => {
    generateRandomBars();
  }, [selectedAlgo]);

  // Precompute steps for chosen algorithm
  const generateSteps = (initialBars: BarItem[], algo: SortAlgorithm): AnimationStep[] => {
    const steps: AnimationStep[] = [];
    const arr = initialBars.map((b) => ({ ...b }));
    let compCount = 0;
    let swapCount = 0;

    const recordStep = (desc: string, comp?: [number, number], sw?: [number, number], sorted: number[] = []) => {
      const snapshot: BarItem[] = arr.map((b, idx) => {
        let status: BarItem['status'] = 'default';
        if (sorted.includes(idx)) status = 'sorted';
        else if (sw && (idx === sw[0] || idx === sw[1])) status = 'swapping';
        else if (comp && (idx === comp[0] || idx === comp[1])) status = 'comparing';
        return { ...b, status };
      });
      steps.push({
        bars: snapshot,
        comparingIndices: comp,
        swapIndices: sw,
        sortedIndices: sorted,
        description: desc,
      });
    };

    if (algo === 'bubble') {
      const n = arr.length;
      const sorted: number[] = [];
      for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
          compCount++;
          recordStep(`Bandingkan indeks [${j}] (${arr[j].value}) dengan indeks [${j + 1}] (${arr[j + 1].value})`, [j, j + 1], undefined, sorted);
          if (arr[j].value > arr[j + 1].value) {
            swapCount++;
            // swap
            const temp = arr[j];
            arr[j] = arr[j + 1];
            arr[j + 1] = temp;
            recordStep(`Tukar posisi! Karena ${arr[j + 1].value} > ${arr[j].value}, geser elemen lebih besar ke kanan.`, undefined, [j, j + 1], sorted);
          }
        }
        sorted.push(n - 1 - i);
        recordStep(`Elemen terbesar untuk iterasi ini telah mapan di indeks [${n - 1 - i}]`, undefined, undefined, sorted);
      }
      sorted.push(0);
      recordStep(`Pengurutan selesai! Semua data telah berada pada urutan menaik (Ascending).`, undefined, undefined, sorted);
    } else if (algo === 'selection') {
      const n = arr.length;
      const sorted: number[] = [];
      for (let i = 0; i < n - 1; i++) {
        let minIdx = i;
        recordStep(`Iterasi ke-${i + 1}: Mencari elemen terkecil mulai dari indeks [${i}]`, [i, i], undefined, sorted);
        for (let j = i + 1; j < n; j++) {
          compCount++;
          recordStep(`Bandingkan kandidat minimum (${arr[minIdx].value}) dengan indeks [${j}] (${arr[j].value})`, [minIdx, j], undefined, sorted);
          if (arr[j].value < arr[minIdx].value) {
            minIdx = j;
            recordStep(`Ditemukan nilai lebih kecil baru: ${arr[minIdx].value} di indeks [${minIdx}]`, [minIdx, minIdx], undefined, sorted);
          }
        }
        if (minIdx !== i) {
          swapCount++;
          const temp = arr[i];
          arr[i] = arr[minIdx];
          arr[minIdx] = temp;
          recordStep(`Tukar elemen terkecil ${arr[i].value} ke posisi awal iterasi indeks [${i}]`, undefined, [i, minIdx], sorted);
        }
        sorted.push(i);
      }
      sorted.push(n - 1);
      recordStep(`Selection Sort selesai! Seluruh elemen tersusun rapi dari terkecil ke terbesar.`, undefined, undefined, sorted);
    } else if (algo === 'insertion') {
      const n = arr.length;
      const sorted: number[] = [0];
      recordStep(`Elemen pertama (${arr[0].value}) dianggap sudah terurut secara mandiri.`, undefined, undefined, sorted);
      for (let i = 1; i < n; i++) {
        const key = arr[i];
        let j = i - 1;
        recordStep(`Ambil elemen kunci [${i}] bernilai ${key.value} untuk disisipkan ke posisi yang tepat.`, [i, i], undefined, sorted);
        while (j >= 0 && arr[j].value > key.value) {
          compCount++;
          swapCount++;
          recordStep(`Bandingkan ${arr[j].value} > ${key.value}: Geser ${arr[j].value} satu posisi ke kanan.`, [j, j + 1], [j, j + 1], sorted);
          arr[j + 1] = arr[j];
          j--;
        }
        arr[j + 1] = key;
        sorted.push(i);
        recordStep(`Elemen ${key.value} disisipkan ke indeks [${j + 1}].`, undefined, [j + 1, j + 1], sorted);
      }
      recordStep(`Insertion Sort tuntas! Mirip kartu remi yang telah dirapikan satu per satu.`, undefined, undefined, sorted);
    } else {
      // Quick Sort simplified visualization
      const sorted: number[] = [];
      const quickSortHelper = (low: number, high: number) => {
        if (low < high) {
          const pivotVal = arr[high].value;
          let i = low - 1;
          recordStep(`Pilih Pivot di indeks [${high}] bernilai ${pivotVal} untuk partisi rentang [${low}..${high}]`, [high, high], undefined, sorted);
          for (let j = low; j < high; j++) {
            compCount++;
            recordStep(`Bandingkan elemen [${j}] (${arr[j].value}) dengan Pivot (${pivotVal})`, [j, high], undefined, sorted);
            if (arr[j].value < pivotVal) {
              i++;
              swapCount++;
              const temp = arr[i];
              arr[i] = arr[j];
              arr[j] = temp;
              recordStep(`Elemen lebih kecil dari pivot: Tukar indeks [${i}] dan [${j}]`, undefined, [i, j], sorted);
            }
          }
          swapCount++;
          const temp = arr[i + 1];
          arr[i + 1] = arr[high];
          arr[high] = temp;
          sorted.push(i + 1);
          recordStep(`Pivot ${pivotVal} ditempatkan di posisi paten indeks [${i + 1}]`, undefined, [i + 1, high], sorted);
          const pIndex = i + 1;
          quickSortHelper(low, pIndex - 1);
          quickSortHelper(pIndex + 1, high);
        } else if (low === high) {
          sorted.push(low);
        }
      };
      quickSortHelper(0, arr.length - 1);
      recordStep(`Quick Sort selesai! Teknik Divide & Conquer berhasil mengurutkan seluruh data.`, undefined, undefined, Array.from({ length: arr.length }, (_, k) => k));
    }

    return steps;
  };

  // Step next action
  const stepForward = () => {
    if (stepsRef.current.length === 0) {
      stepsRef.current = generateSteps(bars, selectedAlgo);
      currentStepIndexRef.current = 0;
    }

    if (currentStepIndexRef.current < stepsRef.current.length) {
      const step = stepsRef.current[currentStepIndexRef.current];
      setBars(step.bars);
      setCurrentStepDesc(step.description);
      if (step.comparingIndices) setComparisons((prev) => prev + 1);
      if (step.swapIndices) setSwaps((prev) => prev + 1);
      currentStepIndexRef.current += 1;
    } else {
      setIsPlaying(false);
      clearInterval(timerRef.current);
    }
  };

  // Toggle play/pause
  const togglePlay = () => {
    if (isPlaying) {
      clearInterval(timerRef.current);
      setIsPlaying(false);
    } else {
      if (stepsRef.current.length === 0 || currentStepIndexRef.current >= stepsRef.current.length) {
        stepsRef.current = generateSteps(bars, selectedAlgo);
        currentStepIndexRef.current = 0;
        setComparisons(0);
        setSwaps(0);
      }
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        if (currentStepIndexRef.current < stepsRef.current.length) {
          const step = stepsRef.current[currentStepIndexRef.current];
          setBars(step.bars);
          setCurrentStepDesc(step.description);
          if (step.comparingIndices) setComparisons((prev) => prev + 1);
          if (step.swapIndices) setSwaps((prev) => prev + 1);
          currentStepIndexRef.current += 1;
        } else {
          setIsPlaying(false);
          clearInterval(timerRef.current);
        }
      }, speed);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isPlaying, speed]);

  return (
    <div className="space-y-6">
      {/* Title & Badge */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-semibold mb-1.5 border border-amber-200">
            <i className="fa-solid fa-arrow-down-wide-short text-amber-600"></i>
            <span>TAB 3: SORTING (PENGURUTAN DATA)</span>
          </div>
          <h2 className="text-lg md:text-xl font-bold text-slate-900">
            Simulasi Animasi Grafik Batang Algoritma Sorting
          </h2>
          <p className="text-xs md:text-sm text-slate-500 mt-0.5">
            Eksplorasi cara komputer menata urutan data (Ascending) dengan Bubble, Selection, Insertion, dan Quick Sort.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl">
          {(['bubble', 'selection', 'insertion', 'quick'] as SortAlgorithm[]).map((algo) => (
            <button
              key={algo}
              onClick={() => {
                setSelectedAlgo(algo);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition cursor-pointer ${
                selectedAlgo === algo
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {algo === 'bubble' ? 'Bubble' : algo === 'selection' ? 'Selection' : algo === 'insertion' ? 'Insertion' : 'Quick'}
            </button>
          ))}
        </div>
      </div>

      {/* Concept Comparison Quick Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className={`p-4 rounded-xl border transition ${selectedAlgo === 'bubble' ? 'bg-amber-50/70 border-amber-300 ring-2 ring-amber-200' : 'bg-white border-slate-200'}`}>
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-bold text-sm text-slate-900">Bubble Sort</h4>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 font-bold">O(n²)</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Membandingkan dua elemen bersebelahan secara berulang, menukar jika posisinya keliru hingga elemen terbesar mengapung ke ujung kanan.
          </p>
        </div>

        <div className={`p-4 rounded-xl border transition ${selectedAlgo === 'selection' ? 'bg-amber-50/70 border-amber-300 ring-2 ring-amber-200' : 'bg-white border-slate-200'}`}>
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-bold text-sm text-slate-900">Selection Sort</h4>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 font-bold">O(n²)</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Mencari nilai paling kecil di seluruh bagian array yang belum terurut, lalu langsung menukarnya ke posisi paling depan.
          </p>
        </div>

        <div className={`p-4 rounded-xl border transition ${selectedAlgo === 'insertion' ? 'bg-amber-50/70 border-amber-300 ring-2 ring-amber-200' : 'bg-white border-slate-200'}`}>
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-bold text-sm text-slate-900">Insertion Sort</h4>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 font-bold">O(n²)</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Menyisipkan setiap elemen satu demi satu ke posisi yang tepat pada kelompok yang sudah terurut, mirip menyusun kartu di tangan.
          </p>
        </div>

        <div className={`p-4 rounded-xl border transition ${selectedAlgo === 'quick' ? 'bg-amber-50/70 border-amber-300 ring-2 ring-amber-200' : 'bg-white border-slate-200'}`}>
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-bold text-sm text-slate-900">Quick & Merge Sort</h4>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">O(n log n)</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Algoritma <em>Divide & Conquer</em>: memilih elemen Pivot dan mempartisi data menjadi kelompok lebih kecil dan lebih besar.
          </p>
        </div>
      </div>

      {/* Main Bar Chart Simulation Stage */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
        {/* Top Control Bar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
              Visualizer Grafik Batang
            </span>
            <h3 className="text-base font-bold text-slate-900">
              Animasi {selectedAlgo.toUpperCase()} SORT (10 Elemen Array)
            </h3>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Speed Selector */}
            <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-2.5 py-1.5 rounded-xl text-xs">
              <span className="text-slate-500 font-medium">Kecepatan:</span>
              <button
                onClick={() => setSpeed(600)}
                className={`px-2 py-0.5 rounded font-bold ${speed === 600 ? 'bg-amber-600 text-white' : 'text-slate-600 hover:bg-slate-200'}`}
              >
                Lambat
              </button>
              <button
                onClick={() => setSpeed(300)}
                className={`px-2 py-0.5 rounded font-bold ${speed === 300 ? 'bg-amber-600 text-white' : 'text-slate-600 hover:bg-slate-200'}`}
              >
                Sedang
              </button>
              <button
                onClick={() => setSpeed(120)}
                className={`px-2 py-0.5 rounded font-bold ${speed === 120 ? 'bg-amber-600 text-white' : 'text-slate-600 hover:bg-slate-200'}`}
              >
                Cepat
              </button>
            </div>

            {/* Metrics Counters */}
            <div className="flex items-center gap-2 text-xs">
              <div className="px-3 py-1.5 bg-slate-100 rounded-lg text-slate-700 font-semibold border border-slate-200">
                Komparasi: <strong className="text-amber-700 text-sm">{comparisons}</strong>
              </div>
              <div className="px-3 py-1.5 bg-slate-100 rounded-lg text-slate-700 font-semibold border border-slate-200">
                Penukaran (Swaps): <strong className="text-rose-700 text-sm">{swaps}</strong>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={generateRandomBars}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 transition cursor-pointer flex items-center gap-1"
                title="Acak Susunan Nilai Bar"
              >
                <i className="fa-solid fa-shuffle"></i>
                Acak
              </button>

              <button
                onClick={stepForward}
                disabled={isPlaying}
                className="px-3 py-1.5 rounded-lg text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white transition flex items-center gap-1.5 disabled:opacity-40 cursor-pointer"
              >
                <i className="fa-solid fa-forward-step"></i>
                Langkah (Step)
              </button>

              <button
                onClick={togglePlay}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold text-white transition flex items-center gap-1.5 cursor-pointer ${
                  isPlaying ? 'bg-rose-600 hover:bg-rose-700' : 'bg-emerald-600 hover:bg-emerald-700'
                }`}
              >
                <i className={`fa-solid ${isPlaying ? 'fa-pause' : 'fa-play'}`}></i>
                {isPlaying ? 'Jeda' : 'Mulai'}
              </button>
            </div>
          </div>
        </div>

        {/* The Graphic Bar Chart Area */}
        <div className="bg-slate-900 rounded-2xl p-6 pt-10 pb-4 min-h-[300px] flex flex-col justify-end border border-slate-800 shadow-inner">
          <div className="flex items-end justify-center gap-2 sm:gap-4 h-56 w-full">
            {bars.map((bar) => {
              // Colors based on state
              let barBg = 'from-sky-500 to-blue-600 border-sky-400';
              let badgeColor = 'text-sky-300';
              if (bar.status === 'comparing') {
                barBg = 'from-amber-400 to-amber-500 border-amber-300 shadow-lg ring-2 ring-amber-300 animate-pulse';
                badgeColor = 'text-amber-300';
              } else if (bar.status === 'swapping') {
                barBg = 'from-rose-500 to-pink-600 border-rose-300 shadow-lg ring-2 ring-rose-300 scale-105';
                badgeColor = 'text-rose-300';
              } else if (bar.status === 'sorted') {
                barBg = 'from-emerald-500 to-teal-500 border-emerald-300';
                badgeColor = 'text-emerald-300';
              }

              // Height in percentage
              const heightPercent = Math.max(15, (bar.value / 105) * 100);

              return (
                <div key={bar.id} className="flex-1 max-w-[56px] flex flex-col items-center gap-2 group transition-all duration-300">
                  {/* Floating Value Indicator */}
                  <span className={`text-xs font-mono font-bold transition-all ${badgeColor}`}>
                    {bar.value}
                  </span>

                  {/* Vertical Animated Bar */}
                  <div
                    style={{ height: `${heightPercent}%` }}
                    className={`w-full rounded-t-lg bg-gradient-to-t border-t-2 border-x-2 transition-all duration-300 ${barBg}`}
                  ></div>

                  {/* Status Tag */}
                  <span className="text-[10px] font-mono text-slate-400">
                    [{bar.id}]
                  </span>
                </div>
              );
            })}
          </div>

          {/* Bar Legend */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-400 pt-4 mt-4 border-t border-slate-800">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-sky-500"></span>
              <span>Posisi Semula</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-amber-400 animate-pulse"></span>
              <span>Sedang Dibandingkan</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-rose-500"></span>
              <span>Sedang Ditukar</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-emerald-500"></span>
              <span>Sudah Terurut Permanen</span>
            </div>
          </div>
        </div>

        {/* Current Step Description Card */}
        <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-xl text-xs md:text-sm text-slate-800 flex items-start gap-3">
          <div className="w-7 h-7 rounded-lg bg-amber-600 text-white flex items-center justify-center shrink-0 mt-0.5">
            <i className="fa-solid fa-code-compare"></i>
          </div>
          <div>
            <span className="font-bold block text-amber-900 mb-0.5">Keterangan Langkah Saat Ini:</span>
            <p className="text-slate-700 leading-relaxed font-mono text-xs md:text-sm">
              {currentStepDesc}
            </p>
          </div>
        </div>
      </div>

      {/* Video Pembelajaran YouTube Sesuai Request */}
      {/* https://www.youtube.com/watch?v=RN4wc9ClciM */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-50 text-red-700 text-xs font-bold mb-1">
              <i className="fa-brands fa-youtube text-red-600"></i>
              Video Pembelajaran YouTube
            </div>
            <h3 className="font-bold text-slate-900 text-base">
              Video Pembelajaran: Konsep Pengurutan (Sorting) dalam Informatika
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

        <div className="w-full aspect-video rounded-xl overflow-hidden bg-slate-900 border border-slate-200 shadow-md">
          <iframe
            src={teacherConfig.searchingVideoUrl}
            title="Video Pembelajaran Sorting Informatika Kelas X"
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
      </div>

      {/* Real-World Contextual Examples for Sorting */}
      <div className="bg-gradient-to-br from-slate-50 to-amber-50/50 rounded-2xl p-6 border border-slate-200">
        <h3 className="font-bold text-slate-900 text-base mb-3 flex items-center gap-2">
          <i className="fa-solid fa-school-flag text-amber-600"></i>
          Contoh Kontekstual Kehidupan Nyata
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs md:text-sm">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center font-bold mb-2">
              <i className="fa-solid fa-people-arrows"></i>
            </div>
            <h4 className="font-bold text-slate-900 mb-1">Berbaris Berdasarkan Tinggi Badan Saat Upacara</h4>
            <p className="text-slate-600 text-xs leading-relaxed">
              Saat upacara hari Senin di SMA Negeri 1 Tenggarong Seberang, ketua barisan meminta siswa yang bertubuh lebih pendek berpindah ke depan dan yang lebih tinggi ke belakang. Pertukaran dua teman yang berdiri berdampingan adalah implementasi konkret dari <strong>Bubble Sort</strong>!
            </p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold mb-2">
              <i className="fa-solid fa-file-invoice"></i>
            </div>
            <h4 className="font-bold text-slate-900 mb-1">Mengurutkan Lembar Jawaban Ujian Berdasarkan Nilai</h4>
            <p className="text-slate-600 text-xs leading-relaxed">
              Guru Yunyta Kartika memeriksa 36 lembar tugas informatika, lalu menyisipkan lembaran nilai siswa satu demi satu ke tumpukan sesuai urutan nomor absen atau peringkat nilai tertinggi ke terendah. Ini adalah analogi langsung dari <strong>Insertion Sort</strong>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
