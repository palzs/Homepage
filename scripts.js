// 随机句子
var a = Math.random() + ""
var rand1 = a.charAt(5)
quotes = new Array
quotes[1] = "All those moments will be lost in time,like tears in rain."
quotes[2] = "Der Gott ist tot."
quotes[3] = "Veni Vidi Vici."
quotes[4] = "Cogito, ergo sum."
quotes[5] = "Je pense, donc je suis."
quotes[6] = "C'est la vie."
quotes[7] = "L'enfer, c'est les autres."
quotes[8] = "Was macht mich nicht umbringt,macht mich stärker."
quotes[9] = "God's in his heaven, all's right with the world."
quotes[0] = "Wenn du lange in einen Abgrund blickst,blickt der Abgrund auch in dich hinein."
var quote = quotes[rand1]
$(".end").html(quote);

// 搜索脚本
window.onload = function defaultsearch(){engine = "https://www.baidu.com/s?wd=";}
$(".searchicon").click(function(){
    var key = $(".keyword").val();
    window.open(engine+key);
});
$(".keyword").bind('keypress',function(event){
if (event.keyCode == 13){
    var key = $(".keyword").val();
    window.open(engine+key);
}
})

// 切换谷歌
$(".googleicon").click(function(){
    engine = "https://www.google.com/search?q=";
    document.querySelector('.googleicon').style.filter = "drop-shadow(0 0 5px #f48181)";
    document.querySelector('.baiduicon').style.filter = "";
    document.querySelector('.bingicon').style.filter = "";
    });
// 切换百度
$(".baiduicon").click(function(){
    engine = "https://www.baidu.com/s?wd=";
    document.querySelector('.googleicon').style.filter = "";
    document.querySelector('.baiduicon').style.filter = "drop-shadow(0 0 5px #f48181)";
    document.querySelector('.bingicon').style.filter = "";
    });
// 切换必应
$(".bingicon").click(function(){
    engine = "https://www.bing.com/search?q=";
    document.querySelector('.googleicon').style.filter = "";
    document.querySelector('.baiduicon').style.filter = "";
    document.querySelector('.bingicon').style.filter = "drop-shadow(0 0 5px #f48181)";
    });