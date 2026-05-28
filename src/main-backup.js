import "./style-backup.css";

// 设计稿原始尺寸
const ORIGINAL_WIDTH = 2160;
const ORIGINAL_HEIGHT = 3840;
const ASPECT_RATIO = ORIGINAL_WIDTH / ORIGINAL_HEIGHT;

// 获取显示尺寸（保持比例，填满屏幕）
function getDisplaySize() {
  const screenWidth = document.documentElement.clientWidth;
  const screenHeight = document.documentElement.clientHeight;
  
  let displayWidth, displayHeight;
  
  if (screenWidth / screenHeight > ASPECT_RATIO) {
    displayHeight = screenHeight;
    displayWidth = displayHeight * ASPECT_RATIO;
  } else {
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

// 人物SVG配置 - 使用原始尺寸（相对于 2160x3840 设计稿）
const characterConfigs = [
  {
    id: 'baby',
    containerId: 'svg-baby',
    svgPath: '/SVG/1.svg',
    width: 283,
    height: 306,
    left: 0.51,
    top: 0.63
  },
  {
    id: 'kid',
    containerId: 'svg-kid',
    svgPath: '/SVG/2.svg',
    width: 268,
    height: 455,
    left: 0.41,
    top: 0.51
  },
  {
    id: 'adult',
    containerId: 'svg-adult',
    svgPath: '/SVG/3.svg',
    width: 268,
    height: 770,
    left: 0.60,
    top: 0.39
  },
  {
    id: 'old',
    containerId: 'svg-old',
    svgPath: '/SVG/4.svg',
    width: 256,
    height: 575,
    left: 0.40,
    top: 0.3
  }
];

// 初始化主场景背景SVG
function initMainBackground(displayWidth, displayHeight) {
  const mainBgContainer = document.getElementById('main-background-svg');
  if (mainBgContainer) {
    mainBgContainer.style.width = `${displayWidth}px`;
    mainBgContainer.style.height = `${displayHeight}px`;
    mainBgContainer.innerHTML = `<img src="/SVG package/Asset 6.svg" style="width: 100%; height: 100%; object-fit: contain;">`;
  }
}

// 初始化所有静态SVG
function initStaticSVGs() {
  const { displayWidth, displayHeight, screenWidth } = getDisplaySize();
  const scaleRatio = getScaleRatio();
  const offsetX = (screenWidth - displayWidth) / 2;
  
  // 初始化主场景背景
  initMainBackground(displayWidth, displayHeight);
  
  // 初始化人物SVG
  characterConfigs.forEach(config => {
    const container = document.getElementById(config.containerId);
    if (container) {
      container.style.width = `${config.width * scaleRatio}px`;
      container.style.height = `${config.height * scaleRatio}px`;
      container.style.left = `${offsetX + displayWidth * config.left}px`;
      container.style.top = `${displayHeight * config.top}px`;
      
      if (!container.innerHTML) {
        container.innerHTML = `<img src="${config.svgPath}" style="width: 100%; height: 100%; object-fit: contain;">`;
      }
    }
  });
}

// 场景切换逻辑
let currentScene = 'main';

function switchToDetail() {
  if (currentScene === 'main') {
    const mainScene = document.getElementById('main-scene');
    const detailScene = document.getElementById('detail-scene');
    const bottomBg12 = document.getElementById('bottom-bg-12');
    const bottomBg11 = document.getElementById('bottom-bg-11');
    
    mainScene.classList.remove('active');
    mainScene.classList.add('exit');
    
    setTimeout(() => {
      detailScene.classList.add('active');
      bottomBg12.classList.add('visible');
      bottomBg11.classList.add('visible');
    }, 500);
    
    currentScene = 'detail';
  }
}

function switchToMain() {
  if (currentScene === 'detail') {
    const mainScene = document.getElementById('main-scene');
    const detailScene = document.getElementById('detail-scene');
    const bottomBg12 = document.getElementById('bottom-bg-12');
    const bottomBg11 = document.getElementById('bottom-bg-11');
    
    detailScene.classList.remove('active');
    bottomBg12.classList.remove('visible');
    bottomBg11.classList.remove('visible');
    
    setTimeout(() => {
      mainScene.classList.remove('exit');
      mainScene.classList.add('active');
    }, 500);
    
    currentScene = 'main';
  }
}

// 点击事件处理
function setupClickHandlers() {
  const characterContainers = document.querySelectorAll('.svg-character');
  characterContainers.forEach(container => {
    container.style.cursor = 'pointer';
    container.addEventListener('click', () => {
      switchToDetail();
    });
  });
  
  const closeBtn = document.querySelector('.close-btn');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      switchToMain();
    });
  }
}

// 滚动处理
function handleScroll() {
  const detailScene = document.getElementById('detail-scene');
  if (!detailScene || !detailScene.classList.contains('active')) return;
  
  const scrollTop = detailScene.scrollTop;
  const fixedImages = document.querySelectorAll('.fixed-img');
  
  fixedImages.forEach(img => {
    const scrollStart = parseInt(img.dataset.scrollStart);
    const scrollEnd = parseInt(img.dataset.scrollEnd);
    
    if (scrollTop >= scrollStart && scrollTop < scrollEnd) {
      img.style.opacity = '1';
      img.style.visibility = 'visible';
    } else {
      img.style.opacity = '0';
      img.style.visibility = 'hidden';
    }
  });
}

// 窗口大小改变时重新计算
function handleResize() {
  initStaticSVGs();
}

// 初始化
function init() {
  initStaticSVGs();
  setupClickHandlers();
  
  const detailScene = document.getElementById('detail-scene');
  if (detailScene) {
    detailScene.addEventListener('scroll', handleScroll);
  }
  
  window.addEventListener('resize', handleResize);
}

// 页面加载完成后初始化
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}