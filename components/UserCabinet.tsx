
import React from 'react';
import { motion as motionBase, AnimatePresence } from 'framer-motion';
const motion = motionBase as any;
import { Submission } from '../types';

interface UserCabinetProps {
  isOpen: boolean;
  onClose: () => void;
  submissions: Submission[];
}

const UserCabinet: React.FC<UserCabinetProps> = ({ isOpen, onClose, submissions }) => {
  const groupedSubmissions = submissions.reduce((acc, sub) => {
    const key = sub.action === 'add' ? 'added' : 'edited';
    acc[key].push(sub);
    return acc;
  }, { added: [] as Submission[], edited: [] as Submission[] });

  const renderSubmissionCard = (sub: Submission) => (
    <div key={sub.id} className="p-4 bg-white/70 backdrop-blur-sm border border-[#8B4513]/20 rounded-xl relative group transition-all hover:shadow-lg hover:border-[#8B4513]/40">
      <div className="flex justify-between items-start mb-2">
        <div className="text-sm font-bold text-[#3E2723]">{sub.payload.name}</div>
        <span className={`text-[9px] px-1.5 py-0.5 rounded border font-bold uppercase ${
          sub.status === 'pending' ? 'border-orange-400 text-orange-600 bg-orange-50' :
          sub.status === 'approved' ? 'border-green-400 text-green-600 bg-green-50' : 'border-red-400 text-red-600 bg-red-50'
        }`}>
          {sub.status === 'pending' ? '待考' : sub.status === 'approved' ? '准予' : '驳回'}
        </span>
      </div>
      <p className="text-[10px] text-[#6B778C] line-clamp-1 mb-3">{sub.changeSummary}</p>
      <div className="text-[9px] text-gray-400 flex justify-between items-center">
        <span>{new Date(sub.timestamp).toLocaleDateString()}</span>
        <span className="font-calligraphy text-[#B22222] opacity-0 group-hover:opacity-100 transition-opacity">
          {sub.action === 'add' ? '新撰' : '订补'}
        </span>
      </div>
    </div>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[450] flex justify-end">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="relative w-full max-w-md bg-[#F4EBD0] paper-bg h-full shadow-2xl border-l-8 border-[#8B4513] flex flex-col"
          >
            <div className="p-8 border-b border-[#8B4513]/20 flex justify-between items-center bg-[#EFE4C5]">
              <div>
                <h2 className="font-calligraphy text-3xl text-[#3E2723]">个人史档</h2>
                <p className="text-[10px] text-[#8B4513] font-ancient tracking-widest mt-1">青史留名 · 载录千秋</p>
              </div>
              <button onClick={onClose} className="w-10 h-10 border border-[#8B4513] rounded-full flex items-center justify-center text-[#8B4513] hover:bg-[#8B4513] hover:text-[#F4EBD0] transition-colors">✕</button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-12 no-scrollbar">
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <span className="h-[1px] flex-1 bg-[#8B4513]/20"></span>
                  <h3 className="font-calligraphy text-2xl text-[#B22222]">新撰之卷</h3>
                  <span className="h-[1px] flex-1 bg-[#8B4513]/20"></span>
                </div>
                <div className="grid gap-4">
                  {groupedSubmissions.added.map(renderSubmissionCard)}
                  {groupedSubmissions.added.length === 0 && <p className="text-center text-xs text-gray-400 italic py-4">暂无新撰记录</p>}
                </div>
              </section>

              <section>
                <div className="flex items-center gap-3 mb-6">
                  <span className="h-[1px] flex-1 bg-[#8B4513]/20"></span>
                  <h3 className="font-calligraphy text-2xl text-[#B22222]">订补之页</h3>
                  <span className="h-[1px] flex-1 bg-[#8B4513]/20"></span>
                </div>
                <div className="grid gap-4">
                  {groupedSubmissions.edited.map(renderSubmissionCard)}
                  {groupedSubmissions.edited.length === 0 && <p className="text-center text-xs text-gray-400 italic py-4">暂无订补记录</p>}
                </div>
              </section>
            </div>

            <div className="p-6 bg-[#3E2723] text-[#F4EBD0] text-center">
              <div className="text-[9px] font-ancient opacity-50 mb-1">DYNASTY CANVAS CONTRIBUTOR SYSTEM</div>
              <div className="text-sm font-ancient tracking-[0.4em]">史官功勋录</div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default UserCabinet;
