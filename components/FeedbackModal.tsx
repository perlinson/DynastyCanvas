
import React, { useState } from 'react';
// Fix framer-motion type errors by casting the motion component to any
import { motion as motionBase, AnimatePresence } from 'framer-motion';
const motion = motionBase as any;

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({ isOpen, onClose }) => {
  const [type, setType] = useState<'bug' | 'suggestion' | 'other'>('suggestion');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setContent('');
        onClose();
      }, 2000);
    }, 1000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#1F2A3C]/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative bg-white dark:bg-[#1A1A1A] w-full max-w-md overflow-hidden rounded-xl shadow-2xl flex flex-col"
          >
            {/* Modal Header */}
            <div className="h-14 px-6 border-b border-[#E5E8F0] dark:border-[#222] flex items-center justify-between shrink-0">
              <h2 className="text-base font-semibold text-[#1F2A3C] dark:text-white">意见反馈</h2>
              <button 
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#F0F2F5] dark:hover:bg-[#333] text-[#6B778C] transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {isSuccess ? (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center justify-center py-10 text-center"
                >
                  <div className="w-16 h-16 bg-[#F6FFED] text-[#52C41A] rounded-full flex items-center justify-center mb-4">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <h3 className="text-lg font-medium text-[#1F2A3C] dark:text-white">提交成功</h3>
                  <p className="text-sm text-[#6B778C] mt-2">感谢您的宝贵建议，我们将不断优化体验。</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-[#434D5C] dark:text-[#AAA] mb-2">反馈类型</label>
                    <div className="flex gap-3">
                      {(['suggestion', 'bug', 'other'] as const).map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setType(t)}
                          className={`flex-1 py-2 px-3 text-xs rounded border transition-all ${
                            type === t 
                            ? 'bg-[#E6F7FF] border-[#1677FF] text-[#1677FF] font-medium' 
                            : 'border-[#E5E8F0] dark:border-[#333] text-[#6B778C] hover:border-[#1677FF]'
                          }`}
                        >
                          {t === 'bug' ? '问题反馈' : t === 'suggestion' ? '功能建议' : '其他'}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#434D5C] dark:text-[#AAA] mb-2">详细描述</label>
                    <textarea
                      required
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      placeholder="请具体描述您遇到的问题或改进建议..."
                      className="w-full h-32 p-3 text-sm rounded border border-[#E5E8F0] dark:border-[#333] dark:bg-[#111] dark:text-white focus:outline-none focus:border-[#1677FF] transition-colors resize-none"
                    />
                    <div className="mt-1 text-right text-[10px] text-[#6B778C]">
                      {content.length}/500
                    </div>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={onClose}
                      className="flex-1 py-2 text-sm text-[#434D5C] bg-[#F5F5F5] hover:bg-[#E5E8F0] rounded transition-colors"
                    >
                      取消
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting || !content.trim()}
                      className="flex-1 py-2 text-sm text-white bg-[#1677FF] hover:bg-[#4096FF] rounded shadow-sm disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                      ) : null}
                      确认提交
                    </button>
                  </div>
                </form>
              )}
            </div>

            <div className="h-10 bg-[#F7F9FC] dark:bg-[#111] px-6 flex items-center text-[10px] text-[#6B778C]">
              您的反馈将帮助我们做得更好
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default FeedbackModal;
