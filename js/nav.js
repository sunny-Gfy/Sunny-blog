// === DOM 元素获取
const highlightHover = document.querySelector('.highlight-hover');
const links = document.querySelectorAll('.ul-box a');

// === 初始化 highlight 位置 【导航项第一个的位置“主页”】
gsap.set(highlightHover, {
    width: links[0].offsetWidth,
    x: links[0].offsetLeft,
    opacity: 0
});

// === 鼠标悬停动画绑定事件
links.forEach(link => {
    link.addEventListener('mouseenter', () => {
        gsap.to(highlightHover, {
            width: link.offsetWidth,
            x: link.offsetLeft,
            opacity: 1,
            duration: 0.6,
            ease: "back.out(2.5)",
            overwrite: true
        });

        link.addEventListener('mouseleave', () => {
            gsap.to(highlightHover, {
                opacity: 0,
                duration: 0.6,
                ease: "power2.out"
            });
        });
    });
});