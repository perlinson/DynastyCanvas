
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Dynasty, KeyFigure, KeyEvent } from '../types';
import Tooltip, { TooltipType } from './Tooltip';
import FigureDetail from './FigureDetail';

interface DynastyDetailProps {
  dynasty: Dynasty;
  onBack: () => void;
}

const DynastyDetail: React.FC<DynastyDetailProps> = ({ dynasty, onBack }) => {
  const [hoveredNode, setHoveredNode] = useState<{title: string, content: string, type: TooltipType, x: number, y: number} | null>(null);
  const [selectedFigure, setSelectedFigure] = useState<KeyFigure | null>(null);

  const handleMouseEnter = (e: React.MouseEvent, title: string, content: string, type: TooltipType) => {
    setHoveredNode({
      title,
      content,
      type,
      x: e.clientX + 10,
      y: e.clientY + 10
    });
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

      <FigureDetail 
        figure={selectedFigure} 
        onClose={() => setSelectedFigure(null)} 
      />

      {/* Navigation */}
      <motion.button
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        onClick={onBack}
        className="fixed top-8 left-8 z-50 px-6 py-2 border-2 border-[#8B4513] text-[#8B4513] font-calligraphy text-xl hover:bg-[#8B4513] hover:text-[#F4EBD0] transition-colors"
      >
        卷轴归位
      </motion.button>

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
        
        {/* Left: Info Panel */}
        <div className="lg:col-span-4 space-y-8">
          <div className="border-2 border-[#8B4513] p-6 relative bg-white/10">
            <h2 className="font-calligraphy text-3xl text-[#B22222] mb-6 border-b border-[#8B4513]/30 pb-2">朝代概览</h2>
            <div className="space-y-4">
              <div 
                className="flex items-center gap-4 cursor-help"
                onMouseEnter={(e) => handleMouseEnter(e, "开国皇帝", `建立者：${dynasty.founder}`, 'founder')}
                onMouseLeave={handleMouseLeave}
              >
                <span className="font-calligraphy text-xl text-[#8B4513] w-20">开国：</span>
                <span className="font-ancient text-lg">{dynasty.founder}</span>
              </div>
              <div 
                className="flex items-center gap-4 cursor-help"
                onMouseEnter={(e) => handleMouseEnter(e, "都城", `核心政治中心：${dynasty.capital}`, 'location')}
                onMouseLeave={handleMouseLeave}
              >
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
            <p className="font-ancient text-xs text-[#8B4513]/60 mb-6 tracking-wider">点击名号查看人物生平</p>
            <div className="grid grid-cols-1 gap-4">
              {dynasty.keyFigures.map(figure => (
                <button 
                  key={figure.name} 
                  onClick={() => setSelectedFigure(figure)}
                  className="group flex flex-col items-start p-3 border border-[#8B4513]/20 hover:border-[#B22222] hover:bg-[#B22222]/5 transition-all text-left"
                  onMouseEnter={(e) => handleMouseEnter(e, figure.name, "点击探寻其波澜壮阔的一生", 'figure')}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="font-calligraphy text-2xl text-[#1A1A1A] group-hover:text-[#B22222] transition-colors">
                    {figure.name}
                  </div>
                  <div className="font-ancient text-sm text-[#8B4513] opacity-80">{figure.title}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Center: Expanded Timeline of Events */}
        <div className="lg:col-span-5 relative">
          <div className="absolute left-4 top-0 bottom-0 w-1 bg-[#8B4513]/20"></div>
          <div className="flex items-center gap-4 mb-12 pl-12">
            <h2 className="font-calligraphy text-4xl text-[#B22222]">历代大事记</h2>
          </div>
          <div className="space-y-12 pl-12 pb-20">
            {dynasty.keyEvents.map((event, idx) => (
              <motion.div 
                key={event.id}
                initial={{ x: 20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5 }}
                className="relative group cursor-help"
                onMouseEnter={(e) => handleMouseEnter(e, event.name, event.details, 'event')}
                onMouseLeave={handleMouseLeave}
              >
                {/* Dot on line */}
                <div className="absolute -left-[37px] top-1.5 w-3 h-3 rounded-full bg-[#B22222] border-2 border-[#F4EBD0] z-10 transition-transform group-hover:scale-150"></div>
                
                <div className="bg-white/30 p-5 border-l-4 border-transparent hover:border-[#B22222] transition-all rounded-sm shadow-sm group-hover:shadow-md hover:translate-x-2 duration-300">
                   <div className="font-ancient text-[#8B4513] text-sm mb-1">{event.year}</div>
                   <div className="font-calligraphy text-3xl text-[#1A1A1A] mb-3 group-hover:text-[#B22222] transition-colors">{event.name}</div>
                   <p className="text-sm text-[#1A1A1A]/80 leading-relaxed">{event.description}</p>
                   
                   {/* Related Figures Mini-tags */}
                   {event.relatedFigures.length > 0 && (
                     <div className="mt-4 flex flex-wrap gap-2">
                       {event.relatedFigures.map(figName => (
                         <span key={figName} className="text-[10px] px-2 py-0.5 border border-[#8B4513]/30 text-[#8B4513] font-ancient">
                           {figName}
                         </span>
                       ))}
                     </div>
                   )}

                   {event.imageUrl && (
                     <div className="mt-4 overflow-hidden h-40 w-full rounded-sm opacity-60 group-hover:opacity-100 transition-opacity">
                        <img src={event.imageUrl} alt={event.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" />
                     </div>
                   )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right: Achievements Panel */}
        <div className="lg:col-span-3">
          <div className="sticky top-8 border-2 border-[#8B4513] p-6 h-fit bg-[#B22222]/5">
            <h2 className="font-calligraphy text-3xl text-[#B22222] mb-6 border-b border-[#8B4513]/30 pb-2">文明璀璨</h2>
            <div className="space-y-8">
              {dynasty.achievements.map(ach => (
                <div 
                  key={ach.title}
                  className="group cursor-help"
                  onMouseEnter={(e) => handleMouseEnter(e, ach.title, ach.description, 'achievement')}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="font-calligraphy text-xl text-[#3E2723] mb-1 group-hover:text-[#B22222] transition-colors">{ach.title}</div>
                  <p className="font-ancient text-sm text-[#8B4513]/80">{ach.description}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-12 pt-6 border-t border-[#8B4513]/30 flex flex-col items-center">
               <div className="w-16 h-16 border-2 border-[#8B4513]/20 rounded-full flex items-center justify-center mb-4">
                 <span className="font-calligraphy text-[#8B4513]/40 text-2xl">史</span>
               </div>
               <span className="font-calligraphy text-[#8B4513]/30 text-2xl select-none">万世师表</span>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Footer Pattern */}
      <div className="mt-24 py-20 border-t border-[#8B4513]/20 w-full opacity-20 flex items-center justify-around pointer-events-none">
        {Array.from({length: 6}).map((_, i) => (
          <div key={i} className="text-4xl font-calligraphy text-[#8B4513]">华夏万古长青</div>
        ))}
      </div>
    </div>
  );
};

export default DynastyDetail;
