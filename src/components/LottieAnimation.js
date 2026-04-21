import lottie from 'lottie-web';

/**
 * Lottie 动画组件
 * @param {Object} options - 配置选项
 * @param {HTMLElement} options.container - 容器元素（必需）
 * @param {string} options.path - JSON 文件路径
 * @param {Object} options.animationData - 动画数据对象（与 path 二选一）
 * @param {boolean} options.loop - 是否循环播放，默认 true
 * @param {boolean} options.autoplay - 是否自动播放，默认 true
 * @param {string} options.renderer - 渲染器类型：'svg' | 'canvas' | 'html'，默认 'svg'
 * @param {number} options.speed - 播放速度，默认 1
 */
export class LottieAnimation {
  constructor(options = {}) {
    this.container = options.container;
    this.path = options.path;
    this.animationData = options.animationData;
    this.loop = options.loop !== false;
    this.autoplay = options.autoplay !== false;
    this.renderer = options.renderer || 'svg';
    this.speed = options.speed || 1;
    
    this.animation = null;
    this.isLoaded = false;
    
    if (this.container) {
      this.init();
    } else {
      console.error('LottieAnimation: container is required');
    }
  }
  
  init() {
    const config = {
      container: this.container,
      renderer: this.renderer,
      loop: this.loop,
      autoplay: this.autoplay,
    };
    
    // 优先使用 animationData，其次使用 path
    if (this.animationData) {
      config.animationData = this.animationData;
    } else if (this.path) {
      config.path = this.path;
    } else {
      console.error('LottieAnimation: either path or animationData is required');
      return;
    }
    
    this.animation = lottie.loadAnimation(config);
    
    this.animation.addEventListener('DOMLoaded', () => {
      this.isLoaded = true;
      this.setSpeed(this.speed);
      console.log('Lottie animation loaded');
    });
    
    this.animation.addEventListener('data_failed', () => {
      console.error('Lottie animation failed to load');
    });
  }
  
  // 播放动画
  play() {
    if (this.animation) {
      this.animation.play();
    }
  }
  
  // 暂停动画
  pause() {
    if (this.animation) {
      this.animation.pause();
    }
  }
  
  // 停止动画
  stop() {
    if (this.animation) {
      this.animation.stop();
    }
  }
  
  // 设置播放速度
  setSpeed(speed) {
    if (this.animation) {
      this.animation.setSpeed(speed);
    }
  }
  
  // 跳转到指定帧
  goToAndStop(frame, isFrame = true) {
    if (this.animation) {
      this.animation.goToAndStop(frame, isFrame);
    }
  }
  
  // 跳转到指定帧并播放
  goToAndPlay(frame, isFrame = true) {
    if (this.animation) {
      this.animation.goToAndPlay(frame, isFrame);
    }
  }
  
  // 设置循环
  setLoop(loop) {
    if (this.animation) {
      this.animation.loop = loop;
    }
  }
  
  // 销毁动画
  destroy() {
    if (this.animation) {
      this.animation.destroy();
      this.animation = null;
      this.isLoaded = false;
    }
  }
  
  // 获取动画实例
  getAnimation() {
    return this.animation;
  }
}

export default LottieAnimation;