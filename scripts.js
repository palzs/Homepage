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

// ===== 书签区：扩展环境读取本地书签，域名环境 fallback 静态书签 =====

// 判断是否运行在 Chrome 扩展环境（chrome.bookmarks API 仅扩展可用）
function isExtensionEnv() {
    return typeof chrome !== 'undefined' &&
        chrome.bookmarks &&
        typeof chrome.bookmarks.getTree === 'function';
}

// 递归展平书签树，收集所有带 URL 的书签节点（保持原有顺序，按 URL 去重）
function flattenBookmarks(nodes, result, seen) {
    result = result || [];
    seen = seen || new Set();
    (nodes || []).forEach(node => {
        if (node.url && !seen.has(node.url)) {
            seen.add(node.url);
            result.push(node);
        }
        if (node.children) {
            flattenBookmarks(node.children, result, seen);
        }
    });
    return result;
}

// 生成单个书签卡片（结构与静态书签一致：div > img.fav-icon + p.fav-name）
function createBookmarkTile(bookmark) {
    const tile = document.createElement('div');
    tile.dataset.url = bookmark.url;

    const icon = document.createElement('img');
    icon.className = 'fav-icon';
    icon.loading = 'lazy';
    // 书签图标：与静态书签项目重合时映射为静态书签图标，否则直接来自浏览器
    icon.src = resolveFavicon(bookmark.url);
    icon.onerror = function () { this.style.visibility = 'hidden'; };

    const name = document.createElement('p');
    name.className = 'fav-name';
    let title = (bookmark.title || '').trim();
    if (!title) {
        try { title = new URL(bookmark.url).hostname; }
        catch (e) { title = bookmark.url; }
    }
    name.textContent = title;

    tile.appendChild(icon);
    tile.appendChild(name);
    return tile;
}

// 渲染书签到书签区（替换原静态内容）
function renderBookmarks(bookmarks) {
    const grid = document.querySelector('.fav-grid');
    if (!grid) return;
    grid.innerHTML = '';
    const frag = document.createDocumentFragment();
    bookmarks.forEach(b => frag.appendChild(createBookmarkTile(b)));
    grid.appendChild(frag);
}

// ===== 扩展模式图标：优先使用静态书签的本地图标，未命中回退 Chrome 在线图标 =====

// URL 规范化（解码 + 去尾斜杠），用于浏览器书签与静态书签的匹配
function normalizeBookmarkUrl(url) {
    try { url = decodeURIComponent(url); } catch (e) { /* 保留原样 */ }
    return url.replace(/\/+$/, '');
}

// 从静态书签区扫描 data-url → 本地图标路径 的映射（须在渲染替换前调用）
let faviconMap = null;
function buildFaviconMap() {
    const map = new Map();
    document.querySelectorAll('.fav-grid > div').forEach(div => {
        const url = div.getAttribute('data-url');
        const img = div.querySelector('img.fav-icon');
        if (url && img) map.set(normalizeBookmarkUrl(url), img.getAttribute('src'));
    });
    return map;
}

// 解析书签图标：浏览器书签与静态书签项目重合时用静态书签图标，否则用 Chrome 站点图标服务
function resolveFavicon(bookmarkUrl) {
    if (!faviconMap) faviconMap = buildFaviconMap();
    const local = faviconMap.get(normalizeBookmarkUrl(bookmarkUrl));
    if (local) return local;
    return chrome.runtime.getURL('_favicon/') +
        '?pageUrl=' + encodeURIComponent(bookmarkUrl) + '&size=64';
}

// 初始化书签区：扩展环境直接读取浏览器书签，否则保留静态书签（fallback）
function initBookmarks() {
    if (!isExtensionEnv()) return; // 域名访问：保留原有静态书签区
    // 标记扩展模式：fav 区域加高度上限，书签再多页面布局也与域名模式一致
    document.body.classList.add('ext-mode');
    faviconMap = buildFaviconMap(); // 渲染前捕获静态书签的本地图标映射
    try {
        chrome.bookmarks.getTree(tree => {
            const bookmarks = flattenBookmarks(tree);
            if (bookmarks.length > 0) {
                renderBookmarks(bookmarks); // 有书签：展示书签区
            } else {
                // 本地无任何书签：隐藏书签区，搜索区居中（不展示默认静态书签）
                document.body.classList.add('no-bookmarks');
            }
        });
    } catch (e) {
        console.warn('[Homepage] 读取书签失败，隐藏书签区', e);
        document.body.classList.add('no-bookmarks');
    }
}
$(initBookmarks);

// 书签点击：事件委托（兼容扩展 CSP 限制，静态/动态书签统一处理）
$(document).on('click', '.fav-grid > div', function (e) {
    e.preventDefault();
    const url = this.dataset ? this.dataset.url : $(this).attr('data-url');
    if (url) window.open(url);
});
