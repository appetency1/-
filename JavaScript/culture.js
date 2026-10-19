// 页面加载完成后执行（合并所有逻辑到同一个事件监听）
document.addEventListener('DOMContentLoaded', function() {
  // --------------------------
  // 1. 背景图滚动切换逻辑
  // --------------------------
  const globalBg = document.querySelector('.global-bg');
  const timelineItems = document.querySelectorAll('.timeline-item');
  const stageClassMap = [
    'pre-qin',    // 第1个节点：先秦
    'tang',       // 第2个节点：唐代
    'song-yuan',  // 第3个节点：宋元
    'ming',       // 第4个节点：明代
    'qing',       // 第5个节点：清代
    'modern'      // 第6个节点：当代
  ];

  // 初始化背景
  globalBg.classList.add(stageClassMap[0]);

  // 更新背景的核心函数
  function updateBackgroundByStage() {
    let currentStageIndex = 0;
    timelineItems.forEach((item, index) => {
      const itemRect = item.getBoundingClientRect();
      if (itemRect.top <= window.innerHeight * 0.5) {
        currentStageIndex = index;
      }
    });
    globalBg.className = 'global-bg';
    globalBg.classList.add(stageClassMap[currentStageIndex]);
  }

  // 触发背景更新
  updateBackgroundByStage();
  window.addEventListener('scroll', updateBackgroundByStage);

  // --------------------------
  // 2. 原有功能逻辑（导航栏、菜单等）
  // --------------------------
  // 导航栏滚动效果
  const nav = document.getElementById('mainNav');
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      nav.classList.add('nav-scrolled');
    } else {
      nav.classList.remove('nav-scrolled');
    }
  });

  // 移动端菜单切换
  const menuToggle = document.getElementById('menuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  menuToggle.addEventListener('click', function() {
    mobileMenu.classList.toggle('hidden');
    const icon = menuToggle.querySelector('i');
    if (icon.classList.contains('fa-bars')) {
      icon.classList.replace('fa-bars', 'fa-times');
    } else {
      icon.classList.replace('fa-times', 'fa-bars');
    }
  });

  // 平滑滚动到时间轴
  document.getElementById('scrollDown').addEventListener('click', function(e) {
    e.preventDefault();
    document.getElementById('timeline').scrollIntoView({
      behavior: 'smooth'
    });
  });

  // 滚动触发时间轴动画
  const revealItems = document.querySelectorAll('.reveal-item');
  gsap.registerPlugin(ScrollTrigger);
  
  revealItems.forEach(item => {
    gsap.to(item, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: item,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      }
    });
  });

  // 图片加载完成后显示
  document.querySelectorAll('img').forEach(img => {
    if (img.complete) {
      img.classList.add('loaded');
    }
    img.onload = () => {
      img.classList.add('loaded');
    };
    img.onerror = () => {
      img.src = 'images/default-img.jpg';
    };
  });
});