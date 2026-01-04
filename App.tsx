
import React, { useState, useEffect, useMemo } from 'react';
import { motion as motionBase, AnimatePresence } from 'framer-motion';
const motion = motionBase as any;
import { Dynasty, User, Submission, KeyEvent, KeyFigure, Achievement, WorkItem } from './types';
import { DYNASTIES as STATIC_DYNASTIES } from './data/history';
import ScrollHome from './components/ScrollHome';
import DynastyDetail from './components/DynastyDetail';
import ComparisonMode from './components/ComparisonMode';
import FeedbackModal from './components/FeedbackModal';
import AuthModal from './components/AuthModal';
import AdminPanel from './components/AdminPanel';
import EditSubmissionModal from './components/EditSubmissionModal';
import UserCabinet from './components/UserCabinet';

const App: React.FC = () => {
  const [selectedDynasty, setSelectedDynasty] = useState<Dynasty | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [compareD1, setCompareD1] = useState<Dynasty | null>(null);
  const [compareD2, setCompareD2] = useState<Dynasty | null>(null);
  const [showComparisonSelector, setShowComparisonSelector] = useState(false);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  
  // CMS States
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);
  const [isUserCabinetOpen, setIsUserCabinetOpen] = useState(false);
  
  // Edit Modal Targets
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editTargetDynasty, setEditTargetDynasty] = useState<Dynasty | undefined>();
  const [editTargetEvent, setEditTargetEvent] = useState<KeyEvent | undefined>();
  const [editTargetFigure, setEditTargetFigure] = useState<KeyFigure | undefined>();
  const [editTargetWork, setEditTargetWork] = useState<WorkItem | undefined>();
  const [editTargetAchievement, setEditTargetAchievement] = useState<Achievement | undefined>();

  useEffect(() => {
    try {
      const savedSubmissions = localStorage.getItem('dynasty_submissions');
      if (savedSubmissions) {
        const parsed = JSON.parse(savedSubmissions);
        if (Array.isArray(parsed)) setSubmissions(parsed);
      }
      
      const savedUser = localStorage.getItem('dynasty_user');
      if (savedUser) setCurrentUser(JSON.parse(savedUser));
    } catch (e) {
      console.error("历史存卷读取失败，已重置视角", e);
    }

    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const dynasties = useMemo(() => {
    try {
      const base: Dynasty[] = JSON.parse(JSON.stringify(STATIC_DYNASTIES));
      submissions.filter(s => s.status === 'approved').forEach(sub => {
        const dynasty = base.find(d => d.id === sub.targetId);
        if (dynasty) {
          if (sub.type === 'event') {
            const idx = dynasty.keyEvents.findIndex(e => e.id === sub.payload.id);
            const item = { ...sub.payload, lastModifiedBy: sub.authorName, lastModifiedTime: sub.timestamp };
            if (idx !== -1) dynasty.keyEvents[idx] = item; else dynasty.keyEvents.push(item);
          } else if (sub.type === 'figure') {
            const idx = dynasty.keyFigures.findIndex(f => f.id === sub.payload.id);
            const item = { ...sub.payload, lastModifiedBy: sub.authorName, lastModifiedTime: sub.timestamp };
            if (idx !== -1) dynasty.keyFigures[idx] = item; else dynasty.keyFigures.push(item);
          } else if (sub.type === 'achievement') {
            const idx = dynasty.achievements.findIndex(a => a.title === sub.targetSubId);
            if (idx !== -1) dynasty.achievements[idx] = sub.payload; else dynasty.achievements.push(sub.payload);
          } else if (sub.type === 'work') {
            dynasty.keyFigures.forEach(f => {
              if (f.works) {
                const wIdx = f.works.findIndex(w => w.id === sub.targetSubId);
                if (wIdx !== -1) f.works[wIdx] = sub.payload;
              }
            });
          } else if (sub.type === ('dynasty' as any)) {
             Object.assign(dynasty, sub.payload);
          }
        }
      });
      return base;
    } catch (e) {
      console.error("史料合并冲突", e);
      return STATIC_DYNASTIES;
    }
  }, [submissions]);

  const activeDynasty = useMemo(() => {
    if (!selectedDynasty) return null;
    return dynasties.find(d => d.id === selectedDynasty.id) || selectedDynasty;
  }, [selectedDynasty, dynasties]);

  useEffect(() => {
    if (isDarkMode) document.body.classList.add('dark-mode');
    else document.body.classList.remove('dark-mode');
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(prev => !prev);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    localStorage.setItem('dynasty_user', JSON.stringify(user));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('dynasty_user');
    setIsUserCabinetOpen(false);
  };

  const handleSubmission = (sub: Submission) => {
    const newSubmissions = [...submissions, sub];
    setSubmissions(newSubmissions);
    localStorage.setItem('dynasty_submissions', JSON.stringify(newSubmissions));
    setIsEditModalOpen(false);
    alert('修订建议已存入大内秘卷，待史官审核。');
  };

  const handleReview = (id: string, status: 'approved' | 'rejected') => {
    const newSubmissions = submissions.map(s => s.id === id ? { ...s, status } : s);
    setSubmissions(newSubmissions);
    localStorage.setItem('dynasty_submissions', JSON.stringify(newSubmissions));
  };

  const openEditDynastyModal = (dynasty: Dynasty) => {
    resetTargets();
    setEditTargetDynasty(dynasty);
    setIsEditModalOpen(true);
  };

  const openEditModal = (event?: KeyEvent) => {
    resetTargets();
    setEditTargetEvent(event);
    setIsEditModalOpen(true);
  };

  const openEditFigureModal = (figure: KeyFigure) => {
    resetTargets();
    setEditTargetFigure(figure);
    setIsEditModalOpen(true);
  };

  const openEditAchievementModal = (ach: Achievement) => {
    resetTargets();
    setEditTargetAchievement(ach);
    setIsEditModalOpen(true);
  };

  const openEditWorkModal = (work: WorkItem) => {
    resetTargets();
    setEditTargetWork(work);
    setIsEditModalOpen(true);
  };

  const resetTargets = () => {
    setEditTargetDynasty(undefined);
    setEditTargetEvent(undefined);
    setEditTargetFigure(undefined);
    setEditTargetWork(undefined);
    setEditTargetAchievement(undefined);
  };

  if (isLoading) {
    return (
      <div className="h-screen w-full bg-[#F7F9FC] flex flex-col items-center justify-center">
        <motion.div animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }} transition={{ duration: 3, repeat: Infinity }} className="w-32 h-32 border-8 border-[#1677FF] rounded-lg flex items-center justify-center font-calligraphy text-6xl text-[#1677FF] shadow-2xl mb-12 bg-white">史</motion.div>
        <div className="flex flex-col items-center gap-3">
          <div className="font-calligraphy text-4xl text-[#1F2A3C] tracking-[0.5em]">正在翻阅华夏卷轴</div>
          <div className="w-64 h-1 bg-[#E5E8F0] rounded-full overflow-hidden">
             <motion.div initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 1.2 }} className="h-full bg-[#1677FF]" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-full bg-white transition-colors relative overflow-hidden">
      {/* Navbar */}
      <div className="fixed top-6 left-6 z-[200] flex items-center gap-4">
        {currentUser ? (
          <div className="flex items-center gap-3 p-1 pl-4 bg-white/90 dark:bg-[#1A1A1A]/90 backdrop-blur rounded-full shadow-lg border border-[#E5E8F0] dark:border-[#222]">
            <span className="text-xs font-bold text-[#1F2A3C] dark:text-white">修史官：{currentUser.username}</span>
            <div className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase ${currentUser.role === 'admin' ? 'bg-[#1677FF] text-white' : 'bg-[#52C41A] text-white'}`}>
              {currentUser.role}
            </div>
            {currentUser.role === 'admin' && (
              <button onClick={() => setIsAdminPanelOpen(true)} className="bg-[#FAAD14] text-white px-3 py-1.5 rounded-full text-[10px] font-bold">审核大厅</button>
            )}
            <button onClick={() => setIsUserCabinetOpen(true)} className="p-2 hover:bg-[#F5F5F5] dark:hover:bg-[#333] rounded-full" title="个人史档">
               <svg className="w-4 h-4 text-[#8B4513]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
            </button>
            <button onClick={handleLogout} className="p-2 hover:bg-[#F5F5F5] dark:hover:bg-[#333] rounded-full">
              <svg className="w-4 h-4 text-[#FF4D4F]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
            </button>
          </div>
        ) : (
          <button onClick={() => setIsAuthOpen(true)} className="flex items-center gap-2 px-6 py-2.5 bg-white/90 dark:bg-[#111] backdrop-blur rounded-full shadow-lg border border-[#E5E8F0] hover:border-[#1677FF] transition-all group">
            <span className="font-calligraphy text-lg text-[#1F2A3C] dark:text-white group-hover:text-[#1677FF]">史官登录</span>
          </button>
        )}
      </div>

      <AnimatePresence mode="wait">
        {!activeDynasty ? (
          <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <ScrollHome dynasties={dynasties} onSelectDynasty={setSelectedDynasty} />
          </motion.div>
        ) : (
          <motion.div key="detail" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <DynastyDetail 
              dynasty={activeDynasty} 
              isLoggedIn={!!currentUser}
              onBack={() => setSelectedDynasty(null)} 
              onEditDynasty={() => openEditDynastyModal(activeDynasty)}
              onEditItem={openEditModal}
              onEditFigure={openEditFigureModal}
              onEditAchievement={openEditAchievementModal}
              onEditWork={openEditWorkModal}
              onCompare={() => { setCompareD1(activeDynasty); setShowComparisonSelector(true); }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showComparisonSelector && (
          <div className="fixed inset-0 z-[150] bg-[#1F2A3C]/60 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white dark:bg-[#1A1A1A] p-10 max-w-2xl w-full rounded-2xl shadow-2xl border border-[#E5E8F0] dark:border-[#222]">
              <div className="text-center mb-10">
                <h2 className="text-2xl font-bold text-[#1F2A3C] dark:text-white">请选择对照朝代</h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                {dynasties.map(d => (
                  <button key={d.id} disabled={d.id === compareD1?.id} onClick={() => { setCompareD2(d); setShowComparisonSelector(false); }} className={`p-4 border border-[#E5E8F0] dark:border-[#333] rounded-xl transition-all text-center group ${d.id === compareD1?.id ? 'opacity-30 cursor-not-allowed' : 'hover:border-[#1677FF] hover:bg-[#E6F7FF]'}`}>
                    <div className="font-calligraphy text-2xl text-[#1F2A3C] dark:text-white group-hover:text-[#1677FF]">{d.name}</div>
                  </button>
                ))}
              </div>
              <button onClick={() => setShowComparisonSelector(false)} className="w-full py-3 bg-[#F0F2F5] text-[#434D5C] rounded-lg font-bold">取消对比</button>
            </motion.div>
          </div>
        )}

        {compareD1 && compareD2 && <ComparisonMode d1={compareD1} d2={compareD2} onClose={() => { setCompareD1(null); setCompareD2(null); }} />}
        
        <FeedbackModal isOpen={isFeedbackOpen} onClose={() => setIsFeedbackOpen(false)} />
        <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} onLogin={handleLogin} />
        <AdminPanel isOpen={isAdminPanelOpen} onClose={() => setIsAdminPanelOpen(false)} submissions={submissions} dynasties={dynasties} onReview={handleReview} />
        <UserCabinet isOpen={isUserCabinetOpen} onClose={() => setIsUserCabinetOpen(false)} submissions={submissions.filter(s => s.authorId === currentUser?.id)} />
        {activeDynasty && currentUser && (
          <EditSubmissionModal 
            isOpen={isEditModalOpen} 
            dynasty={activeDynasty} 
            dynastyToEdit={editTargetDynasty}
            event={editTargetEvent}
            figure={editTargetFigure}
            work={editTargetWork}
            achievement={editTargetAchievement}
            user={currentUser} 
            onClose={() => { setIsEditModalOpen(false); resetTargets(); }} 
            onSubmit={handleSubmission} 
          />
        )}
      </AnimatePresence>
      
      {/* Control Panel */}
      <div className="fixed bottom-6 right-6 z-[200] flex flex-col gap-3">
         <button onClick={() => setIsFeedbackOpen(true)} className="w-12 h-12 rounded-full shadow-lg bg-white dark:bg-[#222] border border-[#E5E8F0] flex items-center justify-center text-[#434D5C] dark:text-white hover:text-[#1677FF] transition-all hover:scale-110">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" /></svg>
         </button>
         <button onClick={toggleDarkMode} className="w-12 h-12 rounded-full shadow-lg bg-white dark:bg-[#222] border border-[#E5E8F0] flex items-center justify-center text-[#434D5C] dark:text-white hover:text-[#1677FF] transition-all hover:scale-110">
            {isDarkMode ? '🌞' : '🌙'}
         </button>
      </div>
    </div>
  );
};

export default App;
