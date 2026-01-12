// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
  // 移动端菜单切换
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  
  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', function() {
      mobileMenu.classList.toggle('hidden');
    });
  }
  
  // 使用GSAP设置动画
  setupGSAPAnimations();
});

// GSAP已经替代了这些函数，不再需要旧的滚动动画初始化函数

// 使用GSAP设置动画效果
function setupGSAPAnimations() {
  // 检查GSAP是否加载
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    // 注册ScrollTrigger插件
    gsap.registerPlugin(ScrollTrigger);
    
    // 设置便当盒卡片动画
    gsap.utils.toArray('.bento-card').forEach((card, i) => {
      gsap.fromTo(card, 
        { y: 50, opacity: 0 }, 
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: i * 0.1,
          scrollTrigger: {
            trigger: card,
            start: 'top 80%',
          }
        }
      );
    });
    
    // 设置特性内容动画
    gsap.utils.toArray('.feature-content').forEach((content) => {
      gsap.fromTo(content, 
        { x: -50, opacity: 0 }, 
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: content,
            start: 'top 75%',
          }
        }
      );
    });
    
    // 设置特性图片动画
    gsap.utils.toArray('.feature-image').forEach((image) => {
      gsap.fromTo(image, 
        { x: 50, opacity: 0 }, 
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: image,
            start: 'top 75%',
          }
        }
      );
    });
    
    // 设置统计数字动画
    gsap.utils.toArray('.stat-item').forEach((stat, i) => {
      gsap.fromTo(stat, 
        { y: 30, opacity: 0 }, 
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          delay: i * 0.1,
          scrollTrigger: {
            trigger: stat,
            start: 'top 85%',
          }
        }
      );
    });
    
    console.log('GSAP animations setup complete');
  }
}

// 页面滚动处理
window.addEventListener('scroll', function() {
  // 获取滚动位置
  const scrollPosition = window.scrollY;
  
  // 导航栏滚动效果
  const nav = document.querySelector('nav');
  if (nav) {
    if (scrollPosition > 50) {
      nav.classList.add('bg-white', 'shadow-md');
      nav.classList.remove('bg-transparent');
    } else {
      if (window.location.pathname.includes('index.html') || window.location.pathname.endsWith('/')) {
        nav.classList.remove('bg-white', 'shadow-md');
        nav.classList.add('bg-transparent');
      }
    }
  }
  
  // 视差滚动效果
  const parallaxElements = document.querySelectorAll('.parallax');
  parallaxElements.forEach(element => {
    const speed = element.getAttribute('data-speed') || 0.5;
    element.style.transform = `translateY(${scrollPosition * speed}px)`;
  });
});

// 添加平滑滚动到锚点
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 100, // 减去导航栏高度
        behavior: 'smooth'
      });
    }
  });
});