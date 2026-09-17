import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { QUIZ_QUESTIONS } from '../../data/learningData';
import { StudentReflection, TeacherConfig, ClassGrade } from '../../types';

interface FunActivityTabProps {
  teacherConfig: TeacherConfig;
  studentName?: string;
  studentClass?: ClassGrade;
}

export const FunActivityTab: React.FC<FunActivityTabProps> = ({
  teacherConfig,
  studentName = '',
  studentClass = 'X1',
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'sorting_game' | 'quiz' | 'reflection'>('sorting_game');

  // --- GAME 1: SORTING CHALLENGE STATE ---
  const [gameCards, setGameCards] = useState<number[]>([42, 15, 88, 23, 67, 9]);
  const [selectedCardIdx, setSelectedCardIdx] = useState<number | null>(null);
  const [moveCount, setMoveCount] = useState<number>(0);
  const [isGameWon, setIsGameWon] = useState<boolean>(false);

  const isArraySorted = (arr: number[]) => {
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] > arr[i + 1]) return false;
    }
    return true;
  };

  const handleCardClick = (idx: number) => {
    if (isGameWon) return;

    if (selectedCardIdx === null) {
      setSelectedCardIdx(idx);
    } else if (selectedCardIdx === idx) {
      setSelectedCardIdx(null);
    } else {
      // Swap the two cards
      const newCards = [...gameCards];
      const temp = newCards[selectedCardIdx];
      newCards[selectedCardIdx] = newCards[idx];
      newCards[idx] = temp;

      const newMoves = moveCount + 1;
      setGameCards(newCards);
      setMoveCount(newMoves);
      setSelectedCardIdx(null);

      if (isArraySorted(newCards)) {
        setIsGameWon(true);
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
      }
    }
  };

  const resetSortingGame = () => {
    const freshCards = [42, 15, 88, 23, 67, 9].sort(() => Math.random() - 0.5);
    setGameCards(freshCards);
    setSelectedCardIdx(null);
    setMoveCount(0);
    setIsGameWon(false);
  };

  // --- GAME 2: QUIZ STATE ---
  const [currentQuizIdx, setCurrentQuizIdx] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [userScore, setUserScore] = useState<number>(0);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);

  const currentQ = QUIZ_QUESTIONS[currentQuizIdx];

  const handleSelectOption = (idx: number) => {
    if (isSubmitted) return;
    setSelectedOption(idx);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null) return;
    setIsSubmitted(true);
    if (selectedOption === currentQ.correctIndex) {
      setUserScore((prev) => prev + 20);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuizIdx < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuizIdx((prev) => prev + 1);
      setSelectedOption(null);
      setIsSubmitted(false);
    } else {
      setQuizFinished(true);
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
      });
    }
  };

  const restartQuiz = () => {
    setCurrentQuizIdx(0);
    setSelectedOption(null);
    setIsSubmitted(false);
    setUserScore(0);
    setQuizFinished(false);
  };

  // --- TAB 6.3: REFLECTION FORM STATE ---
  const [refStudentName, setRefStudentName] = useState(studentName);
  const [refClass, setRefClass] = useState<ClassGrade>(studentClass);
  const [emotion, setEmotion] = useState<'sangat_paham' | 'senang' | 'cukup' | 'bingung'>('senang');
  const [favTopic, setFavTopic] = useState<string>('Searching & Sorting');
  const [challengingTopic, setChallengingTopic] = useState<string>('Binary Search Mid Calculations');
  const [reflectionNotes, setReflectionNotes] = useState<string>('');
  const [savedReflection, setSavedReflection] = useState<StudentReflection | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  const handleSaveReflection = (e: React.FormEvent) => {
    e.preventDefault();
    const newRef: StudentReflection = {
      id: 'ref_' + Date.now(),
      studentName: refStudentName || 'Siswa SMAN 1 Tenggarong Seberang',
      classGrade: refClass,
      emotion,
      favTopic,
      challengingTopic,
      reflectionNotes,
      submittedAt: new Date().toLocaleString('id-ID', { dateStyle: 'full', timeStyle: 'short' }),
    };
    setSavedReflection(newRef);
    confetti({
      particleCount: 60,
      spread: 60,
      origin: { y: 0.7 },
    });
  };

  const handleCopySlip = () => {
    if (!savedReflection) return;
    const text = `=== BUKTI REFLEKSI PEMBELAJARAN INFORMATIKA FASE E ===\n` +
      `Sekolah: ${teacherConfig.school}\n` +
      `Guru Pengampu: ${teacherConfig.teacherName}\n` +
      `Nama Siswa: ${savedReflection.studentName} (${savedReflection.classGrade})\n` +
      `Perasaan Belajar: ${savedReflection.emotion.toUpperCase()}\n` +
      `Materi Paling Dipahami: ${savedReflection.favTopic}\n` +
      `Materi Paling Menantang: ${savedReflection.challengingTopic}\n` +
      `Catatan Refleksi Diri: "${savedReflection.reflectionNotes}"\n` +
      `Waktu Pengisian: ${savedReflection.submittedAt}\n` +
      `==================================================`;
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Title & Badge */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-semibold mb-1.5 border border-rose-200">
            <i className="fa-solid fa-gamepad text-rose-600"></i>
            <span>TAB 6: FUN ACTIVITY & REFLEKSI DIRI</span>
          </div>
          <h2 className="text-lg md:text-xl font-bold text-slate-900">
            Aktivitas Interaktif & Refleksi Pembelajaran Bermakna
          </h2>
          <p className="text-xs md:text-sm text-slate-500 mt-0.5">
            Uji pemahamanmu dengan permainan pengurutan angka, kuis mini studi kasus, dan lembar refleksi mandiri.
          </p>
        </div>

        {/* Sub-tab pills */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-xs">
          <button
            onClick={() => setActiveSubTab('sorting_game')}
            className={`px-3 py-1.5 rounded-lg font-bold transition cursor-pointer flex items-center gap-1.5 ${
              activeSubTab === 'sorting_game' ? 'bg-white text-rose-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <i className="fa-solid fa-arrow-down-1-9"></i>
            Game Sorting
          </button>
          <button
            onClick={() => setActiveSubTab('quiz')}
            className={`px-3 py-1.5 rounded-lg font-bold transition cursor-pointer flex items-center gap-1.5 ${
              activeSubTab === 'quiz' ? 'bg-white text-rose-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <i className="fa-solid fa-circle-question"></i>
            Kuis Mini
          </button>
          <button
            onClick={() => setActiveSubTab('reflection')}
            className={`px-3 py-1.5 rounded-lg font-bold transition cursor-pointer flex items-center gap-1.5 ${
              activeSubTab === 'reflection' ? 'bg-white text-rose-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <i className="fa-solid fa-heart-pulse"></i>
            Refleksi Siswa
          </button>
        </div>
      </div>

      {/* 1. SORTING CHALLENGE MINI-GAME */}
      {activeSubTab === 'sorting_game' && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
            <div>
              <span className="text-xs font-bold text-rose-600 uppercase tracking-wider block">
                MINI-GAME 1
              </span>
              <h3 className="text-base font-bold text-slate-900">
                Tantangan Pengurutan Angka (Interactive Sorting Challenge)
              </h3>
              <p className="text-xs text-slate-500">
                Klik kartu pertama lalu klik kartu kedua untuk menukar posisinya! Urutkan dari angka <strong>terkecil ke terbesar (Ascending)</strong> dengan jumlah langkah sesedikit mungkin.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="px-3 py-1.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold">
                Langkah (Swaps): <strong className="text-base font-bold">{moveCount}</strong>
              </div>
              <button
                onClick={resetSortingGame}
                className="px-3 py-1.5 rounded-lg border border-slate-300 hover:bg-slate-50 text-xs font-semibold text-slate-700 transition cursor-pointer"
              >
                <i className="fa-solid fa-rotate mr-1"></i> Acak Ulang
              </button>
            </div>
          </div>

          {/* Cards Display */}
          <div className="py-6 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            {gameCards.map((num, idx) => {
              const isSelected = selectedCardIdx === idx;
              return (
                <button
                  key={idx}
                  onClick={() => handleCardClick(idx)}
                  className={`w-16 h-24 sm:w-20 sm:h-28 rounded-2xl border-2 flex flex-col items-center justify-between p-3 transition-all duration-200 cursor-pointer shadow-md ${
                    isGameWon
                      ? 'bg-emerald-500 border-emerald-600 text-white shadow-emerald-500/30'
                      : isSelected
                      ? 'bg-amber-400 border-amber-500 text-slate-900 ring-4 ring-amber-300 scale-110 -translate-y-2'
                      : 'bg-white border-slate-300 hover:border-indigo-400 hover:bg-indigo-50 text-slate-800'
                  }`}
                >
                  <span className="text-[10px] font-mono opacity-60">#{idx + 1}</span>
                  <span className="text-2xl sm:text-3xl font-extrabold font-mono tracking-tight">
                    {num}
                  </span>
                  <span className="text-[10px] font-bold">
                    {isSelected ? 'DIPILIH' : isGameWon ? 'TERURUT' : 'KLIK'}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Winning Banner */}
          {isGameWon ? (
            <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-xl text-center space-y-2 animate-in zoom-in-95 duration-300">
              <div className="text-3xl">🎉 ⭐⭐⭐</div>
              <h4 className="font-bold text-emerald-900 text-base">
                Selamat! Kamu Berhasil Mengurutkan Seluruh Data!
              </h4>
              <p className="text-xs text-emerald-800">
                Kamu menyelesaikan tantangan pengurutan ini dalam <strong>{moveCount} langkah pertukaran</strong>.
                Kamu telah mempraktikkan cara kerja dasar algoritma sorting secara mandiri!
              </p>
              <button
                onClick={resetSortingGame}
                className="mt-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition cursor-pointer"
              >
                Mainkan Lagi dengan Angka Acak
              </button>
            </div>
          ) : (
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600 flex items-center justify-center gap-2">
              <i className="fa-solid fa-lightbulb text-amber-500"></i>
              <span>
                Tips: Pilih angka terbesar dan geser ke arah paling kanan, atau cari angka terkecil (9) dan pindahkan ke kartu pertama!
              </span>
            </div>
          )}
        </div>
      )}

      {/* 2. MINI QUIZ INTERAKTIF */}
      {activeSubTab === 'quiz' && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
            <div>
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider block">
                MINI-GAME 2
              </span>
              <h3 className="text-base font-bold text-slate-900">
                Kuis Evaluasi Cepat: Berpikir Komputasional & Struktur Data
              </h3>
              <p className="text-xs text-slate-500">
                5 Pertanyaan studi kasus Kurikulum Merdeka untuk menguji penguasaan konsepmu.
              </p>
            </div>

            <div className="flex items-center gap-3 text-xs font-semibold">
              <span className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700">
                Soal {currentQuizIdx + 1} dari {QUIZ_QUESTIONS.length}
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-700 font-bold border border-indigo-200">
                Skor Saat Ini: {userScore}
              </span>
            </div>
          </div>

          {!quizFinished ? (
            <div className="space-y-4">
              {/* Question Header */}
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-md bg-indigo-100 text-indigo-800 text-[11px] font-bold">
                  Topik: {currentQ.topic}
                </span>
              </div>

              <h4 className="text-sm md:text-base font-bold text-slate-900 leading-relaxed">
                {currentQ.question}
              </h4>

              {/* Options */}
              <div className="space-y-2 pt-2">
                {currentQ.options.map((opt, optIdx) => {
                  const isOptSelected = selectedOption === optIdx;
                  let optStyle = 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50';

                  if (isSubmitted) {
                    if (optIdx === currentQ.correctIndex) {
                      optStyle = 'bg-emerald-50 border-emerald-500 text-emerald-900 font-semibold ring-2 ring-emerald-300';
                    } else if (isOptSelected && optIdx !== currentQ.correctIndex) {
                      optStyle = 'bg-rose-50 border-rose-400 text-rose-900 font-semibold';
                    } else {
                      optStyle = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
                    }
                  } else if (isOptSelected) {
                    optStyle = 'bg-indigo-50 border-indigo-500 text-indigo-900 font-semibold ring-2 ring-indigo-200';
                  }

                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelectOption(optIdx)}
                      disabled={isSubmitted}
                      className={`w-full text-left p-3.5 rounded-xl border transition cursor-pointer flex items-start gap-3 ${optStyle}`}
                    >
                      <span className="w-6 h-6 rounded-md bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                        {String.fromCharCode(65 + optIdx)}
                      </span>
                      <span className="text-xs md:text-sm leading-relaxed">{opt}</span>
                    </button>
                  );
                })}
              </div>

              {/* Feedback and Explanation */}
              {isSubmitted && (
                <div
                  className={`p-4 rounded-xl border text-xs md:text-sm animate-in fade-in duration-200 ${
                    selectedOption === currentQ.correctIndex
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                      : 'bg-rose-50 border-rose-200 text-rose-900'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <i
                      className={`fa-solid ${
                        selectedOption === currentQ.correctIndex ? 'fa-circle-check text-emerald-600' : 'fa-circle-xmark text-rose-600'
                      } text-base mt-0.5 shrink-0`}
                    ></i>
                    <div>
                      <span className="font-bold block mb-1">
                        {selectedOption === currentQ.correctIndex ? 'Jawaban Kamu Tepat Sekali!' : 'Jawaban Kurang Tepat!'}
                      </span>
                      <p className="text-slate-700 leading-relaxed">{currentQ.explanation}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-2 pt-2">
                {!isSubmitted ? (
                  <button
                    onClick={handleSubmitAnswer}
                    disabled={selectedOption === null}
                    className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-bold rounded-xl transition cursor-pointer"
                  >
                    Kunci Jawaban
                  </button>
                ) : (
                  <button
                    onClick={handleNextQuestion}
                    className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>{currentQuizIdx < QUIZ_QUESTIONS.length - 1 ? 'Soal Berikutnya' : 'Lihat Hasil Akhir'}</span>
                    <i className="fa-solid fa-arrow-right"></i>
                  </button>
                )}
              </div>
            </div>
          ) : (
            /* Quiz Completed View */
            <div className="p-6 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-3xl mx-auto shadow-md">
                <i className="fa-solid fa-trophy"></i>
              </div>
              <h4 className="text-xl font-bold text-slate-900">
                Kuis Berpikir Komputasional Selesai!
              </h4>
              <div className="text-4xl font-extrabold text-indigo-600 font-mono">
                {userScore} / 100
              </div>
              <p className="text-xs md:text-sm text-slate-600 max-w-md mx-auto">
                {userScore >= 80
                  ? 'Luar biasa! Pemahamanmu terhadap materi Searching, Sorting, Stack, dan Queue sangat matang.'
                  : userScore >= 60
                  ? 'Bagus sekali! Kamu sudah memahami konsep dasar dengan baik, silakan pelajari kembali slide pada Tab 1.'
                  : 'Tetap semangat! Coba tonton ulang video pembelajaran pada masing-masing tab dan ulangi kuis ini.'}
              </p>
              <button
                onClick={restartQuiz}
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition cursor-pointer"
              >
                <i className="fa-solid fa-rotate-left mr-1.5"></i>
                Ulangi Kuis
              </button>
            </div>
          )}
        </div>
      )}

      {/* 3. REFLEKSI DIRI SISWA */}
      {activeSubTab === 'reflection' && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
          <div className="pb-4 border-b border-slate-200">
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider block">
              KURIKULUM MERDEKA • REFLEKSI PEMBELAJARAN
            </span>
            <h3 className="text-base font-bold text-slate-900">
              Lembar Refleksi Diri Siswa (Reflektif & Mandiri)
            </h3>
            <p className="text-xs text-slate-500">
              Refleksi membantu kamu menyadari sejauh mana pemahaman materi yang telah dicapai dan merencanakan tindak lanjut belajar.
            </p>
          </div>

          <form onSubmit={handleSaveReflection} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nama Lengkap Siswa
                </label>
                <input
                  type="text"
                  required
                  value={refStudentName}
                  onChange={(e) => setRefStudentName(e.target.value)}
                  placeholder="Nama lengkap kamu..."
                  className="w-full px-3 py-2 text-xs md:text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Kelas
                </label>
                <select
                  value={refClass}
                  onChange={(e) => setRefClass(e.target.value as ClassGrade)}
                  className="w-full px-3 py-2 text-xs md:text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-hidden bg-white"
                >
                  {(['X1', 'X2', 'X3', 'X4', 'X5', 'X6', 'X7'] as ClassGrade[]).map((c) => (
                    <option key={c} value={c}>
                      Kelas {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Perasaan Belajar */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2">
                Bagaimana perasaanmu setelah mempelajari materi ini?
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { key: 'sangat_paham', label: 'Sangat Paham & Semangat', emoji: '🤩', color: 'border-emerald-300 bg-emerald-50 text-emerald-800' },
                  { key: 'senang', label: 'Senang & Mengerti', emoji: '😊', color: 'border-sky-300 bg-sky-50 text-sky-800' },
                  { key: 'cukup', label: 'Cukup Paham', emoji: '😐', color: 'border-amber-300 bg-amber-50 text-amber-800' },
                  { key: 'bingung', label: 'Masih Butuh Bimbingan', emoji: '🤔', color: 'border-rose-300 bg-rose-50 text-rose-800' },
                ].map((item) => (
                  <button
                    type="button"
                    key={item.key}
                    onClick={() => setEmotion(item.key as any)}
                    className={`p-3 rounded-xl border text-center transition cursor-pointer ${
                      emotion === item.key
                        ? `${item.color} ring-2 ring-emerald-400 font-bold shadow-xs`
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span className="text-2xl block mb-1">{item.emoji}</span>
                    <span className="text-xs block leading-tight">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Materi paling dipahami */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Materi yang paling saya kuasai dan sukai:
                </label>
                <select
                  value={favTopic}
                  onChange={(e) => setFavTopic(e.target.value)}
                  className="w-full px-3 py-2 text-xs md:text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-hidden bg-white"
                >
                  <option value="4 Pilar Berpikir Komputasional">4 Pilar Berpikir Komputasional</option>
                  <option value="Searching (Linear & Binary Search)">Searching (Linear & Binary Search)</option>
                  <option value="Sorting (Bubble, Selection, Insertion)">Sorting (Bubble, Selection, Insertion)</option>
                  <option value="Stack (LIFO - Push, Pop, Peek)">Stack (LIFO - Push, Pop, Peek)</option>
                  <option value="Queue (FIFO - Enqueue, Dequeue)">Queue (FIFO - Enqueue, Dequeue)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Materi yang menurut saya masih paling menantang:
                </label>
                <select
                  value={challengingTopic}
                  onChange={(e) => setChallengingTopic(e.target.value)}
                  className="w-full px-3 py-2 text-xs md:text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-hidden bg-white"
                >
                  <option value="Perhitungan Indeks Tengah Binary Search">Perhitungan Indeks Tengah Binary Search</option>
                  <option value="Partisi & Pivot pada Quick Sort">Partisi & Pivot pada Quick Sort</option>
                  <option value="Penyisipan elemen pada Insertion Sort">Penyisipan elemen pada Insertion Sort</option>
                  <option value="Kondisi Overflow & Underflow pada Stack">Kondisi Overflow & Underflow pada Stack</option>
                  <option value="Manajemen Pointer Front & Rear pada Queue">Manajemen Pointer Front & Rear pada Queue</option>
                </select>
              </div>
            </div>

            {/* Catatan Refleksi Diri */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Catatan Rencana Belajar / Masukan untuk Ibu Guru Yunyta Kartika:
              </label>
              <textarea
                value={reflectionNotes}
                onChange={(e) => setReflectionNotes(e.target.value)}
                placeholder="Tuliskan hal menarik yang kamu temukan hari ini atau rencana belajarmu selanjutnya..."
                rows={3}
                className="w-full px-3 py-2 text-xs md:text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-hidden resize-none"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="submit"
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition flex items-center gap-2 cursor-pointer shadow-sm shadow-emerald-600/20"
              >
                <i className="fa-solid fa-floppy-disk"></i>
                Simpan Lembar Refleksi
              </button>
            </div>
          </form>

          {/* Saved Slip Card */}
          {savedReflection && (
            <div className="mt-6 p-5 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-800 flex items-center gap-1.5">
                  <i className="fa-solid fa-certificate text-emerald-600"></i>
                  Kartu Bukti Refleksi Pembelajaran Berhasil Dibuat
                </span>
                <span className="text-[11px] text-slate-500">
                  {savedReflection.submittedAt}
                </span>
              </div>

              <div className="bg-white p-4 rounded-xl border border-emerald-100 text-xs space-y-1.5 text-slate-700 font-mono">
                <p><strong>Nama:</strong> {savedReflection.studentName} ({savedReflection.classGrade})</p>
                <p><strong>Perasaan:</strong> {savedReflection.emotion.toUpperCase()}</p>
                <p><strong>Materi Dikuasai:</strong> {savedReflection.favTopic}</p>
                <p><strong>Materi Menantang:</strong> {savedReflection.challengingTopic}</p>
                {savedReflection.reflectionNotes && (
                  <p><strong>Catatan Siswa:</strong> "{savedReflection.reflectionNotes}"</p>
                )}
              </div>

              <div className="flex items-center justify-end gap-2">
                <button
                  onClick={handleCopySlip}
                  className="px-3.5 py-1.5 bg-white border border-emerald-300 hover:bg-emerald-100 text-emerald-800 text-xs font-semibold rounded-lg transition flex items-center gap-1.5 cursor-pointer"
                >
                  <i className={`fa-solid ${isCopied ? 'fa-check text-emerald-600' : 'fa-copy'}`}></i>
                  {isCopied ? 'Tersalin ke Clipboard!' : 'Salin Bukti Teks'}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
