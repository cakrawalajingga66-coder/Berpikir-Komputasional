import React, { useState } from 'react';
import { TeacherConfig } from '../../types';

interface StackTabProps {
  teacherConfig: TeacherConfig;
}

interface StackElement {
  id: string;
  title: string;
  color: string;
  border: string;
  textColor: string;
  icon: string;
  timestamp: string;
}

export const StackTab: React.FC<StackTabProps> = ({ teacherConfig }) => {
  const MAX_CAPACITY = 6;
  const [stack, setStack] = useState<StackElement[]>([
    { id: '1', title: 'Piring Biru (Dasar)', color: 'bg-blue-100', border: 'border-blue-400', textColor: 'text-blue-900', icon: 'fa-utensils', timestamp: '10:00' },
    { id: '2', title: 'Piring Hijau', color: 'bg-emerald-100', border: 'border-emerald-400', textColor: 'text-emerald-900', icon: 'fa-utensils', timestamp: '10:01' },
    { id: '3', title: 'Piring Kuning', color: 'bg-amber-100', border: 'border-amber-400', textColor: 'text-amber-900', icon: 'fa-utensils', timestamp: '10:02' },
  ]);

  const [inputVal, setInputVal] = useState<string>('');
  const [selectedTheme, setSelectedTheme] = useState<'piring' | 'buku' | 'undo'>('piring');
  const [logMessage, setLogMessage] = useState<string>('Tumpukan awal berisi 3 elemen. Piring Kuning adalah TOP saat ini.');
  const [peekedElement, setPeekedElement] = useState<StackElement | null>(null);
  const [alertType, setAlertType] = useState<'normal' | 'overflow' | 'underflow' | 'peek'>('normal');

  const themes = {
    piring: { label: 'Piring Kantin', icon: 'fa-utensils', defaultName: 'Piring Bersih' },
    buku: { label: 'Buku Informatika', icon: 'fa-book', defaultName: 'Modul Informatika' },
    undo: { label: 'Tindakan Undo', icon: 'fa-rotate-left', defaultName: 'Aksi Ketik Teks' },
  };

  const handlePush = () => {
    if (stack.length >= MAX_CAPACITY) {
      setAlertType('overflow');
      setLogMessage(`⚠️ STACK OVERFLOW! Tumpukan sudah mencapai kapasitas maksimum (${MAX_CAPACITY} elemen). Tidak bisa melakukan PUSH!`);
      return;
    }

    const currentTheme = themes[selectedTheme];
    const name = inputVal.trim() || `${currentTheme.defaultName} #${stack.length + 1}`;

    const colorPalettes = [
      { color: 'bg-rose-100', border: 'border-rose-400', textColor: 'text-rose-900' },
      { color: 'bg-indigo-100', border: 'border-indigo-400', textColor: 'text-indigo-900' },
      { color: 'bg-teal-100', border: 'border-teal-400', textColor: 'text-teal-900' },
      { color: 'bg-purple-100', border: 'border-purple-400', textColor: 'text-purple-900' },
      { color: 'bg-orange-100', border: 'border-orange-400', textColor: 'text-orange-900' },
    ];
    const chosenColor = colorPalettes[stack.length % colorPalettes.length];

    const newElem: StackElement = {
      id: 'stk_' + Date.now(),
      title: name,
      color: chosenColor.color,
      border: chosenColor.border,
      textColor: chosenColor.textColor,
      icon: currentTheme.icon,
      timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    };

    setStack((prev) => [...prev, newElem]);
    setInputVal('');
    setPeekedElement(null);
    setAlertType('normal');
    setLogMessage(`✅ PUSH BERHASIL: Menambahkan "${name}" ke puncak tumpukan (TOP). Ukuran stack sekarang: ${stack.length + 1}.`);
  };

  const handlePop = () => {
    if (stack.length === 0) {
      setAlertType('underflow');
      setLogMessage(`⚠️ STACK UNDERFLOW! Tumpukan kosong (Empty). Tidak ada elemen yang dapat di-POP!`);
      return;
    }

    const removed = stack[stack.length - 1];
    setStack((prev) => prev.slice(0, prev.length - 1));
    setPeekedElement(null);
    setAlertType('normal');
    setLogMessage(`📤 POP BERHASIL: Mengeluarkan "${removed.title}" dari posisi TOP (puncak). Elemen terakhir masuk adalah yang pertama keluar (LIFO).`);
  };

  const handlePeek = () => {
    if (stack.length === 0) {
      setAlertType('underflow');
      setLogMessage(`⚠️ Tumpukan kosong, tidak ada elemen untuk di-PEEK.`);
      return;
    }

    const topElem = stack[stack.length - 1];
    setPeekedElement(topElem);
    setAlertType('peek');
    setLogMessage(`👀 PEEK (Top): Elemen di puncak tumpukan saat ini adalah "${topElem.title}". Operasi Peek HANYA MELIHAT tanpa mengeluarkan data!`);
  };

  const handleClear = () => {
    setStack([]);
    setPeekedElement(null);
    setAlertType('normal');
    setLogMessage(`🧹 Stack berhasil dikosongkan (Clear). Ukuran stack: 0.`);
  };

  return (
    <div className="space-y-6">
      {/* Title & Badge */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-semibold mb-1.5 border border-purple-200">
            <i className="fa-solid fa-layer-group text-purple-600"></i>
            <span>TAB 4: STACK (STRUKTUR DATA TUMPUKAN)</span>
          </div>
          <h2 className="text-lg md:text-xl font-bold text-slate-900">
            Konsep LIFO (Last In, First Out) & Operasi Push, Pop, Peek
          </h2>
          <p className="text-xs md:text-sm text-slate-500 mt-0.5">
            Struktur data linear di mana penambahan dan pengambilan elemen hanya bisa dilakukan dari satu pintu saja: Puncak (TOP).
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="px-3 py-1.5 rounded-lg bg-purple-100 text-purple-800 font-bold border border-purple-200">
            Prinsip: LIFO (Terakhir Masuk, Pertama Keluar)
          </span>
        </div>
      </div>

      {/* Concept Key Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center gap-2 text-purple-700 font-bold text-sm mb-1.5">
            <i className="fa-solid fa-arrow-down-to-bracket text-base"></i>
            <span>1. Operasi PUSH</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Menambahkan elemen baru ke posisi paling atas tumpukan (TOP). Jika tumpukan telah mencapai batas kapasitas maksimum, akan terjadi kondisi <strong>Stack Overflow</strong>.
          </p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center gap-2 text-rose-700 font-bold text-sm mb-1.5">
            <i className="fa-solid fa-arrow-up-from-bracket text-base"></i>
            <span>2. Operasi POP</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Mengambil sekaligus menghapus elemen yang berada di puncak (TOP). Jika tumpukan kosong dan kita mencoba mengambil data, terjadi kondisi <strong>Stack Underflow</strong>.
          </p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center gap-2 text-indigo-700 font-bold text-sm mb-1.5">
            <i className="fa-solid fa-eye text-base"></i>
            <span>3. Operasi PEEK / TOP</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Melihat atau membaca nilai elemen yang sedang berada di puncak tumpukan (TOP) <em>tanpa menghapus</em> elemen tersebut dari tumpukan.
          </p>
        </div>
      </div>

      {/* Interactive Visual Stack Container Simulation */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <i className="fa-solid fa-vial text-purple-600"></i>
              Laboratorium Virtual Simulasi Stack Interaktif
            </h3>
            <p className="text-xs text-slate-500">
              Coba tambahkan (Push), keluarkan (Pop), dan intip (Peek) objek tumpukan di bawah ini.
            </p>
          </div>

          {/* Theme switcher */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-xs">
            {(['piring', 'buku', 'undo'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setSelectedTheme(t)}
                className={`px-3 py-1.5 rounded-lg font-semibold transition cursor-pointer flex items-center gap-1.5 ${
                  selectedTheme === t ? 'bg-purple-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <i className={`fa-solid ${themes[t].icon}`}></i>
                <span>{themes[t].label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Controls Column */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Nama Objek / Nilai Baru:
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                    placeholder={`Nama ${themes[selectedTheme].label} baru...`}
                    className="flex-1 px-3 py-2 text-xs md:text-sm bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-hidden"
                  />
                  <button
                    onClick={handlePush}
                    disabled={stack.length >= MAX_CAPACITY}
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-bold rounded-lg transition flex items-center gap-1.5 cursor-pointer shadow-sm shadow-purple-600/20"
                  >
                    <i className="fa-solid fa-arrow-down-to-bracket"></i>
                    PUSH
                  </button>
                </div>
              </div>

              {/* Action buttons */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={handlePop}
                  disabled={stack.length === 0}
                  className="px-3 py-2 bg-rose-600 hover:bg-rose-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-bold rounded-lg transition flex items-center justify-center gap-1.5 cursor-pointer shadow-sm shadow-rose-600/20"
                >
                  <i className="fa-solid fa-arrow-up-from-bracket"></i>
                  POP (Ambil Teratas)
                </button>

                <button
                  onClick={handlePeek}
                  disabled={stack.length === 0}
                  className="px-3 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-bold rounded-lg transition flex items-center justify-center gap-1.5 cursor-pointer shadow-sm shadow-indigo-600/20"
                >
                  <i className="fa-solid fa-eye"></i>
                  PEEK (Lihat Top)
                </button>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-200 text-xs">
                <span className="text-slate-500">
                  Kapasitas: <strong>{stack.length} / {MAX_CAPACITY}</strong>
                </span>
                <button
                  onClick={handleClear}
                  disabled={stack.length === 0}
                  className="text-slate-500 hover:text-rose-600 transition font-medium cursor-pointer"
                >
                  <i className="fa-solid fa-trash-can mr-1"></i> Kosongkan Stack
                </button>
              </div>
            </div>

            {/* Status Message Box */}
            <div
              className={`p-4 rounded-xl border text-xs md:text-sm transition-all duration-300 ${
                alertType === 'overflow'
                  ? 'bg-rose-50 border-rose-300 text-rose-800'
                  : alertType === 'underflow'
                  ? 'bg-amber-50 border-amber-300 text-amber-800'
                  : alertType === 'peek'
                  ? 'bg-indigo-50 border-indigo-300 text-indigo-800'
                  : 'bg-slate-50 border-slate-200 text-slate-700'
              }`}
            >
              <div className="flex items-start gap-2.5">
                <i
                  className={`fa-solid ${
                    alertType === 'overflow' || alertType === 'underflow'
                      ? 'fa-triangle-exclamation text-base'
                      : alertType === 'peek'
                      ? 'fa-eye text-base'
                      : 'fa-circle-info text-base text-purple-600'
                  } mt-0.5 shrink-0`}
                ></i>
                <div>
                  <span className="font-bold block mb-0.5">Status Interaksi:</span>
                  <p className="leading-relaxed font-mono text-xs">{logMessage}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Visual Stack Graphic Column (Vertical Cylinder Container) */}
          <div className="lg:col-span-7 flex flex-col items-center">
            <div className="w-full max-w-sm">
              {/* Top pointer arrow */}
              <div className="h-8 flex items-center justify-center text-xs font-mono font-bold text-purple-700">
                {stack.length > 0 && (
                  <span className="px-3 py-1 bg-purple-100 rounded-full border border-purple-200 animate-bounce">
                    <i className="fa-solid fa-arrow-down mr-1"></i>
                    TOP POINTER (Indeks {stack.length - 1})
                  </span>
                )}
              </div>

              {/* Vertical Chamber / Tube */}
              <div className="relative border-x-4 border-b-8 border-slate-700 bg-gradient-to-b from-slate-100 via-slate-50 to-slate-200 rounded-b-2xl p-4 min-h-[340px] flex flex-col-reverse justify-start gap-2 shadow-inner">
                {stack.length === 0 ? (
                  <div className="h-48 flex flex-col items-center justify-center text-slate-400 text-xs italic">
                    <i className="fa-solid fa-box-open text-4xl mb-2 opacity-40"></i>
                    Stack Kosong (Is Empty)
                  </div>
                ) : (
                  stack.map((item, idx) => {
                    const isTop = idx === stack.length - 1;
                    const isPeeked = peekedElement?.id === item.id;
                    return (
                      <div
                        key={item.id}
                        className={`w-full p-3 rounded-xl border-2 flex items-center justify-between shadow-sm transition-all duration-300 transform ${item.color} ${item.border} ${
                          isTop ? 'ring-2 ring-purple-500 scale-[1.02]' : ''
                        } ${isPeeked ? 'ring-4 ring-indigo-500 scale-105' : ''}`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="w-7 h-7 rounded-lg bg-white/80 flex items-center justify-center text-xs shadow-2xs font-bold text-slate-700">
                            <i className={`fa-solid ${item.icon}`}></i>
                          </span>
                          <div>
                            <span className={`font-bold text-xs md:text-sm block ${item.textColor}`}>
                              {item.title}
                            </span>
                            <span className="text-[10px] text-slate-500">
                              Waktu: {item.timestamp}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          {isTop && (
                            <span className="px-2 py-0.5 rounded-full bg-purple-600 text-white text-[10px] font-extrabold font-mono tracking-wide">
                              TOP
                            </span>
                          )}
                          <span className="text-[11px] font-mono font-bold text-slate-500">
                            [{idx}]
                          </span>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Base Label */}
              <div className="w-full text-center py-2 text-xs font-mono font-bold text-slate-600 bg-slate-300/60 rounded-b-xl border-t border-slate-400">
                DASAR TUMPUKAN (BOTTOM OF STACK)
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Pembelajaran YouTube Sesuai Request */}
      {/* https://youtu.be/f7uGriR93xw?si=WKGxr2RYFMZjf_OU */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-50 text-red-700 text-xs font-bold mb-1">
              <i className="fa-brands fa-youtube text-red-600"></i>
              Video Pembelajaran YouTube
            </div>
            <h3 className="font-bold text-slate-900 text-base">
              Video Pembelajaran: Struktur Data Stack & Queue
            </h3>
          </div>
          <a
            href="https://youtu.be/f7uGriR93xw"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-red-600 hover:text-red-700 font-semibold flex items-center gap-1.5 hover:underline"
          >
            Buka di YouTube <i className="fa-solid fa-arrow-up-right-from-square text-[10px]"></i>
          </a>
        </div>

        <div className="w-full aspect-video rounded-xl overflow-hidden bg-slate-900 border border-slate-200 shadow-md">
          <iframe
            src={teacherConfig.stackQueueVideoUrl}
            title="Video Pembelajaran Stack Informatika Kelas X"
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
      </div>

      {/* Real-World Contextual Examples */}
      <div className="bg-gradient-to-br from-slate-50 to-purple-50/50 rounded-2xl p-6 border border-slate-200">
        <h3 className="font-bold text-slate-900 text-base mb-3 flex items-center gap-2">
          <i className="fa-solid fa-shapes text-purple-600"></i>
          Contoh Penerapan Kontekstual Stack dalam Kehidupan Nyata
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs md:text-sm">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
            <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center font-bold mb-2">
              <i className="fa-solid fa-utensils"></i>
            </div>
            <h4 className="font-bold text-slate-900 mb-1">Tumpukan Piring di Kantin Sekolah</h4>
            <p className="text-slate-600 text-xs leading-relaxed">
              Petugas kantin menaruh piring bersih di atas tumpukan (Push). Siswa yang datang akan mengambil piring paling atas terlebih dahulu (Pop). Piring paling bawah baru akan terambil jika seluruh tumpukan di atasnya sudah habis.
            </p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
            <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold mb-2">
              <i className="fa-solid fa-rotate-left"></i>
            </div>
            <h4 className="font-bold text-slate-900 mb-1">Fitur Undo / Redo di Microsoft Word</h4>
            <p className="text-slate-600 text-xs leading-relaxed">
              Setiap ketikan kata disimpan ke dalam stack aktivitas. Saat menekan tombol Undo (Ctrl + Z), program mengambil aktivitas paling terakhir dilakukan dari puncak stack untuk dibatalkan.
            </p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
            <div className="w-8 h-8 rounded-lg bg-pink-100 text-pink-700 flex items-center justify-center font-bold mb-2">
              <i className="fa-solid fa-arrow-left"></i>
            </div>
            <h4 className="font-bold text-slate-900 mb-1">Tombol "Back" pada Web Browser</h4>
            <p className="text-slate-600 text-xs leading-relaxed">
              Ketika kamu mengunjungi halaman web A → B → C, URL disimpan dalam stack riwayat. Menekan tombol Back akan mengeluarkan C dan membawamu kembali ke B secara instan.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
