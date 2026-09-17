import React, { useState } from 'react';
import { SLIDES_DATA, SlideData } from '../../data/learningData';
import { TeacherConfig } from '../../types';

interface PresentationTabProps {
  teacherConfig: TeacherConfig;
}

export const PresentationTab: React.FC<PresentationTabProps> = ({ teacherConfig }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [viewMode, setViewMode] = useState<'interactive_slide' | 'embed_ppt'>('interactive_slide');
  const [isNotesExpanded, setIsNotesExpanded] = useState(false);

  const currentSlide: SlideData = SLIDES_DATA[currentSlideIndex];

  const handleNext = () => {
    if (currentSlideIndex < SLIDES_DATA.length - 1) {
      setCurrentSlideIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="space-y-6">
      {/* Tab Header & Control Bar */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold mb-1.5 border border-indigo-100">
            <i className="fa-solid fa-file-powerpoint text-indigo-600"></i>
            <span>TAB 1: PRESENTATION & SLIDE MATERI UMUM</span>
          </div>
          <h2 className="text-lg md:text-xl font-bold text-slate-900">
            Slide Pembelajaran: Berpikir Komputasional & Struktur Data
          </h2>
          <p className="text-xs md:text-sm text-slate-500 mt-0.5">
            Pelajari 4 Pilar Computational Thinking serta pengenalan mendasar Searching, Sorting, Stack, dan Queue.
          </p>
        </div>

        {/* Mode Switcher */}
        <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl shrink-0">
          <button
            onClick={() => setViewMode('interactive_slide')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 ${
              viewMode === 'interactive_slide'
                ? 'bg-white text-indigo-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <i className="fa-solid fa-desktop"></i>
            Slide Interaktif
          </button>
          <button
            onClick={() => setViewMode('embed_ppt')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 ${
              viewMode === 'embed_ppt'
                ? 'bg-white text-indigo-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <i className="fa-solid fa-up-right-from-square"></i>
            Embed Google Slides / PPT
          </button>
        </div>
      </div>

      {viewMode === 'interactive_slide' ? (
        <div className="space-y-4">
          {/* Main Slide Card (Simulating PowerPoint Screen) */}
          <div className="bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white rounded-2xl border border-slate-700 shadow-xl overflow-hidden relative">
            {/* Top Slide Meta Bar */}
            <div className="px-6 py-3 bg-black/40 border-b border-white/10 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                <span className="ml-2 font-mono text-slate-400">
                  SLIDE_{currentSlide.id.toString().padStart(2, '0')}.PPTX
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-semibold border border-indigo-500/30 text-[11px]">
                  {currentSlide.badge}
                </span>
                <span className="text-slate-400 font-medium">
                  {currentSlideIndex + 1} / {SLIDES_DATA.length}
                </span>
              </div>
            </div>

            {/* Slide Body */}
            <div className="p-6 md:p-10 min-h-[380px] flex flex-col justify-between">
              <div>
                <span className="text-emerald-400 font-mono text-xs uppercase tracking-wider block mb-1">
                  {currentSlide.subtitle}
                </span>
                <h3 className="text-xl md:text-3xl font-extrabold text-white tracking-tight leading-snug">
                  {currentSlide.title}
                </h3>
                <p className="mt-3 text-slate-300 text-xs md:text-sm leading-relaxed max-w-4xl">
                  {currentSlide.description}
                </p>

                {/* 4 Pillars / Concept Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 mt-6">
                  {currentSlide.keyPoints.map((pt, idx) => (
                    <div
                      key={idx}
                      className="bg-white/5 hover:bg-white/10 p-4 rounded-xl border border-white/10 transition backdrop-blur-xs flex flex-col justify-between"
                    >
                      <div>
                        <div className="w-9 h-9 rounded-lg bg-indigo-500/20 text-indigo-300 flex items-center justify-center text-sm mb-3 border border-indigo-500/30">
                          <i className={`fa-solid ${pt.icon}`}></i>
                        </div>
                        <h4 className="font-bold text-sm text-white mb-1.5">{pt.title}</h4>
                        <p className="text-xs text-slate-300 leading-relaxed">{pt.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Key Takeaway Callout */}
              <div className="mt-8 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <i className="fa-solid fa-lightbulb text-amber-400 text-sm shrink-0"></i>
                  <span><strong>Kesimpulan Utama:</strong> {currentSlide.summary}</span>
                </div>
                <span className="text-slate-400 text-[11px] shrink-0 font-medium">
                  Pengampu: {teacherConfig.teacherName} • SMA Negeri 1 Tenggarong Seberang
                </span>
              </div>
            </div>

            {/* Slide Navigation Controls */}
            <div className="px-6 py-3 bg-slate-900/90 border-t border-slate-700 flex items-center justify-between">
              <button
                onClick={handlePrev}
                disabled={currentSlideIndex === 0}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition flex items-center gap-2 cursor-pointer text-white"
              >
                <i className="fa-solid fa-chevron-left"></i>
                Slide Sebelumnya
              </button>

              {/* Slide Indicator Dots */}
              <div className="flex items-center gap-2">
                {SLIDES_DATA.map((s, idx) => (
                  <button
                    key={s.id}
                    onClick={() => setCurrentSlideIndex(idx)}
                    aria-label={`Slide ${idx + 1}`}
                    className={`h-2.5 rounded-full transition-all cursor-pointer ${
                      currentSlideIndex === idx
                        ? 'w-8 bg-indigo-500'
                        : 'w-2.5 bg-slate-600 hover:bg-slate-500'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={handleNext}
                disabled={currentSlideIndex === SLIDES_DATA.length - 1}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 disabled:opacity-30 disabled:cursor-not-allowed transition flex items-center gap-2 cursor-pointer text-white"
              >
                Slide Berikutnya
                <i className="fa-solid fa-chevron-right"></i>
              </button>
            </div>
          </div>

          {/* Quick Learning Notes Accordion */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
            <button
              onClick={() => setIsNotesExpanded(!isNotesExpanded)}
              className="w-full flex items-center justify-between text-left cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-book-open-reader text-indigo-600"></i>
                <span className="text-xs md:text-sm font-bold text-slate-800">
                  Rangkuman Catatan Konsep Penting Guru (Fase E)
                </span>
              </div>
              <i className={`fa-solid fa-chevron-down text-xs text-slate-400 transition-transform ${isNotesExpanded ? 'rotate-180' : ''}`}></i>
            </button>

            {isNotesExpanded && (
              <div className="mt-4 pt-3 border-t border-slate-100 text-xs md:text-sm text-slate-600 space-y-2 leading-relaxed">
                <p>
                  <strong>1. Berpikir Komputasional</strong> melatih siswa tidak hanya menjadi konsumen teknologi, tetapi mampu memformulasi persoalan agar dapat diselesaikan dengan bantuan alat komputasi.
                </p>
                <p>
                  <strong>2. Searching</strong> mencari data target. <em>Linear search</em> memeriksa berurutan, <em>binary search</em> membagi data yang terurut.
                </p>
                <p>
                  <strong>3. Sorting</strong> menata keteraturan data (Bubble, Selection, Insertion, Quick, Merge Sort).
                </p>
                <p>
                  <strong>4. Stack (Tumpukan)</strong> mematuhi <em>LIFO</em> (terakhir masuk, pertama keluar). Cocok untuk riwayat Undo.
                </p>
                <p>
                  <strong>5. Queue (Antrean)</strong> mematuhi <em>FIFO</em> (pertama masuk, pertama keluar). Cocok untuk penjadwalan antrean printer/pelayanan.
                </p>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Embed PowerPoint / Google Slides */
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800">
            <div className="flex items-center gap-2">
              <i className="fa-solid fa-circle-info text-amber-600 text-sm"></i>
              <span>
                Menampilkan Google Slides / PowerPoint Online yang tersemat (Embed). Guru dapat menempelkan URL iframe presentasinya sendiri.
              </span>
            </div>
            <a
              href={teacherConfig.embedPptUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold underline text-amber-900 shrink-0"
            >
              Buka di Tab Baru <i className="fa-solid fa-arrow-up-right-from-square text-[10px]"></i>
            </a>
          </div>

          <div className="w-full h-[520px] rounded-xl border border-slate-300 overflow-hidden bg-slate-900 relative">
            <iframe
              src={teacherConfig.embedPptUrl}
              title="Google Slides Presentation"
              className="w-full h-full border-0"
              allowFullScreen
            >
              Memuat presentasi slide...
            </iframe>
          </div>

          <p className="text-[11px] text-slate-500 italic">
            *Catatan: Jika slide di atas memerlukan izin akses organisasi belajar.id, siswa disarankan login akun Google Workspace for Education masing-masing.
          </p>
        </div>
      )}
    </div>
  );
};
