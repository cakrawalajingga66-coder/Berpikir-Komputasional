import React, { useState } from 'react';
import { TeacherConfig } from '../types';
import { generateSingleFileHtml } from '../utils/singleFileHtml';

interface TeacherSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: TeacherConfig;
  onSaveConfig: (newConfig: TeacherConfig) => void;
}

export const TeacherSettingsModal: React.FC<TeacherSettingsModalProps> = ({
  isOpen,
  onClose,
  config,
  onSaveConfig,
}) => {
  const [formData, setFormData] = useState<TeacherConfig>(config);
  const [copiedCode, setCopiedCode] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveConfig(formData);
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      onClose();
    }, 1200);
  };

  const handleCopySingleHtml = () => {
    const htmlCode = generateSingleFileHtml(formData);
    navigator.clipboard.writeText(htmlCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  const handleDownloadSingleHtml = () => {
    const htmlCode = generateSingleFileHtml(formData);
    const blob = new Blob([htmlCode], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Pembelajaran_Informatika_Kelas_X_SMAN1TenggarongSeberang.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-900 px-6 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center text-lg border border-amber-500/30">
              <i className="fa-solid fa-sliders"></i>
            </div>
            <div>
              <h2 className="text-base md:text-lg font-bold">Panel Konfigurasi Guru & Tautan Eksternal</h2>
              <p className="text-xs text-slate-300">
                SMA Negeri 1 Tenggarong Seberang • Ibu {formData.teacherName}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition cursor-pointer"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Quick Notice */}
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-start gap-2.5">
            <i className="fa-solid fa-circle-info text-amber-600 text-sm mt-0.5 shrink-0"></i>
            <div>
              <span className="font-bold block mb-0.5">Panduan Kustomisasi Guru:</span>
              <p>
                Anda dapat mengubah tautan Google Form Presensi, Spreadsheet, Slide Presentasi, dan Embed Video YouTube sesuai kebutuhan kelas Anda.
              </p>
            </div>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nama Guru Pengampu
                </label>
                <input
                  type="text"
                  value={formData.teacherName}
                  onChange={(e) => setFormData({ ...formData, teacherName: e.target.value })}
                  className="w-full px-3 py-2 text-xs md:text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nama Sekolah
                </label>
                <input
                  type="text"
                  value={formData.school}
                  onChange={(e) => setFormData({ ...formData, school: e.target.value })}
                  className="w-full px-3 py-2 text-xs md:text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-hidden"
                />
              </div>
            </div>

            {/* Google Form Link */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                <i className="fa-brands fa-google text-emerald-600 mr-1.5"></i>
                Tautan Google Form Presensi Siswa (Embed Iframe / URL)
              </label>
              <input
                type="url"
                value={formData.googleFormUrl}
                onChange={(e) => setFormData({ ...formData, googleFormUrl: e.target.value })}
                placeholder="https://docs.google.com/forms/d/e/.../viewform?embedded=true"
                className="w-full px-3 py-2 text-xs font-mono border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-hidden"
              />
              <span className="text-[11px] text-slate-500 block mt-1">
                *Tips: Pada Google Form, klik "Kirim" → pilih tab tanda kurung siku <code>&lt; &gt;</code> (Sematkan HTML) dan salin tautan src-nya.
              </span>
            </div>

            {/* Google Slides Embed URL */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                <i className="fa-solid fa-file-powerpoint text-indigo-600 mr-1.5"></i>
                Tautan Embed Slide PowerPoint / Google Slides
              </label>
              <input
                type="url"
                value={formData.embedPptUrl}
                onChange={(e) => setFormData({ ...formData, embedPptUrl: e.target.value })}
                className="w-full px-3 py-2 text-xs font-mono border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-hidden"
              />
            </div>

            {/* Video URLs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  <i className="fa-brands fa-youtube text-red-600 mr-1.5"></i>
                  Embed Video Searching & Sorting
                </label>
                <input
                  type="text"
                  value={formData.searchingVideoUrl}
                  onChange={(e) => setFormData({ ...formData, searchingVideoUrl: e.target.value })}
                  className="w-full px-3 py-2 text-xs font-mono border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  <i className="fa-brands fa-youtube text-red-600 mr-1.5"></i>
                  Embed Video Stack & Queue
                </label>
                <input
                  type="text"
                  value={formData.stackQueueVideoUrl}
                  onChange={(e) => setFormData({ ...formData, stackQueueVideoUrl: e.target.value })}
                  className="w-full px-3 py-2 text-xs font-mono border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-hidden"
                />
              </div>
            </div>

            {saveSuccess && (
              <div className="p-3 bg-emerald-600 text-white rounded-xl text-xs font-bold text-center animate-bounce">
                Pengaturan Guru Berhasil Disimpan!
              </div>
            )}

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs md:text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-xl transition cursor-pointer"
              >
                Tutup
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs md:text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-sm transition flex items-center gap-2 cursor-pointer"
              >
                <i className="fa-solid fa-floppy-disk"></i>
                Simpan Perubahan
              </button>
            </div>
          </form>

          {/* STANDALONE SINGLE-FILE HTML EXPORT SECTION */}
          <div className="mt-6 pt-5 border-t border-slate-200 space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center text-sm font-bold">
                <i className="fa-solid fa-file-code"></i>
              </span>
              <div>
                <h3 className="font-bold text-sm text-slate-900">
                  Ekspor Berkas Tunggal HTML (Single File HTML)
                </h3>
                <p className="text-xs text-slate-500">
                  Sesuai permintaan instruksi prompt: kode lengkap dalam satu berkas .html siap pakai secara mandiri.
                </p>
              </div>
            </div>

            <div className="p-4 bg-slate-900 rounded-xl text-white font-mono text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <span className="text-emerald-400 font-bold block mb-0.5">
                  aplikasi_informatika_kelas_x.html
                </span>
                <span className="text-slate-400 text-[11px]">
                  Berisi HTML, Tailwind CSS, FontAwesome 6, dan Script Interaktif lengkap.
                </span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={handleCopySingleHtml}
                  className="px-3.5 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-semibold transition cursor-pointer flex items-center gap-1.5"
                >
                  <i className={`fa-solid ${copiedCode ? 'fa-check text-emerald-400' : 'fa-copy'}`}></i>
                  {copiedCode ? 'Tersalin!' : 'Salin Kode'}
                </button>
                <button
                  type="button"
                  onClick={handleDownloadSingleHtml}
                  className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1.5 shadow-sm"
                >
                  <i className="fa-solid fa-download"></i>
                  Unduh .html
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
