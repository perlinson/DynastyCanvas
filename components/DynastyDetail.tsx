
import React, { useState, useMemo } from 'react';
import { motion as motionBase, AnimatePresence } from 'framer-motion';
const motion = motionBase as any;
import { Dynasty, KeyFigure, KeyEvent, EventCategory, Achievement, WorkItem } from '../types';
import Tooltip, { TooltipType } from './Tooltip';
import FigureDetail from './FigureDetail';
import MapViewer from './MapViewer';
import ShareCard from './ShareCard';

interface DynastyDetailProps {
  dynasty: Dynasty;
  isLoggedIn: boolean;
  onBack: () => void;
  onCompare: () => void;
  onEditDynasty: (dynasty: Dynasty) => void;
  onEditItem: (event?: KeyEvent) => void;
  onEditFigure: (figure: KeyFigure) => void;
  onEditAchievement: (ach: Achievement) => void;
  onEditWork: (work: WorkItem, figure: KeyFigure) => void;
}

const CategoryLabel: Record<string, string> = {
  all: '全部总览',
  political: '政治军事',
  military: '战争征伐',
  cultural: '文化艺术',
  economic: '社会经济',
  scientific: '科学技术',
  medical: '医学卫生',
  astronomical: '天文历法',
  geographical: '地理环境'
};

const ITEMS_PER_PAGE_TIMELINE = 5;
const ITEMS_PER_PAGE_GRID = 9;

const DynastyDetail: React.FC<DynastyDetailProps> = ({ 
  dynasty, isLoggedIn, onBack, onCompare, onEditDynasty, onEditItem, onEditFigure, onEditAchievement, onEditWork 
}) => {
  const [hoveredNode, setHoveredNode] = useState<{title: string, content: string, type: TooltipType, imageUrl?: string, x: number, y: number} | null>(null);
  const [selectedFigure, setSelectedFigure] = useState<KeyFigure | null>(null);
  const [activeCategory, setActiveCategory] = useState<EventCategory | 'all'>('all');
  const [viewMode, setViewMode] = useState<'timeline' | 'grid'>('timeline');
  const [showMap, setShowMap] = useState(false);
  const [showShare, setShowShare] = useState(false);
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);

  const filteredEvents = useMemo(() => {
    let events = activeCategory === 'all' 
      ? dynasty.keyEvents 
      : dynasty.keyEvents.filter(e => e.category === activeCategory);
    
    return [...events].sort((a, b) => {
      const yearA = parseInt(a.year.replace(/[^0-9-]/g, '')) || 0;
      const yearB = parseInt(b.year.replace(/[^0-9-]/g, '')) || 0;
      if (yearA !== yearB) return yearA - yearB;
      return (a.isMinor ? 1 : 0) - (b.isMinor ? 0 : 1);
    });
  }, [dynasty.keyEvents, activeCategory]);

  const itemsPerPage = viewMode === 'timeline' ? ITEMS_PER_PAGE_TIMELINE : ITEMS_PER_PAGE_GRID;
  const totalPages = Math.max(1, Math.ceil(filteredEvents.length / itemsPerPage));
  const currentItems = filteredEvents.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const filteredAchievements = useMemo(() => {
    return activeCategory === 'all'
      ? dynasty.achievements
      : dynasty.achievements.filter(a => a.category === activeCategory);
  }, [dynasty.achievements, activeCategory]);

  const handleMouseEnter = (e: React.MouseEvent, event: KeyEvent) => {
    setHoveredNode({ 
      title: event.name, 
      content: event.details, 
      type: (event.category as TooltipType) || 'event', 
      imageUrl: event.imageUrl, 
      x: e.clientX + 10, 
      y: e.clientY + 10 
    });
  };

  const handleMouseLeave = () => setHoveredNode(null);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    const mainEl = document.getElementById('scroll-target');
    if (mainEl) mainEl.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex h-screen bg-[#F7F9FC] dark:bg-[#0A0A0A] overflow-hidden" onMouseMove={(e) => {
       if (hoveredNode) setHoveredNode(prev => prev ? { ...prev, x: e.clientX + 10, y: e.clientY + 10 } : null);
    }}>
      <Tooltip 
        isVisible={!!hoveredNode}
        title={hoveredNode?.title || ''}
        content={hoveredNode?.content || ''}
        type={hoveredNode?.type}
        imageUrl={hoveredNode?.imageUrl}
        x={hoveredNode?.x || 0}
        y={hoveredNode?.y || 0}
      />

      <AnimatePresence>
        {showMap && <MapViewer dynasty={dynasty} onClose={() => setShowMap(false)} />}
        {showShare && <ShareCard dynasty={dynasty} onClose={() => setShowShare(false)} />}
      </AnimatePresence>

      <FigureDetail 
        figure={selectedFigure} 
        isLoggedIn={isLoggedIn} 
        onClose={() => setSelectedFigure(null)} 
        onEdit={(f) => { setSelectedFigure(null); onEditFigure(f); }} 
        onEditWork={onEditWork}
      />

      {/* Sider */}
      <aside className="w-[200px] border-r border-[#E5E8F0] dark:border-[#222] bg-white dark:bg-[#111] flex flex-col z-20">
        <div className="h-16 flex items-center px-6 border-b border-[#E5E8F0] dark:border-[#222]">
          <h2 className="font-calligraphy text-2xl text-[#1677FF]">史册视域</h2>
        </div>
        <nav className="flex-1 py-4 overflow-y-auto no-scrollbar">
          {(['all', 'political', 'military', 'cultural', 'economic', 'scientific', 'medical', 'astronomical', 'geographical'] as const).map(cat => (
            <button 
              key={cat}
              onClick={() => { setActiveCategory(cat); setCurrentPage(1); }}
              className={`w-full px-6 py-3 text-left text-sm transition-all flex items-center gap-3 ${
                activeCategory === cat 
                ? 'bg-[#E6F7FF] text-[#1677FF] border-l-[3px] border-[#1677FF] font-medium' 
                : 'text-[#434D5C] hover:bg-[#F5F5F5] dark:text-[#CCC] dark:hover:bg-[#222]'
              }`}
            >
              <div className={`w-2 h-2 rounded-full cat-${cat} border`}></div>
              {CategoryLabel[cat]}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-[#E5E8F0] dark:border-[#222]">
          <button onClick={onBack} className="w-full py-2 text-sm text-[#6B778C] hover:text-[#1677FF] flex items-center justify-center gap-2">
            <span>← 返回卷轴</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        <header className="h-16 px-8 border-b border-[#E5E8F0] dark:border-[#222] bg-white dark:bg-[#111] flex items-center justify-between z-10 shadow-sm">
          <div className="flex items-center gap-6">
             <div className="flex items-center gap-4 group">
                <h1 className="font-calligraphy text-4xl text-[#1F2A3C] dark:text-white">{dynasty.name}</h1>
                {isLoggedIn && (
                  <button 
                    onClick={() => onEditDynasty(dynasty)}
                    className="w-8 h-8 rounded-full bg-[#B22222] text-[#F4EBD0] flex items-center justify-center font-calligraphy text-lg opacity-0 group-hover:opacity-100 transition-all shadow-lg border border-[#F4EBD0]/20"
                    title="修订朝代概览"
                  >修</button>
                )}
                <span className="text-xs text-[#6B778C] font-ancient bg-[#F0F2F5] px-2 py-0.5 rounded">{dynasty.timeRange}</span>
             </div>
             <div className="flex bg-gray-100 dark:bg-[#222] p-1 rounded-lg">
                <button 
                  onClick={() => { setViewMode('timeline'); setCurrentPage(1); }}
                  className={`px-3 py-1 text-xs rounded-md transition-all ${viewMode === 'timeline' ? 'bg-white dark:bg-[#333] shadow-sm font-bold text-[#1677FF]' : 'text-gray-500'}`}
                >大事记</button>
                <button 
                  onClick={() => { setViewMode('grid'); setCurrentPage(1); }}
                  className={`px-3 py-1 text-xs rounded-md transition-all ${viewMode === 'grid' ? 'bg-white dark:bg-[#333] shadow-sm font-bold text-[#1677FF]' : 'text-gray-500'}`}
                >风云录</button>
             </div>
          </div>
          <div className="flex items-center gap-3">
             <button onClick={onCompare} className="px-4 py-1.5 text-sm border border-[#1677FF] text-[#1677FF] rounded hover:bg-[#E6F7FF] transition-colors">朝代对比</button>
             <button onClick={() => setShowMap(true)} className="px-4 py-1.5 text-sm bg-[#1677FF] text-white rounded hover:bg-[#4096FF] shadow-sm transition-colors">查看疆域</button>
          </div>
        </header>

        <div className="flex-1 flex overflow-hidden">
          <section id="scroll-target" className="flex-1 overflow-y-auto p-8 bg-[#F7F9FC] dark:bg-[#0A0A0A] no-scrollbar">
            {viewMode === 'timeline' ? (
              <div className="max-w-4xl mx-auto">
                <div className="mb-10 flex justify-between items-end">
                   <div>
                     <h3 className="text-xl font-bold text-[#1F2A3C] dark:text-white mb-1">大事年表 - {CategoryLabel[activeCategory]}</h3>
                     <p className="text-xs text-[#6B778C]">第 {currentPage} 册 / 共 {totalPages} 册</p>
                   </div>
                   {isLoggedIn && (
                      <button onClick={() => onEditItem()} className="px-3 py-1 bg-[#52C41A] text-white rounded-full text-xs font-bold">撰新史</button>
                   )}
                </div>

                <div className="relative border-l-2 border-[#E5E8F0] dark:border-[#222] ml-8 pl-12 space-y-12">
                  {currentItems.length > 0 ? currentItems.map((event) => (
                    <motion.div 
                      key={event.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={`relative group ${event.isMinor ? 'opacity-80' : ''}`}
                      onMouseEnter={(e) => handleMouseEnter(e, event)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <div className={`absolute -left-[54px] top-1.5 w-6 h-6 rounded-full bg-white dark:bg-black border-4 z-10 transition-all group-hover:scale-125 cat-${event.category} shadow-sm`}></div>
                      
                      <div className={`bg-white dark:bg-[#111] p-6 rounded-2xl shadow-sm border border-[#E5E8F0] dark:border-[#222] hover:shadow-xl transition-all hover:border-[#1677FF]/30 relative overflow-hidden`}>
                         {/* Edit button at bottom-right */}
                         {isLoggedIn && (
                           <button 
                             onClick={(e) => { e.stopPropagation(); onEditItem(event); }} 
                             className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-[#B22222] text-[#F4EBD0] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all font-calligraphy text-lg shadow-xl translate-y-2 group-hover:translate-y-0"
                             title="修订此条目"
                           >修</button>
                         )}

                         <div className="flex items-baseline gap-3 mb-3">
                           <span className="text-sm font-bold text-[#1677FF] tracking-tighter">{event.year}{event.month && event.month !== '不详' ? ` · ${event.month}` : ''}</span>
                           <span className={`text-[9px] px-1.5 border rounded uppercase ${event.isMinor ? 'border-gray-300 text-gray-400' : 'border-[#1677FF] text-[#1677FF] font-bold'}`}>
                              {event.isMinor ? '小项' : '要闻'}
                           </span>
                         </div>
                         <h4 className={`font-calligraphy mb-3 group-hover:text-[#1677FF] transition-colors ${event.isMinor ? 'text-xl' : 'text-3xl'}`}>{event.name}</h4>
                         <p className="text-sm text-[#434D5C] dark:text-[#AAA] leading-relaxed line-clamp-2">{event.description}</p>
                      </div>
                    </motion.div>
                  )) : (
                    <div className="py-20 text-center text-gray-400 italic">暂无此类史实记载</div>
                  )}
                </div>
              </div>
            ) : (
              <div className="max-w-6xl mx-auto">
                <div className="mb-10 flex justify-between items-end">
                   <div>
                     <h3 className="text-xl font-bold text-[#1F2A3C] dark:text-white mb-1">史料风云录</h3>
                     <p className="text-xs text-[#6B778C]">第 {currentPage} 页 / 共 {totalPages} 页</p>
                   </div>
                   {isLoggedIn && (
                      <button onClick={() => onEditItem()} className="px-3 py-1 bg-[#52C41A] text-white rounded-full text-xs font-bold">撰新史</button>
                   )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                   {currentItems.map(event => (
                     <motion.div 
                       key={event.id}
                       whileHover={{ y: -5 }}
                       onMouseEnter={(e) => handleMouseEnter(e, event)}
                       onMouseLeave={handleMouseLeave}
                       className="bg-white dark:bg-[#111] rounded-2xl p-6 border border-[#E5E8F0] shadow-sm relative group cursor-pointer h-56 flex flex-col justify-between overflow-hidden"
                     >
                        <div className={`w-1 h-12 absolute left-0 top-6 rounded-r-lg cat-${event.category}`}></div>
                        <div>
                          <div className="text-xs text-[#1677FF] font-bold mb-2">{event.year}</div>
                          <h4 className="font-calligraphy text-2xl mb-3 line-clamp-1">{event.name}</h4>
                          <p className="text-xs text-gray-500 line-clamp-4">{event.description}</p>
                        </div>
                        {isLoggedIn && (
                           <button 
                            onClick={(e) => { e.stopPropagation(); onEditItem(event); }} 
                            className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-[#B22222] text-white font-calligraphy text-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0 shadow-lg"
                           >修</button>
                        )}
                     </motion.div>
                   ))}
                </div>
              </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-16 flex items-center justify-center gap-4 font-ancient">
                <button 
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                  className="px-6 py-2 border border-[#8B4513] text-[#8B4513] rounded-full hover:bg-[#8B4513] hover:text-white disabled:opacity-30 transition-all"
                >{viewMode === 'timeline' ? '前一册' : '前一页'}</button>
                <div className="flex items-center gap-2">
                   {Array.from({ length: totalPages }).map((_, i) => (
                     <button 
                      key={i} 
                      onClick={() => handlePageChange(i + 1)}
                      className={`w-10 h-10 rounded-full border transition-all ${currentPage === i + 1 ? 'bg-[#1677FF] text-white border-[#1677FF] font-bold shadow-md' : 'border-[#E5E8F0] text-gray-500 hover:border-[#1677FF]'}`}
                     >{i + 1}</button>
                   ))}
                </div>
                <button 
                  disabled={currentPage === totalPages}
                  onClick={() => handlePageChange(currentPage + 1)}
                  className="px-6 py-2 border border-[#8B4513] text-[#8B4513] rounded-full hover:bg-[#8B4513] hover:text-white disabled:opacity-30 transition-all"
                >{viewMode === 'timeline' ? '下一册' : '下一页'}</button>
              </div>
            )}
          </section>

          {/* Right Panel */}
          <aside className="w-[320px] border-l border-[#E5E8F0] dark:border-[#222] bg-white dark:bg-[#111] overflow-y-auto p-6 space-y-10 no-scrollbar">
            <div>
              <h3 className="text-sm font-bold text-[#1F2A3C] dark:text-white mb-6 flex items-center gap-2">
                <div className="w-1 h-4 bg-[#1677FF] rounded"></div>
                风云人物
              </h3>
              <div className="space-y-4">
                {dynasty.keyFigures.map(figure => (
                  <div key={figure.id} className="relative group">
                     <button 
                      onClick={() => setSelectedFigure(figure)}
                      className="w-full group text-left p-4 rounded-lg border border-[#E5E8F0] dark:border-[#222] hover:border-[#1677FF] transition-all bg-[#F9FBFF] dark:bg-[#1A1A1A] relative"
                    >
                      <div className="font-calligraphy text-xl text-[#1F2A3C] dark:text-white group-hover:text-[#1677FF]">{figure.name}</div>
                      <div className="text-xs text-[#6B778C] mt-1 line-clamp-1">{figure.title}</div>
                      
                      {isLoggedIn && (
                        <div 
                          onClick={(e) => { e.stopPropagation(); onEditFigure(figure); }}
                          className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#B22222] text-white font-calligraphy text-sm items-center justify-center hidden group-hover:flex shadow-md hover:scale-110"
                          title="修订人物志"
                        >修</div>
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold text-[#1F2A3C] dark:text-white mb-6 flex items-center gap-2">
                <div className="w-1 h-4 bg-[#52C41A] rounded"></div>
                视域成就
              </h3>
              <div className="space-y-4">
                {filteredAchievements.map(ach => (
                  <div 
                    key={ach.title} 
                    className="p-4 rounded-lg border-l-[4px] bg-[#F7F9FC] dark:bg-[#1A1A1A] border-[#E5E8F0] relative group"
                    style={{ borderLeftColor: `var(--cat-${ach.category})` }}
                  >
                    <div className="text-xs font-bold text-[#1F2A3C] dark:text-white mb-1">{ach.title}</div>
                    <p className="text-[11px] text-[#6B778C] leading-relaxed">{ach.description}</p>
                    
                    {isLoggedIn && (
                      <button 
                        onClick={() => onEditAchievement(ach)}
                        className="absolute bottom-2 right-2 w-7 h-7 bg-[#B22222] text-white font-calligraphy text-xs flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                      >修</button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default DynastyDetail;
