// 使用 let 声明变量，防止隐式全局变量污染
let engine = "https://www.baidu.com/s?wd=";

// 封装一个更新图标样式的通用函数，减少代码重复
function updateIconStyle(activeEngine) {
    // 1. 先清空所有图标的样式
    const allIcons = document.querySelectorAll('.ss-icon');
    allIcons.forEach(icon => {
        if (icon) icon.style.filter = "";
    });

    // 2. 为当前选中的图标添加高亮
    const activeLight = document.querySelector(`.${activeEngine}-icon.light`);
    const activeDark = document.querySelector(`.${activeEngine}-icon.dark`);

    if (activeLight) activeLight.style.filter = "drop-shadow(0 0 3px #00000022) brightness(200%)";
    if (activeDark) activeDark.style.filter = "drop-shadow(0 0 1.5px #555555) brightness(250%)";
}

// 初始化状态
updateIconStyle('baidu');

// 搜索功能 (使用 .on 代替废弃的 .bind)
$(".s-icon").on('click', function () {
    const key = $(".keyword").val();
    if (key) window.open(engine + key);
});

$(".keyword").on('keypress', function (event) {
    // 兼容 event.key 和过时的 event.keyCode
    if (event.key === 'Enter' || event.keyCode === 13) {
        const key = $(".keyword").val();
        if (key) window.open(engine + key);
    }
});

// 引擎切换
$(".google-icon").on('click', function () {
    engine = "https://www.google.com/search?q=";
    updateIconStyle('google');
});

$(".baidu-icon").on('click', function () {
    engine = "https://www.baidu.com/s?wd=";
    updateIconStyle('baidu');
});

$(".bing-icon").on('click', function () {
    engine = "https://www.bing.com/search?q=";
    updateIconStyle('bing');
});

// 随机句子 (使用现代 const 数组字面量写法)
const quotes = [
    "Wenn du lange in einen Abgrund blickst, blickt der Abgrund auch in dich hinein.",
    "All those moments will be lost in time, like tears in rain.",
    "Der Gott ist tot.",
    "Veni Vidi Vici.",
    "Cogito, ergo sum.",
    "Je pense, donc je suis.",
    "C'est la vie.",
    "L'enfer, c'est les autres.",
    "Was macht mich nicht umbringt, macht mich stärker.",
    "God's in his heaven, all's right with the world."
];

// 正确、安全的获取 0 到 quotes.length - 1 的随机数
const randIndex = Math.floor(Math.random() * quotes.length);
$(".end").html(quotes[randIndex]);

// 汉堡菜单切换 (仅移动端生效)
$(".hamburger").on('click', function (e) {
    $(".linkbox").fadeToggle(200);
    e.stopPropagation(); // 防止点击事件冒泡到 document 触发关闭
});

// 点击页面空白处关闭汉堡菜单
$(document).on('click', function () {
    if (window.innerWidth <= 768) {
        $(".linkbox").fadeOut(200);
    }
});
