import React, { useState } from 'react';
import { AttendanceRecord, AttendanceStatus, ClassGrade, TeacherConfig } from '../types';

interface AttendanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentAttendance: AttendanceRecord | null;
  onSaveAttendance: (record: AttendanceRecord) => void;
  teacherConfig: TeacherConfig;
}

export const AttendanceModal: React.FC<AttendanceModalProps> = ({
  isOpen,
  onClose,
  currentAttendance,
  onSaveAttendance,
  teacherConfig,
}) => {
  const [activeMode, setActiveMode] = useState<'form' | 'google_form'>('form');
  const [fullName, setFullName] = useState(currentAttendance?.fullName || '');
  const [classGrade, setClassGrade] = useState<ClassGrade>(currentAttendance?.classGrade || 'X1');
  const [status, setStatus] = useState<AttendanceStatus>(currentAttendance?.status || 'Hadir');
  const [notes, setNotes] = useState(currentAttendance?.notes || '');
  const [isSuccessMessage, setIsSuccessMessage] = useState(false);

  if (!isOpen) return null;

  const classList: ClassGrade[] = ['X1', 'X2', 'X3', 'X4', 'X5', 'X6', 'X7'];

  const statusOptions: { label: AttendanceStatus; icon: string; color: string; activeColor: string }[] = [
    { label: 'Hadir', icon: 'fa-user-check', color: 'border-emerald-200 text-emerald-700 hover:bg-emerald-50', activeColor: 'bg-emerald-600 text-white border-emerald-600' },
    { label: 'Izin', icon: 'fa-file-lines', color: 'border-amber-200 text-amber-700 hover:bg-amber-50', activeColor: 'bg-amber-600 text-white border-amber-600' },
    { label: 'Sakit', icon: 'fa-notes-medical', color: 'border-rose-200 text-rose-700 hover:bg-rose-50', activeColor: 'bg-rose-600 text-white border-rose-600' },
    { label: 'Alpha', icon: 'fa-user-xmark', color: 'border-slate-200 text-slate-700 hover:bg-slate-50', activeColor: 'bg-slate-700 text-white border-slate-700' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) return;

    const newRecord: AttendanceRecord = {
      id: currentAttendance?.id || 'att_' + Date.now(),
      fullName: fullName.trim(),
      classGrade,
      status,
      notes: notes.trim(),
      timestamp: new Date().toLocaleString('id-ID', {
        dateStyle: 'full',
        timeStyle: 'medium',
      }),
    };

    onSaveAttendance(newRecord);
    setIsSuccessMessage(true);
    setTimeout(() => {
      setIsSuccessMessage(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-emerald-700 to-teal-700 px-6 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-emerald-200 text-lg">
              <i className="fa-solid fa-clipboard-check"></i>
            </div>
            <div>
              <h2 className="text-base md:text-lg font-bold">Presensi Kehadiran Siswa</h2>
              <p className="text-xs text-emerald-100">
                Informatika Kelas X • {teacherConfig.school}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition cursor-pointer"
            aria-label="Tutup Presensi"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        {/* View Switcher: Local Quick Form vs Google Form Embed */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-6 pt-3 gap-2">
          <button
            onClick={() => setActiveMode('form')}
            className={`pb-2.5 px-3 text-xs md:text-sm font-semibold border-b-2 transition cursor-pointer flex items-center gap-2 ${
              activeMode === 'form'
                ? 'border-emerald-600 text-emerald-700'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <i className="fa-solid fa-pen-to-square"></i>
            Formulir Presensi Daring
          </button>
          <button
            onClick={() => setActiveMode('google_form')}
            className={`pb-2.5 px-3 text-xs md:text-sm font-semibold border-b-2 transition cursor-pointer flex items-center gap-2 ${
              activeMode === 'google_form'
                ? 'border-emerald-600 text-emerald-700'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <i className="fa-brands fa-google"></i>
            Google Form Guru (Iframe)
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-5">
          {activeMode === 'form' ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Existing Status Alert if already submitted */}
              {currentAttendance && !isSuccessMessage && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-start gap-2.5">
                  <i className="fa-solid fa-circle-check text-emerald-600 mt-0.5 text-base shrink-0"></i>
                  <div>
                    <span className="font-semibold block">Presensi kamu telah tersimpan:</span>
                    <span>{currentAttendance.fullName} ({currentAttendance.classGrade}) - Status: <strong>{currentAttendance.status}</strong> pada {currentAttendance.timestamp}. Kamu bisa memperbarui data jika diperlukan.</span>
                  </div>
                </div>
              )}

              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nama Lengkap Siswa <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <i className="fa-solid fa-user text-xs"></i>
                  </span>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Contoh: Muhammad Rizky Pratama"
                    className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-hidden transition"
                  />
                </div>
              </div>

              {/* Class Selection: X1 - X7 */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Kelas (Pilihan X1 s.d X7) <span className="text-rose-500">*</span>
                </label>
                <div className="grid grid-cols-4 sm:grid-cols-7 gap-1.5">
                  {classList.map((cls) => (
                    <button
                      type="button"
                      key={cls}
                      onClick={() => setClassGrade(cls)}
                      className={`py-2 text-xs font-bold rounded-lg border transition cursor-pointer text-center ${
                        classGrade === cls
                          ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {cls}
                    </button>
                  ))}
                </div>
              </div>

              {/* Status Kehadiran: Hadir, Izin, Sakit, Alpha */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Status Kehadiran <span className="text-rose-500">*</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {statusOptions.map((opt) => {
                    const isSelected = status === opt.label;
                    return (
                      <button
                        type="button"
                        key={opt.label}
                        onClick={() => setStatus(opt.label)}
                        className={`flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl text-xs font-semibold border transition cursor-pointer ${
                          isSelected ? opt.activeColor : opt.color
                        }`}
                      >
                        <i className={`fa-solid ${opt.icon}`}></i>
                        <span>{opt.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Catatan / Keterangan */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Catatan / Keterangan (Opsional)
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Keterangan sakit/izin, atau kesiapan belajar Informatika hari ini..."
                  rows={2}
                  className="w-full px-3 py-2 text-xs md:text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-hidden transition resize-none"
                />
              </div>

              {/* Info Integrasi untuk Guru */}
              <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 text-[11px] text-slate-600 flex items-start gap-2">
                <i className="fa-solid fa-circle-info text-teal-600 mt-0.5 shrink-0"></i>
                <div>
                  <span className="font-semibold text-slate-800">Keterangan untuk Guru ({teacherConfig.teacherName}):</span>
                  <p className="mt-0.5">
                    Data presensi tersimpan otomatis di perangkat siswa. Guru dapat menghubungkan form ini ke Google Sheets melalui Tab Google Form di atas atau webhook spreadsheeet.
                  </p>
                </div>
              </div>

              {/* Success alert */}
              {isSuccessMessage && (
                <div className="p-3 bg-emerald-600 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 animate-bounce">
                  <i className="fa-solid fa-check"></i>
                  Presensi Kehadiran Berhasil Disimpan!
                </div>
              )}

              {/* Submit Button */}
              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs md:text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-xl transition cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs md:text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-sm transition flex items-center gap-2 cursor-pointer"
                >
                  <i className="fa-solid fa-floppy-disk"></i>
                  Simpan Presensi
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-600 bg-emerald-50/70 p-3 rounded-xl border border-emerald-100">
                <span>
                  <i className="fa-solid fa-link text-emerald-600 mr-1.5"></i>
                  Google Form Resmi Guru Yunyta Kartika
                </span>
                <a
                  href={teacherConfig.googleFormUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-700 font-semibold hover:underline flex items-center gap-1"
                >
                  Buka di Tab Baru <i className="fa-solid fa-arrow-up-right-from-square text-[10px]"></i>
                </a>
              </div>

              {/* Iframe Google Form */}
              <div className="w-full h-80 rounded-xl border border-slate-200 overflow-hidden bg-slate-100 relative">
                <iframe
                  title="Google Form Presensi Siswa"
                  src={teacherConfig.googleFormUrl}
                  className="w-full h-full border-0"
                  loading="lazy"
                >
                  Memuat Google Form Presensi...
                </iframe>
              </div>

              <p className="text-[11px] text-slate-500 italic">
                *Catatan Guru: Link Google Form dapat diganti melalui file sumber di <code>src/data/learningData.ts</code> atau tombol "Panel Guru" di header atas.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
