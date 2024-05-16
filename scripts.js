// 搜索功能
window.onload = function () {
    engine = "https://www.baidu.com/s?wd=";
    document.querySelector('.baidu-icon.light').style.filter = "drop-shadow(0 0 3px #00000022) brightness(200%)";
    document.querySelector('.baidu-icon.dark').style.filter = "drop-shadow(0 0 1.5px #9D2222) brightness(120%)";
}
$(".s-icon").click(function () {
    var key = $(".keyword").val();
    window.open(engine + key);
});
$(".keyword").bind('keypress', function (event) {
    if (event.keyCode == 13) {
        var key = $(".keyword").val();
        window.open(engine + key);
}})
// 引擎切换
$(".google-icon").click(function () {
    engine = "https://www.google.com/search?q=";
    document.querySelector('.google-icon.light').style.filter = "drop-shadow(0 0 3px #00000022) brightness(200%)";
    document.querySelector('.google-icon.dark').style.filter = "drop-shadow(0 0 1.5px #9D2222) brightness(120%)";
    document.querySelector('.baidu-icon.light').style.filter = "";
    document.querySelector('.baidu-icon.dark').style.filter = "";
    document.querySelector('.bing-icon.light').style.filter = "";
    document.querySelector('.bing-icon.dark').style.filter = "";
});
$(".baidu-icon").click(function () {
    engine = "https://www.baidu.com/s?wd=";
    document.querySelector('.google-icon.light').style.filter = "";
    document.querySelector('.google-icon.dark').style.filter = "";
    document.querySelector('.baidu-icon.light').style.filter = "drop-shadow(0 0 3px #00000022) brightness(200%)";
    document.querySelector('.baidu-icon.dark').style.filter = "drop-shadow(0 0 1.5px #9D2222) brightness(120%)";
    document.querySelector('.bing-icon.light').style.filter = "";
    document.querySelector('.bing-icon.dark').style.filter = "";
});
$(".bing-icon").click(function () {
    engine = "https://www.bing.com/search?q=";
    document.querySelector('.google-icon.light').style.filter = "";
    document.querySelector('.google-icon.dark').style.filter = "";
    document.querySelector('.baidu-icon.light').style.filter = "";
    document.querySelector('.baidu-icon.dark').style.filter = "";
    document.querySelector('.bing-icon.light').style.filter = "drop-shadow(0 0 3px #00000022) brightness(200%)";
    document.querySelector('.bing-icon.dark').style.filter = "drop-shadow(0 0 1.5px #9D2222) brightness(120%)";
});
// 随机句子
var a = Math.random() + ""
var rand1 = a.charAt(5)
quotes = new Array
quotes[1] = "All those moments will be lost in time, like tears in rain."
quotes[2] = "Der Gott ist tot."
quotes[3] = "Veni Vidi Vici."
quotes[4] = "Cogito, ergo sum."
quotes[5] = "Je pense, donc je suis."
quotes[6] = "C'est la vie."
quotes[7] = "L'enfer, c'est les autres."
quotes[8] = "Was macht mich nicht umbringt, macht mich stärker."
quotes[9] = "God's in his heaven, all's right with the world."
quotes[0] = "Wenn du lange in einen Abgrund blickst, blickt der Abgrund auch in dich hinein."
var quote = quotes[rand1]
$(".end").html(quote);
// 面板伸缩
const navigation = document.querySelector('.navigation');
document.querySelector('.toggle').onclick = function () {
    this.classList.toggle('active');
    navigation.classList.toggle('active');
}
// 面板赋值
$(".fav").attr("src","https://raindrop.io/617985487/bookmarks-16689664/embed/hide=header%2Cadd");
