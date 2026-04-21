import "./style.css";
import { LottieAnimation } from './components/LottieAnimation.js';

// 存储所有动画实例
const animations = {};

// 动画配置 - 使用原始尺寸
const animationConfigs = [
  {
    id: 'baby',
    containerId: 'lottie-baby',
    path: '人物/baby.json',
    width: '283px',  // 原始宽度
    height: '306px'  // 原始高度
  },
  {
    id: 'kid',
    containerId: 'lottie-kid',
    path: '人物/kid.json',
    width: '268px',  // 原始宽度
    height: '455px'  // 原始高度
  },
  {
    id: 'adult',
    containerId: 'lottie-adult',
    path: '人物/adult.json',
    width: '268px',  // 原始宽度
    height: '770px'  // 原始高度
  },
  {
    id: 'old',
    containerId: 'lottie-old',
    path: '人物/old.json',
    width: '256px',  // 原始宽度
    height: '575px'  // 原始高度
  }
];

// Bubble UI 动画配置（四个人物配套的 bubble 动画）
const bubbleConfigs = [
  { id: 'baby', containerId: 'lottie-bubble-baby', width: '1080px', height: '1920px' },
  { id: 'kid', containerId: 'lottie-bubble-kid', width: '1080px', height: '1920px' },
  { id: 'adult', containerId: 'lottie-bubble-adult', width: '1080px', height: '1920px' },
  { id: 'old', containerId: 'lottie-bubble-old', width: '1080px', height: '1920px' }
];

const bubbleAnimations = {};

bubbleConfigs.forEach(config => {
  const container = document.getElementById(config.containerId);
  if (container) {
    // 设置原始尺寸
    container.style.width = config.width;
    container.style.height = config.height;
    
    console.log(`正在加载 bubble ui 动画: ${config.id}`);
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
    // 设置容器尺寸（只设置宽高，不设置位置）
    container.style.width = config.width;
    container.style.height = config.height;
    
    // 调试：输出容器位置信息
    console.log(`动画 ${config.id}:`, {
      width: config.width,
      height: config.height,
      left: container.style.left,
      top: container.style.top,
      computedLeft: getComputedStyle(container).left,
      computedTop: getComputedStyle(container).top
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

const MIN_SCROLL = 3900;
const MAX_SCROLL = 7290;

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

// 人物动画点击事件配置
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
      let scrollPosition = config.scrollPosition;
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

function updateFixedImages(currentScroll) {
  fixedImgs.forEach(img => {
    const scrollStart = parseInt(img.dataset.scrollStart);
    const scrollEnd = parseInt(img.dataset.scrollEnd);
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

console.log('页面已加载完成');
