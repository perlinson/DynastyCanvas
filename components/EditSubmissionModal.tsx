
import React, { useState, useEffect } from 'react';
import { motion as motionBase, AnimatePresence } from 'framer-motion';
const motion = motionBase as any;
import { Dynasty, KeyEvent, KeyFigure, User, Submission, WorkItem, Achievement } from '../types';

interface EditSubmissionModalProps {
  dynasty: Dynasty;
  dynastyToEdit?: Dynasty;
  event?: KeyEvent;
  figure?: KeyFigure;
  work?: WorkItem;
  achievement?: Achievement;
  user: User;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (submission: Submission) => void;
}

const EditSubmissionModal: React.FC<EditSubmissionModalProps> = ({ 
  dynasty, dynastyToEdit, event, figure, work, achievement, user, isOpen, onClose, onSubmit 
}) => {
  // Common
  const [name, setName] = useState('');
  const [details, setDetails] = useState('');
  const [summary, setSummary] = useState('');
  
  // For Events
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [isMinor, setIsMinor] = useState(false);
  
  // For Figures
  const [title, setTitle] = useState('');
  const [portraitUrl, setPortraitUrl] = useState('');
  const [biography, setBiography] = useState('');
  const [works, setWorks] = useState<WorkItem[]>([]);
  
  // For Works/Achievements
  const [imageUrl, setImageUrl] = useState('');
  const [fullDetail, setFullDetail] = useState('');

  // For Dynasty Edit
  const [timeRange, setTimeRange] = useState('');
  const [capital, setCapital] = useState('');

  useEffect(() => {
    if (isOpen) {
      setSummary('');
      if (dynastyToEdit) {
        setName(dynastyToEdit.name);
        setTimeRange(dynastyToEdit.timeRange);
        setCapital(dynastyToEdit.capital);
      } else if (achievement) {
        setName(achievement.title);
        setDetails(achievement.description);
      } else if (work) {
        setName(work.title);
        setDetails(work.content);
        setFullDetail(work.fullDetail || '');
        setImageUrl(work.imageUrl || '');
      } else if (figure) {
        setName(figure.name);
        setTitle(figure.title);
        setPortraitUrl(figure.portraitUrl || '');
        setBiography(figure.biography);
        setWorks(figure.works || []);
      } else if (event) {
        setName(event.name);
        setYear(event.year);
        setMonth(event.month || '');
        setDetails(event.details);
        setIsMinor(event.isMinor || false);
      } else {
        resetForm();
      }
    }
  }, [isOpen, event, figure, work, achievement, dynastyToEdit]);

  const resetForm = () => {
    setName(''); setYear(''); setMonth(''); setDetails(''); setTitle('');
    setPortraitUrl(''); setBiography(''); setWorks([]); setIsMinor(false);
    setImageUrl(''); setFullDetail(''); setTimeRange(''); setCapital('');
  };

  const addWork = () => setWorks([...works, { id: Math.random().toString(36).substring(2, 11), title: '', content: '' }]);
  const updateWork = (idx: number, field: keyof WorkItem, val: string) => {
    const next = [...works];
    next[idx] = { ...next[idx], [field]: val };
    setWorks(next);
  };
  const removeWork = (idx: number) => setWorks(works.filter((_, i) => i !== idx));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    let type: any = 'event';
    let targetSubId = '';
    let payload: any = {};

    if (dynastyToEdit) {
      type = 'dynasty';
      targetSubId = dynastyToEdit.id;
      payload = { ...dynastyToEdit, name, timeRange, capital };
    } else if (achievement) {
      type = 'achievement';
      targetSubId = achievement.title;
      payload = { ...achievement, title: name, description: details };
    } else if (work) {
      type = 'work';
      targetSubId = work.id;
      payload = { ...work, title: name, content: details, fullDetail, imageUrl };
    } else if (figure) {
      type = 'figure';
      targetSubId = figure.id;
      payload = { id: figure.id, name, title, biography, portraitUrl, works };
    } else {
      type = 'event';
      targetSubId = event?.id || '';
      payload = { id: event?.id || Math.random().toString(36).substr(2, 5), name, year, month: month || '不详', details, isMinor, category: event?.category || 'political' };
    }

    const submission: Submission = {
      id: Math.random().toString(36).substr(2, 9),
      authorId: user.id,
      authorName: user.username,
      timestamp: Date.now(),
      type: type as Submission['type'],
      action: (event || figure || work || achievement || dynastyToEdit) ? 'edit' : 'add',
      targetId: dynasty.id,
      targetSubId,
      status: 'pending',
      changeSummary: summary,
      payload
    };

    onSubmit(submission);
    onClose();
  };

  const handleDiscard = () => {
    if (confirm('是否放弃本次修订？未提交的内容将会丢失。')) {
      onClose();
    }
  };

  const getTitle = () => {
    if (dynastyToEdit) return `修订朝代概览 - ${name}`;
    if (achievement) return `修订朝代成就 - ${dynasty.name}`;
    if (work) return `修订关联事物 - ${name}`;
    if (figure) return `修订人物志 - ${dynasty.name}`;
    if (event) return `订补旧志 - ${dynasty.name}`;
    return `撰修新章 - ${dynasty.name}`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[400] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#1F2A3C]/80 backdrop-blur-md"
          />
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="relative bg-white dark:bg-[#1A1A1A] w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
          >
            <div className="p-6 border-b border-[#E5E8F0] flex justify-between items-center bg-gray-50 dark:bg-[#111]">
              <div>
                <h2 className="text-xl font-bold text-[#1F2A3C] dark:text-white">{getTitle()}</h2>
                <p className="text-xs text-[#6B778C]">史料修订需经大内史官复核</p>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-white rounded-full transition-all">✕</button>
            </div>

            <form onSubmit={handleSubmit} className="p-8 overflow-y-auto space-y-8 no-scrollbar">
              {dynastyToEdit ? (
                <div className="space-y-6">
                   <div>
                    <label className="block text-xs font-bold text-[#434D5C] mb-2">朝代称谓</label>
                    <input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full px-4 py-2 border rounded-lg dark:bg-[#111] dark:border-[#333] dark:text-white" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#434D5C] mb-2">起讫时间</label>
                    <input type="text" value={timeRange} onChange={e => setTimeRange(e.target.value)} className="w-full px-4 py-2 border rounded-lg dark:bg-[#111] dark:border-[#333] dark:text-white" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#434D5C] mb-2">都城</label>
                    <input type="text" value={capital} onChange={e => setCapital(e.target.value)} className="w-full px-4 py-2 border rounded-lg dark:bg-[#111] dark:border-[#333] dark:text-white" />
                  </div>
                </div>
              ) : (achievement || work) ? (
                /* Work/Achievement Fields */
                <div className="space-y-6">
                   <div>
                    <label className="block text-xs font-bold text-[#434D5C] mb-2 uppercase">名称 (Title)</label>
                    <input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full px-4 py-2 border rounded-lg dark:bg-[#111] dark:border-[#333] dark:text-white" />
                  </div>
                  {work && (
                    <div>
                      <label className="block text-xs font-bold text-[#434D5C] mb-2 uppercase">配图链接 (Image URL)</label>
                      <input type="text" value={imageUrl} onChange={e => setImageUrl(e.target.value)} className="w-full px-4 py-2 border rounded-lg dark:bg-[#111] dark:border-[#333] dark:text-white" />
                    </div>
                  )}
                  <div>
                    <label className="block text-xs font-bold text-[#434D5C] mb-2 uppercase">简述 (Description)</label>
                    <textarea rows={2} value={details} onChange={e => setDetails(e.target.value)} className="w-full px-4 py-2 border rounded-lg dark:bg-[#111] dark:border-[#333] dark:text-white resize-none text-sm" />
                  </div>
                  {work && (
                    <div>
                      <label className="block text-xs font-bold text-[#434D5C] mb-2 uppercase">详述内容 (Full Detail)</label>
                      <textarea rows={5} value={fullDetail} onChange={e => setFullDetail(e.target.value)} className="w-full px-4 py-3 border rounded-lg dark:bg-[#111] dark:border-[#333] dark:text-white resize-none text-sm leading-relaxed" />
                    </div>
                  )}
                </div>
              ) : figure ? (
                /* Figure Fields */
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-[#434D5C] mb-2">名号 (Name)</label>
                      <input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full px-4 py-2 border rounded-lg dark:bg-[#111] dark:border-[#333] dark:text-white" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#434D5C] mb-2">尊号/职衔 (Title)</label>
                      <input type="text" value={title} onChange={e => setTitle(e.target.value)} className="w-full px-4 py-2 border rounded-lg dark:bg-[#111] dark:border-[#333] dark:text-white" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#434D5C] mb-2">肖像图链接</label>
                    <input type="text" value={portraitUrl} onChange={e => setPortraitUrl(e.target.value)} className="w-full px-4 py-2 border rounded-lg dark:bg-[#111] dark:border-[#333] dark:text-white" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#434D5C] mb-2">详细生平</label>
                    <textarea rows={6} value={biography} onChange={e => setBiography(e.target.value)} className="w-full px-4 py-3 border rounded-lg dark:bg-[#111] dark:border-[#333] dark:text-white resize-none text-sm" />
                  </div>
                </div>
              ) : (
                /* Event Fields */
                <div className="space-y-6">
                  <div className="grid grid-cols-3 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-[#434D5C] mb-2">纪年/年份</label>
                      <input type="text" value={year} onChange={e => setYear(e.target.value)} className="w-full px-4 py-2 border rounded-lg dark:bg-[#111] dark:border-[#333] dark:text-white" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#434D5C] mb-2">月份/时令</label>
                      <input type="text" value={month} onChange={e => setMonth(e.target.value)} className="w-full px-4 py-2 border rounded-lg dark:bg-[#111] dark:border-[#333] dark:text-white" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#434D5C] mb-2">事件名称</label>
                      <input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full px-4 py-2 border rounded-lg dark:bg-[#111] dark:border-[#333] dark:text-white" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#434D5C] mb-2">史事详情</label>
                    <textarea rows={4} value={details} onChange={e => setDetails(e.target.value)} className="w-full px-4 py-3 border rounded-lg dark:bg-[#111] dark:border-[#333] dark:text-white resize-none text-sm" />
                  </div>
                </div>
              )}

              <div className="bg-[#E6F7FF]/50 p-5 rounded-xl border border-[#1677FF]/20">
                <label className="block text-xs font-bold text-[#1677FF] mb-2">修订陈情 (必填理由)</label>
                <input type="text" required value={summary} onChange={(e) => setSummary(e.target.value)} placeholder="为什么要进行此次修订？" className="w-full px-4 py-2 border border-[#1677FF]/30 rounded-lg outline-none focus:border-[#1677FF]" />
              </div>

              <div className="flex justify-end gap-3 pt-6">
                <button type="button" onClick={handleDiscard} className="px-6 py-2 text-sm text-[#FF4D4F] border border-[#FF4D4F] rounded-full hover:bg-[#FFF1F0] transition-colors">舍弃</button>
                <button type="submit" className="px-10 py-2 bg-[#1677FF] text-white rounded-full font-bold shadow-lg shadow-[#1677FF]/20">提交审核</button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default EditSubmissionModal;
