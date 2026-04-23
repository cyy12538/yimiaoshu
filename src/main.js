import "./style.css";
import { LottieAnimation } from './components/LottieAnimation.js';

// 存储所有动画实例
const animations = {};

// 设计稿原始尺寸
const ORIGINAL_WIDTH = 2160;
const ORIGINAL_HEIGHT = 3840;
const ASPECT_RATIO = ORIGINAL_WIDTH / ORIGINAL_HEIGHT;

// 获取显示尺寸（保持比例，填满屏幕）
function getDisplaySize() {
  // 使用 document.documentElement.clientWidth 获取更可靠的视口宽度
  const screenWidth = document.documentElement.clientWidth;
  const screenHeight = document.documentElement.clientHeight;
  
  let displayWidth, displayHeight;
  
  if (screenWidth / screenHeight > ASPECT_RATIO) {
    // 屏幕比设计稿更宽，以高度为基准
    displayHeight = screenHeight;
    displayWidth = displayHeight * ASPECT_RATIO;
  } else {
    // 屏幕比设计稿更窄，以宽度为基准
    displayWidth = screenWidth;
    displayHeight = displayWidth / ASPECT_RATIO;
  }
  
  return { displayWidth, displayHeight, screenWidth, screenHeight };
}

// 获取缩放比例
function getScaleRatio() {
  const { displayWidth } = getDisplaySize();
  return displayWidth / ORIGINAL_WIDTH;
}

// 动画配置 - 使用原始尺寸（相对于 2160x3840 设计稿）
const animationConfigs = [
  {
    id: 'baby',
    containerId: 'lottie-baby',
    path: '人物/baby.json',
    width: 283,
    height: 306,
    left: 0.51,
    top: 0.63
  },
  {
    id: 'kid',
    containerId: 'lottie-kid',
    path: '人物/kid.json',
    width: 268,
    height: 455,
    left: 0.41,
    top: 0.51
  },
  {
    id: 'adult',
    containerId: 'lottie-adult',
    path: '人物/adult.json',
    width: 268,
    height: 770,
    left: 0.60,
    top: 0.39
  },
  {
    id: 'old',
    containerId: 'lottie-old',
    path: 'old(1).json',
    width: 256,
    height: 575,
    left: 0.40,
    top: 0.3
  }
];

// Bubble UI 动画配置
const bubbleConfigs = [
  { id: 'baby', containerId: 'lottie-bubble-baby', width: 1080, height: 1920, left: 0.57, top: 0.57 },
  { id: 'kid', containerId: 'lottie-bubble-kid', width: 1080, height: 1920, left: 0.5, top: 0.44 },
  { id: 'adult', containerId: 'lottie-bubble-adult', width: 1080, height: 1920, left: 0.67, top: 0.31 },
  { id: 'old', containerId: 'lottie-bubble-old', width: 1080, height: 1920, left: 0.47, top: 0.22 }
];

const bubbleAnimations = {};

// Leaves 全局动画配置
const leavesContainer = document.getElementById('lottie-leaves');
if (leavesContainer) {
  console.log('正在加载 leaves 全局动画');
  const leavesAnimation = new LottieAnimation({
    container: leavesContainer,
    path: '/leaves鍏ㄥ眬.json',
    renderer: 'svg',
    loop: true,
    autoplay: true,
    speed: 1
  });
  window.leavesAnimation = leavesAnimation;
}

// 存储植物背景动画实例
const plantAnimations = {};

// 初始化多层植物背景动画
function initPlantAnimations(displayWidth, displayHeight) {
  // 天空层（静态 SVG）- Asset 13
  const skyContainer = document.getElementById('sky-layer');
  if (skyContainer) {
    const skyOriginalWidth = 2159.08;
    const skyOriginalHeight = 1006.93;
    const skyAspectRatio = skyOriginalHeight / skyOriginalWidth;
    
    const skyDisplayWidth = displayWidth;
    const skyDisplayHeight = displayWidth * skyAspectRatio;
    
    skyContainer.style.width = `${skyDisplayWidth}px`;
    skyContainer.style.height = `${skyDisplayHeight}px`;
    
    // 如果还没有加载，加载天空图片
    if (!skyContainer.innerHTML) {
      skyContainer.innerHTML = `<img src="/植物/Asset 13.svg" style="width: 100%; height: 100%; object-fit: cover;">`;
    }
  }
  
  // 植物动画层配置
  const plantLayers = [
    { id: 'bg', containerId: 'bg-layer', path: '/植物/背景3.json' },
    { id: 'far', containerId: 'far-layer', path: '/植物/杩滄櫙妞嶇墿.json' },
    { id: 'mid', containerId: 'mid-layer', path: '/植物/中景.json' },
    { id: 'front', containerId: 'front-layer', path: '/植物/前景3.json' }
  ];
  
  plantLayers.forEach(layer => {
    const container = document.getElementById(layer.containerId);
    if (container) {
      container.style.width = `${displayWidth}px`;
      container.style.height = `${displayHeight}px`;
      
      // 如果动画还没初始化，创建新动画
      if (!plantAnimations[layer.id]) {
        const animation = new LottieAnimation({
          container: container,
          path: layer.path,
          renderer: 'canvas',
          loop: true,
          autoplay: true,
          speed: 1
        });
        plantAnimations[layer.id] = animation;
      }
    }
  });
}

// 初始化所有动画
function initAnimations() {
  const { displayWidth, displayHeight, screenWidth } = getDisplaySize();
  const scaleRatio = getScaleRatio();
  const offsetX = (screenWidth - displayWidth) / 2;
  
  // 初始化多层植物背景动画
  initPlantAnimations(displayWidth, displayHeight);
  
  // 初始化人物动画
  animationConfigs.forEach(config => {
    const container = document.getElementById(config.containerId);
    if (container) {
      container.style.width = `${config.width * scaleRatio}px`;
      container.style.height = `${config.height * scaleRatio}px`;
      container.style.left = `${offsetX + displayWidth * config.left}px`;
      container.style.top = `${displayHeight * config.top}px`;
      
      if (!animations[config.id]) {
        const animation = new LottieAnimation({
          container: container,
          path: config.path,
          renderer: 'svg',
          loop: true,
          autoplay: true,
          speed: 1
        });
        animations[config.id] = { instance: animation, container };
      }
    }
  });
  
  // 初始化 bubble 动画
  bubbleConfigs.forEach(config => {
    const container = document.getElementById(config.containerId);
    if (container) {
      container.style.width = `${config.width * scaleRatio}px`;
      container.style.height = `${config.height * scaleRatio}px`;
      container.style.left = `${offsetX + displayWidth * config.left}px`;
      container.style.top = `${displayHeight * config.top}px`;
      
      if (!bubbleAnimations[config.id]) {
        const animation = new LottieAnimation({
          container: container,
          path: '/bubble ui.json',
          renderer: 'svg',
          loop: true,
          autoplay: true,
          speed: 1
        });
        bubbleAnimations[config.id] = animation;
      }
    }
  });
  
  window.bubbleAnimations = bubbleAnimations;
  window.lottieAnimations = animations;
  
  console.log('动画初始化完成:', { displayWidth, displayHeight, scaleRatio, offsetX });
}

const mainScene = document.getElementById('main-scene');
const detailScene = document.getElementById('detail-scene');
const maskLayer = document.querySelector('.mask-layer');
const bottomBg12 = document.getElementById('bottom-bg-12');
const bottomBg11 = document.getElementById('bottom-bg-11');
const fixedImgs = document.querySelectorAll('.fixed-img');
const fixedTitle = document.querySelector('.fixed-title');
const closeBtn = document.querySelector('.close-btn');
const modalOverlay = document.getElementById('modalOverlay');
const modalClose = document.getElementById('modalClose');
const modalBody = document.getElementById('modalBody');
const detailImage = document.querySelector('.detail-image');

// 原始设计稿中的滚动范围（基于原始 SVG viewBox 高度）
const ORIGINAL_MIN_SCROLL = 3950;
const ORIGINAL_MAX_SCROLL = 6600;

// 当前实际的滚动范围
let MIN_SCROLL = 3000;
let MAX_SCROLL = 7290;

// 更新滚动范围
function updateScrollRange() {
  const scaleRatio = getScaleRatio();
  MIN_SCROLL = Math.round(ORIGINAL_MIN_SCROLL * scaleRatio);
  MAX_SCROLL = Math.round(ORIGINAL_MAX_SCROLL * scaleRatio);
  console.log('滚动范围更新:', { MIN_SCROLL, MAX_SCROLL, scaleRatio });
}

let touchStartX = 0;
let touchEndX = 0;
let touchStartY = 0;
let touchEndY = 0;
let scrollTimeout = null;
let isDetailPage = false;

// 详情页滚动相关的常量
// 文字长图的实际高度（viewBox 高度）
const SVG_VIEWBOX_HEIGHT = 5940.25;

// 疫苗数据结构 - 区分免疫规划疫苗和非免疫规划疫苗
const vaccineData = {
  '50year': {
    title: '≥50岁',
    planned: [], // 该年龄段无免疫规划疫苗
    unplanned: [
      {
        name: '甲肝疫苗',
        content: `<div class="vaccine-section">
          <h4>甲肝疫苗</h4>
          <p class="vaccine-purpose">预防甲型肝炎病毒感染引起的甲型肝炎。</p>
        </div>`
      },
      {
        name: '流感疫苗',
        content: `<div class="vaccine-section">
          <h4>流感疫苗</h4>
          <p class="vaccine-purpose">预防甲型、乙型流感病毒感染，降低流感的发病率，减少因流感引发的肺炎、心肌炎等并发症。</p>
          <div class="vaccine-detail">
            <p><strong>三价、四价流感病毒裂解疫苗</strong>：≥6月龄人群；≥3岁儿童及成人接种1剂次</p>
          </div>
        </div>`
      },
      {
        name: '23价肺炎疫苗',
        content: `<div class="vaccine-section">
          <h4>23价肺炎疫苗</h4>
          <p class="vaccine-purpose">预防23种血清型肺炎球菌引起的感染性疾病，包括肺炎、脑膜炎、败血症等。</p>
        </div>`
      },
      {
        name: '水痘疫苗',
        content: `<div class="vaccine-section">
          <h4>水痘疫苗</h4>
          <p class="vaccine-purpose">预防水痘-带状疱疹病毒感染，避免水痘引起的发热、皮疹、瘙痒等症状，降低并发症风险。</p>
        </div>`
      },
      {
        name: '流脑疫苗',
        content: `<div class="vaccine-section">
          <h4>流脑疫苗</h4>
          <p class="vaccine-purpose">预防脑膜炎奈瑟菌引起的流行性脑脊髓膜炎（流脑），减轻高热、头痛、皮肤瘀斑、脑膜刺激征等症状，降低重症死亡率。</p>
        </div>`
      },
      {
        name: '带状疱疹疫苗',
        content: `<div class="vaccine-section">
          <h4>带状疱疹疫苗</h4>
          <p class="vaccine-purpose">预防带状疱疹，降低带状疱疹引起的神经痛等并发症风险。</p>
        </div>`
      },
      {
        name: '戊肝疫苗',
        content: `<div class="vaccine-section">
          <h4>戊肝疫苗</h4>
          <p class="vaccine-purpose">预防戊型肝炎病毒感染引起的戊型肝炎。</p>
        </div>`
      },
      {
        name: '霍乱疫苗',
        content: `<div class="vaccine-section">
          <h4>霍乱疫苗</h4>
          <p class="vaccine-purpose">预防霍乱弧菌引起的霍乱，避免严重的腹泻和脱水。</p>
        </div>`
      },
      {
        name: '乙脑疫苗',
        content: `<div class="vaccine-section">
          <h4>乙脑疫苗</h4>
          <p class="vaccine-purpose">预防乙型脑炎病毒感染引起的乙型脑炎（乙脑），避免病毒侵犯中枢神经系统导致高热、抽搐、昏迷，降低致残率和死亡率。</p>
        </div>`
      }
    ]
  },
  '40year': {
    title: '≥40岁',
    planned: [],
    unplanned: [
      {
        name: '甲肝疫苗',
        content: `<div class="vaccine-section">
          <h4>甲肝疫苗</h4>
          <p class="vaccine-purpose">预防甲型肝炎病毒感染引起的甲型肝炎。</p>
        </div>`
      },
      {
        name: '流感疫苗',
        content: `<div class="vaccine-section">
          <h4>流感疫苗</h4>
          <p class="vaccine-purpose">预防甲型、乙型流感病毒感染，降低流感的发病率，减少因流感引发的肺炎、心肌炎等并发症。</p>
          <div class="vaccine-detail">
            <p><strong>三价、四价流感病毒裂解疫苗</strong>：≥6月龄人群；≥3岁儿童及成人接种1剂次</p>
          </div>
        </div>`
      },
      {
        name: '23价肺炎疫苗',
        content: `<div class="vaccine-section">
          <h4>23价肺炎疫苗</h4>
          <p class="vaccine-purpose">预防23种血清型肺炎球菌引起的感染性疾病，包括肺炎、脑膜炎、败血症等。</p>
        </div>`
      },
      {
        name: '水痘疫苗',
        content: `<div class="vaccine-section">
          <h4>水痘疫苗</h4>
          <p class="vaccine-purpose">预防水痘-带状疱疹病毒感染，避免水痘引起的发热、皮疹、瘙痒等症状，降低并发症风险。</p>
        </div>`
      },
      {
        name: 'HPV疫苗',
        content: `<div class="vaccine-section">
          <h4>HPV疫苗</h4>
          <p class="vaccine-purpose">预防人乳头瘤病毒感染，降低宫颈癌等疾病风险。</p>
        </div>`
      },
      {
        name: '流脑疫苗',
        content: `<div class="vaccine-section">
          <h4>流脑疫苗</h4>
          <p class="vaccine-purpose">预防脑膜炎奈瑟菌引起的流行性脑脊髓膜炎（流脑），减轻高热、头痛、皮肤瘀斑、脑膜刺激征等症状，降低重症死亡率。</p>
        </div>`
      },
      {
        name: '带状疱疹疫苗',
        content: `<div class="vaccine-section">
          <h4>带状疱疹疫苗</h4>
          <p class="vaccine-purpose">预防带状疱疹，降低带状疱疹引起的神经痛等并发症风险。</p>
        </div>`
      },
      {
        name: '戊肝疫苗',
        content: `<div class="vaccine-section">
          <h4>戊肝疫苗</h4>
          <p class="vaccine-purpose">预防戊型肝炎病毒感染引起的戊型肝炎。</p>
        </div>`
      },
      {
        name: '霍乱疫苗',
        content: `<div class="vaccine-section">
          <h4>霍乱疫苗</h4>
          <p class="vaccine-purpose">预防霍乱弧菌引起的霍乱，避免严重的腹泻和脱水。</p>
        </div>`
      },
      {
        name: '乙脑疫苗',
        content: `<div class="vaccine-section">
          <h4>乙脑疫苗</h4>
          <p class="vaccine-purpose">预防乙型脑炎病毒感染引起的乙型脑炎（乙脑），避免病毒侵犯中枢神经系统导致高热、抽搐、昏迷，降低致残率和死亡率。</p>
        </div>`
      }
    ]
  },
  '16year': {
    title: '16 岁',
    planned: [],
    unplanned: [
      {
        name: '甲肝疫苗',
        content: `<div class="vaccine-section">
          <h4>甲肝疫苗</h4>
          <p class="vaccine-purpose">预防甲型肝炎病毒感染引起的甲型肝炎。</p>
        </div>`
      },
      {
        name: '流感疫苗',
        content: `<div class="vaccine-section">
          <h4>流感疫苗</h4>
          <p class="vaccine-purpose">预防甲型、乙型流感病毒感染，降低流感的发病率，减少因流感引发的肺炎、心肌炎等并发症。</p>
          <div class="vaccine-detail">
            <p><strong>三价、四价流感病毒裂解疫苗</strong>：≥6月龄人群；≥3岁儿童及成人接种1剂次</p>
          </div>
        </div>`
      },
      {
        name: '23价肺炎疫苗',
        content: `<div class="vaccine-section">
          <h4>23价肺炎疫苗</h4>
          <p class="vaccine-purpose">预防23种血清型肺炎球菌引起的感染性疾病，包括肺炎、脑膜炎、败血症等。</p>
        </div>`
      },
      {
        name: '水痘疫苗',
        content: `<div class="vaccine-section">
          <h4>水痘疫苗</h4>
          <p class="vaccine-purpose">预防水痘-带状疱疹病毒感染，避免水痘引起的发热、皮疹、瘙痒等症状，降低并发症风险。</p>
        </div>`
      },
      {
        name: 'HPV疫苗',
        content: `<div class="vaccine-section">
          <h4>HPV疫苗</h4>
          <p class="vaccine-purpose">预防人乳头瘤病毒感染，降低宫颈癌等疾病风险。</p>
        </div>`
      },
      {
        name: '流脑疫苗',
        content: `<div class="vaccine-section">
          <h4>流脑疫苗</h4>
          <p class="vaccine-purpose">预防脑膜炎奈瑟菌引起的流行性脑脊髓膜炎（流脑），减轻高热、头痛、皮肤瘀斑、脑膜刺激征等症状，降低重症死亡率。</p>
        </div>`
      },
      {
        name: '戊肝疫苗',
        content: `<div class="vaccine-section">
          <h4>戊肝疫苗</h4>
          <p class="vaccine-purpose">预防戊型肝炎病毒感染引起的戊型肝炎。</p>
        </div>`
      },
      {
        name: '霍乱疫苗',
        content: `<div class="vaccine-section">
          <h4>霍乱疫苗</h4>
          <p class="vaccine-purpose">预防霍乱弧菌引起的霍乱，避免严重的腹泻和脱水。</p>
        </div>`
      },
      {
        name: '乙脑疫苗',
        content: `<div class="vaccine-section">
          <h4>乙脑疫苗</h4>
          <p class="vaccine-purpose">预防乙型脑炎病毒感染引起的乙型脑炎（乙脑），避免病毒侵犯中枢神经系统导致高热、抽搐、昏迷，降低致残率和死亡率。</p>
        </div>`
      }
    ]
  },
  '13year': {
    title: '13 岁',
    planned: [
      {
        name: '二价HPV疫苗',
        content: `<div class="vaccine-section">
          <h4>二价HPV疫苗</h4>
          <p class="vaccine-purpose">预防人乳头瘤病毒16、18型感染，降低宫颈癌等疾病风险。</p>
        </div>`
      }
    ],
    unplanned: [
      {
        name: '甲肝疫苗',
        content: `<div class="vaccine-section">
          <h4>甲肝疫苗</h4>
          <p class="vaccine-purpose">预防甲型肝炎病毒感染引起的甲型肝炎。</p>
        </div>`
      },
      {
        name: '流感疫苗',
        content: `<div class="vaccine-section">
          <h4>流感疫苗</h4>
          <p class="vaccine-purpose">预防甲型、乙型流感病毒感染，降低流感的发病率，减少因流感引发的肺炎、心肌炎等并发症。</p>
          <div class="vaccine-detail">
            <p><strong>三价、四价流感病毒裂解疫苗</strong>：≥6月龄人群；≥3岁儿童及成人接种1剂次</p>
          </div>
        </div>`
      },
      {
        name: '23价肺炎疫苗',
        content: `<div class="vaccine-section">
          <h4>23价肺炎疫苗</h4>
          <p class="vaccine-purpose">预防23种血清型肺炎球菌引起的感染性疾病，包括肺炎、脑膜炎、败血症等。</p>
        </div>`
      },
      {
        name: '水痘疫苗',
        content: `<div class="vaccine-section">
          <h4>水痘疫苗</h4>
          <p class="vaccine-purpose">预防水痘-带状疱疹病毒感染，避免水痘引起的发热、皮疹、瘙痒等症状，降低并发症风险。</p>
        </div>`
      },
      {
        name: 'HPV疫苗',
        content: `<div class="vaccine-section">
          <h4>HPV疫苗</h4>
          <p class="vaccine-purpose">预防人乳头瘤病毒感染，降低宫颈癌等疾病风险。</p>
        </div>`
      },
      {
        name: '流脑疫苗',
        content: `<div class="vaccine-section">
          <h4>流脑疫苗</h4>
          <p class="vaccine-purpose">预防脑膜炎奈瑟菌引起的流行性脑脊髓膜炎（流脑），减轻高热、头痛、皮肤瘀斑、脑膜刺激征等症状，降低重症死亡率。</p>
        </div>`
      },
      {
        name: '霍乱疫苗',
        content: `<div class="vaccine-section">
          <h4>霍乱疫苗</h4>
          <p class="vaccine-purpose">预防霍乱弧菌引起的霍乱，避免严重的腹泻和脱水。</p>
        </div>`
      },
      {
        name: '乙脑疫苗',
        content: `<div class="vaccine-section">
          <h4>乙脑疫苗</h4>
          <p class="vaccine-purpose">预防乙型脑炎病毒感染引起的乙型脑炎（乙脑），避免病毒侵犯中枢神经系统导致高热、抽搐、昏迷，降低致残率和死亡率。</p>
        </div>`
      }
    ]
  },
  '9year': {
    title: '9 岁',
    planned: [],
    unplanned: [
      {
        name: '甲肝疫苗',
        content: `<div class="vaccine-section">
          <h4>甲肝疫苗</h4>
          <p class="vaccine-purpose">预防甲型肝炎病毒感染引起的甲型肝炎。</p>
        </div>`
      },
      {
        name: '流感疫苗',
        content: `<div class="vaccine-section">
          <h4>流感疫苗</h4>
          <p class="vaccine-purpose">预防甲型、乙型流感病毒感染，降低流感的发病率，减少因流感引发的肺炎、心肌炎等并发症。</p>
          <div class="vaccine-detail">
            <p><strong>三价、四价流感病毒裂解疫苗</strong>：≥6月龄人群；≥3岁儿童及成人接种1剂次</p>
          </div>
        </div>`
      },
      {
        name: '23价肺炎疫苗',
        content: `<div class="vaccine-section">
          <h4>23价肺炎疫苗</h4>
          <p class="vaccine-purpose">预防23种血清型肺炎球菌引起的感染性疾病，包括肺炎、脑膜炎、败血症等。</p>
        </div>`
      },
      {
        name: '水痘疫苗',
        content: `<div class="vaccine-section">
          <h4>水痘疫苗</h4>
          <p class="vaccine-purpose">预防水痘-带状疱疹病毒感染，避免水痘引起的发热、皮疹、瘙痒等症状，降低并发症风险。</p>
        </div>`
      },
      {
        name: 'HPV疫苗',
        content: `<div class="vaccine-section">
          <h4>HPV疫苗</h4>
          <p class="vaccine-purpose">预防人乳头瘤病毒感染，降低宫颈癌等疾病风险。</p>
        </div>`
      },
      {
        name: '流脑疫苗',
        content: `<div class="vaccine-section">
          <h4>流脑疫苗</h4>
          <p class="vaccine-purpose">预防脑膜炎奈瑟菌引起的流行性脑脊髓膜炎（流脑），减轻高热、头痛、皮肤瘀斑、脑膜刺激征等症状，降低重症死亡率。</p>
        </div>`
      },
      {
        name: '霍乱疫苗',
        content: `<div class="vaccine-section">
          <h4>霍乱疫苗</h4>
          <p class="vaccine-purpose">预防霍乱弧菌引起的霍乱，避免严重的腹泻和脱水。</p>
        </div>`
      },
      {
        name: '乙脑疫苗',
        content: `<div class="vaccine-section">
          <h4>乙脑疫苗</h4>
          <p class="vaccine-purpose">预防乙型脑炎病毒感染引起的乙型脑炎（乙脑），避免病毒侵犯中枢神经系统导致高热、抽搐、昏迷，降低致残率和死亡率。</p>
        </div>`
      }
    ]
  },
  '6year': {
    title: '6 岁',
    planned: [
      {
        name: '百白破疫苗',
        content: `<div class="vaccine-section">
          <h4>百白破疫苗</h4>
          <p class="vaccine-purpose">第五剂，预防百日咳、白喉、破伤风三种疾病。</p>
        </div>`
      },
      {
        name: 'A群C群流脑多糖疫苗',
        content: `<div class="vaccine-section">
          <h4>A群C群流脑多糖疫苗</h4>
          <p class="vaccine-purpose">第二剂，预防A群和C群脑膜炎球菌引起的流行性脑脊髓膜炎（流脑）。</p>
        </div>`
      }
    ],
    unplanned: [
      {
        name: '甲肝疫苗',
        content: `<div class="vaccine-section">
          <h4>甲肝疫苗</h4>
          <p class="vaccine-purpose">预防甲型肝炎病毒感染引起的甲型肝炎。</p>
        </div>`
      },
      {
        name: '流感疫苗',
        content: `<div class="vaccine-section">
          <h4>流感疫苗</h4>
          <p class="vaccine-purpose">预防甲型、乙型流感病毒感染，降低流感的发病率，减少因流感引发的肺炎、心肌炎等并发症。</p>
          <div class="vaccine-detail">
            <p><strong>三价、四价流感病毒裂解疫苗</strong>：≥6月龄人群；1或2剂次（6-35月龄儿童接种2剂次，间隔4周；≥3岁儿童及成人接种1剂次）</p>
          </div>
        </div>`
      },
      {
        name: '23价肺炎疫苗',
        content: `<div class="vaccine-section">
          <h4>23价肺炎疫苗</h4>
          <p class="vaccine-purpose">预防23种血清型肺炎球菌引起的感染性疾病，包括肺炎、脑膜炎、败血症等。</p>
        </div>`
      },
      {
        name: '水痘疫苗',
        content: `<div class="vaccine-section">
          <h4>水痘疫苗</h4>
          <p class="vaccine-purpose">预防水痘-带状疱疹病毒感染，避免水痘引起的发热、皮疹、瘙痒等症状，降低并发症风险。</p>
        </div>`
      },
      {
        name: '流脑疫苗',
        content: `<div class="vaccine-section">
          <h4>流脑疫苗</h4>
          <p class="vaccine-purpose">预防脑膜炎奈瑟菌引起的流行性脑脊髓膜炎（流脑），减轻高热、头痛、皮肤瘀斑、脑膜刺激征等症状，降低重症死亡率。</p>
        </div>`
      },
      {
        name: '霍乱疫苗',
        content: `<div class="vaccine-section">
          <h4>霍乱疫苗</h4>
          <p class="vaccine-purpose">预防霍乱弧菌引起的霍乱，避免严重的腹泻和脱水。</p>
        </div>`
      },
      {
        name: '乙脑疫苗',
        content: `<div class="vaccine-section">
          <h4>乙脑疫苗</h4>
          <p class="vaccine-purpose">预防乙型脑炎病毒感染引起的乙型脑炎（乙脑），避免病毒侵犯中枢神经系统导致高热、抽搐、昏迷，降低致残率和死亡率。</p>
        </div>`
      }
    ]
  },
  '4year': {
    title: '4 岁',
    planned: [
      {
        name: '脊髓灰质炎减毒活疫苗',
        content: `<div class="vaccine-section">
          <h4>脊髓灰质炎减毒活疫苗</h4>
          <p class="vaccine-purpose">第四剂，预防脊髓灰质炎（俗称 "小儿麻痹症"），避免病毒侵犯神经系统导致肢体瘫痪。</p>
        </div>`
      }
    ],
    unplanned: [
      {
        name: '甲肝疫苗',
        content: `<div class="vaccine-section">
          <h4>甲肝疫苗</h4>
          <p class="vaccine-purpose">预防甲型肝炎病毒感染引起的甲型肝炎。</p>
        </div>`
      },
      {
        name: 'b型流感嗜血杆菌疫苗',
        content: `<div class="vaccine-section">
          <h4>b型流感嗜血杆菌疫苗</h4>
          <p class="vaccine-purpose">预防 b 型流感嗜血杆菌感染引起的严重疾病，包括脑膜炎、肺炎、败血症、会厌炎、蜂窝织炎等，尤其保护婴幼儿免受重症侵袭。</p>
        </div>`
      },
      {
        name: '流感疫苗',
        content: `<div class="vaccine-section">
          <h4>流感疫苗</h4>
          <p class="vaccine-purpose">预防甲型、乙型流感病毒感染，降低流感的发病率，减少因流感引发的肺炎、心肌炎等并发症。</p>
          <div class="vaccine-detail">
            <p><strong>三价、四价流感病毒裂解疫苗</strong>：≥6月龄人群；1或2剂次（6-35月龄儿童接种2剂次，间隔4周；≥3岁儿童及成人接种1剂次）</p>
          </div>
        </div>`
      },
      {
        name: '13价肺炎疫苗',
        content: `<div class="vaccine-section">
          <h4>13价肺炎疫苗</h4>
          <p class="vaccine-purpose">预防 13 种血清型肺炎球菌引起的感染性疾病，包括肺炎、脑膜炎、败血症、中耳炎等，尤其降低婴幼儿重症感染风险。</p>
        </div>`
      },
      {
        name: '23价肺炎疫苗',
        content: `<div class="vaccine-section">
          <h4>23价肺炎疫苗</h4>
          <p class="vaccine-purpose">预防23种血清型肺炎球菌引起的感染性疾病，包括肺炎、脑膜炎、败血症等。</p>
        </div>`
      },
      {
        name: '水痘疫苗',
        content: `<div class="vaccine-section">
          <h4>水痘疫苗</h4>
          <p class="vaccine-purpose">预防水痘-带状疱疹病毒感染，避免水痘引起的发热、皮疹、瘙痒等症状，降低并发症风险。</p>
        </div>`
      },
      {
        name: '肠道病毒71型灭活疫苗（手足口疫苗）',
        content: `<div class="vaccine-section">
          <h4>肠道病毒71型灭活疫苗（手足口疫苗）</h4>
          <p class="vaccine-purpose">预防由肠道病毒 71 型引起的手足口病（重点降低重症风险，如脑炎、肺水肿）。</p>
        </div>`
      },
      {
        name: '流脑疫苗',
        content: `<div class="vaccine-section">
          <h4>流脑疫苗</h4>
          <p class="vaccine-purpose">预防脑膜炎奈瑟菌引起的流行性脑脊髓膜炎（流脑），减轻高热、头痛、皮肤瘀斑、脑膜刺激征等症状，降低重症死亡率。</p>
        </div>`
      },
      {
        name: '霍乱疫苗',
        content: `<div class="vaccine-section">
          <h4>霍乱疫苗</h4>
          <p class="vaccine-purpose">预防霍乱弧菌引起的霍乱，避免严重的腹泻和脱水。</p>
        </div>`
      },
      {
        name: '乙脑疫苗',
        content: `<div class="vaccine-section">
          <h4>乙脑疫苗</h4>
          <p class="vaccine-purpose">预防乙型脑炎病毒感染引起的乙型脑炎（乙脑），避免病毒侵犯中枢神经系统导致高热、抽搐、昏迷，降低致残率和死亡率。</p>
        </div>`
      }
    ]
  },
  '3year': {
    title: '3 岁',
    planned: [
      {
        name: 'A群C群流脑多糖疫苗',
        content: `<div class="vaccine-section">
          <h4>A群C群流脑多糖疫苗</h4>
          <p class="vaccine-purpose">预防A群和C群脑膜炎球菌引起的流行性脑脊髓膜炎（流脑）。</p>
        </div>`
      }
    ],
    unplanned: [
      {
        name: '轮状病毒疫苗',
        content: `<div class="vaccine-section">
          <h4>轮状病毒疫苗</h4>
          <p class="vaccine-purpose">预防轮状病毒引起的婴幼儿腹泻（俗称 "秋季腹泻"），可显著降低重症腹泻发生率，减少因腹泻导致的脱水、住院等风险。</p>
        </div>`
      },
      {
        name: '甲肝疫苗',
        content: `<div class="vaccine-section">
          <h4>甲肝疫苗</h4>
          <p class="vaccine-purpose">预防甲型肝炎病毒感染引起的甲型肝炎。</p>
        </div>`
      },
      {
        name: 'b型流感嗜血杆菌疫苗',
        content: `<div class="vaccine-section">
          <h4>b型流感嗜血杆菌疫苗</h4>
          <p class="vaccine-purpose">预防 b 型流感嗜血杆菌感染引起的严重疾病，包括脑膜炎、肺炎、败血症、会厌炎、蜂窝织炎等，尤其保护婴幼儿免受重症侵袭。</p>
        </div>`
      },
      {
        name: '流感疫苗',
        content: `<div class="vaccine-section">
          <h4>流感疫苗</h4>
          <p class="vaccine-purpose">预防甲型、乙型流感病毒感染，降低流感的发病率，减少因流感引发的肺炎、心肌炎等并发症。</p>
          <div class="vaccine-detail">
            <p><strong>三价、四价流感病毒裂解疫苗</strong>：≥6月龄人群；1或2剂次（6-35月龄儿童接种2剂次，间隔4周；≥3岁儿童及成人接种1剂次）</p>
          </div>
        </div>`
      },
      {
        name: '13价肺炎疫苗',
        content: `<div class="vaccine-section">
          <h4>13价肺炎疫苗</h4>
          <p class="vaccine-purpose">预防 13 种血清型肺炎球菌引起的感染性疾病，包括肺炎、脑膜炎、败血症、中耳炎等，尤其降低婴幼儿重症感染风险。</p>
        </div>`
      },
      {
        name: '23价肺炎疫苗',
        content: `<div class="vaccine-section">
          <h4>23价肺炎疫苗</h4>
          <p class="vaccine-purpose">预防23种血清型肺炎球菌引起的感染性疾病，包括肺炎、脑膜炎、败血症等。</p>
        </div>`
      },
      {
        name: '水痘疫苗',
        content: `<div class="vaccine-section">
          <h4>水痘疫苗</h4>
          <p class="vaccine-purpose">预防水痘-带状疱疹病毒感染，避免水痘引起的发热、皮疹、瘙痒等症状，降低并发症风险。</p>
        </div>`
      },
      {
        name: '肠道病毒71型灭活疫苗（手足口疫苗）',
        content: `<div class="vaccine-section">
          <h4>肠道病毒71型灭活疫苗（手足口疫苗）</h4>
          <p class="vaccine-purpose">预防由肠道病毒 71 型引起的手足口病（重点降低重症风险，如脑炎、肺水肿）。</p>
        </div>`
      },
      {
        name: '流脑疫苗',
        content: `<div class="vaccine-section">
          <h4>流脑疫苗</h4>
          <p class="vaccine-purpose">预防脑膜炎奈瑟菌引起的流行性脑脊髓膜炎（流脑），减轻高热、头痛、皮肤瘀斑、脑膜刺激征等症状，降低重症死亡率。</p>
        </div>`
      },
      {
        name: '霍乱疫苗',
        content: `<div class="vaccine-section">
          <h4>霍乱疫苗</h4>
          <p class="vaccine-purpose">预防霍乱弧菌引起的霍乱，避免严重的腹泻和脱水。</p>
        </div>`
      },
      {
        name: '乙脑疫苗',
        content: `<div class="vaccine-section">
          <h4>乙脑疫苗</h4>
          <p class="vaccine-purpose">预防乙型脑炎病毒感染引起的乙型脑炎（乙脑），避免病毒侵犯中枢神经系统导致高热、抽搐、昏迷，降低致残率和死亡率。</p>
        </div>`
      }
    ]
  },
  '2year': {
    title: '2 岁',
    planned: [
      {
        name: '乙脑减毒活疫苗',
        content: `<div class="vaccine-section">
          <h4>乙脑减毒活疫苗</h4>
          <p class="vaccine-purpose">第二剂，预防乙型脑炎病毒感染引起的乙型脑炎（乙脑），避免病毒侵犯中枢神经系统导致高热、抽搐、昏迷，降低致残率和死亡率。</p>
        </div>`
      }
    ],
    unplanned: [
      {
        name: '轮状病毒疫苗',
        content: `<div class="vaccine-section">
          <h4>轮状病毒疫苗</h4>
          <p class="vaccine-purpose">预防轮状病毒引起的婴幼儿腹泻（俗称 "秋季腹泻"），可显著降低重症腹泻发生率，减少因腹泻导致的脱水、住院等风险。</p>
        </div>`
      },
      {
        name: '甲肝疫苗',
        content: `<div class="vaccine-section">
          <h4>甲肝疫苗</h4>
          <p class="vaccine-purpose">预防甲型肝炎病毒感染引起的甲型肝炎。</p>
        </div>`
      },
      {
        name: 'b型流感嗜血杆菌疫苗',
        content: `<div class="vaccine-section">
          <h4>b型流感嗜血杆菌疫苗</h4>
          <p class="vaccine-purpose">预防 b 型流感嗜血杆菌感染引起的严重疾病，包括脑膜炎、肺炎、败血症、会厌炎、蜂窝织炎等，尤其保护婴幼儿免受重症侵袭。</p>
        </div>`
      },
      {
        name: '流感疫苗',
        content: `<div class="vaccine-section">
          <h4>流感疫苗</h4>
          <p class="vaccine-purpose">预防甲型、乙型流感病毒感染，降低流感的发病率，减少因流感引发的肺炎、心肌炎等并发症。</p>
          <div class="vaccine-detail">
            <p><strong>三价、四价流感病毒裂解疫苗</strong>：≥6月龄人群；1或2剂次（6-35月龄儿童接种2剂次，间隔4周；≥3岁儿童及成人接种1剂次）</p>
          </div>
        </div>`
      },
      {
        name: '13价肺炎疫苗',
        content: `<div class="vaccine-section">
          <h4>13价肺炎疫苗</h4>
          <p class="vaccine-purpose">预防 13 种血清型肺炎球菌引起的感染性疾病，包括肺炎、脑膜炎、败血症、中耳炎等，尤其降低婴幼儿重症感染风险。</p>
        </div>`
      },
      {
        name: '23价肺炎疫苗',
        content: `<div class="vaccine-section">
          <h4>23价肺炎疫苗</h4>
          <p class="vaccine-purpose">预防23种血清型肺炎球菌引起的感染性疾病，包括肺炎、脑膜炎、败血症等。</p>
        </div>`
      },
      {
        name: '水痘疫苗',
        content: `<div class="vaccine-section">
          <h4>水痘疫苗</h4>
          <p class="vaccine-purpose">预防水痘-带状疱疹病毒感染，避免水痘引起的发热、皮疹、瘙痒等症状，降低并发症风险。</p>
        </div>`
      },
      {
        name: '肠道病毒71型灭活疫苗（手足口疫苗）',
        content: `<div class="vaccine-section">
          <h4>肠道病毒71型灭活疫苗（手足口疫苗）</h4>
          <p class="vaccine-purpose">预防由肠道病毒 71 型引起的手足口病（重点降低重症风险，如脑炎、肺水肿）。</p>
        </div>`
      },
      {
        name: '流脑疫苗',
        content: `<div class="vaccine-section">
          <h4>流脑疫苗</h4>
          <p class="vaccine-purpose">预防脑膜炎奈瑟菌引起的流行性脑脊髓膜炎（流脑），减轻高热、头痛、皮肤瘀斑、脑膜刺激征等症状，降低重症死亡率。</p>
        </div>`
      },
      {
        name: '霍乱疫苗',
        content: `<div class="vaccine-section">
          <h4>霍乱疫苗</h4>
          <p class="vaccine-purpose">预防霍乱弧菌引起的霍乱，避免严重的腹泻和脱水。</p>
        </div>`
      },
      {
        name: '乙脑疫苗',
        content: `<div class="vaccine-section">
          <h4>乙脑疫苗</h4>
          <p class="vaccine-purpose">预防乙型脑炎病毒感染引起的乙型脑炎（乙脑），避免病毒侵犯中枢神经系统导致高热、抽搐、昏迷，降低致残率和死亡率。</p>
        </div>`
      }
    ]
  },
  '18month': {
    title: '18 月龄',
    planned: [
      {
        name: '百白破疫苗',
        content: `<div class="vaccine-section">
          <h4>百白破疫苗</h4>
          <p class="vaccine-purpose">第四剂，预防百日咳、白喉、破伤风三种疾病。</p>
        </div>`
      },
      {
        name: '麻腮风疫苗',
        content: `<div class="vaccine-section">
          <h4>麻腮风疫苗</h4>
          <p class="vaccine-purpose">第二剂，预防麻疹、腮腺炎、风疹三种传染病。</p>
        </div>`
      },
      {
        name: '甲肝减毒活疫苗',
        content: `<div class="vaccine-section">
          <h4>甲肝减毒活疫苗</h4>
          <p class="vaccine-purpose">预防甲型肝炎病毒感染引起的甲型肝炎。</p>
        </div>`
      }
    ],
    unplanned: [
      {
        name: '甲肝疫苗',
        content: `<div class="vaccine-section">
          <h4>甲肝疫苗</h4>
          <p class="vaccine-purpose">预防甲型肝炎病毒感染引起的甲型肝炎。</p>
        </div>`
      },
      {
        name: '流感疫苗',
        content: `<div class="vaccine-section">
          <h4>流感疫苗</h4>
          <p class="vaccine-purpose">预防甲型、乙型流感病毒感染，降低流感的发病率，减少因流感引发的肺炎、心肌炎等并发症。</p>
          <div class="vaccine-detail">
            <p><strong>三价、四价流感病毒裂解疫苗</strong>：≥6月龄人群；1或2剂次（6-35月龄儿童接种2剂次，间隔4周；≥3岁儿童及成人接种1剂次）</p>
          </div>
        </div>`
      },
      {
        name: '23价肺炎疫苗',
        content: `<div class="vaccine-section">
          <h4>23价肺炎疫苗</h4>
          <p class="vaccine-purpose">预防23种血清型肺炎球菌引起的感染性疾病，包括肺炎、脑膜炎、败血症等。</p>
        </div>`
      },
      {
        name: '水痘疫苗',
        content: `<div class="vaccine-section">
          <h4>水痘疫苗</h4>
          <p class="vaccine-purpose">预防水痘-带状疱疹病毒感染，避免水痘引起的发热、皮疹、瘙痒等症状，降低并发症风险。</p>
        </div>`
      },
      {
        name: '肠道病毒71型灭活疫苗（手足口疫苗）',
        content: `<div class="vaccine-section">
          <h4>肠道病毒71型灭活疫苗（手足口疫苗）</h4>
          <p class="vaccine-purpose">预防由肠道病毒 71 型引起的手足口病（重点降低重症风险，如脑炎、肺水肿）。</p>
          <div class="vaccine-detail">
            <p><strong>肠道病毒71型灭活疫苗</strong>：6月龄至71月龄易感者；基础免疫程序为2剂次，间隔1个月。</p>
          </div>
        </div>`
      },
      {
        name: '流脑疫苗',
        content: `<div class="vaccine-section">
          <h4>流脑疫苗</h4>
          <p class="vaccine-purpose">预防脑膜炎奈瑟菌引起的流行性脑脊髓膜炎（流脑），减轻高热、头痛、皮肤瘀斑、脑膜刺激征等症状，降低重症死亡率。</p>
          <div class="vaccine-detail">
            <p>①<strong>A群C群脑膜炎球菌多糖结合疫苗</strong>：3月龄（出生满90天）~23月龄（2周岁生日前）婴幼儿；可在18月龄加强接种1剂。</p>
          </div>
        </div>`
      },
      {
        name: '霍乱疫苗',
        content: `<div class="vaccine-section">
          <h4>霍乱疫苗</h4>
          <p class="vaccine-purpose">预防霍乱弧菌引起的霍乱，避免严重的腹泻和脱水。</p>
        </div>`
      },
      {
        name: '乙脑疫苗',
        content: `<div class="vaccine-section">
          <h4>乙脑疫苗</h4>
          <p class="vaccine-purpose">预防乙型脑炎病毒感染引起的乙型脑炎（乙脑），避免病毒侵犯中枢神经系统导致高热、抽搐、昏迷，降低致残率和死亡率。</p>
        </div>`
      }
    ]
  },
  '12month': {
    title: '12 月龄',
    planned: [
      {
        name: 'A群流脑多糖疫苗',
        content: `<div class="vaccine-section">
          <h4>A群流脑多糖疫苗</h4>
          <p class="vaccine-purpose">预防A群脑膜炎球菌引起的流行性脑脊髓膜炎（流脑）。</p>
        </div>`
      }
    ],
    unplanned: [
      {
        name: '水痘疫苗',
        content: `<div class="vaccine-section">
          <h4>水痘疫苗</h4>
          <p class="vaccine-purpose">预防水痘-带状疱疹病毒感染，避免水痘引起的发热、皮疹、瘙痒等症状，降低并发症风险。</p>
        </div>`
      },
      {
        name: '流感疫苗',
        content: `<div class="vaccine-section">
          <h4>流感疫苗</h4>
          <p class="vaccine-purpose">预防甲型、乙型流感病毒感染，降低流感的发病率，减少因流感引发的肺炎、心肌炎等并发症。</p>
          <div class="vaccine-detail">
            <p><strong>三价、四价流感病毒裂解疫苗</strong>：≥6月龄人群；1或2剂次（6-35月龄儿童接种2剂次，间隔4周；≥3岁儿童及成人接种1剂次）</p>
          </div>
        </div>`
      },
      {
        name: '肠道病毒71型灭活疫苗（手足口疫苗）',
        content: `<div class="vaccine-section">
          <h4>肠道病毒71型灭活疫苗（手足口疫苗）</h4>
          <p class="vaccine-purpose">预防由肠道病毒 71 型引起的手足口病（重点降低重症风险，如脑炎、肺水肿）。</p>
          <div class="vaccine-detail">
            <p><strong>肠道病毒71型灭活疫苗</strong>：6月龄至71月龄易感者；基础免疫程序为2剂次，间隔1个月。</p>
          </div>
        </div>`
      },
      {
        name: '流脑疫苗',
        content: `<div class="vaccine-section">
          <h4>流脑疫苗</h4>
          <p class="vaccine-purpose">预防脑膜炎奈瑟菌引起的流行性脑脊髓膜炎（流脑），减轻高热、头痛、皮肤瘀斑、脑膜刺激征等症状，降低重症死亡率。</p>
          <div class="vaccine-detail">
            <p>①<strong>A群C群脑膜炎球菌多糖结合疫苗</strong>：3月龄（出生满90天）~23月龄（2周岁生日前）婴幼儿；可在12月龄加强接种1剂。</p>
            <p>②<strong>ACYW135群脑膜炎球菌多糖结合疫苗</strong>：3月龄~3周岁（47月龄）儿童；可在12月龄时加强注射1剂次。</p>
          </div>
        </div>`
      },
      {
        name: '霍乱疫苗',
        content: `<div class="vaccine-section">
          <h4>霍乱疫苗</h4>
          <p class="vaccine-purpose">预防霍乱弧菌引起的霍乱，避免严重的腹泻和脱水。</p>
        </div>`
      },
      {
        name: '乙脑疫苗',
        content: `<div class="vaccine-section">
          <h4>乙脑疫苗</h4>
          <p class="vaccine-purpose">预防乙型脑炎病毒感染引起的乙型脑炎（乙脑），避免病毒侵犯中枢神经系统导致高热、抽搐、昏迷，降低致残率和死亡率。</p>
        </div>`
      }
    ]
  },
  '9month': {
    title: '9 月龄',
    planned: [
      {
        name: 'A群流脑多糖疫苗',
        content: `<div class="vaccine-section">
          <h4>A群流脑多糖疫苗</h4>
          <p class="vaccine-purpose">预防A群脑膜炎球菌引起的流行性脑脊髓膜炎（流脑）。</p>
        </div>`
      }
    ],
    unplanned: [
      {
        name: 'b型流感嗜血杆菌疫苗',
        content: `<div class="vaccine-section">
          <h4>b型流感嗜血杆菌疫苗</h4>
          <p class="vaccine-purpose">预防 b 型流感嗜血杆菌感染引起的严重疾病，包括脑膜炎、肺炎、败血症、会厌炎、蜂窝织炎等，尤其保护婴幼儿免受重症侵袭。</p>
          <div class="vaccine-detail">
            <p><strong>b型流感嗜血杆菌结合疫苗</strong>：适用于2月龄-5周岁；6-12月龄3剂次（每间隔1或2月接种1次，共2次；在18月龄时进行加强接种1次。）</p>
          </div>
        </div>`
      },
      {
        name: '流感疫苗',
        content: `<div class="vaccine-section">
          <h4>流感疫苗</h4>
          <p class="vaccine-purpose">预防甲型、乙型流感病毒感染，降低流感的发病率，减少因流感引发的肺炎、心肌炎等并发症。</p>
          <div class="vaccine-detail">
            <p><strong>三价、四价流感病毒裂解疫苗</strong>：≥6月龄人群；1或2剂次（6-35月龄儿童接种2剂次，间隔4周；≥3岁儿童及成人接种1剂次）</p>
          </div>
        </div>`
      },
      {
        name: '肠道病毒71型灭活疫苗（手足口疫苗）',
        content: `<div class="vaccine-section">
          <h4>肠道病毒71型灭活疫苗（手足口疫苗）</h4>
          <p class="vaccine-purpose">预防由肠道病毒 71 型引起的手足口病（重点降低重症风险，如脑炎、肺水肿）。</p>
          <div class="vaccine-detail">
            <p><strong>肠道病毒71型灭活疫苗</strong>：6月龄至71月龄易感者；基础免疫程序为2剂次，间隔1个月。</p>
          </div>
        </div>`
      },
      {
        name: '流脑疫苗',
        content: `<div class="vaccine-section">
          <h4>流脑疫苗</h4>
          <p class="vaccine-purpose">预防脑膜炎奈瑟菌引起的流行性脑脊髓膜炎（流脑），减轻高热、头痛、皮肤瘀斑、脑膜刺激征等症状，降低重症死亡率。</p>
          <div class="vaccine-detail">
            <p>①<strong>A群C群脑膜炎球菌多糖结合疫苗</strong>：3月龄（出生满90天）~23月龄（2周岁生日前）婴幼儿；3剂次（6~11月龄婴儿基础免疫2剂次，每剂间隔至少1个月，可在18月龄加强接种1剂。）</p>
            <p>②<strong>ACYW135群脑膜炎球菌多糖结合疫苗</strong>：3月龄~3周岁（47月龄）儿童；2剂次（6~23月龄: 免疫2剂次,每剂次间隔1~3个月。）</p>
          </div>
        </div>`
      }
    ]
  },
  '8month': {
    title: '8 月龄',
    planned: [
      {
        name: '麻腮风疫苗',
        content: `<div class="vaccine-section">
          <h4>麻腮风疫苗</h4>
          <p class="vaccine-purpose">预防麻疹、腮腺炎、风疹三种传染病。</p>
        </div>`
      },
      {
        name: '乙脑减毒活疫苗',
        content: `<div class="vaccine-section">
          <h4>乙脑减毒活疫苗</h4>
          <p class="vaccine-purpose">预防乙型脑炎病毒感染引起的乙型脑炎（乙脑），避免病毒侵犯中枢神经系统导致高热、抽搐、昏迷，降低致残率和死亡率。</p>
        </div>`
      }
    ],
    unplanned: [
      {
        name: 'b型流感嗜血杆菌疫苗',
        content: `<div class="vaccine-section">
          <h4>b型流感嗜血杆菌疫苗</h4>
          <p class="vaccine-purpose">预防 b 型流感嗜血杆菌感染引起的严重疾病，包括脑膜炎、肺炎、败血症、会厌炎、蜂窝织炎等，尤其保护婴幼儿免受重症侵袭。</p>
          <div class="vaccine-detail">
            <p><strong>b型流感嗜血杆菌结合疫苗</strong>：适用于2月龄-5周岁；6-12月龄3剂次（每间隔1或2月接种1次，共2次；在18月龄时进行加强接种1次。）</p>
          </div>
        </div>`
      },
      {
        name: '流感疫苗',
        content: `<div class="vaccine-section">
          <h4>流感疫苗</h4>
          <p class="vaccine-purpose">预防甲型、乙型流感病毒感染，降低流感的发病率，减少因流感引发的肺炎、心肌炎等并发症。</p>
          <div class="vaccine-detail">
            <p><strong>三价、四价流感病毒裂解疫苗</strong>：≥6月龄人群；1或2剂次（6-35月龄儿童接种2剂次，间隔4周；≥3岁儿童及成人接种1剂次）</p>
          </div>
        </div>`
      },
      {
        name: '肠道病毒71型灭活疫苗（手足口疫苗）',
        content: `<div class="vaccine-section">
          <h4>肠道病毒71型灭活疫苗（手足口疫苗）</h4>
          <p class="vaccine-purpose">预防由肠道病毒 71 型引起的手足口病（重点降低重症风险，如脑炎、肺水肿）。</p>
          <div class="vaccine-detail">
            <p><strong>肠道病毒71型灭活疫苗</strong>：6月龄至71月龄易感者；基础免疫程序为2剂次，间隔1个月。</p>
          </div>
        </div>`
      },
      {
        name: '流脑疫苗',
        content: `<div class="vaccine-section">
          <h4>流脑疫苗</h4>
          <p class="vaccine-purpose">预防脑膜炎奈瑟菌引起的流行性脑脊髓膜炎（流脑），减轻高热、头痛、皮肤瘀斑、脑膜刺激征等症状，降低重症死亡率。</p>
          <div class="vaccine-detail">
            <p>①<strong>A群C群脑膜炎球菌多糖结合疫苗</strong>：3月龄（出生满90天）~23月龄（2周岁生日前）婴幼儿；3剂次（6~11月龄婴儿基础免疫2剂次，每剂间隔至少1个月，可在18月龄加强接种1剂。）</p>
            <p>②<strong>ACYW135群脑膜炎球菌多糖结合疫苗</strong>：3月龄~3周岁（47月龄）儿童；2剂次（6~23月龄: 免疫2剂次,每剂次间隔1~3个月。）</p>
          </div>
        </div>`
      }
    ]
  },
  '7month': {
    title: '7 月龄',
    planned: [
      {
        name: '乙肝疫苗',
        content: `<div class="vaccine-section">
          <h4>乙肝疫苗</h4>
          <p class="vaccine-purpose">预防乙型肝炎病毒感染，从而降低肝硬化和肝癌风险。</p>
          <div class="vaccine-detail">
            <p><strong>重组乙型肝炎疫苗（10微克）</strong>：适用于乙型肝炎易感者，尤其是(1)新生儿，特别是母亲为HBsAg、HBeAg阳性者；(2)从事医疗工作的医护人员及接触血液的实验人员。免疫程序为3剂次（分别在0、1、6月接种，新生儿在出生后24小时内注射第1针。）</p>
          </div>
        </div>`
      }
    ],
    unplanned: [
      {
        name: '轮状病毒疫苗',
        content: `<div class="vaccine-section">
          <h4>轮状病毒疫苗</h4>
          <p class="vaccine-purpose">预防轮状病毒引起的婴幼儿腹泻（俗称 "秋季腹泻"），可显著降低重症腹泻发生率，减少因腹泻导致的脱水、住院等风险。</p>
          <div class="vaccine-detail">
            <p><strong>口服轮状病毒活疫苗</strong>：2月龄-3岁，1剂次</p>
            <p><strong>口服三价重配轮状病毒减毒活疫苗</strong>：6-32周龄，3剂次（6-13周龄开始口服第一剂，每剂间隔1月，第3剂接种不应晚于32周龄。）</p>
            <p><strong>口服五价重配轮状病毒减毒活疫苗</strong>：6-32周龄，3剂次（6-12周龄开始口服第一剂，每剂间隔4-10周，第3剂接种不应晚于32周龄。）</p>
            <p><strong>口服六价重配轮状病毒减毒活疫苗</strong>：6-36周龄，3剂次（6-12周龄开始口服第一剂，每剂间隔至少4周，第3剂接种不应晚于36周龄。）</p>
          </div>
        </div>`
      },
      {
        name: 'b型流感嗜血杆菌疫苗',
        content: `<div class="vaccine-section">
          <h4>b型流感嗜血杆菌疫苗</h4>
          <p class="vaccine-purpose">预防 b 型流感嗜血杆菌感染引起的严重疾病，包括脑膜炎、肺炎、败血症、会厌炎、蜂窝织炎等，尤其保护婴幼儿免受重症侵袭。</p>
          <div class="vaccine-detail">
            <p><strong>b型流感嗜血杆菌结合疫苗</strong>：适用于2月龄-5周岁；6-12月龄3剂次（每间隔1或2月接种1次，共2次；在18月龄时进行加强接种1次。）</p>
          </div>
        </div>`
      },
      {
        name: '流感疫苗',
        content: `<div class="vaccine-section">
          <h4>流感疫苗</h4>
          <p class="vaccine-purpose">预防甲型、乙型流感病毒感染，降低流感的发病率，减少因流感引发的肺炎、心肌炎等并发症。</p>
          <div class="vaccine-detail">
            <p><strong>三价、四价流感病毒裂解疫苗</strong>：≥6月龄人群；1或2剂次（6-35月龄儿童接种2剂次，间隔4周；≥3岁儿童及成人接种1剂次）</p>
          </div>
        </div>`
      },
      {
        name: '13价肺炎疫苗',
        content: `<div class="vaccine-section">
          <h4>13价肺炎疫苗</h4>
          <p class="vaccine-purpose">预防 13 种血清型肺炎球菌引起的感染性疾病，包括肺炎、脑膜炎、败血症、中耳炎等，尤其降低婴幼儿重症感染风险</p>
          <div class="vaccine-detail">
            <p><strong>13价肺炎球菌多糖结合疫苗</strong>：适用于6周龄至5岁（6周岁生日前）婴幼儿和儿童。（2-6月龄婴儿：共接种4剂。推荐首剂在2月龄(最小满6周龄)接种，基础免疫接种3剂，每剂接种间隔2个月；于12-15月龄加强接种1剂。）</p>
          </div>
        </div>`
      },
      {
        name: '肠道病毒71型灭活疫苗（手足口疫苗）',
        content: `<div class="vaccine-section">
          <h4>肠道病毒71型灭活疫苗（手足口疫苗）</h4>
          <p class="vaccine-purpose">预防由肠道病毒 71 型引起的手足口病（重点降低重症风险，如脑炎、肺水肿）。</p>
          <div class="vaccine-detail">
            <p><strong>肠道病毒71型灭活疫苗</strong>：6月龄至71月龄易感者；基础免疫程序为2剂次，间隔1个月。</p>
          </div>
        </div>`
      },
      {
        name: '流脑疫苗',
        content: `<div class="vaccine-section">
          <h4>流脑疫苗</h4>
          <p class="vaccine-purpose">预防脑膜炎奈瑟菌引起的流行性脑脊髓膜炎（流脑），减轻高热、头痛、皮肤瘀斑、脑膜刺激征等症状，降低重症死亡率。</p>
          <div class="vaccine-detail">
            <p>①<strong>A群C群脑膜炎球菌多糖结合疫苗</strong>：3月龄（出生满90天）~23月龄（2周岁生日前）婴幼儿；3剂次（6~11月龄婴儿基础免疫2剂次，每剂间隔至少1个月，可在18月龄加强接种1剂。）</p>
            <p>②<strong>ACYW135群脑膜炎球菌多糖结合疫苗</strong>：3月龄~3周岁（47月龄）儿童；2剂次（6~23月龄: 免疫2剂次,每剂次间隔1~3个月。）</p>
          </div>
        </div>`
      },
      {
        name: '乙脑疫苗',
        content: `<div class="vaccine-section">
          <h4>乙脑疫苗</h4>
          <p class="vaccine-purpose">预防乙型脑炎病毒感染引起的乙型脑炎（乙脑），避免病毒侵犯中枢神经系统导致高热、抽搐、昏迷，降低致残率和死亡率。</p>
          <div class="vaccine-detail">
            <p><strong>乙型脑炎灭活疫苗（Vero细胞）</strong>：6个月至10周岁儿童和由非疫区有可能进入疫区的儿童和成人；3剂次（基础免疫应注射两针，初次免疫后第7天注射第2针，基础免疫后1个月至1年内加强免疫1次。可根据当地流行情况在基础免疫后的3~4年再加强1次，每次注射1剂。）</p>
          </div>
        </div>`
      }
    ]
  },
  '6month': {
    title: '6 月龄',
    planned: [
      {
        name: '乙肝疫苗',
        content: `<div class="vaccine-section">
          <h4>乙肝疫苗</h4>
          <p class="vaccine-purpose">预防乙型肝炎病毒感染，从而降低肝硬化和肝癌风险。</p>
          <div class="vaccine-detail">
            <p><strong>重组乙型肝炎疫苗（10微克）</strong>：适用于乙型肝炎易感者，尤其是(1)新生儿，特别是母亲为HBsAg、HBeAg阳性者；(2)从事医疗工作的医护人员及接触血液的实验人员。免疫程序为3剂次（分别在0、1、6月接种，新生儿在出生后24小时内注射第1针。）</p>
          </div>
        </div>`
      }
    ],
    unplanned: [
      {
        name: '轮状病毒疫苗',
        content: `<div class="vaccine-section">
          <h4>轮状病毒疫苗</h4>
          <p class="vaccine-purpose">预防轮状病毒引起的婴幼儿腹泻（俗称 "秋季腹泻"），可显著降低重症腹泻发生率，减少因腹泻导致的脱水、住院等风险。</p>
          <div class="vaccine-detail">
            <p><strong>口服轮状病毒活疫苗</strong>：2月龄-3岁，1剂次</p>
            <p><strong>口服三价重配轮状病毒减毒活疫苗</strong>：6-32周龄，3剂次（6-13周龄开始口服第一剂，每剂间隔1月，第3剂接种不应晚于32周龄。）</p>
            <p><strong>口服五价重配轮状病毒减毒活疫苗</strong>：6-32周龄，3剂次（6-12周龄开始口服第一剂，每剂间隔4-10周，第3剂接种不应晚于32周龄。）</p>
            <p><strong>口服六价重配轮状病毒减毒活疫苗</strong>：6-36周龄，3剂次（6-12周龄开始口服第一剂，每剂间隔至少4周，第3剂接种不应晚于36周龄。）</p>
          </div>
        </div>`
      },
      {
        name: 'b型流感嗜血杆菌疫苗',
        content: `<div class="vaccine-section">
          <h4>b型流感嗜血杆菌疫苗</h4>
          <p class="vaccine-purpose">预防 b 型流感嗜血杆菌感染引起的严重疾病，包括脑膜炎、肺炎、败血症、会厌炎、蜂窝织炎等，尤其保护婴幼儿免受重症侵袭。</p>
          <div class="vaccine-detail">
            <p><strong>b型流感嗜血杆菌结合疫苗</strong>：适用于2月龄-5周岁；6-12月龄3剂次（每间隔1或2月接种1次，共2次；在18月龄时进行加强接种1次。）</p>
          </div>
        </div>`
      },
      {
        name: '流感疫苗',
        content: `<div class="vaccine-section">
          <h4>流感疫苗</h4>
          <p class="vaccine-purpose">预防甲型、乙型流感病毒感染，降低流感的发病率，减少因流感引发的肺炎、心肌炎等并发症。</p>
          <div class="vaccine-detail">
            <p><strong>三价、四价流感病毒裂解疫苗</strong>：≥6月龄人群；1或2剂次（6-35月龄儿童接种2剂次，间隔4周；≥3岁儿童及成人接种1剂次）</p>
          </div>
        </div>`
      },
      {
        name: '13价肺炎疫苗',
        content: `<div class="vaccine-section">
          <h4>13价肺炎疫苗</h4>
          <p class="vaccine-purpose">预防 13 种血清型肺炎球菌引起的感染性疾病，包括肺炎、脑膜炎、败血症、中耳炎等，尤其降低婴幼儿重症感染风险</p>
          <div class="vaccine-detail">
            <p><strong>13价肺炎球菌多糖结合疫苗</strong>：适用于6周龄至5岁（6周岁生日前）婴幼儿和儿童。（2-6月龄婴儿：共接种4剂。推荐首剂在2月龄(最小满6周龄)接种，基础免疫接种3剂，每剂接种间隔2个月；于12-15月龄加强接种1剂。）</p>
          </div>
        </div>`
      },
      {
        name: '肠道病毒71型灭活疫苗（手足口疫苗）',
        content: `<div class="vaccine-section">
          <h4>肠道病毒71型灭活疫苗（手足口疫苗）</h4>
          <p class="vaccine-purpose">预防由肠道病毒 71 型引起的手足口病（重点降低重症风险，如脑炎、肺水肿）。</p>
          <div class="vaccine-detail">
            <p><strong>肠道病毒71型灭活疫苗</strong>：6月龄至71月龄易感者；基础免疫程序为2剂次，间隔1个月。</p>
          </div>
        </div>`
      },
      {
        name: '流脑疫苗',
        content: `<div class="vaccine-section">
          <h4>流脑疫苗</h4>
          <p class="vaccine-purpose">预防脑膜炎奈瑟菌引起的流行性脑脊髓膜炎（流脑），减轻高热、头痛、皮肤瘀斑、脑膜刺激征等症状，降低重症死亡率。</p>
          <div class="vaccine-detail">
            <p>①<strong>A群C群脑膜炎球菌多糖结合疫苗</strong>：3月龄（出生满90天）~23月龄（2周岁生日前）婴幼儿；3剂次（6~11月龄婴儿基础免疫2剂次，每剂间隔至少1个月，可在18月龄加强接种1剂。）</p>
            <p>②<strong>ACYW135群脑膜炎球菌多糖结合疫苗</strong>：3月龄~3周岁（47月龄）儿童；2剂次（6~23月龄: 免疫2剂次,每剂次间隔1~3个月。）</p>
          </div>
        </div>`
      },
      {
        name: '乙脑疫苗',
        content: `<div class="vaccine-section">
          <h4>乙脑疫苗</h4>
          <p class="vaccine-purpose">预防乙型脑炎病毒感染引起的乙型脑炎（乙脑），避免病毒侵犯中枢神经系统导致高热、抽搐、昏迷，降低致残率和死亡率。</p>
          <div class="vaccine-detail">
            <p><strong>乙型脑炎灭活疫苗（Vero细胞）</strong>：6个月至10周岁儿童和由非疫区有可能进入疫区的儿童和成人；3剂次（基础免疫应注射两针，初次免疫后第7天注射第2针，基础免疫后1个月至1年内加强免疫1次。可根据当地流行情况在基础免疫后的3~4年再加强1次，每次注射1剂。）</p>
          </div>
        </div>`
      }
    ]
  },
  '5month': {
    title: '5 月龄',
    planned: [
      {
        name: '百白破疫苗',
        content: `<div class="vaccine-section">
          <h4>百白破疫苗</h4>
          <p class="vaccine-purpose">预防百日咳、白喉、破伤风三种疾病。</p>
          <div class="vaccine-detail">
            <p><strong>吸附无细胞百白破联合疫苗</strong>：3月龄以上婴幼儿；4剂次（3、4、5月龄进行基础免疫，18~24月龄加强免疫。）</p>
          </div>
        </div>`
      }
    ],
    unplanned: [
      {
        name: '轮状病毒疫苗',
        content: `<div class="vaccine-section">
          <h4>轮状病毒疫苗</h4>
          <p class="vaccine-purpose">预防轮状病毒引起的婴幼儿腹泻（俗称 "秋季腹泻"），可显著降低重症腹泻发生率，减少因腹泻导致的脱水、住院等风险。</p>
          <div class="vaccine-detail">
            <p><strong>口服轮状病毒活疫苗</strong>：2月龄-3岁，1剂次</p>
            <p><strong>口服三价重配轮状病毒减毒活疫苗</strong>：6-32周龄，3剂次（6-13周龄开始口服第一剂，每剂间隔1月，第3剂接种不应晚于32周龄。）</p>
            <p><strong>口服五价重配轮状病毒减毒活疫苗</strong>：6-32周龄，3剂次（6-12周龄开始口服第一剂，每剂间隔4-10周，第3剂接种不应晚于32周龄。）</p>
            <p><strong>口服六价重配轮状病毒减毒活疫苗</strong>：6-36周龄，3剂次（6-12周龄开始口服第一剂，每剂间隔至少4周，第3剂接种不应晚于36周龄。）</p>
          </div>
        </div>`
      },
      {
        name: 'b型流感嗜血杆菌疫苗',
        content: `<div class="vaccine-section">
          <h4>b型流感嗜血杆菌疫苗</h4>
          <p class="vaccine-purpose">预防 b 型流感嗜血杆菌感染引起的严重疾病，包括脑膜炎、肺炎、败血症、会厌炎、蜂窝织炎等，尤其保护婴幼儿免受重症侵袭。</p>
          <div class="vaccine-detail">
            <p><strong>b型流感嗜血杆菌结合疫苗</strong>：适用于2月龄-5周岁；2-6月龄4剂次（从2或3月龄开始，每间隔1或2月接种1次，共3次；在18月龄时进行加强接种1次。）</p>
          </div>
        </div>`
      },
      {
        name: '13价肺炎疫苗',
        content: `<div class="vaccine-section">
          <h4>13价肺炎疫苗</h4>
          <p class="vaccine-purpose">预防 13 种血清型肺炎球菌引起的感染性疾病，包括肺炎、脑膜炎、败血症、中耳炎等，尤其降低婴幼儿重症感染风险</p>
          <div class="vaccine-detail">
            <p><strong>13价肺炎球菌多糖结合疫苗</strong>：适用于6周龄至5岁（6周岁生日前）婴幼儿和儿童。（2-6月龄婴儿：共接种4剂。推荐首剂在2月龄(最小满6周龄)接种，基础免疫接种3剂，每剂接种间隔2个月；于12-15月龄加强接种1剂。）</p>
          </div>
        </div>`
      },
      {
        name: '流脑疫苗',
        content: `<div class="vaccine-section">
          <h4>流脑疫苗</h4>
          <p class="vaccine-purpose">预防脑膜炎奈瑟菌引起的流行性脑脊髓膜炎（流脑），减轻高热、头痛、皮肤瘀斑、脑膜刺激征等症状，降低重症死亡率。</p>
          <div class="vaccine-detail">
            <p>①<strong>A群C群脑膜炎球菌多糖结合疫苗</strong>：3月龄（出生满90天）~23月龄（2周岁生日前）婴幼儿；4剂次（3~5月龄婴儿基础免疫3剂次，每剂间隔至少1个月，可在18月龄加强接种1剂。）</p>
            <p>②<strong>ACYW135群脑膜炎球菌多糖结合疫苗</strong>：3月龄~3周岁（47月龄）儿童；4剂次（3~5月龄婴儿基础免疫3剂次,建议自3月龄开始,每剂次间隔1个月,可在12月龄时加强注射1剂次）。</p>
          </div>
        </div>`
      },
      {
        name: '无细胞百白破b型流感嗜血杆菌联合疫苗（四联）',
        content: `<div class="vaccine-section">
          <h4>无细胞百白破b型流感嗜血杆菌联合疫苗（四联）</h4>
          <p class="vaccine-purpose">可预防百日咳、白喉、破伤风、b型流感嗜血杆菌感染（脑膜炎、肺炎等）四种疾病。</p>
          <div class="vaccine-detail">
            <p><strong>无细胞百白破b型流感嗜血杆菌联合疫苗</strong>：3月龄以上婴幼儿；4剂次（3、4、5月龄进行基础免疫，18~24月龄加强免疫。）</p>
          </div>
        </div>`
      }
    ]
  },
  '4month': {
    title: '4 月龄',
    planned: [
      {
        name: '脊髓灰质炎疫苗',
        content: `<div class="vaccine-section">
          <h4>脊髓灰质炎疫苗</h4>
          <p class="vaccine-purpose">预防脊髓灰质炎（俗称 "小儿麻痹症"），避免病毒侵犯神经系统导致肢体瘫痪。</p>
          <div class="vaccine-detail">
            <p><strong>脊髓灰质炎灭活疫苗</strong>：≥2月龄婴幼儿、儿童和成人；4剂次（2、3、4月龄各1剂次，18月龄加强免疫1剂）。</p>
          </div>
        </div>`
      }
    ],
    unplanned: [
      {
        name: '轮状病毒疫苗',
        content: `<div class="vaccine-section">
          <h4>轮状病毒疫苗</h4>
          <p class="vaccine-purpose">预防轮状病毒引起的婴幼儿腹泻（俗称 "秋季腹泻"），可显著降低重症腹泻发生率，减少因腹泻导致的脱水、住院等风险。</p>
          <div class="vaccine-detail">
            <p><strong>口服轮状病毒活疫苗</strong>：2月龄-3岁，1剂次</p>
            <p><strong>口服三价重配轮状病毒减毒活疫苗</strong>：6-32周龄，3剂次（6-13周龄开始口服第一剂，每剂间隔1月，第3剂接种不应晚于32周龄。）</p>
            <p><strong>口服五价重配轮状病毒减毒活疫苗</strong>：6-32周龄，3剂次（6-12周龄开始口服第一剂，每剂间隔4-10周，第3剂接种不应晚于32周龄。）</p>
            <p><strong>口服六价重配轮状病毒减毒活疫苗</strong>：6-36周龄，3剂次（6-12周龄开始口服第一剂，每剂间隔至少4周，第3剂接种不应晚于36周龄。）</p>
          </div>
        </div>`
      },
      {
        name: 'b型流感嗜血杆菌疫苗',
        content: `<div class="vaccine-section">
          <h4>b型流感嗜血杆菌疫苗</h4>
          <p class="vaccine-purpose">预防 b 型流感嗜血杆菌感染引起的严重疾病，包括脑膜炎、肺炎、败血症、会厌炎、蜂窝织炎等，尤其保护婴幼儿免受重症侵袭。</p>
          <div class="vaccine-detail">
            <p><strong>b型流感嗜血杆菌结合疫苗</strong>：适用于2月龄-5周岁；2-6月龄4剂次（从2或3月龄开始，每间隔1或2月接种1次，共3次；在18月龄时进行加强接种1次。）</p>
          </div>
        </div>`
      },
      {
        name: '13价肺炎疫苗',
        content: `<div class="vaccine-section">
          <h4>13价肺炎疫苗</h4>
          <p class="vaccine-purpose">预防 13 种血清型肺炎球菌引起的感染性疾病，包括肺炎、脑膜炎、败血症、中耳炎等，尤其降低婴幼儿重症感染风险</p>
          <div class="vaccine-detail">
            <p><strong>13价肺炎球菌多糖结合疫苗</strong>：适用于6周龄至5岁（6周岁生日前）婴幼儿和儿童。（2-6月龄婴儿：共接种4剂。推荐首剂在2月龄(最小满6周龄)接种，基础免疫接种3剂，每剂接种间隔2个月；于12-15月龄加强接种1剂。）</p>
          </div>
        </div>`
      },
      {
        name: '流脑疫苗',
        content: `<div class="vaccine-section">
          <h4>流脑疫苗</h4>
          <p class="vaccine-purpose">预防脑膜炎奈瑟菌引起的流行性脑脊髓膜炎（流脑），减轻高热、头痛、皮肤瘀斑、脑膜刺激征等症状，降低重症死亡率。</p>
          <div class="vaccine-detail">
            <p>①<strong>A群C群脑膜炎球菌多糖结合疫苗</strong>：3月龄（出生满90天）~23月龄（2周岁生日前）婴幼儿；4剂次（3~5月龄婴儿基础免疫3剂次，每剂间隔至少1个月，可在18月龄加强接种1剂。）</p>
            <p>②<strong>ACYW135群脑膜炎球菌多糖结合疫苗</strong>：3月龄~3周岁（47月龄）儿童；4剂次（3~5月龄婴儿基础免疫3剂次,建议自3月龄开始,每剂次间隔1个月,可在12月龄时加强注射1剂次）。</p>
          </div>
        </div>`
      },
      {
        name: '无细胞百白破灭活脊髓灰质炎和b型流感嗜血杆菌联合疫苗（五联）',
        content: `<div class="vaccine-section">
          <h4>无细胞百白破灭活脊髓灰质炎和b型流感嗜血杆菌联合疫苗（五联）</h4>
          <p class="vaccine-purpose">同时预防五种疾病，包括百日咳、白喉、破伤风、脊髓灰质炎、b 型流感嗜血杆菌感染（Hib 感染）。</p>
          <div class="vaccine-detail">
            <p><strong>吸附无细胞百白破脊髓灰质炎和b型流感嗜血杆菌联合疫苗</strong>：2月龄以上婴幼儿，4剂次（在2、3、4月龄或3、4、5月龄进行三剂基础免疫，在18月龄进行一剂加强免疫。）</p>
          </div>
        </div>`
      },
      {
        name: '无细胞百白破b型流感嗜血杆菌联合疫苗（四联）',
        content: `<div class="vaccine-section">
          <h4>无细胞百白破b型流感嗜血杆菌联合疫苗（四联）</h4>
          <p class="vaccine-purpose">可预防百日咳、白喉、破伤风、b型流感嗜血杆菌感染（脑膜炎、肺炎等）四种疾病。</p>
          <div class="vaccine-detail">
            <p><strong>无细胞百白破b型流感嗜血杆菌联合疫苗</strong>：3月龄以上婴幼儿；4剂次（3、4、5月龄进行基础免疫，18~24月龄加强免疫。）</p>
          </div>
        </div>`
      }
    ]
  },
  '3.5month': {
    title: '3.5 月龄',
    planned: [],
    unplanned: [
      {
        name: '轮状病毒疫苗',
        content: `<div class="vaccine-section">
          <h4>轮状病毒疫苗</h4>
          <p class="vaccine-purpose">预防轮状病毒引起的婴幼儿腹泻（俗称 "秋季腹泻"），可显著降低重症腹泻发生率，减少因腹泻导致的脱水、住院等风险。</p>
          <div class="vaccine-detail">
            <p><strong>口服轮状病毒活疫苗</strong>：2月龄-3岁，1剂次</p>
            <p><strong>口服三价重配轮状病毒减毒活疫苗</strong>：6-32周龄，3剂次（6-13周龄开始口服第一剂，每剂间隔1月，第3剂接种不应晚于32周龄。）</p>
            <p><strong>口服五价重配轮状病毒减毒活疫苗</strong>：6-32周龄，3剂次（6-12周龄开始口服第一剂，每剂间隔4-10周，第3剂接种不应晚于32周龄。）</p>
            <p><strong>口服六价重配轮状病毒减毒活疫苗</strong>：6-36周龄，3剂次（6-12周龄开始口服第一剂，每剂间隔至少4周，第3剂接种不应晚于36周龄。）</p>
          </div>
        </div>`
      },
      {
        name: 'b型流感嗜血杆菌疫苗',
        content: `<div class="vaccine-section">
          <h4>b型流感嗜血杆菌疫苗</h4>
          <p class="vaccine-purpose">预防 b 型流感嗜血杆菌感染引起的严重疾病，包括脑膜炎、肺炎、败血症、会厌炎、蜂窝织炎等，尤其保护婴幼儿免受重症侵袭。</p>
          <div class="vaccine-detail">
            <p><strong>b型流感嗜血杆菌结合疫苗</strong>：适用于2月龄-5周岁；2-6月龄4剂次（从2或3月龄开始，每间隔1或2月接种1次，共3次；在18月龄时进行加强接种1次。）</p>
          </div>
        </div>`
      },
      {
        name: '13价肺炎疫苗',
        content: `<div class="vaccine-section">
          <h4>13价肺炎疫苗</h4>
          <p class="vaccine-purpose">预防 13 种血清型肺炎球菌引起的感染性疾病，包括肺炎、脑膜炎、败血症、中耳炎等，尤其降低婴幼儿重症感染风险</p>
          <div class="vaccine-detail">
            <p><strong>13价肺炎球菌多糖结合疫苗</strong>：适用于6周龄至5岁（6周岁生日前）婴幼儿和儿童。（2-6月龄婴儿：共接种4剂。推荐首剂在2月龄(最小满6周龄)接种，基础免疫接种3剂，每剂接种间隔2个月；于12-15月龄加强接种1剂。）</p>
          </div>
        </div>`
      },
      {
        name: '流脑疫苗',
        content: `<div class="vaccine-section">
          <h4>流脑疫苗</h4>
          <p class="vaccine-purpose">预防脑膜炎奈瑟菌引起的流行性脑脊髓膜炎（流脑），减轻高热、头痛、皮肤瘀斑、脑膜刺激征等症状，降低重症死亡率。</p>
          <div class="vaccine-detail">
            <p>①<strong>A群C群脑膜炎球菌多糖结合疫苗</strong>：3月龄（出生满90天）~23月龄（2周岁生日前）婴幼儿；4剂次（3~5月龄婴儿基础免疫3剂次，每剂间隔至少1个月，可在18月龄加强接种1剂。）</p>
            <p>②<strong>ACYW135群脑膜炎球菌多糖结合疫苗</strong>：3月龄~3周岁（47月龄）儿童；4剂次（3~5月龄婴儿基础免疫3剂次,建议自3月龄开始,每剂次间隔1个月,可在12月龄时加强注射1剂次）。</p>
          </div>
        </div>`
      }
    ]
  },
  '3month': {
    title: '3 月龄',
    planned: [
      {
        name: '脊髓灰质炎疫苗',
        content: `<div class="vaccine-section">
          <h4>脊髓灰质炎疫苗</h4>
          <p class="vaccine-purpose">预防脊髓灰质炎（俗称 "小儿麻痹症"），避免病毒侵犯神经系统导致肢体瘫痪。</p>
          <div class="vaccine-detail">
            <p><strong>脊髓灰质炎灭活疫苗</strong>：≥2月龄婴幼儿、儿童和成人；4剂次（2、3、4月龄各1剂次，18月龄加强免疫1剂）。</p>
          </div>
        </div>`
      }
    ],
    unplanned: [
      {
        name: '轮状病毒疫苗',
        content: `<div class="vaccine-section">
          <h4>轮状病毒疫苗</h4>
          <p class="vaccine-purpose">预防轮状病毒引起的婴幼儿腹泻（俗称 "秋季腹泻"），可显著降低重症腹泻发生率，减少因腹泻导致的脱水、住院等风险。</p>
          <div class="vaccine-detail">
            <p><strong>口服轮状病毒活疫苗</strong>：2月龄-3岁，1剂次</p>
            <p><strong>口服三价重配轮状病毒减毒活疫苗</strong>：6-32周龄，3剂次（6-13周龄开始口服第一剂，每剂间隔1月，第3剂接种不应晚于32周龄。）</p>
            <p><strong>口服五价重配轮状病毒减毒活疫苗</strong>：6-32周龄，3剂次（6-12周龄开始口服第一剂，每剂间隔4-10周，第3剂接种不应晚于32周龄。）</p>
            <p><strong>口服六价重配轮状病毒减毒活疫苗</strong>：6-36周龄，3剂次（6-12周龄开始口服第一剂，每剂间隔至少4周，第3剂接种不应晚于36周龄。）</p>
          </div>
        </div>`
      },
      {
        name: 'b型流感嗜血杆菌疫苗',
        content: `<div class="vaccine-section">
          <h4>b型流感嗜血杆菌疫苗</h4>
          <p class="vaccine-purpose">预防 b 型流感嗜血杆菌感染引起的严重疾病，包括脑膜炎、肺炎、败血症、会厌炎、蜂窝织炎等，尤其保护婴幼儿免受重症侵袭。</p>
          <div class="vaccine-detail">
            <p><strong>b型流感嗜血杆菌结合疫苗</strong>：适用于2月龄-5周岁；2-6月龄4剂次（从2或3月龄开始，每间隔1或2月接种1次，共3次；在18月龄时进行加强接种1次。）</p>
          </div>
        </div>`
      },
      {
        name: '13价肺炎疫苗',
        content: `<div class="vaccine-section">
          <h4>13价肺炎疫苗</h4>
          <p class="vaccine-purpose">预防 13 种血清型肺炎球菌引起的感染性疾病，包括肺炎、脑膜炎、败血症、中耳炎等，尤其降低婴幼儿重症感染风险</p>
          <div class="vaccine-detail">
            <p><strong>13价肺炎球菌多糖结合疫苗</strong>：适用于6周龄至5岁（6周岁生日前）婴幼儿和儿童。（2-6月龄婴儿：共接种4剂。推荐首剂在2月龄(最小满6周龄)接种，基础免疫接种3剂，每剂接种间隔2个月；于12-15月龄加强接种1剂。）</p>
          </div>
        </div>`
      },
      {
        name: '流脑疫苗',
        content: `<div class="vaccine-section">
          <h4>流脑疫苗</h4>
          <p class="vaccine-purpose">预防脑膜炎奈瑟菌引起的流行性脑脊髓膜炎（流脑），减轻高热、头痛、皮肤瘀斑、脑膜刺激征等症状，降低重症死亡率。</p>
          <div class="vaccine-detail">
            <p>①<strong>A群C群脑膜炎球菌多糖结合疫苗</strong>：3月龄（出生满90天）~23月龄（2周岁生日前）婴幼儿；4剂次（3~5月龄婴儿基础免疫3剂次，每剂间隔至少1个月，可在18月龄加强接种1剂。）</p>
            <p>②<strong>ACYW135群脑膜炎球菌多糖结合疫苗</strong>：3月龄~3周岁（47月龄）儿童；4剂次（3~5月龄基础免疫3剂次,建议自3月龄开始,每剂次间隔1个月,可在12月龄时加强注射1剂次。）</p>
          </div>
        </div>`
      },
      {
        name: '无细胞百白破灭活脊髓灰质炎和b型流感嗜血杆菌联合疫苗（五联）',
        content: `<div class="vaccine-section">
          <h4>无细胞百白破灭活脊髓灰质炎和b型流感嗜血杆菌联合疫苗（五联）</h4>
          <p class="vaccine-purpose">同时预防五种疾病，包括百日咳、白喉、破伤风、脊髓灰质炎、b 型流感嗜血杆菌感染（Hib 感染）。</p>
          <div class="vaccine-detail">
            <p><strong>吸附无细胞百白破脊髓灰质炎和b型流感嗜血杆菌联合疫苗</strong>：2月龄以上婴幼儿，4剂次（在2、3、4月龄或3、4、5月龄进行三剂基础免疫，在18月龄进行一剂加强免疫。）</p>
          </div>
        </div>`
      },
      {
        name: '无细胞百白破b型流感嗜血杆菌联合疫苗（四联）',
        content: `<div class="vaccine-section">
          <h4>无细胞百白破b型流感嗜血杆菌联合疫苗（四联）</h4>
          <p class="vaccine-purpose">可预防百日咳、白喉、破伤风、b型流感嗜血杆菌感染（脑膜炎、肺炎等）四种疾病。</p>
          <div class="vaccine-detail">
            <p><strong>无细胞百白破b型流感嗜血杆菌联合疫苗</strong>：3月龄以上婴幼儿；4剂次（3、4、5月龄进行基础免疫，18~24月龄加强免疫。）</p>
          </div>
        </div>`
      }
    ]
  },
  '2.5month': {
    title: '2.5 月龄',
    planned: [],
    unplanned: [
      {
        name: '轮状病毒疫苗',
        content: `<div class="vaccine-section">
          <h4>轮状病毒疫苗</h4>
          <p class="vaccine-purpose">预防轮状病毒引起的婴幼儿腹泻（俗称 "秋季腹泻"），可显著降低重症腹泻发生率，减少因腹泻导致的脱水、住院等风险。</p>
          <div class="vaccine-detail">
            <p><strong>口服轮状病毒活疫苗</strong>：2月龄-3岁，1剂次</p>
            <p><strong>口服三价重配轮状病毒减毒活疫苗</strong>：6-32周龄，3剂次（6-13周龄开始口服第一剂，每剂间隔1月，第3剂接种不应晚于32周龄。）</p>
            <p><strong>口服五价重配轮状病毒减毒活疫苗</strong>：6-32周龄，3剂次（6-12周龄开始口服第一剂，每剂间隔4-10周，第3剂接种不应晚于32周龄。）</p>
            <p><strong>口服六价重配轮状病毒减毒活疫苗</strong>：6-36周龄，3剂次（6-12周龄开始口服第一剂，每剂间隔至少4周，第3剂接种不应晚于36周龄。）</p>
          </div>
        </div>`
      },
      {
        name: 'b型流感嗜血杆菌疫苗',
        content: `<div class="vaccine-section">
          <h4>b型流感嗜血杆菌疫苗</h4>
          <p class="vaccine-purpose">预防 b 型流感嗜血杆菌感染引起的严重疾病，包括脑膜炎、肺炎、败血症、会厌炎、蜂窝织炎等，尤其保护婴幼儿免受重症侵袭。</p>
          <div class="vaccine-detail">
            <p><strong>b型流感嗜血杆菌结合疫苗</strong>：适用于2月龄-5周岁；2-6月龄4剂次（从2或3月龄开始，每间隔1或2月接种1次，共3次；在18月龄时进行加强接种1次。）</p>
          </div>
        </div>`
      },
      {
        name: '13价肺炎疫苗',
        content: `<div class="vaccine-section">
          <h4>13价肺炎疫苗</h4>
          <p class="vaccine-purpose">预防 13 种血清型肺炎球菌引起的感染性疾病，包括肺炎、脑膜炎、败血症、中耳炎等，尤其降低婴幼儿重症感染风险</p>
          <div class="vaccine-detail">
            <p><strong>13价肺炎球菌多糖结合疫苗</strong>：适用于6周龄至5岁（6周岁生日前）婴幼儿和儿童。（2-6月龄婴儿：共接种4剂。推荐首剂在2月龄(最小满6周龄)接种，基础免疫接种3剂，每剂接种间隔2个月；于12-15月龄加强接种1剂。）</p>
          </div>
        </div>`
      }
    ]
  },
  '2month': {
    title: '2 月龄',
    planned: [
      {
        name: '脊髓灰质炎疫苗',
        content: `<div class="vaccine-section">
          <h4>脊髓灰质炎疫苗</h4>
          <p class="vaccine-purpose">预防脊髓灰质炎（俗称 "小儿麻痹症"），避免病毒侵犯神经系统导致肢体瘫痪。</p>
          <div class="vaccine-detail">
            <p><strong>脊髓灰质炎灭活疫苗</strong>：≥2月龄婴幼儿、儿童和成人；4剂次（2、3、4月龄各1剂次，18月龄加强免疫1剂）。</p>
          </div>
        </div>`
      }
    ],
    unplanned: [
      {
        name: '轮状病毒疫苗',
        content: `<div class="vaccine-section">
          <h4>轮状病毒疫苗</h4>
          <p class="vaccine-purpose">预防轮状病毒引起的婴幼儿腹泻（俗称 "秋季腹泻"），可显著降低重症腹泻发生率，减少因腹泻导致的脱水、住院等风险。</p>
          <div class="vaccine-detail">
            <p><strong>口服轮状病毒活疫苗</strong>：2月龄-3岁，1剂次</p>
            <p><strong>口服三价重配轮状病毒减毒活疫苗</strong>：6-32周龄，3剂次（6-13周龄开始口服第一剂，每剂间隔1月，第3剂接种不应晚于32周龄。）</p>
            <p><strong>口服五价重配轮状病毒减毒活疫苗</strong>：6-32周龄，3剂次（6-12周龄开始口服第一剂，每剂间隔4-10周，第3剂接种不应晚于32周龄。）</p>
            <p><strong>口服六价重配轮状病毒减毒活疫苗</strong>：6-36周龄，3剂次（6-12周龄开始口服第一剂，每剂间隔至少4周，第3剂接种不应晚于36周龄。）</p>
          </div>
        </div>`
      },
      {
        name: 'b型流感嗜血杆菌疫苗',
        content: `<div class="vaccine-section">
          <h4>b型流感嗜血杆菌疫苗</h4>
          <p class="vaccine-purpose">预防 b 型流感嗜血杆菌感染引起的严重疾病，包括脑膜炎、肺炎、败血症、会厌炎、蜂窝织炎等，尤其保护婴幼儿免受重症侵袭。</p>
          <div class="vaccine-detail">
            <p><strong>b型流感嗜血杆菌结合疫苗</strong>：适用于2月龄-5周岁；2-6月龄4剂次（从2或3月龄开始，每间隔1或2月接种1次，共3次；在18月龄时进行加强接种1次。）</p>
          </div>
        </div>`
      },
      {
        name: '13价肺炎疫苗',
        content: `<div class="vaccine-section">
          <h4>13价肺炎疫苗</h4>
          <p class="vaccine-purpose">预防 13 种血清型肺炎球菌引起的感染性疾病，包括肺炎、脑膜炎、败血症、中耳炎等，尤其降低婴幼儿重症感染风险</p>
          <div class="vaccine-detail">
            <p><strong>13价肺炎球菌多糖结合疫苗</strong>：适用于6周龄至5岁（6周岁生日前）婴幼儿和儿童。（2-6月龄婴儿：共接种4剂。推荐首剂在2月龄(最小满6周龄)接种，基础免疫接种3剂，每剂接种间隔2个月；于12-15月龄加强接种1剂。）</p>
          </div>
        </div>`
      },
      {
        name: '无细胞百白破灭活脊髓灰质炎和b型流感嗜血杆菌联合疫苗（五联）',
        content: `<div class="vaccine-section">
          <h4>无细胞百白破灭活脊髓灰质炎和b型流感嗜血杆菌联合疫苗（五联）</h4>
          <p class="vaccine-purpose">同时预防五种疾病，包括百日咳、白喉、破伤风、脊髓灰质炎、b 型流感嗜血杆菌感染（Hib 感染）。</p>
          <div class="vaccine-detail">
            <p><strong>吸附无细胞百白破脊髓灰质炎和b型流感嗜血杆菌联合疫苗</strong>：2月龄以上婴幼儿，4剂次（在2、3、4月龄或3、4、5月龄进行三剂基础免疫，在18月龄进行一剂加强免疫。）</p>
          </div>
        </div>`
      }
    ]
  },
  '1.5month': {
    title: '1.5 月龄',
    planned: [],
    unplanned: [
      {
        name: '轮状病毒疫苗',
        content: `<div class="vaccine-section">
          <h4>轮状病毒疫苗</h4>
          <p class="vaccine-purpose">预防轮状病毒引起的婴幼儿腹泻（俗称 "秋季腹泻"），可显著降低重症腹泻发生率，减少因腹泻导致的脱水、住院等风险。</p>
          <div class="vaccine-detail">
            <p>①<strong>口服三价重配轮状病毒减毒活疫苗</strong>：6-32周龄，3剂次（6-13周龄开始口服第一剂，每剂间隔1月，第3剂接种不应晚于32周龄。）</p>
            <p>②<strong>口服五价重配轮状病毒减毒活疫苗</strong>：6-32周龄，3剂次（6-12周龄开始口服第一剂，每剂间隔4-10周，第3剂接种不应晚于32周龄。）</p>
            <p>③<strong>口服六价重配轮状病毒减毒活疫苗</strong>：6-36周龄，3剂次（6-12周龄开始口服第一剂，每剂间隔至少4周，第3剂接种不应晚于36周龄。）</p>
          </div>
        </div>`
      },
      {
        name: '13价肺炎疫苗',
        content: `<div class="vaccine-section">
          <h4>13价肺炎疫苗</h4>
          <p class="vaccine-purpose">预防 13 种血清型肺炎球菌引起的感染性疾病，包括肺炎、脑膜炎、败血症、中耳炎等，尤其降低婴幼儿重症感染风险</p>
          <div class="vaccine-detail">
            <p><strong>13价肺炎球菌多糖结合疫苗</strong>：适用于6周龄至5岁（6周岁生日前）婴幼儿和儿童，4剂次（2-6月龄婴儿：推荐首剂在2月龄(最小满6周龄)接种，基础免疫接种3剂，每剂接种间隔2个月；于12-15月龄加强接种1剂。）</p>
          </div>
        </div>`
      }
    ]
  },
  '1month': {
    title: '1 月龄',
    planned: [
      {
        name: '乙肝疫苗',
        content: `<div class="vaccine-section">
          <h4>乙肝疫苗</h4>
          <p class="vaccine-purpose">预防乙型肝炎病毒感染，从而降低肝硬化和肝癌风险。</p>
          <div class="vaccine-detail">
            <p><strong>重组乙型肝炎疫苗（10微克）</strong>：适用于乙型肝炎易感者，尤其是(1)新生儿，特别是母亲为HBsAg、HBeAg阳性者；(2)从事医疗工作的医护人员及接触血液的实验人员。免疫程序为3剂次（分别在0、1、6月接种，新生儿在出生后24小时内注射第1针。）</p>
          </div>
        </div>`
      }
    ],
    unplanned: []
  },
  'birth': {
    title: '出生时',
    planned: [
      {
        name: '乙肝疫苗',
        content: `<div class="vaccine-section">
          <h4>乙肝疫苗</h4>
          <p class="vaccine-purpose">预防乙型肝炎病毒感染，从而降低肝硬化和肝癌风险。</p>
          <div class="vaccine-detail">
            <p><strong>重组乙型肝炎疫苗（10微克）</strong>：适用于乙型肝炎易感者，尤其是(1)新生儿，特别是母亲为HBsAg、HBeAg阳性者；(2)从事医疗工作的医护人员及接触血液的实验人员。免疫程序为3剂次（分别在0、1、6月接种，新生儿在出生后24小时内注射第1针。）</p>
          </div>
        </div>`
      },
      {
        name: '卡介苗',
        content: `<div class="vaccine-section">
          <h4>卡介苗</h4>
          <p class="vaccine-purpose">预防结核病</p>
        </div>`
      }
    ],
    unplanned: []
  }
};

const svgNodes = [
  { cy: 665.03, key: '50year' },
  { cy: 883.56, key: '40year' },
  { cy: 1102.1, key: '16year' },
  { cy: 1320.63, key: '13year' },
  { cy: 1539.16, key: '9year' },
  { cy: 1757.69, key: '6year' },
  { cy: 1976.22, key: '4year' },
  { cy: 2194.75, key: '3year' },
  { cy: 2413.29, key: '2year' },
  { cy: 2633.45, key: '18month' },
  { cy: 2934.65, key: '12month' },
  { cy: 3153.18, key: '9month' },
  { cy: 3371.72, key: '8month' },
  { cy: 3590.25, key: '7month' },
  { cy: 3808.78, key: '6month' },
  { cy: 4027.31, key: '5month' },
  { cy: 4245.84, key: '4month' },
  { cy: 4497.37, key: '3.5month' },
  { cy: 4682.91, key: '3month' },
  { cy: 4922.44, key: '2.5month' },
  { cy: 5119.97, key: '2month' },
  { cy: 5338.5, key: '1.5month' },
  { cy: 5557.03, key: '1month' },
  { cy: 5775.56, key: 'birth' }
];

// 计算点击范围（基于原始坐标）
const svgRanges = [];
for (let i = 0; i < svgNodes.length; i++) {
  const current = svgNodes[i];
  const prev = i > 0 ? svgNodes[i - 1] : null;
  const next = i < svgNodes.length - 1 ? svgNodes[i + 1] : null;
  const min = prev ? (prev.cy + current.cy) / 2 : 0;
  const max = next ? (current.cy + next.cy) / 2 : SVG_VIEWBOX_HEIGHT;
  svgRanges.push({ min, max, key: current.key });
}

// 打印范围用于调试
console.log('SVG 点击范围:', svgRanges.map(r => ({ key: r.key, min: Math.round(r.min), max: Math.round(r.max) })));

// 渲染免疫规划疫苗内容
function renderPlannedVaccines(vaccines) {
  if (!vaccines || vaccines.length === 0) {
    return '<p class="no-vaccine">该年龄段无免疫规划疫苗</p>';
  }
  return vaccines.map(v => v.content || `
    <div class="vaccine-section">
      <h4>${v.name}</h4>
      <p class="vaccine-purpose">${v.desc}</p>
    </div>
  `).join('');
}

// 渲染非免疫规划疫苗内容
function renderUnplannedVaccines(vaccines) {
  if (!vaccines || vaccines.length === 0) {
    return '<p class="no-vaccine">该年龄段无非免疫规划疫苗</p>';
  }
  return vaccines.map(v => v.content || `
    <div class="vaccine-section">
      <h4>${v.name}</h4>
      <p class="vaccine-purpose">${v.desc}</p>
    </div>
  `).join('');
}

// 显示弹窗 - type: 'planned' | 'unplanned'
function showModal(key, type) {
  const data = vaccineData[key];
  if (!data) return;
  
  const isPlanned = type === 'planned';
  const title = isPlanned ? '免疫规划疫苗' : '非免疫规划疫苗';
  const vaccines = isPlanned ? data.planned : data.unplanned;
  
  modalBody.innerHTML = `
    <h3>${data.title} - ${title}</h3>
    <div class="vaccine-list">
      ${isPlanned ? renderPlannedVaccines(vaccines) : renderUnplannedVaccines(vaccines)}
    </div>
  `;
  modalOverlay.classList.add('active');
}

function hideModal() {
  modalOverlay.classList.remove('active');
}

modalClose.addEventListener('click', hideModal);
modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) {
    hideModal();
  }
});

// 判断点击区域是免疫规划还是非免疫规划
// 根据文字长图的布局，左侧是免疫规划，右侧是非免疫规划
function getClickType(e, rect) {
  const clickX = e.clientX - rect.left;
  const width = rect.width;
  // 左侧50%为免疫规划区域，右侧50%为非免疫规划区域
  // 可以根据实际图片调整这个比例
  return clickX < width * 0.64 ? 'planned' : 'unplanned';
}

// 详情页图片点击事件
if (detailImage) {
  detailImage.addEventListener('click', (e) => {
    if (!isDetailPage) return;
    
    const rect = detailImage.getBoundingClientRect();
    // 计算点击位置相对于图片的百分比
    const clickYPercent = (e.clientY - rect.top) / rect.height;
    // 转换为 SVG 原始坐标系中的 Y 坐标
    const svgY = clickYPercent * SVG_VIEWBOX_HEIGHT;
    
    // 判断点击类型（免疫规划/非免疫规划）
    const clickType = getClickType(e, rect);
    
    console.log('点击位置:', { clickYPercent, svgY, clickType, ranges: svgRanges });
    
    for (const range of svgRanges) {
      if (svgY >= range.min && svgY < range.max) {
        console.log('匹配到:', range.key, '类型:', clickType);
        showModal(range.key, clickType);
        break;
      }
    }
  });
}

// 人物动画点击事件配置（使用原始滚动位置，会根据缩放比例自动调整）
const characterClickConfig = [
  { id: 'baby', pageId: 'page1', scrollPosition: 7360 },
  { id: 'kid', pageId: 'page2', scrollPosition: 5800 },
  { id: 'adult', pageId: 'page3', scrollPosition: 4600 },
  { id: 'old', pageId: 'page4', scrollPosition: 4000 }
];

// 显示/隐藏人物动画和配套 bubble 动画
function showCharacterAnimations(show) {
  // 控制人物动画
  characterClickConfig.forEach(config => {
    const container = document.getElementById(`lottie-${config.id}`);
    if (container) {
      container.style.display = show ? 'block' : 'none';
    }
  });
  
  // 控制配套 bubble 动画的显示/隐藏
  bubbleConfigs.forEach(config => {
    const container = document.getElementById(config.containerId);
    if (container) {
      container.style.display = show ? 'block' : 'none';
    }
  });
}

// 为每个人物动画添加点击事件
characterClickConfig.forEach(config => {
  const container = document.getElementById(`lottie-${config.id}`);
  if (container) {
    container.style.pointerEvents = 'auto'; // 启用点击
    container.style.cursor = 'pointer'; // 显示手型光标
    container.addEventListener('click', () => {
      // 根据当前缩放比例调整滚动位置
      let scrollPosition = getScaledScrollPosition(config.scrollPosition);
      scrollPosition = Math.max(MIN_SCROLL, Math.min(MAX_SCROLL, scrollPosition));
      
      detailScene.scrollTop = scrollPosition;
      
      mainScene.classList.remove('active');
      mainScene.classList.add('exit');
      detailScene.classList.add('active');
      maskLayer.classList.add('visible');
      bottomBg12.classList.add('visible');
      bottomBg11.classList.add('visible');
      fixedTitle.classList.add('visible');
      closeBtn.classList.add('visible');
      isDetailPage = true;
      
      // 隐藏人物动画
      showCharacterAnimations(false);
      
      setTimeout(() => {
        updateFixedImages(scrollPosition);
      }, 100);
    });
  }
});

// 保留提示图标的点击事件（如果有的话）
document.querySelectorAll('.svg-item.hint-item').forEach(item => {
  item.addEventListener('click', () => {
    // 提示图标的点击逻辑（如果有）
    console.log('Hint clicked');
  });
});

// 获取缩放后的滚动位置
function getScaledScrollPosition(originalPosition) {
  const { displayHeight } = getDisplaySize();
  const scaleRatio = displayHeight / ORIGINAL_HEIGHT;
  return Math.round(originalPosition * scaleRatio);
}

function updateFixedImages(currentScroll) {
  fixedImgs.forEach(img => {
    const originalScrollStart = parseInt(img.dataset.scrollStart);
    const originalScrollEnd = parseInt(img.dataset.scrollEnd);
    
    // 根据当前缩放比例调整滚动范围
    const scrollStart = getScaledScrollPosition(originalScrollStart);
    const scrollEnd = getScaledScrollPosition(originalScrollEnd);
    
    if (currentScroll >= scrollStart && currentScroll < scrollEnd) {
      img.classList.add('visible');
    } else {
      img.classList.remove('visible');
    }
  });
}

detailScene.addEventListener('scroll', () => {
  if (!isDetailPage) return;
  
  const currentScroll = detailScene.scrollTop;
  updateFixedImages(currentScroll);
  
  if (scrollTimeout) clearTimeout(scrollTimeout);
  
  scrollTimeout = setTimeout(() => {
    if (!isDetailPage) return;
    
    if (currentScroll < MIN_SCROLL) {
      detailScene.scrollTo({
        top: MIN_SCROLL,
        behavior: 'smooth'
      });
    } else if (currentScroll > MAX_SCROLL) {
      detailScene.scrollTo({
        top: MAX_SCROLL,
        behavior: 'smooth'
      });
    }
  }, 100);
});

function goBack() {
  if (isDetailPage) {
    if (scrollTimeout) clearTimeout(scrollTimeout);
    detailScene.scrollTo({
      top: detailScene.scrollTop,
      behavior: 'auto'
    });
    
    detailScene.classList.remove('active');
    mainScene.classList.remove('exit');
    mainScene.classList.add('active');
    maskLayer.classList.remove('visible');
    bottomBg12.classList.remove('visible');
    bottomBg11.classList.remove('visible');
    fixedTitle.classList.remove('visible');
    closeBtn.classList.remove('visible');
    fixedImgs.forEach(img => img.classList.remove('visible'));
    isDetailPage = false;
    
    // 显示人物动画
    showCharacterAnimations(true);
  }
}

closeBtn.addEventListener('click', () => {
  goBack();
});

// 右滑返回 - 只在详情页有效
document.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].screenX;
  touchStartY = e.changedTouches[0].screenY;
});

document.addEventListener('touchend', (e) => {
  touchEndX = e.changedTouches[0].screenX;
  touchEndY = e.changedTouches[0].screenY;
  
  const diffX = touchEndX - touchStartX;
  const diffY = Math.abs(touchEndY - touchStartY);
  
  if (diffX > 50 && diffX > diffY) {
    goBack();
  }
});

document.addEventListener('mousedown', (e) => {
  touchStartX = e.screenX;
  touchStartY = e.screenY;
});

document.addEventListener('mouseup', (e) => {
  touchEndX = e.screenX;
  touchEndY = e.screenY;
  
  const diffX = touchEndX - touchStartX;
  const diffY = Math.abs(touchEndY - touchStartY);
  
  if (diffX > 50 && diffX > diffY) {
    goBack();
  }
});

function startAnimation() {
  const svgItems = document.querySelectorAll('.svg-item');
  
  svgItems.forEach(item => {
    const originalSrc = item.getAttribute('src');
    const altSrc = item.dataset.altSrc;
    
    if (!altSrc) return;
    
    let showOriginal = true;
    
    setInterval(() => {
      if (showOriginal) {
        item.src = altSrc;
      } else {
        item.src = originalSrc;
      }
      showOriginal = !showOriginal;
    }, 500);
  });
}

startAnimation();

// Asset 7.svg 的原始宽度
// 调整布局（简化版）
function adjustLayout() {
  const { displayWidth, displayHeight, screenWidth } = getDisplaySize();
  const scaleRatio = getScaleRatio();
  const offsetX = (screenWidth - displayWidth) / 2;
  
  // 设置 svg-container 尺寸
  const svgContainer = document.querySelector('.svg-container');
  if (svgContainer) {
    svgContainer.style.width = `${displayWidth}px`;
    svgContainer.style.height = `${displayHeight}px`;
  }
  
  // 更新人物动画位置和尺寸
  animationConfigs.forEach(config => {
    const container = document.getElementById(config.containerId);
    if (container) {
      container.style.width = `${config.width * scaleRatio}px`;
      container.style.height = `${config.height * scaleRatio}px`;
      container.style.left = `${offsetX + displayWidth * config.left}px`;
      container.style.top = `${displayHeight * config.top}px`;
    }
  });
  
  // 更新 bubble 动画位置和尺寸
  bubbleConfigs.forEach(config => {
    const container = document.getElementById(config.containerId);
    if (container) {
      container.style.width = `${config.width * scaleRatio}px`;
      container.style.height = `${config.height * scaleRatio}px`;
      container.style.left = `${offsetX + displayWidth * config.left}px`;
      container.style.top = `${displayHeight * config.top}px`;
    }
  });
  
  // 调整详情页元素
  adjustDetailPageElements(displayWidth, displayHeight, offsetX, scaleRatio);
  
  console.log('布局调整完成:', { displayWidth, displayHeight, scaleRatio, offsetX });
}

// 调整详情页元素位置
function adjustDetailPageElements(displayWidth, displayHeight, offsetX, scaleRatio) {
  // 文字长图：按原始比例缩放，宽度超过显示范围时裁切两边
  const detailImage = document.querySelector('.detail-image');
  if (detailImage) {
    // 文字长图原始尺寸: 2389.66 x 5940.25
    // 计算缩放比例：基于宽度从 2389.66 缩放到 displayWidth
    const longImageScale = displayWidth / 2389.66;
    const scaledHeight = 5940.25 * longImageScale;
    
    detailImage.style.width = `${displayWidth}px`;
    detailImage.style.height = `${scaledHeight}px`;
  }
  
  // 调整固定标题位置和尺寸
  // 原始设计稿: 位置 (0.66, 0.09), 原始宽度 747.97px
  const fixedTitle = document.querySelector('.fixed-title');
  if (fixedTitle) {
    fixedTitle.style.left = `${offsetX + displayWidth * 0.62}px`;
    fixedTitle.style.top = `${displayHeight * 0.09}px`;
    const titleImg = fixedTitle.querySelector('img');
    if (titleImg) {
      titleImg.style.width = `${747.97 * scaleRatio}px`;
    }
  }
  
  // 调整关闭按钮位置
  const closeBtn = document.querySelector('.close-btn');
  if (closeBtn) {
    closeBtn.style.right = `${offsetX + displayWidth * 0.02}px`;
    closeBtn.style.top = `${displayHeight * 0.02}px`;
    const btnImg = closeBtn.querySelector('img');
    if (btnImg) {
      btnImg.style.width = `${123.89 * scaleRatio}px`;
    }
  }
  
  // 调整固定图片位置和尺寸
  // 原始设计稿配置：left(百分比), top(百分比), 原始宽度(px)
  // 修改下面的数值来调整位置
  const imgConfigs = [
    { left: 0.2, top: 0.30, width: 472.08 },  // P1
    { left: 0.2, top: 0.25, width: 383.56 },  // P2
    { left: 0.2, top: 0.23, width: 428.23 },  // P3
    { left: 0.2, top: 0.23, width: 584.37 }   // P4
  ];
  
  fixedImgs.forEach((img, index) => {
    if (imgConfigs[index]) {
      const config = imgConfigs[index];
      // 移除 max-width 限制
      img.style.maxWidth = 'none';
      // 设置位置（基于屏幕百分比 + 偏移量）
      img.style.left = `${offsetX + displayWidth * config.left}px`;
      img.style.top = `${displayHeight * config.top}px`;
      // 设置尺寸（原始宽度 * 缩放比例）
      img.style.width = `${config.width * scaleRatio}px`;
      // 水平居中
      img.style.transform = 'translateX(-50%)';
    }
  });
}

// 页面加载完成后初始化
window.addEventListener('load', () => {
  initAnimations();
  adjustLayout();
  updateScrollRange();
  console.log('页面初始化完成');
});

// 窗口大小变化时重新调整
window.addEventListener('resize', () => {
  initAnimations();
  adjustLayout();
  updateScrollRange();
});

console.log('main.js 已加载');
