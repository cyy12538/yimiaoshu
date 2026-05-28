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
const fixedImgs = document.querySelectorAll('.fixed-img');



let touchStartX = 0;
let touchEndX = 0;
let touchStartY = 0;
let touchEndY = 0;









// 人物动画点击事件配置（跳转到疫苗时间线页面并滚动到对应年龄）
const characterClickConfig = [
  { id: 'baby', age: '出生时' },
  { id: 'kid', age: '4岁' },
  { id: 'adult', age: '18岁' },
  { id: 'old', age: '≥50岁' }
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
      // 跳转到疫苗时间线页面，并传递目标年龄参数
      window.location.href = `vaccine-timeline.html?age=${encodeURIComponent(config.age)}`;
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
  
  console.log('布局调整完成:', { displayWidth, displayHeight, scaleRatio, offsetX });
}

// 调整固定图片位置和尺寸
function adjustFixedImages(displayWidth, displayHeight, offsetX) {
  // 人物图片使用 2160x3840 设计稿，与背景层保持一致的缩放逻辑
  fixedImgs.forEach((img) => {
    // 设置与显示区域相同的尺寸（像背景层一样缩放）
    img.style.width = `${displayWidth}px`;
    img.style.height = `${displayHeight}px`;
    img.style.left = `${offsetX}px`;
    img.style.top = '0px';
    img.style.objectFit = 'contain';
    img.style.maxWidth = 'none';
    img.style.transform = 'none';
  });
  
  // 调整页面底部标题尺寸
  const mainTitle = document.getElementById('main-title');
  
  // 标题原始尺寸: 1228.27 x 165.66
  const titleOriginalWidth = 1228.27;
  const titleScaledWidth = titleOriginalWidth * scaleRatio;
  
  if (mainTitle) {
    const titleImg = mainTitle.querySelector('img');
    if (titleImg) {
      titleImg.style.width = `${titleScaledWidth}px`;
    }
  }
}

// 页面加载完成后初始化
window.addEventListener('load', () => {
  initAnimations();
  adjustLayout();
  
  // 初始化主页面标题显示
  const mainTitle = document.getElementById('main-title');
  if (mainTitle) mainTitle.classList.add('visible');
  
  console.log('页面初始化完成');
});

// 窗口大小变化时重新调整
window.addEventListener('resize', () => {
  initAnimations();
  adjustLayout();
});

console.log('main.js 已加载');
