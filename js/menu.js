// === DOM 元素获取
const menuBtn = document.querySelector('.menu-btn');
const menuBox = document.querySelector('.menu-box'); // 这里不再是菜单按钮的子元素


// === 点击菜单按钮显示弹窗卡片内容
menuBtn.addEventListener('click', (e) => {
    e.stopPropagation();    // 阻止事件冒泡，避免立即触发 document 的关闭逻辑
    menuBox.style.opacity = '1';
    menuBox.style.pointerEvents = 'auto';
});

// === 点击弹窗卡片外部自动关闭 (不显示)
document.addEventListener('click', (e) => { // 绑定点击事件监听
    const isClickInsideMenu = menuBox.contains(e.target);   // 事件委托获取弹窗菜单卡片元素赋值
    const isClickOnButton = menuBtn.contains(e.target);     // 事件委托获取菜单按钮元素赋值

    if (!isClickInsideMenu && !isClickOnButton) {
        menuBox.style.opacity = '0';
        menuBox.style.pointerEvents = 'none';
    }
});
