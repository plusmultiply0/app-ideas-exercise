let wrap = document.querySelector(".wrap");
let next = document.querySelector(".arrow_right");
let prev = document.querySelector(".arrow_left");

next.onclick = function () {
    next_pic();
}
prev.onclick = function () {
    prev_pic();
}
// 功能仅由单一函数实现，便于复用--定时器
function next_pic() {
    let newLeft;
    if (wrap.style.left === "-8640px") {
        newLeft = "-2160";
    } else {
        newLeft = parseInt(wrap.style.left) - 1080;
    }
    wrap.style.left = newLeft + "px";
    // 更新下方按钮显示
    index++;
    if (index > 6)
        index = 0;
    showCurrentDot();
}
function prev_pic() {
    let newLeft;
    if (wrap.style.left === "0px") {
        newLeft = "-6480";
    } else {
        newLeft = parseInt(wrap.style.left) + 1080;
    }
    wrap.style.left = newLeft + "px";
    index--;
    if (index < 0)
        index = 6;
    showCurrentDot();
}

// 定时播放
let timer = null;
function autoPlay() {
    timer = setInterval(function () {
        next_pic();
    }, 1200);
}
autoPlay();

let container = document.querySelector(".container");
container.onmouseenter = function () {
    clearInterval(timer);
}
container.onmouseleave = function () {
    autoPlay();
}

// 轮播图的小圆点
// 随播放而变化
var index = 0;
// 获得是按钮的个数
let dots = document.getElementsByTagName("span");
function showCurrentDot() {
    for (let i = 0, len = dots.length; i < len; i++) {
        dots[i].className = "";
    }
    dots[index].className = "on";
}

// 点击--切换对应的图片
for (let i = 0, len = dots.length; i < len; i++) {
    // 立即函数调用表达式
    (function (i) {
        // 对每个按钮附上一个点击事件
        dots[i].onclick = function () {
            let dis = index - i;
            if (index === 6 && parseInt(wrap.style.left) === 0) {
                // 最开始的照片，需要调整位移--当作是 第七张 图片
                dis = dis - 7;
            }
            
            if (index === 0 && parseInt(wrap.style.left) === -8640) {
                // 最后的照片，--调整位移，当作是第一张照片
                dis = 7 + dis;
            }

            // + 往左边移；- 往右边移
            wrap.style.left = (parseInt(wrap.style.left) + dis * 1080) + "px";

            index = i;
            showCurrentDot();
        }
    })(i);
}