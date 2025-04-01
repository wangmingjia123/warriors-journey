document.addEventListener('DOMContentLoaded', function() {
    // 图库数据 - 添加width和height属性辅助浏览器预布局
    const galleryItems = [
        {
            id: 1,
            src: 'assets/images/championship-2022.jpg',
            thumbnail: 'assets/images/championship-2022.jpg',
            title: '2022年总冠军庆典',
            description: '库里和队友们庆祝赢得第七个NBA总冠军',
            category: 'championship',
            width: 800,
            height: 533
        },
        {
            id: 2,
            src: 'assets/images/curry.jpg',
            thumbnail: 'assets/images/curry.jpg',
            title: '库里举起FMVP奖杯',
            description: '库里首次获得总决赛MVP奖杯',
            category: 'championship',
            width: 800,
            height: 533
        },
        {
            id: 3,
            src: 'assets/images/487298876_18499489933014777_4747727992982087855_n.jpg',
            thumbnail: 'assets/images/487298876_18499489933014777_4747727992982087855_n.jpg',
            title: '2022冠军队合影',
            description: '勇士队球员和工作人员举起奥布莱恩杯合影',
            category: 'championship',
            width: 800,
            height: 533
        },
        {
            id: 4,
            src: 'assets/images/487831003_18499487467014777_6767737014427988215_n.jpg',
            thumbnail: 'assets/images/487831003_18499487467014777_6767737014427988215_n.jpg',
            title: '库里投篮',
            description: '库里展示他标志性的三分投篮姿势',
            category: 'players',
            width: 800,
            height: 533
        },
        {
            id: 5,
            src: 'assets/images/thompson.jpg',
            thumbnail: 'assets/images/thompson.jpg',
            title: '汤普森庆祝',
            description: '克莱·汤普森在进球后的庆祝动作',
            category: 'players',
            width: 800,
            height: 533
        },
        {
            id: 6,
            src: 'assets/images/487672141_18499488556014777_2099651613525646903_n.jpg',
            thumbnail: 'assets/images/487672141_18499488556014777_2099651613525646903_n.jpg',
            title: '格林防守',
            description: '德雷蒙德·格林展示他标志性的防守姿态',
            category: 'players',
            width: 800,
            height: 533
        },
        {
            id: 7,
            src: 'assets/images/484887946_18496422475014777_1919951888575644348_n.jpg',
            thumbnail: 'assets/images/484887946_18496422475014777_1919951888575644348_n.jpg',
            title: '库里上篮',
            description: '斯蒂芬·库里在比赛中上篮',
            category: 'moments',
            width: 800,
            height: 533
        },
        {
            id: 8,
            src: 'assets/images/487403632_18499486201014777_990447769166373530_n.jpg',
            thumbnail: 'assets/images/487403632_18499486201014777_990447769166373530_n.jpg',
            title: '团队庆祝',
            description: '勇士队在赢得关键比赛后庆祝',
            category: 'moments',
            width: 800,
            height: 533
        },
        {
            id: 9,
            src: 'assets/images/487807246_18499485217014777_176600611860028516_n.jpg',
            thumbnail: 'assets/images/487807246_18499485217014777_176600611860028516_n.jpg',
            title: '科尔指导',
            description: '史蒂夫·科尔在比赛中指导球队',
            category: 'moments',
            width: 800,
            height: 533
        },
        // 新增图片
        {
            id: 10,
            src: 'assets/images/championship-2015.jpg',
            thumbnail: 'assets/images/championship-2015.jpg',
            title: '2015年总冠军',
            description: '勇士队时隔40年再次夺得NBA总冠军',
            category: 'championship',
            width: 800,
            height: 533
        },
        {
            id: 11,
            src: 'assets/images/championship-2017.jpg',
            thumbnail: 'assets/images/championship-2017.jpg',
            title: '2017年总冠军',
            description: '杜兰特加盟后首个赛季，勇士队夺得总冠军',
            category: 'championship',
            width: 800,
            height: 533
        },
        {
            id: 12,
            src: 'assets/images/championship-2018.jpg',
            thumbnail: 'assets/images/championship-2018.jpg',
            title: '2018年总冠军',
            description: '勇士队成功卫冕，完成两连冠',
            category: 'championship',
            width: 800,
            height: 533
        },
        {
            id: 13,
            src: 'assets/images/485427527_18497495614014777_6244917963307189682_n.jpg',
            thumbnail: 'assets/images/485427527_18497495614014777_6244917963307189682_n.jpg',
            title: '杜兰特在勇士',
            description: '凯文·杜兰特身着勇士队35号球衣',
            category: 'players',
            width: 800,
            height: 533
        },
        {
            id: 14,
            src: 'assets/images/484414291_18496425220014777_418771923761062653_n.jpg',
            thumbnail: 'assets/images/484414291_18496425220014777_418771923761062653_n.jpg',
            title: '伊戈达拉FMVP',
            description: '安德烈·伊戈达拉获得2015年总决赛MVP',
            category: 'players',
            width: 800,
            height: 533
        },
        {
            id: 15,
            src: 'assets/images/487907629_18499430464014777_7340214977006789233_n.jpg',
            thumbnail: 'assets/images/487907629_18499430464014777_7340214977006789233_n.jpg',
            title: '维金斯扣篮',
            description: '安德鲁·维金斯在2022年总决赛中的标志性扣篮',
            category: 'moments',
            width: 800,
            height: 533
        },
        {
            id: 16,
            src: 'assets/images/屏幕截图 2025-03-01 114706.png',
            thumbnail: 'assets/images/屏幕截图 2025-03-01 114706.png',
            title: '库里破纪录庆祝',
            description: '库里庆祝成为NBA历史三分球纪录保持者',
            category: 'moments',
            width: 800,
            height: 533
        },
        {
            id: 17,
            src: 'assets/images/thompson.jpg',
            thumbnail: 'assets/images/thompson.jpg',
            title: '汤普森伤愈复出',
            description: '克莱·汤普森在缺席941天后回归球场',
            category: 'moments',
            width: 800,
            height: 533
        },
        {
            id: 18,
            src: 'assets/images/championship-2022.jpg',
            thumbnail: 'assets/images/championship-2022.jpg',
            title: '2022年夺冠游行',
            description: '勇士队在旧金山举行冠军游行，与球迷共同庆祝',
            category: 'championship',
            width: 800,
            height: 533
        }
    ];
    
    // 当前加载的图片索引
    let currentIndex = 0;
    // 一次显示的图片数量
    const batchSize = 6;
    // 当前选中的筛选类别
    let currentFilter = 'all';
    // 是否正在加载更多图片
    let isLoading = false;
    // 缓存DOM元素，避免重复查询
    const galleryGrid = document.querySelector('.gallery-grid');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const modal = document.querySelector('.gallery-modal');
    const modalImg = document.getElementById('gallery-modal-img');
    const modalCaption = document.querySelector('.modal-caption');
    
    // 初始化图库
    initGallery();
    
    // 初始化图库功能
    function initGallery() {
        // 预加载首批图片
        loadImages();
        
        // 添加筛选功能
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                if (this.classList.contains('active') || isLoading) return;
                
                const filter = this.getAttribute('data-filter');
                filterGallery(filter);
                
                // 更新活动按钮样式
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                playAudio('click');
            });
        });
        
        // 添加图库模态框功能
        initGalleryModal();
        
        // 使用IntersectionObserver进行懒加载
        initInfiniteScroll();
    }
    
    // 加载图片 - 改进性能
    function loadImages() {
        if (isLoading) return;
        
        isLoading = true;
        
        const filteredItems = currentFilter === 'all' 
            ? galleryItems 
            : galleryItems.filter(item => item.category === currentFilter);
        
        // 计算要加载的图片
        const itemsToLoad = filteredItems.slice(currentIndex, currentIndex + batchSize);
        
        // 如果没有更多图片，直接返回
        if (itemsToLoad.length === 0) {
            isLoading = false;
            return;
        }
        
        // 创建一个片段，减少DOM操作次数
        const fragment = document.createDocumentFragment();
        
        // 创建加载指示器
        const loadingIndicator = document.createElement('div');
        loadingIndicator.className = 'loading';
        galleryGrid.appendChild(loadingIndicator);
        
        // 使用requestAnimationFrame优化视觉更新
        requestAnimationFrame(() => {
            // 创建并批量添加元素
            itemsToLoad.forEach(item => {
                const galleryItem = createGalleryItem(item);
                fragment.appendChild(galleryItem);
            });
            
            // 移除加载指示器并添加新元素
            galleryGrid.removeChild(loadingIndicator);
            galleryGrid.appendChild(fragment);
            
            // 触发布局重新计算后应用动画
            setTimeout(() => {
                const newItems = galleryGrid.querySelectorAll('.gallery-item:not(.fade-in)');
                newItems.forEach(item => item.classList.add('fade-in'));
            }, 10);
            
            // 更新当前索引
            currentIndex += itemsToLoad.length;
            isLoading = false;
        });
    }
    
    // 创建图库项 - 优化DOM创建
    function createGalleryItem(item) {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.setAttribute('data-id', item.id);
        galleryItem.setAttribute('data-category', item.category);
        
        // 为图片添加宽高，减少布局偏移
        galleryItem.innerHTML = `
            <img src="${item.thumbnail}" alt="${item.title}" title="${item.title}"
                 width="${item.width}" height="${item.height}" loading="lazy">
            <div class="gallery-item-overlay">
                <h3>${item.title}</h3>
                <p>${item.description}</p>
            </div>
        `;
        
        // 使用事件委托减少事件监听器数量
        galleryItem.addEventListener('click', function() {
            openModal(item.id);
            playAudio('click');
        });
        
        return galleryItem;
    }
    
    // 筛选图库 - 优化DOM清除操作
    function filterGallery(filter) {
        if (currentFilter === filter) return;
        
        currentFilter = filter;
        currentIndex = 0;
        
        // 高效清空图库
        while (galleryGrid.firstChild) {
            galleryGrid.removeChild(galleryGrid.firstChild);
        }
        
        // 重新加载图片
        loadImages();
    }
    
    // 使用IntersectionObserver替代滚动监听
    function initInfiniteScroll() {
        // 创建加载触发点
        const loadTrigger = document.createElement('div');
        loadTrigger.className = 'load-trigger';
        loadTrigger.style.height = '10px';
        loadTrigger.style.width = '100%';
        loadTrigger.style.visibility = 'hidden';
        galleryGrid.parentNode.appendChild(loadTrigger);
        
        // 创建观察器
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !isLoading) {
                    loadImages();
                }
            });
        }, {
            rootMargin: '200px 0px'
        });
        
        // 开始观察
        observer.observe(loadTrigger);
    }
    
    // 初始化图库模态框 - 减少事件监听器
    function initGalleryModal() {
        const closeModal = document.querySelector('.close-modal');
        const prevButton = document.querySelector('.modal-prev');
        const nextButton = document.querySelector('.modal-next');
        
        // 关闭模态框
        closeModal.addEventListener('click', function() {
            modal.style.display = 'none';
            playAudio('click');
        });
        
        // 设置事件委托，减少事件监听器
        document.addEventListener('click', function(event) {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
        
        // 导航按钮
        prevButton.addEventListener('click', function() {
            navigateGallery('prev');
            playAudio('click');
        });
        
        nextButton.addEventListener('click', function() {
            navigateGallery('next');
            playAudio('click');
        });
        
        // 键盘导航 - 使用passive事件改善性能
        document.addEventListener('keydown', function(event) {
            if (modal.style.display === 'block') {
                if (event.key === 'ArrowLeft') {
                    navigateGallery('prev');
                } else if (event.key === 'ArrowRight') {
                    navigateGallery('next');
                } else if (event.key === 'Escape') {
                    modal.style.display = 'none';
                }
            }
        }, { passive: true });
    }
    
    // 打开模态框 - 加载优化
    function openModal(id) {
        // 查找选中的图片
        const selectedItem = galleryItems.find(item => item.id === id);
        
        if (selectedItem) {
            // 先设置加载状态，再设置图片源
            modalImg.classList.add('loading');
            
            // 设置当前查看的图片ID
            modal.setAttribute('data-current-id', id);
            
            // 预设尺寸以减少布局偏移
            modalImg.width = selectedItem.width;
            modalImg.height = selectedItem.height;
            
            // 显示模态框
            modal.style.display = 'block';
            
            // 图片加载完成后移除加载状态
            modalImg.onload = function() {
                modalImg.classList.remove('loading');
            };
            
            // 设置图片源
            modalImg.src = selectedItem.src;
            modalImg.alt = selectedItem.title;
            modalCaption.textContent = `${selectedItem.title} - ${selectedItem.description}`;
        }
    }
    
    // 在图库中导航 - 缓存筛选结果
    function navigateGallery(direction) {
        const currentId = parseInt(modal.getAttribute('data-current-id'));
        
        // 缓存筛选结果
        const visibleItems = currentFilter === 'all' 
            ? galleryItems 
            : galleryItems.filter(item => item.category === currentFilter);
        
        // 查找当前图片的索引
        const currentIndex = visibleItems.findIndex(item => item.id === currentId);
        
        if (currentIndex !== -1) {
            let newIndex;
            
            if (direction === 'prev') {
                newIndex = currentIndex > 0 ? currentIndex - 1 : visibleItems.length - 1;
            } else {
                newIndex = currentIndex < visibleItems.length - 1 ? currentIndex + 1 : 0;
            }
            
            // 打开新图片
            openModal(visibleItems[newIndex].id);
        }
    }
}); 