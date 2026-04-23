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
      skyContainer.innerHTML = `<img src="/public/植物/Asset 13.svg" style="width: 100%; height: 100%; object-fit: cover;">`;
    }
  }
  
  // 植物动画层配置
  const plantLayers = [
    { id: 'bg', containerId: 'bg-layer', path: '/public/植物/背景3.json' },
    { id: 'far', containerId: 'far-layer', path: '/public/植物/杩滄櫙妞嶇墿.json' },
    { id: 'mid', containerId: 'mid-layer', path: '/public/植物/中景.json' },
    { id: 'front', containerId: 'front-layer', path: '/public/植物/前景3.json' }
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
          renderer: 'svg',
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

const vaccineData = {
  '50year': {
    title: '≥50岁',
    content: '<p><strong>可选疫苗</strong>：甲肝疫苗、流感疫苗、23价肺炎疫苗、水痘疫苗、流脑疫苗、带状疱疹疫苗、戊肝疫苗、霍乱疫苗、乙脑疫苗</p>'
  },
  '40year': {
    title: '≥40岁',
    content: '<p><strong>可选疫苗</strong>：甲肝疫苗、流感疫苗、23价肺炎疫苗、水痘疫苗、HPV疫苗、流脑疫苗、带状疱疹疫苗、戊肝疫苗、霍乱疫苗、乙脑疫苗</p>'
  },
  '16year': {
    title: '16 岁',
    content: '<p><strong>可选疫苗</strong>：甲肝疫苗、流感疫苗、23价肺炎疫苗、水痘疫苗、HPV疫苗、流脑疫苗、戊肝疫苗、霍乱疫苗、乙脑疫苗</p>'
  },
  '13year': {
    title: '13 岁',
    content: '<p><strong>二价HPV疫苗</strong>：预防人乳头瘤病毒感染</p><p><strong>可选疫苗</strong>：甲肝疫苗、流感疫苗、23价肺炎疫苗、水痘疫苗、HPV疫苗、流脑疫苗、霍乱疫苗、乙脑疫苗</p>'
  },
  '9year': {
    title: '9 岁',
    content: '<p><strong>可选疫苗</strong>：甲肝疫苗、流感疫苗、23价肺炎疫苗、水痘疫苗、HPV疫苗、流脑疫苗、霍乱疫苗、乙脑疫苗</p>'
  },
  '6year': {
    title: '6 岁',
    content: '<p><strong>百白破疫苗</strong>：第五剂</p><p><strong>A群C群流脑多糖疫苗</strong>：第二剂</p><p><strong>可选疫苗</strong>：甲肝疫苗、流感疫苗、23价肺炎疫苗、水痘疫苗、流脑疫苗、霍乱疫苗、乙脑疫苗</p>'
  },
  '4year': {
    title: '4 岁',
    content: '<p><strong>脊灰减毒疫苗</strong>：第四剂</p><p><strong>可选疫苗</strong>：甲肝疫苗、b型流感嗜血杆菌疫苗、流感疫苗、13价肺炎疫苗、23价肺炎疫苗、水痘疫苗、手足口疫苗、流脑疫苗、霍乱疫苗、乙脑疫苗</p>'
  },
  '3year': {
    title: '3 岁',
    content: '<p><strong>A群C群流脑多糖疫苗</strong>：预防A群和C群脑膜炎球菌</p><p><strong>可选疫苗</strong>：轮状病毒疫苗、甲肝疫苗、b型流感嗜血杆菌疫苗、流感疫苗、13价肺炎疫苗、23价肺炎疫苗、水痘疫苗、手足口疫苗、流脑疫苗、霍乱疫苗、乙脑疫苗</p>'
  },
  '2year': {
    title: '2 岁',
    content: '<p><strong>乙脑减毒疫苗</strong>：第二剂</p><p><strong>可选疫苗</strong>：轮状病毒疫苗、甲肝疫苗、b型流感嗜血杆菌疫苗、流感疫苗、13价肺炎疫苗、23价肺炎疫苗、水痘疫苗、手足口疫苗、流脑疫苗、霍乱疫苗、乙脑疫苗</p>'
  },
  '18month': {
    title: '18 月龄',
    content: '<p><strong>百白破疫苗</strong>：第四剂</p><p><strong>麻腮风疫苗</strong>：第二剂</p><p><strong>甲肝减毒疫苗</strong>：预防甲型肝炎</p><p><strong>可选疫苗</strong>：甲肝疫苗、流感疫苗、23价肺炎疫苗、水痘疫苗、手足口疫苗、流脑疫苗、霍乱疫苗、乙脑疫苗</p>'
  },
  '12month': {
    title: '12 月龄',
    content: '<p><strong>A群流脑多糖疫苗</strong>：预防A群脑膜炎球菌</p><p><strong>可选疫苗</strong>：水痘疫苗、流感疫苗、手足口疫苗、流脑疫苗、霍乱疫苗、乙脑疫苗</p>'
  },
  '9month': {
    title: '9 月龄',
    content: '<p><strong>A群流脑多糖疫苗</strong>：预防A群脑膜炎球菌</p><p><strong>可选疫苗</strong>：b型流感嗜血杆菌疫苗、流感疫苗、手足口疫苗、流脑疫苗</p>'
  },
  '8month': {
    title: '8 月龄',
    content: '<p><strong>麻腮风疫苗</strong>：预防麻疹、腮腺炎、风疹</p><p><strong>乙脑减毒疫苗</strong>：预防乙型脑炎</p><p><strong>可选疫苗</strong>：b型流感嗜血杆菌疫苗、流感疫苗、手足口疫苗、流脑疫苗</p>'
  },
  '7month': {
    title: '7 月龄',
    content: '<p><strong>脊灰灭活疫苗</strong>：第三剂</p><p><strong>百白破疫苗</strong>：第三剂</p><p><strong>可选疫苗</strong>：轮状病毒疫苗、b型流感嗜血杆菌疫苗、流感疫苗、13价肺炎疫苗、手足口疫苗、流脑疫苗、乙脑疫苗</p>'
  },
  '6month': {
    title: '6 月龄',
    content: '<p><strong>乙肝疫苗</strong>：第三剂</p><p><strong>A群流脑多糖疫苗</strong>：预防A群脑膜炎球菌</p><p><strong>百白破疫苗</strong>：第三剂</p><p><strong>可选疫苗</strong>：轮状病毒疫苗、b型流感嗜血杆菌疫苗、流感疫苗、13价肺炎疫苗、手足口疫苗、流脑疫苗、乙脑疫苗</p>'
  },
  '5month': {
    title: '5 月龄',
    content: '<p><strong>百白破疫苗</strong>：第三剂</p><p><strong>可选疫苗</strong>：轮状病毒疫苗、b型流感嗜血杆菌疫苗、13价肺炎疫苗、流脑疫苗、四联疫苗</p>'
  },
  '4month': {
    title: '4 月龄',
    content: '<p><strong>脊灰减毒疫苗</strong>：预防脊髓灰质炎</p><p><strong>百白破疫苗</strong>：第二剂</p><p><strong>可选疫苗</strong>：轮状病毒疫苗、b型流感嗜血杆菌疫苗、13价肺炎疫苗、流脑疫苗、五联疫苗、四联疫苗</p>'
  },
  '3.5month': {
    title: '3.5 月龄',
    content: '<p><strong>可选疫苗</strong>：轮状病毒疫苗、b型流感嗜血杆菌疫苗、13价肺炎疫苗、流脑疫苗</p>'
  },
  '3month': {
    title: '3 月龄',
    content: '<p><strong>脊灰灭活疫苗</strong>：第二剂</p><p><strong>可选疫苗</strong>：轮状病毒疫苗、b型流感嗜血杆菌疫苗、13价肺炎疫苗、流脑疫苗、五联疫苗、四联疫苗</p>'
  },
  '2.5month': {
    title: '2.5 月龄',
    content: '<p><strong>可选疫苗</strong>：轮状病毒疫苗、b型流感嗜血杆菌疫苗、13价肺炎疫苗</p>'
  },
  '2month': {
    title: '2 月龄',
    content: '<p><strong>脊灰灭活疫苗</strong>：预防脊髓灰质炎</p><p><strong>百白破疫苗</strong>：预防百日咳、白喉、破伤风</p><p><strong>可选疫苗</strong>：轮状病毒疫苗、b型流感嗜血杆菌疫苗、13价肺炎疫苗、五联疫苗</p>'
  },
  '1.5month': {
    title: '1.5 月龄',
    content: '<p><strong>可选疫苗</strong>：轮状病毒疫苗、13价肺炎疫苗</p>'
  },
  '1month': {
    title: '1 月龄',
    content: '<p><strong>乙肝疫苗</strong>：第二剂，预防乙型肝炎</p>'
  },
  'birth': {
    title: '出生时',
    content: '<p><strong>乙肝疫苗</strong>：预防乙型肝炎</p><p><strong>卡介苗</strong>：预防结核病</p>'
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

function showModal(key) {
  const data = vaccineData[key];
  if (data) {
    modalBody.innerHTML = `<h3>${data.title}</h3>${data.content}`;
    modalOverlay.classList.add('active');
  }
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

// 详情页图片点击事件
if (detailImage) {
  detailImage.addEventListener('click', (e) => {
    if (!isDetailPage) return;
    
    const rect = detailImage.getBoundingClientRect();
    // 计算点击位置相对于图片的百分比
    const clickYPercent = (e.clientY - rect.top) / rect.height;
    // 转换为 SVG 原始坐标系中的 Y 坐标
    const svgY = clickYPercent * SVG_VIEWBOX_HEIGHT;
    
    console.log('点击位置:', { clickYPercent, svgY, ranges: svgRanges });
    
    for (const range of svgRanges) {
      if (svgY >= range.min && svgY < range.max) {
        console.log('匹配到:', range.key);
        showModal(range.key);
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
