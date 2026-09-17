import React from 'react';
import { TabId, AttendanceRecord, TeacherConfig } from '../types';

interface HeaderProps {
  activeTab: TabId;
  onSelectTab: (tab: TabId) => void;
  attendance: AttendanceRecord | null;
  onOpenAttendance: () => void;
  onOpenTeacherConfig: () => void;
  teacherConfig: TeacherConfig;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onSelectTab,
  attendance,
  onOpenAttendance,
  onOpenTeacherConfig,
  teacherConfig,
}) => {
  const tabs = [
    { id: 'presentation' as TabId, label: 'Presentation', icon: 'fa-chalkboard-user', tag: 'Slide PPT' },
    { id: 'searching' as TabId, label: 'Searching', icon: 'fa-magnifying-glass', tag: 'Pencarian' },
    { id: 'sorting' as TabId, label: 'Sorting', icon: 'fa-arrow-down-wide-short', tag: 'Pengurutan' },
    { id: 'stack' as TabId, label: 'Stack', icon: 'fa-layer-group', tag: 'LIFO' },
    { id: 'queue' as TabId, label: 'Queue', icon: 'fa-people-line', tag: 'FIFO' },
    { id: 'fun-activity' as TabId, label: 'Fun & Refleksi', icon: 'fa-gamepad', tag: 'Kuis & Game' },
  ];

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
      {/* Top Banner: School & Teacher Identity */}
      <div className="bg-gradient-to-r from-emerald-700 via-teal-700 to-indigo-800 text-white px-4 py-2.5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-xs md:text-sm">
          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center text-emerald-200 font-bold border border-white/20">
                <i className="fa-solid fa-graduation-cap text-base"></i>
              </span>
              <div>
                <span className="font-semibold block text-emerald-100">{teacherConfig.school}</span>
                <span className="text-white/80 text-[11px] block">Kurikulum Merdeka • Fase E</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap justify-center">
            <div className="flex items-center gap-1.5 bg-black/20 px-3 py-1 rounded-full border border-white/10 text-[11px]">
              <i className="fa-solid fa-user-tie text-emerald-300"></i>
              <span className="text-white/90">Guru Pengampu:</span>
              <strong className="text-white">{teacherConfig.teacherName}</strong>
            </div>

            <button
              id="btn-open-teacher-config"
              onClick={onOpenTeacherConfig}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/15 hover:bg-white/25 transition text-[11px] text-white cursor-pointer border border-white/20"
              title="Pengaturan Guru & Ekspor Kode"
            >
              <i className="fa-solid fa-gear text-amber-300"></i>
              <span>Panel Guru</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Title & Presensi Action */}
      <div className="max-w-7xl mx-auto px-4 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-center sm:text-left">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center shadow-md shadow-emerald-500/20 shrink-0">
            <i className="fa-solid fa-laptop-code text-2xl"></i>
          </div>
          <div>
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <h1 className="text-lg md:text-xl font-bold text-slate-900 tracking-tight">
                Pembelajaran Daring Informatika Kelas X
              </h1>
              <span className="hidden sm:inline-block px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200">
                Berpikir Komputasional
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Struktur Data: Searching, Sorting, Stack, dan Queue • {teacherConfig.school}
            </p>
          </div>
        </div>

        {/* Presensi Button & Status Card */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            id="btn-open-presensi"
            onClick={onOpenAttendance}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-xs md:text-sm shadow-sm transition cursor-pointer border ${
              attendance
                ? 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100'
                : 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white border-transparent hover:from-emerald-700 hover:to-teal-700 shadow-emerald-600/20'
            }`}
          >
            <i className={`fa-solid ${attendance ? 'fa-circle-check text-emerald-600' : 'fa-clipboard-user'} text-base`}></i>
            <span>
              {attendance ? (
                <>Presensi: <strong className="underline">{attendance.fullName.split(' ')[0]} ({attendance.classGrade})</strong></>
              ) : (
                'Isi Presensi Kehadiran'
              )}
            </span>
            <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${attendance ? 'bg-emerald-200 text-emerald-900 font-bold' : 'bg-white/20 text-white'}`}>
              {attendance ? attendance.status : 'Wajib'}
            </span>
          </button>
        </div>
      </div>

      {/* Modern 6-Tab Navigation Bar */}
      <nav className="max-w-7xl mx-auto px-4 border-t border-slate-100 overflow-x-auto scrollbar-none">
        <ul className="flex items-center space-x-1 sm:space-x-2 py-2 min-w-max">
          {tabs.map((tab, idx) => {
            const isActive = activeTab === tab.id;
            return (
              <li key={tab.id}>
                <button
                  id={`tab-btn-${tab.id}`}
                  onClick={() => onSelectTab(tab.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs md:text-sm font-medium transition cursor-pointer relative ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/30'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <span className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] ${
                    isActive ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'
                  }`}>
                    {idx + 1}
                  </span>
                  <i className={`fa-solid ${tab.icon}`}></i>
                  <span>{tab.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                    isActive ? 'bg-emerald-700 text-emerald-100' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {tab.tag}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
};
