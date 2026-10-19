// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
  // 1. 导航栏滚动效果
  const nav = document.querySelector('.main-nav');
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      nav.classList.add('nav-scrolled');
      nav.style.backgroundColor = 'rgba(26, 26, 26, 0.95)';
    } else {
      nav.classList.remove('nav-scrolled');
      nav.style.backgroundColor = 'var(--ink-black)';
    }
  });

  // 2. 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 70, // 减去导航栏高度
        behavior: 'smooth'
      });
    }
  }); // 仅闭合click事件的回调函数，不包含其他代码
}); // 闭合forEach循环

  // 3. 滚动指示器点击事件（滚动到简介区域）
  const scrollIndicator = document.querySelector('.scroll-indicator');
  if (scrollIndicator) {
    scrollIndicator.addEventListener('click', function() {
      document.querySelector('.intro-section').scrollIntoView({
        behavior: 'smooth'
      });
    });
  }
  //5. 新增：Banner背景图自动轮换
  const bannerBg = document.querySelector('.banner-bg');
  // 背景图数组（根据实际图片数量和名称修改）
  const bannerImages = [
    'images/banner/banner1.jpg',
    'images/banner/banner2.jpg',
    'images/banner/banner3.jpg'
  ];
  let currentIndex = 0;
  const intervalTime = 5000; // 每张图显示5秒

  // 初始化第一张背景图
  bannerBg.style.backgroundImage = `url(${bannerImages[currentIndex]})`;
  bannerBg.classList.add('fade-in');

  // 自动切换背景图函数
  function changeBanner() {
    // 移除当前图片的淡入类，添加淡出类
    bannerBg.classList.remove('fade-in');
    bannerBg.classList.add('fade-out');

    // 淡出动画结束后切换图片
    setTimeout(() => {
      currentIndex = (currentIndex + 1) % bannerImages.length;
      bannerBg.style.backgroundImage = `url(${bannerImages[currentIndex]})`;
      
      // 移除淡出类，添加淡入类
      bannerBg.classList.remove('fade-out');
      bannerBg.classList.add('fade-in');
    }, 1500); // 与CSS过渡时间保持一致（1.5秒）
  }

  // 定时切换背景图
  setInterval(changeBanner, intervalTime);
  // 流派数据（可根据实际需求扩展）
const faceData = {
  qian: {
    title: "钱派脸谱",
    img: "images/face-qian-detail.jpg",
    desc: "钱派脸谱由钱宝峰创立，其子钱金福继承并发展。其风格线条匀称美观，常夸大五官突出神采，对传统勾脸方法有诸多突破，是武净脸谱的重要流派。"
  },
  hao: {
    title: "郝派脸谱",
    img: "images/face-hao-detail.jpg",
    desc: "郝派由郝寿臣创立，融合黄润甫、金秀山等多家特点，脸谱规矩大方、圆润厚实，注重角色性格的深层刻画，代表角色如《法门寺》中的刘瑾。"
  },
  hou: {
    title: "侯派脸谱",
    img: "images/face-hou-detail.jpg",
    desc: "侯派由侯喜瑞创立，兼具韩乐卿的细腻俊美与黄润甫的豪放，风格刚劲有力，善于表现草莽英雄，代表角色如《盗御马》中的窦尔敦。"
  },
  qiu: {
    title: "裘派脸谱",
    img: "images/face-qiu-detail.jpg",
    desc: "裘派由裘盛戎创立，以铜锤花脸见长，脸谱注重脑门和眼窝的夸张处理，色彩层次丰富，代表角色如《铡美案》中的包拯。"
  },
  jin: {
    title: "金派脸谱",
    img: "images/face-jin-detail.jpg",
    desc: "金派由金少山创立，融合韩乐卿、金秀山等多家技法，脸谱勇武脱俗，善于表现帝王将相，代表角色如《霸王别姬》中的项羽。"
  }
};

// 获取DOM元素
const ringItems = document.querySelectorAll('.ring-item');
const modal = document.getElementById('faceModal');
const closeBtn = document.querySelector('.close-btn');
const modalTitle = document.getElementById('modalTitle');
const modalImg = document.getElementById('modalImg');
const modalDesc = document.getElementById('modalDesc');

// 点击环形项显示详情
ringItems.forEach(item => {
  item.addEventListener('click', function() {
    const category = this.getAttribute('data-category');
    const data = faceData[category];
    if (data) {
      modalTitle.textContent = data.title;
      modalImg.src = data.img;
      modalDesc.textContent = data.desc;
      modal.style.display = 'flex';
    }
  });
});

// 关闭弹窗
closeBtn.addEventListener('click', function() {
  modal.style.display = 'none';
});

// 点击弹窗外部关闭
window.addEventListener('click', function(event) {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
});
// 图片加载完成后显示
document.querySelectorAll('.ring-img, .center-img').forEach(img => {
  img.onload = () => img.classList.add('loaded');
});
});
// 图片加载完成后显示（放在JS文件末尾，独立执行）
document.querySelectorAll('.ring-img, .center-img, .intro-image img, .banner-bg').forEach(img => {
  // 新增：处理缓存图片
  if (img.complete) {
    img.classList.add('loaded');
  }
  // 处理实时加载的图片
  img.onload = () => {
    img.classList.add('loaded');
    // 针对Banner背景图，加载完成后添加淡入效果
    if (img.classList.contains('banner-bg')) {
      img.classList.add('fade-in');
    }
  };
});