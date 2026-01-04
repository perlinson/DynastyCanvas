
import React, { useState } from 'react';
import { motion as motionBase, AnimatePresence } from 'framer-motion';
const motion = motionBase as any;
import { User, UserRole } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: User) => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLogin }) => {
  const [isLoginView, setIsLoginView] = useState(true);
  const [username, setUsername] = useState('');
  const [role, setRole] = useState<UserRole>('user');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) return;
    
    const mockUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      username,
      role: username === 'admin' ? 'admin' : role
    };
    onLogin(mockUser);
    onClose();
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
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative bg-white dark:bg-[#1A1A1A] w-full max-w-sm rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="h-2 bg-[#1677FF]" />
            <div className="p-8">
              <div className="text-center mb-8">
                <h2 className="font-calligraphy text-4xl text-[#1F2A3C] dark:text-white mb-2">
                  {isLoginView ? '归席' : '立籍'}
                </h2>
                <p className="text-sm text-[#6B778C]">进入 DynastyCanvas 协作空间</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-[#434D5C] mb-2 uppercase tracking-wider">名号 (Username)</label>
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="请输入您的名号..."
                    className="w-full px-4 py-3 bg-[#F7F9FC] dark:bg-[#111] border border-[#E5E8F0] dark:border-[#333] rounded-lg focus:border-[#1677FF] focus:ring-1 focus:ring-[#1677FF] outline-none transition-all"
                  />
                  <p className="mt-2 text-[10px] text-[#6B778C]">提示: 输入 'admin' 自动识别为管理员</p>
                </div>

                {!isLoginView && (
                  <div>
                    <label className="block text-xs font-bold text-[#434D5C] mb-2 uppercase tracking-wider">职责 (Role)</label>
                    <select 
                      value={role}
                      onChange={(e) => setRole(e.target.value as UserRole)}
                      className="w-full px-4 py-3 bg-[#F7F9FC] dark:bg-[#111] border border-[#E5E8F0] dark:border-[#333] rounded-lg outline-none"
                    >
                      <option value="user">普通修史官 (Contributor)</option>
                      <option value="admin">大内史官 (Admin)</option>
                    </select>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-3 bg-[#1677FF] text-white rounded-lg font-bold hover:bg-[#4096FF] shadow-lg shadow-[#1677FF]/20 transition-all"
                >
                  {isLoginView ? '进入系统' : '创建账号'}
                </button>
              </form>

              <div className="mt-6 text-center">
                <button 
                  onClick={() => setIsLoginView(!isLoginView)}
                  className="text-sm text-[#1677FF] hover:underline"
                >
                  {isLoginView ? '尚无名号？前往立籍' : '已有账号？立即归席'}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;
