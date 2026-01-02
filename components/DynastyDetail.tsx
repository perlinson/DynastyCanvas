
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dynasty, KeyFigure, KeyEvent, EventCategory } from '../types';
import Tooltip, { TooltipType } from './Tooltip';
import FigureDetail from './FigureDetail';
import MapViewer from './MapViewer';
import ShareCard from './ShareCard';

interface DynastyDetailProps {
  dynasty: Dynasty;
  onBack: () => void;
  onCompare: () => void;
}

const DynastyDetail: React.FC<DynastyDetailProps> = ({ dynasty, onBack, onCompare }) => {
  const [hoveredNode, setHoveredNode] = useState<{title: string, content: string, type: TooltipType, x: number, y: number} | null>(null);
  const [selectedFigure, setSelectedFigure] = useState<KeyFigure | null>(null);
  const [activeCategory, setActiveCategory] = useState<EventCategory | 'all'>('all');
  const [showMap, setShowMap] = useState(false);
  const [showShare, setShowShare] = useState(false);

  const filteredEvents = useMemo(() => {
    return activeCategory === 'all' 
      ? dynasty.keyEvents 
      : dynasty.keyEvents.filter(e => e.category === activeCategory);
  }, [dynasty.keyEvents, activeCategory]);

  const handleMouseEnter = (e: React.MouseEvent, title: string, content: string, type: TooltipType) => {
    setHoveredNode({ title, content, type, x: e.clientX + 10, y: e.clientY + 10 });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (hoveredNode) {
      setHoveredNode(prev => prev ? { ...prev, x: e.clientX + 10, y: e.clientY + 10 } : null);
    }
  };

  const handleMouseLeave = () => setHoveredNode(null);

  return (
    <div className="min-h-screen paper-bg relative p-8 md:p-16 overflow-y-auto" onMouseMove={handleMouseMove}>
      <Tooltip 
        isVisible={!!hoveredNode}
        title={hoveredNode?.title || ''}
        content={hoveredNode?.content || ''}
        type={hoveredNode?.type}
        x={hoveredNode?.x || 0}
        y={hoveredNode?.y || 0}
      />

      <AnimatePresence>
        {showMap && <MapViewer dynasty={dynasty} onClose={() => setShowMap(false)} />}
        {showShare && <ShareCard dynasty={dynasty} onClose={() => setShowShare(false)} />}
      </AnimatePresence>

      <FigureDetail figure={selectedFigure} onClose={() => setSelectedFigure(null)} />

      {/* Toolbar */}
      <div className="fixed top-8 left-8 z-50 flex gap-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={onBack}
          className="px-6 py-2 border-2 border-[#8B4513] text-[#8B4513] font-calligraphy text-xl hover:bg-[#8B4513] hover:text-[#F4EBD0] transition-colors"
        >
          卷轴归位
        </motion.button>
        <button onClick={onCompare} className="px-6 py-2 border-2 border-[#D4AF37] text-[#D4AF37] font-calligraphy text-xl hover:bg-[#D4AF37] hover:text-white transition-colors">鉴古对比</button>
      </div>

      <div className="fixed top-8 right-8 z-50 flex gap-4">
        <button onClick={() => setShowMap(true)} className="w-12 h-12 rounded-full bg-[#B22222] text-white flex items-center justify-center font-calligraphy text-xl shadow-lg">图</button>
        <button onClick={() => setShowShare(true)} className="w-12 h-12 rounded-full bg-[#D4AF37] text-white flex items-center justify-center font-calligraphy text-xl shadow-lg">印</button>
      </div>

      {/* Title Section */}
      <div className="text-center mb-16 relative">
        <motion.h1 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="font-calligraphy text-8xl md:text-9xl text-[#B22222] relative z-10"
        >
          {dynasty.name}
        </motion.h1>
        <div className="font-ancient text-2xl text-[#8B4513] mt-4 tracking-[0.5em]">{dynasty.timeRange}</div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-black/5 rounded-full blur-3xl -z-10"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-7xl mx-auto">
        {/* Info Panels (Existing) */}
        <div className="lg:col-span-4 space-y-8">
          <div className="border-2 border-[#8B4513] p-6 relative bg-white/10">
            <h2 className="font-calligraphy text-3xl text-[#B22222] mb-6 border-b border-[#8B4513]/30 pb-2">朝代概览</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4 cursor-help" onMouseEnter={(e) => handleMouseEnter(e, "开国", dynasty.founder, 'founder')} onMouseLeave={handleMouseLeave}>
                <span className="font-calligraphy text-xl text-[#8B4513] w-20">开国：</span>
                <span className="font-ancient text-lg">{dynasty.founder}</span>
              </div>
              <div className="flex items-center gap-4 cursor-help" onMouseEnter={(e) => handleMouseEnter(e, "都城", dynasty.capital, 'location')} onMouseLeave={handleMouseLeave}>
                <span className="font-calligraphy text-xl text-[#8B4513] w-20">都城：</span>
                <span className="font-ancient text-lg">{dynasty.capital}</span>
              </div>
              <div className="flex flex-wrap gap-2 pt-4">
                {dynasty.characteristics.map(c => (
                  <span key={c} className="px-3 py-1 bg-[#B22222] text-[#F4EBD0] text-xs font-ancient">{c}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="border-2 border-[#8B4513] p-6 bg-white/10">
            <h2 className="font-calligraphy text-3xl text-[#B22222] mb-4 border-b border-[#8B4513]/30 pb-2">重要人物</h2>
            <div className="grid grid-cols-1 gap-4">
              {dynasty.keyFigures.map(figure => (
                <button key={figure.name} onClick={() => setSelectedFigure(figure)} className="group flex flex-col items-start p-3 border border-[#8B4513]/20 hover:border-[#B22222] transition-all text-left">
                  <div className="font-calligraphy text-2xl text-[#1A1A1A] group-hover:text-[#B22222]">{figure.name}</div>
                  <div className="font-ancient text-sm text-[#8B4513] opacity-80">{figure.title}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Timeline with Filtering */}
        <div className="lg:col-span-5 relative">
          <div className="absolute left-4 top-0 bottom-0 w-1 bg-[#8B4513]/20"></div>
          
          <div className="sticky top-0 z-20 bg-[#F4EBD0] py-4 pl-12 flex gap-2 flex-wrap mb-12">
            {(['all', 'political', 'military', 'cultural', 'economic'] as const).map(cat => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1 border font-ancient text-sm transition-colors ${activeCategory === cat ? 'bg-[#B22222] text-white' : 'border-[#8B4513] text-[#8B4513] hover:bg-black/5'}`}
              >
                {cat === 'all' ? '全部' : cat === 'political' ? '政治' : cat === 'military' ? '军事' : cat === 'cultural' ? '文化' : '经济'}
              </button>
            ))}
          </div>

          <div className="space-y-12 pl-12 pb-20">
            {filteredEvents.map((event, idx) => (
              <motion.div 
                key={event.id}
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="relative group cursor-help"
                onMouseEnter={(e) => handleMouseEnter(e, event.name, event.details, 'event')}
                onMouseLeave={handleMouseLeave}
              >
                <div className={`absolute -left-[37px] top-1.5 w-3 h-3 rounded-full bg-[#B22222] border-2 border-[#F4EBD0] z-10 cat-${event.category}`}></div>
                <div className="bg-white/30 p-5 border-l-4 border-transparent hover:border-[#B22222] transition-all hover:translate-x-2">
                   <div className="font-ancient text-[#8B4513] text-sm mb-1">{event.year}</div>
                   <div className="font-calligraphy text-3xl text-[#1A1A1A] mb-3 group-hover:text-[#B22222]">{event.name}</div>
                   <p className="text-sm text-[#1A1A1A]/80">{event.description}</p>
                </div>
              </motion.div>
            ))}
            {filteredEvents.length === 0 && (
              <div className="text-center font-ancient text-[#8B4513]/50 py-20">暂无此类型记录</div>
            )}
          </div>
        </div>

        {/* Right Panel (Existing Achievements) */}
        <div className="lg:col-span-3">
          <div className="sticky top-8 border-2 border-[#8B4513] p-6 bg-[#B22222]/5">
            <h2 className="font-calligraphy text-3xl text-[#B22222] mb-6 border-b border-[#8B4513]/30 pb-2">文明璀璨</h2>
            <div className="space-y-8">
              {dynasty.achievements.map(ach => (
                <div key={ach.title} className="group cursor-help" onMouseEnter={(e) => handleMouseEnter(e, ach.title, ach.description, 'achievement')} onMouseLeave={handleMouseLeave}>
                  <div className="font-calligraphy text-xl text-[#3E2723] mb-1 group-hover:text-[#B22222]">{ach.title}</div>
                  <p className="font-ancient text-sm text-[#8B4513]/80">{ach.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DynastyDetail;
