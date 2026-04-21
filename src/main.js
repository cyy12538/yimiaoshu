import "./style.css";
import { LottieAnimation } from './components/LottieAnimation.js';

// 存储所有动画实例
const animations = {};

// 原始设计稿尺寸
const DESIGN_WIDTH = 1080;
const ORIGINAL_BG_WIDTH = 2994.23; // 主图原始宽度

// 获取背景图的实际缩放比例
function getBgScaleRatio() {
  const bgWrapper = document.querySelector('.bg-wrapper');
  if (!bgWrapper) return 1;
  
  const wrapperWidth = bgWrapper.clientWidth;
  const wrapperHeight = bgWrapper.clientHeight;
  
  // 主图原始比例
  const bgAspectRatio = ORIGINAL_BG_WIDTH / 4378.87;
  
  // 根据容器高度计算主图实际显示宽度
  let actualBgWidth = wrapperHeight * bgAspectRatio;
  
  // 如果计算出的宽度超过容器宽度，则使用容器宽度
  if (actualBgWidth > wrapperWidth) {
    actualBgWidth = wrapperWidth;
  }
  
  // 返回缩放比例
  return actualBgWidth / ORIGINAL_BG_WIDTH;
}

// 获取当前屏幕相对于设计稿的缩放比例（用于初始加载）
function getScaleRatio() {
  const screenWidth = window.innerWidth;
  return Math.min(screenWidth / DESIGN_WIDTH, 1);
}

// 将像素值转换为缩放后的值
function scaleValue(pxValue, ratio = null) {
  const scaleRatio = ratio || getScaleRatio();
  return `${pxValue * scaleRatio}px`;
}

// 动画配置 - 使用原始尺寸
const animationConfigs = [
  {
    id: 'baby',
    containerId: 'lottie-baby',
    path: '人物/baby.json',
    width: 283,  // 原始宽度（纯数字，便于缩放）
    height: 306  // 原始高度
  },
  {
    id: 'kid',
    containerId: 'lottie-kid',
    path: '人物/kid.json',
    width: 268,
    height: 455
  },
  {
    id: 'adult',
    containerId: 'lottie-adult',
    path: '人物/adult.json',
    width: 268,
    height: 770
  },
  {
    id: 'old',
    containerId: 'lottie-old',
    path: 'old(1).json',
    width: 256,
    height: 575
  }
];

// Bubble UI 动画配置（四个人物配套的 bubble 动画）
const bubbleConfigs = [
  { id: 'baby', containerId: 'lottie-bubble-baby', width: 1080, height: 1920 },
  { id: 'kid', containerId: 'lottie-bubble-kid', width: 1080, height: 1920 },
  { id: 'adult', containerId: 'lottie-bubble-adult', width: 1080, height: 1920 },
  { id: 'old', containerId: 'lottie-bubble-old', width: 1080, height: 1920 }
];

// 先计算背景缩放比例
const bgScaleRatio = getBgScaleRatio();
console.log('背景缩放比例:', bgScaleRatio);

const bubbleAnimations = {};

bubbleConfigs.forEach(config => {
  const container = document.getElementById(config.containerId);
  if (container) {
    // 设置缩放后的尺寸（根据背景图缩放比例）
    container.style.width = scaleValue(config.width, bgScaleRatio);
    container.style.height = scaleValue(config.height, bgScaleRatio);
    
    console.log(`正在加载 bubble ui 动画: ${config.id}, 尺寸:`, container.style.width, container.style.height);
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
});

window.bubbleAnimations = bubbleAnimations;

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



// 初始化所有 Lottie 动画

animationConfigs.forEach(config => {
  const container = document.getElementById(config.containerId);
  if (container) {
    // 设置容器尺寸（根据背景图缩放比例）
    container.style.width = scaleValue(config.width, bgScaleRatio);
    container.style.height = scaleValue(config.height, bgScaleRatio);
    
    // 调试：输出容器位置和尺寸信息
    console.log(`动画 ${config.id}:`, {
      originalWidth: config.width,
      originalHeight: config.height,
      scaledWidth: container.style.width,
      scaledHeight: container.style.height,
      bgScaleRatio: bgScaleRatio,
      left: container.style.left,
      top: container.style.top
    });
    
    console.log(`正在加载动画: ${config.id}, 路径: ${config.path}`);
    
    // 创建动画实例
    const animation = new LottieAnimation({
      container: container,
      path: config.path,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      speed: 1
    });
    
    // 监听加载事件
    if (animation.animation) {
      animation.animation.addEventListener('DOMLoaded', () => {
        console.log(`动画加载成功: ${config.id}`);
      });
      animation.animation.addEventListener('data_failed', () => {
        console.error(`动画加载失败: ${config.id}, 路径: ${config.path}`);
      });
    }
    
    animations[config.id] = {
      instance: animation,
      container: container
    };
  } else {
    console.error(`容器未找到: ${config.containerId}`);
  }
});

// 将动画实例挂载到 window 方便调试
window.lottieAnimations = animations;

// 检查所有动画状态
setTimeout(() => {
  console.log('动画加载状态检查:');
  Object.keys(animations).forEach(id => {
    const anim = animations[id].instance;
    console.log(`  ${id}: isLoaded=${anim.isLoaded}`);
  });
}, 3000);

const mainScene = document.getElementById('main-scene');
const detailScene = document.getElementById('detail-scene');
const maskLayer = document.querySelector('.mask-layer');
const bottomBg = document.querySelector('.bottom-bg');
const fixedImgs = document.querySelectorAll('.fixed-img');
const fixedTitle = document.querySelector('.fixed-title');
const closeBtn = document.querySelector('.close-btn');
const modalOverlay = document.getElementById('modalOverlay');
const modalClose = document.getElementById('modalClose');
const modalBody = document.getElementById('modalBody');
const detailImage = document.querySelector('.detail-image');

// 原始设计稿中的滚动范围（基于原始 SVG viewBox 高度）
const ORIGINAL_MIN_SCROLL = 4900;
const ORIGINAL_MAX_SCROLL = 7500;

// 当前实际的滚动范围
let MIN_SCROLL = 3000;
let MAX_SCROLL = 7290;

// 根据文字长图实际高度计算滚动范围
function updateScrollRange() {
  const detailImage = document.querySelector('.detail-image');
  
  if (detailImage) {
    const imageHeight = detailImage.clientHeight;
    
    // 计算缩放比例（基于原始 viewBox 高度）
    const scaleRatio = imageHeight / SVG_VIEWBOX_HEIGHT;
    
    // 根据缩放比例调整滚动范围，保持原始的相对位置
    MIN_SCROLL = Math.round(ORIGINAL_MIN_SCROLL * scaleRatio);
    MAX_SCROLL = Math.round(ORIGINAL_MAX_SCROLL * scaleRatio);
    
    // 更新 svgNodes 的缩放坐标
    updateSvgNodesScale(scaleRatio);
    
    console.log('滚动范围更新:', { MIN_SCROLL, MAX_SCROLL, imageHeight, scaleRatio });
  }
}

let touchStartX = 0;
let touchEndX = 0;
let touchStartY = 0;
let touchEndY = 0;
let scrollTimeout = null;
let isDetailPage = false;

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

// 根据缩放比例更新 svgNodes 的坐标
function updateSvgNodesScale(scaleRatio) {
  svgNodes.forEach(node => {
    node.scaledCy = node.cy * scaleRatio;
  });
}

// 初始化时设置缩放比例为 1
updateSvgNodesScale(1);

const svgRanges = [];
for (let i = 0; i < svgNodes.length; i++) {
  const current = svgNodes[i];
  const prev = i > 0 ? svgNodes[i - 1] : null;
  const next = i < svgNodes.length - 1 ? svgNodes[i + 1] : null;
  const min = prev ? (prev.cy + current.cy) / 2 : 0;
  const max = next ? (current.cy + next.cy) / 2 : SVG_VIEWBOX_HEIGHT;
  svgRanges.push({ min, max, key: current.key });
}

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

if (detailImage) {
  detailImage.addEventListener('click', (e) => {
    if (!isDetailPage) return;
    
    const rect = detailImage.getBoundingClientRect();
    const svgY = (e.clientY - rect.top) * (SVG_VIEWBOX_HEIGHT / rect.height);
    
    for (const range of svgRanges) {
      if (svgY >= range.min && svgY < range.max) {
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
      bottomBg.classList.add('visible');
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

// 根据缩放比例调整滚动位置
function getScaledScrollPosition(originalPosition) {
  const detailImage = document.querySelector('.detail-image');
  if (!detailImage) return originalPosition;
  
  const imageHeight = detailImage.clientHeight;
  const scaleRatio = imageHeight / SVG_VIEWBOX_HEIGHT;
  
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
    bottomBg.classList.remove('visible');
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
const ASSET7_ORIGINAL_WIDTH = 2158.84;
// 文字长图的原始宽度
const TEXT_IMAGE_ORIGINAL_WIDTH = 2389.66;

// 调整文字长图宽度，使其与 Asset 7.svg 的显示宽度一致
// 同时调整 svg-container 高度，使其与背景图实际显示高度一致
// 同时调整详情页中固定元素的位置和大小
function adjustLayout() {
  const bgWrapper = document.querySelector('.bg-wrapper');
  const bgImage = document.querySelector('.bg-image');
  const detailImage = document.querySelector('.detail-image');
  const svgContainer = document.querySelector('.svg-container');
  
  if (bgWrapper && bgImage) {
    // 计算主图的实际显示尺寸
    const wrapperWidth = bgWrapper.clientWidth;
    const wrapperHeight = bgWrapper.clientHeight;
    
    // 主图原始比例: 2994.23 / 4378.87
    const bgAspectRatio = 2994.23 / 4378.87;
    
    // 根据容器高度计算主图实际显示宽度
    let actualBgWidth = wrapperHeight * bgAspectRatio;
    
    // 如果计算出的宽度超过容器宽度，则使用容器宽度
    if (actualBgWidth > wrapperWidth) {
      actualBgWidth = wrapperWidth;
    }
    
    // 计算主图实际显示高度
    const actualBgHeight = actualBgWidth / bgAspectRatio;
    
    // 计算相对于原始设计稿的缩放比例（基于 Asset 7 的宽度）
    const scaleRatio = actualBgWidth / 2994.23;
    
    // 计算 Asset 7.svg 的实际显示宽度
    const asset7ActualWidth = ASSET7_ORIGINAL_WIDTH * scaleRatio;
    
    // 设置文字长图的宽度与 Asset 7.svg 一致
    if (detailImage) {
      detailImage.style.width = `${asset7ActualWidth}px`;
      detailImage.style.maxWidth = `${asset7ActualWidth}px`;
      detailImage.style.flexShrink = '0';
      console.log('文字长图宽度设置为:', asset7ActualWidth, 'px');
    }
    
    // 设置 svg-container 的高度与背景图实际显示高度一致
    if (svgContainer) {
      svgContainer.style.height = `${actualBgHeight}px`;
      console.log('svg-container 高度调整为:', actualBgHeight, 'px');
    }
    
    // 调整主页人物动画的位置
    adjustCharacterPositions(actualBgWidth, actualBgHeight, wrapperWidth, wrapperHeight);
    
    // 调整详情页中固定元素的位置和大小（使用 Asset 7 的实际宽度）
    adjustDetailPageElements(scaleRatio, asset7ActualWidth);
    
    console.log('布局调整:', { actualBgWidth, actualBgHeight, asset7ActualWidth, scaleRatio });
  }
}

// 调整主页人物动画的位置
// 原始位置百分比（相对于背景图）
const characterOriginalPositions = {
  'lottie-baby': { left: 0.51, top: 0.63 },
  'lottie-kid': { left: 0.41, top: 0.51 },
  'lottie-adult': { left: 0.60, top: 0.39 },
  'lottie-old': { left: 0.40, top: 0.35 }
};

// bubble 动画原始位置百分比
const bubbleOriginalPositions = {
  'lottie-bubble-baby': { left: 0.56, top: 0.58 },
  'lottie-bubble-kid': { left: 0.49, top: 0.45 },
  'lottie-bubble-adult': { left: 0.66, top: 0.33 },
  'lottie-bubble-old': { left: 0.47, top: 0.27 }
};

function adjustCharacterPositions(actualBgWidth, actualBgHeight, wrapperWidth, wrapperHeight) {
  // 计算背景图在容器中的水平偏移（居中）
  const offsetX = (wrapperWidth - actualBgWidth) / 2;
  const offsetY = (wrapperHeight - actualBgHeight) / 2;
  
  // 调整每个人物动画的位置
  Object.keys(characterOriginalPositions).forEach(id => {
    const container = document.getElementById(id);
    if (container) {
      const pos = characterOriginalPositions[id];
      // 计算实际像素位置
      const actualLeft = offsetX + actualBgWidth * pos.left;
      const actualTop = offsetY + actualBgHeight * pos.top;
      
      // 设置位置（使用百分比相对于 wrapper）
      container.style.left = `${(actualLeft / wrapperWidth) * 100}%`;
      container.style.top = `${(actualTop / wrapperHeight) * 100}%`;
    }
  });
  
  // 调整每个 bubble 动画的位置
  Object.keys(bubbleOriginalPositions).forEach(id => {
    const container = document.getElementById(id);
    if (container) {
      const pos = bubbleOriginalPositions[id];
      // 计算实际像素位置
      const actualLeft = offsetX + actualBgWidth * pos.left;
      const actualTop = offsetY + actualBgHeight * pos.top;
      
      // 设置位置（使用百分比相对于 wrapper）
      container.style.left = `${(actualLeft / wrapperWidth) * 100}%`;
      container.style.top = `${(actualTop / wrapperHeight) * 100}%`;
    }
  });
  
  console.log('人物和 bubble 位置调整:', { actualBgWidth, actualBgHeight, offsetX, offsetY });
}

// 调整详情页中固定元素的位置和大小
function adjustDetailPageElements(scaleRatio, actualBgWidth) {
  const detailScene = document.getElementById('detail-scene');
  if (!detailScene) return;
  
  // 计算文字长图在屏幕中的水平偏移（居中）
  const sceneWidth = detailScene.clientWidth;
  const offsetX = (sceneWidth - actualBgWidth) / 2;
  
  // 调整 fixed-title 的位置
  const fixedTitle = document.querySelector('.fixed-title');
  if (fixedTitle) {
    // 原始 left: 66%，现在根据实际宽度调整
    fixedTitle.style.left = `${offsetX + actualBgWidth * 0.62}px`;
    // 调整大小
    const titleImg = fixedTitle.querySelector('img');
    if (titleImg) {
      titleImg.style.width = `${Math.min(747.97 * scaleRatio, 747.97)}px`;
    }
  }
  
  // 调整 close-btn 的位置和大小
  const closeBtn = document.querySelector('.close-btn');
  if (closeBtn) {
    // 根据实际背景图宽度计算位置
    // 原始设计：right 5%，现在根据实际宽度调整
    const originalRightPercent = 0.01; // 5%
    const originalTopPercent = 0.01;   // 5%
    
    // 计算实际的 right 和 top 位置
    const sceneWidth = detailScene.clientWidth;
    const rightPosition = (sceneWidth - actualBgWidth) / 2 + actualBgWidth * originalRightPercent;
    const topPosition = window.innerHeight * originalTopPercent;
    
    closeBtn.style.right = `${rightPosition}px`;
    closeBtn.style.top = `${topPosition}px`;
    
    // 调整大小
    const btnImg = closeBtn.querySelector('img');
    if (btnImg) {
      btnImg.style.width = `${Math.min(123.89 * scaleRatio, 123.89)}px`;
    }
  }
  
  // 调整 fixed-img 的位置和大小
  const fixedImgs = document.querySelectorAll('.fixed-img');
  fixedImgs.forEach((img, index) => {
    // 原始位置比例（根据 CSS 中的 left 值）
    const originalLefts = [0.10, 0.13, 0.13, 0.07];
    const originalTops = [0.30, 0.25, 0.23, 0.23];
    const originalWidths = [472.08, 383.56, 428.23, 584.37];
    
    if (index < 4) {
      // 调整位置为相对于文字长图
      img.style.left = `${offsetX + actualBgWidth * originalLefts[index]}px`;
      // 调整大小
      img.style.width = `${originalWidths[index] * scaleRatio}px`;
    }
  });
  
  console.log('详情页元素调整:', { scaleRatio, offsetX, actualBgWidth });
}

// 等待图片加载完成后再调整
window.addEventListener('load', () => {
  adjustLayout();
  // 更新滚动范围
  updateScrollRange();
});

// 窗口大小变化时重新调整动画尺寸和文字长图
window.addEventListener('resize', () => {
  // 获取新的背景缩放比例
  const newBgScaleRatio = getBgScaleRatio();
  
  // 更新人物动画尺寸
  animationConfigs.forEach(config => {
    const container = document.getElementById(config.containerId);
    if (container) {
      container.style.width = scaleValue(config.width, newBgScaleRatio);
      container.style.height = scaleValue(config.height, newBgScaleRatio);
    }
  });
  
  // 更新 bubble 动画尺寸
  bubbleConfigs.forEach(config => {
    const container = document.getElementById(config.containerId);
    if (container) {
      container.style.width = scaleValue(config.width, newBgScaleRatio);
      container.style.height = scaleValue(config.height, newBgScaleRatio);
    }
  });
  
  // 调整布局
  adjustLayout();
  
  // 更新滚动范围
  updateScrollRange();
});

console.log('页面已加载完成');
