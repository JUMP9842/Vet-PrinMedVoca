import React, { useState } from 'react';
import { 
  X, 
  UserPlus, 
  LogIn, 
  LogOut, 
  Cloud, 
  Sparkles, 
  Check, 
  AlertCircle,
  Database,
  Mail,
  User as UserIcon,
  Loader2
} from 'lucide-react';
import { UserProfile } from '../types';
import { 
  authenticateOrRegisterUser, 
  saveLocalActiveUser 
} from '../utils/auth';
import { soundManager } from '../utils/audio';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeUser: UserProfile | null;
  onUserChanged: (user: UserProfile | null) => void;
  initialMode?: 'signin' | 'signup' | 'switch';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  activeUser,
  onUserChanged,
  initialMode = 'signin',
}) => {
  const [mode, setMode] = useState<'signin' | 'signup' | 'switch'>(
    activeUser ? 'switch' : (initialMode === 'switch' ? 'signin' : initialMode)
  );
  const [email, setEmail] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen) return null;

  const handleSignOut = () => {
    soundManager.playClick();
    saveLocalActiveUser(null);
    onUserChanged(null);
    setSuccessMsg('ออกจากระบบเรียบร้อยแล้ว');
    setTimeout(() => {
      onClose();
    }, 400);
  };

  const handleAuthenticate = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    const cleanEmail = email.trim();
    if (!cleanEmail || !cleanEmail.includes('@') || !cleanEmail.includes('.')) {
      setErrorMsg('กรุณากรอกอีเมลให้ถูกต้องเพื่อใช้ในการระบุบัญชีผู้เรียน');
      return;
    }

    setIsLoading(true);
    soundManager.playClick();

    try {
      const user = await authenticateOrRegisterUser(
        cleanEmail, 
        displayName.trim() || cleanEmail.split('@')[0]
      );
      setSuccessMsg(`เข้าสู่ระบบสำเร็จ: ยินดีต้อนรับ ${user.displayName}`);
      setTimeout(() => {
        onUserChanged(user);
        setIsLoading(false);
        onClose();
      }, 500);
    } catch (err: any) {
      console.error('Login error:', err);
      setErrorMsg('เกิดข้อผิดพลาดในการเชื่อมต่อฐานข้อมูล กรุณาลองใหม่อีกครั้ง');
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#102A43]/40 backdrop-blur-sm animate-fade-in text-base">
      <div 
        id="auth-modal-card"
        className="bg-white w-full max-w-md rounded-2xl border border-[#D2E0EC] shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-[#E8EFF6] flex items-center justify-between bg-[#F0F5FA]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#486581] text-white flex items-center justify-center">
              <Database className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-base text-[#102A43] block">
                {mode === 'switch' && 'จัดการบัญชี & ฐานข้อมูลคลาวด์'}
                {mode === 'signin' && 'เข้าสู่ระบบบัญชีผู้เรียน'}
                {mode === 'signup' && 'สร้างบัญชีผู้เรียนใหม่'}
              </span>
              <span className="text-[11px] text-[#627D98] flex items-center gap-1">
                <Cloud className="w-3 h-3 text-[#059669]" /> บันทึกประวัติและคะแนนสะสมบนฐานข้อมูล
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#829AB1] hover:text-[#102A43] hover:bg-[#E4ECF4] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Active Account Overview (if logged in) */}
          {mode === 'switch' && activeUser && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-[#F0F5FA] border border-[#D2E0EC] flex items-center justify-between">
                <div className="flex items-center gap-3.5">
                  <div 
                    className="w-12 h-12 rounded-xl text-white font-bold text-lg flex items-center justify-center shadow-xs"
                    style={{ backgroundColor: activeUser.avatarColor || '#486581' }}
                  >
                    {activeUser.displayName.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="font-bold text-base text-[#102A43]">
                      {activeUser.displayName}
                    </h4>
                    <p className="text-xs text-[#627D98]">{activeUser.email}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs font-semibold text-[#F59E0B]">
                        {activeUser.stats.xp} XP
                      </span>
                      <span className="text-xs text-[#829AB1]">•</span>
                      <span className="text-xs text-[#059669] font-medium">
                        {activeUser.history?.length || 0} ประวัติการทดสอบ
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-1.5 rounded-full bg-[#ECFDF5] text-[#059669]" title="สถานะ: เชื่อมต่อฐานข้อมูล">
                  <Check className="w-4 h-4" />
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <button
                  onClick={() => {
                    soundManager.playClick();
                    setMode('signin');
                    setEmail('');
                    setDisplayName('');
                    setErrorMsg('');
                  }}
                  className="w-full py-2.5 rounded-xl btn-secondary text-sm font-semibold flex items-center justify-center gap-2"
                >
                  <UserPlus className="w-4 h-4 text-[#486581]" />
                  <span>เข้าสู่ระบบด้วยบัญชีอื่น / สร้างบัญชีใหม่</span>
                </button>

                <button
                  onClick={handleSignOut}
                  className="w-full py-2.5 rounded-xl border border-[#FECACA] bg-[#FEF2F2] hover:bg-[#FEE2E2] text-[#991B1B] text-sm font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>ออกจากระบบในเครื่องนี้</span>
                </button>
              </div>
            </div>
          )}

          {/* Sign In / Sign Up Form */}
          {(mode === 'signin' || mode === 'signup' || (mode === 'switch' && !activeUser)) && (
            <form onSubmit={handleAuthenticate} className="space-y-4">
              <div className="p-3.5 bg-[#F0F5FA] rounded-xl border border-[#D2E0EC] text-xs text-[#334E68] space-y-1">
                <p className="font-semibold text-[#102A43] flex items-center gap-1.5">
                  <Cloud className="w-3.5 h-3.5 text-[#486581]" />
                  ระบบบันทึกผลการเรียนรู้ออนไลน์
                </p>
                <p className="text-[#627D98]">
                  กรอกอีเมลเพื่อเข้าใช้งานหรือสร้างบัญชีใหม่ทันที ระบบจะบันทึกคะแนนสะสม XP สถิติ และคำศัพท์ที่บุ๊กมาร์กไว้ในฐานข้อมูล
                </p>
              </div>

              {errorMsg && (
                <div className="p-3 bg-[#FEF2F2] border border-[#FECACA] rounded-xl text-xs text-[#991B1B] font-medium flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {successMsg && (
                <div className="p-3 bg-[#ECFDF5] border border-[#A7F3D0] rounded-xl text-xs text-[#065F46] font-medium flex items-center gap-2">
                  <Check className="w-4 h-4 shrink-0" />
                  <span>{successMsg}</span>
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#486581] uppercase tracking-wider flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5" /> อีเมลผู้ใช้งาน
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="เช่น doctor@hospital.com หรือ student@med.ac.th"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#F0F5FA] border border-[#D2E0EC] focus:border-[#486581] focus:bg-white text-sm text-[#102A43] outline-none transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#486581] uppercase tracking-wider flex items-center gap-1.5">
                  <UserIcon className="w-3.5 h-3.5" /> ชื่อที่ต้องการให้แสดง (Display Name)
                </label>
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="เช่น นศพ. ชัยยศ, พญ. รัชดา"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#F0F5FA] border border-[#D2E0EC] focus:border-[#486581] focus:bg-white text-sm text-[#102A43] outline-none transition-colors"
                />
              </div>

              <div className="pt-2 space-y-2.5">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 rounded-xl btn-primary text-sm font-bold shadow-xs flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>กำลังเชื่อมต่อฐานข้อมูล...</span>
                    </>
                  ) : (
                    <>
                      <LogIn className="w-4 h-4" />
                      <span>เข้าสู่ระบบ / บันทึกข้อมูลคลาวด์</span>
                    </>
                  )}
                </button>

                {activeUser && (
                  <button
                    type="button"
                    onClick={() => {
                      soundManager.playClick();
                      setMode('switch');
                    }}
                    className="w-full py-2 text-xs font-semibold text-[#627D98] hover:text-[#102A43]"
                  >
                    ← กลับไปยังบัญชีปัจจุบัน
                  </button>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
