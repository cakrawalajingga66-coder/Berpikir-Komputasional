import React, { useState } from 'react';
import { TeacherConfig } from '../../types';

interface QueueTabProps {
  teacherConfig: TeacherConfig;
}

interface CustomerQueue {
  id: string;
  name: string;
  ticketNo: string;
  color: string;
  border: string;
  textColor: string;
  avatar: string;
  arrivedAt: string;
}

export const QueueTab: React.FC<QueueTabProps> = ({ teacherConfig }) => {
  const MAX_CAPACITY = 6;
  const [queue, setQueue] = useState<CustomerQueue[]>([
    { id: 'q1', name: 'Andi Pratama', ticketNo: 'A-01', color: 'bg-emerald-50', border: 'border-emerald-400', textColor: 'text-emerald-900', avatar: 'fa-user-graduate', arrivedAt: '08:30' },
    { id: 'q2', name: 'Siti Rahma', ticketNo: 'A-02', color: 'bg-teal-50', border: 'border-teal-400', textColor: 'text-teal-900', avatar: 'fa-user-nurse', arrivedAt: '08:32' },
    { id: 'q3', name: 'Budi Santoso', ticketNo: 'A-03', color: 'bg-sky-50', border: 'border-sky-400', textColor: 'text-sky-900', avatar: 'fa-user-tie', arrivedAt: '08:35' },
  ]);

  const [inputName, setInputName] = useState<string>('');
  const [ticketCounter, setTicketCounter] = useState<number>(4);
  const [servedHistory, setServedHistory] = useState<CustomerQueue[]>([]);
  const [logMessage, setLogMessage] = useState<string>('Antrean awal berisi 3 orang. Siswa "Andi Pratama (A-01)" berada di posisi FRONT paling depan.');
  const [alertType, setAlertType] = useState<'normal' | 'overflow' | 'underflow' | 'served'>('normal');

  // Enqueue = Insert at REAR
  const handleEnqueue = () => {
    if (queue.length >= MAX_CAPACITY) {
      setAlertType('overflow');
      setLogMessage(`⚠️ QUEUE OVERFLOW! Ruang antrean telah penuh (${MAX_CAPACITY} orang). Siswa baru harus menunggu di luar.`);
      return;
    }

    const defaultNames = ['Citra Lestari', 'Dedi Kurniawan', 'Fajar Ramadhan', 'Gita Ayu', 'Hendra Wijaya', 'Indah Permata'];
    const name = inputName.trim() || defaultNames[(ticketCounter - 1) % defaultNames.length];
    const ticketNo = `A-${ticketCounter.toString().padStart(2, '0')}`;

    const colorPalettes = [
      { color: 'bg-indigo-50', border: 'border-indigo-400', textColor: 'text-indigo-900', avatar: 'fa-user-astronaut' },
      { color: 'bg-purple-50', border: 'border-purple-400', textColor: 'text-purple-900', avatar: 'fa-user-ninja' },
      { color: 'bg-amber-50', border: 'border-amber-400', textColor: 'text-amber-900', avatar: 'fa-user-doctor' },
      { color: 'bg-pink-50', border: 'border-pink-400', textColor: 'text-pink-900', avatar: 'fa-user-secret' },
    ];
    const palette = colorPalettes[queue.length % colorPalettes.length];

    const newCustomer: CustomerQueue = {
      id: 'cust_' + Date.now(),
      name,
      ticketNo,
      color: palette.color,
      border: palette.border,
      textColor: palette.textColor,
      avatar: palette.avatar,
      arrivedAt: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    };

    setQueue((prev) => [...prev, newCustomer]);
    setTicketCounter((prev) => prev + 1);
    setInputName('');
    setAlertType('normal');
    setLogMessage(`📥 ENQUEUE BERHASIL: "${name} (${ticketNo})" baru saja bergabung di ujung antrean (REAR). Jumlah antrean: ${queue.length + 1}.`);
  };

  // Dequeue = Remove from FRONT
  const handleDequeue = () => {
    if (queue.length === 0) {
      setAlertType('underflow');
      setLogMessage(`⚠️ QUEUE UNDERFLOW! Antrean kosong melompong (Empty). Petugas loket menunggu siswa baru.`);
      return;
    }

    const served = queue[0];
    setQueue((prev) => prev.slice(1));
    setServedHistory((prev) => [served, ...prev.slice(0, 4)]);
    setAlertType('served');
    setLogMessage(`🛎️ DEQUEUE BERHASIL: Siswa terdepan (FRONT) "${served.name} (${served.ticketNo})" selesai dilayani di loket dan meninggalkan antrean (FIFO).`);
  };

  const handleResetQueue = () => {
    setQueue([]);
    setServedHistory([]);
    setAlertType('normal');
    setLogMessage(`🧹 Seluruh antrean berhasil direset. Antrean kosong.`);
  };

  return (
    <div className="space-y-6">
      {/* Title & Badge */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-700 text-xs font-semibold mb-1.5 border border-teal-200">
            <i className="fa-solid fa-people-line text-teal-600"></i>
            <span>TAB 5: QUEUE (STRUKTUR DATA ANTREAN)</span>
          </div>
          <h2 className="text-lg md:text-xl font-bold text-slate-900">
            Konsep FIFO (First In, First Out) & Operasi Enqueue, Dequeue
          </h2>
          <p className="text-xs md:text-sm text-slate-500 mt-0.5">
            Struktur data linear di mana elemen masuk melalui gerbang belakang (Rear) dan keluar melalui gerbang depan (Front).
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="px-3 py-1.5 rounded-lg bg-teal-100 text-teal-800 font-bold border border-teal-200">
            Prinsip: FIFO (Pertama Masuk, Pertama Keluar)
          </span>
        </div>
      </div>

      {/* Concept Key Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center gap-2 text-teal-700 font-bold text-sm mb-1.5">
            <i className="fa-solid fa-right-to-bracket text-base"></i>
            <span>1. Operasi ENQUEUE</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Menambahkan data atau orang baru ke bagian paling belakang antrean (<strong>REAR</strong> / Tail). Elemen yang baru datang harus mengantre dengan tertib.
          </p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm mb-1.5">
            <i className="fa-solid fa-bell-concierge text-base"></i>
            <span>2. Operasi DEQUEUE</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Mengeluarkan dan melayani elemen yang berada paling depan (<strong>FRONT</strong> / Head). Elemen yang datang lebih awal selalu dilayani lebih dulu.
          </p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center gap-2 text-indigo-700 font-bold text-sm mb-1.5">
            <i className="fa-solid fa-arrows-left-right text-base"></i>
            <span>3. Pointer FRONT & REAR</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Berbeda dengan Stack yang hanya punya 1 ujung (TOP), Queue memiliki 2 ujung terpisah: FRONT (titik pelayanan) dan REAR (titik kedatangan).
          </p>
        </div>
      </div>

      {/* Interactive Horizontal Queue Simulation */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <i className="fa-solid fa-cash-register text-teal-600"></i>
              Simulasi Interaktif: Loket Pelayanan Administrasi Siswa SMAN 1
            </h3>
            <p className="text-xs text-slate-500">
              Lakukan ENQUEUE untuk menambah siswa baru dari pintu REAR, dan DEQUEUE untuk melayani siswa di loket FRONT.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <div className="px-3 py-1.5 bg-slate-100 rounded-lg text-slate-700 font-semibold border border-slate-200">
              Kapasitas: <strong className="text-teal-700 text-sm">{queue.length} / {MAX_CAPACITY}</strong>
            </div>
            <button
              onClick={handleResetQueue}
              className="px-2.5 py-1.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-600 rounded-lg font-medium transition cursor-pointer"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Input & Action Bar */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center bg-slate-50 p-4 rounded-xl border border-slate-200">
          <div className="md:col-span-5 flex items-center gap-2">
            <label className="text-xs font-bold text-slate-700 whitespace-nowrap">
              Nama Siswa:
            </label>
            <input
              type="text"
              value={inputName}
              onChange={(e) => setInputName(e.target.value)}
              placeholder="Contoh: Rina Anggraini"
              className="w-full px-3 py-1.5 text-xs md:text-sm bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-hidden"
            />
          </div>

          <div className="md:col-span-7 flex items-center justify-start md:justify-end gap-2.5">
            <button
              onClick={handleEnqueue}
              disabled={queue.length >= MAX_CAPACITY}
              className="px-4 py-2 bg-teal-600 hover:bg-teal-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-bold rounded-lg transition flex items-center gap-1.5 cursor-pointer shadow-sm shadow-teal-600/20"
            >
              <i className="fa-solid fa-user-plus"></i>
              ENQUEUE (Masuk Rear)
            </button>

            <button
              onClick={handleDequeue}
              disabled={queue.length === 0}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-bold rounded-lg transition flex items-center gap-1.5 cursor-pointer shadow-sm shadow-emerald-600/20"
            >
              <i className="fa-solid fa-bell"></i>
              DEQUEUE (Layani Front)
            </button>
          </div>
        </div>

        {/* Horizontal Service Station & Queue Lane */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-6 border border-slate-800 shadow-inner overflow-x-auto">
          <div className="min-w-[700px] flex items-center justify-between gap-4 py-4">
            {/* LOKET FRONT STATION (Exit Point) */}
            <div className="w-48 bg-emerald-950/80 border-2 border-emerald-500 rounded-xl p-3 text-center shrink-0 shadow-lg relative flex flex-col items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center text-lg mb-1 shadow-md animate-pulse">
                <i className="fa-solid fa-desktop"></i>
              </div>
              <span className="text-[11px] font-mono text-emerald-300 font-bold uppercase tracking-wider block">
                LOKET PELAYANAN
              </span>
              <span className="text-white text-xs font-bold mt-0.5">
                GERBANG KELUAR (FRONT)
              </span>

              {queue.length > 0 && (
                <div className="mt-2 px-2 py-0.5 bg-emerald-500 text-slate-900 font-bold text-[10px] rounded-full animate-bounce">
                  ← SEDANG DILAYANI
                </div>
              )}
            </div>

            {/* THE QUEUE TRACK / LINE */}
            <div className="flex-1 border-y-2 border-dashed border-slate-600 min-h-[120px] flex items-center gap-3 px-4 relative bg-slate-800/40 rounded-lg">
              {queue.length === 0 ? (
                <div className="w-full text-center text-slate-400 text-xs italic">
                  <i className="fa-solid fa-chair text-2xl block mb-1 opacity-50"></i>
                  Antrean Kosong (Empty Queue). Silakan tekan "ENQUEUE" untuk mendaftarkan siswa baru.
                </div>
              ) : (
                queue.map((cust, idx) => {
                  const isFront = idx === 0;
                  const isRear = idx === queue.length - 1;

                  return (
                    <div
                      key={cust.id}
                      className={`min-w-[130px] p-3 rounded-xl border-2 flex flex-col items-center text-center transition-all duration-300 relative shadow-md ${cust.color} ${cust.border} ${
                        isFront ? 'ring-2 ring-emerald-400 scale-105' : ''
                      }`}
                    >
                      {/* Pointer Tag */}
                      <div className="mb-1 flex items-center gap-1">
                        {isFront && (
                          <span className="px-1.5 py-0.2 bg-emerald-600 text-white text-[9px] font-mono font-extrabold rounded">
                            FRONT
                          </span>
                        )}
                        {isRear && (
                          <span className="px-1.5 py-0.2 bg-teal-600 text-white text-[9px] font-mono font-extrabold rounded">
                            REAR
                          </span>
                        )}
                      </div>

                      {/* Avatar */}
                      <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-slate-800 text-sm shadow-2xs mb-1">
                        <i className={`fa-solid ${cust.avatar}`}></i>
                      </div>

                      <span className={`font-bold text-xs truncate max-w-[110px] block ${cust.textColor}`}>
                        {cust.name}
                      </span>
                      <span className="text-[10px] font-mono font-extrabold text-slate-500 bg-white/80 px-1.5 rounded mt-0.5">
                        {cust.ticketNo}
                      </span>
                    </div>
                  );
                })
              )}
            </div>

            {/* REAR ENTRANCE GATE */}
            <div className="w-36 bg-slate-800 border-2 border-slate-600 rounded-xl p-3 text-center shrink-0 flex flex-col items-center justify-center">
              <div className="w-8 h-8 rounded-full bg-teal-500/20 text-teal-300 flex items-center justify-center text-sm mb-1">
                <i className="fa-solid fa-door-open"></i>
              </div>
              <span className="text-[10px] font-mono text-teal-300 font-bold uppercase tracking-wider block">
                PINTU MASUK
              </span>
              <span className="text-white text-xs font-bold">
                BELAKANG (REAR)
              </span>
            </div>
          </div>
        </div>

        {/* Live Interaction Log */}
        <div
          className={`p-4 rounded-xl border text-xs md:text-sm transition-all duration-300 ${
            alertType === 'overflow'
              ? 'bg-rose-50 border-rose-300 text-rose-800'
              : alertType === 'underflow'
              ? 'bg-amber-50 border-amber-300 text-amber-800'
              : alertType === 'served'
              ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
              : 'bg-slate-50 border-slate-200 text-slate-700'
          }`}
        >
          <div className="flex items-start gap-2.5">
            <i
              className={`fa-solid ${
                alertType === 'overflow' || alertType === 'underflow'
                  ? 'fa-triangle-exclamation text-base'
                  : alertType === 'served'
                  ? 'fa-circle-check text-base text-emerald-600'
                  : 'fa-circle-info text-base text-teal-600'
              } mt-0.5 shrink-0`}
            ></i>
            <div>
              <span className="font-bold block mb-0.5">Status Interaksi Queue:</span>
              <p className="leading-relaxed font-mono text-xs">{logMessage}</p>
            </div>
          </div>
        </div>

        {/* Recent Served History */}
        {servedHistory.length > 0 && (
          <div className="pt-2">
            <span className="text-xs font-bold text-slate-700 block mb-2">
              <i className="fa-solid fa-clock-rotate-left mr-1.5 text-teal-600"></i>
              Riwayat Siswa yang Selesai Dilayani (Recent Dequeued):
            </span>
            <div className="flex flex-wrap gap-2">
              {servedHistory.map((h) => (
                <div key={h.id} className="px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-1.5">
                  <i className="fa-solid fa-check text-emerald-600"></i>
                  <span>{h.name}</span>
                  <span className="font-mono font-bold bg-white px-1 rounded text-[10px]">{h.ticketNo}</span>
                </div>
              ))}
            </div>
          </div>
        )}
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
              Video Edukasi: Implementasi Struktur Data Antrean (Queue)
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
            title="Video Pembelajaran Queue Informatika Kelas X"
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
      </div>

      {/* Real-World Contextual Examples */}
      <div className="bg-gradient-to-br from-slate-50 to-teal-50/50 rounded-2xl p-6 border border-slate-200">
        <h3 className="font-bold text-slate-900 text-base mb-3 flex items-center gap-2">
          <i className="fa-solid fa-users-viewfinder text-teal-600"></i>
          Contoh Penerapan Kontekstual Queue dalam Kehidupan Nyata
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs md:text-sm">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
            <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center font-bold mb-2">
              <i className="fa-solid fa-ticket"></i>
            </div>
            <h4 className="font-bold text-slate-900 mb-1">Antrean Loket Tiket Bioskop / Bus</h4>
            <p className="text-slate-600 text-xs leading-relaxed">
              Siapapun yang datang paling pagi dan berdiri paling depan di depan loket (FRONT) akan membeli tiket pertama kali, sedangkan yang baru tiba harus berdiri di belakang (REAR). Sistem ini adil dan mematuhi <strong>FIFO</strong>.
            </p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold mb-2">
              <i className="fa-solid fa-print"></i>
            </div>
            <h4 className="font-bold text-slate-900 mb-1">Printer Spooling di Lab Komputer</h4>
            <p className="text-slate-600 text-xs leading-relaxed">
              Jika 10 siswa di kelas X mengirim tugas cetak ke satu printer lab secara serentak, sistem operasi komputer memasukkan tugas ke dalam <em>Print Queue</em>. Dokumen yang masuk pertama akan dicetak pertama kali.
            </p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold mb-2">
              <i className="fa-solid fa-cash-register"></i>
            </div>
            <h4 className="font-bold text-slate-900 mb-1">Antrean Kasir Swalayan</h4>
            <p className="text-slate-600 text-xs leading-relaxed">
              Di kasir supermarket, pembeli meletakkan belanjaan di ban berjalan sesuai urutan kedatangan. Kasir melayani troli pertama hingga tuntas sebelum beralih ke troli berikutnya.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
