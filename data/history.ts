
import { Dynasty } from '../types';

export const DYNASTIES: Dynasty[] = [
  {
    id: "xia",
    name: "夏朝",
    timeRange: "约前2070-前1600",
    duration: 470,
    founder: "禹",
    capital: "阳城",
    characteristics: ["世袭制", "青铜器萌芽"],
    sealText: "大夏",
    mapUrl: "https://images.unsplash.com/photo-1599409677335-446718cca6d1?q=80&w=1000",
    keyEvents: [
      { id: "xia_1", year: "前2070", name: "大禹治水", category: "geographical", description: "治水定九州", details: "禹改堵为疏，治理洪水，划定天下为九州，奠定华夏地理雏形。", relatedFigures: ["禹"] },
      { id: "xia_2", year: "前1600", name: "鸣条之战", category: "military", description: "商汤灭夏", details: "夏桀暴虐，商汤率诸侯在鸣条击败夏军，夏朝灭亡。", relatedFigures: ["汤", "桀"] }
    ],
    keyFigures: [
      { id: "f_xia_1", name: "禹", title: "夏太祖", description: "治水之功", biography: "姒姓，名文命。领导人民治理洪水，三过家门而不入。建立了中国历史上第一个世袭制朝代。", portraitUrl: "https://images.unsplash.com/photo-1579546673336-0370428d002a?q=80&w=400" }
    ],
    achievements: [
      { title: "夏历", description: "最早的农业历法", category: "astronomical" },
      { title: "二里头文化", description: "早期青铜文明", category: "scientific" }
    ]
  },
  {
    id: "shang",
    name: "商朝",
    timeRange: "约前1600-前1046",
    duration: 554,
    founder: "汤",
    capital: "殷",
    characteristics: ["甲骨文", "青铜盛世"],
    sealText: "大商",
    mapUrl: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?q=80&w=1000",
    keyEvents: [
      { id: "shang_1", year: "前1300", name: "盘庚迁殷", category: "political", description: "定都中原", details: "商王盘庚迁都于殷，从此商朝进入稳定发展的鼎盛时期。", relatedFigures: ["盘庚"] },
      { id: "shang_2", year: "前1250", name: "妇好征伐", category: "military", description: "女帅克敌", details: "商王武丁之妻妇好率军征讨鬼方、羌方，扩大商朝疆域。", relatedFigures: ["妇好", "武丁"] }
    ],
    keyFigures: [
      { id: "f_shang_1", name: "妇好", title: "王后/统帅", description: "首位女军事家", biography: "商王武丁之妻。不仅主持祭祀，更统领万余大军征战，是中国历史上最早有文字记载的女将军。", portraitUrl: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?q=80&w=400", works: [{ id: "w_shang_1", title: "妇好墓青铜器", content: "出土大量刻有其名的精美青铜器，见证商代鼎盛国力。" }] }
    ],
    achievements: [
      { title: "甲骨文", description: "成熟文字体系", category: "cultural" },
      { title: "司母戊鼎", description: "青铜铸造顶峰", category: "scientific" }
    ]
  },
  {
    id: "tang",
    name: "唐朝",
    timeRange: "618-907",
    duration: 289,
    founder: "李渊",
    capital: "长安",
    characteristics: ["贞观之治", "开元盛世", "诗歌巅峰"],
    sealText: "大唐",
    mapUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1000",
    keyEvents: [
      { id: "t_1", year: "626", name: "玄武门之变", category: "political", description: "李世民夺嫡", details: "秦王李世民发动政变，杀太子李建成，后登基开启贞观之治。", relatedFigures: ["李世民"] },
      { id: "t_4", year: "755", name: "安史之乱", category: "military", description: "盛唐终结", details: "安禄山起兵反唐，持续八年，唐朝由盛转衰。", relatedFigures: ["唐玄宗", "安禄山"] }
    ],
    keyFigures: [
      { 
        id: "f_tang_1", 
        name: "孙思邈", 
        title: "药王", 
        description: "医德高尚，百岁名医", 
        biography: "唐代医药学家。自幼多病，钻研医药。集唐以前医学之大成，被尊为药王。其著作对后世影响深远，不仅在于药方，更在于医德规范的建立。", 
        portraitUrl: "https://images.unsplash.com/photo-1504439468489-c8920d796a29?q=80&w=400", 
        works: [
          { 
            id: "w_tang_1",
            title: "《千金要方》", 
            content: "中医百科全书，载药方五千余首。",
            fullDetail: "全称《备急千金要方》，共三十卷。孙思邈认为“人命至重，有贵千金，一方济之，德逾于此”，故名。书中涵盖内、外、妇、儿各科，并系统阐述了“大医精诚”的医德思想。是中国最早的临床医学百科全书。",
            imageUrl: "https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=600"
          }
        ] 
      }
    ],
    achievements: [
      { title: "唐诗", description: "中国文学巅峰", category: "cultural" }
    ]
  },
  {
    id: "ming",
    name: "明朝",
    timeRange: "1368-1644",
    duration: 276,
    founder: "朱元璋",
    capital: "南京/北京",
    characteristics: ["集权巅峰", "航海壮举"],
    sealText: "大明",
    mapUrl: "https://images.unsplash.com/photo-1508193638397-1c4234db14d8?q=80&w=1000",
    keyEvents: [
      { id: "m_1", year: "1405", name: "郑和下西洋", category: "geographical", description: "航海壮举", details: "郑和率庞大船队七下西洋，足迹远达红海与非洲东岸。", relatedFigures: ["郑和"] }
    ],
    keyFigures: [
      { id: "f_ming_1", name: "李时珍", title: "医圣", description: "本草纲目", biography: "明代医药学家。亲历深山采集标本，纠正古医书错误，惠及万世。", portraitUrl: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=400", works: [{ id: "w_ming_1", title: "《本草纲目》", content: "总结明代以前药物学成就，收录药物1892种。" }] }
    ],
    achievements: [
      { title: "天工开物", description: "工业百科全书", category: "scientific" }
    ]
  }
];
