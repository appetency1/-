// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 1. 移动端菜单切换
    const menuBtn = document.getElementById('menuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    menuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // 2. 筛选功能实现
    const colorFilters = document.querySelectorAll('#colorFilter .filter-btn');
    const characterFilters = document.querySelectorAll('#characterFilter .filter-btn');
    const roleFilters = document.querySelectorAll('#roleFilter .filter-btn');
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const faceCards = document.querySelectorAll('.face-card');
    const noResult = document.getElementById('noResult');

    // 筛选状态存储
    let filterState = {
        color: 'all',
        character: 'all',
        role: 'all',
        search: ''
    };

    // 筛选按钮通用点击事件
    function initFilterButtons(buttons, type) {
        buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                // 切换激活状态
                buttons.forEach(b => b.classList.remove('filter-active'));
                btn.classList.add('filter-active');
                // 更新筛选状态
                filterState[type] = btn.dataset.filter;
                // 执行筛选
                filterCards();
            });
        });
    }

    // 初始化所有筛选按钮
    initFilterButtons(colorFilters, 'color');
    initFilterButtons(characterFilters, 'character');
    initFilterButtons(roleFilters, 'role');

    // 搜索功能
    function handleSearch() {
        filterState.search = searchInput.value.trim().toLowerCase();
        filterCards();
    }
    searchBtn.addEventListener('click', handleSearch);
    searchInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') handleSearch();
    });

    // 核心筛选逻辑
    function filterCards() {
        let hasResult = false;
        faceCards.forEach(card => {
            const color = card.dataset.color;
            const character = card.dataset.character;
            const role = card.dataset.role;
            const name = card.dataset.name.toLowerCase();

            // 筛选条件判断
            const colorMatch = filterState.color === 'all' || color === filterState.color;
            const characterMatch = filterState.character === 'all' || character === filterState.character;
            const roleMatch = filterState.role === 'all' || role === filterState.role;
            const searchMatch = name.includes(filterState.search);

            // 显示/隐藏卡片
            if (colorMatch && characterMatch && roleMatch && searchMatch) {
                card.style.display = 'block';
                hasResult = true;
            } else {
                card.style.display = 'none';
            }
        });

        // 显示/隐藏无结果提示
        noResult.style.display = hasResult ? 'none' : 'block';
    }

    // 3. 视图切换（网格/列表）
    const gridView = document.getElementById('gridView');
    const listView = document.getElementById('listView');
    const faceContainer = document.getElementById('faceContainer');

    gridView.addEventListener('click', () => {
        faceContainer.className = 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6';
        gridView.classList.add('bg-gray-100');
        listView.classList.remove('bg-gray-100');
    });

    listView.addEventListener('click', () => {
        faceContainer.className = 'grid grid-cols-1 gap-6';
        listView.classList.add('bg-gray-100');
        gridView.classList.remove('bg-gray-100');
    });

    // 4. 详情模态框功能
    const detailModal = document.getElementById('detailModal');
    const closeModal = document.getElementById('closeModal');
    const viewDetailBtns = document.querySelectorAll('.view-detail');
    const modalImage = document.getElementById('modalImage');
    const modalName = document.getElementById('modalName');
    const modalTags = document.getElementById('modalTags');
    const modalIntro = document.getElementById('modalIntro');
    const modalMeaning = document.getElementById('modalMeaning');
    const modalDrama = document.getElementById('modalDrama');

    // 脸谱详情数据（可扩展）
    const faceDetails = {
        关羽: {
            image: 'images/guanyu.jpg',
            tags: ['红色', '忠诚正义', '正面英雄', '武将'],
            intro: '关羽（？-220年），字云长，本字长生，河东解县（今山西运城）人，三国时期蜀汉名将。被后世尊为“武圣”，与“文圣”孔子齐名。',
            meaning: '红脸象征忠诚、正义、耿直、有气节。关羽脸谱额上画七星纹，代表其“夜读春秋”的儒雅气质，面部纹路简洁大气，体现其堂堂正正的英雄形象。',
            drama: '《温酒斩华雄》《过五关斩六将》《华容道》《单刀赴会》等'
        },
        包拯: {
            image: 'images/baoqing.jpg',
            tags: ['黑色', '忠诚正义', '正面英雄', '文人'],
            intro: '包拯（999年-1062年），字希仁，庐州合肥（今安徽合肥）人，北宋名臣。以断案如神、铁面无私著称，被后世尊为“包青天”。',
            meaning: '黑脸象征刚正不阿、铁面无私、严肃认真。包拯脸谱额上月牙纹是其标志性特征，传说月牙代表“日断阳间案，夜断阴间案”的神通。',
            drama: '《铡美案》《铡包勉》《打龙袍》《赤桑镇》等'
        },
        曹操: {
            image: 'images/caocao.jpg',
            tags: ['白色', '奸诈多疑', '反面奸角', '文人'],
            intro: '曹操（155年-220年），字孟德，沛国谯县（今安徽亳州）人，东汉末年杰出的政治家、军事家、文学家，曹魏政权的奠基人。',
            meaning: '白脸象征奸诈、多疑、狡猾、伪善。曹操脸谱面部绘有细眼和纹路，眼神锐利，凸显其权谋家的特质，是京剧中“奸雄”的典型代表。',
            drama: '《捉放曹》《青梅煮酒论英雄》《官渡之战》《赤壁之战》等'
        },
        窦尔敦: {
            image: 'images/douerdun.jpg',
            tags: ['蓝色', '勇猛刚毅', '武将', '草莽英雄'],
            intro: '窦尔敦（？-1720年），原名窦开山，河北献县人，清代侠义公案小说中的人物，绿林好汉，绰号“铁罗汉”。',
            meaning: '蓝脸象征勇猛、刚毅、豪爽、暴躁。窦尔敦脸谱面部绘有豹头纹，体现其草莽英雄的气概，蓝色在京剧中也常用于表现性格刚直的人物。',
            drama: '《盗御马》《连环套》《坐寨盗马》等'
        },
        典韦: {
            image: 'images/dianwei.jpg',
            tags: ['黄色', '凶狠残暴', '武将', '猛将'],
            intro: '典韦（？-197年），陈留己吾（今河南宁陵）人，东汉末年曹操麾下名将。力大无穷，勇猛过人，被曹操称为“古之恶来”。',
            meaning: '黄脸象征勇猛、凶狠、残暴、善战。典韦脸谱面部绘有虎纹，凸显其猛兽般的战斗力，黄色在京剧中也常用于表现性格暴躁的猛将。',
            drama: '《典韦救主》《战宛城》《三战吕布》等'
        },
        孙悟空: {
            image: 'images/sunwukong.jpg',
            tags: ['红+黄', '勇猛刚毅', '神怪', '机智'],
            intro: '孙悟空，字悟空，号齐天大圣，是中国古典名著《西游记》中的核心人物。由花果山石猴幻化而成，神通广大，嫉恶如仇。',
            meaning: '花脸（红+黄）象征机智、勇敢、反叛、神通广大。孙悟空脸谱面部绘有猴纹和火眼金睛，额头有紧箍咒纹路，色彩鲜艳，充满神话色彩。',
            drama: '《大闹天宫》《三打白骨精》《真假美猴王》《盘丝洞》等'
        },
        诸葛亮: {
            image: 'images/zhugeliang.jpg',
            tags: ['白色', '智慧谋略', '文人', '谋士'],
            intro: '诸葛亮（181年-234年），字孔明，号卧龙，琅琊阳都（今山东沂南）人，三国时期蜀汉丞相，杰出的政治家、军事家、发明家。',
            meaning: '白脸（俊扮）象征智慧、谋略、儒雅、清正。诸葛亮脸谱属于“俊扮”，面部干净无过多纹路，体现其文人谋士的儒雅气质，与奸角的白脸形成区别。',
            drama: '《草船借箭》《空城计》《借东风》《火烧赤壁》等'
        },
        李逵: {
            image: 'images/likui.jpg',
            tags: ['黑色', '勇猛刚毅', '武将', '草莽英雄'],
            intro: '李逵，绰号“黑旋风”，是中国古典名著《水浒传》中的重要人物。沂州沂水县（今山东沂水）人，梁山好汉排名第二十二位。',
            meaning: '黑脸象征勇猛、豪爽、鲁莽、忠诚。李逵脸谱面部绘有黑纹，眼神凶狠，体现其“黑旋风”的刚直勇猛特质，是京剧中草莽英雄的典型形象。',
            drama: '《李逵探母》《黑旋风李逵》《坐楼杀惜》《梁山伯与祝英台》等'
        }
    };

    // 打开模态框
    viewDetailBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const card = btn.closest('.face-card');
            const name = card.dataset.name;
            const detail = faceDetails[name];

            // 填充模态框内容
            modalImage.src = detail.image;
            modalImage.alt = `${name}脸谱详情`;
            modalName.textContent = `${name} - 京剧经典脸谱`;
            
            // 生成标签
            modalTags.innerHTML = '';
            detail.tags.forEach(tag => {
                const tagElement = document.createElement('span');
                tagElement.className = 'px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full';
                tagElement.textContent = tag;
                modalTags.appendChild(tagElement);
            });

            modalIntro.textContent = detail.intro;
            modalMeaning.textContent = detail.meaning;
            modalDrama.textContent = detail.drama;

            // 显示模态框
            detailModal.classList.add('active');
            document.body.style.overflow = 'hidden'; // 禁止背景滚动
        });
    });

    // 关闭模态框
    closeModal.addEventListener('click', () => {
        detailModal.classList.remove('active');
        document.body.style.overflow = ''; // 恢复背景滚动
    });

    // 点击模态框背景关闭
    detailModal.addEventListener('click', (e) => {
        if (e.target === detailModal) {
            detailModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // ESC键关闭模态框
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && detailModal.classList.contains('active')) {
            detailModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // 5. 导航栏滚动效果
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('py-2', 'shadow-lg');
            nav.classList.remove('py-3');
        } else {
            nav.classList.add('py-3');
            nav.classList.remove('py-2', 'shadow-lg');
        }
    });

    // 初始化：设置默认激活的筛选按钮
    colorFilters[0].classList.add('filter-active');
    characterFilters[0].classList.add('filter-active');
    roleFilters[0].classList.add('filter-active');
});