

// 获取元素
const proGress = document.querySelector('.progress')        // 'input' 进度条
const music = document.querySelector('#music');             // 'audio' 标签
const musicImg = document.querySelector('.music-cover img');        // 歌曲封面
const musicTitle = document.querySelector('.title');                // 歌曲名称
const musicArtist = document.querySelector('.artist');              // 歌手名称
const currentTime = document.querySelector('.current-time');        // 起点时间
const totalTime = document.querySelector('.total-time');            // 终点时间
const playBtn = document.querySelector('.play-btn');                // 播放按钮
const superiorBtn = document.querySelector('.superior-btn');        // 上一曲按钮
const downBtn = document.querySelector('.down-btn');                // 下一曲按钮

// 获取元素查看打印结果
// console.log(playBtn);

// 读取歌曲序号
let musicIndex = 1;

// 进度条滑块交互
const sliderTrack = () => {
    // 获取进度
    const min = proGress.min;
    const max = proGress.max;
    const value = proGress.value;

    // 计算百分之百
    const percentage = (value - min) * 100 / (max - min);

    // 修改 proGress 进度条的样式背景色
    proGress.style.background = `linear-gradient(to right, #eb5e28 ${percentage}%, rgba(220, 220, 220, 0.6) ${percentage}%)`;
}

proGress.style.background = `linear-gradient(to right, #eb5e28 ${proGress.value}%, rgba(220, 220, 220, 0.6) ${proGress.value}%)`;

// 先加载所有音乐资源
window.addEventListener('load', () =>{
    loadMusic(musicIndex);
});

// 在 'Date.js' 加载歌曲 Audio 元素修改样式属性
const loadMusic = (indexNumb) => {                                  // 索引歌曲序号(在Date.js文件里索引数组)
    musicImg.src = `${allMusic[indexNumb -1].img}.png`;             // 封面
    musicTitle.innerHTML = `${allMusic[indexNumb -1].name}`;        // 歌名
    musicArtist.innerHTML = `${allMusic[indexNumb -1].artist}`;     // 歌手
    music.src = `${allMusic[indexNumb -1].src}.mp3`;                // 音乐文件.Mp3
    // playingNow();
}

// 播放暂停按钮绑定点击事件,交互播放与暂停的状态
playBtn.addEventListener('click', () => {
    if (playBtn.classList.contains ('play')) {
        playBtn.classList.replace('play', 'pause');
        // 获取按钮元素中的 i 标签并修改图案(⏸️)
        playBtn.querySelector('i').innerHTML = 'pause';
        // 开始播放
        music.play();
    } else {
        playBtn.classList.replace('pause', 'play');
        playBtn.querySelector('i').innerHTML = 'play_arrow';
        // 暂停播放
        music.pause();
    }
});

// 上一曲
superiorBtn.addEventListener('click', () => {
    musicIndex--;
    if (musicIndex < 1) {
        musicIndex = allMusic.length;
    }

    loadMusic(musicIndex);
    
    setTimeout(() =>{
        music.play();
    }, 700);
    
    if (playBtn.classList.contains ('play')) {
        playBtn.classList.replace('play', 'pause');
        // 获取按钮元素中的 i 标签并修改图案(⏸️)
        playBtn.querySelector('i').innerHTML = 'pause';
    }
});

// 下一曲
downBtn.addEventListener('click', () => {
    musicIndex++;
    if (musicIndex > allMusic.length) {
        musicIndex = 1;
    }

    loadMusic(musicIndex);
    
    setTimeout(() =>{
        music.play();
    }, 700);
    
    if (playBtn.classList.contains ('play')) {
        playBtn.classList.replace('play', 'pause');
        // 获取按钮元素中的 i 标签并修改图案(⏸️)
        playBtn.querySelector('i').innerHTML = 'pause';
    }
});

// 当前歌曲播放完了后自动下一曲播放
music.addEventListener('ended', () => {
    music.currentTime = 0;      // 重置时间为起点
    downBtn.click();            // 自动下一曲
});

// 读取歌曲时间函数
// 更新时间
music.addEventListener('timeupdate', (e) => {
    const currTime = e.target.currentTime;
    const ttlTime = e.target.duration;

    const currMin = Math.floor(currTime / 60);
    let currSec = Math.floor(currTime % 60);
    if (currSec < 10) {
        currSec = `0${currSec}`;
    }
    currentTime.innerHTML = `${currMin}:${currSec}`;

    let progressWidth = (currTime / ttlTime) * 100;
    if (isNaN(progressWidth)) {
        progressWidth = 0;
    }

    proGress.value = progressWidth;
    sliderTrack();
});

proGress.addEventListener('input', (e) => {
    music.currentTime = e.target.value / 100 * music.duration
});

music.addEventListener('loadeddata', () => {
    const duration = music.duration;

    const ttlMin = Math.floor(duration / 60);
    let ttlSec = Math.floor(duration % 60);
    if (ttlSec < 10) {
        ttlSec = `0${ttlSec}`;
    }
    totalTime.innerHTML = `${ttlMin}:${ttlSec}`
});


// 绑定输入事件,并运行轨道进度条的函数名
proGress.addEventListener('input', sliderTrack);