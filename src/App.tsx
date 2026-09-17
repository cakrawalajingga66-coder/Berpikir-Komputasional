import { useState, useEffect } from 'react';
import { TabId, AttendanceRecord, TeacherConfig } from './types';
import { TEACHER_CONFIG } from './data/learningData';
import { Header } from './components/Header';
import { AttendanceModal } from './components/AttendanceModal';
import { TeacherSettingsModal } from './components/TeacherSettingsModal';
import { PresentationTab } from './components/tabs/PresentationTab';
import { SearchingTab } from './components/tabs/SearchingTab';
import { SortingTab } from './components/tabs/SortingTab';
import { StackTab } from './components/tabs/StackTab';
import { QueueTab } from './components/tabs/QueueTab';
import { FunActivityTab } from './components/tabs/FunActivityTab';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>('presentation');
  const [attendance, setAttendance] = useState<AttendanceRecord | null>(null);
  const [teacherConfig, setTeacherConfig] = useState<TeacherConfig>(TEACHER_CONFIG);
  const [isAttendanceModalOpen, setIsAttendanceModalOpen] = useState<boolean>(false);
  const [isTeacherModalOpen, setIsTeacherModalOpen] = useState<boolean>(false);

  // Load saved attendance and teacher config from localStorage
  useEffect(() => {
    try {
      const savedAtt = localStorage.getItem('sman1_tenggarong_attendance');
      if (savedAtt) {
        setAttendance(JSON.parse(savedAtt));
      }

      const savedCfg = localStorage.getItem('sman1_tenggarong_teacher_config');
      if (savedCfg) {
        setTeacherConfig(JSON.parse(savedCfg));
      }
    } catch (e) {
      console.error('Error loading local storage data:', e);
    }
  }, []);

  const handleSaveAttendance = (record: AttendanceRecord) => {
    setAttendance(record);
    try {
      localStorage.setItem('sman1_tenggarong_attendance', JSON.stringify(record));
    } catch (e) {
      console.error('Error saving attendance:', e);
    }
  };

  const handleSaveTeacherConfig = (newConfig: TeacherConfig) => {
    setTeacherConfig(newConfig);
    try {
      localStorage.setItem('sman1_tenggarong_teacher_config', JSON.stringify(newConfig));
    } catch (e) {
      console.error('Error saving teacher config:', e);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col selection:bg-emerald-100 selection:text-emerald-900">
      {/* Top Main Navigation & Identity Header */}
      <Header
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        attendance={attendance}
        onOpenAttendance={() => setIsAttendanceModalOpen(true)}
        onOpenTeacherConfig={() => setIsTeacherModalOpen(true)}
        teacherConfig={teacherConfig}
      />

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 py-6 flex-1 w-full space-y-6">
        {/* Attendance reminder banner if student hasn't signed attendance yet */}
        {!attendance && (
          <div className="p-3.5 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs md:text-sm text-amber-900 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0">
                <i className="fa-solid fa-bell"></i>
              </div>
              <div>
                <span className="font-bold block">Presensi Siswa Belum Diisi:</span>
                <span className="text-amber-800 text-xs">
                  Halo siswa Kelas X! Mohon isi presensi kehadiran terlebih dahulu sebelum memulai materi pembelajaran hari ini.
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsAttendanceModalOpen(true)}
              className="px-3.5 py-1.5 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl transition cursor-pointer text-xs shrink-0 flex items-center gap-1.5 shadow-sm"
            >
              <i className="fa-solid fa-signature"></i>
              Isi Presensi Sekarang
            </button>
          </div>
        )}

        {/* 6 Tabs Rendering */}
        {activeTab === 'presentation' && (
          <PresentationTab teacherConfig={teacherConfig} />
        )}

        {activeTab === 'searching' && (
          <SearchingTab teacherConfig={teacherConfig} />
        )}

        {activeTab === 'sorting' && (
          <SortingTab teacherConfig={teacherConfig} />
        )}

        {activeTab === 'stack' && (
          <StackTab teacherConfig={teacherConfig} />
        )}

        {activeTab === 'queue' && (
          <QueueTab teacherConfig={teacherConfig} />
        )}

        {activeTab === 'fun-activity' && (
          <FunActivityTab
            teacherConfig={teacherConfig}
            studentName={attendance?.fullName}
            studentClass={attendance?.classGrade}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-auto py-6">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              <i className="fa-solid fa-school"></i>
            </span>
            <div>
              <span className="font-bold text-slate-700 block">{teacherConfig.school}</span>
              <span>Mata Pelajaran Informatika • Kelas X (Fase E) Kurikulum Merdeka</span>
            </div>
          </div>

          <div className="text-center md:text-right">
            <p>
              Media Pembelajaran Daring dirancang oleh: <strong className="text-slate-800">{teacherConfig.teacherName}</strong>
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Materi: Berpikir Komputasional, Searching, Sorting, Stack (LIFO), dan Queue (FIFO)
            </p>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <AttendanceModal
        isOpen={isAttendanceModalOpen}
        onClose={() => setIsAttendanceModalOpen(false)}
        currentAttendance={attendance}
        onSaveAttendance={handleSaveAttendance}
        teacherConfig={teacherConfig}
      />

      <TeacherSettingsModal
        isOpen={isTeacherModalOpen}
        onClose={() => setIsTeacherModalOpen(false)}
        config={teacherConfig}
        onSaveConfig={handleSaveTeacherConfig}
      />
    </div>
  );
}
