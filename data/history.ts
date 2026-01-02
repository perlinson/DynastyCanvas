
import { Dynasty } from '../types';

export const DYNASTIES: Dynasty[] = [
  {
    id: "xia",
    name: "夏朝",
    timeRange: "约前2070年-前1600年",
    founder: "禹",
    capital: "阳城",
    characteristics: ["世袭制开端", "青铜器萌芽"],
    sealText: "夏",
    keyEvents: [
      { id: "xia_1", year: "前2070年", name: "大禹治水", description: "禹领导人民治理洪水，建立夏朝", details: "夏朝是中国史书中记载的第一个世袭制朝代。禹改禅让制为世袭制。", relatedFigures: ["禹"] },
      { id: "xia_2", year: "约前1600年", name: "鸣条之战", description: "商汤灭夏之战", details: "夏朝末代君主桀荒淫无度，商部落首领汤在鸣条击败夏军，夏朝灭亡。", relatedFigures: ["桀", "汤"] }
    ],
    keyFigures: [
      { name: "禹", title: "夏开国君主", description: "治水功臣", biography: "禹，姓姒，名文命。他领导人民治理黄河水患，三过家门而不入。后受舜禅让，建立夏朝，开创了王位世袭的先河。" },
      { name: "桀", title: "末代君主", description: "暴虐无道", biography: "夏桀，名履癸。他是历史上著名的暴君，荒淫无度，宠爱妹喜，最终导致夏朝被商所灭。" }
    ],
    achievements: [{ title: "青铜铸造", description: "开始进入青铜时代" }]
  },
  {
    id: "tang",
    name: "唐朝",
    timeRange: "618年-907年",
    founder: "李渊",
    capital: "长安",
    characteristics: ["开放包容", "诗歌盛世", "国力鼎盛"],
    sealText: "唐",
    keyEvents: [
      { 
        id: "tang_1", year: "618年", name: "大唐建国", description: "李渊于长安称帝", 
        details: "隋末天下大乱，太原留守李渊起兵，后废隋恭帝，建立唐朝。", 
        relatedFigures: ["李渊", "李世民"]
      },
      { 
        id: "tang_2", year: "626年", name: "玄武门之变", description: "李世民夺取政权", 
        details: "秦王李世民在玄武门发动政变，杀太子李建成。后登基为唐太宗。", 
        relatedFigures: ["李世民", "李建成", "李渊"]
      },
      { 
        id: "tang_3", year: "627年", name: "贞观之治", description: "唐朝第一个盛世", 
        details: "唐太宗吸取隋亡教训，政治清明，经济复苏。", 
        relatedFigures: ["李世民", "魏徵"]
      },
      { 
        id: "tang_4", year: "690年", name: "武周代唐", description: "武则天称帝", 
        details: "武则天改国号为周，是中国历史上唯一正统女皇帝。", 
        relatedFigures: ["武则天"]
      },
      { 
        id: "tang_5", year: "713年", name: "开元盛世", description: "唐朝全盛时期", 
        details: "唐玄宗前期励精图治，唐朝国力达到顶点。", 
        relatedFigures: ["唐玄宗", "姚崇"]
      },
      { 
        id: "tang_6", year: "755年", name: "安史之乱", description: "由盛转衰的转折点", 
        details: "安禄山、史思明叛乱，重创中原。", 
        relatedFigures: ["安禄山", "郭子仪", "唐玄宗"]
      },
      { 
        id: "tang_7", year: "875年", name: "黄巢起义", description: "晚唐大规模起义", 
        details: "起义军攻陷长安，动摇了唐朝统治根基。", 
        relatedFigures: ["黄巢"]
      },
      { 
        id: "tang_8", year: "907年", name: "朱温篡唐", description: "唐朝灭亡", 
        details: "朱温废黜唐哀帝，建立后梁，唐朝结束。", 
        relatedFigures: ["朱温"]
      }
    ],
    keyFigures: [
      { name: "李世民", title: "唐太宗", description: "天可汗", biography: "唐朝第二位皇帝，杰出的军事家和政治家。他励精图治，听取魏徵谏言，开启了贞观之治，为盛唐奠定了基础。" },
      { name: "武则天", title: "女皇", description: "一代女杰", biography: "并州文水人，十四岁入后宫，后为皇后。690年登基称帝，改国号为周。她在位期间上承贞观，下启开元。" },
      { name: "李渊", title: "唐高祖", description: "开国之君", biography: "太原留守起兵，平定天下，建立大唐。晚年在玄武门之变后被迫禅位给李世民。" },
      { name: "唐玄宗", title: "明皇", description: "盛世与转折", biography: "李隆基，前期励精图治创开元盛世，后期宠爱杨贵妃，怠慢朝政，引发安史之乱。" },
      { name: "郭子仪", title: "汾阳王", description: "再造唐室", biography: "唐代名将，安史之乱时率兵收复两京，功勋卓著，历经四朝，辅佐多位皇帝。" },
      { name: "魏徵", title: "名臣", description: "以人为镜", biography: "唐朝政治家，以直谏闻名。去世时，唐太宗叹曰：‘夫以铜为镜，可以正衣冠；以古为镜，可以知兴替；以人为镜，可以明得失。魏徵没，朕亡一镜矣！’" }
    ],
    achievements: [
      { title: "唐诗", description: "文学巅峰" },
      { title: "长安城", description: "当时世界最大的国际大都市" }
    ]
  },
  {
    id: "song",
    name: "宋朝",
    timeRange: "960年-1279年",
    founder: "赵匡胤",
    capital: "汴梁、临安",
    characteristics: ["重文轻武", "经济繁荣"],
    sealText: "宋",
    keyEvents: [
      { id: "song_1", year: "960年", name: "陈桥兵变", description: "赵匡胤建立宋朝", details: "后周大将赵匡胤在陈桥被部下黄袍加身，建立宋朝。", relatedFigures: ["赵匡胤"] },
      { id: "song_2", year: "1069年", name: "王安石变法", description: "熙宁变法", details: "宋神宗支持王安石推行新政，旨在富国强兵。", relatedFigures: ["王安石", "宋神宗"] },
      { id: "song_3", year: "1127年", name: "靖康之变", description: "北宋灭亡", details: "金军攻入汴京，掳走徽、钦二帝。", relatedFigures: ["宋徽宗", "宋钦宗"] },
      { id: "song_4", year: "1142年", name: "岳飞被害", description: "南宋抗金名将之死", details: "秦桧以“莫须有”罪名害死抗金名将岳飞。", relatedFigures: ["岳飞", "秦桧", "宋高宗"] },
      { id: "song_5", year: "1279年", name: "崖山海战", description: "宋朝彻底灭亡", details: "陆秀夫背负小皇帝跳海，南宋终结。", relatedFigures: ["陆秀夫", "文天祥"] }
    ],
    keyFigures: [
      { name: "赵匡胤", title: "宋太祖", description: "杯酒释兵权", biography: "通过和平方式解决将领兵权问题，确立文官政治体系。他结束了五代十国的混战局面。" },
      { name: "岳飞", title: "武穆", description: "精忠报国", biography: "中国历史上著名的抗金将领。他率领岳家军屡破金兵，致力于收复中原。后被奸臣秦桧以莫须有罪名害死。" },
      { name: "文天祥", title: "民族英雄", description: "丹心照汗青", biography: "南宋末年名臣，率众抗元。被俘后宁死不屈，留下‘人生自古谁无死？留取丹心照汗青’的千古名句。" },
      { name: "王安石", title: "改革家", description: "拗相公", biography: "北宋杰出的政治家、文学家。他推行变法，试图解决北宋中期的积贫积弱问题。" }
    ],
    achievements: [
      { title: "活字印刷", description: "科技进步" },
      { title: "清明上河图", description: "市井繁荣" }
    ]
  },
  {
    id: "ming",
    name: "明朝",
    timeRange: "1368年-1644年",
    founder: "朱元璋",
    capital: "南京、北京",
    characteristics: ["集权统治", "航海壮举"],
    sealText: "明",
    keyEvents: [
      { id: "ming_1", year: "1368年", name: "洪武开国", description: "朱元璋称帝", details: "起于草莽，推翻元朝，建立明朝。", relatedFigures: ["朱元璋"] },
      { id: "ming_2", year: "1402年", name: "靖难之役", description: "朱棣夺位", details: "燕王朱棣起兵反对建文帝，攻陷南京。", relatedFigures: ["朱棣", "朱允炆"] },
      { id: "ming_3", year: "1405年", name: "郑和下西洋", description: "地理大发现", details: "规模宏大的远航，最远到达非洲东海岸。", relatedFigures: ["郑和", "朱棣"] },
      { id: "ming_4", year: "1449年", name: "土木堡之变", description: "明朝由盛转衰", details: "明英宗被瓦剌俘虏，明军主力溃败。", relatedFigures: ["明英宗", "于谦"] },
      { id: "ming_5", year: "1644年", name: "甲申之变", description: "明朝灭亡", details: "李自成攻破北京，崇祯皇帝自缢。", relatedFigures: ["朱由检", "李自成"] }
    ],
    keyFigures: [
      { name: "朱元璋", title: "洪武帝", description: "布衣皇帝", biography: "原名重八，幼时家贫。后加入红巾军，南征北战，统一天下。他在位期间整顿吏治，奠定明朝三百年基业。" },
      { name: "朱棣", title: "永乐帝", description: "永乐大盛", biography: "明朝第三位皇帝。迁都北京，派郑和下西洋，修《永乐大典》，是中国历史上极具作为的皇帝。" },
      { name: "郑和", title: "三宝太监", description: "和平使者", biography: "原姓马。他率领当时世界最先进的船队七下西洋，促进了中国与亚非各国的交流。" },
      { name: "于谦", title: "忠肃", description: "挽救危局", biography: "土木堡之变后，他在北京保卫战中力排众议，抵御瓦剌侵略，社稷得以保全。‘粉身碎骨浑不怕，要留清白在人间’是其写照。" },
      { name: "朱由检", title: "崇祯帝", description: "悲情帝王", biography: "明朝末代皇帝。虽勤政俭朴，但大势已去。北京城破之时，在景山歪脖子树自缢，死前哀叹：‘君非亡国之君，臣皆亡国之臣’。" }
    ],
    achievements: [
      { title: "万里长城", description: "明长城修建" },
      { title: "天工开物", description: "科学巨著" }
    ]
  },
  {
    id: "qing",
    name: "清朝",
    timeRange: "1644年-1912年",
    founder: "皇太极",
    capital: "北京",
    characteristics: ["封建巅峰", "丧权辱国"],
    sealText: "清",
    keyEvents: [
      { id: "qing_1", year: "1644年", name: "清军入关", description: "定鼎燕京", details: "吴三桂引清军入关，大败闯王李自成。", relatedFigures: ["多尔衮", "吴三桂", "顺治帝"] },
      { id: "qing_2", year: "1662年", name: "康熙亲政", description: "千古一帝开启", details: "清除鳌拜，平定三藩，开启康乾盛世。", relatedFigures: ["康熙", "鳌拜"] },
      { id: "qing_3", year: "1840年", name: "鸦片战争", description: "近代史开端", details: "英国大炮轰开国门，清朝被迫签订《南京条约》。", relatedFigures: ["林则徐", "道光帝"] },
      { id: "qing_4", year: "1894年", name: "甲午战争", description: "洋务运动破产", details: "北洋水师全军覆没，签订《马关条约》。", relatedFigures: ["李鸿章", "光绪帝"] },
      { id: "qing_5", year: "1911年", name: "辛亥革命", description: "帝制终结", details: "武昌起义爆发，全国响应，宣告共和。", relatedFigures: ["孙中山", "溥仪"] }
    ],
    keyFigures: [
      { name: "康熙", title: "圣祖", description: "千古一帝", biography: "名玄烨。除鳌拜、平三藩、收台湾、拒沙俄、定边疆。在位六十一年，是中国历史上在位时间最长的皇帝。" },
      { name: "林则徐", title: "民族英雄", description: "睁眼看世界第一人", biography: "晚清政治家。在虎门销烟，严禁鸦片。由于投降派诬陷被流放伊犁，但其爱国精神永垂不朽。" },
      { name: "李鸿章", title: "中堂", description: "晚清柱石", biography: "洋务运动领袖。虽签订多个丧权辱国条约，但也是晚清最具国际眼光的官员，一生毁誉参半。" },
      { name: "多尔衮", title: "摄政王", description: "大清开国元勋", biography: "满洲正白旗人，爱新觉罗氏。清朝入关的关键人物，辅佐顺治皇帝。其权倾朝野，被称为‘皇父摄政王’。" },
      { name: "溥仪", title: "宣统帝", description: "末代皇帝", biography: "爱新觉罗氏，年号宣统。三岁登基，六岁退位，见证了帝制的终结。其一生坎坷，从皇帝到战犯，再到普通公民，是时代的缩影。" }
    ],
    achievements: [
      { title: "康熙字典", description: "辞书顶峰" },
      { title: "版图奠定", description: "确立现代中国疆域" }
    ]
  }
];
