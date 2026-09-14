import React from 'react';
import { 
  BookOpen, 
  HelpCircle, 
  Volume2, 
  Layers, 
  Flame, 
  Sparkles, 
  VolumeX,
  History,
  Stethoscope,
  LogIn,
  Cloud,
  ChevronDown
} from 'lucide-react';
import { MainTab, UserStats, UserProfile } from '../types';
import { soundManager } from '../utils/audio';

interface NavbarProps {
  currentTab: MainTab;
  onSelectTab: (tab: MainTab) => void;
  stats: UserStats | null;
  activeUser: UserProfile | null;
  isMuted: boolean;
  onToggleMute: () => void;
  onOpenAuth: (mode: 'signin' | 'signup' | 'switch') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  stats,
  activeUser,
  isMuted,
  onToggleMute,
  onOpenAuth,
}) => {
  const navTabs = [
    {
      id: 'dictionary' as MainTab,
      label: 'ตารางคำศัพท์ A-Z',
      icon: BookOpen,
    },
    {
      id: 'related_groups' as MainTab,
      label: 'หมวดหมู่เชื่อมโยง & รากศัพท์',
      icon: Layers,
    },
    {
      id: 'quiz' as MainTab,
      label: 'แบบทดสอบ 4 ตัวเลือก',
      icon: HelpCircle,
    },
    {
      id: 'audio_practice' as MainTab,
      label: 'ฝึกฟังเสียง (ปกติ/ช้า)',
      icon: Volume2,
    },
    {
      id: 'history' as MainTab,
      label: 'ประวัติ & สถิติ',
      icon: History,
    },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FFFFFF]/95 backdrop-blur-md border-b border-[#D2E0EC] shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Top brand and stats row */}
        <div className="flex items-center justify-between h-18 py-2">
          {/* Logo & Brand */}
          <div 
            id="brand-logo"
            onClick={() => {
              soundManager.playClick();
              onSelectTab('dictionary');
            }}
            className="flex items-center gap-3 cursor-pointer select-none"
          >
            <div className="w-10 h-10 rounded-xl bg-[#486581] text-white flex items-center justify-center font-bold text-base shadow-sm shrink-0">
              <Stethoscope className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-xl sm:text-2xl text-[#102A43] tracking-tight">MedVoca</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-[#E0FCFF] text-[#006270] hidden sm:inline">
                  อายุรศาสตร์
                </span>
              </div>
              <p className="text-xs text-[#627D98] hidden sm:block">ระบบเรียนรู้และฝึกออกเสียงคำศัพท์การแพทย์</p>
            </div>
          </div>

          {/* User Profile & Gamification Stats */}
          <div className="flex items-center gap-2.5 sm:gap-3.5">
            {/* Streak & XP - Show if logged in */}
            {activeUser && stats && (
              <>
                {/* Streak */}
                <div 
                  id="stat-streak"
                  className="flex items-center gap-1.5 bg-[#F0F5FA] border border-[#D2E0EC] text-[#334E68] px-3 py-1.5 rounded-xl text-sm font-semibold"
                  title="สถิติการเรียนต่อเนื่อง (Streak)"
                >
                  <Flame className="w-4 h-4 text-[#F08C00] fill-[#F08C00]" />
                  <span>{stats.streak} วัน</span>
                </div>

                {/* XP */}
                <div 
                  id="stat-xp"
                  className="flex items-center gap-1.5 bg-[#F0F5FA] border border-[#D2E0EC] text-[#334E68] px-3 py-1.5 rounded-xl text-sm font-semibold"
                  title="คะแนนสะสม XP (บันทึกบนฐานข้อมูล)"
                >
                  <Sparkles className="w-4 h-4 text-[#F59E0B] fill-[#F59E0B]" />
                  <span>{stats.xp} XP</span>
                </div>
              </>
            )}

            {/* Sound Toggle */}
            <button
              id="btn-sound-toggle"
              onClick={() => {
                onToggleMute();
                soundManager.playClick();
              }}
              className="p-2 rounded-xl text-[#627D98] hover:text-[#102A43] hover:bg-[#F0F5FA] border border-transparent hover:border-[#D2E0EC] transition-colors"
              title={isMuted ? 'เปิดเสียงเอฟเฟกต์' : 'ปิดเสียงเอฟเฟกต์'}
              aria-label="Toggle Sound"
            >
              {isMuted ? <VolumeX className="w-5 h-5 text-[#9FB3C8]" /> : <Volume2 className="w-5 h-5 text-[#486581]" />}
            </button>

            {/* Auth / Account Controls */}
            {activeUser ? (
              <button
                id="btn-user-profile-menu"
                onClick={() => {
                  soundManager.playClick();
                  onOpenAuth('switch');
                }}
                className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl bg-[#F0F5FA] border border-[#D2E0EC] hover:border-[#BAC7D5] hover:bg-[#E4ECF4] transition-colors shadow-2xs"
                title="จัดการบัญชี / ฐานข้อมูลคลาวด์"
              >
                <div 
                  className="w-6 h-6 rounded-full text-white text-xs font-bold flex items-center justify-center shrink-0 shadow-xs"
                  style={{ backgroundColor: activeUser.avatarColor || '#486581' }}
                >
                  {activeUser.displayName.charAt(0).toUpperCase()}
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-xs font-bold text-[#102A43] max-w-[90px] sm:max-w-[130px] truncate leading-tight">
                    {activeUser.displayName}
                  </span>
                  <span className="text-[10px] text-[#059669] flex items-center gap-0.5 leading-none mt-0.5">
                    <Cloud className="w-2.5 h-2.5" /> ซิงค์คลาวด์
                  </span>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-[#829AB1]" />
              </button>
            ) : (
              <button
                id="btn-navbar-signin"
                onClick={() => {
                  soundManager.playClick();
                  onOpenAuth('signin');
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-xl btn-primary text-sm font-bold shadow-xs transition-all hover:scale-[1.02]"
              >
                <LogIn className="w-4 h-4" />
                <span>เข้าสู่ระบบ / บันทึกคะแนน</span>
              </button>
            )}
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex space-x-1.5 overflow-x-auto py-2 border-t border-[#E8EFF6] no-scrollbar">
          {navTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = currentTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`tab-btn-${tab.id}`}
                onClick={() => {
                  soundManager.playClick();
                  onSelectTab(tab.id);
                }}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all select-none ${
                  isActive
                    ? 'bg-[#486581] text-white shadow-xs'
                    : 'text-[#486581] hover:text-[#102A43] hover:bg-[#EBF2F7]'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#627D98]'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
