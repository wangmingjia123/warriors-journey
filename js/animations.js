document.addEventListener('DOMContentLoaded', function() {
    // 初始化滚动动画
    initScrollAnimations();
    
    // 初始化视差滚动效果
    initParallaxScrolling();
    
    // 初始化更多动画效果
    initExtraAnimations();
    
    // 初始化滚动进度指示器
    initScrollProgress();
    
    // 初始化3D悬停效果
    initHover3DEffect();
});

// 滚动动画初始化
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    // 初始检查元素是否在视口中
    checkElementsInViewport();
    
    // 滚动时检查元素是否在视口中
    window.addEventListener('scroll', function() {
        checkElementsInViewport();
    });
    
    // 添加窗口尺寸变化检测
    window.addEventListener('resize', function() {
        checkElementsInViewport();
    });
    
    function checkElementsInViewport() {
        const windowHeight = window.innerHeight;
        const triggerPoint = windowHeight * 0.8; // 当元素到达视口80%的位置时触发动画
        
        animatedElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const elementTop = rect.top;
            
            if (elementTop < triggerPoint) {
                element.classList.add('visible');
            }
        });
    }
}

// 视差滚动效果初始化
function initParallaxScrolling() {
    const parallaxSections = document.querySelectorAll('.parallax-section');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        
        parallaxSections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const parallaxBg = section.querySelector('.parallax-bg');
            
            // 检查元素是否在视口附近
            if (
                scrollTop + window.innerHeight > sectionTop && 
                scrollTop < sectionTop + sectionHeight
            ) {
                // 计算相对位置，用于创建视差效果
                const yPos = (scrollTop - sectionTop) * 0.4;
                parallaxBg.style.transform = `translate3d(0, ${yPos}px, 0)`;
            }
        });
    });
}

// 额外动画效果初始化
function initExtraAnimations() {
    // 为经典时刻卡片添加hover动画
    const momentCards = document.querySelectorAll('.moment-card');
    momentCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const playButton = this.querySelector('.play-button');
            if (playButton) {
                playButton.classList.add('pulse');
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const playButton = this.querySelector('.play-button');
            if (playButton) {
                playButton.classList.remove('pulse');
            }
        });
    });
    
    // 为视频占位符添加点击效果
    const videoPlaceholders = document.querySelectorAll('.video-placeholder');
    videoPlaceholders.forEach(placeholder => {
        placeholder.addEventListener('click', function() {
            const videoId = this.getAttribute('data-video');
            simulateVideoPlay(videoId, this);
        });
    });
    
    // 为加载更多按钮添加点击动画
    const loadMoreBtn = document.getElementById('load-more-moments');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            this.classList.add('loading-animation');
            
            // 模拟加载更多内容
            setTimeout(() => {
                loadMoreMoments();
                this.classList.remove('loading-animation');
            }, 1000);
        });
    }
}

// 滚动进度指示器初始化
function initScrollProgress() {
    // 创建滚动进度条
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', function() {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollPercentage = (scrollTop / windowHeight) * 100;
        
        progressBar.style.height = `${scrollPercentage}%`;
    });
}

// 3D悬停效果初始化
function initHover3DEffect() {
    const cards = document.querySelectorAll('.glass-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            // 仅在大屏幕上启用3D效果
            if (window.innerWidth > 992) {
                const cardRect = this.getBoundingClientRect();
                const cardCenterX = cardRect.left + cardRect.width / 2;
                const cardCenterY = cardRect.top + cardRect.height / 2;
                
                // 计算鼠标位置相对于卡片中心的偏移
                const mouseX = e.clientX - cardCenterX;
                const mouseY = e.clientY - cardCenterY;
                
                // 根据鼠标位置计算旋转角度，最大为10度
                const rotateX = mouseY / (cardRect.height / 2) * -5;
                const rotateY = mouseX / (cardRect.width / 2) * 5;
                
                // 应用3D转换效果
                this.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
                this.style.transition = 'transform 0.1s ease';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            // 鼠标离开时恢复默认状态
            this.style.transform = 'rotateX(0) rotateY(0) translateZ(0)';
            this.style.transition = 'transform 0.5s ease';
        });
    });
}

// 模拟视频播放功能
function simulateVideoPlay(videoId, placeholder) {
    const parent = placeholder.parentElement;
    
    // 创建加载动画
    const loading = document.createElement('div');
    loading.className = 'loading';
    parent.appendChild(loading);
    
    // 移除占位图
    placeholder.style.opacity = '0';
    
    // 模拟加载延迟
    setTimeout(() => {
        // 移除加载动画
        parent.removeChild(loading);
        
        // 创建视频元素
        const videoElement = document.createElement('div');
        videoElement.className = 'video-element';
        videoElement.innerHTML = `
            <div class="video-frame">
                <div class="video-content">
                    <h3>视频模拟播放中</h3>
                    <p>ID: ${videoId}</p>
                    <p>在实际应用中，这里会嵌入真实的视频内容</p>
                </div>
            </div>
        `;
        
        // 替换占位符
        parent.replaceChild(videoElement, placeholder);
        
        // 添加渐入动画
        setTimeout(() => {
            videoElement.style.opacity = '1';
        }, 10);
        
        // 播放音效
        playAudio('click');
    }, 1000);
}

// 加载更多经典时刻
function loadMoreMoments() {
    const momentsGrid = document.querySelector('.moments-grid');
    
    // 更多经典时刻数据
    const moreMoments = [
        {
            id: 'curry-record',
            image: 'assets/images/curry-record.jpg',
            title: '库里打破三分纪录',
            description: '2021年12月14日，库里在对阵尼克斯的比赛中超越雷·阿伦成为NBA历史三分王。'
        },
        {
            id: 'game6-klay',
            image: 'assets/images/game6-klay.jpg',
            title: '汤普森G6神迹',
            description: '2018年西部决赛G6，克莱·汤普森在面临淘汰的情况下投中9记三分，率队逆转比赛。'
        },
        {
            id: 'warriors-73',
            image: 'assets/images/warriors-73.jpg',
            title: '73胜历史纪录',
            description: '2015-16赛季，勇士队创造了73胜9负的NBA常规赛历史最佳战绩。'
        }
    ];
    
    // 添加新的经典时刻卡片
    moreMoments.forEach((moment, index) => {
        const card = document.createElement('div');
        card.className = 'moment-card glass-card animate-on-scroll';
        if (index > 0) {
            card.classList.add(`delay-${index}`);
        }
        
        card.innerHTML = `
            <div class="moment-video">
                <div class="video-placeholder" data-video="${moment.id}">
                    <img src="${moment.image}" alt="${moment.title}">
                    <div class="play-button"><i class="ri-play-fill"></i></div>
                </div>
            </div>
            <div class="moment-info">
                <h3>${moment.title}</h3>
                <p>${moment.description}</p>
            </div>
        `;
        
        momentsGrid.appendChild(card);
        
        // 为新添加的卡片添加点击事件
        const newPlaceholder = card.querySelector('.video-placeholder');
        newPlaceholder.addEventListener('click', function() {
            const videoId = this.getAttribute('data-video');
            simulateVideoPlay(videoId, this);
        });
        
        // 添加淡入动画
        setTimeout(() => {
            card.classList.add('visible');
        }, 100 + index * 200);
    });
    
    // 移除加载更多按钮
    const loadMoreContainer = document.querySelector('.load-more-container');
    loadMoreContainer.style.display = 'none';
    
    // 重新初始化动画
    initExtraAnimations();
} 