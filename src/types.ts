export type ClassGrade = 'X1' | 'X2' | 'X3' | 'X4' | 'X5' | 'X6' | 'X7';

export type AttendanceStatus = 'Hadir' | 'Izin' | 'Sakit' | 'Alpha';

export interface AttendanceRecord {
  id: string;
  fullName: string;
  classGrade: ClassGrade;
  status: AttendanceStatus;
  notes?: string;
  timestamp: string;
}

export type TabId = 
  | 'presentation'
  | 'searching'
  | 'sorting'
  | 'stack'
  | 'queue'
  | 'fun-activity';

export interface TabItem {
  id: TabId;
  title: string;
  shortTitle: string;
  icon: string;
  badge?: string;
  description: string;
}

export interface TeacherConfig {
  teacherName: string;
  subject: string;
  school: string;
  grade: string;
  // Configuration URLs for Google Sheets and Google Forms
  googleFormUrl: string;
  googleSheetsUrl: string;
  embedPptUrl: string;
  searchingVideoUrl: string;
  stackQueueVideoUrl: string;
}

export interface StudentReflection {
  id: string;
  studentName: string;
  classGrade: ClassGrade;
  emotion: 'sangat_paham' | 'senang' | 'cukup' | 'bingung';
  favTopic: string;
  challengingTopic: string;
  reflectionNotes: string;
  submittedAt: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  topic: 'Searching' | 'Sorting' | 'Stack' | 'Queue' | 'Berpikir Komputasional';
}
