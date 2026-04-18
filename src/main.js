import "./style.css";

const mainScene = document.getElementById('main-scene');
const detailScene = document.getElementById('detail-scene');

let touchStartX = 0;
let touchEndX = 0;

document.querySelectorAll('.svg-item').forEach(item => {
  item.addEventListener('click', () => {
    const pageId = item.dataset.page;
    
    if (pageId) {
      mainScene.classList.remove('active');
      mainScene.classList.add('exit');
      detailScene.classList.add('active');
    }
  });
});

function goBack() {
  if (detailScene.classList.contains('active')) {
    detailScene.classList.remove('active');
    mainScene.classList.remove('exit');
    mainScene.classList.add('active');
  }
}

detailScene.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].screenX;
});

detailScene.addEventListener('touchend', (e) => {
  touchEndX = e.changedTouches[0].screenX;
  if (touchEndX - touchStartX > 50) {
    goBack();
  }
});

detailScene.addEventListener('mousedown', (e) => {
  touchStartX = e.screenX;
});

detailScene.addEventListener('mouseup', (e) => {
  touchEndX = e.screenX;
  if (touchEndX - touchStartX > 50) {
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
