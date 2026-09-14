import React, { useState, useEffect } from 'react';
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
  ChevronDown,
  CreditCard,
  Keyboard,
  Users,
  LayoutGrid,
  X,
  Check
} from 'lucide-react';
import { MainTab, UserStats, UserProfile } from '../types';
import { soundManager } from '../utils/audio';

interface NavbarProps {
  currentTab: MainTab;
  onSelectTab: (tab: MainTab) => void;
  stats: UserStats | null;
  activeUser: UserProfile | null;
  totalUsersCount: number;
  isMuted: boolean;
  onToggleMute: () => void;
  onOpenAuth: (mode: 'signin' | 'signup' | 'switch') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  stats,
  activeUser,
  totalUsersCount,
  isMuted,
  onToggleMute,
  onOpenAuth,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Lock background body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navTabs: { 
    id: MainTab; 
    label: string; 
    shortLabel: string;
    description: string;
    icon: React.ComponentType<{ className?: string }> 
  }[] = [
    {
      id: 'dictionary',
      label: 'ตารางคำศัพท์',
      shortLabel: 'ตารางศัพท์',
      description: 'ค้นหาและฟังเสียงศัพท์ A-Z พร้อมคำอ่านไทย',
      icon: BookOpen,
    },
    {
      id: 'related_groups',
      label: 'หมวดหมู่เชื่อมโยง',
      shortLabel: 'หมวดหมู่',
      description: 'เรียนรู้ตามระบบอวัยวะและรากศัพท์',
      icon: Layers,
    },
    {
      id: 'flashcard',
      label: 'แฟลชการ์ด',
      shortLabel: 'แฟลชการ์ด',
      description: 'ทบทวนจำคำศัพท์แบบพลิกการ์ด',
      icon: CreditCard,
    },
    {
      id: 'quiz',
      label: 'แบบทดสอบ 4 ตัวเลือก',
      shortLabel: 'ช้อยส์ 4 ข้อ',
      description: 'ทดสอบความจำจับคู่ศัพท์และความหมาย',
      icon: HelpCircle,
    },
    {
      id: 'typing_practice',
      label: 'พิมพ์ตอบคำศัพท์',
      shortLabel: 'พิมพ์ตอบ',
      description: 'ฝึกสะกดคำศัพท์ภาษาอังกฤษด้วยการพิมพ์',
      icon: Keyboard,
    },
    {
      id: 'audio_practice',
      label: 'ฝึกฟังเสียง',
      shortLabel: 'ฝึกฟังเสียง',
      description: 'ฝึกทักษะการฟังออกเสียงปกติ/ช้า/สำเนียงไทย',
      icon: Volume2,
    },
    {
      id: 'history',
      label: 'ประวัติ & ทบทวน',
      shortLabel: 'ประวัติ & สถิติ',
      description: 'ดูสถิติคลังคำศัพท์และทบทวนข้อที่ผิด',
      icon: History,
    },
  ];

  const currentTabObj = navTabs.find((t) => t.id === currentTab) || navTabs[0];
  const CurrentIcon = currentTabObj.icon;

  const handleSelectTab = (tabId: MainTab) => {
    soundManager.playClick();
    onSelectTab(tabId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FFFFFF]/95 backdrop-blur-md border-b border-[#D2E0EC] shadow-xs">
      <div className="max-w-7xl mx-auto px-3 sm:px-6">
        {/* Top brand and stats row */}
        <div className="flex items-center justify-between h-14 sm:h-18 py-1.5 sm:py-2">
          {/* Logo & Brand */}
          <div 
            id="brand-logo"
            onClick={() => handleSelectTab('dictionary')}
            className="flex items-center gap-2 sm:gap-3 cursor-pointer select-none shrink-0"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-[#486581] text-white flex items-center justify-center font-bold text-sm sm:text-base shadow-sm shrink-0">
              <Stethoscope className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="font-bold text-base sm:text-2xl text-[#102A43] tracking-tight">MedVoca</span>
                <span className="text-[10px] sm:text-xs font-semibold px-1.5 sm:px-2 py-0.5 rounded-md bg-[#E0FCFF] text-[#006270]">
                  อายุรศาสตร์
                </span>
              </div>
              <p className="text-[10px] sm:text-xs text-[#627D98] hidden md:block">
                ระบบเรียนรู้และฝึกออกเสียงคำศัพท์การแพทย์
              </p>
            </div>
          </div>

          {/* User Profile & Gamification Stats */}
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            {/* Total Registered Users Count Badge */}
            <div 
              id="stat-total-users"
              className="flex items-center gap-1 sm:gap-1.5 bg-[#F0F5FA] border border-[#D2E0EC] text-[#334E68] px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-xl text-[11px] sm:text-xs font-semibold select-none shrink-0"
              title="ยอดผู้ใช้งานและสมาชิกทั้งหมดในระบบ"
            >
              <Users className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#486581]" />
              <span className="hidden md:inline text-[#627D98] font-normal">สมาชิก:</span>
              <span className="font-bold text-[#102A43]">{totalUsersCount > 0 ? totalUsersCount.toLocaleString('th-TH') : 1}</span>
              <span className="text-[10px] text-[#627D98] hidden xs:inline">คน</span>
            </div>

            {/* Streak & XP - Show if logged in */}
            {activeUser && stats && (
              <div className="flex items-center gap-1 sm:gap-1.5">
                {/* Streak */}
                <div 
                  id="stat-streak"
                  className="flex items-center gap-1 bg-[#F0F5FA] border border-[#D2E0EC] text-[#334E68] px-1.5 sm:px-2.5 py-1 sm:py-1.5 rounded-xl text-[11px] sm:text-sm font-semibold"
                  title="สถิติการเรียนต่อเนื่อง (Streak)"
                >
                  <Flame className="w-3 h-3 sm:w-4 sm:h-4 text-[#F08C00] fill-[#F08C00]" />
                  <span>{stats.streak}d</span>
                </div>

                {/* XP */}
                <div 
                  id="stat-xp"
                  className="flex items-center gap-1 bg-[#F0F5FA] border border-[#D2E0EC] text-[#334E68] px-1.5 sm:px-2.5 py-1 sm:py-1.5 rounded-xl text-[11px] sm:text-sm font-semibold"
                  title="คะแนนสะสม XP (บันทึกบนฐานข้อมูล)"
                >
                  <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-[#F59E0B] fill-[#F59E0B]" />
                  <span className="hidden xs:inline">{stats.xp} XP</span>
                  <span className="xs:hidden">{stats.xp}</span>
                </div>
              </div>
            )}

            {/* Sound Toggle */}
            <button
              id="btn-sound-toggle"
              onClick={() => {
                onToggleMute();
                soundManager.playClick();
              }}
              className="p-1.5 sm:p-2 rounded-xl text-[#627D98] hover:text-[#102A43] hover:bg-[#F0F5FA] border border-transparent hover:border-[#D2E0EC] transition-colors"
              title={isMuted ? 'เปิดเสียงเอฟเฟกต์' : 'ปิดเสียงเอฟเฟกต์'}
              aria-label="Toggle Sound"
            >
              {isMuted ? <VolumeX className="w-4 h-4 sm:w-5 sm:h-5 text-[#9FB3C8]" /> : <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#486581]" />}
            </button>

            {/* Auth / Account Controls */}
            {activeUser ? (
              <button
                id="btn-user-profile-menu"
                onClick={() => {
                  soundManager.playClick();
                  onOpenAuth('switch');
                }}
                className="flex items-center gap-1 sm:gap-2 pl-1 sm:pl-2 pr-1.5 sm:pr-3 py-1 sm:py-1.5 rounded-xl bg-[#F0F5FA] border border-[#D2E0EC] hover:border-[#BAC7D5] hover:bg-[#E4ECF4] transition-colors shadow-2xs"
                title="จัดการบัญชี / ฐานข้อมูล"
              >
                <div 
                  className="w-5 h-5 sm:w-6 sm:h-6 rounded-full text-white text-[10px] sm:text-xs font-bold flex items-center justify-center shrink-0 shadow-xs"
                  style={{ backgroundColor: activeUser.avatarColor || '#486581' }}
                >
                  {(activeUser.displayName || activeUser.username || 'U').charAt(0).toUpperCase()}
                </div>
                <span className="text-xs font-bold text-[#102A43] max-w-[60px] sm:max-w-[120px] truncate leading-tight hidden xs:inline">
                  {activeUser.displayName || activeUser.username}
                </span>
                <ChevronDown className="w-3 h-3 text-[#829AB1]" />
              </button>
            ) : (
              <button
                id="btn-navbar-signin"
                onClick={() => {
                  soundManager.playClick();
                  onOpenAuth('signin');
                }}
                className="flex items-center gap-1 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-xl btn-primary text-xs sm:text-sm font-bold shadow-xs transition-all hover:scale-[1.02] shrink-0"
              >
                <LogIn className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="hidden xs:inline">เข้าสู่ระบบ</span>
                <span className="xs:hidden">เข้าสู่ระบบ</span>
              </button>
            )}
          </div>
        </div>

        {/* Mobile Quick Mode Selector Bar (High Visibility on Phones) */}
        <div className="md:hidden py-1.5 border-t border-[#E8EFF6] relative">
          {/* Active Mode Button that opens the Full Mode List Dropdown */}
          <button
            id="btn-mobile-mode-switcher"
            type="button"
            onClick={() => {
              soundManager.playClick();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-[#F0F5FA] border border-[#BAC7D5] text-[#102A43] text-xs font-bold shadow-2xs active:bg-[#E4ECF4] transition-all select-none"
            aria-label="Toggle Learning Modes Menu"
            aria-expanded={mobileMenuOpen}
          >
            <div className="flex items-center gap-2.5 truncate">
              <div className="p-1.5 rounded-lg bg-[#486581] text-white shrink-0">
                <CurrentIcon className="w-4 h-4" />
              </div>
              <div className="text-left truncate">
                <span className="text-[10px] text-[#627D98] block uppercase tracking-wider font-semibold leading-none">
                  โหมดปัจจุบัน (แตะเพื่อเปลี่ยนโหมด)
                </span>
                <span className="text-xs font-bold text-[#102A43] leading-tight truncate">
                  {currentTabObj.label}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-[#486581] pl-2 shrink-0">
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileMenuOpen ? 'rotate-180' : ''}`} />
            </div>
          </button>

          {/* Mobile Mode List Dropdown (Opens directly below the button) */}
          {mobileMenuOpen && (
            <>
              {/* Dark translucent backdrop that blocks background interactions and clicks */}
              <div 
                className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs animate-fade-in" 
                onClick={() => setMobileMenuOpen(false)}
                aria-hidden="true"
              />
              
              {/* Dropdown List Container */}
              <div className="absolute left-0 right-0 top-full mt-1.5 z-50 bg-white rounded-2xl border border-[#D2E0EC] shadow-2xl overflow-hidden animate-slide-up">
                <div className="p-2.5 bg-[#F0F5FA] border-b border-[#E8EFF6] flex items-center justify-between">
                  <span className="text-xs font-bold text-[#334E68] flex items-center gap-1.5">
                    <LayoutGrid className="w-3.5 h-3.5 text-[#486581]" />
                    เลือกโหมดการเรียนรู้ ({navTabs.length} โหมด)
                  </span>
                  <button
                    type="button"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-[11px] font-semibold text-[#627D98] hover:text-[#102A43] px-2 py-0.5 rounded-md hover:bg-white"
                  >
                    ปิด
                  </button>
                </div>

                {/* Vertical list of modes - Scrollable if content exceeds height */}
                <div className="max-h-[62vh] overflow-y-auto overscroll-contain p-2 space-y-1.5 divide-y divide-[#F0F5FA]">
                  {navTabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = currentTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        id={`mobile-menu-tab-${tab.id}`}
                        type="button"
                        onClick={() => handleSelectTab(tab.id)}
                        className={`w-full flex items-center gap-3 p-2.5 rounded-xl text-left transition-all ${
                          isActive
                            ? 'bg-[#EBF2F7] border border-[#486581]/40 shadow-xs'
                            : 'bg-white hover:bg-[#F8FAFC] active:bg-[#F0F5FA] border border-transparent'
                        }`}
                      >
                        <div className={`p-2 rounded-xl shrink-0 ${
                          isActive ? 'bg-[#486581] text-white shadow-xs' : 'bg-[#F0F5FA] text-[#486581]'
                        }`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className={`text-xs font-bold ${isActive ? 'text-[#102A43]' : 'text-[#334E68]'}`}>
                              {tab.label}
                            </span>
                            {isActive && (
                              <span className="flex items-center gap-1 text-[11px] font-bold text-[#486581] bg-white px-2 py-0.5 rounded-full border border-[#D2E0EC] shrink-0">
                                <Check className="w-3 h-3 text-[#486581]" />
                                กำลังใช้งาน
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-[#627D98] mt-0.5 truncate leading-tight">
                            {tab.description}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Navigation Tabs - Desktop Only (on mobile, user taps the dropdown button to expand the list) */}
        <nav className="hidden md:flex items-center space-x-1.5 overflow-x-auto py-2 border-t border-[#E8EFF6] no-scrollbar">
          {navTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = currentTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`tab-btn-${tab.id}`}
                onClick={() => handleSelectTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all shrink-0 select-none min-h-[40px] ${
                  isActive
                    ? 'bg-[#486581] text-white shadow-xs font-bold scale-[1.02]'
                    : 'text-[#486581] hover:text-[#102A43] hover:bg-[#EBF2F7] bg-[#F7FAFC]/80 border border-transparent'
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
