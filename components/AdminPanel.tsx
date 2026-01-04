
import React from 'react';
import { motion as motionBase, AnimatePresence } from 'framer-motion';
const motion = motionBase as any;
import { Submission, Dynasty, KeyEvent } from '../types';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  submissions: Submission[];
  dynasties: Dynasty[];
  onReview: (id: string, status: 'approved' | 'rejected', note?: string) => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ isOpen, onClose, submissions, dynasties, onReview }) => {
  const pendingCount = submissions.filter(s => s.status === 'pending').length;

  const getOriginalContent = (sub: Submission) => {
    if (sub.action !== 'edit' || !sub.targetSubId) return null;
    const dynasty = dynasties.find(d => d.id === sub.targetId);
    if (!dynasty) return null;
    if (sub.type === 'event') {
      return dynasty.keyEvents.find(e => e.id === sub.targetSubId);
    }
    // 其他类型(figure/achievement)类似处理
    return null;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[500] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#1F2A3C]/90 backdrop-blur-xl"
          />
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="relative bg-white dark:bg-[#1A1A1A] w-full max-w-6xl h-[90vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col"
          >
            <div className="h-20 px-8 border-b border-[#E5E8F0] dark:border-[#222] flex items-center justify-between bg-[#F7F9FC] dark:bg-[#111]">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-[#B22222] rounded-xl flex items-center justify-center text-white font-calligraphy text-2xl">审</div>
                <div>
                  <h2 className="text-xl font-bold text-[#1F2A3C] dark:text-white">史料审核枢要</h2>
                  <p className="text-xs text-[#6B778C]">待核定卷宗：{pendingCount}</p>
                </div>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-[#E5E8F0] rounded-full transition-colors">✕</button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-8 bg-[#F0F2F5] dark:bg-[#0A0A0A]">
              {submissions.map((sub) => {
                const original = getOriginalContent(sub) as KeyEvent | null;
                const isEdit = sub.action === 'edit';

                return (
                  <motion.div key={sub.id} layout className="bg-white dark:bg-[#111] border border-[#E5E8F0] dark:border-[#222] rounded-2xl shadow-sm overflow-hidden">
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-6 border-b border-dashed pb-4">
                        <div className="flex items-center gap-3">
                          <span className={`px-2 py-0.5 text-[10px] font-bold rounded uppercase ${
                            sub.status === 'pending' ? 'bg-orange-100 text-orange-600' :
                            sub.status === 'approved' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                          }`}>
                            {sub.status === 'pending' ? '候审' : sub.status}
                          </span>
                          <span className="text-sm font-bold text-[#1F2A3C] dark:text-white">
                            {sub.action === 'add' ? '【新撰】' : '【订补】'}{sub.payload.name}
                          </span>
                        </div>
                        <span className="text-xs text-[#6B778C]">
                          史官：{sub.authorName} · {new Date(sub.timestamp).toLocaleString()}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* 左侧：原内容（仅修订模式显示） */}
                        {isEdit && original ? (
                          <div className="space-y-3 opacity-60">
                            <div className="text-xs font-bold text-[#6B778C] flex items-center gap-2">
                              <span className="w-2 h-2 bg-gray-400 rounded-full"></span> 史册旧载 (Original)
                            </div>
                            <div className="p-4 bg-gray-50 dark:bg-black/20 rounded-xl border border-gray-200">
                              <div className="text-sm font-bold mb-1">{original.name} ({original.year})</div>
                              <div className="text-xs leading-relaxed">{original.details}</div>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center p-8 border-2 border-dashed border-gray-100 rounded-xl text-xs text-gray-400 italic">
                            新撰史料，无旧载对比
                          </div>
                        )}

                        {/* 右侧：拟修订内容 */}
                        <div className="space-y-3">
                          <div className="text-xs font-bold text-[#1677FF] flex items-center gap-2">
                            <span className="w-2 h-2 bg-[#1677FF] rounded-full"></span> 拟入新卷 (Revised)
                          </div>
                          <div className="p-4 bg-[#E6F7FF]/30 dark:bg-[#1677FF]/10 rounded-xl border border-[#1677FF]/30">
                            <div className="text-sm font-bold mb-1 text-[#1677FF]">
                              {sub.payload.name} ({sub.payload.year}{sub.payload.month ? ` · ${sub.payload.month}` : ''})
                              {sub.payload.isMinor && <span className="ml-2 px-1 text-[9px] border border-[#1677FF] rounded">小事件</span>}
                            </div>
                            <div className="text-xs leading-relaxed text-[#1F2A3C] dark:text-[#CCC]">{sub.payload.details}</div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 pt-4 border-t border-gray-50 flex items-center justify-between">
                        <div className="text-xs text-[#6B778C]">
                          <b>修订缘由：</b>{sub.changeSummary}
                        </div>
                        {sub.status === 'pending' && (
                          <div className="flex gap-2">
                            <button onClick={() => onReview(sub.id, 'rejected')} className="px-6 py-1.5 text-xs text-[#FF4D4F] border border-[#FF4D4F] rounded-full hover:bg-red-50">驳回</button>
                            <button onClick={() => onReview(sub.id, 'approved')} className="px-6 py-1.5 text-xs text-white bg-[#52C41A] rounded-full hover:bg-[#49aa19] shadow-lg shadow-green-200">准予入册</button>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AdminPanel;
