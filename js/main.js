document.addEventListener('DOMContentLoaded', function() {
    // 缓存常用DOM元素
    const body = document.body;
    const backToTopBtn = document.getElementById('back-to-top');
    const header = document.querySelector('.glass-nav');
    const nav = document.querySelector('nav');
    const mobileToggle = document.querySelector('.mobile-toggle');
    
    // 检查首选主题
    checkThemePreference();
    
    // 初始化滚动动画
    initScrollAnimations();
    
    // 初始化视差滚动
    initParallaxEffect();
    
    // 初始化导航栏
    initNavigation();
    
    // 初始化回到顶部按钮
    initBackToTop();
    
    // 初始化音效反馈
    initAudioFeedback();
    
    // 初始化数据统计面板
    initStatsPanel();
    
    // 使用防抖函数处理滚动事件
    const throttledScroll = throttle(handleScroll, 16); // 约60fps
    window.addEventListener('scroll', throttledScroll, { passive: true });
    
    // 统一滚动处理函数
    function handleScroll() {
        const scrollY = window.pageYOffset || document.documentElement.scrollTop;
        
        // 更新导航栏样式
        if (scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // 更新回到顶部按钮
        if (scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    }
});

// 主题切换功能
function checkThemePreference() {
    const themeToggle = document.querySelector('.theme-toggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const currentHour = new Date().getHours();
    const isNightTime = currentHour >= 19 || currentHour < 7;
    
    // 如果是晚上或者用户偏好暗色模式，则启用暗色模式
    if (isNightTime || prefersDarkScheme.matches) {
        document.body.classList.add('dark-mode');
    }
    
    // 主题切换事件
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        playAudio('click');
        
        // 保存用户的主题偏好
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    });
    
    // 如果用户之前设置过主题，使用保存的设置
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    } else if (savedTheme === 'light') {
        document.body.classList.remove('dark-mode');
    }
}

// 滚动动画初始化 - 使用IntersectionObserver优化
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    // 使用Intersection Observer API代替滚动事件
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // 元素可见后不再观察
                observer.unobserve(entry.target);
            }
        });
    }, {
        rootMargin: '0px 0px -100px 0px',
        threshold: 0.1
    });
    
    // 观察所有需要动画的元素
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// 视差滚动效果 - 性能优化
function initParallaxEffect() {
    // 只在非移动设备上启用视差效果
    if (window.innerWidth > 768) {
        const parallaxSections = document.querySelectorAll('.parallax-section');
        const parallaxBgs = document.querySelectorAll('.parallax-bg');
        
        // 添加视差效果
        let lastScrollY = window.scrollY;
        let ticking = false;
        
        window.addEventListener('scroll', function() {
            lastScrollY = window.scrollY;
            
            if (!ticking) {
                window.requestAnimationFrame(function() {
                    updateParallax(lastScrollY);
                    ticking = false;
                });
                
                ticking = true;
            }
        }, { passive: true });
        
        function updateParallax(scrollY) {
            parallaxSections.forEach(section => {
                const background = section.querySelector('.parallax-bg');
                if (!background) return;
                
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                
                // 只在部分可见时应用效果
                if (scrollY + window.innerHeight > sectionTop && scrollY < sectionTop + sectionHeight) {
                    const yPos = (scrollY - sectionTop) * 0.3;
                    background.style.transform = `translate3d(0, ${yPos}px, 0)`;
                }
            });
        }
    }
}

// 导航栏初始化
function initNavigation() {
    const nav = document.querySelector('nav');
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // 移动端菜单切换
    mobileToggle.addEventListener('click', function() {
        mobileToggle.classList.toggle('active');
        nav.classList.toggle('active');
        playAudio('click');
    });
    
    // 点击导航链接关闭移动菜单
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            nav.classList.remove('active');
            mobileToggle.classList.remove('active');
            playAudio('hover');
        });
        
        // 为导航链接添加悬停音效
        link.addEventListener('mouseenter', function() {
            playAudio('hover');
        });
    });
    
    // 高亮当前滚动位置对应的导航链接
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNavOnScroll() {
        const scrollPosition = window.scrollY + 100; // 添加一些偏移
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    // 使用节流函数优化滚动处理
    window.addEventListener('scroll', throttle(highlightNavOnScroll, 200), { passive: true });
}

// 回到顶部按钮初始化
function initBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    
    backToTopBtn.addEventListener('click', function() {
        // 使用更高性能的滚动方法
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        playAudio('click');
    });
}

// 音效反馈初始化 - 预加载音频
function initAudioFeedback() {
    // 创建音频元素
    const hoverAudio = new Audio('assets/audios/hover.mp3');
    const clickAudio = new Audio('assets/audios/click.mp3');
    
    // 预加载音频
    hoverAudio.preload = 'auto';
    clickAudio.preload = 'auto';
    
    // 使音频更轻量级
    hoverAudio.volume = 0.2;
    clickAudio.volume = 0.3;
    
    // 减少事件监听器数量，采用事件委托
    document.addEventListener('mouseenter', function(e) {
        const target = e.target;
        if (target.matches('.btn, .filter-btn, .theme-toggle, .mobile-toggle, .social-icon')) {
            playAudio('hover');
        }
    }, { capture: true, passive: true });
    
    document.addEventListener('click', function(e) {
        const target = e.target;
        if (target.matches('.btn, .filter-btn, .theme-toggle, .mobile-toggle, .social-icon') || 
            target.closest('.btn, .filter-btn, .theme-toggle, .mobile-toggle, .social-icon')) {
            playAudio('click');
        }
        
        // 页面交互后启用音频
        document.documentElement.dataset.audioEnabled = 'true';
    }, { passive: true });
    
    // 全局音频播放函数
    window.playAudio = function(type) {
        // 检查用户是否已交互过页面
        if (document.documentElement.dataset.audioEnabled !== 'true') {
            return;
        }
        
        if (type === 'hover') {
            hoverAudio.currentTime = 0;
            hoverAudio.play().catch(e => console.log('音频播放失败:', e));
        } else if (type === 'click') {
            clickAudio.currentTime = 0;
            clickAudio.play().catch(e => console.log('音频播放失败:', e));
        }
    };
}

// 统计数据面板初始化
function initStatsPanel() {
    // 延迟创建统计面板，不阻塞主内容加载
    setTimeout(() => {
        // 创建统计面板按钮
        const statsButton = document.createElement('button');
        statsButton.className = 'stats-toggle-btn';
        statsButton.setAttribute('aria-label', '显示球队统计数据');
        statsButton.setAttribute('title', '球队统计数据');
        statsButton.innerHTML = '<i class="ri-bar-chart-fill"></i>';
        document.body.appendChild(statsButton);
        
        // 创建统计面板
        const statsPanel = document.createElement('div');
        statsPanel.className = 'stats-panel glass-card';
        statsPanel.innerHTML = `
            <div class="stats-header">
                <h3>勇士队历史数据</h3>
                <button class="stats-close" aria-label="关闭统计面板" title="关闭"><i class="ri-close-line"></i></button>
            </div>
            <div class="stats-content">
                <div class="stats-section">
                    <h4>总冠军</h4>
                    <div class="stats-chart" id="championships-chart"></div>
                    <div class="stats-info">
                        <p>总冠军次数: <strong>7</strong></p>
                        <p>最近一次: <strong>2022年</strong></p>
                    </div>
                </div>
                <div class="stats-section">
                    <h4>球员荣誉</h4>
                    <ul class="stats-list">
                        <li>MVP奖项: <strong>3</strong> (库里2次, 怀特1次)</li>
                        <li>总决赛MVP: <strong>4</strong> (杜兰特2次, 伊戈达拉1次, 库里1次)</li>
                        <li>全明星选手: <strong>30+</strong> 次入选</li>
                    </ul>
                </div>
                <div class="stats-section">
                    <h4>历史最佳战绩</h4>
                    <p class="highlight-stat">73胜9负 (2015-16赛季)</p>
                    <p>NBA历史常规赛最佳战绩</p>
                </div>
                <div class="stats-section">
                    <h4>主场连胜</h4>
                    <div class="stats-bar">
                        <div class="stats-bar-fill" style="width: 90%;">54场 (2014-16)</div>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(statsPanel);
        
        // 点击统计按钮显示面板
        statsButton.addEventListener('click', function() {
            statsPanel.classList.add('active');
            playAudio('click');
            
            // 延迟渲染图表，避免布局抖动
            if (!statsPanel.dataset.chartsRendered) {
                setTimeout(() => {
                    renderCharts();
                    statsPanel.dataset.chartsRendered = 'true';
                }, 300);
            }
        });
        
        // 关闭统计面板
        const closeButton = statsPanel.querySelector('.stats-close');
        closeButton.addEventListener('click', function() {
            statsPanel.classList.remove('active');
            playAudio('click');
        });
        
        // 点击面板外部关闭 - 使用事件委托
        document.addEventListener('click', function(event) {
            if (statsPanel.classList.contains('active') && 
                !statsPanel.contains(event.target) && 
                event.target !== statsButton && 
                !statsButton.contains(event.target)) {
                statsPanel.classList.remove('active');
            }
        });
        
        // 渲染图表 - 优化渲染性能
        function renderCharts() {
            const championshipsChart = document.getElementById('championships-chart');
            if (championshipsChart) {
                championshipsChart.innerHTML = '';
                
                const championships = [
                    { year: '1947', width: '30%' },
                    { year: '1956', width: '30%' },
                    { year: '1975', width: '35%' },
                    { year: '2015', width: '65%' },
                    { year: '2017', width: '70%' },
                    { year: '2018', width: '75%' },
                    { year: '2022', width: '80%' }
                ];
                
                // 使用片段收集DOM操作，减少重绘
                const fragment = document.createDocumentFragment();
                
                championships.forEach(champ => {
                    const bar = document.createElement('div');
                    bar.className = 'chart-bar';
                    bar.innerHTML = `
                        <span class="chart-label">${champ.year}</span>
                        <div class="chart-bar-fill" style="width: 0;"></div>
                    `;
                    fragment.appendChild(bar);
                });
                
                championshipsChart.appendChild(fragment);
                
                // 使用requestAnimationFrame平滑过渡
                requestAnimationFrame(() => {
                    const bars = championshipsChart.querySelectorAll('.chart-bar-fill');
                    championships.forEach((champ, i) => {
                        setTimeout(() => {
                            bars[i].style.width = champ.width;
                        }, i * 100);
                    });
                });
            }
        }
    }, 1000); // 延迟加载
}

// 节流函数 - 限制函数调用频率
function throttle(func, delay) {
    let lastCall = 0;
    return function(...args) {
        const now = Date.now();
        if (now - lastCall >= delay) {
            lastCall = now;
            func.apply(this, args);
        }
    };
}

// 平滑滚动到锚点
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
}); 